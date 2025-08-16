import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {

    //Edit 상태
    const [isEditing, setEditState] = useState(false);
    //Edit Form
    const [editedValue, setEditedValue] = useState("");

    //Edit Form Change => setState
    const handleEditChange = (e) => {
      setEditedValue(e.target.value);
    };

    //Edit Form Submit => setTodoData
    const handleEditSubmit = (e) => {
      e.preventDefault();

      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedValue;
        }
        return data;
      });

      setTodoData(newTodoData);
      setEditState(false);
    };

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !completed;
        }
        return data;
      });
      setTodoData(newTodoData);
    };

    if (isEditing) {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging 
              ? "bg-primary-100/80 shadow-lg scale-105" 
              : "bg-primary-50/60 border-primary-300/50"
          } flex items-center justify-between w-full px-4 py-3 my-2 
          border-2 rounded-xl transition-all duration-200 ease-out shadow-md`}
        >
          <div className="flex-1 mr-3">
            <form onSubmit={handleEditSubmit}>
              <input
                className="w-full px-3 py-2 border border-primary-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 
                transition-colors duration-200 bg-white/80"
                type="text"
                name="value"
                value={editedValue}
                placeholder="수정할 내용을 입력하세요."
                onChange={handleEditChange}
                autoFocus
              />
            </form>
          </div>
          <div className="items-center flex space-x-2">
            <button
              className="text-sm px-2 py-1 bg-green-400 hover:bg-green-500 text-white rounded transition-colors duration-200"
              type="submit"
              onClick={handleEditSubmit}
            >
              완료
            </button>
            <button
              className="text-sm px-2 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors duration-200"
              onClick={() => {
                setEditState(false);
                setEditedValue(""); // 취소시 입력값 초기화
              }}
            >
              취소
            </button>
            <button
              className="text-sm px-2 py-1 bg-red-400 hover:bg-red-500 text-white rounded transition-colors duration-200"
              onClick={() => {
                handleClick(id);
              }}
            >
              삭제
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging 
              ? "bg-primary-100/80 shadow-lg scale-105" 
              : "bg-white/60 hover:bg-white/80"
          } flex items-center justify-between w-full px-4 py-3 my-2 
          border border-gray-200/50 rounded-xl transition-all duration-200 ease-out
          hover:shadow-md hover:border-primary-200/50 group`}
        >
          <div className="flex items-center space-x-3 flex-1">
            <input
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
              type="checkbox"
              onClick={() => handleCompleteChange(id)}
              defaultChecked={completed}
            />
            <span className={`${completed 
              ? "line-through text-gray-500" 
              : "text-gray-700"
            } flex-1 transition-colors duration-200`}>
              {title}
            </span>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              className="text-xs px-2 py-1 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg transition-colors duration-200"
              onClick={() => {
                setEditedValue(title); // 기존 내용을 editedValue에 설정
                setEditState(true);
              }}
            >
              수정
            </button>
            <button
              className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200"
              onClick={() => {
                handleClick(id);
              }}
            >
              삭제
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;