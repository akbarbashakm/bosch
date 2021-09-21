import React from "react";
import { Modal, Button } from "antd";

const Popup = (props: any) => {
  return (
    <Modal
      visible={props.visible}
      title="Title"
      onOk={props.closeModal}
      onCancel={props.closeModal}
      footer={[
        <Button key="back" onClick={props.closeModal}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          //   loading={loading}
          onClick={props.closeModal}
        >
          Create
        </Button>,
      ]}
    />
  );
};

export default Popup;
