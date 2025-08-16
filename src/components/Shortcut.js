import React, { useState } from "react";
import favicon from "../image/favicon.png";
import bookmarkImg from "../image/bookmark.png";
import ShortcutModal from "./ShortcutModal/ShortcutModal";
import WidgetWrapper from "./WidgetWrapper";
import { detectLanguage, getWidgetName } from "../utils/messages";

function Shortcut() {
  const currentLang = detectLanguage();
  const [sites, setSites] = useState(() => {
    const localData = localStorage.getItem("shortcut-sites");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : ["","",""];
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [index, setIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === null) return;
    const new_sites = [...sites]; // 새 배열 생성
    new_sites[index] = value;
    setSites(new_sites);
    localStorage.setItem("shortcut-sites", JSON.stringify(new_sites));
    setValue("");
    setIndex(null);
    setModalOpen(false); // 모달 닫기
  }

  const handleEditOpen = (e, targetIndex) => {
    setValue(sites[targetIndex] || "");
    setIndex(targetIndex);
    setModalOpen(true);
  }


  
  const handleSiteOpen = (e, targetIndex) => {
    e.preventDefault();
    if (sites[targetIndex] && sites[targetIndex] !== "") {
      window.open(sites[targetIndex], '_blank');
    }
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
    <>
      <WidgetWrapper title={getWidgetName("바로가기", currentLang)}>
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="group relative flex justify-center">
              <div className="
                relative overflow-hidden rounded-lg border border-gray-200 
                bg-gray-50/50 hover:bg-primary-50/50 hover:border-primary-200/50
                w-16 h-16 flex items-center justify-center
                transition-all duration-200 ease-out
                hover:scale-105 cursor-pointer
              " onClick={(e) => handleSiteOpen(e, index)}>
                <button 
                  className="
                    absolute top-1 right-1 w-5 h-5 rounded-full
                    bg-white/80 hover:bg-white flex items-center justify-center
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200
                    z-10
                  " 
                  onClick={(e) => {e.stopPropagation(); handleEditOpen(e, index);}} 
                  data-index={index}
                >
                  <svg className="w-2.5 h-2.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <img 
                  className="w-8 h-8 object-contain" 
                  src={sites[index] ? setSrc(sites[index]) : favicon} 
                  onError={handleImgErr} 
                  alt="shortcut" 
                  id={index.toString()}
                />
              </div>
            </div>
          ))}
        </div>
      </WidgetWrapper>
      
      {/* Modal을 WidgetWrapper 밖으로 이동 */}
      {modalOpen && (
        <ShortcutModal 
          handleSubmit={handleSubmit} 
          value={value} 
          setValue={setValue} 
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}

export default Shortcut;
