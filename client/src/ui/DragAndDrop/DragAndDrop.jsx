import React from "react";
import styles from "./DragAndDrop.module.css";
import { useDropzone } from "react-dropzone";

export default function DragAndDrop({ selectedFile, setSelectedFile }) {
  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".svg"],
    },
    multiple: false,
  });

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };
  return (
    <div className={styles.dragAndDropZone}>
      <div {...getRootProps({ className: styles.dragAndDrop })}>
        <input {...getInputProps()} />
        <div style={{ textAlign: "center" }}>
          Загрузите ваше фото
          <br />
          <span className={styles.dragAndDropText}>
            или перетащите его сюда
          </span>
        </div>
      </div>
      {selectedFile && (
        <div className={styles.selectedFileContainer}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            className={styles.previewImage}
          />
          <div className={styles.fileName}>{selectedFile.name}</div>
          <div className={styles.removeFileIcon} onClick={removeFile}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04795 5L10 8.95205L13.9521 5L15 6.04795L11.0479 10L15 13.9521L13.9521 15L10 11.0479L6.04795 15L5 13.9521L8.95205 10L5 6.04795L6.04795 5Z"
                fill="#5A606E"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
