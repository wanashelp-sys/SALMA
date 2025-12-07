'use client'

export default function HeroSection() {
  const scrollToGames = () => {
    const gamesSection = document.querySelector('#games-section')
    gamesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="bg-white/95 rounded-3xl p-8 md:p-12 shadow-xl mb-8 text-center">
      <div className="text-6xl mb-4">🎯</div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-salma-text">
        مرحباً بك في معمل الأرقام!
      </h2>
      <p className="text-lg md:text-xl mb-6 text-salma-text/80 leading-relaxed">
        اختاري لعبتك المفضلة وابدئي الاستكشاف والمرح مع الرياضيات
      </p>
      <button 
        onClick={scrollToGames}
        className="bg-gradient-to-r from-salma-primary to-salma-secondary text-white font-bold px-8 py-4 rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center gap-2"
      >
        <span>▶</span>
        ابدئي الآن
      </button>
    </section>
  )
}
