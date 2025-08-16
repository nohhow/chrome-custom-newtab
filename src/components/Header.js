import React, { useState, useEffect } from 'react';
import { detectLanguage, getRandomEncouragement } from '../utils/messages';

const Header = () => {
  const [currentLang] = useState(detectLanguage());
  const [randomMessage, setRandomMessage] = useState('');

  // 컴포넌트 마운트 시 랜덤 메시지 설정
  useEffect(() => {
    setRandomMessage(getRandomEncouragement(currentLang));
  }, [currentLang]);

  // 메시지 새로고침 (현재 사용하지 않음)
  // const refreshMessage = () => {
  //   setRandomMessage(getRandomEncouragement(currentLang));
  // };

  return (
    <div className="relative z-10 pt-20 pb-8">
      <div className="text-center">
        {/* 랜덤 메시지 타이틀 */}
        <div className="flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-800 tracking-tight leading-tight">
            {randomMessage}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;