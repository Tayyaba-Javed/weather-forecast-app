import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWeather } from './hooks/useWeather'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { HourlyForecast } from './components/HourlyForecast'
import { ForecastCard } from './components/ForecastCard'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { SettingsModal } from './components/SettingsModal'
import { NavBar } from './components/NavBar'
import { FavoritesPage } from './components/FavoritesPage'
import { DetailsPage } from './components/DetailsPage'
import { AqiCard } from './components/AqiCard'
import { TemperatureChart } from './components/TemperatureChart'
import { MetricsGrid } from './components/MetricsGrid'
import { FiSettings, FiMapPin, FiInfo } from 'react-icons/fi'
import './App.css'

type TabType = 'home' | 'favorites' | 'details' | 'settings'

interface FavoriteCity {
  name: string
  country: string
  temp: number
  condition: string
  icon: string
}

const getWeatherBackground = (condition?: string): string => {
  if (!condition) return 'from-slate-950 via-blue-950 to-black'

  const lower = condition.toLowerCase()
  // Darker, more premium blues as requested
  if (lower.includes('clear') || lower.includes('sunny')) return 'from-blue-700 via-blue-800 to-blue-950'
  if (lower.includes('rain')) return 'from-slate-800 via-blue-900 to-black'
  if (lower.includes('cloud')) return 'from-blue-800 via-blue-900 to-slate-950'
  if (lower.includes('storm')) return 'from-indigo-950 via-blue-950 to-black'
  if (lower.includes('snow')) return 'from-slate-800 via-blue-100 to-white'
  return 'from-blue-800 via-blue-900 to-slate-950'
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [favorites, setFavorites] = useState<FavoriteCity[]>([])

  const {
    currentWeather,
    forecast,
    aqi,
    loading,
    error,
    unit,
    searchWeather,
    getLocationWeather,
    toggleUnit
  } = useWeather()

  useEffect(() => {
    const saved = localStorage.getItem('weatherFavorites')
    if (saved) setFavorites(JSON.parse(saved))
    searchWeather('London')
  }, [searchWeather])

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => getLocationWeather(position.coords.latitude, position.coords.longitude),
        () => alert('Please enable location services.')
      )
    }
  }

  const bgGradient = getWeatherBackground(currentWeather?.weather[0].main)

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgGradient} text-white transition-colors duration-1000 overflow-x-hidden relative`}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[120px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px]"
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 relative z-10">
        <header className="flex justify-between items-center mb-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLocationClick}
            className="p-3 glass rounded-full"
          >
            <FiMapPin className="text-xl" />
          </motion.button>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              {currentWeather ? currentWeather.name : 'Weather'}
            </h1>
            <p className="text-sm opacity-60">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSettingsOpen(true)}
            className="p-3 glass rounded-full"
          >
            <FiSettings className="text-xl" />
          </motion.button>
        </header>

        {activeTab === 'home' && (
          <SearchBar onSearch={searchWeather} onLocationClick={handleLocationClick} loading={loading} />
        )}

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 p-4 glass-dark border-red-500/30 text-red-200 rounded-2xl text-center"
            >
              {error}
            </motion.div>
          )}

          {loading ? (
            <LoadingSkeleton key="loading" />
          ) : activeTab === 'home' && currentWeather && forecast ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 mt-10"
            >
              <WeatherCard weather={currentWeather} unit={unit} />
              <AqiCard aqi={aqi} />
              <TemperatureChart forecast={forecast} unit={unit} />
              <HourlyForecast forecast={forecast} unit={unit} />
              <ForecastCard forecast={forecast} unit={unit} />
              <MetricsGrid weather={currentWeather} unit={unit} />

              {/* Advanced Professional Feature: Context-Aware Weather Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass p-6 rounded-[2rem] flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center shrink-0">
                  <FiInfo className="text-xl text-blue-300" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold opacity-40 mb-1">Weather Insight</h4>
                  <p className="text-sm font-medium leading-relaxed">
                    {currentWeather.main.temp > 30 ? "Stay hydrated! High temperatures detected. Drink plenty of water today." :
                      currentWeather.main.temp < 10 ? "Chilly weather ahead. Make sure to wear layers to stay warm." :
                        currentWeather.weather[0].main.includes("Rain") ? "Rainy day! Don't forget your umbrella and stay safe on the roads." :
                          "Perfect weather for a walk or some outdoor activity. Enjoy your day!"}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : activeTab === 'favorites' ? (
            <FavoritesPage
              favorites={favorites}
              onSelectCity={searchWeather}
              onRemove={(name) => {
                const updated = favorites.filter(f => f.name !== name)
                setFavorites(updated)
                localStorage.setItem('weatherFavorites', JSON.stringify(updated))
              }}
              loading={loading}
            />
          ) : activeTab === 'details' ? (
            <DetailsPage weather={currentWeather} loading={loading} unit={unit} />
          ) : activeTab === 'settings' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <header className="px-2">
                <h2 className="text-3xl font-bold">Preferences</h2>
                <p className="opacity-50 text-sm font-medium mt-1">Customize your experience</p>
              </header>
              <div className="glass p-8 rounded-[2.5rem] space-y-6">
                {/* Reusing settings logic but in-page */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 px-1">
                      Temperature Units
                    </label>
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                      <button
                        onClick={() => toggleUnit()}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${unit === 'metric' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                          }`}
                      >
                        Celsius (°C)
                      </button>
                      <button
                        onClick={() => toggleUnit()}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${unit === 'imperial' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                          }`}
                      >
                        Fahrenheit (°F)
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 rounded-2xl p-4 flex gap-3">
                    <FiInfo className="text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-200/60 leading-normal">
                      Your settings are saved automatically to your device.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <footer className="mt-20 text-center opacity-40 text-xs tracking-widest uppercase">
          OpenWeatherMap • Elite Experience
        </footer>
      </div>

      <NavBar activeTab={activeTab} onChange={setActiveTab} />
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        unit={unit}
        onToggleUnit={toggleUnit}
      />
    </div>
  )
}

export default App

