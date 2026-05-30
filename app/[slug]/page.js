// app/[slug]/page.js
import { createSupabaseServer } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import WeddingPage from '@/components/WeddingPage'

// Helper: ubah data DB → format config
function mapClientToConfig(client) {
  return {
    bride: {
      fullName:  client.bride_full_name,
      nickname:  client.bride_nickname,
      instagram: client.bride_instagram || '',
      parents:   client.bride_parents || '',
      photo:     client.bride_photo || '/images/bride.jpg',
    },
    groom: {
      fullName:  client.groom_full_name,
      nickname:  client.groom_nickname,
      instagram: client.groom_instagram || '',
      parents:   client.groom_parents || '',
      photo:     client.groom_photo || '/images/groom.jpg',
    },
    heroImage:       client.hero_image || '/images/gallery/1.jpg',
    weddingDateTime: client.wedding_date_time,
    events:          client.events  || [],
    story:           client.story   || [],
    gallery:         client.gallery || [],
    music: {
      enabled: client.music_enabled ?? true,
      src:     client.music_src   || '/audio/music.mp3',
      title:   client.music_title || '',
    },
    gifts: {
      enabled:  client.gifts_enabled  ?? false,
      message:  client.gifts_message  || '',
      accounts: client.gifts_accounts || [],
      gopay:    client.gifts_gopay    || '',
      ovo:      client.gifts_ovo      || '',
    },
    closing: {
      quote:   client.closing_quote   || '',
      source:  client.closing_source  || '',
      message: client.closing_message || '',
    },
    theme:            { preset: client.theme_preset || 'gold' },
    requireGuestName: client.require_guest_name ?? true,
    _clientId:        client.id,
    _slug:            client.slug,
  }
}

// Server Component — fetch data dari Supabase
export default async function SlugPage({ params }) {
  const { slug } = await params
  const supabase  = await createSupabaseServer()

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !client) notFound()

  const config = mapClientToConfig(client)   // ← ini yang hilang sebelumnya

  return <WeddingPage config={config} />
}