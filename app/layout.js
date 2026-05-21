import { Cormorant_Garamond, Jost } from 'next/font/google'
import { config } from '@/config/wedding'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

const jost = Jost({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  variable: '--font-jost',
  display:  'swap',
})

export const metadata = {
  title: `The Wedding of ${config.bride.nickname} & ${config.groom.nickname}`,
  description: `Undangan pernikahan ${config.bride.fullName} & ${config.groom.fullName}`,
  openGraph: {
    title:       `The Wedding of ${config.bride.nickname} & ${config.groom.nickname}`,
    description: `Kami mengundang kehadiran Anda dalam pernikahan kami.`,
    type:        'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-ivory text-brown font-body overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
