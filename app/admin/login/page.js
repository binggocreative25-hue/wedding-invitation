'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Email atau password salah.'); setLoading(false); return }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.4em] text-[#B8965A] uppercase mb-1">Binggo Creative</p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)' }}
              className="text-4xl font-light text-[#2C1A0E] tracking-widest">
            Admin
          </h1>
          <div className="flex items-center gap-3 justify-center mt-4">
            <div className="h-px w-10 bg-[#B8965A] opacity-50" />
            <div className="w-1.5 h-1.5 bg-[#B8965A] rotate-45" />
            <div className="h-px w-10 bg-[#B8965A] opacity-50" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#5C3D2E] mb-2 opacity-70">
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="rsvp-input" placeholder="admin@binggocreative.com" required />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-[#5C3D2E] mb-2 opacity-70">
              Password
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="rsvp-input" placeholder="••••••••" required />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="btn-gold w-full justify-center mt-6 disabled:opacity-50">
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}