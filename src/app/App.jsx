import CurrentWeather from '../currentWeather/CurrentWeather'
import Search from '../search/Search'
import Forecast from '../Forecast/Forecast'
import './App.css'

function App() {
  return (
    <>
      <div className='container'>
        
        <Search/>
        
        <CurrentWeather/>

        <div className="forecast-day">
          <Forecast/>
          <Forecast/>
          <Forecast/>
          <Forecast/>
          <Forecast/>
          <Forecast/>
          <Forecast/>
          <Forecast/>
        </div>

      </div>
    </>
  )
}

export default App
