'use client'
import { useState } from 'react'
import { config } from '@/config/wedding'
import ScrollReveal from './ScrollReveal'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      style={{
        background: 'none',
        border: '1px solid #D4B47A',
        color: copied ? '#B8965A' : '#5C3D2E',
        fontFamily: 'var(--font-jost)',
        fontSize: '0.68rem',
        letterSpacing: '0.1em',
        padding: '6px 14px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓ Tersalin' : 'Salin'}
    </button>
  )
}

export default function GiftInfo() {
  if (!config.gifts?.enabled) return null

  return (
    <section style={{ background: '#F0E8DF', padding: '80px 24px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
        <ScrollReveal>
          <p style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💌</p>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#B8965A',
            marginBottom: '12px',
          }}>
            Amplop Digital
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#2C1A0E',
            marginBottom: '20px',
          }}>
            Tanda Kasih
          </h2>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.8rem',
            color: '#5C3D2E',
            opacity: 0.7,
            lineHeight: 1.8,
            marginBottom: '40px',
          }}>
            {config.gifts.message}
          </p>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {config.gifts.accounts.map((acc, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div className="gift-card">
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    fontFamily: 'var(--font-jost)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#B8965A',
                    marginBottom: '4px',
                  }}>
                    {acc.bank}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.3rem',
                    color: '#2C1A0E',
                    letterSpacing: '0.05em',
                  }}>
                    {acc.number}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-jost)',
                    fontSize: '0.75rem',
                    color: '#5C3D2E',
                    opacity: 0.65,
                    marginTop: '2px',
                  }}>
                    a.n. {acc.name}
                  </p>
                </div>
                <CopyButton text={acc.number} />
              </div>
            </ScrollReveal>
          ))}

          {config.gifts.gopay && (
            <ScrollReveal>
              <div className="gift-card">
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    fontFamily: 'var(--font-jost)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#B8965A',
                    marginBottom: '4px',
                  }}>
                    GoPay
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: '1.3rem',
                    color: '#2C1A0E',
                  }}>
                    {config.gifts.gopay}
                  </p>
                </div>
                <CopyButton text={config.gifts.gopay} />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
