import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./MainPage.module.css";
import Input from "../../ui/Input/Input";
import DragAndDrop from "../../ui/DragAndDrop/DragAndDrop";
import RegistrationButton from "../../ui/RegistrationButton/RegistrationButton";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import MaskedInputComponent from "../../ui/MaskedInputComponent/MaskedInputComponent";
import axios from "axios";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectData, setSelectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const validationSchema = Yup.object().shape({
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
    participation_in_the_cic: Yup.object()
      .required("Заполните поле")
      .nullable(),
    participant_status: Yup.object().required("Заполните поле").nullable(),
    photo: Yup.mixed().required("Пожалуйста, загрузите файл"),
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      photo: null,
    },
  });

  const getData = async () => {
    try {
      const endpoints = [
        {
          key: "participationFormat",
          url: `${baseURL}/application/getListParticipationFormat`,
        },
        {
          key: "fieldOfActivity",
          url: `${baseURL}/application/getListFieldOfActivity`,
        },
        {
          key: "listYourExpertise",
          url: `${baseURL}/application/getListYourExpertise`,
        },
        {
          key: "listParticipationInTheCIC",
          url: `${baseURL}/application/getListParticipationInTheCIC`,
        },
        {
          key: "listParticipantStatus",
          url: `${baseURL}/application/getListParticipantStatus`,
        },
      ];

      const responses = await Promise.all(
        endpoints.map((endpoint) => axios.get(endpoint.url))
      );
      const data = responses.reduce((acc, res, index) => {
        acc[endpoints[index].key] = res.data;
        return acc;
      }, {});

      setSelectData(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error("Ошибка при получении данных, попробуйте позже ...", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");
    const formData = new FormData();
    for (let key in data) {
      const fieldValue = data[key];
      formData.append(key, fieldValue?.value || fieldValue);
    }

    try {
      const res = await axios.post(`${baseURL}/application/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.result === true) {
        navigate("/success");
      } else {
        setErrorMessage("Такой номер или почта уже зарегистрированы");
      }
    } catch (error) {
      setErrorMessage("Ошибка при отправке данных. Повторите попытку позже.");
      reset();
      setSelectedFile(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.parent}>
        <div>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.parent}>
        <div>Произошла ошибка, повторите позже</div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className={styles.parent}>
        <div>Отправка данных...</div>
      </div>
    );
  }

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.text}>Регистрация</div>
        <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
          <div className={styles.inputsList}>
            <Input
              type="text"
              placeholder="Фамилия"
              {...register("last_name")}
              error={errors.last_name}
            />
            <Input
              type="text"
              placeholder="Имя"
              {...register("first_name")}
              error={errors.first_name}
            />
            <Input
              type="text"
              placeholder="Отчество"
              {...register("middle_name")}
              error={errors.middle_name}
            />
            <Input
              type="text"
              placeholder="Организация"
              {...register("organization")}
              error={errors.organization}
            />
            <Input
              type="text"
              placeholder="Должность"
              {...register("post")}
              error={errors.post}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <MaskedInputComponent
                  {...field}
                  placeholder="Телефон"
                  error={errors.phone}
                />
              )}
            />
            <Input
              type="text"
              placeholder="Почта"
              {...register("email")}
              error={errors.email}
            />
            <DragAndDrop
              selectedFile={selectedFile}
              setSelectedFile={(file) => {
                setSelectedFile(file);
                setValue("photo", file);
                clearErrors("photo");
              }}
              error={errors.photo?.message}
            />

            <Controller
              name="participation_format"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={selectData.participationFormat?.options || []}
                  placeholder={
                    selectData.participationFormat?.placeholder || "Выберите..."
                  }
                  isSearchable={false}
                  error={errors.participation_format}
                />
              )}
            />

            <Controller
              name="field_of_activity"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={selectData.fieldOfActivity?.options || []}
                  placeholder={
                    selectData.fieldOfActivity?.placeholder || "Выберите..."
                  }
                  isSearchable={false}
                  error={errors.field_of_activity}
                />
              )}
            />

            <Controller
              name="your_expertise"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={selectData.listYourExpertise?.options || []}
                  placeholder={
                    selectData.listYourExpertise?.placeholder || "Выберите..."
                  }
                  isSearchable={false}
                  error={errors.your_expertise}
                />
              )}
            />

            <Controller
              name="participation_in_the_cic"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={selectData.listParticipationInTheCIC?.options || []}
                  placeholder={
                    selectData.listParticipationInTheCIC?.placeholder ||
                    "Выберите..."
                  }
                  isSearchable={false}
                  error={errors.participation_in_the_cic}
                />
              )}
            />

            <Controller
              name="participant_status"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={selectData.listParticipantStatus?.options || []}
                  placeholder={
                    selectData.listParticipantStatus?.placeholder ||
                    "Выберите..."
                  }
                  isSearchable={false}
                  error={errors.participant_status}
                />
              )}
            />
            {errorMessage && (
              <div className={styles.errorText}>{errorMessage}</div>
            )}
            <RegistrationButton />
          </div>
        </form>
      </div>
    </div>
  );
}
