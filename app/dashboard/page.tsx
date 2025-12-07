'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GameCard from '@/components/GameCard'
import Footer from '@/components/Footer'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userStr))
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-salma-text">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  const games = [
    {
      id: 'numbers',
      emoji: '🔢',
      title: 'تعرّفي على الأرقام',
      description: 'تعلمي الأرقام من 0 إلى 100 بطريقة ممتعة',
      difficulty: 'سهل' as const
    },
    {
      id: 'place-value',
      emoji: '📊',
      title: 'القيمة المنزلية',
      description: 'اكتشفي الآحاد والعشرات والمئات',
      difficulty: 'متوسط' as const
    },
    {
      id: 'operations',
      emoji: '➕➖',
      title: 'الجمع والطرح',
      description: 'تدربي على العمليات الحسابية البسيطة',
      difficulty: 'سهل' as const
    },
    {
      id: 'clock',
      emoji: '⏰',
      title: 'قراءة الساعة',
      description: 'تعلمي قراءة الوقت بطريقة مرحة',
      difficulty: 'متوسط' as const
    },
    {
      id: 'comparison',
      emoji: '⚖️',
      title: 'المقارنة بين الأعداد',
      description: 'أكبر من، أصغر من، يساوي',
      difficulty: 'سهل' as const
    },
    {
      id: 'counting',
      emoji: '🎈',
      title: 'عدّي معي',
      description: 'احسبي الأشياء بطريقة ممتعة',
      difficulty: 'سهل' as const
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div className="min-h-screen">
      <header className="py-4 mb-4 bg-gradient-to-r from-salma-primary to-salma-secondary text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">مرحباً، {user.username}! 👋</h1>
              <p className="text-sm opacity-90">لوحة التحكم</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-salma-primary rounded-full hover:bg-salma-pink-light transition-all"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/95 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-2xl font-bold text-salma-text mb-1">6</h3>
            <p className="text-salma-text/70">ألعاب متاحة</p>
          </div>
          <div className="bg-white/95 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="text-2xl font-bold text-salma-text mb-1">0</h3>
            <p className="text-salma-text/70">إنجازات محققة</p>
          </div>
          <div className="bg-white/95 rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-2xl font-bold text-salma-text mb-1">0</h3>
            <p className="text-salma-text/70">النقاط الكلية</p>
          </div>
        </section>

        {/* Games Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-salma-text mb-6">🎮 الألعاب المتاحة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
