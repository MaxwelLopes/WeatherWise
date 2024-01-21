import CurrentWeather from '../currentWeather/CurrentWeather'
import Search from '../search/Search'
import './App.css'

function App() {
  return (
    <>
      <div className='container'>
        <Search/>
        <CurrentWeather/>
      </div>
    </>
  )
}

export default App
