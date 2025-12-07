import { useState, useEffect } from 'react';
import NumberRecognition from './games/NumberRecognition';
import PlaceValue from './games/PlaceValue';
import Operations from './games/Operations';
import Comparison from './games/Comparison';
import Counting from './games/Counting';
import ClockReading from './games/ClockReading';

const gameConfig = {
  'numbers': { title: '🔢 تعرّفي على الأرقام', component: NumberRecognition },
  'place-value': { title: '📊 القيمة المنزلية', component: PlaceValue },
  'operations': { title: '➕➖ الجمع والطرح', component: Operations },
  'clock': { title: '⏰ قراءة الساعة', component: ClockReading },
  'comparison': { title: '⚖️ المقارنة بين الأعداد', component: Comparison },
  'counting': { title: '🎈 عدّي معي', component: Counting }
};

function GameContainer({ gameId, onClose }) {
  const [score, setScore] = useState(0);
  const gameInfo = gameConfig[gameId];

  useEffect(() => {
    // Scroll to game container
    const container = document.getElementById('game-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }, [gameId]);

  if (!gameInfo) {
    return null;
  }

  const GameComponent = gameInfo.component;

  return (
    <section id="game-container" className="game-container card-playful p-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">{gameInfo.title}</h3>
        <button className="btn btn-outline-secondary" onClick={onClose}>
          <i className="fas fa-times ms-2"></i>
          إغلاق
        </button>
      </div>

      <div id="game-content">
        <GameComponent score={score} onScoreUpdate={setScore} />
      </div>
    </section>
  );
}

export default GameContainer;
