'use client'
import { useEffect, useState } from 'react'

// Pre-calculated agar tidak random setiap render
const PETALS = [
  { left: '5%',  size: 5, dur: 14, delay: 0,   rot: 200 },
  { left: '12%', size: 4, dur: 11, delay: 2.5,  rot: 340 },
  { left: '20%', size: 6, dur: 16, delay: 1,    rot: 180 },
  { left: '28%', size: 4, dur: 12, delay: 4,    rot: 420 },
  { left: '36%', size: 5, dur: 15, delay: 0.5,  rot: 260 },
  { left: '44%', size: 3, dur: 13, delay: 3,    rot: 380 },
  { left: '52%', size: 6, dur: 17, delay: 1.5,  rot: 220 },
  { left: '60%', size: 4, dur: 11, delay: 5,    rot: 300 },
  { left: '68%', size: 5, dur: 14, delay: 2,    rot: 160 },
  { left: '76%', size: 3, dur: 16, delay: 3.5,  rot: 440 },
  { left: '84%', size: 6, dur: 12, delay: 0.8,  rot: 280 },
  { left: '92%', size: 4, dur: 15, delay: 4.5,  rot: 200 },
]

export default function FloatingPetals() {
  const [visible, setVisible] = useState(false)

  // Hanya tampil di client untuk hindari SSR mismatch
  useEffect(() => { setVisible(true) }, [])
  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      {PETALS.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-12px',
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'rgba(184, 150, 90, 0.45)',
            borderRadius: '50% 0 50% 0',
            transform: 'rotate(45deg)',
            animation: `floatPetal ${p.dur}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}