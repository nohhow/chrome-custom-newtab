import "./App.css";
import Count from "./components/Count";
import Todo from "./components/Todo";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-100">
      <h1 className="text-2xl font-monos mb-5">행복한 하루</h1>
      <Count />
      <Todo />
      <Weather/>
    </div>
  );
}

export default App;
