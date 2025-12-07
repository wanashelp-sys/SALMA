'use client'

import { useState, useEffect } from 'react'

export default function OperationsGame() {
  const [score, setScore] = useState(0)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operation, setOperation] = useState('+')
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [options, setOptions] = useState<number[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  const generateQuestion = () => {
    const op = Math.random() > 0.5 ? '+' : '-'
    let n1, n2, correct
    
    if (op === '+') {
      n1 = getRandomNumber(1, 50)
      n2 = getRandomNumber(1, 50)
      correct = n1 + n2
    } else {
      n1 = getRandomNumber(10, 50)
      n2 = getRandomNumber(1, n1)
      correct = n1 - n2
    }
    
    const opts = [correct]
    while (opts.length < 4) {
      const offset = getRandomNumber(-10, 10)
      const wrongAnswer = correct + offset
      if (wrongAnswer > 0 && !opts.includes(wrongAnswer)) {
        opts.push(wrongAnswer)
      }
    }
    
    setNum1(n1)
    setNum2(n2)
    setOperation(op)
    setCorrectAnswer(correct)
    setOptions(shuffleArray(opts))
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  const handleAnswer = (selected: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(selected)
    const correct = selected === correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 10)
    }
    
    setTimeout(() => {
      generateQuestion()
    }, 1500)
  }

  return (
    <div>
      <div className="bg-salma-accent/20 rounded-xl p-4 mb-6 text-center">
        <h4 className="text-sm font-semibold text-salma-text mb-1">النقاط</h4>
        <div className="text-3xl font-bold text-salma-text">{score}</div>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg font-medium text-salma-text">احسبي الناتج الصحيح!</p>
      </div>

      <div className="bg-gradient-to-br from-salma-pink-light to-salma-orange-light rounded-2xl p-12 mb-8 text-center">
        <div className="text-6xl font-bold text-salma-primary">
          {num1} {operation} {num2} = ؟
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((num) => {
          const isSelected = selectedAnswer === num
          const isCorrectAnswer = num === correctAnswer
          const buttonClass = isSelected
            ? isCorrect
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
            : isCorrectAnswer && selectedAnswer !== null
            ? 'bg-green-500 text-white'
            : 'bg-white hover:bg-salma-primary/10 text-salma-text'

          return (
            <button
              key={num}
              onClick={() => handleAnswer(num)}
              disabled={selectedAnswer !== null}
              className={`${buttonClass} text-2xl font-bold py-6 rounded-xl border-2 border-salma-primary/30 transition-all hover:scale-105 disabled:hover:scale-100`}
            >
              {num}
            </button>
          )
        })}
      </div>
    </div>
  )
}
