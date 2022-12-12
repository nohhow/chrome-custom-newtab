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
import Shortcut from "./components/Shortcut";
import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(() => {
    const localData = localStorage.getItem("visible");
    const initialData = JSON.parse(localData);
    return initialData
      ? initialData
      : {
          weather: true,
          newCount: true,
          toDo: true,
          phrase: true,
          cute: true,
          youtube: true,
          topSite: true,
          shortcut: true,
          coutningLetters: true,
        };
  });

  const [display, setDisplay] = useState(true);

  const modalOpen = () => {
    setDisplay(display ? false : true);
  };

  const modalClose = () => {
    setDisplay(display ? false : true);
  };

  const handleToggleChange = (e) => {
    let visibleCopy = JSON.parse(JSON.stringify(visible));
    const target = e.target.value;
    visibleCopy[target] = !visibleCopy[target];
    setVisible(visibleCopy);
    localStorage.setItem("visible", JSON.stringify(visibleCopy));
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-100">
      <button className="fixed left-5 top-5 opacity-75 text-lg" onClick={modalOpen}>
        ≡
      </button>
      <h1 id="top-title" className="text-2xl font-monos mb-5">
        행복한 하루
      </h1>
      <div className="flex flex-row justify-center">
        <div>
          {visible.weather ? <Weather /> : ""}
          {/* <GitContributionGraph /> */}
          {visible.newCount ? <NewCount /> : ""}
          {visible.toDo ? <Todo /> : ""}
        </div>
        <div>
          {visible.phrase ? <Phrase /> : ""}
          {visible.cute ? <Cute /> : ""}
        </div>
        <div>
          {visible.youtube ? <Youtube /> : ""}
          {visible.topSite ? <TopSite /> : ""}
          {visible.shortcut ? <Shortcut /> : ""}
          {visible.countingLetters ? <CountingLetters /> : ""}
        </div>
      </div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          display ? "hidden" : ""
        } overflow-y-auto overflow-x-hidden fixed z-50 p-4 w-full inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                위젯 설정
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={modalClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[30rem] overflow-auto">
              <div className="leading-relaxed text-gray-300">
                {Object.keys(visible).map((widget, idx) => {
                  return (
                    <div key = {idx}>
                        <button
                          value={widget}
                          className={`${visible[widget] ? "opacity-100" : "opacity-50"}`}
                          onClick = {(e)=>{
                            handleToggleChange(e)
                          }}
                        >{widget}</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
