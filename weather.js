document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    
    // Status Elements
    const initialState = document.getElementById('initial-state');
    const loadingState = document.getElementById('loading-state');
    const errorState = document.getElementById('error-state');
    
    // Result Elements
    const weatherResult = document.getElementById('weather-result');
    const cityNameEl = document.getElementById('weather-city-name');
    const conditionEl = document.getElementById('weather-condition');
    const tempEl = document.getElementById('weather-temp');
    const humidityEl = document.getElementById('weather-humidity');
    const windEl = document.getElementById('weather-wind');

    // WMO Weather interpretation codes
    const getWeatherDescription = (code) => {
        const descriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            56: 'Light freezing drizzle',
            57: 'Dense freezing drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            66: 'Light freezing rain',
            67: 'Heavy freezing rain',
            71: 'Slight snow fall',
            73: 'Moderate snow fall',
            75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            85: 'Slight snow showers',
            86: 'Heavy snow showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Unknown weather condition';
    };

    const setLoadingState = (isLoading) => {
        if (isLoading) {
            initialState.style.display = 'none';
            errorState.style.display = 'none';
            weatherResult.style.display = 'none';
            loadingState.style.display = 'block';
            
            searchBtn.disabled = true;
            searchBtn.setAttribute('aria-disabled', 'true');
            cityInput.disabled = true;
        } else {
            loadingState.style.display = 'none';
            
            searchBtn.disabled = false;
            searchBtn.removeAttribute('aria-disabled');
            cityInput.disabled = false;
        }
    };

    const renderError = (message) => {
        setLoadingState(false);
        errorState.textContent = message;
        errorState.style.display = 'block';
        weatherResult.style.display = 'none';
        initialState.style.display = 'none';
    };

    const renderWeather = (cityData, weatherData) => {
        setLoadingState(false);
        errorState.style.display = 'none';
        initialState.style.display = 'none';

        // Destructure and validate required fields
        const { name, country } = cityData;
        const { temperature_2m, relative_humidity_2m, wind_speed_10m, weather_code } = weatherData.current;

        if (temperature_2m === undefined || relative_humidity_2m === undefined || wind_speed_10m === undefined || weather_code === undefined) {
            throw new Error('Weather data is missing required fields.');
        }

        // Safe DOM updates
        cityNameEl.textContent = country ? `${name}, ${country}` : name;
        conditionEl.textContent = getWeatherDescription(weather_code);
        tempEl.textContent = `${temperature_2m}°C`;
        humidityEl.textContent = `${relative_humidity_2m}%`;
        windEl.textContent = `${wind_speed_10m} km/h`;

        weatherResult.style.display = 'block';
    };

    const fetchCityCoordinates = async (city) => {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const response = await fetch(geoUrl);
        
        if (!response.ok) {
            throw new Error('Unable to contact the geocoding service.');
        }

        const data = await response.json();
        
        if (!data.results || data.results.length === 0) {
            throw new Error('City not found. Please check the spelling and try again.');
        }

        return data.results[0];
    };

    const fetchWeatherData = async (latitude, longitude) => {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error('Unable to retrieve weather data. Please try again.');
        }

        const data = await response.json();
        
        if (!data.current) {
            throw new Error('Invalid weather data received.');
        }

        return data;
    };

    const searchWeather = async (city) => {
        try {
            setLoadingState(true);
            
            const cityData = await fetchCityCoordinates(city);
            const weatherData = await fetchWeatherData(cityData.latitude, cityData.longitude);
            
            renderWeather(cityData, weatherData);
        } catch (error) {
            console.error('Weather fetching error:', error);
            // Distinguish between our custom error messages and generic network errors
            if (error.message.includes('fetch') || error.name === 'TypeError') {
                renderError('Network failure. Please check your connection and try again.');
            } else {
                renderError(error.message || 'An unexpected error occurred.');
            }
        }
    };

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        
        if (!city) {
            renderError('Please enter a city name.');
            return;
        }

        searchWeather(city);
    });
});
