import './currentWeather.css'
import Forecast from '../Forecast/Forecast.jsx';

function CurrentWeather({ weatherData, condition, forecastData}){ 
    return (
        <>  
            
                <div className="current">
                    <div className="weather-info">
                        <div className="city-name">
                            <p id='name-city'>{weatherData.name}</p>
                            <img src={`https://flagcdn.com/32x24/${weatherData.sys.country.toLowerCase()}.png`} alt="country" className='country'/>
                        </div>
                        <div className="info">
                            <div className="temperature">
                                <p className="value">{parseInt(weatherData.main.temp)}<span className='scale'>°</span></p>
                                <div className="differential">
                                    <p>↑{parseInt(weatherData.main.temp_max)}°</p>
                                    <p>↓{parseInt(weatherData.main.temp_min)}°</p>
                                </div>
                            </div>
                            <div className="thermal-sensation">
                                <svg id='description-svg'  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 3L15 3M21 7L15 7M21 11L15 11M5.5 13.7578V4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V13.7578C11.706 14.565 12.5 15.9398 12.5 17.5C12.5 19.9853 10.4853 22 8 22C5.51472 22 3.5 19.9853 3.5 17.5C3.5 15.9398 4.29401 14.565 5.5 13.7578ZM9 17.5C9 18.0523 8.55228 18.5 8 18.5C7.44772 18.5 7 18.0523 7 17.5C7 16.9477 7.44772 16.5 8 16.5C8.55228 16.5 9 16.9477 9 17.5Z" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                <p> {parseInt(weatherData.main.feels_like)}°</p>
                            </div>
                                <div className="humidity">
                                    <svg id='description-svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.827576L12.8878 2.53967C14.1035 4.88434 15.5212 6.51667 16.8024 7.99192C16.9893 8.20708 17.1733 8.41891 17.3533 8.62911C18.7331 10.2403 20 11.8793 20 14.1696C20 18.5172 16.395 22 12 22C7.60499 22 4 18.5172 4 14.1696C4 11.8793 5.26687 10.2403 6.64671 8.62911C6.82673 8.41891 7.0107 8.20708 7.19757 7.99191C8.47882 6.51667 9.89649 4.88434 11.1122 2.53967L12 0.827576ZM8.16579 9.93003C6.7748 11.5543 6 12.6877 6 14.1696C6 17.3667 8.66302 20 12 20C15.337 20 18 17.3667 18 14.1696C18 12.6877 17.2252 11.5543 15.8342 9.93003C15.664 9.73133 15.4862 9.5269 15.3024 9.31552C14.2961 8.15864 13.1087 6.79342 12 5.0167C10.8913 6.79342 9.70387 8.15864 8.69763 9.31552C8.51377 9.5269 8.33596 9.73133 8.16579 9.93003Z" fill="var(--text)"></path> </g></svg>
                                    <p>{parseInt(weatherData.main.humidity)}%</p>
                                </div>
                                <div className="wind">
                                    <svg id='description-svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    <p>{parseInt(weatherData.wind.speed)} km/h</p>
                                </div>
                            </div>
                        </div>
                    <img src={`${condition}.svg`} alt="" className="svg-current"/>
                </div>
                
           
        </>
    )
}

export default CurrentWeather