import { useState, useCallback } from 'react'
import axios from 'axios'
import type { WeatherData, ForecastData, AirPollutionData } from '../types/weather'
import { weatherService } from '../api/weatherService'

const getApiKey = () => {
  // Priority: localStorage > .env > demo key
  const stored = localStorage.getItem('OPENWEATHER_API_KEY')
  if (stored) return stored.trim()

  const envKey = import.meta.env.VITE_OPENWEATHER_API_KEY
  if (envKey) return envKey.trim()

  // Return null if no key configured
  return null
}

interface UseWeatherReturn {
  currentWeather: WeatherData | null
  forecast: ForecastData | null
  aqi: AirPollutionData | null
  loading: boolean
  error: string | null
  unit: 'metric' | 'imperial'
  searchWeather: (city: string) => Promise<void>
  getLocationWeather: (lat: number, lon: number) => Promise<void>
  toggleUnit: () => void
}

export const useWeather = (): UseWeatherReturn => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [aqi, setAqi] = useState<AirPollutionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unit, setUnit] = useState<'metric' | 'imperial'>(
    (localStorage.getItem('WEATHER_UNIT') as 'metric' | 'imperial') || 'metric'
  )

  const toggleUnit = useCallback(() => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric'
    setUnit(newUnit)
    localStorage.setItem('WEATHER_UNIT', newUnit)

    // Refresh data with new unit if we have a current city/location
    if (currentWeather) {
      searchWeather(currentWeather.name)
    }
  }, [unit, currentWeather])

  const searchWeather = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name')
      return
    }

    const apiKey = getApiKey()
    if (!apiKey) {
      setError('❌ API key not configured. Please go to Settings and add your OpenWeatherMap API key.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { weather, forecast } = await weatherService.getWeatherByCity(city, apiKey, unit)

      // Fetch AQI in parallel with the same coordinates
      const aqiData = await weatherService.getAirPollution(weather.coord.lat, weather.coord.lon, apiKey)

      setCurrentWeather(weather)
      setForecast(forecast)
      setAqi(aqiData)
      weatherService.updateFavicon(weather.weather[0].icon)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401 || err.response?.data?.cod === '401') {
          setError('❌ Invalid API key. Please go to Settings and verify your API key.')
        } else if (err.response?.status === 404) {
          setError('City not found. Please try another city name.')
        } else {
          setError(err.response?.data?.message || 'Failed to fetch weather data')
        }
      } else {
        setError('An error occurred while fetching weather data')
      }
      setCurrentWeather(null)
      setForecast(null)
      setAqi(null)
    } finally {
      setLoading(false)
    }
  }, [unit])

  const getLocationWeather = useCallback(async (lat: number, lon: number) => {
    const apiKey = getApiKey()
    if (!apiKey) {
      setError('❌ API key not configured. Please go to Settings and add your OpenWeatherMap API key.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [{ weather, forecast }, aqiData] = await Promise.all([
        weatherService.getWeatherByCoords(lat, lon, apiKey, unit),
        weatherService.getAirPollution(lat, lon, apiKey)
      ])

      setCurrentWeather(weather)
      setForecast(forecast)
      setAqi(aqiData)
      weatherService.updateFavicon(weather.weather[0].icon)
    } catch (err) {
      if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.data?.cod === '401')) {
        setError('❌ Invalid API key. Please go to Settings and verify your API key.')
      } else {
        setError('Failed to get weather for your location')
      }
      setCurrentWeather(null)
      setForecast(null)
      setAqi(null)
    } finally {
      setLoading(false)
    }
  }, [unit])

  return {
    currentWeather,
    forecast,
    aqi,
    loading,
    error,
    unit,
    searchWeather,
    getLocationWeather,
    toggleUnit,
  }
}
