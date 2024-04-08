import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '48358c33cd1f4c9f9f931c9cb8858572'; // Replace with your OpenWeatherMap API key

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch((error) => {
        setWeatherData(null);
        setError('City not found. Please try again.');
      });
  };

  return (
    <div className="weather">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weatherData && (





        <div className="bottom">
          <div className="bottom-item">
            <h2>{weatherData.main.temp} °C</h2>
            <p>Feels Like</p>
          </div>
          <div className="bottom-item">
            <h2>{weatherData.main.humidity}%</h2>
            <p>Humidity</p>
          </div>
          <div className="bottom-item">
            <h2>{weatherData.wind.speed} m/s</h2>
            <p>Wind Speed</p>
          </div>
          <div className="bottom-item">
            <h2>{weatherData.weather[0].description}</h2>
            <p>Description</p>
          </div>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Weather;
