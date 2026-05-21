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
    fullName:  'Yunita Candra Kumara Devi',
    nickname:  'Devi',
    instagram: '',
    parents:   'Putri dari Bapak Eddi Satiyo Harjowiyono (alm) & Ibu Tutik Sumartini (almh)',
    photo:     '/images/bride.jpg',   // taruh foto di folder public/images/
  },

  groom: {
    fullName:  'Roni Ariyanto',
    nickname:  'Roni',
    instagram: '',
    parents:   'Putra dari Bapak Suparman (alm) & Ibu Siti Aminah (almh)',
    photo:     '/images/groom.jpg',
  },

  // ─── TANGGAL COUNTDOWN ─────────────────────────────────────
  // Format: '2025-09-14T08:00:00' (waktu lokal)
  weddingDateTime: '2026-06-10 10:00:00',

  // ─── DETAIL ACARA ──────────────────────────────────────────
  events: [
    {
      name:    'Akad Nikah',
      date:    'Rabu, 10 Juni 2026',
      time:    '08.00 WIB',
      venue:   'Taman Sari Hotel and Convention Center',
      address: 'Jl. Raya Solo Tawangmangu No.98 Cangakan, Karanganyar',
      mapsUrl: 'https://maps.app.goo.gl/8fyfZJMmgwyWzNQ46',
      icon:    '🕌',
    },
    {
      name:    'Resepsi Pernikahan',
      date:    'Minggu, 10 Juni 2026',
      time:    '10.00 WIB - Selesai',
      venue:   'Taman Sari Hotel and Convention Center',
      address: 'Jl. Raya Solo Tawangmangu No.98 Cangakan, Karanganyar',
      mapsUrl: 'https://maps.app.goo.gl/8fyfZJMmgwyWzNQ46',
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
    'images/gallery/image1.jpg',
    'images/gallery/image2.jpg',
    'images/gallery/image3.jpg',
    'images/gallery/image4.jpg',
    'images/gallery/image5.jpg'
    
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
      { bank: 'BCA',     number: '1234 5678 90',  name: 'Yunita Candra Kumara Devi' },
      { bank: 'Mandiri', number: '9876 5432 10',  name: 'Yunita Candra Kumara Devi'   },
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
    preset: 'Sage',
  },
}
