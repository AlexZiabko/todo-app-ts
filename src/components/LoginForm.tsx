import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
}

const schema = Yup.object({
  username: Yup.string().required("Введите имя пользователя"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Введите пароль"),
});

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <Form className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>

        <div className="mb-4">
          <label className="block mb-1">Имя пользователя</label>
          <Field name="username" className="w-full border px-3 py-2 rounded" />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-500 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Пароль</label>
          <Field
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Войти
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
