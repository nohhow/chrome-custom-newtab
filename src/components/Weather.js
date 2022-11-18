import React, { useEffect, useState } from "react";
import axios from "axios";
import cityList from "../util/city.list.json"

function Weather() {
  const [weatherData, setWeatherData] = useState();
  const [cityData, setCityData] = useState([]);
  const [display, setDisplay] = useState(true);

  const getWeatherData = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    setWeatherData(response.data);
  };
  
  const handleDelete = () => {
    setDisplay(display ? false : true);  
  }
  
  const getLoc = async () =>{
    const city = cityList.filter(data => data.country === "KR")
    console.log(city);
    setCityData(city);
  };

  useEffect(() => {
    getWeatherData();
    getLoc();
  }, []);


  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-2">
        <h1 className="mb-3">지금 서울 날씨</h1>
        <button hidden={display}>도시 입력</button>
        <button className="p-2 text-white bg-red-200 hover:bg-red-400 shadow-md rounded" onClick={handleDelete}>
          X
        </button>
      </div>
      <p>{weatherData ? weatherData.weather[0].main : "Loading..."}, <span className="text-xl">{weatherData ? Math.floor(weatherData.main.temp - 273.15) : 0}°C</span></p>
    </div>
  );
}

export default Weather;
