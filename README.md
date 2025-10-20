# 📰 Blog Dashboard Frontend (Next.js + Shadcn/UI)

Proyek ini adalah **frontend dashboard** sederhana untuk mengelola dan menampilkan artikel blog.  
Dibangun menggunakan **Next.js (App Router)** dan **shadcn/ui** untuk tampilan modern dan responsif.

---

## 🚀 Fitur Utama

- ✅ Menampilkan daftar artikel dalam bentuk tabel.
- ✏️ Fitur edit artikel.
- 🗑️ Update status artikel menjadi "Thrash".
- 👀 Halaman preview untuk menampilkan artikel yang berstatus **Publish**.
- 🔄 Pagination dengan parameter `limit` dan `offset`.
- 💅 Desain elegan menggunakan **shadcn/ui** dan **Tailwind CSS**.

---

## 🧩 Teknologi yang Digunakan

- **Next.js 14 (App Router)**
- **React 18**
- **shadcn/ui**
- **Tailwind CSS**
- **Lucide React Icons**

---

## 📁 Struktur Folder

```
src/
 ├── app/
 │   ├── layout.js              # Layout utama
 │   ├── page.js                # Dashboard utama (tabel artikel)
 │   ├── posts/
 │   │   ├── page.js            # Halaman index artikel
 │   │   ├── add/page.js        # Halaman tambah artikel
 │   │   ├── edit/[id]/page.js  # Halaman edit artikel
 │   ├── preview/page.js        # Halaman preview artikel publish
 │   └── globals.css            # Styling global
 ├── components/
 │   ├── datatable.js           # Konfigurasi kolom tabel
 │   ├── ui/                    # Komponen dari shadcn/ui
 ├── lib/
 │   └── api.js                 # Konfigurasi endpoint API eksternal
 └── README.md
```

---

## 🧭 Cara Menjalankan

1. **Clone repository**
   ```bash
   git clone https://github.com/farisfadhail/sv-be.git
   cd sv-be
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan project**
   ```bash
   npm run dev
   ```

4. Buka di browser  
   👉 [http://localhost:3000](http://localhost:3000)

---

## 🧱 Komponen Utama

| Komponen | Deskripsi |
|-----------|------------|
| **DataTable** | Menampilkan data artikel dengan pagination |
| **Button (shadcn)** | Digunakan untuk aksi edit & thrash |
| **PreviewCard** | Menampilkan artikel berstatus publish dengan tampilan penuh |
| **Pagination Controls** | Mengatur navigasi antar halaman data |

---

## 🪄 Contoh Endpoint API (Backend)

Meskipun proyek ini hanya frontend, berikut contoh bentuk endpoint yang dikonsumsi:

| Endpoint | Metode | Deskripsi |
|-----------|--------|-----------|
| `/article?limit=10&offset=0` | GET | Mendapatkan daftar artikel |
| `/article` | POST | Create artikel |
| `/article/:id` | GET | Mendapatkan detail artikel |
| `/article/:id` | PUT | Update artikel (misal: `thrash`) |

---

## 📸 Tampilan

### Dashboard
Menampilkan daftar artikel dengan aksi edit dan thrash.

### Preview
Menampilkan artikel berstatus publish dengan layout lebar penuh.
