'use client'
import { useWeddingConfig } from '@/contexts/ClientConfig'

function Ornament() {
  return (
    <svg width="200" height="20" viewBox="0 0 200 20" fill="none" aria-hidden="true">
      <line x1="0" y1="10" x2="88" y2="10" stroke="rgba(250,247,242,0.5)" strokeWidth="0.6" />
      <rect x="95" y="5" width="10" height="10" fill="rgba(250,247,242,0.7)" transform="rotate(45 100 10)" />
      <line x1="112" y1="10" x2="200" y2="10" stroke="rgba(250,247,242,0.5)" strokeWidth="0.6" />
    </svg>
  )
}

export default function Hero() {
  // Format tanggal dari config
  const config = useWeddingConfig()
  const eventDate = new Date(config.weddingDateTime)
  const formattedDate = eventDate.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <section
    
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      
      }}
    >
      <div
  style={{
    position: 'absolute',
    inset: 0,
    backgroundImage: `url("${config.heroImage}")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
pointerEvents: 'none',
  }}
/>

<div
  style={{
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(
        to bottom,
        rgba(44,26,14,0.55) 0%,
        rgba(44,26,14,0.3) 50%,
        rgba(44,26,14,0.7) 100%
      )
    `,
    zIndex: 0,
    pointerEvents: 'none',
  }}
/>
      {/* Content */}
      <div style={{
        textAlign: 'center',
        color: '#FAF7F2',
        padding: '40px 24px',
        zIndex: 1,
        position: 'relative',
      }}>
        <p style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.65rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '40px',
          animation: 'fadeUp 0.8s ease 0.2s both',
        }}>
          The Wedding of
        </p>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(3.5rem, 12vw, 7rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1,
          animation: 'fadeUp 0.9s ease 0.4s both',
        }}>
          {config.bride.nickname}
        </h1>

        <div style={{ margin: '16px 0', animation: 'fadeIn 0.8s ease 0.7s both' }}>
          <Ornament />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(3.5rem, 12vw, 7rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1,
          animation: 'fadeUp 0.9s ease 0.6s both',
        }}>
          {config.groom.nickname}
        </h1>

        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
          fontWeight: 300,
          opacity: 0.85,
          marginTop: '36px',
          letterSpacing: '0.08em',
          animation: 'fadeUp 0.9s ease 0.9s both',
        }}>
          {formattedDate}
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'fadeIn 1s ease 1.5s both',
      }}>
        <p style={{
          fontFamily: 'var(--font-jost)',
          fontSize: '0.6rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(250,247,242,0.6)',
        }}>Scroll</p>
        <svg width="1" height="48" viewBox="0 0 1 48" fill="none">
          <line x1="0.5" y1="0" x2="0.5" y2="48" stroke="rgba(250,247,242,0.4)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  )
}
