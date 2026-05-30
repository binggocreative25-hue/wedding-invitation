import { createSupabaseServer } from '@/lib/supabase-server'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createSupabaseServer()

  const { data: client } = await supabase
    .from('clients')
    .select('bride_nickname, groom_nickname, bride_full_name, groom_full_name, wedding_date_time')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!client) {
    return { title: 'Wedding Invitation — BinggoCreative' }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const title       = `The Wedding of ${client.bride_nickname} & ${client.groom_nickname}`
  const description = `Kami mengundang kehadiran Anda dalam pernikahan ${client.bride_full_name} & ${client.groom_full_name}.`
  const ogImage     = `${baseUrl}/api/og/${slug}`

  return {
    title,
    description,
    // Jangan tampil di search engine (undangan bersifat privat)
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type:   'website',
      url:    `${baseUrl}/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    // Twitter Card (juga dibaca oleh beberapa platform lain)
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [ogImage],
    },
  }
}

export default function SlugLayout({ children }) {
  return <>{children}</>
}