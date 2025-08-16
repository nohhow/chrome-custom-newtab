/*global chrome*/
import React, { useEffect, useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { detectLanguage, getWidgetName } from "../utils/messages";

function TopSite() {
  const currentLang = detectLanguage();
  const [sites, setSites] = useState([]);

  useEffect(() => {
    // Chrome Extension API 체크
    if (typeof chrome !== 'undefined' && chrome.topSites) {
      chrome.topSites.get((data) => {
        setSites(data);
      });
    } else {
      // 개발 환경에서는 더미 데이터 사용
      setSites([
        { title: "Google", url: "https://google.com" },
        { title: "YouTube", url: "https://youtube.com" },
        { title: "GitHub", url: "https://github.com" },
        { title: "Stack Overflow", url: "https://stackoverflow.com" },
        { title: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { title: "Vercel", url: "https://vercel.com" }
      ]);
    }
  }, []);

  return (
    <WidgetWrapper title={getWidgetName("자주 방문한 사이트", currentLang)}>
      <div className="grid grid-cols-2 gap-3">
        {sites.map((data, index) => {
          // URL에서 favicon 생성
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(data.url).hostname}&sz=32`;
          
          return (
            <a 
              key={index}
              href={data.url}
              className="
                group relative block p-3 rounded-lg 
                bg-white border border-gray-200
                hover:bg-gray-50 hover:border-gray-300
                transition-all duration-200
              "
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Favicon */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img 
                    src={faviconUrl} 
                    alt={`${data.title} favicon`}
                    className="w-6 h-6 rounded-md"
                    onError={(e) => {
                      // Favicon 로드 실패시 기본 아이콘 표시
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback 아이콘 */}
                  <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-md flex items-center justify-center text-white text-xs font-bold hidden">
                    {data.title.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                {/* 사이트 제목 */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">
                    {data.title}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {new URL(data.url).hostname}
                  </div>
                </div>
              </div>
              
            </a>
          );
        })}
      </div>
    </WidgetWrapper>
  );
}

export default TopSite;
