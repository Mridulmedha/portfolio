import React, { useState, useEffect } from 'react'
import Icons from './icons.jsx'

// Map Open-Meteo weather codes to emoji + friendly description.
const WEATHER_MAP = {
  0: { icon: '☀️', desc: 'Clear sky' },
  1: { icon: '🌤️', desc: 'Mainly clear' },
  2: { icon: '⛅', desc: 'Partly cloudy' },
  3: { icon: '☁️', desc: 'Overcast' },
  45: { icon: '🌫️', desc: 'Fog' },
  48: { icon: '🌫️', desc: 'Depositing rime fog' },
  51: { icon: '🌦️', desc: 'Light drizzle' },
  53: { icon: '🌦️', desc: 'Moderate drizzle' },
  55: { icon: '🌧️', desc: 'Dense drizzle' },
  61: { icon: '🌧️', desc: 'Slight rain' },
  63: { icon: '🌧️', desc: 'Moderate rain' },
  65: { icon: '🌧️', desc: 'Heavy rain' },
  71: { icon: '🌨️', desc: 'Light snow' },
  73: { icon: '🌨️', desc: 'Moderate snow' },
  75: { icon: '❄️', desc: 'Heavy snow' },
  80: { icon: '🌦️', desc: 'Rain showers' },
  81: { icon: '🌧️', desc: 'Moderate showers' },
  82: { icon: '⛈️', desc: 'Violent showers' },
  85: { icon: '🌨️', desc: 'Light snow showers' },
  86: { icon: '🌨️', desc: 'Heavy snow showers' },
  95: { icon: '⛈️', desc: 'Thunderstorm' },
  96: { icon: '⛈️', desc: 'Thunderstorm with hail' },
  99: { icon: '⛈️', desc: 'Severe thunderstorm with hail' },
}

function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  return (
    <form
      className="search"
      onSubmit={e => {
        e.preventDefault()
        if (q.trim()) onSearch(q.trim())
      }}
    >
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Enter city or place (e.g. London)"
        aria-label="search"
      />
      <button type="submit">Search</button>
    </form>
  )
}

function WeatherCard({ place, weather }) {
  if (!weather) return null
  const { temperature, windspeed, weathercode } = weather
  const map = WEATHER_MAP[weathercode] || { icon: null, desc: 'Weather' }
  // pick icon component by coarse categories
  let IconComp = Icons.Sun
  if ([1, 2, 3].includes(weathercode)) IconComp = Icons.Cloud
  if ([45, 48].includes(weathercode)) IconComp = Icons.Fog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weathercode)) IconComp = Icons.Rain
  if ([71, 73, 75, 85, 86].includes(weathercode)) IconComp = Icons.Snow
  if ([95, 96, 99].includes(weathercode)) IconComp = Icons.Storm

  return (
    <div className="card">
      <h2>{place}</h2>
      <div className="row">
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <IconComp />
          <div>
            <div className="big">{Math.round(temperature)}°C</div>
            <div className="muted">{map.desc}</div>
          </div>
        </div>
        <div className="meta">
          <div>Wind: {Math.round(windspeed)} km/h</div>
          <div>Code: {weathercode}</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [place, setPlace] = useState('')
  const [weather, setWeather] = useState(null)
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recentSearches') || '[]')
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('recentSearches', JSON.stringify(recent))
    } catch (e) {
      // ignore storage errors
    }
  }, [recent])

  function addRecent(name) {
    if (!name) return
    setRecent(prev => {
      const cleaned = prev.filter(x => x !== name)
      cleaned.unshift(name)
      return cleaned.slice(0, 5)
    })
  }

  function clearRecent() {
    setRecent([])
  }

  // Use Nominatim for geocoding (no API key) then Open-Meteo for weather
  async function handleSearch(query) {
    setError('')
    setLoading(true)
    setWeather(null)
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        { headers: { 'User-Agent': 'simple-weather-app' } }
      )
      const geo = await geoRes.json()
      if (!geo || geo.length === 0) {
        setError('Location not found')
        setLoading(false)
        return
      }
      const first = geo[0]
      const lat = first.lat
      const lon = first.lon
      setPlace(first.display_name)

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`
      )
      const wj = await weatherRes.json()
      if (!wj || !wj.current_weather) {
        setError('Weather data not available')
      } else {
        const w = {
          temperature: wj.current_weather.temperature,
          windspeed: wj.current_weather.windspeed,
          weathercode: wj.current_weather.weathercode,
        }
        setWeather(w)
        addRecent(first.display_name)
      }
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="hero">
        <div className="hero-inner">
          <h1>Simple Weather</h1>
          <p className="subtitle">Stay up-to-date — search any city and see the current weather</p>
        </div>
      </div>

      <div className="search-card">
        <div className="search-row">
          <SearchBar onSearch={handleSearch} />
          <select className="mini-select" aria-label="example-select">
            <option>Current</option>
            <option>Forecast</option>
          </select>
        </div>

        {recent && recent.length > 0 && (
          <div className="recent">
            <div className="recent-header">
              Recent searches
              <button className="small" onClick={clearRecent} aria-label="clear recent">Clear</button>
            </div>
            <div className="recent-list">
              {recent.map((r, i) => (
                <button key={r + i} className="chip" onClick={() => handleSearch(r)}>{r}</button>
              ))}
            </div>
          </div>
        )}

        <div className="controls">
          <div className="pills">
            <button className="pill active">All Tasks</button>
            <button className="pill">Active</button>
            <button className="pill">Completed</button>
            <button className="pill">High Priority</button>
            <button className="pill">Medium Priority</button>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="num">0</div>
              <div className="label">Total</div>
            </div>
            <div className="stat">
              <div className="num">0</div>
              <div className="label">Active</div>
            </div>
            <div className="stat">
              <div className="num">0</div>
              <div className="label">Done</div>
            </div>
            <div className="stat">
              <div className="num">0</div>
              <div className="label">Urgent</div>
            </div>
          </div>
        </div>
      </div>

      <main className="main-area">
        {loading && <div className="info">Loading…</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && weather && <WeatherCard place={place} weather={weather} />}

        {!loading && !error && !weather && (
          <div className="empty-state">
            <div className="empty-illustration">📋</div>
            <h3>No weather found</h3>
            <p className="muted">Search for a city above to get the current weather.</p>
          </div>
        )}

        <section className="tips">
          <h3>Tips</h3>
          <ul>
            <li>Try city names like "New York", "Paris" or "Bengaluru".</li>
            <li>This app uses free public APIs — expect occasional rate limits.</li>
          </ul>
        </section>
      </main>

      <footer>
        <small>Data from OpenStreetMap Nominatim and Open-Meteo</small>
      </footer>
    </div>
  )
}
