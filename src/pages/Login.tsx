import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: { username: string; password: string }) => {
    localStorage.setItem("token", "demo"); // простая авторизация
    navigate("/todos");
  };

  return <LoginForm onSubmit={handleSubmit} />;
};

export default Login;
