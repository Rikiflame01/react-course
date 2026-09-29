import "./App.css";
import Header from "./components/Header.jsx";
import Board from "./components/Board.jsx";
import { tasks } from "./data/tasks.js";

function App() {
  return (
    <main>
      <Header tasks={tasks} />
      <Board tasks={tasks} />
    </main>
  );
}

export default App;
