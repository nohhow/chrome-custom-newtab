import "./App.css";
import Weather from "./components/Weather";
import Cute from "./components/Cute";
import GitContributionGraph from "./components/GitContributionGraph";
import Youtube from "./components/Youtube";
import TopSite from "./components/TopSite";
import Todo from "./components/TodoList/Todo";
import NewCount from "./components/DdayCounter/NewCount";
import CountingLetters from "./components/CountingLetters";
import Phrase from "./components/Phrase";
import Papago from "./components/Papago";
import Shortcut from "./components/Shortcut";
import SimpleWidgetGrid from "./components/SimpleWidgetGrid";
import Header from "./components/Header";
import LanguageSelector from "./components/LanguageSelector";
import ThemeSelector from "./components/ThemeSelector";
import { initTheme } from "./utils/themes";
import { detectLanguage, getCommonText, getWidgetName } from "./utils/messages";
import React, { useState, useEffect } from "react";

function App() {
  const [currentLang] = useState(detectLanguage());
  const [visible, setVisible] = useState(() => {
    const localData = localStorage.getItem("visible");
    const widgetList = {
      "날씨": true,
      "Git 기여 그래프": true,
      "D-Day": true,
      "할 일": true,
      "명언": true,
      "귀여움 충전": true,
      "유튜브": true,
      "자주 방문한 사이트": true,
      "바로가기": true,
      "글자수 세기": true,
      "파파고": true,
    }
    
    try {
      const initialData = JSON.parse(localData);
      // 기존 데이터와 새로운 위젯 리스트 키가 일치하는지 확인
      if (initialData && 
          JSON.stringify(Object.keys(initialData).sort()) === JSON.stringify(Object.keys(widgetList).sort())) {
        return initialData;
      }
    } catch (error) {
      console.log('기존 visible 데이터 파싱 실패, 기본값 사용:', error);
    }
    
    // 기존 데이터가 없거나 호환되지 않으면 기본값 사용
    return widgetList;
  });

  // 컬럼별 위젯 배치 구조
  const [columnLayout, setColumnLayout] = useState(() => {
    const localLayout = localStorage.getItem("columnLayout");
    
    // 기본 컬럼 배치 (기존 순서를 3컬럼으로 분배)
    const defaultLayout = {
      0: ["날씨", "할 일", "유튜브", "글자수 세기"],
      1: ["Git 기여 그래프", "명언", "자주 방문한 사이트"],  
      2: ["D-Day", "귀여움 충전", "바로가기", "파파고"]
    };
    
    try {
      const initialLayout = JSON.parse(localLayout);
      
      // 기존 레이아웃 데이터 검증
      if (initialLayout && typeof initialLayout === 'object') {
        // 모든 위젯이 기본 위젯 리스트에 존재하는지 확인
        const allWidgets = Object.values(initialLayout).flat();
        const defaultWidgets = Object.values(defaultLayout).flat();
        
        const isValidLayout = allWidgets.every(widget => defaultWidgets.includes(widget)) &&
                             allWidgets.length === defaultWidgets.length;
        
        if (isValidLayout) {
          return initialLayout;
        }
      }
    } catch (error) {
      console.log('기존 columnLayout 데이터 파싱 실패, 기본값 사용:', error);
    }
    
    // 기존 데이터가 없거나 유효하지 않으면 기본값 사용
    return defaultLayout;
  });

  const [display, setDisplay] = useState(true);

  // 테마 초기화
  useEffect(() => {
    initTheme();
  }, []);

  const modalOpen = () => {
    setDisplay(display ? false : true);
  };

  const modalClose = () => {
    setDisplay(display ? false : true);
  };

  // 전체 초기화 함수
  const handleReset = () => {
    if (window.confirm('모든 설정을 초기화하시겠습니까?\n(위젯 배치, 테마, 표시 설정이 모두 기본값으로 돌아갑니다)')) {
      // localStorage 데이터 제거
      localStorage.removeItem("visible");
      localStorage.removeItem("columnLayout");
      localStorage.removeItem("selectedTheme");
      
      // 상태를 기본값으로 리셋
      const defaultVisible = {
        "날씨": true,
        "Git 기여 그래프": true,
        "D-Day": true,
        "할 일": true,
        "명언": true,
        "귀여움 충전": true,
        "유튜브": true,
        "자주 방문한 사이트": true,
        "바로가기": true,
        "글자수 세기": true,
        "파파고": true,
      };
      
      const defaultLayout = {
        0: ["날씨", "할 일", "유튜브", "글자수 세기"],
        1: ["Git 기여 그래프", "명언", "자주 방문한 사이트"],  
        2: ["D-Day", "귀여움 충전", "바로가기", "파파고"]
      };
      
      setVisible(defaultVisible);
      setColumnLayout(defaultLayout);
      
      // 테마도 기본값으로 초기화
      const { setTheme } = require('./utils/themes');
      setTheme('claude');
      
      // 모달 닫기
      setDisplay(true);
      
      alert('설정이 초기화되었습니다.');
    }
  };

  const handleToggleChange = (widgetName) => {
    let visibleCopy = JSON.parse(JSON.stringify(visible));
    visibleCopy[widgetName] = !visibleCopy[widgetName];
    setVisible(visibleCopy);
    localStorage.setItem("visible", JSON.stringify(visibleCopy));
  }

  // 컬럼 기반 위젯 재배치 함수 (개선된 버전)
  /* 새로운 간단한 리오더 함수 (현재 사용하지 않음, 향후 확장용)
  const handleReorder = (action) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 위젯 리오더:', action);
    }
    
    const newLayout = JSON.parse(JSON.stringify(columnLayout));
    
    if (action.type === 'move') {
      // 이동: 위젯을 제거하고 새 위치에 삽입
      const { from, to, widget } = action;
      
      // 원본 위치에서 제거
      newLayout[from.column].splice(from.index, 1);
      
      // 새 위치에 삽입
      if (!newLayout[to.column]) {
        newLayout[to.column] = [];
      }
      newLayout[to.column].splice(to.index, 0, widget);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ 이동 완료:', `${widget.name} -> 컬럼${to.column} 인덱스${to.index}`);
      }
      
    } else if (action.type === 'swap') {
      // 교환: 두 위젯의 위치를 바꿈
      const { from, to, activeWidget, targetWidget } = action;
      
      newLayout[from.column][from.index] = targetWidget;
      newLayout[to.column][to.index] = activeWidget;
      
      console.log('✅ 교환 완료:', `${activeWidget.name} ↔ ${targetWidget.name}`);
    }
    
    setColumnLayout(newLayout);
    localStorage.setItem("columnLayout", JSON.stringify(newLayout));
  };
  */

  const handleColumnReorder = (activeColumn, activeIndex, targetColumn, targetIndex, mode = 'swap') => {
    console.log('🔄 Column Reorder Start:', {
      activeColumn,
      activeIndex,
      targetColumn,
      targetIndex,
      mode
    });

    try {
      // 입력 값 유효성 검사
      if (
        activeColumn === null || activeColumn === undefined ||
        activeIndex === null || activeIndex === undefined ||
        targetColumn === null || targetColumn === undefined ||
        targetIndex === null || targetIndex === undefined
      ) {
        console.error('❌ Invalid parameters for column reorder:', arguments);
        return;
      }

      // 컬럼 범위 검사
      if (activeColumn < 0 || activeColumn >= 3 || targetColumn < 0 || targetColumn >= 3) {
        console.error('❌ Column index out of range:', { activeColumn, targetColumn });
        return;
      }

      // UI 기준 위젯 배열 사용 (visible 필터링된 상태)
      const currentWidgetColumns = createWidgetsFromLayout();
      const newLayout = JSON.parse(JSON.stringify(columnLayout)); // 깊은 복사
      
      // UI 기준 위젯 정보 가져오기
      const activeUIWidget = currentWidgetColumns[activeColumn]?.[activeIndex];
      const targetUIWidget = currentWidgetColumns[targetColumn]?.[targetIndex];
      
      if (!activeUIWidget) {
        console.error('❌ Active UI widget not found:', { activeColumn, activeIndex });
        return;
      }
      
      // columnLayout에서 실제 위젯 위치 찾기
      const activeLayoutIndex = newLayout[activeColumn].indexOf(activeUIWidget.name);
      const targetLayoutIndex = targetUIWidget ? newLayout[targetColumn].indexOf(targetUIWidget.name) : -1;
      
      console.log('🔍 Widget mapping:', {
        activeUI: activeUIWidget.name,
        activeLayoutIndex,
        targetUI: targetUIWidget?.name,
        targetLayoutIndex
      });
      
      if (activeLayoutIndex === -1) {
        console.error('❌ Active widget not found in layout:', activeUIWidget.name);
        return;
      }
      
      if (mode === 'swap') {
        if (!targetUIWidget) {
          console.error('❌ Target widget required for swap');
          return;
        }
        
        if (targetLayoutIndex === -1) {
          console.error('❌ Target widget not found in layout:', targetUIWidget.name);
          return;
        }

        // layout 기준으로 위젯 교환
        const activeWidgetName = newLayout[activeColumn][activeLayoutIndex];
        const targetWidgetName = newLayout[targetColumn][targetLayoutIndex];
        
        newLayout[activeColumn][activeLayoutIndex] = targetWidgetName;
        newLayout[targetColumn][targetLayoutIndex] = activeWidgetName;
        
        console.log('✅ Widget swap successful:', {
          activeWidget: activeWidgetName,
          targetWidget: targetWidgetName,
          activePos: `컬럼${activeColumn}[${activeLayoutIndex}]`,
          targetPos: `컬럼${targetColumn}[${targetLayoutIndex}]`
        });
        
      } else if (mode === 'move') {
        // 드롭존으로 이동
        console.log('🔍 Move 상세 정보:', {
          activeWidget: activeUIWidget.name,
          activeLayoutIndex,
          targetColumn,
          targetIndex
        });
        
        // 대상 컬럼 초기화 (필요시)
        if (!newLayout[targetColumn]) {
          newLayout[targetColumn] = [];
        }
        
        // 대상 인덱스 범위 검사 및 조정
        const visibleTargetWidgets = currentWidgetColumns[targetColumn] || [];
        const maxTargetIndex = visibleTargetWidgets.length;
        const safeTargetIndex = Math.max(0, Math.min(targetIndex, maxTargetIndex));
        
        // 실제 layout에서 해당 위치 계산
        let actualTargetIndex;
        if (safeTargetIndex === 0) {
          actualTargetIndex = 0;
        } else if (safeTargetIndex >= visibleTargetWidgets.length) {
          actualTargetIndex = newLayout[targetColumn].length;
        } else {
          const targetVisibleWidget = visibleTargetWidgets[safeTargetIndex];
          actualTargetIndex = newLayout[targetColumn].indexOf(targetVisibleWidget.name);
        }
        
        const activeWidgetName = newLayout[activeColumn][activeLayoutIndex];
        
        if (activeColumn === targetColumn) {
          // 같은 컬럼 내 이동
          if (activeLayoutIndex < actualTargetIndex) {
            newLayout[targetColumn].splice(actualTargetIndex, 0, activeWidgetName);
            newLayout[activeColumn].splice(activeLayoutIndex, 1);
          } else {
            newLayout[activeColumn].splice(activeLayoutIndex, 1);
            newLayout[targetColumn].splice(actualTargetIndex, 0, activeWidgetName);
          }
        } else {
          // 다른 컬럼으로 이동
          newLayout[activeColumn].splice(activeLayoutIndex, 1);
          newLayout[targetColumn].splice(actualTargetIndex, 0, activeWidgetName);
        }
        
        console.log('✅ Column move successful:', {
          widget: activeWidgetName,
          from: `컬럼${activeColumn}[${activeLayoutIndex}]`,
          to: `컬럼${targetColumn}[${actualTargetIndex}]`
        });
      } else {
        console.error('❌ Invalid mode:', mode);
        return;
      }
      
      // 레이아웃 업데이트
      setColumnLayout(newLayout);
      
      // 로컬 스토리지에 저장 (비동기로 처리)
      try {
        localStorage.setItem("columnLayout", JSON.stringify(newLayout));
        console.log('✅ Layout saved to localStorage');
      } catch (storageError) {
        console.error('❌ Failed to save layout to localStorage:', storageError);
      }
      
    } catch (error) {
      console.error('❌ Error in handleColumnReorder:', error);
      // 에러 발생 시 상태 되돌리기 방지
    }
  }

  const getWidgetId = (widgetName) => {
    const idMap = {
      "날씨": "weather",
      "Git 기여 그래프": "git",
      "D-Day": "dday",
      "할 일": "todo",
      "명언": "phrase",
      "귀여움 충전": "cute",
      "유튜브": "youtube",
      "자주 방문한 사이트": "topsite",
      "바로가기": "shortcut",
      "글자수 세기": "letters",
      "파파고": "papago"
    };
    return idMap[widgetName] || widgetName;
  }

  const getWidgetComponent = (widgetName) => {
    const componentMap = {
      "날씨": <Weather key="weather" />,
      "Git 기여 그래프": <GitContributionGraph key="git" />,
      "D-Day": <NewCount key="dday" />,
      "할 일": <Todo key="todo" />,
      "명언": <Phrase key="phrase" />,
      "귀여움 충전": <Cute key="cute" />,
      "유튜브": <Youtube key="youtube" />,
      "자주 방문한 사이트": <TopSite key="topsite" />,
      "바로가기": <Shortcut key="shortcut" />,
      "글자수 세기": <CountingLetters key="letters" />,
      "파파고": <Papago key="papago" />
    };
    return componentMap[widgetName];
  }

  // 컬럼 레이아웃을 기반으로 위젯 생성
  const createWidgetsFromLayout = () => {
    const columnCount = 3;
    const columns = {};
    
    for (let col = 0; col < columnCount; col++) {
      const columnWidgets = columnLayout[col] || [];
      columns[col] = columnWidgets.filter(widgetName => visible[widgetName]).map(widgetName => ({
        id: getWidgetId(widgetName),
        name: widgetName,
        component: getWidgetComponent(widgetName)
      }));
    }
    
    return columns;
  };

  const widgetColumns = createWidgetsFromLayout();
  
  // 컬럼별 길이 확인 및 저장 (에러 처리 추가)
  React.useEffect(() => {
    try {
      localStorage.setItem("columnLayout", JSON.stringify(columnLayout));
      console.log('💾 Layout auto-saved:', {
        columns: Object.keys(columnLayout).length,
        totalWidgets: Object.values(columnLayout).flat().length
      });
    } catch (error) {
      console.error('❌ Failed to auto-save layout:', error);
    }
  }, [columnLayout]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {/* Language Selector */}
      <LanguageSelector />
      
      {/* Theme Selector */}
      <ThemeSelector />
      
      {/* Settings Button */}
      <button 
        className="
          fixed left-4 top-4 z-50 group
          w-8 h-8 rounded-lg
          bg-white hover:bg-gray-50
          border border-gray-200 hover:border-gray-300
          flex items-center justify-center
          transition-all duration-200
          text-gray-600 hover:text-gray-900
        "
        onClick={modalOpen}
        title="위젯 설정"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {/* Header */}
      <Header />

      {/* Widget Grid */}
      <div className="relative z-10 pb-20">
        <SimpleWidgetGrid 
          widgetColumns={widgetColumns}
          visible={visible}
          onReorder={handleColumnReorder}
        />
      </div>

      {/* Modern Settings Modal */}
      <div
        className={`${
          display ? "hidden" : "fixed"
        } inset-0 z-[100] flex items-center justify-center p-4 bg-black/30`}
        onClick={modalClose}
      >
        <div 
          className="relative w-full max-w-lg bg-white rounded-lg border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{getCommonText('widgetSettings', currentLang)}</h3>
              <p className="text-sm text-gray-500 mt-1">{getCommonText('settingsDescription', currentLang)}</p>
            </div>
            <button
              onClick={modalClose}
              className="
                p-2 rounded-lg 
                hover:bg-gray-100 
                transition-colors duration-200
                text-gray-400 hover:text-gray-600
              "
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Widget Toggle Grid */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(visible).map((widget, idx) => {
                const isActive = visible[widget];
                return (
                  <button
                    key={idx}
                    onClick={() => handleToggleChange(widget)}
                    className={`
                      group relative p-3 rounded-lg border transition-all duration-200
                      ${isActive 
                        ? 'border-primary-200 bg-primary-50 text-primary-700' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    {/* Active Indicator */}
                    <div className={`
                      absolute top-2 right-2 w-3 h-3 rounded-full transition-all duration-300
                      ${isActive ? 'bg-primary-500 scale-100' : 'bg-gray-300 scale-0'}
                    `}></div>
                    
                    <div className="text-sm font-medium leading-tight">
                      {getWidgetName(widget, currentLang)}
                    </div>
                    
                    {/* Hover Effect */}
                    <div className={`
                      absolute inset-0 rounded-xl bg-gradient-to-r from-primary-100/0 to-primary-100/50 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ${isActive ? 'from-primary-200/0 to-primary-200/50' : ''}
                    `}></div>
                  </button>
                );
              })}
            </div>
            
            {/* Helper Text */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-start space-x-3">
                <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-700">드래그 & 드롭으로 배치 변경</p>
                  <p className="text-xs text-gray-500 mt-1">위젯에 마우스를 올리고 드래그하여 원하는 위치로 이동하세요.</p>
                </div>
              </div>
            </div>
            
            {/* 초기화 버튼 */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleReset}
                className="
                  w-full px-4 py-2 rounded-lg
                  bg-red-50 hover:bg-red-100
                  border border-red-200 hover:border-red-300
                  text-red-700 hover:text-red-800
                  text-sm font-medium
                  transition-colors duration-200
                  flex items-center justify-center space-x-2
                "
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{getCommonText('reset', currentLang)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
