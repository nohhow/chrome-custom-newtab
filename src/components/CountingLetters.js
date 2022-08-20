import React, { useState } from "react";

function CountingLetters() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getWithoutSpace = () =>{
    let lines = value.replace(/(\s*)/g, "");
    return lines.length;
  }

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-3 items-center">
        <h1>글자수 세기</h1>
      </div>
      <textarea
        name="value"
        rows="5"
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        placeholder="text를 입력하세요."
        value={value}
        onChange={handleChange}
      />
      <p>공백 포함 : {value.length}</p>
      <p>공백 제외 : {getWithoutSpace()}</p>
    </div>
  );
}

export default CountingLetters;
