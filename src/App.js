import React, {  useEffect, useRef, useState } from 'react'
import './App.css'
import e404 from './images/404.png'
import Clear from "./images/clear.png"
import Cloud from "./images/cloud.png"
import mist from "./images/mist.png"
import rain from "./images/rain.png"
import snow from "./images/snow.png"




const App = () => {
const [imagew , setimages] = useState(Clear)
const cityref = useRef()
const [location , setcity] = useState('france')
const [weather , setweather] = useState({
  "coord": {
      "lon": -87.4534,
      "lat": 40.9462
  },
  "weather": [
      {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }
  ],
  "base": "stations",
  "main": {
      "temp": 27.29,
      "feels_like": 30.73,
      "temp_min": 26.98,
      "temp_max": 28.85,
      "pressure": 1012,
      "humidity": 83,
      "sea_level": 1012,
      "grnd_level": 989
  },
  "visibility": 10000,
  "wind": {
      "speed": 2.34,
      "deg": 274,
      "gust": 4.07
  },
  "clouds": {
      "all": 95
  },
  "dt": 1688169802,
  "sys": {
      "type": 2,
      "id": 2009751,
      "country": "US",
      "sunrise": 1688120455,
      "sunset": 1688174742
  },
  "timezone": -18000,
  "id": 4923796,
  "name": "Morocco",
  "cod": "404"
})
const weatherfetch = () =>{
  let wecontainer = document.querySelector('.weather-container')
  let notfoundcon = document.querySelector(".not-found")
  wecontainer.style.height = "500px"
  const apikey = '652006db3af19c5be21c71b9f74e9b3a'
  const city = location
  const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}` 
  fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    setweather(data)
    if(data.cod === "404"){
     wecontainer.style.display= "none"
     notfoundcon.style.display='flex'
    }
  })
}

const changesrc = ()=>{
  switch(weather.weather[0].main){
    case 'Clear':
      setimages(Clear)
      break;

  case 'Rain':
     setimages(rain)
      break;

  case 'Snow':
      setimages(snow)
      break;

  case 'Clouds':
   setimages(Cloud)
      break;

  case 'Haze':
      setimages(mist)
      break;

  default:
      setimages(Clear)
  }
  
}
useEffect(()=>{
  changesrc()
},[weather])




  return (
    <>
    <div className='weather-container'>
      <div className='search-from'>
        <div className='sr-form'>
        <i class="fa-solid fa-location-dot"></i>
        <input ref={cityref} onChange={(event) => setcity(event.target.value)} type='text' placeholder='Type location'></input>
        <button onClick={weatherfetch}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className='not-found'>
          <img src={e404}/>
          <div className='not-descraption'>
          <p>Your location is not found /:</p>
          </div>
        </div>
        <div className='weather-search'>
          <img src={imagew}/>
          <p class="temperature">
            <h1><span>{weather.main.temp}°C</span></h1>
          </p>
            <p class="description">
              <h2>{weather.weather[0].description}</h2>
            </p>
        </div>
        <div class="weather-details">
            <div class="humidity">
                <i class="fa-solid fa-water"></i>
                <div class="text">
                    <span>{weather.main.humidity}%</span>
                    <p>Humidity</p>
                </div>
            </div>
            <div class="wind">
                <i class="fa-solid fa-wind"></i>
                <div class="text">
                    <span>{weather.wind.speed}km/s</span>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default App