'use client'

import { useState, useEffect } from 'react'

export default function ComparisonGame() {
  const [score, setScore] = useState(0)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [correctSymbol, setCorrectSymbol] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const symbols = ['>', '<', '=']

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const generateQuestion = () => {
    const n1 = getRandomNumber(1, 100)
    const n2 = getRandomNumber(1, 100)
    
    let correct
    if (n1 > n2) {
      correct = '>'
    } else if (n1 < n2) {
      correct = '<'
    } else {
      correct = '='
    }
    
    setNum1(n1)
    setNum2(n2)
    setCorrectSymbol(correct)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  useEffect(() => {
    generateQuestion()
  }, [])

  const handleAnswer = (selected: string) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(selected)
    const correct = selected === correctSymbol
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
        <p className="text-lg font-medium text-salma-text">اختاري الإشارة الصحيحة!</p>
      </div>

      <div className="bg-gradient-to-br from-salma-pink-light to-salma-orange-light rounded-2xl p-12 mb-8 text-center">
        <div className="text-6xl font-bold text-salma-primary flex items-center justify-center gap-8">
          <span>{num1}</span>
          <span className="text-salma-secondary">__</span>
          <span>{num2}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {symbols.map((symbol) => {
          const isSelected = selectedAnswer === symbol
          const isCorrectAnswer = symbol === correctSymbol
          const buttonClass = isSelected
            ? isCorrect
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
            : isCorrectAnswer && selectedAnswer !== null
            ? 'bg-green-500 text-white'
            : 'bg-white hover:bg-salma-primary/10 text-salma-text'

          return (
            <button
              key={symbol}
              onClick={() => handleAnswer(symbol)}
              disabled={selectedAnswer !== null}
              className={`${buttonClass} text-4xl font-bold py-8 rounded-xl border-2 border-salma-primary/30 transition-all hover:scale-105 disabled:hover:scale-100`}
            >
              {symbol}
            </button>
          )
        })}
      </div>
    </div>
  )
}
