import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';

// 빈 공간 드롭존 컴포넌트 (얇은 버전)
const DropZone = ({ id, isOver, activeWidget }) => {
  const { setNodeRef } = useDroppable({ id });

  if (!activeWidget) return null; // 드래그 중이 아니면 숨김

  return (
    <div 
      ref={setNodeRef}
      className={`
        w-full h-3 relative
        transition-all duration-300 ease-out
        ${isOver 
          ? 'h-8' // hover시 살짝 커짐
          : 'h-3'
        }
      `}
    >
      <div className={`
        absolute inset-0 rounded-lg border-2 border-dashed 
        transition-all duration-300 ease-out
        flex items-center justify-center
        ${isOver
          ? 'border-primary-400 bg-primary-50/30 shadow-md' 
          : 'border-gray-300/60 hover:border-primary-300/80'
        }
      `}>
        {isOver && (
          <div className="flex items-center space-x-1 text-primary-600">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xs font-medium">여기에 배치</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 개별 위젯을 위한 Sortable 컴포넌트
const SortableWidget = ({ widget, children, isBeingDragged, isDropTarget, activeWidget }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  // 컬럼 기반 배치에서는 dnd-kit의 기본 transform 비활성화
  const style = {
    transition,
  };

  // 상호 자리바꾸기 프리뷰 상태
  const isActive = isDragging || isBeingDragged;
  const isTarget = isDropTarget && activeWidget;

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`
        group relative transform transition-all duration-300 ease-out 
        hover:scale-[1.02]
        ${isActive ? 'opacity-40 scale-95 -rotate-2' : ''}
        ${isTarget ? 'ring-4 ring-primary-400 ring-opacity-60 scale-105 shadow-2xl bg-primary-50/30' : ''}
      `}
    >
      {/* Drag Handle - 윈도우 스타일 상단 가운데 */}
      <div 
        {...attributes}
        {...listeners}
        className="
          absolute top-2 left-1/2 transform -translate-x-1/2 z-20
          w-12 h-6 rounded-lg
          bg-white/90 hover:bg-white
          border border-gray-200 hover:border-gray-300
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-all duration-200
          cursor-grab active:cursor-grabbing
          hover:scale-105
          shadow-sm hover:shadow-md
        "
        title="드래그하여 위젯 순서 변경"
      >
        <svg className="w-4 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </div>

      {/* Widget Content */}
      <div className="relative z-10 animate-fade-in">
        {children}
      </div>

      {/* 상호 자리바꾸기 표시 */}
      {isTarget && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-primary-500/20 backdrop-blur-sm rounded-2xl">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-primary-300/50">
            <div className="flex items-center space-x-2 text-primary-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="text-xs font-medium">
                {activeWidget?.name}과 자리바꿈
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SimpleWidgetGrid = ({ widgetColumns, visible, onReorder }) => {
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [dragState, setDragState] = useState({
    activeColumnIndex: null,
    activeWidgetIndex: null,
    activeWidget: null,
    isActive: false
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px 이동 후 드래그 시작 (오작동 방지)
        delay: 100, // 100ms 지연으로 의도치 않은 드래그 방지
        tolerance: 5
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 위젯 위치 찾기 유틸리티 함수 (성능 최적화)
  const findWidgetPosition = (widgetId) => {
    try {
      for (let col = 0; col < 3; col++) {
        const widgets = widgetColumns[col] || [];
        const widgetIndex = widgets.findIndex(widget => widget?.id === widgetId);
        if (widgetIndex !== -1) {
          return {
            column: col,
            index: widgetIndex,
            widget: widgets[widgetIndex]
          };
        }
      }
      console.warn(`Widget not found: ${widgetId}`);
      return null;
    } catch (error) {
      console.error('Error finding widget position:', error);
      return null;
    }
  };

  // 드롭존 ID 파싱 유틸리티 함수
  const parseDropzoneId = (dropzoneId) => {
    try {
      if (!dropzoneId || typeof dropzoneId !== 'string') return null;
      
      const match = dropzoneId.match(/^dropzone-col(\d+)-(top|bottom)$/);
      if (!match) return null;
      
      return {
        column: parseInt(match[1], 10),
        position: match[2]
      };
    } catch (error) {
      console.error('Error parsing dropzone ID:', error);
      return null;
    }
  };

  const handleDragStart = (event) => {
    console.log('🚀 Drag Start:', event.active.id);
    
    try {
      setActiveId(event.active.id);
      
      const position = findWidgetPosition(event.active.id);
      if (position) {
        setDragState({
          activeColumnIndex: position.column,
          activeWidgetIndex: position.index,
          activeWidget: position.widget,
          isActive: true
        });
        
        console.log('✅ Drag state set:', {
          widget: position.widget?.name,
          column: position.column,
          index: position.index
        });
      } else {
        console.error('❌ Failed to find widget position for:', event.active.id);
        // 안전장치: 드래그 상태 초기화
        setDragState({
          activeColumnIndex: null,
          activeWidgetIndex: null,
          activeWidget: null,
          isActive: false
        });
      }
    } catch (error) {
      console.error('❌ Error in handleDragStart:', error);
      setDragState({
        activeColumnIndex: null,
        activeWidgetIndex: null,
        activeWidget: null,
        isActive: false
      });
    }
  };

  const handleDragOver = (event) => {
    const newOverId = event.over?.id || null;
    
    // 불필요한 상태 업데이트 방지
    if (overId !== newOverId) {
      setOverId(newOverId);
      
      if (newOverId && dragState.isActive) {
        console.log('🎯 Drag Over:', {
          activeWidget: dragState.activeWidget?.name,
          overId: newOverId
        });
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    console.log('🏁 Drag End:', {
      activeId: active.id,
      overId: over?.id,
      dragState: dragState
    });

    try {
      // 유효한 드래그 종료 조건 검사
      if (!active.id || !over?.id || active.id === over.id || !dragState.isActive) {
        console.log('⚠️ Invalid drag end conditions, skipping');
        return;
      }

      const { activeColumnIndex, activeWidgetIndex, activeWidget } = dragState;
      
      if (activeColumnIndex === null || activeWidgetIndex === null || !activeWidget) {
        console.error('❌ Invalid drag state:', dragState);
        return;
      }

      // 드롭존으로 드롭하는 경우
      const dropzoneInfo = parseDropzoneId(over.id);
      if (dropzoneInfo) {
        const { column: targetColumn, position } = dropzoneInfo;
        
        // 유효한 컬럼인지 확인
        if (targetColumn < 0 || targetColumn >= 3) {
          console.error('❌ Invalid target column:', targetColumn);
          return;
        }
        
        const targetIndex = position === 'top' ? 0 : (widgetColumns[targetColumn]?.length || 0);
        
        console.log('📦 Dropzone move:', {
          widget: activeWidget.name,
          from: { column: activeColumnIndex, index: activeWidgetIndex },
          to: { column: targetColumn, index: targetIndex },
          position
        });
        
        if (onReorder) {
          onReorder(activeColumnIndex, activeWidgetIndex, targetColumn, targetIndex, 'move');
        }
        return;
      }

      // 위젯으로 드롭하는 경우
      const targetPosition = findWidgetPosition(over.id);
      if (targetPosition) {
        const { column: targetColumn, index: targetIndex } = targetPosition;
        
        console.log('🔄 Widget operation:', {
          activeWidget: activeWidget.name,
          targetWidget: targetPosition.widget?.name,
          from: { column: activeColumnIndex, index: activeWidgetIndex },
          to: { column: targetColumn, index: targetIndex },
          mode: 'swap' // 항상 swap으로 처리
        });
        
        if (onReorder) {
          onReorder(activeColumnIndex, activeWidgetIndex, targetColumn, targetIndex, 'swap');
        }
      } else {
        console.warn('⚠️ Target widget not found:', over.id);
      }
      
    } catch (error) {
      console.error('❌ Error in handleDragEnd:', error);
    } finally {
      // 항상 상태 초기화
      setActiveId(null);
      setOverId(null);
      setDragState({
        activeColumnIndex: null,
        activeWidgetIndex: null,
        activeWidget: null,
        isActive: false
      });
      
      console.log('🧹 Drag state cleaned up');
    }
  };

  // 현재 드래그 중인 위젯 (드래그 상태에서 직접 가져옴)
  const activeWidget = dragState.isActive ? dragState.activeWidget : null;

  // 모든 위젯의 ID 목록 생성 (dnd-kit용)
  const allWidgetIds = [];
  Object.values(widgetColumns).forEach(columnWidgets => {
    columnWidgets.forEach(widget => allWidgetIds.push(widget.id));
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={allWidgetIds}
          strategy={rectSortingStrategy}
        >
          {/* 컬럼 기반 레이아웃 */}
          <div className="flex gap-6 items-start">
            {Object.entries(widgetColumns).map(([columnIndex, columnWidgets]) => (
              <div key={columnIndex} className="flex-1">
                {/* 각 컬럼의 맨 위 드롭존 */}
                <DropZone 
                  id={`dropzone-col${columnIndex}-top`} 
                  isOver={overId === `dropzone-col${columnIndex}-top`}
                  activeWidget={activeWidget}
                />
                
                {columnWidgets.map((widget, widgetIndex) => (
                  <div key={widget.id} className="mb-6">
                    <SortableWidget 
                      widget={widget}
                      isBeingDragged={widget.id === activeId}
                      isDropTarget={widget.id === overId && activeId && widget.id !== activeId}
                      activeWidget={activeWidget}
                    >
                      {widget.component}
                    </SortableWidget>
                  </div>
                ))}
                
                {/* 각 컬럼의 맨 아래 드롭존 */}
                <DropZone 
                  id={`dropzone-col${columnIndex}-bottom`} 
                  isOver={overId === `dropzone-col${columnIndex}-bottom`}
                  activeWidget={activeWidget}
                />
              </div>
            ))}
          </div>
        </SortableContext>
        
        {/* 드래그 오버레이 - 드래그 중인 위젯의 프리뷰 */}
        <DragOverlay>
          {activeId ? (
            <div className="
              transform rotate-6 scale-105 opacity-90
              bg-white/90 backdrop-blur-md border-2 border-primary-300
              rounded-2xl shadow-2xl
              transition-all duration-200
            ">
              <div className="p-4 text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {activeWidget?.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  다른 위젯과 자리를 바꿔보세요
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {/* Empty State */}
      {allWidgetIds.length === 0 && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">위젯을 추가해보세요</h3>
              <p className="text-gray-400">좌측 상단의 메뉴에서 위젯을 활성화할 수 있습니다.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleWidgetGrid;