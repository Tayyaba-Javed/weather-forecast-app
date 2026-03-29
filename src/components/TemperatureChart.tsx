import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import type { ForecastData } from '../types/weather'

interface TemperatureChartProps {
    forecast: ForecastData | null
    unit: 'metric' | 'imperial'
}

export const TemperatureChart = ({ forecast, unit }: TemperatureChartProps) => {
    if (!forecast) return null

    // Process the first 8 items (approx 24 hours) for the chart
    const data = forecast.list.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
        temp: Math.round(item.main.temp),
    }))

    const minTemp = Math.min(...data.map((d) => d.temp)) - 2
    const maxTemp = Math.max(...data.map((d) => d.temp)) + 2

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-[2.5rem] mt-6"
        >
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">24h Temperature</h4>
                    <p className="text-sm font-bold">Trend Visualization</p>
                </div>
                <div className="text-[10px] text-white/40 font-medium">
                    Values in {unit === 'metric' ? '°C' : '°F'}
                </div>
            </div>

            <div className="h-[200px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                            dy={10}
                        />
                        <YAxis
                            hide
                            domain={[minTemp, maxTemp]}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl">
                                            <p className="text-[10px] font-bold text-white/40 mb-1">
                                                {payload[0].payload.time}
                                            </p>
                                            <p className="text-sm font-bold text-white">
                                                {payload[0].value}{unit === 'metric' ? '°' : '°F'}
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                            animationDuration={2000}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    )
}
