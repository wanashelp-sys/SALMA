'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import NumbersGame from '@/components/games/NumbersGame'
import PlaceValueGame from '@/components/games/PlaceValueGame'
import OperationsGame from '@/components/games/OperationsGame'
import ClockGame from '@/components/games/ClockGame'
import ComparisonGame from '@/components/games/ComparisonGame'
import CountingGame from '@/components/games/CountingGame'

const gameInfo: Record<string, { title: string; emoji: string }> = {
  numbers: { title: 'تعرّفي على الأرقام', emoji: '🔢' },
  'place-value': { title: 'القيمة المنزلية', emoji: '📊' },
  operations: { title: 'الجمع والطرح', emoji: '➕➖' },
  clock: { title: 'قراءة الساعة', emoji: '⏰' },
  comparison: { title: 'المقارنة بين الأعداد', emoji: '⚖️' },
  counting: { title: 'عدّي معي', emoji: '🎈' },
}

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.gameId as string

  const info = gameInfo[gameId]
  
  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-salma-text mb-4">اللعبة غير موجودة</h1>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-salma-primary to-salma-secondary text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }

  const renderGame = () => {
    switch (gameId) {
      case 'numbers':
        return <NumbersGame />
      case 'place-value':
        return <PlaceValueGame />
      case 'operations':
        return <OperationsGame />
      case 'clock':
        return <ClockGame />
      case 'comparison':
        return <ComparisonGame />
      case 'counting':
        return <CountingGame />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-4 md:p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{info.emoji}</div>
            <h1 className="text-xl md:text-2xl font-bold text-salma-text">{info.title}</h1>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-salma-primary/10 text-salma-primary rounded-full hover:bg-salma-primary/20 transition-all flex items-center gap-2"
          >
            <span>✕</span>
            <span className="hidden md:inline">إغلاق</span>
          </Link>
        </div>

        {/* Game Container */}
        <div className="bg-white/95 rounded-2xl shadow-xl p-6 md:p-8">
          {renderGame()}
        </div>
      </div>
    </div>
  )
}
