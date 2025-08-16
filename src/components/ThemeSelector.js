import React, { useState } from 'react';
import { themes, getCurrentTheme, setTheme } from '../utils/themes';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [showThemes, setShowThemes] = useState(false);

  const handleThemeChange = (themeKey) => {
    setCurrentTheme(themeKey);
    setTheme(themeKey);
    setShowThemes(false);
    // 페이지 새로고침 없이 즉시 적용
    window.location.reload();
  };

  return (
    <>
      {/* 테마 선택 버튼 */}
      <button
        onClick={() => setShowThemes(!showThemes)}
        className="
          fixed right-16 top-4 z-50 group
          w-8 h-8 rounded-lg
          transition-all duration-200
        "
        title="테마 변경"
      >
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
      </button>

      {/* 테마 선택 메뉴 */}
      {showThemes && (
        <div className="
          fixed right-16 top-14 z-50
          bg-white border border-gray-200 rounded-lg
          min-w-[120px] py-2 px-2
        ">
          <div className="text-xs font-medium text-gray-500 mb-2 px-1">테마</div>
          <div className="grid grid-cols-3 gap-1.5">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`
                  group relative w-6 h-6 rounded-md
                  transition-all duration-200
                  ${currentTheme === key ? 'ring-1 ring-offset-1 ring-primary-400' : ''}
                `}
                title={theme.name}
              >
                <div 
                  className="w-full h-full rounded-md"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.primary[400]}, ${theme.primary[600]})` 
                  }}
                ></div>
                {currentTheme === key && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 클릭 시 테마 메뉴 닫기 */}
      {showThemes && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowThemes(false)}
        />
      )}
    </>
  );
};

export default ThemeSelector;