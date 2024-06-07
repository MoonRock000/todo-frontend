import { Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import TodoPage from "./pages/TodoPage";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/todos" element={<TodoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
