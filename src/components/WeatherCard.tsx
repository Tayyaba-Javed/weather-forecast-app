import { motion } from 'framer-motion'
import type { WeatherData } from '../types/weather'
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiCloudy,
  WiSunrise,
  WiSunset,
  WiBarometer,
} from 'react-icons/wi'
import { FiEye } from 'react-icons/fi'


interface WeatherCardProps {
  weather: WeatherData
  unit: 'metric' | 'imperial'
}

export const WeatherCard = ({ weather, unit }: WeatherCardProps) => {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const details = [
    { label: 'Humidity', value: `${weather.main.humidity}%`, icon: WiHumidity, color: 'text-blue-300' },
    { label: 'Wind', value: `${weather.wind.speed} m/s`, icon: WiStrongWind, color: 'text-gray-300' },
    { label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°`, icon: WiThermometer, color: 'text-orange-300' },
    { label: 'Pressure', value: `${weather.main.pressure} hPa`, icon: WiBarometer, color: 'text-emerald-300' },
    { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: FiEye, color: 'text-cyan-300' },
    { label: 'Clouds', value: `${weather.clouds.all}%`, icon: WiCloudy, color: 'text-slate-300' },
  ]

  return (
    <div className="space-y-6">
      {/* Main Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block"
        >
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-32 h-32 drop-shadow-2xl filter brightness-110"
          />
        </motion.div>

        <motion.h2
          className="text-8xl font-thin tracking-tighter mt-2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {Math.round(weather.main.temp)}{unit === 'metric' ? '°' : '°F'}
        </motion.h2>

        <p className="text-xl font-medium opacity-80 mt-1 capitalize">
          {weather.weather[0].description}
        </p>

        <div className="flex justify-center gap-4 mt-2 text-lg font-medium opacity-60">
          <span>H: {Math.round(weather.main.temp_max)}{unit === 'metric' ? '°' : '°F'}</span>
          <span>L: {Math.round(weather.main.temp_min)}{unit === 'metric' ? '°' : '°F'}</span>
        </div>
      </motion.div>

      {/* Details Grid - Apple Weather Style Blocks */}
      <div className="grid grid-cols-2 gap-4">
        {details.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-5 rounded-[2.5rem] flex flex-col justify-between h-40"
          >
            <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] tracking-widest font-bold">
              <item.icon className="text-xl" />
              {item.label}
            </div>
            <div className="text-3xl font-semibold mt-auto tracking-tight">
              {item.value}
            </div>
          </motion.div>
        ))}

        {/* Sun Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass p-5 rounded-[2.5rem] col-span-2 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <WiSunrise className="text-4xl text-orange-300" />
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Sunrise</p>
              <p className="text-lg font-semibold">{formatTime(weather.sys.sunrise)}</p>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-right">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">Sunset</p>
              <p className="text-lg font-semibold">{formatTime(weather.sys.sunset)}</p>
            </div>
            <WiSunset className="text-4xl text-purple-300" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

