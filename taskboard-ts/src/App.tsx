// Lab 6.2 moved routing into main.tsx. This file is unused by the router.
import Header from "./components/Header";
import Board from "./components/Board";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  return (
    <main>
      <Header />
      <AddTaskForm />
      <Board />
    </main>
  );
}

export default App;
