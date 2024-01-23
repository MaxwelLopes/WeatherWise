import './Forecast.css'

function Forecast(){
    return (
        <>
            <div className="forecast">
                <img src="./src/assets/svg/day.svg" alt="" className="svg-forecast"/>
                <div className="temperature">
                    <p className="value">40<span className='scale'>°</span></p>
                    <p className='differential'>↑32° ↓12°</p>
                </div>
            </div>
        </>
    )
}

export default Forecast