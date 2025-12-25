'use client'

import React from 'react'

interface BridgeIconProps {
  size?: number
  className?: string
}

export default function BridgeIcon({ size = 32, className = '' }: BridgeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bridge-icon ${className}`}
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF6B9D" />
        </linearGradient>
      </defs>
      
      {/* Bridge arc connecting the letters */}
      <path
        d="M10 40 Q32 6, 54 40"
        stroke="url(#bridgeGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="bridge-arc"
      />
      
      {/* Left letter - "A" (English) in dark gray */}
      <text
        x="10"
        y="56"
        fontSize="20"
        fill="#4a4a4a"
        fontWeight="600"
        textAnchor="middle"
        fontFamily="Avenir Next, Avenir, Arial, sans-serif"
        className="letter-left"
      >
        A
      </text>
      
      {/* Right letter - "ع" (Arabic) in dark gray */}
      <text
        x="54"
        y="56"
        fontSize="20"
        fill="#4a4a4a"
        fontWeight="600"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        className="letter-right"
      >
        ع
      </text>
    </svg>
  )
}
