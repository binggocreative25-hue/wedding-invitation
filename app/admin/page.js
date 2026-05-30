import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createSupabaseServer()

  const [{ count: totalClients }, { count: totalRsvp }, { data: recentRsvp }] =
    await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('rsvp').select('*', { count: 'exact', head: true }),
      supabase.from('rsvp').select('name, attendance, created_at, client_id')
        .order('created_at', { ascending: false }).limit(8),
    ])

  const stats = [
    { label: 'Total Klien',  value: totalClients ?? 0, icon: '◉', color: '#B8965A' },
    { label: 'Total RSVP',  value: totalRsvp ?? 0,   icon: '◈', color: '#7A9E7E' },
  ]

  return (
    <div className="space-y-8 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)' }}
              className="text-3xl font-light text-[#2C1A0E] tracking-wide">
            Dashboard
          </h1>
          <p className="text-xs tracking-widest text-[#B8965A] uppercase mt-0.5">
            Binggo Creative Studio
          </p>
        </div>
        <Link href="/admin/clients/new" className="btn-gold text-xs py-3 px-5">
          + Klien Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-[#E8DCC8] p-6 rounded-sm">
            <p className="text-xs tracking-widest uppercase text-[#5C3D2E] opacity-60 mb-2">
              {s.label}
            </p>
            <p style={{ fontFamily: 'var(--font-cormorant)', color: s.color }}
               className="text-5xl font-light">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent RSVPs */}
      <div className="bg-white border border-[#E8DCC8] rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E8DCC8] flex items-center justify-between">
          <h2 className="text-xs tracking-widest uppercase text-[#5C3D2E]">RSVP Terbaru</h2>
        </div>
        {!recentRsvp?.length ? (
          <p className="text-center py-10 text-sm text-[#5C3D2E] opacity-40">
            Belum ada RSVP masuk
          </p>
        ) : (
          <div className="divide-y divide-[#F0E8D8]">
            {recentRsvp.map((r, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm text-[#2C1A0E] font-medium">{r.name}</p>
                  <p className="text-xs text-[#5C3D2E] opacity-50 mt-0.5">
                    {new Date(r.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full tracking-wide
                  ${r.attendance === 'hadir'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-600 border border-red-200'
                  }`}>
                  {r.attendance === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}