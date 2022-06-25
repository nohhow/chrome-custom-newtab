import React, { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import Lists from "./Lists";

function Todo() {
  const [todoData, setTodoData] = useState(() => {
    const localData = localStorage.getItem("todoData");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : [];
  });
  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log("newTodoData", newTodoData);
      setTodoData(newTodoData);
    },
    [todoData]
  );

  const handleDeleteAll = () => {
    setTodoData([]);
  };

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 대 페이지 리로드 되는 것을 막아줌
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 존재하던 할 일에 새로운 할 일 더해주기
    // state value 비워주기
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(todoData));
  }, [todoData]);
  return (
    <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
      <div className="flex justify-between mb-3 items-center">
        <h1>할 일 목록</h1>
        <button
          className="p-2 text-white bg-red-200 hover:bg-red-400 shadow-md rounded"
          onClick={handleDeleteAll}
        >
          전체삭제
        </button>
      </div>

      <Lists
        todoData={todoData}
        setTodoData={setTodoData}
        handleClick={handleClick}
      />
      <Form setValue={setValue} value={value} handleSubmit={handleSubmit} />
    </div>
  );
}

export default Todo;
