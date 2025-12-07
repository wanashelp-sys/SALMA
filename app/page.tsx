import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-secondary/20 via-white to-olive/10">
      <main className="w-full max-w-6xl bg-white/95 rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-6 border-b-2 border-accent/20">
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 bg-gradient-to-br from-white via-clayLight to-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden p-2 animate-float">
              <Image 
                src="/logo/شعار (1).png" 
                alt="معمل سلمى" 
                width={120} 
                height={120}
                className="object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
          
          <nav className="flex gap-3">
            <Link 
              href="/login" 
              className="px-5 py-2 text-sm font-medium text-accent bg-white border-2 border-accent/30 rounded-full hover:bg-espressoLight hover:border-accent transition-all"
            >
              تسجيل الدخول
            </Link>
            <Link 
              href="/register" 
              className="px-5 py-2 text-sm font-medium text-accent bg-white border-2 border-accent/30 rounded-full hover:bg-espressoLight hover:border-accent transition-all"
            >
              إنشاء حساب
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-6">
            <p className="text-xl text-accent leading-relaxed">
              تهدف هذه المنصّة إلى تقديم مادة الرياضيات بأسلوب تعليمي مختلف وجذاب، يعتمد على عرض المحتوى في جو من المرح واللعب والتعلّم، مع توفير نظام لتحليل النتائج وقياس مستوى التقدّم في المادة بأسلوب ممتع ومشوِّق يُسهم في تنمية الدافعية للتعلّم، ويراعي الفروق الفردية بين الطالبات وأنماط التعلّم المختلفة. 🌟📊
            </p>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="relative min-h-[400px] rounded-3xl p-12 overflow-hidden flex items-center justify-center bubble-container">
              {/* Floating Bubbles Background */}
              <div className="bubble bubble-1"></div>
              <div className="bubble bubble-2"></div>
              <div className="bubble bubble-3"></div>
              <div className="bubble bubble-4"></div>
              <div className="bubble bubble-5"></div>
              <div className="bubble bubble-6"></div>
              <div className="bubble bubble-7"></div>
              
              {/* Logo - Static */}
              <div className="relative z-10 w-full max-w-md">
                <Image 
                  src="/logo/شعار (1).png" 
                  alt="معمل سلمى - مختبر ألعاب تعليمية" 
                  width={400} 
                  height={400}
                  className="object-contain w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Front Bubbles - floating in front of the image */}
              <div className="front-bubble front-bubble-1"></div>
              <div className="front-bubble front-bubble-2"></div>
              <div className="front-bubble front-bubble-3"></div>
              <div className="front-bubble front-bubble-4"></div>
              <div className="front-bubble front-bubble-5"></div>
              <div className="front-bubble front-bubble-6"></div>
              <div className="front-bubble front-bubble-7"></div>
              <div className="front-bubble front-bubble-8"></div>
              <div className="front-bubble front-bubble-9"></div>
              <div className="front-bubble front-bubble-10"></div>
            </div>

            <div className="mt-6 bg-white rounded-2xl p-5 shadow-lg border-2 border-clay/20">
              <div className="flex items-center gap-4">
                <div className="text-3xl">✨</div>
                <div className="flex-1">
                  <div className="font-bold text-primary">أكثر من مجرد تمارين</div>
                  <div className="text-sm text-accent">تحديات • شخصيات • إنجازات</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-center bg-gradient-to-br from-clayLight to-secondary/30 rounded-xl px-3 py-2">
                    <div className="text-xl">🎯</div>
                    <div className="text-xs font-bold text-primary">+50</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-clayLight to-secondary/30 rounded-xl px-3 py-2">
                    <div className="text-xl">🏆</div>
                    <div className="text-xs font-bold text-primary">+20</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t-2 border-clay/20">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: About */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-accent flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></span>
                عن المعمل
              </h4>
              <p className="text-sm text-accent/70 leading-relaxed">
                معمل سلمى منصة تعليمية تفاعلية تهدف لتحويل تعلم الرياضيات إلى تجربة ممتعة ومشوقة للطالبات.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-accent flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-secondary to-olive rounded-full"></span>
                روابط سريعة
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="text-accent/70 hover:text-primary transition-colors">الألعاب التعليمية</a></li>
                <li><a href="/login" className="text-accent/70 hover:text-primary transition-colors">تسجيل الدخول</a></li>
                <li><a href="/register" className="text-accent/70 hover:text-primary transition-colors">إنشاء حساب</a></li>
                <li><a href="#" className="text-accent/70 hover:text-primary transition-colors">المدونة التعليمية</a></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-accent flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-olive to-skyBlue rounded-full"></span>
                تواصل معنا
              </h4>
              <ul className="space-y-2 text-sm text-accent/70">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>info@salmalab.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span>
                  <span>+966 XX XXX XXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>www.salmalab.com</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-accent flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-skyBlue to-primary rounded-full"></span>
                تابعنا
              </h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <span className="text-lg">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-secondary to-skyBlue rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <span className="text-lg">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-skyBlue to-olive rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <span className="text-lg">📸</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-olive to-golden rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                  <span className="text-lg">▶️</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-clay/20 text-center">
            <p className="text-sm text-accent/70 mb-2">
              © 2025 معمل سلمى للّعب والحساب | جميع الحقوق محفوظة
            </p>
            <p className="text-xs text-accent/50">
              صُنع بحب ❤️ في المملكة العربية السعودية
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
