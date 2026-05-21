'use client'
import { useState } from 'react'
import { config } from '@/config/wedding'

// SVG ornament component
function Ornament() {
  return (
    <svg width="180" height="20" viewBox="0 0 180 20" fill="none" aria-hidden="true">
      <line x1="0" y1="10" x2="78" y2="10" stroke="#B8965A" strokeWidth="0.6" />
      <rect x="84" y="5" width="10" height="10" fill="#B8965A" transform="rotate(45 89 10)" />
      <line x1="100" y1="10" x2="180" y2="10" stroke="#B8965A" strokeWidth="0.6" />
    </svg>
  )
}

export default function Opening({ guestName, onOpen }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleOpen = () => {
    setIsClosing(true)
    setTimeout(onOpen, 900)
  }

  return (
    <div className={`opening-overlay ${isClosing ? 'closing' : ''}`}>
      {/* Decorative corner borders */}
      <div style={{
        position: 'absolute', inset: '20px', border: '1px solid rgba(184,150,90,0.25)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', inset: '26px', border: '1px solid rgba(184,150,90,0.12)',
        pointerEvents: 'none'
      }} />

      <div style={{ textAlign: 'center', padding: '40px 32px', maxWidth: '380px' }}>
        {/* Kepada */}
        <p style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#5C3D2E',
          opacity: 0.6,
          marginBottom: '8px',
          animation: 'fadeUp 0.8s ease 0.2s both',
        }}>
          Kepada Yth.
        </p>

        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.3rem, 4vw, 1.8rem)',
          fontWeight: 400,
          color: '#2C1A0E',
          marginBottom: '28px',
          animation: 'fadeUp 0.8s ease 0.4s both',
        }}>
          {guestName}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px', animation: 'fadeIn 0.8s ease 0.5s both' }}>
          <Ornament />
        </div>

        <p style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: '#5C3D2E',
          opacity: 0.7,
          marginBottom: '6px',
          animation: 'fadeUp 0.8s ease 0.6s both',
        }}>
          Turut mengundang kehadiran Bapak/Ibu/Saudara/i dalam pernikahan kami
        </p>

        <p style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: '#5C3D2E',
          opacity: 0.7,
          marginBottom: '24px',
          animation: 'fadeUp 0.8s ease 0.65s both',
        }}>
        
        </p>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2.4rem, 8vw, 3.4rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#2C1A0E',
          lineHeight: 1.15,
          marginBottom: '8px',
          animation: 'fadeUp 0.9s ease 0.75s both',
        }}>
          {config.bride.nickname}
        </h1>
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '1rem',
          color: '#B8965A',
          letterSpacing: '0.25em',
          marginBottom: '8px',
          animation: 'fadeIn 0.8s ease 0.9s both',
        }}>
          &amp;
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(2.4rem, 8vw, 3.4rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#2C1A0E',
          lineHeight: 1.15,
          marginBottom: '40px',
          animation: 'fadeUp 0.9s ease 0.95s both',
        }}>
          {config.groom.nickname}
        </h1>

        <div style={{ animation: 'fadeUp 0.9s ease 1.1s both' }}>
          <button className="btn-gold" onClick={handleOpen} style={{ width: '100%', justifyContent: 'center' }}>
            <span>✉</span>
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  )
}
