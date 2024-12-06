import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  last_name: Yup.string().required("Заполните поле"),
  first_name: Yup.string().required("Заполните поле"),
  middle_name: Yup.string().required("Заполните поле"),
  organization: Yup.string().required("Заполните поле"),
  post: Yup.string().required("Заполните поле"),
  phone: Yup.string().matches(
    /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
    "Введите полный номер телефона"
  ),
  email: Yup.string()
    .email("Введите корректный email")
    .required("Заполните поле"),
  participation_format: Yup.object().nullable(),
  field_of_activity: Yup.object().nullable(),
  your_expertise: Yup.object().nullable(),
  participation_in_the_cic: Yup.object().nullable(),
  participant_status: Yup.object().nullable(),
  vip: Yup.number().nullable(),
  photo: Yup.mixed().nullable(),
});
