import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = useCallback(async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=09395898dddd26401f619776727912c9`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [city]); // Only re-create fetchData when 'city' changes.

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <h1>World Wide Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData ? (
        <>
          <h2>{weatherData.name}</h2>
          <div className="weather-main">
            <span className="weather-main-icon">🌧️</span>
            <div className="temperature">{weatherData.main.temp}°C</div>
          </div>
          <p className="description">{weatherData.weather[0].description}</p>
          <div className="weather-details">
            <div className="weather-detail">
              <span>{weatherData.main.feels_like}°C</span>
              Feels Like
            </div>
            <div className="weather-detail">
              <span>{weatherData.wind.speed} m/s</span>
              Wind
            </div>
            <div className="weather-detail">
              <span>{weatherData.main.humidity}%</span>
              Humidity
            </div>
            <div className="weather-detail">
              <span>{weatherData.main.pressure} hPa</span>
              Pressure
            </div>
          </div>
        </>
      ) : (
        <p>Loading Weather data...</p>
      )}
    </div>
  );
};

export default Weather;
