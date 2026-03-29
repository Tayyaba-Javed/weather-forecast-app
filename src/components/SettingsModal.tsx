import { useState, useEffect } from 'react'
import { FiX, FiCheck, FiInfo } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  unit: 'metric' | 'imperial'
  onToggleUnit: () => void
}

export const SettingsModal = ({ isOpen, onClose, unit, onToggleUnit }: SettingsModalProps) => {
  const [apiKey, setApiKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('OPENWEATHER_API_KEY')
    if (stored) {
      setApiKey(stored)
    }
  }, [])

  const handleSave = () => {
    if (!apiKey.trim()) {
      setError('API key cannot be empty')
      return
    }

    if (apiKey.length < 20) {
      setError('Invalid API key format')
      return
    }

    localStorage.setItem('OPENWEATHER_API_KEY', apiKey)
    setSaved(true)
    setError('')
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass rounded-[3rem] p-8 max-w-sm w-full relative z-[101] overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Settings</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-all"
              >
                <FiX />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 px-1">
                  Temperature Units
                </label>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                  <button
                    onClick={() => onToggleUnit()}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${unit === 'metric' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    Celsius (°C)
                  </button>
                  <button
                    onClick={() => onToggleUnit()}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${unit === 'imperial' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    Fahrenheit (°F)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 px-1">
                  Weather API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter OpenWeather Key"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-sm"
                />
                {error && <p className="text-[10px] text-red-400 font-medium px-1">{error}</p>}
              </div>

              <div className="bg-blue-500/10 rounded-2xl p-4 flex gap-3">
                <FiInfo className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-200/60 leading-normal">
                  Units and settings are persisted locally in your browser.
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={saved}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                {saved ? (
                  <>
                    <FiCheck className="text-green-600" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

