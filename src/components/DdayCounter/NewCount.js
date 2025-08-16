import React, { useState } from "react";
import DatePicker from "react-datepicker";
import NewClock from "./NewClock";
import WidgetWrapper from "../WidgetWrapper";
import "react-datepicker/dist/react-datepicker.css";

function NewCount() {
  const [deadLine, setDeadLine] = useState(() => {
    const localData = localStorage.getItem("deadLine");
    const initialData = localData;
    return initialData ? initialData : "";
  });
  const [ddayTitle, setDdayTitle] = useState(() => {
    const localData = localStorage.getItem("ddayTitle");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : "";
  });
  
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(()=>{
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeadLine(startDate);
    setDdayTitle(value);
    localStorage.setItem("deadLine", startDate);
    localStorage.setItem("ddayTitle", JSON.stringify(value));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = () => {
    setDeadLine(""); 
    setDdayTitle(""); 
    setValue(""); // DDAYTITLE INPUT VALUE
    localStorage.removeItem("deadLine");
    localStorage.removeItem("ddayTitle");
  };

  return (
    <WidgetWrapper 
      title={ddayTitle || "D-Day"}
      className="overflow-visible"
      headerActions={
        deadLine && (
          <button
            className="
              group p-2 rounded-lg 
              bg-gray-100/50 hover:bg-gray-200/50 
              transition-all duration-200 ease-out
              hover:scale-110 active:scale-95
            "
            onClick={handleDelete}
          >
            <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        )
      }
    >
      {deadLine === "" ? (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="inline-block relative">
              <DatePicker
                selected={startDate}
                dateFormat={"yyyy-MM-dd"}
                placeholderText={"D-DAY 날짜 선택"}
                onChange={(date) => setStartDate(date)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-colors duration-200 text-center w-full"
                withPortal
                portalId="react-datepicker-portal"
              />
            </div>
            <p className="text-sm text-gray-500">👆 D-day로 설정할 날짜를 선택하세요</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="dday"
              className="w-full px-3 py-2 text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-colors duration-200"
              placeholder="D-day는 어떤 날인가요?"
              value={value}
              onChange={handleChange}
            />
            <button
              className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-200 font-medium"
              type="submit"
            >
              D-Day 설정
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-lg font-medium text-gray-700">
            {new Intl.DateTimeFormat("ko").format(new Date(deadLine))}
          </div>
          <NewClock deadline={deadLine} />
        </div>
      )}
    </WidgetWrapper>
  );
}

export default NewCount;
