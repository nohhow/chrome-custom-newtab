import React, { useState } from 'react';
import { 
  detectLanguage, 
  setLanguage, 
  supportedLanguages 
} from '../utils/messages';

const LanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState(detectLanguage());
  const [showLangMenu, setShowLangMenu] = useState(false);

  // 언어 변경 핸들러
  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    setLanguage(langCode);
    setShowLangMenu(false);
  };

  const currentFlag = supportedLanguages.find(lang => lang.code === currentLang)?.flag || '🌐';

  return (
    <>
      {/* 언어 선택 버튼 */}
      <button
        onClick={() => setShowLangMenu(!showLangMenu)}
        className="
          fixed right-4 top-4 z-50 group
          flex items-center space-x-1 px-2 py-1.5 rounded-lg
          bg-white hover:bg-gray-50
          border border-gray-200 hover:border-gray-300
          transition-all duration-200
          text-gray-600 hover:text-gray-900
        "
        title="언어 선택"
      >
        <span className="text-sm">{currentFlag}</span>
        <svg 
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${showLangMenu ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 언어 드롭다운 메뉴 */}
      {showLangMenu && (
        <div className="
          fixed right-4 top-14 z-50
          bg-white border border-gray-200 rounded-lg
          min-w-[160px] py-1
        ">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 text-left
                hover:bg-gray-50 transition-colors duration-150
                ${currentLang === lang.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}
              `}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
              {currentLang === lang.code && (
                <svg className="w-4 h-4 text-primary-600 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 클릭 시 언어 메뉴 닫기 */}
      {showLangMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowLangMenu(false)}
        />
      )}
    </>
  );
};

export default LanguageSelector;