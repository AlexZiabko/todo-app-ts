import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onSubmit: (values: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Минимум 3 символа")
        .required("Обязательно"),
      email: Yup.string().email("Неверный email").required("Обязательно"),
      password: Yup.string()
        .min(6, "Минимум 6 символов")
        .required("Обязательно"),
    }),
    onSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Регистрация</h2>

      <div>
        <input
          name="username"
          placeholder="Имя"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
      </div>

      <div>
        <input
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
