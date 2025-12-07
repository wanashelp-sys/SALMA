import { useState, useEffect } from 'react';
import { getRandomNumber, shuffleArray, playSuccessSound, playErrorSound, showConfetti } from '../../utils/gameLogic';

function Operations({ score, onScoreUpdate }) {
  const [expression, setExpression] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [options, setOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const operation = Math.random() > 0.5 ? '+' : '-';
    let num1, num2, answer;

    if (operation === '+') {
      num1 = getRandomNumber(1, 50);
      num2 = getRandomNumber(1, 50);
      answer = num1 + num2;
    } else {
      num1 = getRandomNumber(10, 50);
      num2 = getRandomNumber(1, num1);
      answer = num1 - num2;
    }

    setExpression(`${num1} ${operation} ${num2} = ؟`);
    setCorrectAnswer(answer);

    // Generate options
    const opts = [answer];
    while (opts.length < 4) {
      const offset = getRandomNumber(-10, 10);
      const wrongAnswer = answer + offset;
      if (wrongAnswer > 0 && !opts.includes(wrongAnswer)) {
        opts.push(wrongAnswer);
      }
    }

    setOptions(shuffleArray(opts));
    setAnswered(false);
  };

  const checkAnswer = (selected) => {
    if (answered) return;

    setAnswered(true);

    if (selected === correctAnswer) {
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
        <p className="lead">احسبي الناتج الصحيح!</p>
      </div>

      <div id="question-area">
        <div className="text-center mb-5">
          <div className="number-display" style={{ fontSize: '5rem' }}>
            {expression}
          </div>
        </div>
        <div className="options-grid">
          {options.map((num, index) => (
            <button
              key={index}
              className={`option-btn ${
                answered
                  ? num === correctAnswer
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

export default Operations;
