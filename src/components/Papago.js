import axios from "axios";
import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

function Phrase() {
  const [fromText, setFromText] = useState("");
  const [result, setResult] = useState("");

  const callTranslate = async () => {
    const response = await axios.post("https://my-papago.fly.dev/translate", {
      text: fromText,
    });
    setResult(response.data);
  };

  const handleChange = (e) => {
    setFromText(e.target.value);
  };

  return (
    <WidgetWrapper 
      title="Papago 번역"
      headerActions={
        <button
          className="
            group px-3 py-1.5 rounded-lg text-sm font-medium
            bg-primary-100/50 hover:bg-primary-200/50 text-primary-700
            transition-all duration-200 ease-out
            hover:scale-105 active:scale-95
          "
          onClick={callTranslate}
        >
          번역
        </button>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">입력</label>
          <textarea
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-colors duration-200"
            defaultValue={fromText}
            rows="3"
            placeholder="번역할 텍스트를 입력하세요..."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">결과</label>
          <div className="p-3 border border-gray-200 rounded-lg bg-gray-50/50 min-h-[80px] text-gray-700">
            {result || "번역 결과가 여기에 표시됩니다."}
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default Phrase;
