export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export const formatTemperature = (temp: number): string => {
  return Math.round(temp).toString()
}

export const getWeatherGradient = (weatherMain: string): string => {
  const lowerCase = weatherMain.toLowerCase()
  
  if (lowerCase.includes('rain')) return 'from-blue-600 to-blue-400'
  if (lowerCase.includes('cloud')) return 'from-gray-600 to-gray-400'
  if (lowerCase.includes('clear') || lowerCase.includes('sunny')) return 'from-orange-500 to-yellow-400'
  if (lowerCase.includes('snow')) return 'from-blue-200 to-gray-300'
  if (lowerCase.includes('thunder')) return 'from-purple-700 to-indigo-600'
  if (lowerCase.includes('mist') || lowerCase.includes('fog')) return 'from-gray-500 to-gray-400'
  
  return 'from-blue-500 to-blue-400'
}
