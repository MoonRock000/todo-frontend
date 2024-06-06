import { Routes, Route } from "react-router";
import AuthPage from "./components/AuthPage";
import TodoList from "./components/TodoList";
function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="my-todos" element={<TodoList />} />
    </Routes>
  );
}

export default App;
