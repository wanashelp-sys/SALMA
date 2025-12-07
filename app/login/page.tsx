'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('يرجى ملء جميع الحقول')
      return
    }

    setLoading(true)

    try {
      // Check user credentials
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('user_id, username, role, password_hash')
        .eq('username', username)
        .single()

      if (userError || !userData) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة')
        setLoading(false)
        return
      }

      // في الإنتاج يجب استخدام bcrypt للمقارنة
      if (userData.password_hash !== password) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة')
        setLoading(false)
        return
      }

      // Store user session in localStorage
      localStorage.setItem('user', JSON.stringify({
        userId: userData.user_id,
        username: userData.username,
        role: userData.role
      }))

      alert('تم تسجيل الدخول بنجاح!')
      
      // Redirect based on role
      if (userData.role === 'teacher') {
        window.location.href = '/dashboard/teacher'
      } else {
        window.location.href = '/dashboard/student'
      }
      
    } catch (err) {
      console.error('Login error:', err)
      setError('حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-secondary/20 via-white to-olive/10">
      <div className="w-full max-w-md bg-white/95 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Image 
                src="/logo/شعار (1).png" 
                alt="معمل سلمى" 
                width={50} 
                height={50}
                className="object-contain"
              />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-accent mb-2">تسجيل الدخول</h1>
          <p className="text-sm text-accent/70">ادخلي إلى معمل سلمى التعليمي</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="كلمة المرور"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-accent">تذكرني</span>
            </label>
            <a href="#" className="text-primary hover:underline">
              نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>

          <div className="text-center text-sm text-accent">
            ليس لديكِ حساب؟{' '}
            <Link href="/register" className="text-primary hover:underline font-semibold">
              إنشاء حساب جديد
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
