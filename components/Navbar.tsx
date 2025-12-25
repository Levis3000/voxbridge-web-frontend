'use client'

import { scrollToWaitlist } from '@/utils/scroll'
import { Smartphone } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-text">
              <span className="logo-g">G</span>
              <span className="logo-rest">l</span>
              <span className="logo-o">ö</span>
              <span className="logo-rest">t-</span>
              <span className="logo-rest">B</span>
              <span className="logo-rest">rid</span>
              <span className="logo-ayn">ع</span>
            </span>
          </div>
          <div className="nav-actions">
            <div className="app-store-badge">
              <Smartphone size={18} />
              <span>Coming soon to iOS App Store</span>
            </div>
            <button className="cta-button primary nav-cta" onClick={scrollToWaitlist}>
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

