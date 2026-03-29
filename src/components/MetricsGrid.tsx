import { motion } from 'framer-motion'
import {
    FiDroplet,
    FiEye,
    FiWind,
    FiCompass,
    FiSunset,
    FiThermometer
} from 'react-icons/fi'
import type { WeatherData } from '../types/weather'

interface MetricsGridProps {
    weather: WeatherData | null
    unit: 'metric' | 'imperial'
}

export const MetricsGrid = ({ weather, unit }: MetricsGridProps) => {
    if (!weather) return null

    const metrics = [
        {
            label: 'Humidity',
            value: `${weather.main.humidity}%`,
            icon: FiDroplet,
            color: 'text-blue-400',
        },
        {
            label: 'Visibility',
            value: `${(weather.visibility / 1000).toFixed(1)} km`,
            icon: FiEye,
            color: 'text-purple-400',
        },
        {
            label: 'Wind Speed',
            value: `${weather.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`,
            icon: FiWind,
            color: 'text-green-400',
        },
        {
            label: 'Pressure',
            value: `${weather.main.pressure} hPa`,
            icon: FiCompass,
            color: 'text-orange-400',
        },
        {
            label: 'Feels Like',
            value: `${Math.round(weather.main.feels_like)}${unit === 'metric' ? '°' : '°F'}`,
            icon: FiThermometer,
            color: 'text-red-400',
        },
        {
            label: 'Sunset',
            value: new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            icon: FiSunset,
            color: 'text-amber-500',
        },
    ]

    return (
        <div className="grid grid-cols-2 gap-4 mt-6">
            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-5 rounded-[2rem] group hover:bg-white/10 transition-all cursor-default"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <metric.icon className={`text-xl ${metric.color}`} />
                        </div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">
                            {metric.label}
                        </h4>
                    </div>
                    <p className="text-xl font-bold tracking-tight">{metric.value}</p>
                </motion.div>
            ))}
        </div>
    )
}
