import React, { useCallback, useEffect, useState } from "react";
import Form from "./Form";
import Lists from "./Lists";
import WidgetWrapper from "../WidgetWrapper";
import { detectLanguage, getWidgetName, getCommonText } from "../../utils/messages";

function Todo() {
  const currentLang = detectLanguage();
  const [todoData, setTodoData] = useState(() => {
    const localData = localStorage.getItem("todoData");
    const initialData = JSON.parse(localData);
    return initialData ? initialData : [];
  });
  const [value, setValue] = useState("");

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
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
    <WidgetWrapper 
      title={getWidgetName("할 일", currentLang)}
      headerActions={
        <button
          className="
            group px-3 py-1.5 rounded-lg text-sm font-medium
            bg-red-100/50 hover:bg-red-200/50 text-red-700
            transition-all duration-200 ease-out
            hover:scale-105 active:scale-95
          "
          onClick={handleDeleteAll}
        >
          {getCommonText("deleteAll", currentLang)}
        </button>
      }
    >
      <div className="space-y-4">
        <Lists
          todoData={todoData}
          setTodoData={setTodoData}
          handleClick={handleClick}
        />
        <Form setValue={setValue} value={value} handleSubmit={handleSubmit} currentLang={currentLang} />
      </div>
    </WidgetWrapper>
  );
}

export default Todo;
