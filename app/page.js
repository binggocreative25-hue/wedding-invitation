'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

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
import { config } from '@/config/wedding'

// Pisahkan komponen yang pakai useSearchParams agar bisa di-wrap Suspense
function PageContent() {
  const searchParams = useSearchParams()
  const guestName = searchParams.get('to')
  const [opened, setOpened] = useState(false)
const isGuestValid =
  !config.requireGuestName || !!guestName
  if (!isGuestValid) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#FAF7F2',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          color: '#B8965A',
          marginBottom: '12px',
        }}
      >
        Undangan Tidak Valid
      </h1>

      <p
        style={{
          color: '#666',
          maxWidth: '400px',
          lineHeight: '1.6',
        }}
      >
        Mohon gunakan link undangan resmi yang diberikan kepada Anda.
      </p>
    </div>
  )
}
  return (
    <>
      {/* Opening Overlay */}
      {!opened && (
        <Opening
          guestName={guestName}
          onOpen={() => setOpened(true)}
        />
      )}

      {/* Main Content — tetap di-render, tersembunyi di balik overlay */}
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

      {/* Floating audio player — muncul setelah undangan dibuka */}
      {opened && <AudioPlayer autoPlay={true} />}
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF7F2',
      }}>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontStyle: 'italic', color: '#B8965A' }}>
          Loading...
        </p>
      </div>
    }>
      <PageContent />
    </Suspense>
  )
}
