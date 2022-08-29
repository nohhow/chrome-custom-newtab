import React, { useEffect, useState } from "react";
import plus from "../image/plus.png";

function Shortcut() {
  const [sites, setSites] = useState([]);

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">바로 가기</h1>
      <div className="flex justify-between">
        <button className="add-button">
            <img src={plus} alt="plus-button"/>
        </button>
        <button className="add-button">
            <img src={plus} alt="plus-button"/>
        </button>
        <button className="add-button">
            <img src={plus} alt="plus-button"/>
        </button>

      </div>
    </div>
  );
}

export default Shortcut;
