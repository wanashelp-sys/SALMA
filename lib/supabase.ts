import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Database Types
export interface User {
  user_id: number
  username: string
  email: string
  phone?: string
  password_hash: string
  role: 'teacher' | 'student'
  created_at?: string
}

export interface Teacher {
  teacher_id: number
  user_id: number
  full_name: string
  school_name: string
  created_at?: string
}

export interface Student {
  student_id: number
  user_id: number
  full_name: string
  grade: number
  class_section: string
  created_at?: string
}

export interface Class {
  class_id: number
  teacher_id: number
  class_name: string
  join_code: string
  created_at?: string
}

export interface StudentClass {
  student_id: number
  class_id: number
  joined_at?: string
}

// Helper Functions
export const generateTeacherCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Register Teacher
export const registerTeacher = async (data: {
  fullName: string
  email: string
  phone?: string
  username: string
  password: string
  schoolName: string
}) => {
  try {
    // 1. Create user
    const { data: userRow, error: userError } = await supabase
      .from('users')
      .insert({
        username: data.username,
        email: data.email,
        phone: data.phone || null,
        password_hash: data.password,
        role: 'teacher'
      })
      .select('user_id, username, email')
      .single()

    if (userError) throw userError

    // 2. Create teacher
    const { data: teacherRow, error: teacherError } = await supabase
      .from('teachers')
      .insert({
        full_name: data.fullName,
        user_id: userRow.user_id,
        school_name: data.schoolName
      })
      .select('teacher_id')
      .single()

    if (teacherError) throw teacherError

    // 3. Create class with code
    const teacherCode = generateTeacherCode()
    const { data: classRow, error: classError } = await supabase
      .from('classes')
      .insert({
        teacher_id: teacherRow.teacher_id,
        class_name: 'فصل معمل سلمى',
        join_code: teacherCode
      })
      .select('class_id, join_code')
      .single()

    if (classError) throw classError

    return {
      success: true,
      teacherCode: classRow.join_code,
      userId: userRow.user_id
    }
  } catch (error: any) {
    console.error('Teacher registration error:', error)
    
    if (error.code === '23505') {
      throw new Error('البريد الإلكتروني أو اسم المستخدم مسجّل مسبقاً')
    }
    
    throw new Error(error.message || 'حدث خطأ أثناء التسجيل')
  }
}

// Register Student
export const registerStudent = async (data: {
  fullName: string
  email: string
  phone?: string
  username: string
  password: string
  grade: number
  className: string
  teacherCode: string
}) => {
  try {
    // 1. Find class by code
    const { data: classFound, error: classFindError } = await supabase
      .from('classes')
      .select('class_id, teacher_id, join_code')
      .eq('join_code', data.teacherCode)
      .single()

    if (classFindError || !classFound) {
      throw new Error('تعذّر العثور على فصل بهذا الكود')
    }

    // 2. Create user
    const { data: userRow, error: userError } = await supabase
      .from('users')
      .insert({
        username: data.username,
        email: data.email,
        phone: data.phone || null,
        password_hash: data.password,
        role: 'student'
      })
      .select('user_id, username, email')
      .single()

    if (userError) throw userError

    // 3. Create student
    const { data: studentRow, error: studentError } = await supabase
      .from('students')
      .insert({
        full_name: data.fullName,
        user_id: userRow.user_id,
        grade: data.grade,
        class_section: data.className
      })
      .select('student_id')
      .single()

    if (studentError) throw studentError

    // 4. Link student to class
    const { error: scError } = await supabase
      .from('student_classes')
      .insert({
        student_id: studentRow.student_id,
        class_id: classFound.class_id
      })

    if (scError) throw scError

    // 5. Get teacher name
    let teacherName = 'معلمتك'
    const { data: teacherData } = await supabase
      .from('teachers')
      .select('full_name')
      .eq('teacher_id', classFound.teacher_id)
      .single()

    if (teacherData?.full_name) {
      teacherName = teacherData.full_name
    }

    return {
      success: true,
      userId: userRow.user_id,
      teacherName
    }
  } catch (error: any) {
    console.error('Student registration error:', error)
    
    if (error.code === '23505') {
      throw new Error('البريد الإلكتروني أو اسم المستخدم مسجّل مسبقاً')
    }
    
    throw new Error(error.message || 'حدث خطأ أثناء التسجيل')
  }
}

// Login
export const login = async (username: string, password: string) => {
  try {
    const { data: userRow, error } = await supabase
      .from('users')
      .select('user_id, username, email, role, password_hash')
      .eq('username', username)
      .single()

    if (error || !userRow) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة')
    }

    // Simple password check (in production, use proper hashing)
    if (userRow.password_hash !== password) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة')
    }

    return {
      success: true,
      user: {
        id: userRow.user_id,
        username: userRow.username,
        email: userRow.email,
        role: userRow.role
      }
    }
  } catch (error: any) {
    console.error('Login error:', error)
    throw new Error(error.message || 'حدث خطأ أثناء تسجيل الدخول')
  }
}
