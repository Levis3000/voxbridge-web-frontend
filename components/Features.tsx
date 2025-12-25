'use client'

import { useEffect, useRef } from 'react'
import { Zap, Globe, Target, Lock, Briefcase, Palette, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Super Fast!',
    description: 'No awkward pauses or waiting around. Your words get translated in the blink of an eye!'
  },
  {
    icon: Globe,
    title: 'Speak Any Language',
    description: '100+ languages and counting! Chat with friends from Tokyo to Paris, no problem!'
  },
  {
    icon: Target,
    title: 'Crystal Clear',
    description: 'Every word comes through perfectly. No more "what did you say?" moments!'
  },
  {
    icon: Lock,
    title: 'Your Secrets Stay Safe',
    description: 'We keep your chats private and secure. Your conversations are just between you two!'
  },
  {
    icon: Briefcase,
    title: 'Works Everywhere',
    description: 'Business calls, catching up with friends, or meeting new people—it works for everything!'
  },
  {
    icon: Palette,
    title: 'Super Easy',
    description: 'Just tap and talk! No complicated setup, no learning curve. It just works!'
  }
]

export default function Features() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    cardsRef.current.forEach((card) => {
      if (card) {
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px)'
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        observer.observe(card)
      }
    })

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card)
      })
    }
  }, [])

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title">What Makes Us Special? <Sparkles className="inline-icon" size={36} /></h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="feature-card"
                ref={(el) => { cardsRef.current[index] = el }}
                style={{ '--i': index } as React.CSSProperties}
              >
                <div className="feature-icon">
                  <IconComponent size={48} strokeWidth={2} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
