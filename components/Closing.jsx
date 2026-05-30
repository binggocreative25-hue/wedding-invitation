'use client'
import { useWeddingConfig } from '@/contexts/ClientConfig'
import ScrollReveal from './ScrollReveal'

function Ornament() {
  return (
    <svg width="160" height="20" viewBox="0 0 160 20" fill="none" aria-hidden="true">
      <line x1="0" y1="10" x2="68" y2="10" stroke="rgba(184,150,90,0.4)" strokeWidth="0.6" />
      <rect x="74" y="5" width="10" height="10" fill="#B8965A" opacity="0.6" transform="rotate(45 79 10)" />
      <line x1="90" y1="10" x2="160" y2="10" stroke="rgba(184,150,90,0.4)" strokeWidth="0.6" />
    </svg>
  )
}

export default function Closing() {
  const config = useWeddingConfig()
  const { bride, groom, closing } = config

  return (
    <section style={{
      background: '#2C1A0E',
      padding: '100px 24px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(184,150,90,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
        <ScrollReveal>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
          }}>
            <Ornament />
          </div>

          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
            fontStyle: 'italic',
            color: 'rgba(250,247,242,0.55)',
            lineHeight: 1.9,
            marginBottom: '8px',
          }}>
            {closing.quote}
          </p>

          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            color: '#B8965A',
            marginBottom: '56px',
          }}>
            {closing.source}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.78rem',
            color: 'rgba(250,247,242,0.5)',
            lineHeight: 1.9,
            marginBottom: '56px',
          }}>
            {closing.message}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.35)',
            marginBottom: '12px',
          }}>
            Dengan Cinta,
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.5rem, 8vw, 3.5rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#FAF7F2',
            lineHeight: 1.15,
          }}>
            {bride.nickname} &amp; {groom.nickname}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={4}>
          <div style={{
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(184,150,90,0.15)',
          }}>
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.2)',
              marginBottom: '4px',
            }}>
              Dibuat dengan ♥ oleh
            </p>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1rem',
              fontStyle: 'italic',
              color: 'rgba(184,150,90,0.4)',
            }}>
              Binggo Creative
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
