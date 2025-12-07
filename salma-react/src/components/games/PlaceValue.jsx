import { useState, useEffect } from 'react';
import { getRandomNumber, shuffleArray, playSuccessSound, playErrorSound, showConfetti } from '../../utils/gameLogic';

function PlaceValue({ score, onScoreUpdate }) {
  const [number, setNumber] = useState(0);
  const [position, setPosition] = useState('');
  const [correctDigit, setCorrectDigit] = useState(0);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const num = getRandomNumber(10, 999);
    const numberStr = num.toString();
    const positions = ['آحاد', 'عشرات', 'مئات'];
    const positionIndex = getRandomNumber(0, numberStr.length - 1);
    const pos = positions[positionIndex];
    const digit = parseInt(numberStr[numberStr.length - 1 - positionIndex]);

    setNumber(num);
    setPosition(pos);
    setCorrectDigit(digit);

    // Generate options
    const opts = [digit];
    while (opts.length < 4) {
      const wrongDigit = getRandomNumber(0, 9);
      if (!opts.includes(wrongDigit)) {
        opts.push(wrongDigit);
      }
    }

    setOptions(shuffleArray(opts));
    setAnswered(false);
  };

  const checkAnswer = (selected) => {
    if (answered) return;

    setAnswered(true);

    if (selected === correctDigit) {
      onScoreUpdate(score + 15);
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
        <p className="lead">ما هي قيمة الرقم في المنزلة المحددة؟</p>
      </div>

      <div id="question-area">
        <div className="text-center mb-4">
          <div className="number-display" style={{ fontSize: '6rem' }}>{number}</div>
          <h4 className="mb-4">
            ما قيمة منزلة <span style={{ color: 'var(--color-primary)' }}>{position}</span>؟
          </h4>
        </div>
        <div className="options-grid">
          {options.map((digit, index) => (
            <button
              key={index}
              className={`option-btn ${
                answered
                  ? digit === correctDigit
                    ? 'correct'
                    : ''
                  : ''
              }`}
              onClick={() => checkAnswer(digit)}
              disabled={answered}
            >
              {digit}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaceValue;
