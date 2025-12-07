'use client'

import { useState, useEffect } from 'react'

export default function NumbersGame() {
  const [score, setScore] = useState(0)
  const [correctNumber, setCorrectNumber] = useState(0)
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
    const correct = getRandomNumber(1, 100)
    const opts = [correct]
    
    while (opts.length < 4) {
      const wrongNumber = getRandomNumber(1, 100)
      if (!opts.includes(wrongNumber)) {
        opts.push(wrongNumber)
      }
    }
    
    setCorrectNumber(correct)
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
    const correct = selected === correctNumber
    setIsCorrect(correct)
    
    if (correct) {
      setScore(score + 10)
      playSuccessSound()
    } else {
      playErrorSound()
    }
    
    setTimeout(() => {
      generateQuestion()
    }, 1500)
  }

  const playSuccessSound = () => {
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 523.25
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  const playErrorSound = () => {
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 200
      oscillator.type = 'sawtooth'
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }
  }

  return (
    <div>
      {/* Score Display */}
      <div className="bg-salma-accent/20 rounded-xl p-4 mb-6 text-center">
        <h4 className="text-sm font-semibold text-salma-text mb-1">النقاط</h4>
        <div className="text-3xl font-bold text-salma-text">{score}</div>
      </div>

      {/* Instructions */}
      <div className="text-center mb-6">
        <p className="text-lg font-medium text-salma-text">اختاري الرقم الصحيح!</p>
      </div>

      {/* Number Display */}
      <div className="bg-gradient-to-br from-salma-pink-light to-salma-orange-light rounded-2xl p-12 mb-8 text-center">
        <div className="text-8xl font-bold text-salma-primary">{correctNumber}</div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-4">
        {options.map((num) => {
          const isSelected = selectedAnswer === num
          const isCorrectAnswer = num === correctNumber
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
