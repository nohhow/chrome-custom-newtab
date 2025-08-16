import axios from "axios";
import React, { useEffect, useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { detectLanguage, getWidgetName } from "../utils/messages";

function Phrase() {
  const currentLang = detectLanguage();
  const [phrase, setPhrase] = useState("");
  const getPhrase = async () => {
    try {
      // ZenQuotes API 사용 (HTTPS 안정적)
      const response = await axios.get("https://zenquotes.io/api/random");
      const quote = response.data[0];
      setPhrase(`"${quote.q}" - ${quote.a}`);
    } catch (error) {
      console.error('Quote API error:', error);
      // 백업으로 원래 API 사용
      try {
        const response = await axios.get("https://api.adviceslip.com/advice");
        setPhrase(response.data.slip.advice);
      } catch (backupError) {
        console.error('Backup API error:', backupError);
        setPhrase("오늘도 좋은 하루 되세요!");
      }
    }
  };

  useEffect(() => {
    getPhrase();
  }, []);
  return (
    <WidgetWrapper 
      title={getWidgetName("명언", currentLang)}
      headerActions={
        <button
          className="
            group p-2 rounded-lg 
            bg-primary-100/50 hover:bg-primary-200/50 
            transition-all duration-200 ease-out
            hover:scale-110 active:scale-95
          "
          onClick={getPhrase}
        >
          <svg className="w-4 h-4 text-primary-600 group-hover:text-primary-700 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      }
    >
      <div className="text-center py-4">
        <p id="phrase" className="text-lg leading-relaxed text-gray-700 italic">
          {phrase || "새로운 명언을 불러오는 중..."}
        </p>
      </div>
    </WidgetWrapper>
  );
}

export default Phrase;
