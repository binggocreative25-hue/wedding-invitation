'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ClientConfigProvider, useWeddingConfig } from '@/contexts/ClientConfig'

import Opening      from '@/components/Opening'
import Hero         from '@/components/Hero'
import Countdown    from '@/components/Countdown'
import OurStory     from '@/components/OurStory'
import EventDetails from '@/components/EventDetails'
import Gallery      from '@/components/Gallery'
import RSVP         from '@/components/RSVP'
import GiftInfo     from '@/components/GiftInfo'
import Closing      from '@/components/Closing'
import AudioPlayer  from '@/components/AudioPlayer'

function PageContent() {
  const config = useWeddingConfig()
  const searchParams = useSearchParams()
  const guestName = searchParams.get('to')
  const [opened, setOpened] = useState(false)
  const isGuestValid = !config.requireGuestName || !!guestName

  if (!isGuestValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7F2] text-center p-6">
        <h1 className="text-3xl text-[#B8965A] mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
          Undangan Tidak Valid
        </h1>
        <p className="text-[#666] max-w-xs leading-relaxed text-sm">
          Mohon gunakan link undangan resmi yang diberikan kepada Anda.
        </p>
      </div>
    )
  }

  return (
    <>
      {!opened && (
        <Opening guestName={guestName} onOpen={() => setOpened(true)} />
      )}
      <main style={{ opacity: opened ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}>
        <Hero />
        <Countdown />
        <OurStory />
        <EventDetails />
        <Gallery />
        <RSVP />
        <GiftInfo />
        <Closing />
      </main>
      {opened && <AudioPlayer autoPlay={true} />}
    </>
  )
}

export default function WeddingPage({ config }) {
  return (
    <ClientConfigProvider config={config}>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <p style={{ fontFamily: 'var(--font-cormorant)', color: '#B8965A', fontSize: '1.5rem', fontStyle: 'italic' }}>
            Loading...
          </p>
        </div>
      }>
        <PageContent />
      </Suspense>
    </ClientConfigProvider>
  )
}