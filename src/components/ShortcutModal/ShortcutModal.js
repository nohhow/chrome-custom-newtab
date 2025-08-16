import React from "react";
import "./shortcutModal.css";

function ShortcutModal({ handleSubmit, value, setValue, setModalOpen }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    setModalOpen(false);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50" onClick={handleClose} style={{zIndex: 999999}}>
      <div className="relative w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-gray-900">바로가기 추가</h3>
            <p className="text-sm text-gray-500 mt-1">웹사이트 URL을 입력하세요</p>
          </div>
          <button
            onClick={handleClose}
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
        
        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                웹사이트 URL
              </label>
              <input
                type="url"
                name="value"
                value={value}
                className="
                  w-full px-3 py-2 border border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  placeholder-gray-400
                "
                placeholder="https://example.com"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex space-x-3">
              <button 
                type="submit"
                className="
                  flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 
                  text-white rounded-lg transition-colors duration-200
                  font-medium
                "
              >
                저장
              </button>
              <button 
                type="button"
                onClick={handleClose}
                className="
                  px-4 py-2 bg-gray-100 hover:bg-gray-200 
                  text-gray-700 rounded-lg transition-colors duration-200
                  font-medium
                "
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShortcutModal;
