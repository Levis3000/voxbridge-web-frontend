'use client'

import { scrollToWaitlist } from '@/utils/scroll'
import { Smartphone } from 'lucide-react'
import BridgeIcon from './BridgeIcon'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <BridgeIcon className="logo-icon" size={32} />
            <span className="logo-text">GlotBridge</span>
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

