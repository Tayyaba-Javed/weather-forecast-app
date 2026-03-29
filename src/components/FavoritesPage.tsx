import { FiTrash2, FiMapPin } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { formatTemperature } from '../utils/formatDate'

interface FavoritesPageProps {
  favorites: Array<{ name: string; country: string; temp: number; condition: string; icon: string }>
  onSelectCity: (city: string) => void
  onRemove: (city: string) => void
  loading: boolean
}

export const FavoritesPage = ({ favorites, onSelectCity, onRemove }: FavoritesPageProps) => {
  return (
    <div className="space-y-6 pb-32">
      <header className="px-2">
        <h2 className="text-3xl font-bold">Saved Locations</h2>
        <p className="opacity-50 text-sm font-medium mt-1">Manage your favorite cities</p>
      </header>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-[2.5rem] p-12 text-center"
        >
          <div className="text-4xl mb-4 opacity-20">📍</div>
          <p className="text-white/40 text-sm font-medium">No locations saved yet.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {favorites.map((city, i) => (
              <motion.div
                layout
                key={city.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelectCity(city.name)}
                className="glass rounded-[2.5rem] p-6 cursor-pointer group active:scale-[0.98] transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${city.icon}.png`}
                      className="w-12 h-12"
                      alt=""
                    />
                    <div>
                      <h3 className="text-xl font-bold">{city.name}</h3>
                      <p className="text-xs opacity-50 font-medium flex items-center gap-1">
                        <FiMapPin className="text-[10px]" /> {city.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatTemperature(city.temp)}°</p>
                      <p className="text-[10px] uppercase tracking-wider opacity-40 font-bold">{city.condition}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemove(city.name)
                      }}
                      className="p-3 bg-white/5 hover:bg-red-500/20 rounded-2xl transition-all"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

