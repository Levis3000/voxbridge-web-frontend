'use client'

import { useEffect, useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false) // Start muted, user can enable
  const [volume, setVolume] = useState(0.25) // More audible volume
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const isPlayingRef = useRef(false)
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Create subtle ambient background music using Web Audio API
  const createAmbientMusic = () => {
    if (typeof window === 'undefined' || !window.AudioContext && !(window as any).webkitAudioContext) {
      return
    }

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const audioContext = new AudioContextClass()
      audioContextRef.current = audioContext

      // Create a subtle ambient pad with multiple oscillators for richness
      const oscillators: OscillatorNode[] = []
      const gainNodes: GainNode[] = []
      const masterGain = audioContext.createGain()
      masterGain.gain.value = volume * 0.5 // More audible but still subtle

      // Create a gentle chord progression (A minor - very peaceful)
      const frequencies = [
        [220, 261.63, 329.63], // A-C-E (A minor)
        [246.94, 293.66, 369.99], // B-D-F# (B diminished)
        [196, 233.08, 293.66], // G-Bb-D (G minor)
        [220, 261.63, 329.63], // Back to A minor
      ]

      frequencies.forEach((chord, chordIndex) => {
        chord.forEach((freq, noteIndex) => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.type = 'sine' // Soft sine wave
          oscillator.frequency.value = freq * 0.5 // Lower octave for subtlety
          
          // Very gentle fade in/out for each note
          const startTime = audioContext.currentTime + (chordIndex * 3)
          const endTime = startTime + 2.8
          
          gainNode.gain.setValueAtTime(0, startTime)
          gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.5)
          gainNode.gain.linearRampToValueAtTime(0.15, endTime - 0.5)
          gainNode.gain.linearRampToValueAtTime(0, endTime)
          
          oscillator.connect(gainNode)
          gainNode.connect(masterGain)
          
          oscillator.start(startTime)
          oscillator.stop(endTime)
          
          oscillators.push(oscillator)
          gainNodes.push(gainNode)
        })
      })

      masterGain.connect(audioContext.destination)
      gainNodeRef.current = masterGain

      // Store first oscillator for reference
      if (oscillators.length > 0) {
        oscillatorRef.current = oscillators[0]
      }

      // Loop after the full progression (12 seconds)
      loopTimerRef.current = setTimeout(() => {
        if (isPlayingRef.current && audioContextRef.current && audioContextRef.current.state !== 'closed') {
          oscillators.forEach(osc => {
            try {
              osc.stop()
            } catch (e) {
              // Already stopped
            }
          })
          if (isPlayingRef.current) {
            createAmbientMusic()
          }
        }
      }, 12000)
    } catch (error) {
      console.log('Could not create ambient music:', error)
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      // Stop music
      isPlayingRef.current = false
      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current)
        loopTimerRef.current = null
      }
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (e) {
          // Already stopped
        }
        oscillatorRef.current = null
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close()
        } catch (e) {
          // Already closed
        }
        audioContextRef.current = null
      }
      setIsPlaying(false)
    } else {
      // Start music - user interaction required for autoplay
      isPlayingRef.current = true
      setIsPlaying(true)
      // Resume audio context if suspended (browser autoplay policy)
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
      setTimeout(() => {
        if (isPlayingRef.current) {
          createAmbientMusic()
        }
      }, 100)
    }
  }

  // Update ref when state changes
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      isPlayingRef.current = false
      if (loopTimerRef.current) {
        clearTimeout(loopTimerRef.current)
      }
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch (e) {
          // Already stopped
        }
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close()
        } catch (e) {
          // Already closed
        }
      }
    }
  }, [])

  useEffect(() => {
    // Update volume when it changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume
    }
  }, [volume])

  return (
    <button
      className="music-toggle-button"
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Stop background music' : 'Play background music'}
      title={isPlaying ? 'Stop background music' : 'Play background music'}
    >
      {isPlaying ? (
        <Music size={20} />
      ) : (
        <VolumeX size={20} />
      )}
    </button>
  )
}

