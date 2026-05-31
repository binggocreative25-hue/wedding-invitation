'use client'
import { useWeddingConfig } from '@/contexts/ClientConfig'
import { useState, useEffect, useRef, useCallback } from 'react'
import ScrollReveal from './ScrollReveal'

export default function Gallery() {
  const config = useWeddingConfig()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const touchStartX = useRef(null)

  const images = config.gallery.filter(src => src !== config.heroImage)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() =>
    setLightboxIndex(i => (i - 1 + images.length) % images.length), [images.length])
  const nextImage = useCallback(() =>
    setLightboxIndex(i => (i + 1) % images.length), [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = e => {
      if (e.key === 'ArrowLeft')  prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape')     closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, prevImage, nextImage, closeLightbox])

  // Prevent scroll saat lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Touch swipe
  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = e => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50)  nextImage()
    if (diff < -50) prevImage()
    touchStartX.current = null
  }

  return (
    <section style={{ background: '#2C1A0E', padding: '80px 0' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: 'var(--font-jost)', fontSize: '0.65rem',
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#B8965A', marginBottom: '12px',
            }}>Gallery</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 7vw, 2.8rem)',
              fontStyle: 'italic', fontWeight: 300, color: '#FAF7F2',
            }}>Momen Bersama</h2>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <div className="gallery-grid" style={{ padding: '0 8px', maxWidth: '720px', margin: '0 auto' }}>
          {images.map((src, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => setLightboxIndex(i)}
              title="Klik untuk perbesar"
            >
              <img src={src} alt={`Foto ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Lightbox Premium */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            background: 'rgba(18, 10, 4, 0.97)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Image */}
          <img
            src={images[lightboxIndex]}
            alt={`Foto ${lightboxIndex + 1}`}
            onClick={e => e.stopPropagation()}
            style={{
              maxHeight: '88vh', maxWidth: '88vw',
              objectFit: 'contain',
              animation: 'lightboxIn 0.3s ease',
              borderRadius: '2px',
            }}
          />

          {/* Tombol tutup */}
          <button onClick={closeLightbox} style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(184,150,90,0.15)', border: '1px solid rgba(184,150,90,0.3)',
            color: '#FAF7F2', width: '40px', height: '40px',
            borderRadius: '50%', cursor: 'pointer',
            fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}>×</button>

          {/* Tombol Prev */}
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); prevImage() }} style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(184,150,90,0.15)', border: '1px solid rgba(184,150,90,0.3)',
              color: '#FAF7F2', width: '44px', height: '44px',
              borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>‹</button>
          )}

          {/* Tombol Next */}
          {images.length > 1 && (
            <button onClick={e => { e.stopPropagation(); nextImage() }} style={{
              position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(184,150,90,0.15)', border: '1px solid rgba(184,150,90,0.3)',
              color: '#FAF7F2', width: '44px', height: '44px',
              borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>›</button>
          )}

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-jost)', fontSize: '0.7rem',
            letterSpacing: '0.2em', color: 'rgba(250,247,242,0.5)',
          }}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}