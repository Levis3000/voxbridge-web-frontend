'use client'

import { useEffect, useRef } from 'react'
import { HelpCircle } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Just Call!',
    description: 'Open the app and call someone—it\'s that simple! No complicated setup needed.'
  },
  {
    number: 2,
    title: 'Pick Your Languages',
    description: 'Tell us what languages you both speak, and we\'ll take care of everything else!'
  },
  {
    number: 3,
    title: 'Chat Away!',
    description: 'Talk like you normally would! They\'ll hear everything in their language, instantly.'
  },
  {
    number: 4,
    title: 'That\'s It!',
    description: 'Just enjoy your conversation! No barriers, no confusion—just two people connecting!'
  }
]

export default function HowItWorks() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    stepsRef.current.forEach((step) => {
      if (step) {
        step.style.opacity = '0'
        step.style.transform = 'translateY(20px)'
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(step)
      }
    })

    return () => {
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step)
      })
    }
  }, [])

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How Does It Work? <HelpCircle className="inline-icon" size={36} /></h2>
        <div className="steps">
          {steps.map((step) => (
            <div
              key={step.number}
              className="step"
              ref={(el) => (stepsRef.current[step.number - 1] = el)}
              style={{ '--i': step.number } as React.CSSProperties}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
