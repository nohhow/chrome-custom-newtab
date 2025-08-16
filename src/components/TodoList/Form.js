import React from "react";
import { getCommonText } from "../../utils/messages";

export default function Form({ value, setValue, handleSubmit, currentLang }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex pt-2">
        <input
          type="text"
          name="value"
          className="w-5/6 px-3 py-2 mr-2 text-gray-500 border rounded shadow"
          placeholder={getCommonText("todoPlaceholder", currentLang)}
          value={value}
          onChange={handleChange}
        />
        <button
          className="w-1/6 p-1 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          type="submit"
        >
          {getCommonText("add", currentLang)}
        </button>
      </form>
    </div>
  );
}
