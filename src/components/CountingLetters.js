import React, { useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { detectLanguage, getWidgetName, getCommonText } from "../utils/messages";

function CountingLetters() {
  const currentLang = detectLanguage();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const getWithoutSpace = () =>{
    let lines = value.replace(/(\s*)/g, "");
    return lines.length;
  }

  return (
    <WidgetWrapper title={getWidgetName("글자수 세기", currentLang)}>
      <div className="space-y-4">
        <textarea
          name="value"
          rows="4"
          className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-colors duration-200 resize-none"
          placeholder={getCommonText("letterCountPlaceholder", currentLang)}
          value={value}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-xl p-4 border border-primary-200/30">
            <div className="text-3xl font-bold text-primary-600 mb-1">{value.length}</div>
            <div className="text-sm font-medium text-primary-700">{getCommonText("withSpaces", currentLang)}</div>
          </div>
          <div className="text-center bg-gradient-to-br from-secondary-50 to-secondary-100/50 rounded-xl p-4 border border-secondary-200/30">
            <div className="text-3xl font-bold text-secondary-600 mb-1">{getWithoutSpace()}</div>
            <div className="text-sm font-medium text-secondary-700">{getCommonText("withoutSpaces", currentLang)}</div>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default CountingLetters;
