// Weather App using OpenWeatherMap API

const API_KEY_STORAGE = 'weatherAppApiKey';
let apiKey = localStorage.getItem(API_KEY_STORAGE);

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const apiKeySection = document.getElementById('apiKeySection');
const settingsBtn = document.getElementById('settingsBtn');
const closeApiKeyBtn = document.getElementById('closeApiKeyBtn');
const changeKeyBtn = document.getElementById('changeKeyBtn');
const currentKeyDisplay = document.getElementById('currentKeyDisplay');
const currentKeyText = document.getElementById('currentKeyText');
const apiKeyInputSection = document.getElementById('apiKeyInputSection');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherDisplay = document.getElementById('weatherDisplay');

// Initialize app
function init() {
    console.log('[Weather App] Initializing...');
    if (apiKey) {
        console.log('[Weather App] API key found in localStorage');
        apiKeySection.classList.add('hidden');
        cityInput.disabled = false;
        searchBtn.disabled = false;
        updateCurrentKeyDisplay();
    } else {
        console.log('[Weather App] No API key found, showing input');
        cityInput.disabled = true;
        searchBtn.disabled = true;
        showApiKeyInput();
    }
}

// Update the current key display
function updateCurrentKeyDisplay() {
    if (apiKey) {
        const maskedKey = maskApiKey(apiKey);
        currentKeyText.textContent = maskedKey;
    }
}

// Mask API key for display
function maskApiKey(key) {
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
}

// Show API key input section
function showApiKeyInput() {
    currentKeyDisplay.classList.add('hidden');
    apiKeyInputSection.classList.remove('hidden');
}

// Show current key section
function showCurrentKey() {
    apiKeyInputSection.classList.add('hidden');
    currentKeyDisplay.classList.remove('hidden');
}

// Save API key
saveApiKeyBtn.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
        console.log('[Weather App] Saving API key');
        apiKey = key;
        localStorage.setItem(API_KEY_STORAGE, key);
        updateCurrentKeyDisplay();
        apiKeySection.classList.add('hidden');
        cityInput.disabled = false;
        searchBtn.disabled = false;
        apiKeyInput.value = '';
        showError('API key saved successfully! ✓', 'success');
        setTimeout(() => hideError(), 3000);
    } else {
        showError('Please enter a valid API key');
    }
});

// Settings button - toggle API key section
settingsBtn.addEventListener('click', () => {
    console.log('[Weather App] Settings button clicked');
    apiKeySection.classList.toggle('hidden');
    if (!apiKeySection.classList.contains('hidden')) {
        if (apiKey) {
            showCurrentKey();
        } else {
            showApiKeyInput();
        }
    }
});

// Close API key section
closeApiKeyBtn.addEventListener('click', () => {
    apiKeySection.classList.add('hidden');
});

// Change API key button
changeKeyBtn.addEventListener('click', () => {
    console.log('[Weather App] Change key button clicked');
    showApiKeyInput();
    apiKeyInput.focus();
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
    console.log(`[Weather App] Fetching weather for: ${city}`);
    showLoading();
    hideError();
    hideWeatherDisplay();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    console.log(`[Weather App] API URL: ${url.replace(apiKey, '***API_KEY***')}`);

    try {
        const response = await fetch(url);
        console.log(`[Weather App] Response status: ${response.status}`);

        if (!response.ok) {
            if (response.status === 401) {
                console.error('[Weather App] Invalid API key (401)');
                // Show settings so user can change key
                setTimeout(() => {
                    apiKeySection.classList.remove('hidden');
                    showCurrentKey();
                }, 100);
                throw new Error('❌ Invalid API key! Click the gear icon (⚙️) at the top right to update your API key. Make sure your key is activated (can take a few minutes after creating it).');
            } else if (response.status === 404) {
                console.error('[Weather App] City not found (404)');
                throw new Error('❌ City not found. Please check the spelling and try again.');
            } else {
                console.error(`[Weather App] API error: ${response.status}`);
                const errorData = await response.json().catch(() => ({}));
                console.error('[Weather App] Error details:', errorData);
                throw new Error(`❌ Failed to fetch weather data (Status: ${response.status}). Please try again later.`);
            }
        }

        const data = await response.json();
        console.log('[Weather App] Weather data received:', data);
        displayWeather(data);
    } catch (err) {
        console.error('[Weather App] Error:', err);
        showError(err.message);
    } finally {
        hideLoading();
    }
}

// Display weather data
function displayWeather(data) {
    console.log('[Weather App] Displaying weather data');
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
    console.log('[Weather App] Weather display updated successfully');
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
