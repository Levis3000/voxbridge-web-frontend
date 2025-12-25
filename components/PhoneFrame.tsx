'use client'

interface PhoneFrameProps {
  children: React.ReactNode
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="iphone-frame">
      <div className="iphone-notch"></div>
      <div className="iphone-screen">
        {children}
      </div>
      <div className="iphone-home-indicator"></div>
    </div>
  )
}

