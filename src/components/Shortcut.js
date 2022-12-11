import React, { useState } from "react";
import favicon from "../image/favicon.png";
import bookmarkImg from "../image/bookmark.png";
import ShortcutModal from "./ShortcutModal/ShortcutModal";

function Shortcut() {
  const [sites, setSites] = useState(() => {
    const localData = localStorage.getItem("shortcut-sites");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : ["","",""];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_sites = sites;
    new_sites[index] = value;
    setValue("");
    setSites(new_sites);
    localStorage.setItem("shortcut-sites", JSON.stringify(new_sites));
  }

  const handleEditOpen = (e) => {
    setValue(sites[e.target.id]);
    setIndex(e.target.id);
    setModalOpen(true);
  }

  const handleMouseOver = (e) => {
    const el = e.target;
    el.classList.remove("opacity-0");
    el.classList.add("opacity-100");
  }
  
  const handleMouseOut = (e) => {
    const el = e.target;
    el.classList.remove("opacity-100");
    el.classList.add("opacity-0");
  }

  
  const handleSiteOpen = (e) => {
    window.location.href = sites[e.target.id];
  }
  
  const setSrc = (url) => {
    const regex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
    var result_url = url.match(regex);
    return result_url+'/favicon.ico';
  }

  const handleImgErr = (e) =>{
    e.target.src = bookmarkImg;
  }

  return (
    <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
      <h1 className="mb-3">바로 가기</h1>
      <div className="flex justify-between">
        <div className="shortcut-button relative rounded-xl">
            <button className="absolute opacity-0 right-3 text-xs" onMouseOver={(e)=>handleMouseOver(e)} onMouseOut={(e)=>handleMouseOut(e)} onClick={(e)=>handleEditOpen(e)} id="0">⚙️</button>
            <img className="shortcut-img mx-auto cursor-pointer" onClick={(e)=>handleSiteOpen(e)} src={sites[0] ? setSrc(sites[0]):favicon} onError={handleImgErr} alt="shortcut-button" id="0" />
        </div>
        <div className="shortcut-button relative rounded-xl">
            <button className="absolute opacity-0 right-3 text-xs" onMouseOver={(e)=>handleMouseOver(e)} onMouseOut={(e)=>handleMouseOut(e)} onClick={(e)=>handleEditOpen(e)} id="1">⚙️</button>
            <img className="shortcut-img mx-auto cursor-pointer"  onClick={(e)=>handleSiteOpen(e)} src={sites[1] ? setSrc(sites[1]):favicon} onError={handleImgErr} alt="shortcut-button" id="1" />
        </div>
        <div className="shortcut-button relative rounded-xl">
            <button className="absolute opacity-0 right-3 text-xs" onMouseOver={(e)=>handleMouseOver(e)} onMouseOut={(e)=>handleMouseOut(e)} onClick={(e)=>handleEditOpen(e)} id="2">⚙️</button>
            <img className="shortcut-img mx-auto cursor-pointer" onClick={(e)=>handleSiteOpen(e)} src={sites[2] ? setSrc(sites[2]):favicon} onError={handleImgErr} alt="shortcut-button" id="2" />
        </div>
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
