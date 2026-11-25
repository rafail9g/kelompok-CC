# Smart City - Monitoring & Load Test

## Jalankan
    docker compose up -d --build

- Aplikasi (via Nginx) : http://localhost:8080/api/info
- Prometheus           : http://localhost:9090/targets
- Grafana              : http://localhost:3001  (admin / admin) -> dashboard "Smart City Monitoring" (sudah ter-provision)

## Load test
    k6 run loadtest/test.js
    # alternatif tanpa instal: npx autocannon -c 200 -d 60 http://localhost:8080/api/heavy

## Skenario demo (rapid elasticity)
1. Buka dashboard Grafana (idle, 1 instance).
2. Jalankan load test -> CPU, RPS, latency naik.
3. Scale: `docker compose up -d --scale app=3` -> CPU per instance turun, p95 membaik.
   (Nginx re-resolve DNS tiap 5 detik, jadi replika baru otomatis dapat trafik.)

## Catatan keamanan
- /metrics diblok di Nginx (403) untuk akses publik; Prometheus scrape langsung ke container.
- Produksi: tambah HTTPS, JWT, rate limiting, helmet, secret via env.
