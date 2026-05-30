'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function ClientActions({ clientId, slug }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  function copyLink() {
    const url = `${window.location.origin}/${slug}`
    navigator.clipboard.writeText(url)
    alert(`Link disalin: ${url}`)
  }

  async function handleDelete() {
    if (!confirm(`Hapus klien /${slug}? Semua RSVP akan tetap ada.`)) return
    setDeleting(true)
    await supabase.from('clients').delete().eq('id', clientId)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2 ml-4 shrink-0">
      <button onClick={copyLink}
        className="text-xs px-3 py-1.5 border border-[#D4B47A] text-[#B8965A]
                   hover:bg-[#B8965A] hover:text-white transition-colors rounded-sm">
        Salin Link
      </button>
      <Link href={`/admin/clients/${clientId}`}
        className="text-xs px-3 py-1.5 border border-[#D4B47A] text-[#B8965A]
                   hover:bg-[#B8965A] hover:text-white transition-colors rounded-sm">
        Edit
      </Link>
      <button onClick={handleDelete} disabled={deleting}
        className="text-xs px-3 py-1.5 border border-red-200 text-red-400
                   hover:bg-red-50 transition-colors rounded-sm disabled:opacity-40">
        Hapus
      </button>
    </div>
  )
}