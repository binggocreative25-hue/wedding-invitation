'use client'
import { useState } from 'react'
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

export default function RSVP() {
  const [form, setForm] = useState({
    name: '', attendance: '', guests: '1', message: ''
  })
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg]   = useState('')

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async () => {
    if (!form.name || !form.attendance) {
      setErrMsg('Mohon isi nama dan konfirmasi kehadiran.')
      return
    }
    setStatus('loading')
    setErrMsg('')

    try {
      const res  = await fetch('/api/rsvp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setStatus('success')
    } catch (e) {
      setErrMsg(e.message || 'Terjadi kesalahan. Silakan coba lagi.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section style={{ background: '#FAF7F2', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>🤍</p>
          <h3 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
            fontStyle: 'italic',
            color: '#2C1A0E',
            marginBottom: '12px',
          }}>
            Terima Kasih, {form.name}!
          </h3>
          <p style={{
            fontFamily: 'var(--font-jost)',
            fontSize: '0.85rem',
            color: '#5C3D2E',
            opacity: 0.75,
            lineHeight: 1.75,
          }}>
            {form.attendance === 'hadir'
              ? 'Kehadiran Anda adalah hadiah terindah bagi kami. Sampai jumpa di hari bahagia kami! 💐'
              : 'Doa dan restu Anda sangat berarti bagi kami. Terima kasih sudah mengabari.'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ background: '#FAF7F2', padding: '80px 24px' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
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
              RSVP
            </p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 7vw, 2.8rem)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#2C1A0E',
              marginBottom: '12px',
            }}>
              Konfirmasi Kehadiran
            </h2>
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.8rem',
              color: '#5C3D2E',
              opacity: 0.65,
            }}>
              Mohon konfirmasikan kehadiran Anda sebelum 3 Juni 2026
            </p>
            <Divider />
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ScrollReveal delay={1}>
            <div>
              <label style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#5C3D2E',
                opacity: 0.6,
                display: 'block',
                marginBottom: '8px',
              }}>
                Nama Lengkap *
              </label>
              <input
                className="rsvp-input"
                type="text"
                placeholder="Masukkan nama Anda"
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2}>
            <div>
              <label style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#5C3D2E',
                opacity: 0.6,
                display: 'block',
                marginBottom: '8px',
              }}>
                Konfirmasi Kehadiran *
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { value: 'hadir',       label: '✓  Hadir' },
                  { value: 'tidak_hadir', label: '✗  Tidak Hadir' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    className={`rsvp-radio ${form.attendance === opt.value ? 'selected' : ''}`}
                    onClick={() => set('attendance', opt.value)}
                    style={{ fontFamily: 'var(--font-jost)', fontSize: '0.8rem' }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {form.attendance === 'hadir' && (
            <ScrollReveal delay={3}>
              <div>
                <label style={{
                  fontFamily: 'var(--font-jost)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#5C3D2E',
                  opacity: 0.6,
                  display: 'block',
                  marginBottom: '8px',
                }}>
                  Jumlah Tamu
                </label>
                <select
                  className="rsvp-input"
                  value={form.guests}
                  onChange={e => set('guests', e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} orang</option>
                  ))}
                </select>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={4}>
            <div>
              <label style={{
                fontFamily: 'var(--font-jost)',
                fontSize: '0.68rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#5C3D2E',
                opacity: 0.6,
                display: 'block',
                marginBottom: '8px',
              }}>
                Ucapan &amp; Doa (opsional)
              </label>
              <textarea
                className="rsvp-input"
                rows={4}
                placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                value={form.message}
                onChange={e => set('message', e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
          </ScrollReveal>

          {errMsg && (
            <p style={{
              fontFamily: 'var(--font-jost)',
              fontSize: '0.78rem',
              color: '#c0392b',
              textAlign: 'center',
            }}>
              {errMsg}
            </p>
          )}

          <ScrollReveal delay={5}>
            <button
              className="btn-gold"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.6 : 1 }}
            >
              {status === 'loading' ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
