import axios from 'axios';
import type { WeatherData, ForecastData } from '../types/weather';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Professional Weather Service Layer
 * Handles API communication, rate limiting considerations, and data normalization.
 */
export const weatherService = {
    /**
     * Fetch current weather and forecast for a city
     */
    getWeatherByCity: async (city: string, apiKey: string, units: string = 'metric') => {
        const [weatherResponse, forecastResponse] = await Promise.all([
            axios.get(`${BASE_URL}/weather`, {
                params: { q: city, appid: apiKey, units },
            }),
            axios.get(`${BASE_URL}/forecast`, {
                params: { q: city, appid: apiKey, units },
            }),
        ]);
        return { weather: weatherResponse.data as WeatherData, forecast: forecastResponse.data as ForecastData };
    },

    /**
     * Fetch weather by coordinates
     */
    getWeatherByCoords: async (lat: number, lon: number, apiKey: string, units: string = 'metric') => {
        const [weatherResponse, forecastResponse] = await Promise.all([
            axios.get(`${BASE_URL}/weather`, {
                params: { lat, lon, appid: apiKey, units },
            }),
            axios.get(`${BASE_URL}/forecast`, {
                params: { lat, lon, appid: apiKey, units },
            }),
        ]);
        return { weather: weatherResponse.data as WeatherData, forecast: forecastResponse.data as ForecastData };
    },

    /**
     * Fetch Air Pollution (AQI)
     */
    getAirPollution: async (lat: number, lon: number, apiKey: string) => {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution', {
            params: { lat, lon, appid: apiKey },
        });
        return response.data;
    },

    /**
     * Get AQI label and color based on index (1-5)
     */
    getAqiStatus: (index: number) => {
        const statusMap: Record<number, { label: string; color: string; description: string }> = {
            1: { label: 'Good', color: 'text-green-400', description: 'Air quality is satisfactory.' },
            2: { label: 'Fair', color: 'text-yellow-400', description: 'Air quality is acceptable.' },
            3: { label: 'Moderate', color: 'text-orange-400', description: 'Sensitive groups may experience health effects.' },
            4: { label: 'Poor', color: 'text-red-400', description: 'Everyone may begin to experience health effects.' },
            5: { label: 'Very Poor', color: 'text-purple-400', description: 'Health warnings of emergency conditions.' },
        };
        return statusMap[index] || statusMap[1];
    },

    /**
     * Update the browser favicon dynamically based on weather icon
     */
    updateFavicon: (iconCode: string) => {
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
};
