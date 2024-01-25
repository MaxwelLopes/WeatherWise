import CurrentWeather from '../currentWeather/CurrentWeather'
import Search from '../search/Search'
import Forecast from '../Forecast/Forecast.jsx'
import './App.css'

function App() {
  return (
    <>
      <div className='container'>
        
        <Search/>
        
        <CurrentWeather/>

        <div className="forecast-day">
          <Forecast/>
        </div>

      </div>
    </>
  )
}

export default App
