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
            snapshot.isDragging ? "bg-gray-300" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
        >
          <div className="items-center w-4/5 ">
            <form onSubmit={handleEditSubmit}>
              <input
                className="w-full px-3 py-2 border border-blue-200 rounded"
                type="text"
                name="value"
                value={editedValue}
                placeholder="수정할 내용을 입력하세요."
                onChange={handleEditChange}
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="text-sm mx-3 my-2 float-left text-gray-500"
              type="submit"
              onClick={handleEditSubmit}
            >
              완료
            </button>
            <button
              className="text-sm px-1 my-2 float-right bg-red-400 text-white rounded"
              onClick={() => {
                handleClick(id);
              }}
            >
              X
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
            snapshot.isDragging ? "bg-gray-300" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
        >
          <div className="items-center">
            <input
              className="mr-2"
              type="checkbox"
              onClick={() => handleCompleteChange(id)}
              defaultChecked={completed}
            />
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="text-sm mx-3 my-2 float-left text-gray-500"
              onClick={() => {
                setEditState(true);
              }}
            >
              수정
            </button>
            <button
              className="text-sm px-1 my-2 float-right bg-red-400 text-white rounded"
              onClick={() => {
                handleClick(id);
              }}
            >
              X
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;