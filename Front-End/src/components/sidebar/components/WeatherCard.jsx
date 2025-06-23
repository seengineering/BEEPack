import React, { useState, useEffect, useRef } from 'react';

const WeatherWidget = ({ lat, lon, api_key = "e21f2b6fce3340dc9ba143227252805" }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState();
  const [showForecast, setShowForecast] = useState(false);
  const containerRef = useRef(null);

  // Get location name
  useEffect(() => {
    console.log("weatherCard");
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/admin/getHiveLocation?latitude=${lat}&longitude=${lon}`
        );
        const locationData = await response.json();
        setWeatherLocation(locationData.city);
      } catch(err) {
        console.log(err);
      }
    };

    if (lat && lon) fetchLocation();
  }, [lat, lon]);

  // Get weather data
  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lon) return;

      try {
        setLoading(true);
        setError(null);
        const query = `${lat},${lon}`;
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${query}&days=2`
        );
        const data = await response.json();
        
        setWeather({
          ...data.current,
          // Add chance of rain from forecast for current day
          chance_of_rain: data.forecast.forecastday[0]?.day?.daily_chance_of_rain || 0
        });
        setForecast(data.forecast.forecastday[1]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lat, lon, api_key]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching weather</div>;
  if (!weather) return <div>No weather data available</div>;

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '240px',
        height: '200px',
        overflow: 'hidden',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer'
      }} 
      ref={containerRef}
      onClick={() => setShowForecast(!showForecast)}
    >
      {/* Current Weather */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: showForecast ? '-100%' : '0',
          transition: 'left 0.5s ease-in-out',
          padding: '15px',
          boxSizing: 'border-box'
        }}
      >
        <h3 style={{ marginTop: 0 }}>Current Weather in {weatherLocation || "Loading location..."}</h3>
        <p>🌡️ Temp: {weather.temp_c}°C</p>
        <p>🌤️ Condition: {weather.condition.text}</p>
        <p>💧 Humidity: {weather.humidity}%</p>
        <p>💨 Wind: {weather.wind_kph} km/h</p>
        <p>☔ Rain: {weather.chance_of_rain}% chance</p>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '12px',
          color: '#666'
        }}>
          Click to see tomorrow →
        </div>
      </div>

      {/* Tomorrow's Forecast */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: showForecast ? '0' : '100%',
          transition: 'left 0.5s ease-in-out',
          padding: '15px',
          boxSizing: 'border-box',
          backgroundColor: '#e9f7ef'
        }}
      >
        <h3 style={{ marginTop: 0 }}>Tomorrow in {weatherLocation || "Loading location..."}</h3>
        <p>🌡️ Max: {forecast?.day.maxtemp_c}°C / Min: {forecast?.day.mintemp_c}°C</p>
        <p>🌤️ Condition: {forecast?.day.condition.text}</p>
        <p>💧 Humidity: {forecast?.day.avghumidity}%</p>
        <p>💨 Wind: {forecast?.day.maxwind_kph} km/h</p>
        <p>☔ Rain: {forecast?.day.daily_chance_of_rain}% chance</p>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          fontSize: '12px',
          color: '#666'
        }}>
          ← Click to go back
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;