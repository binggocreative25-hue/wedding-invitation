'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ClientForm from '@/components/admin/ClientForm'

export default function NewClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(data) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Gagal menyimpan')
      router.push('/admin/clients')
      router.refresh()
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl space-y-6 pt-2">
      <div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)' }}
            className="text-3xl font-light text-[#2C1A0E] tracking-wide">
          Klien Baru
        </h1>
        <p className="text-xs tracking-widest text-[#B8965A] uppercase mt-0.5">
          Buat undangan digital baru
        </p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      )}
      <ClientForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}