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
      <defs>
        <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B">
            <animate
              attributeName="stop-color"
              values="#FF6B6B;#4A90E2;#FF6B6B"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#4A90E2">
            <animate
              attributeName="stop-color"
              values="#4A90E2;#FF6B6B;#4A90E2"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <linearGradient id="bottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A90E2">
            <animate
              attributeName="stop-color"
              values="#4A90E2;#FF6B6B;#4A90E2"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#FF6B6B">
            <animate
              attributeName="stop-color"
              values="#FF6B6B;#4A90E2;#FF6B6B"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* White circle background */}
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="white"
        className="circle-bg"
      />
      
      {/* Red shape (left) - abstract communication symbol */}
      <path
        d="M18 28 L18 36 L24 40 L24 32 L22 30 L20 28 Z"
        fill="#FF6B6B"
        opacity="0.9"
        className="red-shape"
        filter="url(#glow)"
      >
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Blue shape (right) - overlapping with red */}
      <path
        d="M46 28 L46 36 L40 40 L40 32 L42 30 L44 28 Z"
        fill="#4A90E2"
        opacity="0.9"
        className="blue-shape"
        filter="url(#glow)"
      >
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="3s"
          repeatCount="indefinite"
          begin="1.5s"
        />
      </path>
      
      {/* Overlapping area - purple blend */}
      <path
        d="M30 30 L34 30 L32 38 L30 38 Z"
        fill="#9B59B6"
        opacity="0.7"
        className="overlap"
      >
        <animate
          attributeName="opacity"
          values="0.7;0.9;0.7"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Top vertical line - gradient from red to blue */}
      <rect
        x="30"
        y="8"
        width="4"
        height="8"
        fill="url(#topGradient)"
        className="top-line"
      />
      
      {/* Bottom vertical line - gradient from blue to red */}
      <rect
        x="30"
        y="48"
        width="4"
        height="8"
        fill="url(#bottomGradient)"
        className="bottom-line"
      />
    </svg>
  )
}

