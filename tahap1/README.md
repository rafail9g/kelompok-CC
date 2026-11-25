# Panduan Praktikum: [1] The Container Awakening

## 1. Masuk ke Direktori
```powershell
cd c:\Users\rafail\Downloads\smartcity\tahap1-container-awakening
```

## 2. Build Docker Image
```powershell
docker build -t smartcity-sensor-jember .
```

## 3. Jalankan Container dengan Environment Variable (Syarat Mutlak Dosen)
Ganti nilai NIM dan NAMA jika perlu:
```powershell
docker run -d -p 3000:3000 -e NIM=242410102038 -e NAMA="Rafail Aulia' Alfansyah" --name sensor-jember smartcity-sensor-jember
```

## 4. Verifikasi di Browser
Buka:
- Halaman Web: `http://localhost:3000` (Perhatikan kotak NIM ter-render sesuai nilai ENV di command run!)
- Endpoint JSON: `http://localhost:3000/api/sensor`

## 5. Perintah Tambahan untuk Video
- Cek container aktif: `docker ps`
- Cek log & pembacaan ENV: `docker logs sensor-jember`
- Hentikan & hapus container:
  ```powershell
  docker stop sensor-jember
  docker rm sensor-jember
  ```
