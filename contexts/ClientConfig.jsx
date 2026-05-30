'use client'
import { createContext, useContext } from 'react'
import { config as staticConfig } from '@/config/wedding'

export const ClientConfigContext = createContext(null)

export function ClientConfigProvider({ config, children }) {
  return (
    <ClientConfigContext.Provider value={config}>
      {children}
    </ClientConfigContext.Provider>
  )
}

// Hook ini dipakai di semua komponen undangan
export function useWeddingConfig() {
  const ctx = useContext(ClientConfigContext)
  return ctx ?? staticConfig  // fallback ke static config (untuk /page.js lama)
}