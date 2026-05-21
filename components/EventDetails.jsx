import { config } from '@/config/wedding'
import ScrollReveal from './ScrollReveal'

function Divider() {
  return (
    <div className="divider">
      <div className="divider-line" />
      <div className="divider-diamond" />
      <div className="divider-line" />
    </div>
  )
}

function EventCard({ event }) {
  return (
    <div style={{
      border: '1px solid rgba(184,150,90,0.3)',
      padding: 'clamp(28px, 5vw, 40px)',
      textAlign: 'center',
      background: '#FAF7F2',
      position: 'relative',
    }}>
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: '8px', left: '8px', right: '8px', bottom: '8px',
        border: '1px solid rgba(184,150,90,0.12)',
        pointerEvents: 'none',
      }} />

      <p style={{ fontSize: '2rem', marginBottom: '12px' }}>{event.icon}</p>

      <p style={{
        fontFamily: 'var(--font-jost)',
        fontSize: '0.62rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#B8965A',
        marginBottom: '8px',
      }}>
        {event.name}
      </p>

      <Divider />

      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: '1.15rem',
        fontStyle: 'italic',
        color: '#2C1A0E',
        marginBottom: '4px',
        lineHeight: 1.5,
      }}>
        {event.date}
      </p>

      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: '1.3rem',
        color: '#B8965A',
        fontWeight: 500,
        marginBottom: '20px',
      }}>
        {event.time}
      </p>

      <div style={{
        width: '40px',
        height: '1px',
        background: 'rgba(184,150,90,0.3)',
        margin: '0 auto 20px',
      }} />

      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: '1.25rem',
        color: '#2C1A0E',
        marginBottom: '6px',
        fontWeight: 500,
      }}>
        {event.venue}
      </p>

      <p style={{
        fontFamily: 'var(--font-jost)',
        fontSize: '0.78rem',
        color: '#5C3D2E',
        opacity: 0.7,
        lineHeight: 1.7,
        marginBottom: '28px',
      }}>
        {event.address}
      </p>

      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline"
        style={{ fontSize: '0.7rem' }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        Buka Maps
      </a>
    </div>
  )
}

export default function EventDetails() {
  return (
    <section style={{ background: '#F0E8DF', padding: '80px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#B8965A',
              marginBottom: '12px',
            }}>
              Detail Acara
            </p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 7vw, 2.8rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#2C1A0E',
            }}>
              Rangkaian Acara
            </h2>
          </div>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {config.events.map((event, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <EventCard event={event} />
            </ScrollReveal>
          ))}
        </div>

        {/* Dress code / notes — opsional */}
        <ScrollReveal delay={3}>
          <div style={{
            textAlign: 'center',
            marginTop: '48px',
            padding: '24px',
            borderTop: '1px solid rgba(184,150,90,0.2)',
          }}>
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B8965A',
              marginBottom: '8px',
            }}>
              Dress Code
            </p>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#5C3D2E',
            }}>
              Bebas
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
