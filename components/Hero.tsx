'use client'

import { scrollToWaitlist } from '@/utils/scroll'
import TwoPhonesDemo from './TwoPhonesDemo'
import CommunicationStruggle from './CommunicationStruggle'
import { Plane, Languages } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          {/* Title at Top */}
          <div className="hero-header">
            <h1 className="hero-title">
              Say What Now!!
            </h1>
            <p className="hero-subtitle">
              You&apos;re in a new country, trying to order food, ask for directions, or just have a chat. 
              Instead of awkward hand gestures and confused looks, imagine speaking naturally—they hear you in their language, 
              you hear them in yours. No more &quot;pointing at the menu&quot; moments! 
              <Plane className="inline-icon" size={20} /> <Languages className="inline-icon" size={20} />
            </p>
            {/* Communication Struggle Visual */}
            <div className="struggle-visual-wrapper">
              <CommunicationStruggle />
            </div>
          </div>

          {/* Animation in Middle */}
          <div className="hero-visual">
            <div className="translation-demo-wrapper comic-panel">
              <TwoPhonesDemo />
            </div>
          </div>

          {/* CTA Button at Bottom */}
          <div className="hero-footer">
            <button className="cta-button primary glass-button" onClick={scrollToWaitlist}>
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

