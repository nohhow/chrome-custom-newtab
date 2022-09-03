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
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <div className="modal_content">
            <span onClick={handleClose} className="modal-close">
              X
            </span>
            <form onSubmit={(e) => {handleSubmit(e); handleClose();}}>
              <input
                type="text"
                name="value"
                value={value}
                className="w-5/6 px-3 py-2 mr-2 text-gray-500 border rounded shadow"
                placeholder="url을 입력하세요."
                onChange={handleChange}
              />
              <button className="p-1 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200">
                저장
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortcutModal;
