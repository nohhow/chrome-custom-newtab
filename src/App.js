import "./App.css";
import Count from "./components/Count";
import Todo from "./components/Todo";
import Weather from "./components/Weather";
import Cute from "./components/Cute";
function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-100">
      <h1 id="top-title" className="text-2xl font-monos mb-5">행복한 하루</h1>
      <div className="flex flex-row justify-center">
        <div>
        <Weather/>
        <Count />
        <Todo />
        </div>
        <div>
        <Cute/>
      </div>
      </div>
    </div>
  );
}

export default App;
