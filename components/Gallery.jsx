'use client'
import { useState } from 'react'
import Image from 'next/image'
import { config } from '@/config/wedding'
import ScrollReveal from './ScrollReveal'

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section style={{ background: '#2C1A0E', padding: '80px 0' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#B8965A',
              marginBottom: '12px',
            }}>
              Gallery
            </p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 7vw, 2.8rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#FAF7F2',
            }}>
              Momen Bersama
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="gallery-grid" style={{ padding: '0 8px', maxWidth: '720px', margin: '0 auto' }}>
          {config.gallery.map((src, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightbox(src)}
              title="Klik untuk perbesar"
            >
              <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Foto diperbesar"
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'none', border: 'none', color: '#FAF7F2',
              fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
            }}
            aria-label="Tutup"
          >
            ×
          </button>
          <img src={lightbox} alt="Foto diperbesar" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}
