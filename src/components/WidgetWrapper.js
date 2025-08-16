import React from 'react';

const WidgetWrapper = ({ children, title, className = "", headerActions = null }) => {
  // D-Day 위젯에서만 overflow-visible 허용
  const shouldAllowOverflow = className.includes('overflow-visible');
  
  return (
    <div className={`
      relative
      bg-white border border-gray-200
      rounded-lg
      transition-all duration-200
      hover:border-gray-300
      ${shouldAllowOverflow ? 'overflow-visible' : 'overflow-hidden'}
      ${className.replace('overflow-visible', '').trim()}
    `}>
      
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            {title}
          </h3>
          {headerActions && (
            <div className="flex items-center space-x-2">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default WidgetWrapper;