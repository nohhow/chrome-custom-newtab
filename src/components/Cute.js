import axios from "axios";
import React, { useEffect, useState } from "react";

function Cute() {
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
  }, []);

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-2">
        <h1 className="mb-3">귀여움 충전</h1>
        <div className="text-sm m-auto">
          <button id="left-btn" onClick={(e)=>handleSwitchBtn(e)}>◀︎</button>
          <span> {cutie.type} </span>
          <button id="right-btn" onClick={(e)=>handleSwitchBtn(e)}>▶︎</button>
        </div>
        <button
          className="p-2 text-white bg-gray-200 hover:bg-gray-400 shadow-md rounded"
          onClick={() => {
            getMeow();
          }}
        >
          다른거!
        </button>
      </div>
      <div>
        {meowImage !== "" ? (
          <a href={meowImage}>
            <img className="rounded" src={meowImage} alt="고양이" />
          </a>
        ) : (
          <div role="status" className="text-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cute;
