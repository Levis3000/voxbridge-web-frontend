'use client'

import { useState, useEffect, useRef } from 'react'
import AudioWave from './AudioWave'
import { User, Globe2 } from 'lucide-react'

const englishPhrases = [
  "Hello, how are you?",
  "I'm doing great, thank you!",
  "What's your name?",
  "Nice to meet you!",
  "How can I help you today?",
  "That sounds wonderful!",
  "I understand perfectly.",
  "Let's continue our conversation."
]

const arabicPhrases = [
  "مرحبا، كيف حالك؟",
  "أنا بخير، شكرا لك!",
  "ما اسمك؟",
  "سررت بلقائك!",
  "كيف يمكنني مساعدتك اليوم؟",
  "يبدو ذلك رائعا!",
  "أفهم تماما.",
  "دعنا نواصل محادثتنا."
]

export default function TranslationDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const englishSynthRef = useRef<SpeechSynthesis | null>(null)
  const arabicSynthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      englishSynthRef.current = window.speechSynthesis
      arabicSynthRef.current = window.speechSynthesis
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % englishPhrases.length)
        setIsAnimating(false)
      }, 500)
    }, 6000) // Increased to 6 seconds to allow TTS to complete

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Speak when text changes
    if (!isAnimating && currentIndex >= 0 && englishSynthRef.current && arabicSynthRef.current) {
      const timer = setTimeout(() => {
        // Cancel any ongoing speech
        englishSynthRef.current?.cancel()
        arabicSynthRef.current?.cancel()

        setIsSpeaking(true)

        // Speak English first
        const englishUtterance = new SpeechSynthesisUtterance(englishPhrases[currentIndex])
        englishUtterance.lang = 'en-US'
        englishUtterance.rate = 0.9
        englishUtterance.pitch = 1
        englishUtterance.volume = 0.8

        englishUtterance.onend = () => {
          // After English finishes, speak Arabic
          setTimeout(() => {
            const arabicUtterance = new SpeechSynthesisUtterance(arabicPhrases[currentIndex])
            arabicUtterance.lang = 'ar-SA'
            arabicUtterance.rate = 0.9
            arabicUtterance.pitch = 1
            arabicUtterance.volume = 0.8

            arabicUtterance.onend = () => {
              setIsSpeaking(false)
            }

            arabicSynthRef.current?.speak(arabicUtterance)
          }, 300)
        }

        englishSynthRef.current.speak(englishUtterance)
      }, 600) // Wait for fade-in animation

      return () => {
        clearTimeout(timer)
        if (englishSynthRef.current) {
          englishSynthRef.current.cancel()
        }
        if (arabicSynthRef.current) {
          arabicSynthRef.current.cancel()
        }
      }
    }
  }, [currentIndex, isAnimating])

  return (
    <div className="translation-demo">
      <div className="demo-container">
        {/* English Side */}
        <div className="demo-side english-side">
          <div className="language-label">
            <Globe2 className="flag-icon" size={20} />
            <span>English</span>
          </div>
          <div className="speaker-card glass-card">
            <div className="speaker-avatar">
              <User size={32} />
            </div>
            <div className="speaker-text">
              <p className={isAnimating ? 'fade-out' : 'fade-in'}>
                {englishPhrases[currentIndex]}
              </p>
            </div>
          </div>
          <div className="audio-wave-container">
            <AudioWave direction="right" color="#FF6B6B" />
          </div>
        </div>

        {/* Center Connection */}
        <div className="demo-center">
          <div className="connection-line"></div>
          <div className="translation-icon">
            <Globe2 size={32} />
          </div>
          <div className="connection-line"></div>
        </div>

        {/* Arabic Side */}
        <div className="demo-side arabic-side">
          <div className="language-label">
            <Globe2 className="flag-icon" size={20} />
            <span>العربية</span>
          </div>
          <div className="audio-wave-container">
            <AudioWave direction="left" color="#4A90E2" />
          </div>
          <div className="speaker-card glass-card">
            <div className="speaker-avatar">
              <User size={32} />
            </div>
            <div className="speaker-text">
              <p className={isAnimating ? 'fade-out' : 'fade-in'} dir="rtl">
                {arabicPhrases[currentIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

