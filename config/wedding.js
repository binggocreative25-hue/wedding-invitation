/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         WEDDING INVITATION — FILE KONFIGURASI UTAMA      ║
 * ║   Edit file ini untuk setiap klien baru. Tidak perlu     ║
 * ║   mengubah file lain untuk kustomisasi dasar.            ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export const config = {

  // ─── IDENTITAS PASANGAN ────────────────────────────────────
  bride: {
    fullName:  'Siti Rahayu Putri',
    nickname:  'Ayu',
    instagram: '@sitirahayu',
    parents:   'Putri dari Bapak Ahmad Fauzi & Ibu Sari Dewi',
    photo:     '/images/bride.jpg',   // taruh foto di folder public/images/
  },

  groom: {
    fullName:  'Budi Santoso Wijaya',
    nickname:  'Budi',
    instagram: '@budisantoso',
    parents:   'Putra dari Bapak Hendra & Ibu Wati Rahmawati',
    photo:     '/images/groom.jpg',
  },

  // ─── TANGGAL COUNTDOWN ─────────────────────────────────────
  // Format: 'YYYY-MM-DDTHH:mm:ss' (waktu lokal)
  weddingDateTime: '2025-09-14T08:00:00',

  // ─── DETAIL ACARA ──────────────────────────────────────────
  events: [
    {
      name:    'Akad Nikah',
      date:    'Minggu, 14 September 2025',
      time:    '08.00 – 10.00 WIB',
      venue:   'Masjid Al-Ikhlas',
      address: 'Jl. Mawar No. 10, Kebayoran Baru, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com/?q=-6.2407,106.7996',
      icon:    '🕌',
    },
    {
      name:    'Resepsi Pernikahan',
      date:    'Minggu, 14 September 2025',
      time:    '11.00 – 14.00 WIB',
      venue:   'Gedung Serbaguna Indah',
      address: 'Jl. Kenanga No. 5, Kemang, Jakarta Selatan',
      mapsUrl: 'https://maps.google.com/?q=-6.2607,106.8116',
      icon:    '🌸',
    },
  ],

  // ─── OUR STORY ─────────────────────────────────────────────
  story: [
    {
      year:        '2019',
      emoji:       '☕',
      title:       'Pertama Bertemu',
      description: 'Kami bertemu pertama kali di sebuah seminar desain. Satu tatap mata yang mengubah segalanya.',
    },
    {
      year:        '2020',
      emoji:       '💌',
      title:       'Mulai Dekat',
      description: 'Obrolan panjang, pesan tengah malam, dan tawa yang tak pernah habis. Tanpa sadar, hatiku sudah miliknya.',
    },
    {
      year:        '2022',
      emoji:       '✈️',
      title:       'Perjalanan Bersama',
      description: 'Perjalanan pertama berdua ke Lombok. Di sanalah aku tahu, dialah yang ingin kuajak berkelana seumur hidup.',
    },
    {
      year:        '2024',
      emoji:       '💍',
      title:       'Lamaran',
      description: 'Dengan lutut gemetar dan jantung berdegup kencang, aku memintanya menjadi pendamping hidupku selamanya.',
    },
    {
      year:        '2025',
      emoji:       '🤍',
      title:       'Menuju Pelaminan',
      description: 'Dan kini kami siap melangkah ke babak paling indah dalam hidup kami, bersama.',
    },
  ],

  // ─── GALERI FOTO ───────────────────────────────────────────
  // Ganti dengan path foto prewedding klien di folder public/images/gallery/
  // atau gunakan URL eksternal
  gallery: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456503681?w=800&q=80',
    'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&q=80',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
  ],

  // ─── MUSIK ─────────────────────────────────────────────────
  music: {
    enabled: true,
    // Taruh file mp3 di folder public/audio/
    // atau gunakan URL eksternal
    src:     '/audio/music.mp3',
    title:   'A Thousand Years — Christina Perri',
  },

  // ─── AMPLOP DIGITAL ────────────────────────────────────────
  gifts: {
    enabled: true,
    message: 'Tanpa mengurangi rasa hormat, bagi keluarga & sahabat yang ingin memberikan tanda kasih dapat melalui:',
    accounts: [
      { bank: 'BCA',     number: '1234 5678 90',  name: 'Budi Santoso Wijaya' },
      { bank: 'Mandiri', number: '9876 5432 10',  name: 'Siti Rahayu Putri'   },
    ],
    gopay: '',      // nomor GoPay (kosongkan jika tidak ada)
    ovo:   '',      // nomor OVO
  },

  // ─── PENUTUP ───────────────────────────────────────────────
  closing: {
    quote:  '"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."',
    source: '— QS. Ar-Rum: 21',
    message: 'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.',
  },

  // ─── TEMA WARNA (opsional) ─────────────────────────────────
  // Ganti untuk menyesuaikan tema pernikahan klien
  theme: {
    // Pilihan: 'gold' | 'sage' | 'dusty-rose' | 'navy'
    preset: 'gold',
  },
}
