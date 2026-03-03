import React from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser, User } from "../api/auth";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const mutation = useMutation<User, Error, Omit<User, "id">>({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Регистрация успешна!");
      navigate("/login"); // после регистрации отправляем на вход
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  return <RegisterForm onSubmit={(values) => mutation.mutate(values)} />;
};

export default RegisterPage;
