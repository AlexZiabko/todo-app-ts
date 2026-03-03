import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddTodoFormProps {
  onSubmit: (title: string) => void;
}

const schema = Yup.object({ title: Yup.string().required("Введите задачу") });

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.title);
        resetForm();
      }}
    >
      <Form className="flex gap-2">
        <Field
          name="title"
          placeholder="Новая задача"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Добавить
        </button>
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-500 mt-1"
        />
      </Form>
    </Formik>
  );
};

export default AddTodoForm;
