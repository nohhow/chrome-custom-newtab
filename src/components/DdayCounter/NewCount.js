import React, { useState } from "react";
import NewClock from "./NewClock";

function NewCount() {
  const [deadLine, setDeadLine] = useState("July, 08, 2023 00:00:00");
  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">서울 생활 끝</h1>
      <div className="mb-3">
        <mark>{deadLine}</mark>
      </div>
      <NewClock deadline={deadLine} />
    </div>
  );
}

export default NewCount;
