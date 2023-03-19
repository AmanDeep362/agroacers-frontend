import React, {useEffect, useState} from 'react';
import "./../../../Styles/weather.css";
import axios from "axios";

function MyLocalWeather(){

    const [cityname, setcityname] = useState("Haryana");
    const [weather, setweather] = useState(null);

    useEffect(() => {  
        const fetchAPI = async () => {
            try {
                const {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=c4446ddb686aef7607cbdbd947306656`);
                // console.log(data)
                setweather(data);
                // console.log(weather);
            }catch (error) {
                console.log(error.message);
                setweather(null);
            }  
        }

        fetchAPI();
        window.scroll(0,0);
    }, [cityname])

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
    }

    return(
        <>
           {!weather ? 
                <div>
                    <div className='weatherappno mb-3'>
                        <main className="main-nodata-box">
                            <div className="search-box">
                                <input 
                                    type="text"
                                    className="search-bar"
                                    onChange={e => setcityname(e.target.value)}
                                    value={cityname}
                                
                                />
                            </div>
                            <div className="location-box">
                                    <div className="location">NO DATA FOUND</div>
                            </div>
                        </main>
                    </div>
                </div>
                :
                <div>
                    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'weatherapp warm' : 'weatherapp')  : 'weatherapp'}>
                        <main className="main-weather-box">
                            <div className="search-box">
                                <input 
                                    type="text"
                                    className="search-bar"
                                    onChange={e => setcityname(e.target.value)}
                                    value={cityname}
                                
                                />
                            </div>
                        {(typeof weather.main != "undefined") ? (
                            <div>
                                <div className="location-box">
                                    <div className="location">{weather.name}, {weather.sys.country}</div>
                                    <div className="date">{dateBuilder(new Date())}</div>
                                </div>
                                <div className="weather-box">
                                    <div className="temp">
                                        <div className="tempmain">{Math.round(weather.main.temp)}°c</div>
                                        <div className="tempmain2">min temperature: { parseFloat(weather.main.temp_min).toFixed(2) }°c</div>
                                        <div className="tempmain2">max temperature: { parseFloat(weather.main.temp_max).toFixed(2) + 2}°c</div>
                                        <div className="tempmain2">Wind Speed: {weather.wind.speed}</div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="weather">{weather.weather[0].main}</div>
                                        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="OpenWeather" />
                                    </div>
                                </div>
                            </div>
                        ) : ('')}
                        </main>
                    </div>
                </div>  
            }
        </>
    )
}

export default MyLocalWeather;