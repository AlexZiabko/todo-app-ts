import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={isLoggedIn ? <Todos /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/todos" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
