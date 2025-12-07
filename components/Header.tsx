import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="py-4 mb-4 bg-gradient-to-r from-salma-primary to-salma-secondary text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-xl p-2">
              <Image 
                src="/logo/شعار (1).png" 
                alt="معمل سلمى" 
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-0">
                معمل سلمى للرياضيات
              </h1>
              <p className="text-sm md:text-base opacity-90">ساعة مع الأرقام ⏰</p>
            </div>
          </div>

          {/* Action Buttons */}
          <nav className="flex gap-2 md:gap-3">
            <Link 
              href="/login" 
              className="px-3 py-2 md:px-5 md:py-2 text-sm font-medium bg-white text-salma-primary rounded-full hover:bg-salma-pink-light transition-all shadow-md"
            >
              تسجيل الدخول
            </Link>
            <Link 
              href="/register" 
              className="px-3 py-2 md:px-5 md:py-2 text-sm font-medium bg-white text-salma-primary rounded-full hover:bg-salma-pink-light transition-all shadow-md"
            >
              إنشاء حساب
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
