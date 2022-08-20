import React, { useState } from "react";

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
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-2">
        <h1 className="mb-3">유튜브</h1>
        <button className="p-2 text-white bg-red-200 hover:bg-red-400 shadow-md rounded" onClick={handleDelete}>
          X
        </button>
      </div>
      {youtubeUrl === "" ? (
        <div>
          <form onSubmit={handleSubmit} className="flex pt-2">
            <input
              type="text"
              name="value"
              className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
              placeholder="youtube url을 입력하세요."
              value={value}
              onChange={handleChange}
            />
            <input
              className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
              type="submit"
              value="입력"
            />
          </form>
          <br/>
          <p className="text-gray-500">저작권 문제로 영상이 재생되지 않을 수 있습니다.</p>
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={youtubeUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
}

export default Youtube;
