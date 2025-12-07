import GameCard from './GameCard';

const games = [
  {
    id: 'numbers',
    icon: '🔢',
    title: 'تعرّفي على الأرقام',
    description: 'تعلمي الأرقام من 0 إلى 100 بطريقة ممتعة',
    difficulty: 'سهل'
  },
  {
    id: 'place-value',
    icon: '📊',
    title: 'القيمة المنزلية',
    description: 'اكتشفي الآحاد والعشرات والمئات',
    difficulty: 'متوسط'
  },
  {
    id: 'operations',
    icon: '➕➖',
    title: 'الجمع والطرح',
    description: 'تدربي على العمليات الحسابية البسيطة',
    difficulty: 'سهل'
  },
  {
    id: 'clock',
    icon: '⏰',
    title: 'قراءة الساعة',
    description: 'تعلمي قراءة الوقت بطريقة مرحة',
    difficulty: 'متوسط'
  },
  {
    id: 'comparison',
    icon: '⚖️',
    title: 'المقارنة بين الأعداد',
    description: 'أكبر من، أصغر من، يساوي',
    difficulty: 'سهل'
  },
  {
    id: 'counting',
    icon: '🎈',
    title: 'عدّي معي',
    description: 'احسبي الأشياء بطريقة ممتعة',
    difficulty: 'سهل'
  }
];

function GamesGrid({ onStartGame }) {
  return (
    <section className="games-section mb-5" id="games-grid">
      <h3 className="text-center mb-4 fw-bold fs-2">🎮 الألعاب التفاعلية</h3>
      
      <div className="row g-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            icon={game.icon}
            title={game.title}
            description={game.description}
            difficulty={game.difficulty}
            gameId={game.id}
            onStart={onStartGame}
          />
        ))}
      </div>
    </section>
  );
}

export default GamesGrid;
