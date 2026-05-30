'use client'
import { useWeddingConfig } from '@/contexts/ClientConfig'
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

export default function OurStory() {
  const config = useWeddingConfig()
  return (
    <section style={{ background: '#FAF7F2' }}>
      {/* Couple Intro */}
      <div className="section" style={{ textAlign: 'center', paddingBottom: '60px' }}>
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.65rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#B8965A',
            marginBottom: '20px',
          }}>
            Bismillahirrahmanirrahim
          </p>

          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
            lineHeight: 1.85,
            color: '#5C3D2E',
            opacity: 0.85,
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}>
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami.
          </p>
        </ScrollReveal>

        {/* Bride & Groom cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginTop: '48px',
        }}>
          {[config.bride, config.groom].map((person, i) => (
            <ScrollReveal key={i} delay={i + 1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  border: '2px solid #D4B47A',
  overflow: 'hidden',
  margin: '0 auto 16px',
}}>
  <img
    src={person.photo}
    alt={person.nickname}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
</div>
                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                  fontStyle: 'italic',
                  color: '#2C1A0E',
                  marginBottom: '6px',
                }}>
                  {person.fullName}
                </p>
                <p style={{
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.78rem',
                  color: '#5C3D2E',
                  opacity: 0.65,
                  lineHeight: 1.6,
                }}>
                  {person.parents}
                </p>
                {person.instagram && (
                  <p style={{
                    fontFamily: 'var(--font-jost)',
                    fontSize: '0.72rem',
                    color: '#B8965A',
                    marginTop: '6px',
                  }}>
                    {person.instagram}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Our Story Timeline */}
      <div style={{ background: '#F0E8DF', padding: '80px 24px' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
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
                Our Story
              </p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 7vw, 2.8rem)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: '#2C1A0E',
              }}>
                Perjalanan Cinta Kami
              </h2>
              <Divider />
            </div>
          </ScrollReveal>

          <div>
            {config.story.map((item, i) => (
              <ScrollReveal key={i} delay={(i % 3) + 1}>
                <div className="timeline-item">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-line" />
                  <div className="timeline-content" style={{ paddingLeft: '4px' }}>
                    <p style={{
                      fontFamily: 'var(--font-jost)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#B8965A',
                      marginBottom: '4px',
                    }}>
                      {item.emoji} {item.title}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.05rem',
                      lineHeight: 1.75,
                      color: '#5C3D2E',
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
