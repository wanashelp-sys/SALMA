import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import GameCard from '@/components/GameCard'
import Footer from '@/components/Footer'

export default function Home() {
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

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <HeroSection />

        {/* Games Section */}
        <section id="games-section" className="mb-12">
          <h3 className="text-center text-3xl md:text-4xl font-bold mb-8 text-salma-text">
            🎮 الألعاب التفاعلية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        </section>

        {/* More Than Exercises Section */}
        <section className="bg-white/95 rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-salma-text">
              أكثر من مجرد تمارين!
            </h3>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl leading-relaxed text-salma-text/90 mb-6 text-center">
              تهدف هذه المنصة إلى تقديم مادة الرياضيات بأسلوب تعليمي
              مختلف وجذاب، يعتمد على عرض المحتوى في جو من المرح
              واللعب والتعلم، مع توفير نظام لتحليل النتائج وقياس مستوى
              التقدم في المادة بأسلوب ممتع ومشوّق يُسهم في تنمية
              الدافعية للتعلم، ويراعي الفروق الفردية بين الطالبات وأنماط
              التعلم المختلفة. 📊🌟
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-salma-pink-light rounded-2xl">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-bold text-salma-text mb-2">تحديات ممتعة</h4>
                <p className="text-sm text-salma-text/70">ألعاب تفاعلية تجعل التعلم مغامرة</p>
              </div>
              
              <div className="text-center p-6 bg-salma-orange-light rounded-2xl">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="font-bold text-salma-text mb-2">إنجازات ونقاط</h4>
                <p className="text-sm text-salma-text/70">نظام مكافآت يحفز على الاستمرار</p>
              </div>
              
              <div className="text-center p-6 bg-salma-yellow-light rounded-2xl">
                <div className="text-4xl mb-3">📈</div>
                <h4 className="font-bold text-salma-text mb-2">تتبع التقدم</h4>
                <p className="text-sm text-salma-text/70">تقارير تفصيلية عن مستوى الأداء</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
