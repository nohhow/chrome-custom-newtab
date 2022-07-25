import React, { useEffect, useState } from "react";
import axios from "axios";

function Weather() {
  const [weatherData, setWeatherData] = useState();
  const getWeatherData = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    setWeatherData(response.data);
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">지금 서울 날씨</h1>
      <p>{weatherData ? weatherData.weather[0].main : "Loading..."}, {weatherData ? Math.floor(weatherData.main.temp - 273.15) : 0}°C</p>
    </div>
  );
}

export default Weather;
