'use client'

import { useEffect, useRef } from 'react'

interface AudioWaveProps {
  direction?: 'left' | 'right'
  color?: string
  isActive?: boolean
}

export default function AudioWave({ direction = 'left', color = '#FF6B6B', isActive = true }: AudioWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerY = height / 2

    // Helper function to adjust color opacity (works with hex and rgb)
    const adjustOpacity = (colorValue: string, newOpacity: number): string => {
      // If it's hex color, convert to rgba
      if (colorValue.startsWith('#')) {
        const hex = colorValue.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        return `rgba(${r}, ${g}, ${b}, ${newOpacity})`
      }
      // If it's already rgba, extract and adjust
      const match = colorValue.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
      if (match) {
        const r = match[1]
        const g = match[2]
        const b = match[3]
        return `rgba(${r}, ${g}, ${b}, ${newOpacity})`
      }
      return colorValue
    }

    // Number of bars
    const barCount = 40
    const barWidth = width / barCount
    const gap = barWidth * 0.3

    let animationFrame: number

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth + gap / 2
        const progress = isActive 
          ? (i / barCount + Date.now() * 0.002) % 1
          : (i / barCount) % 1
        
        // Create wave pattern with varying heights
        const wave1 = Math.sin(progress * Math.PI * 2 + i * 0.3) * 0.5 + 0.5
        const wave2 = Math.sin(progress * Math.PI * 4 + i * 0.5) * 0.3 + 0.7
        const heightMultiplier = isActive ? wave1 * wave2 : 0.1

        // Bar height (minimum 5px, maximum based on wave)
        const barHeight = isActive 
          ? 5 + heightMultiplier * (height * 0.4)
          : 5

        // Gradient for the bars with adjusted opacity - make waves more visible
        const gradient = ctx.createLinearGradient(x, centerY - barHeight, x, centerY + barHeight)
        gradient.addColorStop(0, adjustOpacity(color, 1.0))
        gradient.addColorStop(0.5, adjustOpacity(color, 0.95))
        gradient.addColorStop(1, adjustOpacity(color, 0.85))

        ctx.fillStyle = gradient
        ctx.fillRect(x, centerY - barHeight / 2, barWidth - gap, barHeight)
      }

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [color, isActive])

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      style={{
        width: '100%',
        height: '100%',
        transform: direction === 'right' ? 'scaleX(-1)' : 'none'
      }}
    />
  )
}

