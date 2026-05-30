import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('clients').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(request) {
  const body = await request.json()
  if (!body.slug || !body.bride_full_name || !body.groom_full_name) {
    return NextResponse.json({ error: 'Slug dan nama pengantin wajib diisi.' }, { status: 400 })
  }
  const { data, error } = await supabaseAdmin
    .from('clients').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}