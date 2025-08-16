import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

function Youtube() {
  const [youtubeUrl, setYoutubeUrl] = useState(() => {
    const localData = localStorage.getItem("youtubeUrl");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : "";
  });

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://www.youtube.com/embed/"+value.slice(-11);
    setYoutubeUrl(url);
    localStorage.setItem("youtubeUrl", JSON.stringify(url));
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = () => {
    setYoutubeUrl("");
    setValue("");
    localStorage.removeItem("youtubeUrl");
  };

  return (
    <WidgetWrapper 
      title="유튜브"
      headerActions={
        youtubeUrl && (
          <button 
            className="
              group px-3 py-1.5 rounded-lg text-sm font-medium
              bg-red-100/50 hover:bg-red-200/50 text-red-700
              transition-all duration-200 ease-out
              hover:scale-105 active:scale-95
            " 
            onClick={handleDelete}
          >
            제거
          </button>
        )
      }
    >
      {youtubeUrl === "" ? (
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="value"
              className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-colors duration-200"
              placeholder="YouTube URL을 입력하세요..."
              value={value}
              onChange={handleChange}
            />
            <button
              className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium"
              type="submit"
            >
              영상 로드
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center">저작권 문제로 일부 영상이 재생되지 않을 수 있습니다.</p>
        </div>
      ) : (
        <div className="relative w-full" style={{paddingBottom: '56.25%', height: 0}}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={youtubeUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </WidgetWrapper>
  );
}

export default Youtube;
