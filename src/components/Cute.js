import axios from "axios";
import React, { useEffect, useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { detectLanguage, getWidgetName, getCommonText } from "../utils/messages";

function Cute() {
  const currentLang = detectLanguage();
  const cuties = [
    { id:0, type: "cat", url: "https://api.thecatapi.com/v1/images/search" },     //url
    { id:1, type: "dog", url: "https://dog.ceo/api/breeds/image/random" },        //message
    { id:2, type: "pikachu", url: "https://some-random-api.ml/img/pikachu" },     //link
    { id:3, type: "red-panda", url: "https://some-random-api.ml/img/red_panda" }, //link
  ];

  const [meowImage, setMeowImage] = useState("");
  const [cutie, setCutie] = useState(() => {
    const localData = localStorage.getItem("cutie");
    const initialData = JSON.parse(localData);
    return initialData
      ? initialData
      : cuties[0];
  });

  const getMeow = async (param) => {
    const response = await axios.get(param? param.url : cutie.url);
    const resData = response.data;
    setMeowImage(resData.hasOwnProperty("url") ? resData.url : resData.hasOwnProperty("message") ? resData.message : resData.hasOwnProperty("link") ? resData.link : resData[0].url); //property 찾기 (url -> message -> link 순)
  };

  const handleSwitchBtn = (e) => {
    const dir = e.target.id;
    let value = 0;
    if(dir === "left-btn" && cutie.id > 0){value = -1};
    if(dir === "right-btn" && cutie.id < cuties.length-1){value = 1};
    setCutie(cuties[cutie.id+value]);
    localStorage.setItem("cutie", JSON.stringify(cuties[cutie.id+value]));
    getMeow(cuties[cutie.id+value]);
  }

  useEffect(() => {
    getMeow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WidgetWrapper 
      title={getWidgetName("귀여움 충전", currentLang)}
      headerActions={
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-gray-100/50 rounded-lg px-2 py-1">
            <button 
              id="left-btn" 
              onClick={(e)=>handleSwitchBtn(e)}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ◀︎
            </button>
            <span className="mx-2 text-sm font-medium text-gray-700">{cutie.type}</span>
            <button 
              id="right-btn" 
              onClick={(e)=>handleSwitchBtn(e)}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ▶︎
            </button>
          </div>
          <button
            className="
              group px-3 py-1.5 rounded-lg text-sm font-medium
              bg-primary-100/50 hover:bg-primary-200/50 text-primary-700
              transition-all duration-200 ease-out
              hover:scale-105 active:scale-95
            "
            onClick={() => {
              getMeow();
            }}
          >
            {getCommonText("anotherOne", currentLang)}
          </button>
        </div>
      }
    >
      <div className="text-center">
        {meowImage !== "" ? (
          <a href={meowImage} target="_blank" rel="noopener noreferrer">
            <img 
              className="w-full rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md" 
              src={meowImage} 
              alt={getCommonText("cuteAnimal", currentLang)} 
            />
          </a>
        ) : (
          <div role="status" className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
            <span className="text-gray-500">{getCommonText("findingCuteFriend", currentLang)}</span>
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
}

export default Cute;
