'use client'

import { useState, useEffect } from 'react'

export default function PlaceValueGame() {
  const [score, setScore] = useState(0)
  const [number, setNumber] = useState(0)
  const [position, setPosition] = useState('')
  const [correctDigit, setCorrectDigit] = useState(0)
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
    const num = getRandomNumber(10, 999)
    const numberStr = num.toString()
    const positions = ['آحاد', 'عشرات', 'مئات']
    const positionIndex = getRandomNumber(0, numberStr.length - 1)
    const pos = positions[positionIndex]
    const correct = parseInt(numberStr[numberStr.length - 1 - positionIndex])
    
    const opts = [correct]
    while (opts.length < 4) {
      const wrongDigit = getRandomNumber(0, 9)
      if (!opts.includes(wrongDigit)) {
        opts.push(wrongDigit)
      }
    }
    
    setNumber(num)
    setPosition(pos)
    setCorrectDigit(correct)
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
    const correct = selected === correctDigit
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 15)
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
        <p className="text-lg font-medium text-salma-text">ما هي قيمة الرقم في المنزلة المحددة؟</p>
      </div>

      <div className="bg-gradient-to-br from-salma-pink-light to-salma-orange-light rounded-2xl p-12 mb-4 text-center">
        <div className="text-8xl font-bold text-salma-primary mb-6">{number}</div>
        <h4 className="text-2xl font-semibold text-salma-text">
          ما قيمة منزلة <span className="text-salma-secondary">{position}</span>؟
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((digit) => {
          const isSelected = selectedAnswer === digit
          const isCorrectAnswer = digit === correctDigit
          const buttonClass = isSelected
            ? isCorrect
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
            : isCorrectAnswer && selectedAnswer !== null
            ? 'bg-green-500 text-white'
            : 'bg-white hover:bg-salma-primary/10 text-salma-text'

          return (
            <button
              key={digit}
              onClick={() => handleAnswer(digit)}
              disabled={selectedAnswer !== null}
              className={`${buttonClass} text-2xl font-bold py-6 rounded-xl border-2 border-salma-primary/30 transition-all hover:scale-105 disabled:hover:scale-100`}
            >
              {digit}
            </button>
          )
        })}
      </div>
    </div>
  )
}
