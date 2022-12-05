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

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-100">
      <h1 id="top-title" className="text-2xl font-monos mb-5">
        행복한 하루
      </h1>
      <div className="flex flex-row justify-center">
        <div>
          <Weather />
          {/* <GitContributionGraph /> */}
          <NewCount />
          <Todo />
        </div>
        <div>
          <Phrase />
          <Cute />
        </div>
        <div>
          <Youtube />
          {/* <TopSite /> */}
          <Shortcut />
          <CountingLetters/>
        </div>
      </div>
    </div>
  );
}

export default App;
