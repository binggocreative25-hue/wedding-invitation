'use client'
import { useState, useEffect } from 'react'
import { config } from '@/config/wedding'
import ScrollReveal from './ScrollReveal'

function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isPast, setIsPast]   = useState(false)

  useEffect(() => {
    const target = new Date(config.weddingDateTime).getTime()

    const calc = () => {
      const now  = Date.now()
      const diff = target - now

      if (diff <= 0) {
        setIsPast(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days    = Math.floor(diff / 86400000)
      const hours   = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  const eventDate = new Date(config.weddingDateTime)
  const formattedDate = eventDate.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <section style={{ background: '#2C1A0E', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(250,247,242,0.4)',
            marginBottom: '16px',
          }}>
            Save The Date
          </p>

          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
            fontStyle: 'italic',
            color: '#FAF7F2',
            marginBottom: '48px',
            opacity: 0.85,
          }}>
            {formattedDate}
          </p>
        </ScrollReveal>

        {isPast ? (
          <ScrollReveal>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '2rem',
              fontStyle: 'italic',
              color: '#B8965A',
            }}>
              Kami sudah menikah 🤍
            </p>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={2}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(16px, 4vw, 40px)',
              flexWrap: 'nowrap',
            }}>
              {timeLeft && [
                { label: 'Hari',   value: timeLeft.days    },
                { label: 'Jam',    value: timeLeft.hours   },
                { label: 'Menit',  value: timeLeft.minutes },
                { label: 'Detik',  value: timeLeft.seconds },
              ].map(({ label, value }, i) => (
                <div key={label} className="countdown-box">
                  <span
                    className="countdown-number"
                    style={{ color: '#B8965A' }}
                  >
                    {value < 10 && label !== 'Hari' ? pad(value) : value}
                  </span>
                  <span className="countdown-label" style={{ color: 'rgba(250,247,242,0.4)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
