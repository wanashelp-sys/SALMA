import Link from 'next/link'

interface GameCardProps {
  id: string
  emoji: string
  title: string
  description: string
  difficulty: 'سهل' | 'متوسط' | 'صعب'
}

export default function GameCard({ id, emoji, title, description, difficulty }: GameCardProps) {
  const difficultyColor = difficulty === 'سهل' 
    ? 'bg-salma-accent text-salma-text' 
    : difficulty === 'متوسط'
    ? 'bg-salma-secondary text-white'
    : 'bg-salma-primary text-white'

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 overflow-hidden">
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">{emoji}</div>
        <h4 className="text-xl font-bold mb-3 text-salma-text">{title}</h4>
        <p className="text-salma-text/70 mb-4 min-h-[3rem]">{description}</p>
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>
      <div className="bg-salma-pink-light border-t-2 border-salma-primary/20 p-4 text-center">
        <Link 
          href={`/games/${id}`}
          className="inline-flex items-center gap-2 text-salma-primary font-bold hover:text-salma-secondary transition-colors"
        >
          ابدئي اللعب
          <span>◀</span>
        </Link>
      </div>
    </div>
  )
}
