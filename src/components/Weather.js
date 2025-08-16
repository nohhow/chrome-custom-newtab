import React, { useEffect, useState } from "react";
import axios from "axios";
import cityList from "../util/city.list.json";
import WidgetWrapper from "./WidgetWrapper";
import { detectLanguage, getWidgetName, getCommonText } from "../utils/messages";

function Weather() {
  const currentLang = detectLanguage();
  const [cityName, setCityName] = useState();
  const [weatherData, setWeatherData] = useState();
  const [airPollutionData, setAirPollutionData] = useState();
  const [cityData, setCityData] = useState([]);
  const [showCitySelector, setShowCitySelector] = useState(false);

  const getWeatherData = async (city) => {
    if (city === "") return;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    setWeatherData(response.data);
    getAirPollutionData(response.data.coord);
  };

  const getAirPollutionData = async (coord) => {
    if (!coord) return;
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.REACT_APP_WEATHER_API}`
    );
    setAirPollutionData(response.data.list[0]);
  };

  const loadCities = async () => {
    const cities = await cityList.filter((data) => data.country === "KR");
    setCityData(cities);
  };

  const getWeatherIconSrc = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const getMsgOrColor = (aqi, type) => {
    let msg = getCommonText("loading", currentLang);
    let color = "bg-gray-700";

    switch (aqi) {
      case 1:
        msg = getCommonText("veryGood", currentLang)
        color = "bg-blue-800"
        break;
      case 2:
        msg = getCommonText("good", currentLang)
        color = "bg-green-900"
        break;
      case 3:
        msg = getCommonText("moderate", currentLang)
        color = "bg-gray-500"
        break;
      case 4:
        msg = getCommonText("bad", currentLang)
        color = "bg-yellow-900"
        break;
      case 5:
        msg = getCommonText("veryBad", currentLang)
        color = "bg-red-900"
        break;
      default:
        break;
    }
    if(type === "msg"){
      return msg;
    }else if(type === "color"){
      return color;
    }
  }

  useEffect(() => {
    // 도시 목록 로드
    loadCities();
    
    // 저장된 도시 정보 불러오기
    const localData = localStorage.getItem("cityName");
    const initialData = JSON.parse(localData);
    if (initialData) {
      setCityName(initialData);
      getWeatherData(initialData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WidgetWrapper 
        title={
          <div className="flex items-center">
            <span>{getWidgetName("날씨", currentLang)}</span>
            {cityName && (
              <>
                <span className="mx-2 text-gray-400">·</span>
                <button
                  onClick={() => setShowCitySelector(true)}
                  className="
                    text-primary-600 hover:text-primary-700 underline decoration-dotted
                    underline-offset-2 hover:underline-offset-4
                    transition-all duration-200
                  "
                  title={getCommonText("changeRegion", currentLang)}
                >
                  {cityName}
                </button>
              </>
            )}
          </div>
        }
      >
        {weatherData ? (
          <div className="space-y-3">
            {/* Main Weather Display */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={getWeatherIconSrc(weatherData.weather[0].icon)}
                    alt={weatherData.weather[0].main}
                    className="w-16 h-16 drop-shadow-lg"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600 capitalize mb-1">
                    {weatherData.weather[0].description}
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {Math.floor(weatherData.main.temp - 273.15)}°C
                  </div>
                </div>
              </div>
              
              {/* Air Quality Badge - moved to right */}
              {airPollutionData && (
                <div className={`
                  px-2 py-1 rounded-lg text-xs font-medium text-white
                  flex items-center space-x-1
                  ${getMsgOrColor(airPollutionData.main.aqi, "color")}
                  shadow-sm
                `}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{getCommonText("airQuality", currentLang)} {getMsgOrColor(airPollutionData.main.aqi, "msg")}</span>
                </div>
              )}
            </div>

            {/* Weather Details - moved to bottom in same row */}
            <div className="flex justify-between items-center text-sm text-gray-500 bg-gray-50/50 rounded-lg p-2">
              <span>{getCommonText("feelsLike", currentLang)} {Math.floor(weatherData.main.feels_like - 273.15)}°C</span>
              <span>{getCommonText("humidity", currentLang)} {weatherData.main.humidity}%</span>
            </div>
            
            {/* City Selector - 지역명 클릭 시에만 표시 */}
            {showCitySelector && (
              <div className="border-t border-gray-100 pt-3">
                <select
                  value={cityName || ""}
                  onChange={(e) => {
                    const selectedCity = e.target.value;
                    if (selectedCity) {
                      setCityName(selectedCity);
                      localStorage.setItem("cityName", JSON.stringify(selectedCity));
                      getWeatherData(selectedCity);
                      setShowCitySelector(false);
                    }
                  }}
                  onBlur={() => setShowCitySelector(false)}
                  autoFocus
                  className="
                    w-full px-3 py-2 text-sm rounded-lg border border-gray-200 
                    bg-white hover:border-gray-300 focus:border-primary-400 
                    focus:outline-none focus:ring-1 focus:ring-primary-200
                    transition-colors duration-200
                  "
                >
                  <option value="">{getCommonText("selectRegion", currentLang)}</option>
                  {cityData.map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
              <div className="text-center space-y-2">
                {cityName ? (
                  <>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="text-sm text-gray-500">{getCommonText("loadingWeather", currentLang)}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">{getCommonText("selectRegionForWeather", currentLang)}</p>
                )}
              </div>
            </div>
            
            {/* City Selection - 초기 상태에서만 표시 */}
            {!cityName && (
              <div className="border-t border-gray-100 pt-3">
                <select
                  value=""
                  onChange={(e) => {
                    const selectedCity = e.target.value;
                    if (selectedCity) {
                      setCityName(selectedCity);
                      localStorage.setItem("cityName", JSON.stringify(selectedCity));
                      getWeatherData(selectedCity);
                    }
                  }}
                  className="
                    w-full px-3 py-2 text-sm rounded-lg border border-gray-200 
                    bg-white hover:border-gray-300 focus:border-primary-400 
                    focus:outline-none focus:ring-1 focus:ring-primary-200
                    transition-colors duration-200
                  "
                >
                  <option value="">{getCommonText("selectRegion", currentLang)}</option>
                  {cityData.map((city, index) => (
                    <option key={index} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </WidgetWrapper>

    </>
  );
}

export default Weather;
