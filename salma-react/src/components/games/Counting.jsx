import { useState, useEffect } from 'react';
import { getRandomNumber, shuffleArray, playSuccessSound, playErrorSound, showConfetti } from '../../utils/gameLogic';

function Counting({ score, onScoreUpdate }) {
  const [correctCount, setCorrectCount] = useState(0);
  const [balloons, setBalloons] = useState('');
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const count = getRandomNumber(3, 12);
    setCorrectCount(count);
    setBalloons('🎈'.repeat(count));

    // Generate options
    const opts = [count];
    while (opts.length < 4) {
      const wrongCount = getRandomNumber(3, 12);
      if (!opts.includes(wrongCount)) {
        opts.push(wrongCount);
      }
    }

    setOptions(shuffleArray(opts));
    setAnswered(false);
  };

  const checkAnswer = (selected) => {
    if (answered) return;

    setAnswered(true);

    if (selected === correctCount) {
      onScoreUpdate(score + 10);
      playSuccessSound();
      showConfetti();
    } else {
      playErrorSound();
    }

    setTimeout(() => {
      generateQuestion();
    }, 1500);
  };

  return (
    <div>
      <div className="score-display">
        <h4>النقاط</h4>
        <div className="score-number">{score}</div>
      </div>

      <div className="text-center mb-4">
        <p className="lead">كم عدد البالونات؟ 🎈</p>
      </div>

      <div id="question-area">
        <div className="text-center mb-4">
          <div style={{ fontSize: '3rem', lineHeight: '1.5', letterSpacing: '0.5rem' }}>
            {balloons}
          </div>
        </div>
        <div className="options-grid">
          {options.map((num, index) => (
            <button
              key={index}
              className={`option-btn ${
                answered
                  ? num === correctCount
                    ? 'correct'
                    : ''
                  : ''
              }`}
              onClick={() => checkAnswer(num)}
              disabled={answered}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Counting;
