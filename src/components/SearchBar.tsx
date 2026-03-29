import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface SearchBarProps {
  onSearch: (city: string) => void
  onLocationClick: () => void
  loading: boolean
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setInput('')
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-8"
    >
      <div className="relative group">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg group-focus-within:text-white transition-colors" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search City..."
          disabled={loading}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:bg-white/20 focus:border-white/30 transition-all text-sm font-medium group"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
            />
          </div>
        )}
      </div>
    </motion.form>
  )
}

