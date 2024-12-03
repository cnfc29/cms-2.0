import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  last_name: Yup.string().required("Заполните поле"),
  first_name: Yup.string().required("Заполните поле"),
  middle_name: Yup.string().required("Заполните поле"),
  organization: Yup.string().required("Заполните поле"),
  post: Yup.string().required("Заполните поле"),
  phone: Yup.string()
    .required("Заполните поле")
    .matches(
      /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
      "Введите полный номер телефона"
    ),
  email: Yup.string()
    .email("Введите корректный email")
    .required("Заполните поле"),
  participation_format: Yup.object().required("Заполните поле").nullable(),
  field_of_activity: Yup.object().required("Заполните поле").nullable(),
  your_expertise: Yup.object().required("Заполните поле").nullable(),
  participation_in_the_cic: Yup.object().required("Заполните поле").nullable(),
  participant_status: Yup.object().required("Заполните поле").nullable(),
  photo: Yup.mixed().required("Пожалуйста, загрузите файл"),
});
