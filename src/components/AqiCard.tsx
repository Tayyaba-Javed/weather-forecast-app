import { motion } from 'framer-motion'
import { FiWind, FiAlertCircle } from 'react-icons/fi'
import { weatherService } from '../api/weatherService'
import type { AirPollutionData } from '../types/weather'

interface AqiCardProps {
    aqi: AirPollutionData | null
}

export const AqiCard = ({ aqi }: AqiCardProps) => {
    if (!aqi) return null

    const index = aqi.list[0].main.aqi
    const status = weatherService.getAqiStatus(index)
    const components = aqi.list[0].components

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-6 rounded-[2.5rem] relative overflow-hidden group"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center">
                        <FiWind className="text-xl text-blue-300" />
                    </div>
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">Air Quality</h4>
                        <p className={`text-sm font-bold ${status.color}`}>{status.label}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <span className="text-[10px] font-bold">AQI {index}</span>
                </div>
            </div>

            <p className="text-[11px] text-white/60 mb-6 leading-relaxed">
                {status.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest font-bold opacity-30 mb-1">PM 2.5</span>
                    <span className="text-xs font-bold">{components.pm2_5.toFixed(1)}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest font-bold opacity-30 mb-1">PM 10</span>
                    <span className="text-xs font-bold">{components.pm10.toFixed(1)}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest font-bold opacity-30 mb-1">CO</span>
                    <span className="text-xs font-bold">{components.co.toFixed(1)}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                    <span className="block text-[8px] uppercase tracking-widest font-bold opacity-30 mb-1">O3</span>
                    <span className="text-xs font-bold">{components.o3.toFixed(1)}</span>
                </div>
            </div>

            {index > 3 && (
                <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 p-2 rounded-xl border border-red-400/20">
                    <FiAlertCircle className="shrink-0" />
                    <span className="text-[9px] font-medium">Wear a mask or limit outdoor time.</span>
                </div>
            )}
        </motion.div>
    )
}
