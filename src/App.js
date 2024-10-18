import logo from './logo.svg';
import './App.css';
import {Search, MapPin, Wind} from 'react-feather'
import { getWeather, getWeatherByLocation } from './api/api';
import { useState } from 'react';
import dateFormat from 'dateformat';

function App() {

  const[city, setCity] = useState("");
  const[weather, setWeather] = useState({});

  const getWeatherbyCity = async () =>{
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("")
  }
  // Function to detect user location and fetch weather based on coordinates
  const getWeatherbyLocation = async () => {
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByLocation(latitude, longitude);
          setWeather(weatherData);
          
        },
        (error) => {
          console.error('Error detecting location:', error);
          alert('Location detection failed. Please search by city.');
          
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const renderDate = () =>{
    let cur = new Date();
    return dateFormat(cur, "dddd, mmmm dS, h:MM TT")
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text"  value={city} onChange={(e) => setCity(e.target.value)}
        placeholder='Enter City Name' onKeyDown={(e) => e.key === 'Enter' && getWeatherbyCity()}/>
        <button onClick={()=>getWeatherbyCity()}>
          <Search></Search>
        </button>
        
      </div>
      <div className='d-flex'>
      <button className='btn' onClick={getWeatherbyLocation} >
       Use Current Location <Search style={{paddingLeft:"5px"}}></Search>
      </button>
      </div>   

     {weather && weather.weather ?
      <div className="content">
        <div className="location d-flex">
          <MapPin></MapPin>
          <h2>{weather.name}<span>({weather.sys.country})</span></h2>
          
        </div>
        <p className="datetext">{renderDate()}</p>
        <div className='weatherdesc d-flex flex-c'>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <h3>{weather.weather[0].description}</h3>

        </div>

        <div className="tempstats d-flex flex-c">
          <h1>{weather.main.temp}<span>&deg;C</span></h1>
          <h3>Feels Like {weather.main.feels_like} <span>&deg;C</span></h3>
        </div>

        <div className="windstats d-flex">
          <Wind></Wind>
          <h3>Wind is {weather.wind.speed} Knots in {weather.wind.deg}&deg;</h3>
        </div>
      </div>
      :
      <div className="content">
        <h4>No Data found !</h4>
      </div>}

      

    </div>
  );
}

export default App;
