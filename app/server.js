const express = require('express');
const os = require('os');
const { metricsMiddleware, metricsHandler } = require('./metrics');

const app = express();
app.use(express.json());
app.use(metricsMiddleware);

app.get('/metrics', metricsHandler);
app.get('/health', (req, res) => res.send('ok'));

// Contoh data Smart City (dummy)
app.get('/api/info', (req, res) => {
  res.json({ app: 'Smart City', instance: os.hostname() });
});

app.get('/api/services', (req, res) => {
  res.json([
    { id: 1, name: 'Lalu Lintas', status: 'normal' },
    { id: 2, name: 'Kualitas Udara', status: 'baik' },
    { id: 3, name: 'Layanan Publik', status: 'online' },
  ]);
});

// Endpoint berat -> bikin CPU naik saat demo
app.get('/api/heavy', (req, res) => {
  let x = 0;
  for (let i = 0; i < 5e6; i++) x += Math.sqrt(i);
  res.json({ ok: true, instance: os.hostname() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Smart City app jalan di port ${PORT}`));
