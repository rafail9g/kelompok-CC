const http = require('http');
const os = require('os');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === '/api/sensor') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = {
      lokasi: `Kota ${process.env.KOTA || 'Jember'}`,
      operator: {
        nama: process.env.NAMA || "Rafail Aulia' Alfansyah",
        nim: process.env.NIM || 'NIM_BELUM_DISET'
      },
      sensor: {
        suhu_celsius: 29.2,
        kelembapan_persen: 76,
        kecepatan_angin_kmh: 13,
        tekanan_mb: 1013,
        status: 'Awan berkabut'
      },
      container_info: {
        container_id: os.hostname(),
        platform: os.platform(),
        uptime_seconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
      }
    };
    return res.end(JSON.stringify(data, null, 2));
  }

  if (url === '/' || url === '/index.html') {
    const nim = process.env.NIM || 'NIM_BELUM_DISET';
    const nama = process.env.NAMA || "Rafail Aulia' Alfansyah";
    const kota = process.env.KOTA || 'Jember';
    const containerId = os.hostname();
    const serverUptime = Math.floor(process.uptime());

    const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status Sensor Cuaca Kota ${kota}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 32px 16px;
      line-height: 1.5;
    }
    .wrapper {
      max-width: 760px;
      margin: 0 auto;
    }

    /* Top navigation / header */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 14px 20px;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    .brand {
      font-weight: 700;
      font-size: 1.05rem;
      color: #0f172a;
    }
    .location-tag {
      font-size: 0.85rem;
      color: #64748b;
      background: #f1f5f9;
      padding: 4px 10px;
      border-radius: 4px;
      font-weight: 500;
    }

    /* Kotak Identitas Bersih & Simpel */
    .identity-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 18px 20px;
      margin-bottom: 16px;
    }
    .identity-card .card-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 14px;
      font-weight: 600;
    }
    .identity-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    .identity-item {
      border-left: 2px solid #cbd5e1;
      padding-left: 12px;
    }
    .identity-item .title {
      font-size: 0.75rem;
      color: #64748b;
      margin-bottom: 3px;
    }
    .identity-item .value {
      font-size: 1.15rem;
      font-weight: 600;
      color: #0f172a;
      word-break: break-all;
    }
    .identity-item .value.nim-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.01em;
    }

    /* Weather card */
    .weather-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 24px;
      margin-bottom: 16px;
    }
    .weather-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 12px;
      margin-bottom: 18px;
      color: #64748b;
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* Titik Merah Kedap-Kedip (Live Indicator) */
    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #dc2626;
      background: #fef2f2;
      border: 1px solid #fee2e2;
      padding: 3px 9px;
      border-radius: 4px;
      letter-spacing: 0.03em;
    }
    .red-dot {
      width: 8px;
      height: 8px;
      background-color: #ef4444;
      border-radius: 50%;
      display: inline-block;
      animation: pulse-red 1.2s ease-in-out infinite;
    }
    @keyframes pulse-red {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.25;
        transform: scale(0.8);
      }
    }

    .main-temp {
      display: flex;
      align-items: baseline;
      gap: 18px;
      margin-bottom: 6px;
    }
    .temp-degrees {
      font-size: 3.5rem;
      font-weight: 700;
      color: #0f172a;
      line-height: 1;
      letter-spacing: -0.03em;
      transition: color 0.3s;
    }
    .realfeel {
      font-size: 1rem;
      color: #64748b;
    }
    .condition-text {
      font-size: 1.1rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 22px;
    }

    /* Metrics Table */
    .metrics-table {
      width: 100%;
      border-collapse: collapse;
    }
    .metrics-table td {
      padding: 11px 8px;
      border-bottom: 1px solid #f8fafc;
      font-size: 0.9rem;
    }
    .metrics-table .col-label {
      color: #64748b;
      width: 32%;
    }
    .metrics-table .col-value {
      color: #0f172a;
      font-weight: 600;
      text-align: right;
      padding-right: 24px;
      width: 18%;
    }
    .metrics-table .col-value:last-child {
      padding-right: 0;
    }

    /* Footer */
    .footer {
      font-size: 0.8rem;
      color: #94a3b8;
      text-align: center;
      margin-top: 20px;
    }
    .footer a {
      color: #64748b;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!-- Navigation Bar -->
    <div class="top-bar">
      <div class="brand">
        Status Sensor Cuaca Kota ${kota}
      </div>
      <div class="location-tag">
        Pemkab ${kota}, Jawa Timur
      </div>
    </div>

    <!-- KOTAK IDENTITAS PUTIH BERSIH (NIM DARI ENV VARIABLE) -->
    <div class="identity-card">
      <div class="card-label">Informasi Container & Operator</div>
      <div class="identity-grid">
        <div class="identity-item">
          <div class="title">NIM (Environment Variable)</div>
          <div class="value nim-value">${nim}</div>
        </div>
        <div class="identity-item">
          <div class="title">Operator / Mahasiswa</div>
          <div class="value">${nama}</div>
        </div>
        <div class="identity-item">
          <div class="title">Container ID</div>
          <div class="value">${containerId}</div>
        </div>
      </div>
    </div>

    <!-- ACCUWEATHER STYLE WIDGET WITH LIVE SENSOR PULSE -->
    <div class="weather-card">
      <div class="weather-header">
        <span>Stasiun Cuaca Pemkab ${kota} (<span id="clock">--:--:--</span>)</span>
        <span class="live-badge">
          <span class="red-dot"></span> LIVE SENSOR
        </span>
      </div>

      <div class="main-temp">
        <span class="temp-degrees" id="val-suhu">29.2°C</span>
        <span class="realfeel" id="val-realfeel">RealFeel® 35°</span>
      </div>

      <div class="condition-text">Awan berkabut</div>

      <table class="metrics-table">
        <tr>
          <td class="col-label">Kelembapan</td>
          <td class="col-value" id="val-kelembapan">76%</td>
          <td class="col-label">Tekanan</td>
          <td class="col-value" id="val-tekanan">1013 mb</td>
        </tr>
        <tr>
          <td class="col-label">Angin</td>
          <td class="col-value" id="val-angin">BD 13 km/j</td>
          <td class="col-label">Tutupan Awan</td>
          <td class="col-value">75%</td>
        </tr>
        <tr>
          <td class="col-label">Indeks Panas</td>
          <td class="col-value" id="val-indeks">35°</td>
          <td class="col-label">Jarak Pandang</td>
          <td class="col-value">8 km</td>
        </tr>
        <tr>
          <td class="col-label">Titik Embun</td>
          <td class="col-value">25°C</td>
          <td class="col-label">Kualitas Udara</td>
          <td class="col-value">38 AQI (Baik)</td>
        </tr>
      </table>
    </div>

    <div class="footer">
      Sistem IoT Cuaca Terdistribusi &bull; Uptime Container: <span id="uptime-counter">${serverUptime}</span>s &bull; API: <a href="/api/sensor">/api/sensor</a>
    </div>
  </div>

  <script>
    // 1. Live Clock
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
      const clockEl = document.getElementById('clock');
      if (clockEl) clockEl.textContent = timeStr + ' WIB';
    }
    updateClock();
    setInterval(updateClock, 1000);

    // 2. Container Uptime Counter
    let uptime = ${serverUptime};
    setInterval(() => {
      uptime++;
      const el = document.getElementById('uptime-counter');
      if (el) el.textContent = uptime;
    }, 1000);

    // 3. Sensor Fluctuation Realistis (Berubah halus tiap 3.5 detik)
    const suhuBase = 29.0;
    const kelembapanBase = 76;
    const anginBase = 13;

    setInterval(() => {
      // Variasi suhu antara 28.8°C s/d 29.6°C
      const deltaSuhu = (Math.random() * 0.8 - 0.4);
      const curSuhu = (suhuBase + deltaSuhu).toFixed(1);
      
      // Variasi kelembapan antara 74% s/d 78%
      const curKelembapan = Math.round(kelembapanBase + (Math.random() * 4 - 2));

      // Variasi kecepatan angin 11 - 15 km/j
      const curAngin = Math.round(anginBase + (Math.random() * 4 - 2));

      const elSuhu = document.getElementById('val-suhu');
      const elKelembapan = document.getElementById('val-kelembapan');
      const elAngin = document.getElementById('val-angin');

      if (elSuhu) elSuhu.textContent = curSuhu + '°C';
      if (elKelembapan) elKelembapan.textContent = curKelembapan + '%';
      if (elAngin) elAngin.textContent = 'BD ' + curAngin + ' km/j';
    }, 3500);
  </script>
</body>
</html>`;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, () => {
  console.log(`[IoT Pemkab Jember] Server berjalan di port ${PORT}`);
  console.log(`[Config] Operator: ${process.env.NAMA || "Rafail Aulia' Alfansyah"}`);
  console.log(`[Config] NIM: ${process.env.NIM || 'NIM_BELUM_DISET'}`);
});
