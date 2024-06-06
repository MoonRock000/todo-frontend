import { Routes, Route } from "react-router";
import AuthPage from "./components/AuthPage";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (token && token != undefined) setLoggedIn(true);
  }, []);
  if (loggedIn) {
    return (
      <Routes>
        <Route path="/my-todos" element={<TodoList />} />
        <Route path="*" element={<TodoList />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<AuthPage setLoggedIn={setLoggedIn} />} />
      </Routes>
    );
  }
}

export default App;
