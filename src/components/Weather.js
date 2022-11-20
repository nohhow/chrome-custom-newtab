import React, { useEffect, useState } from "react";
import axios from "axios";
import cityList from "../util/city.list.json";

function Weather() {
  const [cityName, setCityName] = useState();
  const [weatherData, setWeatherData] = useState();
  const [cityData, setCityData] = useState([]);
  const [display, setDisplay] = useState(true);

  const getWeatherData = async (city) => {
    if(city === "") return;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    setWeatherData(response.data);
  };

  const modalOpen = () => {
    setDisplay(display ? false : true);
    getLoc();
  };

  const modalClose = () => {
    setDisplay(display ? false : true);
  };

  const getLoc = async () => {
    const city = await cityList.filter((data) => data.country === "KR");
    setCityData(city);
  };

  const handleCityBtnClick = (e) => {
    const clickedCityName = e.target.innerText;
    setCityName(clickedCityName);
    localStorage.setItem("cityName", JSON.stringify(clickedCityName));
    getWeatherData(clickedCityName);
    modalClose();
  };

  useEffect(() => {
    const localData = localStorage.getItem("cityName");
    const initialData = JSON.parse(localData);
    setCityName(initialData ? initialData : "");

    getWeatherData(initialData);
  }, []);

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-2">
        <h1 className="mb-3">지금 {cityName} 날씨</h1>
        <button
          className="p-2 text-white bg-gray-200 hover:bg-gray-400 shadow-md rounded"
          onClick={modalOpen}
        >
          ⚙️
        </button>
      </div>
      <p>
        {weatherData ? weatherData.weather[0].main : "Loading..."},{" "}
        <span className="text-xl">
          {weatherData ? Math.floor(weatherData.main.temp - 273.15) : 0}°C
        </span>
      </p>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          display ? "hidden" : ""
        } overflow-y-auto overflow-x-hidden fixed z-50 p-4 w-full inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                도시 선택
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={modalClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[30rem] overflow-auto">
              <p className="leading-relaxed text-gray-300">
                {cityData.map((data, index) => {
                  return (
                    <button
                      className="p-3 cursor-pointer hover:bg-black rounded"
                      key={index}
                      onClick={handleCityBtnClick}
                    >
                      {data.name}
                    </button>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
