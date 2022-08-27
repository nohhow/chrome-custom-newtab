import axios from "axios";
import React, { useEffect, useState } from "react";

function Phrase() {
  const [phrase, setPhrase] = useState("");
  const getPhrase = async () => {
    const response = await axios.get("https://api.adviceslip.com/advice");
    setPhrase(response.data.slip.advice);
  };

  useEffect(() => {
    getPhrase();
  }, []);
  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">명언 한 줄</h1>
      <h4 id="phrase">{phrase}</h4>
    </div>
  );
}

export default Phrase;
