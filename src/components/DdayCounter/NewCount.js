import React, { useState } from "react";
import DatePicker from "react-datepicker";
import NewClock from "./NewClock";
import "react-datepicker/dist/react-datepicker.css";

function NewCount() {
  const [deadLine, setDeadLine] = useState(() => {
    const localData = localStorage.getItem("deadLine");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : "";
  });
  const [ddayTitle, setDdayTitle] = useState(() => {
    const localData = localStorage.getItem("ddayTitle");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : "";
  });
  
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    let offset = startDate.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
    setDeadLine(new Date(startDate.getTime() - offset));
    setDdayTitle(value);
    localStorage.setItem("deadLine", JSON.stringify(startDate));
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
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <div className="flex justify-between mb-2">
        <h1 className="mb-3">{ddayTitle}</h1>
        <button
          className="p-2 text-white bg-gray-200 hover:bg-gray-400 shadow-md rounded"
          onClick={handleDelete} visible={deadLine !== "" ? true : false}
        >
        ⚙️
        </button>
      </div>

      {deadLine === "" ? (
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
          <form onSubmit={handleSubmit} className="flex pt-2">
            <input
              type="text"
              name="value"
              className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
              placeholder="D-day는 어떤 날인가요?"
              value={value}
              onChange={handleChange}
            />
            <input
              className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
              type="submit"
              value="설정"
            />
          </form>
        </div>
      ) : (
        <div>
          <div className="mb-3">{deadLine}</div>
          <NewClock deadline={deadLine} />
        </div>
      )}
    </div>
  );
}

export default NewCount;
