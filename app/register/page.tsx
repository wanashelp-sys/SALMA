'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { sendTeacherWelcomeEmail, sendStudentWelcomeEmail } from '@/lib/emailjs'

export default function RegisterPage() {
  const [role, setRole] = useState<'teacher' | 'student'>('teacher')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [grade, setGrade] = useState('')
  const [className, setClassName] = useState('')
  const [teacherCode, setTeacherCode] = useState('')
  const [acceptPolicy, setAcceptPolicy] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!fullName || !email || !username || !password) {
      setError('يرجى ملء جميع الحقول المطلوبة')
      return
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين')
      return
    }

    if (!acceptPolicy) {
      setError('يجب الموافقة على شروط الاستخدام')
      return
    }

    if (role === 'teacher' && !schoolName) {
      setError('يرجى إدخال اسم المدرسة')
      return
    }

    if (role === 'student') {
      if (!grade || !className || !teacherCode) {
        setError('يرجى ملء جميع بيانات الطالبة')
        return
      }
    }

    setLoading(true)

    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single()

      if (existingUser) {
        setError('اسم المستخدم موجود مسبقاً')
        setLoading(false)
        return
      }

      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single()

      if (existingEmail) {
        setError('البريد الإلكتروني مستخدم مسبقاً')
        setLoading(false)
        return
      }

      // Insert user into users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          username,
          email,
          phone: phone || null,
          password_hash: password, // في الإنتاج يجب استخدام bcrypt
          role
        })
        .select()
        .single()

      if (userError) {
        console.error('User creation error:', userError)
        setError('حدث خطأ أثناء إنشاء الحساب')
        setLoading(false)
        return
      }

      const userId = userData.user_id

      if (role === 'teacher') {
        // Generate teacher code
        const teacherCodeGenerated = generateTeacherCode()
        
        // Insert into teachers table
        const { data: teacherData, error: teacherError } = await supabase
          .from('teachers')
          .insert({
            user_id: userId,
            full_name: fullName,
            school: schoolName,
            teacher_code: teacherCodeGenerated
          })
          .select()
          .single()

        if (teacherError) {
          console.error('Teacher creation error:', teacherError)
          setError('حدث خطأ أثناء إنشاء حساب المعلمة')
          setLoading(false)
          return
        }

        // Create default class for teacher
        const { error: classError } = await supabase
          .from('classes')
          .insert({
            teacher_id: teacherData.teacher_id,
            class_name: 'الفصل الأول',
            class_code: teacherCodeGenerated
          })

        if (classError) {
          console.error('Class creation error:', classError)
        }

        // Send welcome email to teacher
        await sendTeacherWelcomeEmail({
          teacher_name: fullName,
          teacher_email: email,
          teacher_code: teacherCodeGenerated,
          login_url: `${window.location.origin}/login`
        })

        setGeneratedCode(teacherCodeGenerated)
        alert(`تم إنشاء الحساب بنجاح!\nكود الفصل: ${teacherCodeGenerated}\n\nتم إرسال الكود إلى بريدك الإلكتروني`)
        
      } else {
        // Student registration
        // Find teacher and class by code
        const { data: teacherData, error: teacherError } = await supabase
          .from('teachers')
          .select('teacher_id, full_name, user_id')
          .eq('teacher_code', teacherCode)
          .single()

        if (teacherError || !teacherData) {
          setError('كود المعلمة غير صحيح')
          setLoading(false)
          return
        }

        // Get class
        const { data: classData } = await supabase
          .from('classes')
          .select('class_id')
          .eq('teacher_id', teacherData.teacher_id)
          .eq('class_code', teacherCode)
          .single()

        // Insert into students table
        const { data: studentData, error: studentError } = await supabase
          .from('students')
          .insert({
            user_id: userId,
            full_name: fullName,
            grade: parseInt(grade),
            class_name: className
          })
          .select()
          .single()

        if (studentError) {
          console.error('Student creation error:', studentError)
          setError('حدث خطأ أثناء إنشاء حساب الطالبة')
          setLoading(false)
          return
        }

        // Link student to class
        if (classData) {
          await supabase
            .from('student_classes')
            .insert({
              student_id: studentData.student_id,
              class_id: classData.class_id
            })
        }

        // Send welcome email to student
        await sendStudentWelcomeEmail({
          student_name: fullName,
          student_email: email,
          teacher_name: teacherData.full_name,
          teacher_code: teacherCode,
          login_url: `${window.location.origin}/login`
        })

        alert('تم إنشاء الحساب بنجاح! تم إرسال رسالة ترحيب إلى بريدك الإلكتروني')
      }

      // Redirect to login
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)

    } catch (err) {
      console.error('Registration error:', err)
      setError('حدث خطأ أثناء إنشاء الحساب')
    } finally {
      setLoading(false)
    }
  }

  const generateTeacherCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-secondary/20 via-white to-olive/10">
      <div className="w-full max-w-4xl bg-white/95 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-5">
          {/* Sidebar */}
          <div className="md:col-span-2 bg-gradient-to-br from-secondary to-clay p-8 text-white">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Image 
                  src="/logo/شعار (1).png" 
                  alt="معمل سلمى" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-bold text-lg">معمل سلمى</div>
                <div className="text-xs opacity-90">مغامرة الرياضيات</div>
              </div>
            </Link>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm">
                <span>{role === 'teacher' ? '👩‍🏫' : '👧'}</span>
                <span>تسجيل {role === 'teacher' ? 'معلمة' : 'طالبة'}</span>
              </div>

              <h2 className="text-2xl font-bold">
                {role === 'teacher' ? 'مرحباً بك في معمل سلمى 👋' : 'جاهزة للمغامرة؟ 🎮'}
              </h2>

              <p className="text-sm opacity-95">
                {role === 'teacher' 
                  ? 'حساب المعلمة يمنحك أدوات إدارة الفصول، إنشاء التحديات، ومتابعة تقدّم طالباتك بتقارير ذكية.'
                  : 'سجّلي حسابك وادخلي عالم التحديات والألعاب التعليمية في معمل سلمى.'
                }
              </p>

              {role === 'teacher' ? (
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-golden">★</span>
                    <span>لوحة تحكم للمعلمة لمتابعة تقدّم كل طالبة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden">★</span>
                    <span>إنشاء تحديات فردية وجماعية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden">★</span>
                    <span>تقارير وبيانات ذكية</span>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-golden">★</span>
                    <span>ألعاب تعليمية ممتعة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden">★</span>
                    <span>تحديات ونقاط وأوسمة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-golden">★</span>
                    <span>متابعة تقدمك خطوة بخطوة</span>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 p-8">
            {/* Role Toggle */}
            <div className="flex justify-end mb-6">
              <div className="inline-flex bg-white border-2 border-clay/20 rounded-full p-1 gap-1">
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    role === 'teacher'
                      ? 'bg-primary text-white'
                      : 'text-accent hover:bg-clayLight'
                  }`}
                >
                  معلمة
                </button>
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    role === 'student'
                      ? 'bg-primary text-white'
                      : 'text-accent hover:bg-clayLight'
                  }`}
                >
                  طالبة
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold text-accent mb-1">
                  الاسم الثلاثي
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="مثال: سلمى أحمد العسيري"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-accent mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent mb-1">
                    رقم الجوال (اختياري)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="05XXXXXXXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-accent mb-1">
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="اسم المستخدم"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-accent mb-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                    placeholder="6 أحرف على الأقل"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-accent mb-1">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="أعيدي كتابة كلمة المرور"
                  required
                />
              </div>

              {/* Teacher Extra */}
              {role === 'teacher' && (
                <div className="pt-4 border-t-2 border-clay/20">
                  <h3 className="font-bold text-accent mb-3">بيانات المعلمة</h3>
                  <div>
                    <label className="block text-sm font-semibold text-accent mb-1">
                      اسم المدرسة
                    </label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="مثال: الابتدائية الخامسة - جدة"
                      required
                    />
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-accent">
                    سيتم إنشاء <strong>كود فصل خاص</strong> يمكنك مشاركته مع طالباتك بعد التسجيل.
                  </div>
                </div>
              )}

              {/* Student Extra */}
              {role === 'student' && (
                <div className="pt-4 border-t-2 border-clay/20">
                  <h3 className="font-bold text-accent mb-3">بيانات الطالبة</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-accent mb-1">
                        الصف الدراسي
                      </label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                        required
                      >
                        <option value="">اختاري الصف</option>
                        <option value="1">الأول</option>
                        <option value="2">الثاني</option>
                        <option value="3">الثالث</option>
                        <option value="4">الرابع</option>
                        <option value="5">الخامس</option>
                        <option value="6">السادس</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-accent mb-1">
                        الفصل
                      </label>
                      <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                        placeholder="مثال: خامس-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-accent mb-1">
                      كود المعلمة
                    </label>
                    <input
                      type="text"
                      value={teacherCode}
                      onChange={(e) => setTeacherCode(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-clay/20 rounded-lg focus:border-primary focus:outline-none"
                      placeholder="اكتبي الكود من معلمتك"
                      required
                    />
                    <p className="text-xs text-accent/70 mt-1">
                      احصلي على هذا الكود من معلمتك للانضمام إلى فصلها
                    </p>
                  </div>
                </div>
              )}

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptPolicy}
                  onChange={(e) => setAcceptPolicy(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-accent">
                  أوافق على <a href="#" className="text-primary hover:underline">شروط الاستخدام</a> و
                  <a href="#" className="text-primary hover:underline"> سياسة الخصوصية</a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'جاري الإنشاء...' : `إنشاء حساب ${role === 'teacher' ? 'معلمة' : 'طالبة'} الآن`}
              </button>

              <div className="text-center text-sm text-accent">
                لديكِ حساب مسبقاً؟{' '}
                <Link href="/login" className="text-primary hover:underline font-semibold">
                  تسجيل الدخول
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
