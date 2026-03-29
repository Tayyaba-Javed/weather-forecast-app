import { motion } from 'framer-motion'
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiCloudy,
  WiSunrise,
  WiSunset,
  WiThermometer
} from 'react-icons/wi'
import { FiEye } from 'react-icons/fi'
import type { WeatherData } from '../types/weather'

interface DetailsPageProps {
  weather: WeatherData | null
  loading: boolean
  unit: 'metric' | 'imperial'
}

export const DetailsPage = ({ weather, loading, unit }: DetailsPageProps) => {
  if (loading || !weather) {
    return (
      <div className="flex flex-col items-center justify-center p-20 animate-pulse">
        <div className="w-16 h-16 bg-white/10 rounded-full mb-4" />
        <p className="text-white/40 text-sm font-medium">Loading details...</p>
      </div>
    )
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const detailedItems = [
    { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}${unit === 'metric' ? '°' : '°F'}`, icon: WiThermometer, sub: 'Feels warmer/colder than actual' },
    { label: 'Humidity', value: `${weather.main.humidity}%`, icon: WiHumidity, sub: 'Current moisture level' },
    { label: 'Wind', value: `${weather.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`, icon: WiStrongWind, sub: `Direction: ${weather.wind.deg}°` },
    { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: FiEye, sub: 'Visibility distance' },
    { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: WiBarometer, sub: 'Atmospheric pressure' },
    { label: 'Clouds', value: `${weather.clouds.all}%`, icon: WiCloudy, sub: 'Sky coverage' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-32"
    >
      <header className="px-2">
        <h2 className="text-3xl font-bold">{weather.name}</h2>
        <p className="opacity-50 text-sm font-medium mt-1">Detailed Weather Information</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {detailedItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-5 rounded-[2.5rem] flex flex-col justify-between h-44"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] tracking-widest font-bold">
                <item.icon className="text-xl" />
                {item.label}
              </div>
              <div className="text-3xl font-semibold tracking-tight">{item.value}</div>
            </div>
            <p className="text-[10px] opacity-40 font-medium leading-tight">
              {item.sub}
            </p>
          </motion.div>
        ))}

        {/* Sun Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass p-5 rounded-[2.5rem] col-span-2 space-y-6"
        >
          <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] tracking-widest font-bold">
            <WiSunrise className="text-xl" />
            SUNRISE & SUNSET
          </div>

          <div className="flex justify-between items-center px-4">
            <div className="flex items-center gap-4">
              <WiSunrise className="text-4xl text-orange-300" />
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Sunrise</p>
                <p className="text-xl font-semibold">{formatTime(weather.sys.sunrise)}</p>
              </div>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="flex items-center gap-4 text-right">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Sunset</p>
                <p className="text-xl font-semibold">{formatTime(weather.sys.sunset)}</p>
              </div>
              <WiSunset className="text-4xl text-purple-300" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

