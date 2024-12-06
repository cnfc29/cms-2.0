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
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validationSchema";
import { useEditApplication } from "../../HOCs/EditApplicationProvider";

export default function EditForm() {
  const navigate = useNavigate();

  const {
    card,
    selectData,
    vip,
    changeVIP,
    selectedFile,
    deleteImage,
    setSelectedFile,
    submitHandler,
  } = useEditApplication();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
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

            <div className={styles.selectContainer}>
              <div className={styles.label}>
                {selectData.participationFormat?.placeholder}
              </div>
              <Controller
                name="participation_format"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={selectData.participationFormat?.options || []}
                    placeholder={
                      selectData.participationFormat?.placeholder ||
                      "Выберите..."
                    }
                    isSearchable={false}
                    error={errors.participation_format}
                    defaultValue={selectData?.participationFormat?.options.find(
                      (option) => option.label === card.participation_format
                    )}
                  />
                )}
              />
            </div>

            <div className={styles.selectContainer}>
              <div className={styles.label}>
                {selectData.fieldOfActivity?.placeholder}
              </div>
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
            </div>

            <div className={styles.selectContainer}>
              <div className={styles.label}>
                {selectData.listYourExpertise?.placeholder}
              </div>

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
            </div>

            <div className={styles.selectContainer}>
              <div className={styles.label}>
                {selectData.listParticipationInTheCIC?.placeholder}
              </div>
              <Controller
                name="participation_in_the_cic"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    options={
                      selectData.listParticipationInTheCIC?.options || []
                    }
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
            </div>

            <div className={styles.selectContainer}>
              <div className={styles.label}>
                {selectData.listParticipantStatus?.placeholder}
              </div>

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
          </div>

          <div className={styles.photosContainer}>
            <div className={styles.image}>
              {selectedFile !== "" && selectedFile?.path ? (
                <ImageIcon big image={URL.createObjectURL(selectedFile)} />
              ) : selectedFile?.includes("/image/photo/") ? (
                <ImageIcon
                  big
                  image={`https://test.draftnew.site${selectedFile}`}
                />
              ) : (
                <ImageIcon big />
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
                    <ActionButton
                      onClick={(e) => {
                        deleteImage(e);
                        setValue("photo", 0);
                      }}
                    >
                      Удалить
                    </ActionButton>
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
                  image={`https://test.draftnew.site${card.qr_code}`}
                />
              )}
              <ActionButton onClick={(e) => changeVIP(e)}>
                {vip === 1 ? "Отменить VIP" : "Присвоить VIP"}
              </ActionButton>
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <ApplicationButton type="approve">Сохранить</ApplicationButton>
          <ApplicationButton
            onClick={(e) => {
              e.preventDefault();
              navigate(`${ROUTER.applications}?type=approved`);
            }}
          >
            Отмена
          </ApplicationButton>
        </div>
      </form>
    </div>
  );
}
