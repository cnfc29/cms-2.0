import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./MainPage.module.css";
import Input from "../../ui/Input/Input";
import DragAndDrop from "../../ui/DragAndDrop/DragAndDrop";
import RegistrationButton from "../../ui/RegistrationButton/RegistrationButton";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../ui/CustomSelect/CustomSelect";
import MaskedInputComponent from "../../ui/MaskedInputComponent/MaskedInputComponent";
import { submitFormRegistration } from "../../API/api";
import { validationSchema } from "./validationSchema";
import { useFetchData } from "../../hooks/useFetchData";
import { ROUTER } from "../../router.config";

export default function MainPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const { selectData, loading, error } = useFetchData();

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");
    const formData = new FormData();
    for (let key in data) {
      const fieldValue = data[key];
      formData.append(key, fieldValue?.value || fieldValue);
    }

    try {
      const res = await submitFormRegistration(formData);
      if (res.data.result === true) {
        navigate(ROUTER.success);
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
