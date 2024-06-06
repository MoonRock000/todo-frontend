import { Routes, Route } from "react-router";
import AuthPage from "./components/AuthPage";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import { getToken } from "./storage/sessionStorage";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let token = getToken();
    if (token) setLoggedIn(true);
  }, []);
  if (loggedIn) {
    return (
      <Routes>
        <Route
          path="*"
          element={<TodoList setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
        />
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
