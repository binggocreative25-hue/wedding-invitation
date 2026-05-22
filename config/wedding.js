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
// ─── HERO BACKGROUND ───────────────────────────────────────
heroImage: '/images/hero.jpg',  // foto khusus hero, bebas pilih

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
      date:    'Rabu, 10 Juni 2026',
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
      year:        '2023',
      emoji:       '☕',
      title:       'Pertama Bertemu',
      description: 'Tidak ada yang kebetulan di dunia ini.Semua sudah tersusun dengan sangat rapi oleh Sang Maha Kuasa, kita tidak bisa memilih kepada siapa kita jatuh cinta. Kami bertemu pertama pada tahun 2023. Seiring berjalanya waktu kami semakin dekat,memang tidak ada kata pacaran tapi Tuhan mentakdirkan kita untuk bersama',
    },


    {
      year:        '2026',
      emoji:       '💌',
      title:       'Lamaran',
      description: 'Kehendak-Nya menuntun kami pada sebuah pertemuan yang tak pernah disangka, hingga akhirnya pada 4 Januari 2026 membawa kami pada sebuah ikatan yang di Ridhoi-Nya',
    },


    {
      year:        '2026',
      emoji:       '✈️',
      title:       'Menuju Pelaminan',
      description: 'Bukan karna bertemu lalu berjodoh, tapi karna berjodohlah kami bisa bertemu. Kami memutuskan untuk mengikrarkan janji suci pernikahan pada 10 Juni 2026. Sebagaimana yang pernah dikatakan oleh Ali Bin Abi Thalib " Apa yang menjadi takdirmu akan menemukan jalannya untuk menemukanmu"',
    },
   
  ],

  // ─── GALERI FOTO ───────────────────────────────────────────
  // Ganti dengan path foto prewedding klien di folder public/images/gallery/
  // atau gunakan URL eksternal
  gallery: [
    'images/gallery/1.jpg',
    'images/gallery/2.jpg',
    'images/gallery/3.jpg',
    'images/gallery/4.jpg',
    'images/gallery/5.jpg',
    'images/gallery/6.jpg',
    'images/gallery/7.jpg',
    'images/gallery/hero.jpg',
  ],

  // ─── MUSIK ─────────────────────────────────────────────────
  music: {
    enabled: true,
    // Taruh file mp3 di folder public/audio/
    // atau gunakan URL eksternal
    src:     '/audio/music.mp3',
    title:   'Tiara Andini, Arsy Widianto - Lagu Pernikahan Kita',
  },

  // ─── AMPLOP DIGITAL ────────────────────────────────────────
  gifts: {
    enabled: false,
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
    preset: 'gold',
  
},
requireGuestName: true,

}
