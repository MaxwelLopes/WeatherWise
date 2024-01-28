import React, { useEffect, useState } from 'react';
import CurrentWeather from '../currentWeather/CurrentWeather';
import Search from '../search/Search';
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

    console.log(condition);

    // Thunderstorm conditions
    if (['thunderstorm with rain', 'thunderstorm with heavy rain', 'light thunderstorm','thunderstorm', 'heavy thunderstorm', 'ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle', 'thunderstorm with heavy drizzle'].includes(condition)) {
        return 'Thunderstorm';
    }

    // rain conditions
    
    if(['light intensity drizzle', 'drizzle', 'light intensity drizzle rain'].includes(condition)) { 
      return 'rainy-1';
    }
    if(['moderate rain', 'drizzle rain','light rain','light intensity shower rain','shower drizzle'].includes(condition)) {
        return 'rainy-2'
    }
    if(['heavy intensity drizzle','heavy intensity drizzle rain','heavy intensity rain','shower rain','shower rain and drizzle','heavy intensity shower rain'].includes(condition)) {
      return 'rainy-3'
    }
    if(['heavy shower rain and drizzle','very heavy rain','extreme rain','freezing rain','ragged shower rain'].includes(condition)) {
      return 'rainy-4'
    }
        
    // snow
    if(['light snow','light shower snow','light rain and snow','light shower sleet'].includes(condition)) {
      return 'snowy-1';
    }

    if(['snow','sleet','shower sleet','rain and snow'].includes(condition)) {
      return 'snowy-2';
    }

    if(['heavy snow','shower snow','heavy shower snow'].includes(condition)) {
      return 'snowy-3';
    }

    //clouds

    if('few clouds' == condition){
      return isNight ? 'cloudy-night-1' : 'cloudy-day-1'
    }
    if('scattered clouds' == condition){
      return isNight ? 'cloudy-night-2' : 'cloudy-day-2'
    }
    if('broken clouds' == condition){
      return isNight ? 'cloudy-night-3' : 'cloudy-day-3'
    }
    if('overcast clouds' == condition){
      return 'cloudy'
    }
  
    if('clear sky' == condition){
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
        "rainy-1": "linear-gradient(to bottom, #a9c0d3, #8fc4ec)", 
        "rainy-2": "linear-gradient(to bottom, #9fbcd4, #4faff7)",
        "rainy-3": "linear-gradient(to bottom, #7ba4c5 , #229efb)",
        "rainy-4": "linear-gradient(to bottom, #295d87, #0082e3)",
        "snowy-1": "linear-gradient(to bottom, #ffffff, #dee0e1)",
        "snowy-2": "linear-gradient(to bottom, #eff1f2, #dee0e1)",
        "snowy-3": "linear-gradient(to bottom, #ececec, #dee0e1)",
        "Thunderstorm": "linear-gradient(to bottom, #141E30, #243B55)"
      }
      
      return backgrounds[svgName] || 'linear-gradient(to bottom, #red, #black)';
  }
    
  const [weatherData, setWeatherData] = useState(null);
  const [condition, setCondition] = useState(null);
  useEffect(() => {
    async function fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
        setCondition(getWeatherSvg(data))
      } 
      catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
      
    }
    let KEY = import.meta.env.VITE_KEY;
    let city = encodeURIComponent('mesquita');
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=metric`;
    fetchData(weatherUrl);
  }, 
  []);

  return (
    <>
       <div className='container' style={{ background: getWeatherBackground(condition) }}>
        <Search/>
        <CurrentWeather weatherData={weatherData} condition={condition}/>
        <div className="forecast-day">
          <Forecast/>
        </div>
      </div>    
    </>
  );
}

export default App;




// import React, { useEffect, useState } from 'react';
// import CurrentWeather from '../currentWeather/CurrentWeather';
// import Search from '../search/Search';
// import Forecast from '../Forecast/Forecast.jsx';
// import './App.css';

// function App() {

//   function isDaytime(currentTimestamp, sunriseTimestamp, sunsetTimestamp, timezoneOffset) {
//     // Ajustar os timestamps para o fuso horário local
//     const localCurrentTimestamp = currentTimestamp + timezoneOffset;
//     const localSunriseTimestamp = sunriseTimestamp + timezoneOffset;
//     const localSunsetTimestamp = sunsetTimestamp + timezoneOffset;
//     return localCurrentTimestamp >= localSunriseTimestamp && localCurrentTimestamp <= localSunsetTimestamp;
//   }

//   function getWeatherSvg(weatherData) {
//     const isNight = !isDaytime(weatherData.dt, weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.timezone);
//     const condition = weatherData.weather[0].description;

//     console.log(condition);

//     // Thunderstorm conditions
//     if (['thunderstorm with rain', 'thunderstorm with heavy rain', 'light thunderstorm','thunderstorm', 'heavy thunderstorm', 'ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle', 'thunderstorm with heavy drizzle'].includes(condition)) {
//         return 'Thunderstorm';
//     }

//     // rain conditions
    
//     if(['light intensity drizzle', 'drizzle', 'light intensity drizzle rain'].includes(condition)) { 
//       return 'rainy-1';
//     }
//     if(['moderate rain', 'drizzle rain','light rain','light intensity shower rain','shower drizzle'].includes(condition)) {
//         return 'rainy-2'
//     }
//     if(['heavy intensity drizzle','heavy intensity drizzle rain','heavy intensity rain','shower rain','shower rain and drizzle','heavy intensity shower rain'].includes(condition)) {
//       return 'rainy-3'
//     }
//     if(['heavy shower rain and drizzle','very heavy rain','extreme rain','freezing rain','ragged shower rain'].includes(condition)) {
//       return 'rainy-4'
//     }
        
//     // snow
//     if(['light snow','light shower snow','light rain and snow','light shower sleet'].includes(condition)) {
//       return 'snowy-1';
//     }

//     if(['snow','sleet','shower sleet','rain and snow'].includes(condition)) {
//       return 'snowy-2';
//     }

//     if(['heavy snow','shower snow','heavy shower snow'].includes(condition)) {
//       return 'snowy-3';
//     }

//     //clouds

//     if('few clouds: 11-25%' == condition){
//       return isNight ? 'cloudy-night-1' : 'cloudy-day-1'
//     }
//     if('scattered clouds: 25-50%' == condition){
//       return isNight ? 'cloudy-night-2' : 'cloudy-day-2'
//     }
//     if('broken clouds: 51-84%' == condition){
//       return isNight ? 'cloudy-night-3' : 'cloudy-day-3'
//     }
//     if('overcast clouds: 85-100%' == condition){
//       return 'cloudy'
//     }
  
//     if('clear sky' == condition){
//       return isNight ? 'night' : 'day'
//     }

//     return 'default'
//   }

//     function getWeatherBackground(svgName) {
//       const backgrounds = {
//         "cloudy-day-1": "linear-gradient(to bottom, #e9e9e9, #c0c0c0)",
//         "cloudy-day-2": "linear-gradient(to bottom, #d0d0d0, #a6a6a6)",
//         "cloudy-day-3": "linear-gradient(to bottom, #b6b6b6, #8c8c8c)",
//         "cloudy-night-1": "linear-gradient(to bottom, #2c3e50, #5a7189)",
//         "cloudy-night-2": "linear-gradient(to bottom, #243b55, #507391)",
//         "cloudy-night-3": "linear-gradient(to bottom, #1b2839, #465e75)",
//         "cloudy": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
//         "day": "linear-gradient(to bottom, #56CCF2, #2F80ED)",
//         "night": "linear-gradient(to bottom, #000000, #000529, #000000)", 
//         "rainy-1": "linear-gradient(to bottom, #a9c0d3, #8fc4ec)", 
//         "rainy-2": "linear-gradient(to bottom, #9fbcd4, #4faff7)",
//         "rainy-3": "linear-gradient(to bottom, #7ba4c5 , #229efb)",
//         "rainy-4": "linear-gradient(to bottom, #295d87, #0082e3)",
//         "snowy-1": "linear-gradient(to bottom, #ffffff, #dee0e1)",
//         "snowy-2": "linear-gradient(to bottom, #eff1f2, #dee0e1)",
//         "snowy-3": "linear-gradient(to bottom, #ececec, #dee0e1)",
//         "Thunderstorm": "linear-gradient(to bottom, #141E30, #243B55)"
//       }
      
//       return backgrounds[svgName] || 'linear-gradient(to bottom, #red, #black)';
//   }

//     const weatherData = {
//       "coord": {"lon": -74.006, "lat": 40.7143},
//       "weather": [{"id": 701, "main": "Mist", "description": "overcast clouds: 85-100%", "icon": "50n"}],
//       "base": "stations",
//       "main": {
//           "temp": 278.79,
//           "feels_like": 277.78,
//           "temp_min": 275.46,
//           "temp_max": 281.34,
//           "pressure": 1027,
//           "humidity": 94
//       },
//       "visibility": 10000,
//       "wind": {"speed": 1.54, "deg": 100},
//       "clouds": {"all": 100},
//       "dt": 1706102868,
//       "sys": {
//           "type": 2,
//           "id": 2008101,
//           "country": "US",
//           "sunrise": 1706098386,
//           "sunset": 1706133754
//       },
//       "timezone": -18000,
//       "id": 5128581,
//       "name": "New York",
//       "cod": 200
//     };

//     const condition = getWeatherSvg(weatherData);
//     console.log(condition);
//     return (
//       <>
//         <div className='container' style={{ background: getWeatherBackground(condition) }}>
//           <Search/>
//           <CurrentWeather weatherData={weatherData} condition={condition}/>
//           <div className="forecast-day">
//             <Forecast/>
//           </div>
//         </div>    
//       </>
//     );
//   }

// export default App;

