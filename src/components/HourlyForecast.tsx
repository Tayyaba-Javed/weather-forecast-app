import type { ForecastData } from '../types/weather'
import { motion } from 'framer-motion'

interface HourlyForecastProps {
  forecast: ForecastData
  unit: 'metric' | 'imperial'
}

export const HourlyForecast = ({ forecast, unit }: HourlyForecastProps) => {
  // Get next 24 hours (8 * 3h blocks)
  const hourlyForecasts = forecast.list.slice(0, 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-6 rounded-[2.5rem] space-y-4"
    >
      <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] tracking-widest font-bold px-2">
        <span>⏰</span> HOURLY FORECAST
      </div>

      <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
        {hourlyForecasts.map((hour, i) => {
          const date = new Date(hour.dt * 1000)
          const time = i === 0 ? 'Now' : date.toLocaleTimeString([], { hour: 'numeric', hour12: true })

          return (
            <div key={hour.dt} className="flex flex-col items-center gap-2 min-w-[50px]">
              <span className="text-xs font-medium opacity-60">{time}</span>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt={hour.weather[0].description}
                className="w-10 h-10"
              />
              <span className="text-lg font-semibold">{Math.round(hour.main.temp)}{unit === 'metric' ? '°' : '°F'}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

