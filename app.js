// Weather App using OpenWeatherMap API

const API_KEY_STORAGE = 'weatherAppApiKey';
let apiKey = localStorage.getItem(API_KEY_STORAGE);

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const apiKeySection = document.getElementById('apiKeySection');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherDisplay = document.getElementById('weatherDisplay');

// Initialize app
function init() {
    if (apiKey) {
        apiKeySection.classList.add('hidden');
        cityInput.disabled = false;
        searchBtn.disabled = false;
    } else {
        cityInput.disabled = true;
        searchBtn.disabled = true;
    }
}

// Save API key
saveApiKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        apiKey = key;
        localStorage.setItem(API_KEY_STORAGE, key);
        apiKeySection.classList.add('hidden');
        cityInput.disabled = false;
        searchBtn.disabled = false;
        showError('API key saved successfully!', 'success');
        setTimeout(() => hideError(), 3000);
    } else {
        showError('Please enter a valid API key');
    }
});

// Search weather
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError('Please enter a city name');
    }
});

// Allow Enter key to search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Fetch weather data
async function getWeather(city) {
    showLoading();
    hideError();
    hideWeatherDisplay();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your API key and try again.');
            } else if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }

        const data = await response.json();
        displayWeather(data);
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

// Display weather data
function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('description').textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;

    weatherDisplay.classList.remove('hidden');
}

// UI Helper functions
function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message, type = 'error') {
    error.textContent = message;
    error.classList.remove('hidden');

    if (type === 'success') {
        error.style.background = '#d4edda';
        error.style.color = '#155724';
        error.style.borderColor = '#c3e6cb';
    } else {
        error.style.background = '#f8d7da';
        error.style.color = '#721c24';
        error.style.borderColor = '#f5c6cb';
    }
}

function hideError() {
    error.classList.add('hidden');
}

function hideWeatherDisplay() {
    weatherDisplay.classList.add('hidden');
}

// Initialize the app
init();
