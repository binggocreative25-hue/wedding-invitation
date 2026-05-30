// app/admin/layout.js
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata = { title: 'Admin — BinggoCreative' }

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#F5F1EB]">
      <AdminSidebar />
      <main className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}