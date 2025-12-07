import { useState, useEffect } from 'react';
import { getRandomNumber, playSuccessSound, playErrorSound, showConfetti } from '../../utils/gameLogic';

function Comparison({ score, onScoreUpdate }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [correctSymbol, setCorrectSymbol] = useState('');
  const [answered, setAnswered] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('');

  const symbols = ['>', '<', '='];

  useEffect(() => {
    generateQuestion();
  }, []);

  const generateQuestion = () => {
    const n1 = getRandomNumber(1, 100);
    const n2 = getRandomNumber(1, 100);

    setNum1(n1);
    setNum2(n2);

    let symbol;
    if (n1 > n2) {
      symbol = '>';
    } else if (n1 < n2) {
      symbol = '<';
    } else {
      symbol = '=';
    }

    setCorrectSymbol(symbol);
    setAnswered(false);
    setSelectedSymbol('');
  };

  const checkAnswer = (selected) => {
    if (answered) return;

    setAnswered(true);
    setSelectedSymbol(selected);

    if (selected === correctSymbol) {
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
        <p className="lead">اختاري الإشارة الصحيحة!</p>
      </div>

      <div id="question-area">
        <div className="text-center mb-5">
          <div className="number-display" style={{ fontSize: '4rem' }}>
            {num1} __ {num2}
          </div>
        </div>
        <div className="options-grid">
          {symbols.map((symbol, index) => (
            <button
              key={index}
              className={`option-btn ${
                answered
                  ? symbol === correctSymbol
                    ? 'correct'
                    : symbol === selectedSymbol
                    ? 'wrong'
                    : ''
                  : ''
              }`}
              onClick={() => checkAnswer(symbol)}
              disabled={answered}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comparison;
