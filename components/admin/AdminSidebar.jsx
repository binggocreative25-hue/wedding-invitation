'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const navItems = [
  { href: '/admin',         label: 'Dashboard',  icon: '◈' },
  { href: '/admin/clients', label: 'Klien',       icon: '◉' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-8 border-b border-white/10">
        <p className="text-xs tracking-[0.35em] text-[#B8965A] uppercase">Binggo Creative</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)' }}
            className="text-2xl font-light text-white tracking-widest mt-0.5">
          Studio
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm tracking-widest uppercase transition-all
                ${active
                  ? 'bg-[#B8965A] text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              onClick={() => setOpen(false)}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-8">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-white/40
                     hover:text-white/70 text-sm tracking-widest uppercase transition-colors">
          <span>⊗</span> Keluar
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-[#1C110A] z-30">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#1C110A] flex items-center
                      justify-between px-4 z-30">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-[#B8965A] uppercase">Binggo Creative</p>
        </div>
        <button onClick={() => setOpen(!open)}
          className="text-white/70 text-xl p-1">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#1C110A]"
                 onClick={e => e.stopPropagation()}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Mobile top padding spacer */}
      <div className="lg:hidden h-14" />
    </>
  )
}