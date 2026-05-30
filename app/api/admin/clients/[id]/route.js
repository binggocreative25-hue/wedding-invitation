import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET(_, { params }) {
  const { id } = await params
  const { data, error } = await supabaseAdmin
    .from('clients').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PUT(request, { params }) {
  const { id } = await params
  const body = await request.json()
  const { slug, bride_father, bride_mother, groom_father, groom_mother, ...updateData } = body
  const { data, error } = await supabaseAdmin
    .from('clients').update(updateData).eq('id', id).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_, { params }) {
  const { id } = await params
  const { error } = await supabaseAdmin.from('clients').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}