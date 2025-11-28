# Simple Weather App

This is a small React app (Vite) that fetches current weather using OpenStreetMap Nominatim for geocoding and Open-Meteo for weather data. It requires no API keys.

How to run:

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

Open the URL printed by Vite (usually http://localhost:5173).

Notes:
- This uses free public APIs and may be rate-limited.
- The code is intentionally simple and readable.

New features added:
- Weather icons and human-friendly descriptions (emoji + short text) mapped from Open-Meteo weather codes.
- Recent searches saved to `localStorage` (keeps the last 5 searches). Click a recent search to fetch it again; there's a Clear button to remove them.

