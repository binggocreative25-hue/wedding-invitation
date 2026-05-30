'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ─── Helper Components (HARUS di luar fungsi utama) ────────────────────────
const Section = ({ title, children }) => (
  <div className="bg-white border border-[#E8DCC8] rounded-sm overflow-hidden">
    <div className="px-6 py-4 border-b border-[#E8DCC8] bg-[#FAF7F2]">
      <h3 className="text-xs tracking-widest uppercase text-[#5C3D2E] font-medium">{title}</h3>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
)

const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs tracking-widest uppercase text-[#5C3D2E] opacity-60 mb-1.5">
      {label}
    </label>
    {children}
  </div>
)

const Input = ({ value, onChange, ...props }) => (
  <input value={value} onChange={e => onChange(e.target.value)}
    className="rsvp-input" {...props} />
)

const Textarea = ({ value, onChange, rows = 3, ...props }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)}
    rows={rows} className="rsvp-input resize-none" {...props} />
)

// ─── Default values ────────────────────────────────────────────────────────
const defaultEvent = { name: '', date: '', time: '', venue: '', address: '', mapsUrl: '', icon: '🌸' }
const defaultStory = { year: '', emoji: '💌', title: '', description: '' }

// ─── Main Component ────────────────────────────────────────────────────────
export default function ClientForm({ initialData, onSubmit, loading }) {
  const router = useRouter()
  const d = initialData || {}

  // Baca draft dari sessionStorage (hanya untuk form baru)
  const getInitialForm = () => {
    if (!initialData) {
      try {
        const saved = sessionStorage.getItem('clientFormDraft')
        if (saved) return JSON.parse(saved)
      } catch {}
    }
    return null
  }

  const draft = getInitialForm()
  const src = draft || d

  const [form, setForm] = useState({
    slug:               src.slug || '',
    bride_full_name:    src.bride_full_name || '',
    bride_nickname:     src.bride_nickname || '',
    bride_instagram:    src.bride_instagram || '',
    bride_father:       src.bride_parents?.split(' & Ibu ')[0]?.replace('Bp. ', '') || '',
    bride_mother:       src.bride_parents?.split(' & Ibu ')[1] || '',
    bride_photo:        src.bride_photo || '/images/bride.jpg',
    groom_full_name:    src.groom_full_name || '',
    groom_nickname:     src.groom_nickname || '',
    groom_instagram:    src.groom_instagram || '',
    groom_father:       src.groom_parents?.split(' & Ibu ')[0]?.replace('Bp. ', '') || '',
    groom_mother:       src.groom_parents?.split(' & Ibu ')[1] || '',
    groom_photo:        src.groom_photo || '/images/groom.jpg',
    hero_image:         src.hero_image || '/images/gallery/1.jpg',
    wedding_date_time:  src.wedding_date_time || '',
    events:             src.events || [{ ...defaultEvent }],
    story:              src.story  || [{ ...defaultStory }],
    gallery:            Array.isArray(src.gallery) ? src.gallery.join('\n') : (src.gallery || ''),
    music_enabled:      src.music_enabled ?? true,
    music_src:          src.music_src || '/audio/music.mp3',
    music_title:        src.music_title || '',
    gifts_enabled:      src.gifts_enabled ?? false,
    gifts_message:      src.gifts_message || '',
    gifts_accounts:     src.gifts_accounts || [],
    gifts_gopay:        src.gifts_gopay || '',
    gifts_ovo:          src.gifts_ovo || '',
    closing_quote:      src.closing_quote || '',
    closing_source:     src.closing_source || '',
    closing_message:    src.closing_message || '',
    theme_preset:       src.theme_preset || 'gold',
    require_guest_name: src.require_guest_name ?? true,
    is_active:          src.is_active ?? true,
  })

  // Auto-save draft (hanya untuk form baru)
  useEffect(() => {
    if (!initialData) {
      sessionStorage.setItem('clientFormDraft', JSON.stringify(form))
    }
  }, [form, initialData])

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function set(key, value) { setForm(f => ({ ...f, [key]: value })) }

  function setEvent(i, key, val) {
    const ev = [...form.events]
    ev[i] = { ...ev[i], [key]: val }
    set('events', ev)
  }

  function setStory(i, key, val) {
    const st = [...form.story]
    st[i] = { ...st[i], [key]: val }
    set('story', st)
  }

  function setAccount(i, key, val) {
    const a = [...form.gifts_accounts]
    a[i] = { ...a[i], [key]: val }
    set('gifts_accounts', a)
  }

  // ─── Submit ───────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault()
    sessionStorage.removeItem('clientFormDraft')

    const {
      bride_father, bride_mother,
      groom_father, groom_mother,
      ...rest
    } = form

    onSubmit({
      ...rest,
      bride_parents: `Bp. ${bride_father} & Ibu ${bride_mother}`,
      groom_parents: `Bp. ${groom_father} & Ibu ${groom_mother}`,
      gallery: form.gallery.split('\n').map(s => s.trim()).filter(Boolean),
    })
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── PENGATURAN ───────────────────────────────────────────────── */}
      <Section title="Pengaturan">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Slug URL">
            <Input
              value={form.slug}
              onChange={v => set('slug', v.toLowerCase().replace(/\s+/g, '-'))}
              placeholder="devi-roni"
              required
              disabled={!!initialData}
            />
            {!initialData && (
              <p className="text-xs text-[#5C3D2E] opacity-40 mt-1">
                URL: yourdomain.com/{form.slug || 'slug'}
              </p>
            )}
          </Field>
          <Field label="Tema">
            <select value={form.theme_preset} onChange={e => set('theme_preset', e.target.value)}
              className="rsvp-input">
              <option value="gold">Gold (Default)</option>
              <option value="sage">Sage Green</option>
              <option value="dusty-rose">Dusty Rose</option>
              <option value="navy">Navy Blue</option>
            </select>
          </Field>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.require_guest_name}
              onChange={e => set('require_guest_name', e.target.checked)}
              className="accent-[#B8965A]" />
            <span className="text-sm text-[#2C1A0E]">Wajib nama tamu di URL</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_active}
              onChange={e => set('is_active', e.target.checked)}
              className="accent-[#B8965A]" />
            <span className="text-sm text-[#2C1A0E]">Aktif (publik)</span>
          </label>
        </div>
      </Section>

      {/* ── IDENTITAS PASANGAN ───────────────────────────────────────── */}
      <Section title="Identitas Pasangan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Pengantin Wanita */}
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#B8965A]">Pengantin Wanita</p>
            <Field label="Nama Lengkap">
              <Input value={form.bride_full_name} onChange={v => set('bride_full_name', v)} required />
            </Field>
            <Field label="Nama Panggilan">
              <Input value={form.bride_nickname} onChange={v => set('bride_nickname', v)} required />
            </Field>
            <Field label="Nama Ayah">
              <Input value={form.bride_father} onChange={v => set('bride_father', v)} placeholder="Darnawi" />
            </Field>
            <Field label="Nama Ibu">
              <Input value={form.bride_mother} onChange={v => set('bride_mother', v)} placeholder="Sumiyem" />
            </Field>
            <Field label="Foto (/clients/slug/bride.jpg)">
              <Input value={form.bride_photo} onChange={v => set('bride_photo', v)} />
            </Field>
          </div>

          {/* Pengantin Pria */}
          <div className="space-y-3">
            <p className="text-xs tracking-widest uppercase text-[#B8965A]">Pengantin Pria</p>
            <Field label="Nama Lengkap">
              <Input value={form.groom_full_name} onChange={v => set('groom_full_name', v)} required />
            </Field>
            <Field label="Nama Panggilan">
              <Input value={form.groom_nickname} onChange={v => set('groom_nickname', v)} required />
            </Field>
            <Field label="Nama Ayah">
              <Input value={form.groom_father} onChange={v => set('groom_father', v)} placeholder="Wahono" />
            </Field>
            <Field label="Nama Ibu">
              <Input value={form.groom_mother} onChange={v => set('groom_mother', v)} placeholder="Sri Setyaningsih" />
            </Field>
            <Field label="Foto (/clients/slug/groom.jpg)">
              <Input value={form.groom_photo} onChange={v => set('groom_photo', v)} />
            </Field>
          </div>
        </div>
      </Section>

      {/* ── TANGGAL & ACARA ──────────────────────────────────────────── */}
      <Section title="Tanggal & Acara">
        <Field label="Tanggal & Waktu Pernikahan">
          <Input
            type="datetime-local"
            value={form.wedding_date_time?.slice(0, 16)}
            onChange={v => set('wedding_date_time', v)}
            required
          />
        </Field>
        <Field label="Foto Hero">
          <Input value={form.hero_image} onChange={v => set('hero_image', v)} />
        </Field>

        <div className="space-y-4">
          {form.events.map((ev, i) => (
            <div key={i} className="border border-[#E8DCC8] p-4 rounded-sm space-y-3 relative">
              <p className="text-xs tracking-widest uppercase text-[#B8965A]">Acara {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Nama Acara">
                  <Input value={ev.name} onChange={v => setEvent(i, 'name', v)} placeholder="Akad Nikah" />
                </Field>
                <Field label="Ikon Emoji">
                  <Input value={ev.icon} onChange={v => setEvent(i, 'icon', v)} placeholder="🕌" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Tanggal">
                  <Input value={ev.date} onChange={v => setEvent(i, 'date', v)} placeholder="Rabu, 10 Juni 2026" />
                </Field>
                <Field label="Waktu">
                  <Input value={ev.time} onChange={v => setEvent(i, 'time', v)} placeholder="08.00 WIB" />
                </Field>
              </div>
              <Field label="Nama Venue">
                <Input value={ev.venue} onChange={v => setEvent(i, 'venue', v)} />
              </Field>
              <Field label="Alamat">
                <Input value={ev.address} onChange={v => setEvent(i, 'address', v)} />
              </Field>
              <Field label="Google Maps URL">
                <Input value={ev.mapsUrl} onChange={v => setEvent(i, 'mapsUrl', v)}
                  placeholder="https://maps.app.goo.gl/..." />
              </Field>
              {form.events.length > 1 && (
                <button type="button"
                  onClick={() => set('events', form.events.filter((_, j) => j !== i))}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-xs">
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button type="button"
            onClick={() => set('events', [...form.events, { ...defaultEvent }])}
            className="btn-outline text-xs py-2 w-full justify-center">
            + Tambah Acara
          </button>
        </div>
      </Section>

      {/* ── OUR STORY ────────────────────────────────────────────────── */}
      <Section title="Our Story">
        <div className="space-y-4">
          {form.story.map((s, i) => (
            <div key={i} className="border border-[#E8DCC8] p-4 rounded-sm space-y-3 relative">
              <p className="text-xs tracking-widest uppercase text-[#B8965A]">Cerita {i + 1}</p>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Tahun">
                  <Input value={s.year} onChange={v => setStory(i, 'year', v)} placeholder="2024" />
                </Field>
                <Field label="Emoji">
                  <Input value={s.emoji} onChange={v => setStory(i, 'emoji', v)} placeholder="💌" />
                </Field>
                <Field label="Judul">
                  <Input value={s.title} onChange={v => setStory(i, 'title', v)} />
                </Field>
              </div>
              <Field label="Deskripsi">
                <Textarea value={s.description} onChange={v => setStory(i, 'description', v)} rows={3} />
              </Field>
              {form.story.length > 1 && (
                <button type="button"
                  onClick={() => set('story', form.story.filter((_, j) => j !== i))}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-xs">
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button type="button"
            onClick={() => set('story', [...form.story, { ...defaultStory }])}
            className="btn-outline text-xs py-2 w-full justify-center">
            + Tambah Cerita
          </button>
        </div>
      </Section>

      {/* ── GALERI ───────────────────────────────────────────────────── */}
      <Section title="Galeri Foto">
        <Field label="Path Foto (satu per baris)">
          <Textarea value={form.gallery} onChange={v => set('gallery', v)} rows={6}
            placeholder={`/clients/slug/gallery/1.jpg\n/clients/slug/gallery/2.jpg\n/clients/slug/gallery/3.jpg`} />
        </Field>
        <p className="text-xs text-[#5C3D2E] opacity-40">
          Gunakan path dari folder public/ — contoh: /clients/iwan-astri/gallery/1.jpg
        </p>
      </Section>

      {/* ── MUSIK ────────────────────────────────────────────────────── */}
      <Section title="Musik">
        <label className="flex items-center gap-2 cursor-pointer mb-3">
          <input type="checkbox" checked={form.music_enabled}
            onChange={e => set('music_enabled', e.target.checked)}
            className="accent-[#B8965A]" />
          <span className="text-sm text-[#2C1A0E]">Aktifkan musik</span>
        </label>
        {form.music_enabled && (
          <div className="space-y-3">
            <Field label="File Musik (contoh: /audio/iwan-astri.mp3)">
              <Input value={form.music_src} onChange={v => set('music_src', v)} />
            </Field>
            <Field label="Judul Lagu">
              <Input value={form.music_title} onChange={v => set('music_title', v)} />
            </Field>
          </div>
        )}
      </Section>

      {/* ── AMPLOP DIGITAL ───────────────────────────────────────────── */}
      <Section title="Amplop Digital">
        <label className="flex items-center gap-2 cursor-pointer mb-3">
          <input type="checkbox" checked={form.gifts_enabled}
            onChange={e => set('gifts_enabled', e.target.checked)}
            className="accent-[#B8965A]" />
          <span className="text-sm text-[#2C1A0E]">Tampilkan amplop digital</span>
        </label>

        {form.gifts_enabled && (
          <div className="space-y-4">
            <Field label="Pesan">
              <Textarea value={form.gifts_message} onChange={v => set('gifts_message', v)} />
            </Field>

            {/* Rekening Bank */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-widest uppercase text-[#5C3D2E] opacity-60">
                  Rekening Bank
                </p>
                <button type="button"
                  onClick={() => set('gifts_accounts', [...form.gifts_accounts, { bank: '', number: '', name: '' }])}
                  className="text-xs text-[#B8965A] border border-[#D4B47A] px-3 py-1 hover:bg-[#B8965A] hover:text-white transition-colors rounded-sm">
                  + Tambah Rekening
                </button>
              </div>
              {form.gifts_accounts.map((acc, i) => (
                <div key={i} className="border border-[#E8DCC8] p-4 rounded-sm space-y-3 relative">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Bank">
                      <Input value={acc.bank} onChange={v => setAccount(i, 'bank', v)} placeholder="BCA" />
                    </Field>
                    <Field label="No. Rekening">
                      <Input value={acc.number} onChange={v => setAccount(i, 'number', v)} placeholder="1234567890" />
                    </Field>
                    <Field label="Atas Nama">
                      <Input value={acc.name} onChange={v => setAccount(i, 'name', v)} placeholder="Nama pemilik" />
                    </Field>
                  </div>
                  <button type="button"
                    onClick={() => set('gifts_accounts', form.gifts_accounts.filter((_, j) => j !== i))}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-xs">
                    Hapus
                  </button>
                </div>
              ))}
            </div>

            {/* E-Wallet */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="GoPay">
                <Input value={form.gifts_gopay} onChange={v => set('gifts_gopay', v)} placeholder="08xx" />
              </Field>
              <Field label="OVO">
                <Input value={form.gifts_ovo} onChange={v => set('gifts_ovo', v)} placeholder="08xx" />
              </Field>
            </div>
          </div>
        )}
      </Section>

      {/* ── PENUTUP ──────────────────────────────────────────────────── */}
      <Section title="Penutup">
        <Field label="Ayat / Quote">
          <Textarea value={form.closing_quote} onChange={v => set('closing_quote', v)} />
        </Field>
        <Field label="Sumber (contoh: — QS. Ar-Rum: 21)">
          <Input value={form.closing_source} onChange={v => set('closing_source', v)} />
        </Field>
        <Field label="Pesan Penutup">
          <Textarea value={form.closing_message} onChange={v => set('closing_message', v)} />
        </Field>
      </Section>

      {/* ── ACTIONS ──────────────────────────────────────────────────── */}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="btn-gold flex-1 justify-center disabled:opacity-50">
          {loading ? 'Menyimpan...' : initialData ? 'Simpan Perubahan' : 'Buat Undangan'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="btn-outline px-6">
          Batal
        </button>
      </div>
    </form>
  )
}
