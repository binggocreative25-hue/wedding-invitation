import { createSupabaseServer } from '@/lib/supabase-server'
import Link from 'next/link'
import ClientActions from '@/components/admin/ClientActions'

export default async function ClientsPage() {
  const supabase = await createSupabaseServer()

  const { data: clients } = await supabase
    .from('clients')
    .select('id, slug, bride_nickname, groom_nickname, wedding_date_time, is_active, created_at')
    .order('created_at', { ascending: false })

  // Get RSVP counts per client
  const { data: rsvpCounts } = await supabase
    .from('rsvp')
    .select('client_id')

  const countMap = {}
  rsvpCounts?.forEach(r => {
    if (r.client_id) countMap[r.client_id] = (countMap[r.client_id] || 0) + 1
  })

  return (
    <div className="space-y-6 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)' }}
              className="text-3xl font-light text-[#2C1A0E] tracking-wide">
            Klien
          </h1>
          <p className="text-xs tracking-widest text-[#B8965A] uppercase mt-0.5">
            {clients?.length ?? 0} undangan terdaftar
          </p>
        </div>
        <Link href="/admin/clients/new" className="btn-gold text-xs py-3 px-5">
          + Klien Baru
        </Link>
      </div>

      {/* Client List */}
      <div className="bg-white border border-[#E8DCC8] rounded-sm overflow-hidden">
        {!clients?.length ? (
          <div className="text-center py-16">
            <p style={{ fontFamily: 'var(--font-cormorant)' }}
               className="text-2xl text-[#B8965A] font-light mb-2">
              Belum ada klien
            </p>
            <p className="text-sm text-[#5C3D2E] opacity-50 mb-6">
              Mulai tambahkan klien pertama kamu
            </p>
            <Link href="/admin/clients/new" className="btn-outline text-xs">
              Tambah Klien
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#F0E8D8]">
            {clients.map(client => (
              <div key={client.id}
                   className="flex items-center justify-between px-6 py-5 hover:bg-[#FAF7F2] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 style={{ fontFamily: 'var(--font-cormorant)' }}
                        className="text-lg font-light text-[#2C1A0E]">
                      {client.bride_nickname} & {client.groom_nickname}
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border
                      ${client.is_active
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-50 text-gray-500 border-gray-200'
                      }`}>
                      {client.is_active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#5C3D2E] opacity-50">
                    <span>/{client.slug}</span>
                    <span>·</span>
                    <span>{new Date(client.wedding_date_time).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}</span>
                    <span>·</span>
                    <span>{countMap[client.id] ?? 0} RSVP</span>
                  </div>
                </div>
                <ClientActions clientId={client.id} slug={client.slug} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}