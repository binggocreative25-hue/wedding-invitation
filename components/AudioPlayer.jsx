'use client'
import { useWeddingConfig } from '@/contexts/ClientConfig'
import { useState, useRef, useEffect } from 'react'

export default function AudioPlayer({ autoPlay = false }) {
  const config = useWeddingConfig()
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  if (!config.music?.enabled) return null

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.4
    audio.loop   = true

    if (autoPlay) {
      const tryPlay = () => {
        audio.play()
          .then(() => setPlaying(true))
          .catch(() => {}) // Browser block autoplay - user must interact first
      }
      tryPlay()
    }
  }, [autoPlay])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={config.music.src} preload="none" />
      <button
        className={`audio-player ${playing ? 'playing' : ''}`}
        onClick={toggle}
        title={playing ? 'Pause musik' : `Play: ${config.music.title}`}
        aria-label={playing ? 'Pause musik' : 'Play musik'}
      >
        {playing ? (
          // Pause icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FAF7F2">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // Play icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#FAF7F2">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </>
  )
}
