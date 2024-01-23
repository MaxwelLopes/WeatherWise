import './CurrentWeather.css'

function CurrentWeather(){
    return (
        <>
            <div className="current" id='glass'>
                <div className="weather-info">
                    <div className="city-name">
                        <p>Mesquita</p>
                    </div>

                    <div className="temperature">
                        <p className="value">40<span className='scale'>°</span></p>
                        <p className='differential'>↓12° ↑32° </p>
                    </div>

                    <div className="thermal-sensation">
                        <svg id='description-svg'  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 3L15 3M21 7L15 7M21 11L15 11M5.5 13.7578V4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5V13.7578C11.706 14.565 12.5 15.9398 12.5 17.5C12.5 19.9853 10.4853 22 8 22C5.51472 22 3.5 19.9853 3.5 17.5C3.5 15.9398 4.29401 14.565 5.5 13.7578ZM9 17.5C9 18.0523 8.55228 18.5 8 18.5C7.44772 18.5 7 18.0523 7 17.5C7 16.9477 7.44772 16.5 8 16.5C8.55228 16.5 9 16.9477 9 17.5Z" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <p> 48°</p>
                    </div>

                    <div className="rain">
                        <svg viewBox="0 0 24 24" fill="none" id='description-svg' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 19C8 20.1046 8.89543 21 10 21C11.1046 21 12 20.1046 12 19V11M12 11C13.1256 11 14.1643 11.3719 15 11.9996C15.8357 11.3719 16.8744 11 18 11C19.1258 11 20.1643 11.3721 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3.83566 11.3723 4.87439 11 6 11C7.12561 11 8.16434 11.3719 9 11.9996C9.83566 11.3719 10.8744 11 12 11Z" stroke='var(--text)' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <p>50%</p>
                    </div>

                    <div className="wind">
                        <svg id='description-svg' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3" stroke="var(--text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <p>50 km/h</p>
                    </div>
                </div>

                <img src="./src/assets/svg/day.svg" alt="" className="svg-current"/>

            </div>
        </>
    )
}

export default CurrentWeather