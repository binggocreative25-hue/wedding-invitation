import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

// Load font dari local (lebih reliable dari CDN)
function getFonts() {
  try {
    const light  = readFileSync(join(process.cwd(), 'public/fonts/CormorantGaramond-Light.ttf'))
    const italic = readFileSync(join(process.cwd(), 'public/fonts/CormorantGaramond-LightItalic.ttf'))
    return [
      { name: 'Cormorant', data: light,  weight: 300, style: 'normal' },
      { name: 'Cormorant', data: italic, weight: 300, style: 'italic' },
    ]
  } catch (e) {
    console.error('Font tidak ditemukan di public/fonts/', e.message)
    return []
  }
}

export async function GET(request, { params }) {
  const { slug } = await params

  // Fetch data klien
  let client = null
  try {
    const { data } = await supabaseAdmin
      .from('clients')
      .select('bride_nickname, groom_nickname, bride_full_name, groom_full_name, wedding_date_time')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    client = data
  } catch {}

  const fonts  = getFonts()
  const font   = fonts.length > 0 ? 'Cormorant' : 'Georgia, serif'
  const bride  = client?.bride_nickname || 'Pengantin Wanita'
  const groom  = client?.groom_nickname || 'Pengantin Pria'

  const date = client?.wedding_date_time
    ? new Date(client.wedding_date_time).toLocaleDateString('id-ID', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        backgroundColor: '#FAF7F2',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Border luar */}
        <div style={{
          position: 'absolute',
          top: '28px', left: '28px', right: '28px', bottom: '28px',
          border: '1px solid rgba(184,150,90,0.4)',
        }} />
        {/* Border dalam */}
        <div style={{
          position: 'absolute',
          top: '38px', left: '38px', right: '38px', bottom: '38px',
          border: '1px solid rgba(184,150,90,0.15)',
        }} />

        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Label */}
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '14px', letterSpacing: '10px',
            textTransform: 'uppercase', color: '#B8965A',
            marginBottom: '24px', opacity: 0.85,
          }}>
            The Wedding of
          </p>

          {/* Nama pasangan */}
          <h1 style={{
            fontFamily: font, fontSize: '100px',
            fontWeight: 300, fontStyle: 'italic',
            color: '#2C1A0E', textAlign: 'center',
            lineHeight: 1.05, margin: '0',
          }}>
            {bride} & {groom}
          </h1>

          {/* Gold divider */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '20px',
            marginTop: '36px', marginBottom: '36px',
          }}>
            <div style={{ width: '100px', height: '1px', backgroundColor: '#B8965A', opacity: 0.5 }} />
            <div style={{ width: '9px', height: '9px', backgroundColor: '#B8965A', transform: 'rotate(45deg)' }} />
            <div style={{ width: '100px', height: '1px', backgroundColor: '#B8965A', opacity: 0.5 }} />
          </div>

          {/* Tanggal */}
          {date && (
            <p style={{
              fontFamily: font, fontSize: '28px', fontStyle: 'italic',
              color: '#5C3D2E', opacity: 0.75, marginBottom: '52px',
            }}>
              {date}
            </p>
          )}

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '50px', height: '1px',
              backgroundColor: '#B8965A', opacity: 0.3, marginBottom: '14px',
            }} />
            <p style={{
              fontFamily: 'Georgia, serif', fontSize: '11px',
              letterSpacing: '6px', textTransform: 'uppercase',
              color: '#B8965A', opacity: 0.65,
            }}>
              Binggo Creative
            </p>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  )
}