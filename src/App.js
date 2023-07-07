import React, {  useEffect, useRef, useState } from 'react'
import './App.css'
import e404 from './images/404.png'
import Clear from "./images/clear.png"
import Cloud from "./images/cloud.png"
import mist from "./images/mist.png"
import rain from "./images/rain.png"
import snow from "./images/snow.png"

const App = () => {
  const [imagew, setImages] = useState();
  const cityRef = useRef();
  const [location, setCity] = useState();
  const [weather, setWeather] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const weatherFetch = () => {
    let weContainer = document.querySelector('.weather-container');
    weContainer.style.height = '500px';
    const apiKey = '652006db3af19c5be21c71b9f74e9b3a';
    const city = location;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
          
        } else {
          setNotFound(false);
          return response.json();
        }
      })
      .then((data) => {
        if (!notFound) {
          setWeather(data);
        }
      })
  };

  const changeSrc = () => {
    if (weather) {
      switch (weather.weather[0].main) {
        case 'Clear':
          setImages(Clear);
          break;
        case 'Rain':
          setImages(rain);
          break;
        case 'Snow':
          setImages(snow);
          break;
        case 'Clouds':
          setImages(Cloud);
          break;
        case 'Haze':
          setImages(mist);
          break;
        default:
          setImages(Clear);
          break;
      }
    }
  };

  return (
    <>
      <div className="weather-container">
        <div className="search-from">
          <div className="sr-form">
            <i className="fa-solid fa-location-dot"></i>
            <input
              ref={cityRef}
              onChange={(event) => setCity(event.target.value)}
              type="text"
              placeholder="Type location"
            />
            <button onClick={weatherFetch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {notFound && (
            <div className="not-found">
              <img src={e404} alt="404 Error" />
              <div className="not-description">
                <p>Location not found</p>
              </div>
            </div>
          )}
          {weather && !notFound && (
            <div className="weather-search">
              <img src={imagew} alt="Weather" />
              <p className="temperature">
                <h1>
                  <span>{weather.main.temp}°C</span>
                </h1>
              </p>
              <p className="description">
                <h2>{weather.weather[0].description}</h2>
              </p>
            </div>
          )}
          {weather && !notFound && (
            <div className="weather-details">
              <div className="humidity">
                <i className="fa-solid fa-water"></i>
                <div className="text">
                  <span>{weather.main.humidity}%</span>
                  <p>Humidity</p>
                </div>
              </div>
              {weather && (
                <div className="wind">
                  <i className="fa-solid fa-wind"></i>
                  <div className="text">
                    <span>{weather.wind.speed}km/s</span>
                    <p>Wind Speed</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
