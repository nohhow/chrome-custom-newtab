import React, { useState } from "react";
import favicon from "../image/favicon.png";
import ShortcutModal from "./ShortcutModal/ShortcutModal";

function Shortcut() {
  const [sites, setSites] = useState(["","",""]);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_sites = sites;
    new_sites[index] = value;
    setSites(new_sites);
  }

  const handleClick = (e) => {
    if(!sites[e.target.id]){
      setIndex(e.target.id);
      setModalOpen(true);
    }else{
      window.location.href = sites[e.target.id];
    }
  }
  
  const setSrc = (url) => {
    const regex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    var result_url = url.match(regex);
  
    return result_url+'/favicon.ico';
  }

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">바로 가기</h1>
      <div className="flex justify-between">
        <button className="shortcut-button" onClick={(e)=>handleClick(e)}>
            <img src={sites[0] ? setSrc(sites[0]):favicon} alt="plus-button" id="0" />
        </button>
        <button className="shortcut-button"  onClick={(e)=>handleClick(e)}>
            <img src={sites[1] ? setSrc(sites[1]):favicon} alt="plus-button" id="1"/>
        </button>
        <button className="shortcut-button"  onClick={(e)=>handleClick(e)}>
            <img src={sites[2] ? setSrc(sites[2]):favicon} alt="plus-button" id="2"/>
        </button>
      </div>
      {modalOpen ? (
        <ShortcutModal handleSubmit={handleSubmit} value={value} setValue={setValue} setModalOpen={setModalOpen}/>
      ) : (
        ""
      )}      
    </div>
  );
}

export default Shortcut;
