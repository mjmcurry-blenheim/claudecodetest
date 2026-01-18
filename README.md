# Weather App

A simple, beautiful weather application that displays current weather information for any city using the OpenWeatherMap API.

## Features

- Search weather by city name
- Display current temperature, feels like, humidity, wind speed, and pressure
- Beautiful gradient UI with smooth animations
- Responsive design for mobile and desktop
- API key storage in browser local storage
- Weather icons from OpenWeatherMap

## Running the App

### Option 1: Local File (Quickest)
Simply open `index.html` in your web browser by double-clicking it or using:
```bash
xdg-open index.html  # Linux
open index.html      # Mac
start index.html     # Windows
```

### Option 2: Local Web Server (Recommended)
Run the included Python server:
```bash
python3 server.py
```
Then open http://localhost:8000/ in your browser.

### Option 3: GitHub Pages (Online Hosting)
1. Push this repository to GitHub
2. Go to **Settings** > **Pages**
3. Select your main branch and **/ (root)** folder
4. Your site will be live at `https://your-username.github.io/repo-name/`

## How to Use

1. **Get an API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key (it may take a few minutes to activate)

2. **Set Up the App**
   - Open the app using one of the methods above
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
