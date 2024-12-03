import { useNavigate } from "react-router-dom";
import ApplicationButton from "../ApplicationButton/ApplicationButton";
import styles from "./EditForm.module.css";
import { ROUTER } from "../../router.config";
import Input from "../Input/Input";
import { Controller, useForm } from "react-hook-form";
import MaskedInputComponent from "../MaskedInputComponent/MaskedInputComponent";
import ImageIcon from "../ImageIcon/ImageIcon";
import ActionButton from "../ActionButton/ActionButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import userIcon from "@images/ui/ImageIcon/images/user-icon.svg";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
export default function EditForm({
  card,
  selectData,
  changeVIP,
  vip,
  selectedFile,
  deleteImage,
  setSelectedFile,
}) {
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
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      photo: null,
    },
  });
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.mainContainer}>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              placeholder="Фамилия"
              label="Фамилия"
              defaultValue={card.last_name}
              {...register("last_name")}
              error={errors.last_name}
            />
            <Input
              type="text"
              placeholder="Имя"
              label="Имя"
              defaultValue={card.first_name}
              {...register("first_name")}
              error={errors.first_name}
            />
            <Input
              type="text"
              placeholder="Отчество"
              label="Отчество"
              defaultValue={card.middle_name}
              {...register("middle_name")}
              error={errors.middle_name}
            />
            <Input
              type="text"
              placeholder="Организация"
              label="Организация"
              defaultValue={card.organization}
              {...register("organization")}
              error={errors.organization}
            />
            <Input
              type="text"
              placeholder="Должность"
              label="Должность"
              defaultValue={card.post}
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
                  label="Телефон"
                  error={errors.phone}
                  defaultValue={card.phone}
                />
              )}
            />
            <Input
              type="text"
              placeholder="Почта"
              label="Почта"
              defaultValue={card.email}
              {...register("email")}
              error={errors.email}
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
                  defaultValue={selectData.participationFormat?.options.find(
                    (option) => option.label === card.participation_format
                  )}
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
                  defaultValue={selectData.fieldOfActivity?.options.find(
                    (option) => option.label === card.field_of_activity
                  )}
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
                  defaultValue={selectData.listYourExpertise?.options.find(
                    (option) => option.label === card.your_expertise
                  )}
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
                  defaultValue={selectData.listParticipationInTheCIC?.options.find(
                    (option) => option.label === card.participation_in_the_cic
                  )}
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
                  defaultValue={selectData.listParticipantStatus?.options.find(
                    (option) => option.label === card.participant_status
                  )}
                />
              )}
            />
          </div>
          <div className={styles.photosContainer}>
            <div className={styles.image}>
              {selectedFile !== null && selectedFile?.path ? (
                <ImageIcon big image={URL.createObjectURL(selectedFile)} />
              ) : selectedFile?.includes("/image/photo/") ? (
                <ImageIcon
                  big
                  image={`${import.meta.env.VITE_PROXY_TARGET}${selectedFile}`}
                />
              ) : (
                <ImageIcon big image={userIcon} />
              )}
              <div className={styles.imageButtons}>
                {selectedFile ? (
                  <>
                    <DragAndDrop
                      action
                      selectedFile={selectedFile}
                      setSelectedFile={(file) => {
                        setSelectedFile(file);
                        setValue("photo", file);
                        clearErrors("photo");
                      }}
                      error={errors.photo?.message}
                    >
                      Заменить
                    </DragAndDrop>
                    <ActionButton onClick={deleteImage}>Удалить</ActionButton>
                  </>
                ) : (
                  <DragAndDrop
                    action
                    selectedFile={selectedFile}
                    setSelectedFile={(file) => {
                      setSelectedFile(file);
                      setValue("photo", file);
                      clearErrors("photo");
                    }}
                    error={errors.photo?.message}
                  >
                    Добавить фото
                  </DragAndDrop>
                )}
              </div>
            </div>
            <div className={styles.qr}>
              {card.qr_code !== 0 && (
                <ImageIcon
                  big
                  image={`${import.meta.env.VITE_PROXY_TARGET}${card.qr_code}`}
                />
              )}
              <ActionButton onClick={changeVIP}>
                {vip === 1 ? "Отменить VIP" : "Присвоить VIP"}
              </ActionButton>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <ApplicationButton type="approve">Сохранить</ApplicationButton>
          <ApplicationButton
            onClick={() => navigate(`${ROUTER.applications}?type=approved`)}
          >
            Отмена
          </ApplicationButton>
        </div>
      </form>
    </div>
  );
}
