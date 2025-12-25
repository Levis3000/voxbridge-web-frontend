'use client'

import { useState, useEffect } from 'react'
import { Hand } from 'lucide-react'

const phrases = [
  {
    english: "Do you have...",
    arabic: "ماء؟",
    translation: "(water?)",
    gesture: "drinking"
  },
  {
    english: "Where is the...",
    arabic: "الحمام؟",
    translation: "(bathroom?)",
    gesture: "pinky"
  },
  {
    english: "How much...",
    arabic: "هذا؟",
    translation: "(this?)",
    gesture: "pointing"
  }
]

const confusedResponses = [
  "آآآه... ماذا تقول؟",
  "آآآه... لا أفهم",
  "آآآه... ماذا تعني؟"
]

export default function CommunicationStruggle() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setShowResponse(false)
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsAnimating(false)
        // Show confused response after a delay
        setTimeout(() => {
          setShowResponse(true)
        }, 1500)
      }, 500)
    }, 5000)

    // Initial response
    setTimeout(() => {
      setShowResponse(true)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const phrase = phrases[currentPhrase]
  const confusedResponse = confusedResponses[currentPhrase]

  return (
    <div className="communication-struggle">
      {/* Speaker (Traveler) */}
      <div className="struggle-character speaker-character">
        <div className="character-body">
          <div className="character-head">
            <div className="character-face">
              <div className="character-eyes">
                <div className="character-eye"></div>
                <div className="character-eye"></div>
              </div>
              <div className="character-mouth"></div>
            </div>
          </div>
          <div className="character-hands">
            {phrase.gesture === 'drinking' ? (
              <div className="drinking-gesture">
                <Hand className="hand-gesture hand-drinking" size={32} />
                <div className="drinking-cup"></div>
              </div>
            ) : phrase.gesture === 'pinky' ? (
              <Hand className="hand-gesture hand-pinky" size={32} />
            ) : (
              <>
                <Hand className="hand-gesture hand-left" size={32} />
                <Hand className="hand-gesture hand-right" size={32} />
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Speech Bubble */}
      <div className={`thinking-bubble ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        <div className="bubble-content">
          <span className="bubble-text-english">{phrase.english}</span>
          <span className="bubble-text-arabic">{phrase.arabic}</span>
          <span className="bubble-text-translation">{phrase.translation}</span>
        </div>
        <div className="bubble-tail"></div>
      </div>

      {/* Confused Listener */}
      <div className="struggle-character listener-character">
        <div className="character-body">
          <div className="character-head listener-head">
            <div className="character-face listener-face">
              <div className="character-eyes listener-eyes">
                <div className="character-eye listener-eye"></div>
                <div className="character-eye listener-eye"></div>
              </div>
              <div className="character-mouth listener-mouth"></div>
              <div className="confusion-marks">
                <span className="confusion-mark">?</span>
                <span className="confusion-mark">?</span>
              </div>
            </div>
          </div>
          <div className="confused-hands">
            <Hand className="hand-gesture confused-hand" size={28} />
          </div>
        </div>
        {/* Confused Response Bubble */}
        {showResponse && (
          <div className={`listener-response-bubble ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="response-content">
              <span className="response-aaa">آآآه...</span>
              <span className="response-arabic">{confusedResponse}</span>
            </div>
            <div className="response-tail"></div>
          </div>
        )}
      </div>
    </div>
  )
}

