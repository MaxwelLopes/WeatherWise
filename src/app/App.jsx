import React, { useEffect, useState } from 'react';
import CurrentWeather from '../currentWeather/CurrentWeather.jsx';
import Search from '../search/Search.jsx';
import Forecast from '../Forecast/Forecast.jsx';
import './App.css';

function App() {
  function isDaytime(currentTimestamp, sunriseTimestamp, sunsetTimestamp, timezoneOffset) {
    // Ajustar os timestamps para o fuso horário local
    const localCurrentTimestamp = currentTimestamp + timezoneOffset;
    const localSunriseTimestamp = sunriseTimestamp + timezoneOffset;
    const localSunsetTimestamp = sunsetTimestamp + timezoneOffset;
    return localCurrentTimestamp >= localSunriseTimestamp && localCurrentTimestamp <= localSunsetTimestamp;
  }

  function getWeatherSvg(weatherData) {
    const isNight = !isDaytime(weatherData.dt, weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.timezone);
    const condition = weatherData.weather[0].description;

    // Thunderstorm conditions
    if (['thunderstorm with rain', 'thunderstorm with heavy rain', 'light thunderstorm', 'thunderstorm', 'heavy thunderstorm', 'ragged thunderstorm', 'thunderstorm with light drizzle', 'thunderstorm with drizzle', 'thunderstorm with heavy drizzle'].includes(condition)) {
      return 'Thunderstorm';
    }

    // rain conditions

    if (['light intensity drizzle', 'drizzle', 'light intensity drizzle rain'].includes(condition)) {
      return 'rainy-1';
    }
    if (['moderate rain', 'drizzle rain', 'light rain', 'light intensity shower rain', 'shower drizzle'].includes(condition)) {
      return 'rainy-2'
    }
    if (['heavy intensity drizzle', 'heavy intensity drizzle rain', 'heavy intensity rain', 'shower rain', 'shower rain and drizzle', 'heavy intensity shower rain'].includes(condition)) {
      return 'rainy-3'
    }
    if (['heavy shower rain and drizzle', 'very heavy rain', 'extreme rain', 'freezing rain', 'ragged shower rain'].includes(condition)) {
      return 'rainy-4'
    }

    // snow
    if (['light snow', 'light shower snow', 'light rain and snow', 'light shower sleet'].includes(condition)) {
      return 'snowy-1';
    }

    if (['snow', 'sleet', 'shower sleet', 'rain and snow'].includes(condition)) {
      return 'snowy-2';
    }

    if (['heavy snow', 'shower snow', 'heavy shower snow'].includes(condition)) {
      return 'snowy-3';
    }

    //clouds

    if ('few clouds' || 'mist' == condition) {
      return isNight ? 'cloudy-night-1' : 'cloudy-day-1'
    }
    if ('scattered clouds' == condition) {
      return isNight ? 'cloudy-night-2' : 'cloudy-day-2'
    }
    if ('broken clouds' == condition) {
      return isNight ? 'cloudy-night-3' : 'cloudy-day-3'
    }
    if ('overcast clouds' == condition) {
      return 'cloudy'
    }

    if ('clear sky' == condition) {
      return isNight ? 'night' : 'day'
    }
    return 'default'
  }

  function getWeatherBackground(svgName) {
    const backgrounds = {
      "cloudy-day-1": "linear-gradient(to bottom, #e9e9e9, #c0c0c0)",
      "cloudy-day-2": "linear-gradient(to bottom, #d0d0d0, #a6a6a6)",
      "cloudy-day-3": "linear-gradient(to bottom, #b6b6b6, #8c8c8c)",
      "cloudy-night-1": "linear-gradient(to bottom, #2c3e50, #5a7189)",
      "cloudy-night-2": "linear-gradient(to bottom, #243b55, #507391)",
      "cloudy-night-3": "linear-gradient(to bottom, #1b2839, #465e75)",
      "cloudy": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
      "day": "linear-gradient(to bottom, #56CCF2, #2F80ED)",
      "night": "linear-gradient(to bottom, #000000, #000529, #000000)",
      "rainy-1": "linear-gradient(to bottom, #92c2f4, #92c2f4, #E0E0E0)",
      "rainy-2": "linear-gradient(to bottom, #82baf4, #b9b9b9)",
      "rainy-3": "linear-gradient(to bottom, #4ea4fc, #8b9095)",
      "rainy-4": "linear-gradient(to bottom, #007cfe, #6f7478)",
      "snowy-1": "linear-gradient(to bottom, #ffffff, #dee0e1)",
      "snowy-2": "linear-gradient(to bottom, #eff1f2, #dee0e1)",
      "snowy-3": "linear-gradient(to bottom, #ececec, #dee0e1)",
      "Thunderstorm": "linear-gradient(to bottom, #141E30, #243B55)"
    }
    return backgrounds[svgName] || 'linear-gradient(to bottom, #red, #black)';
  }

  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [condition, setCondition] = useState(null);
  const [isLoading, setIsloading] = useState(false)
  const [background, setBackground] = useState('')
  const [message, setMessage] = useState('');
  const [svgHome, setSvgHome] = useState('')

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 18) {
      setBackground('linear-gradient(to bottom, #56CCF2, #2F80ED)');
      setSvgHome('day')
    } else {
      setBackground('linear-gradient(to bottom, #000000, #000529, #000000)');
      setSvgHome('night')
    }
  }, []);

  const fetchData = async ({ city, latitude, longitude }) => {
    let urlWeather, urlForecast;

    if (city) {
      urlWeather = `http://localhost:5000/api?type=weather&city=${city}`;
      urlForecast = `http://localhost:5000/api?type=forecast&city=${city}`;
    } else if (latitude && longitude) {
      urlWeather = `http://localhost:5000/api?type=weather&lat=${latitude}&lon=${longitude}`;
      urlForecast = `http://localhost:5000/api?type=forecast&lat=${latitude}&lon=${longitude}`;
    }
    setIsloading(true)

    const response = await fetch(urlWeather);
    try {
      let data = await response.json();
      setWeatherData(data);
      let svgName = getWeatherSvg(data);
      setCondition(svgName);
      setBackground(getWeatherBackground(svgName));
      setMessage('')
    
      const responseForecast = await fetch(urlForecast);
      data = await responseForecast.json();
      let forecastData = [];
      for (let i = 0; i < 10; i++) {
        let forecast = data.list[i];
        let hour = forecast.dt_txt.substring(11, 16);;
        let temperature = forecast.main.temp;
        let rainVolume = forecast.rain && forecast.rain['3h'] ? forecast.rain['3h'] : 0;

        forecastData.push([hour, temperature, rainVolume]);
      }
      setForecastData(forecastData);
      setMessage('')
    }
    catch (error) {
      setWeatherData(null)
      setIsloading(false)
      window.location.reload(setMessage('Cidade não encontrada!'));
    }
  }
  return (
    <>
      <div className='main' style={{ background: background }} id='glass' >
        {weatherData == null ? (
          isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="home-container">
              <div className='home' id='glass'>
                <Search callFetchData={fetchData} />
                <div className="message">
                  <p>{message}</p>
                </div>
                <img src={svgHome + ".svg"} alt="" className="svg-home" />
              </div>
            </div>
          )
        ) : (
          <div className="weather-container">
            <div className="weather">
              <div className="search-container" id='current-search'>
                <Search callFetchData={fetchData} />
              </div>
              <div className="container" id='glass'>
                <CurrentWeather weatherData={weatherData} condition={condition} />
                <Forecast forecastData={forecastData} />
              </div>
            </div>
          </div>
        )}
        <div class="attribution">
          Créditos de Atribuição: Ícones por <a href="https://www.amcharts.com/free-animated-svg-weather-icons/" target="_blank">amCharts</a>, licenciados sob <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>.
        </div>
      </div>

    </>
  );
}

export default App;