import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, attendance, guests, message } = body

    if (!name || !attendance) {
      return NextResponse.json(
        { error: 'Nama dan konfirmasi kehadiran wajib diisi.' },
        { status: 400 }
      )
    }

    // Jika Supabase belum dikonfigurasi, return sukses saja (mode dev)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('RSVP received (Supabase not configured):', { name, attendance, guests, message })
      return NextResponse.json({ success: true })
    }
if (!supabase) {
  return NextResponse.json(
    { error: 'Supabase belum terhubung.' },
    { status: 500 }
  )
}
    const { error } = await supabase.from('rsvp').insert([
      { name, attendance, guests: parseInt(guests) || 1, message }
    ])

    if (error) throw error

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('RSVP error:', err)
    return NextResponse.json({ error: 'Terjadi kesalahan. Silakan coba lagi.' }, { status: 500 })
  }
}

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json({ data: [] })
  }
if (!supabase) {
  return NextResponse.json(
    { error: 'Supabase belum terhubung.' },
    { status: 500 }
  )
}
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}
