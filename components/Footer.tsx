export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
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

