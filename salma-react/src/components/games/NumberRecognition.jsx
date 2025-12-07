import { useState, useEffect } from 'react';
import { getRandomNumber, shuffleArray, playSuccessSound, playErrorSound, showConfetti } from '../../utils/gameLogic';

function NumberRecognition({ score, onScoreUpdate }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const correctNumber = getRandomNumber(1, 100);
    setCurrentNumber(correctNumber);

    // Generate wrong options
    const opts = [correctNumber];
    while (opts.length < 4) {
      const wrongNumber = getRandomNumber(1, 100);
      if (!opts.includes(wrongNumber)) {
        opts.push(wrongNumber);
      }
    }

    setOptions(shuffleArray(opts));
    setAnswered(false);
  };

  const checkAnswer = (selected) => {
    if (answered) return;

    setAnswered(true);

    if (selected === currentNumber) {
      onScoreUpdate(score + 10);
      playSuccessSound();
      showConfetti();
    } else {
      playErrorSound();
    }

    // Next question after delay
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
        <p className="lead">اختاري الرقم الصحيح!</p>
      </div>

      <div id="question-area">
        <div className="number-display">{currentNumber}</div>
        <div className="options-grid">
          {options.map((num, index) => (
            <button
              key={index}
              className={`option-btn ${
                answered
                  ? num === currentNumber
                    ? 'correct'
                    : num === options[index]
                    ? ''
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

export default NumberRecognition;
