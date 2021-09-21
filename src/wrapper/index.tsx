import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Popup from "./popup";

interface INavNames {
  name: string[];
}

const Wrapper = () => {
  const navList: INavNames = { name: ["Tasks", "Contact Us"] };
  const [isOpen, setOpen] = useState(false);

  const toggleModal = (): void => {
    setOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <Layout>
        <Row>
          <Col style={{
              cursor: 'pointer'
          }}>
            <PlusCircleOutlined
              style={{
                fontSize: "20px",
                paddingRight: 7,
                verticalAlign: "middle"
              }}
              translate={undefined}
              onAuxClick={toggleModal}
              onAuxClickCapture={undefined}
            />
            Add Task
          </Col>
          <Popup visible={true} closeModal={toggleModal} />
        </Row>
        <Row>
          <Col span={12} />
        </Row>
      </Layout>      
    </React.Fragment>
  );
};

export default Wrapper;
