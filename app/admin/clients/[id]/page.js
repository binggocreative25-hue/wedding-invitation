'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ClientForm from '@/components/admin/ClientForm'

export default function EditClientPage() {
  const router = useRouter()
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`/api/admin/clients/${id}`)
      .then(async r => {
        const json = await r.json()
        if (!r.ok || json.error) throw new Error(json.error || `HTTP ${r.status}`)
        return json
      })
      .then(json => {
        if (!json.data) throw new Error('Data tidak ditemukan')
        setClient(json.data)
      })
      .catch(err => setError(err.message))
      .finally(() => setFetching(false))
  }, [id])

  async function handleSubmit(data) {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: 'PUT',
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

  if (fetching) return (
    <div className="flex items-center justify-center py-20">
      <p style={{ fontFamily: 'var(--font-cormorant)', color: '#B8965A' }}
         className="text-2xl font-light italic">Memuat data...</p>
    </div>
  )

  return (
    <div className="max-w-3xl space-y-6 pt-2">
      <div>
        <h1 style={{ fontFamily: 'var(--font-cormorant)' }}
            className="text-3xl font-light text-[#2C1A0E] tracking-wide">
          Edit Klien
        </h1>
        {client && (
          <p className="text-xs tracking-widest text-[#B8965A] uppercase mt-0.5">
            /{client.slug} · {client.bride_nickname} & {client.groom_nickname}
          </p>
        )}
      </div>

      {/* Error display — akan tampil jika ada masalah */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-sm">
          ⚠ {error}
        </div>
      )}

      {client ? (
        <ClientForm initialData={client} onSubmit={handleSubmit} loading={loading} />
      ) : (
        !error && (
          <div className="text-center py-10 text-sm text-[#5C3D2E] opacity-50">
            Data klien tidak ditemukan. ID: {id}
          </div>
        )
      )}
    </div>
  )
}