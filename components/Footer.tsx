import BridgeIcon from './BridgeIcon'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <BridgeIcon className="logo-icon" size={28} />
            <span className="logo-text">GlotBridge</span>
          </div>
          <p className="footer-text">Breaking language barriers, one call at a time.</p>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#waitlist">Waitlist</a>
            <a href="mailto:contact@glotbridge.com">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 GlotBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

