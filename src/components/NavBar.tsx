import { FiHome, FiHeart, FiCloud, FiSettings } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface NavBarProps {
  activeTab: 'home' | 'favorites' | 'details' | 'settings'
  onChange: (tab: 'home' | 'favorites' | 'details' | 'settings') => void
}

export const NavBar = ({ activeTab, onChange }: NavBarProps) => {
  const navItems = [
    { id: 'home', label: 'Weather', icon: FiHome },
    { id: 'favorites', label: 'Saved', icon: FiHeart },
    { id: 'details', label: 'Details', icon: FiCloud },
    { id: 'settings', label: 'More', icon: FiSettings },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 backdrop-blur-3xl z-50 pb-safe">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onChange(id as any)}
              className="relative flex flex-col items-center justify-center gap-1 group py-1"
            >
              <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-white/40 group-hover:text-white/60'}`} />
              <span className={`text-[10px] font-medium transition-all duration-300 ${isActive ? 'text-white opacity-100' : 'text-white/40 opacity-0 group-hover:opacity-60'}`}>
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 w-1 h-1 bg-white rounded-full"
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

