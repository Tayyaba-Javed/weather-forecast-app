import type { ForecastData } from '../types/weather'
import { motion } from 'framer-motion'

interface ForecastCardProps {
  forecast: ForecastData
  unit: 'metric' | 'imperial'
}

export const ForecastCard = ({ forecast, unit }: ForecastCardProps) => {
  // Get one forecast per day
  const dailyForecasts = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5)

  // Find overall min and max for the scale
  const allTemps = dailyForecasts.flatMap(d => [d.main.temp_min, d.main.temp_max])
  const overallMin = Math.min(...allTemps)
  const overallMax = Math.max(...allTemps)
  const range = overallMax - overallMin

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-6 rounded-[2.5rem] space-y-6"
    >
      <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] tracking-widest font-bold px-2">
        <span>📅</span> 5-DAY FORECAST
      </div>

      <div className="space-y-4">
        {dailyForecasts.map((day, i) => {
          const date = new Date(day.dt * 1000)
          const isToday = i === 0
          const dayName = isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })

          const minPercent = ((day.main.temp_min - overallMin) / range) * 100
          const maxPercent = ((day.main.temp_max - overallMin) / range) * 100

          return (
            <div key={day.dt} className="flex items-center justify-between gap-4 py-3 border-t border-white/5 first:border-0">
              <span className="w-12 font-medium">{dayName}</span>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-10 h-10"
              />

              <div className="flex items-center gap-3 flex-1">
                <span className="w-8 text-right opacity-60 text-sm">{Math.round(day.main.temp_min)}{unit === 'metric' ? '°' : '°F'}</span>

                {/* Temperature Range Bar */}
                <div className="h-1.5 flex-1 bg-white/10 rounded-full relative overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"
                    style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
                  />
                </div>

                <span className="w-8 text-left font-medium text-sm">{Math.round(day.main.temp_max)}{unit === 'metric' ? '°' : '°F'}</span>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

