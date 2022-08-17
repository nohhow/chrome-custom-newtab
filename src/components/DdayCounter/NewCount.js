import React, { useState } from "react";
import DatePicker from "react-datepicker";
import NewClock from "./NewClock";
import "react-datepicker/dist/react-datepicker.css";

function NewCount() {
  const [deadLine, setDeadLine] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleSetButtonClick = () => {
    setDeadLine("April, 03, 2024 00:00:00");
  };

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">서울 생활 끝</h1>
      <div className="mb-3">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        <button
          className="p-2 text-white bg-red-200 hover:bg-red-400 shadow-md rounded"
          onClick={handleSetButtonClick}
        >
          SET
        </button>
      </div>
          {deadLine === "" ? (
              <div>
            </div>
          ) : (
              <NewClock deadline={deadLine} />
          )}
    </div>
  );
}

export default NewCount;
