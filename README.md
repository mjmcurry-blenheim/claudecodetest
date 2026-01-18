# Weather App

A simple, beautiful weather application that displays current weather information for any city using the OpenWeatherMap API.

## Features

- Search weather by city name
- Display current temperature, feels like, humidity, wind speed, and pressure
- Beautiful gradient UI with smooth animations
- Responsive design for mobile and desktop
- API key storage in browser local storage
- Weather icons from OpenWeatherMap

## How to Use

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key (it may take a few minutes to activate)

2. **Set Up the App**
   - Open `index.html` in your web browser
   - Enter your OpenWeatherMap API key in the input field
   - Click "Save API Key"

3. **Check the Weather**
   - Enter any city name in the search box
   - Click "Search" or press Enter
   - View the current weather information

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6+)
- OpenWeatherMap API
- LocalStorage for API key persistence

## API Information

This app uses the OpenWeatherMap Current Weather Data API:
- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Units: Metric (Celsius)
- Free tier: 60 calls/minute, 1,000,000 calls/month

## Privacy

Your API key is stored locally in your browser's localStorage and is never sent to any server other than OpenWeatherMap.

## License

Free to use and modify.
