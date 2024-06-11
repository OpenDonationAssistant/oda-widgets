import { Modal } from "antd";
import React, { ReactNode, useState } from "react";
import classes from "./TextPropertyModal.module.css";

export default function TextPropertyModal({
  title,
  children,
  className
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    const classList = document.getElementById("root")?.classList;
    if (classList?.contains("blured")) {
      classList.remove("blured");
    } else {
      classList?.add("blured");
    }
    setIsModalOpen((old) => !old);
  }

  const handleOk = () => {
    document.getElementById("root")?.classList.remove("blured");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    document.getElementById("root")?.classList.remove("blured");
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={`${classes.modalopenbutton}`} onClick={toggleModal}>
        Редактировать
      </button>
      <Modal
        className={className}
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
}
