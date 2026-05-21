# 💍 Wedding Invitation — Starter Template
**by Binggo Creative**

Template undangan pernikahan digital berbasis Next.js 14.
Hosting **gratis** di Vercel dengan custom domain.

---

## 🚀 Cara Pakai (Per Klien)

### 1. Clone / Duplikat Project

```bash
# Clone repository ini
git clone https://github.com/kamu/wedding-invitation.git nama-klien-wedding
cd nama-klien-wedding

# Install dependencies
npm install
```

### 2. Edit File Konfigurasi (SATU FILE SAJA)

Buka `config/wedding.js` dan isi data klien:
- Nama pengantin, orang tua, Instagram
- Tanggal & jam acara
- Detail venue akad & resepsi
- Link Google Maps
- Timeline cerita cinta
- Foto galeri (upload ke `public/images/gallery/`)
- Info amplop digital

### 3. Tambahkan Foto & Musik

```
public/
  images/
    bride.jpg          ← Foto pengantin wanita
    groom.jpg          ← Foto pengantin pria
    gallery/
      1.jpg            ← Foto prewedding 1
      2.jpg            ← dst...
  audio/
    music.mp3          ← Lagu latar belakang
```

### 4. Jalankan Lokal untuk Preview

```bash
npm run dev
# Buka http://localhost:3000
# Test dengan nama tamu: http://localhost:3000?to=Bapak+Ahmad
```

### 5. Setup RSVP (Opsional, Gratis)

1. Daftar di [supabase.com](https://supabase.com) (gratis)
2. Buat project baru
3. Jalankan SQL ini di **SQL Editor**:

```sql
create table rsvp (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  attendance  text not null,
  guests      integer default 1,
  message     text,
  created_at  timestamp with time zone default now()
);

alter table rsvp enable row level security;
create policy "Allow insert" on rsvp for insert with check (true);
create policy "Allow select" on rsvp for select using (true);
```

4. Copy **Project URL** dan **anon key** dari Settings → API
5. Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
```

> **Catatan:** Tanpa Supabase, form RSVP tetap jalan tapi data tidak tersimpan.

---

## ☁️ Deploy ke Vercel (Gratis)

### Opsi A — Via GitHub (Rekomendasi)

1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Pilih repository → Deploy
4. Tambahkan Environment Variables (dari `.env.local`) di Vercel dashboard
5. Tambahkan custom domain di Settings → Domains

### Opsi B — Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔗 Cara Share ke Tamu

URL undangan bisa membawa nama tamu secara otomatis:

```
https://ayu-budi.vercel.app?to=Bapak+Ahmad+%26+Keluarga
https://ayu-budi.com?to=Saudari+Rahma
```

**Encode spasi** dengan `+` atau `%20`.

Untuk blast WhatsApp, buat pesan template:
```
Kepada Yth. [Nama Tamu],
Kami mengundang kehadiran Anda.
Silakan buka undangan digital kami:
https://ayu-budi.com?to=[Nama+Tamu]
```

---

## 📊 Lihat Data RSVP

Di Supabase dashboard → Table Editor → tabel `rsvp`.

Bisa di-export ke CSV untuk klien.

---

## 🎨 Kustomisasi Lanjutan

### Ganti warna tema
Edit `app/globals.css` bagian CSS variables:
```css
/* Ubah nilai warna di sini */
--gold: #B8965A;     /* warna utama aksen */
--rose: #C9A99A;     /* warna sekunder */
```

### Tambah/hapus section
Edit `app/page.js` — tinggal hapus atau comment komponen yang tidak diperlukan.

### Ganti font
Edit `app/layout.js` — ganti `Cormorant_Garamond` dan `Jost` dengan font Google lain.

---

## 📁 Struktur Project

```
wedding-invitation/
├── config/
│   └── wedding.js        ← ⭐ EDIT INI PER KLIEN
├── app/
│   ├── layout.js         ← Font & metadata
│   ├── page.js           ← Halaman utama
│   ├── globals.css       ← Style global
│   └── api/rsvp/
│       └── route.js      ← API endpoint RSVP
├── components/
│   ├── Opening.jsx       ← Layar pembuka
│   ├── Hero.jsx          ← Nama pengantin full-screen
│   ├── Countdown.jsx     ← Timer mundur
│   ├── OurStory.jsx      ← Timeline cerita cinta
│   ├── EventDetails.jsx  ← Detail akad & resepsi
│   ├── Gallery.jsx       ← Galeri foto
│   ├── RSVP.jsx          ← Form konfirmasi
│   ├── GiftInfo.jsx      ← Amplop digital
│   ├── Closing.jsx       ← Penutup
│   ├── AudioPlayer.jsx   ← Musik latar
│   └── ScrollReveal.jsx  ← Animasi scroll
├── lib/
│   └── supabase.js       ← Koneksi database
└── public/
    ├── images/           ← Foto pasangan & galeri
    └── audio/            ← File musik
```

---

## 💰 Catatan Bisnis

- **Hosting**: Gratis selamanya di Vercel
- **Domain**: ~Rp 150.000/tahun (beli di Niagahoster/Domainesia)
- **Supabase**: Gratis hingga 500MB database
- **Waktu pengerjaan**: 3–5 jam setelah template jadi

---

*Template ini dibuat oleh Binggo Creative — tidak untuk dijual atau didistribusikan ulang.*
