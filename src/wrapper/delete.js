import React, { useState } from "react";
import { Modal, Button } from "antd";
import { connect } from 'react-redux'
import { ACTION_TYPES } from "../constants";

const Delete = (props) => {

    const [isVisible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <React.Fragment>
            <Button className={'cursor'} onClick={() => setVisible(true)} size={'default'}>Delete</Button>
            <Modal
                title="Confirm !"
                visible={isVisible}
                onOk={props.deleteTask}
                onCancel={closeModal}
                footer={[
                    <Button key="back" onClick={closeModal}>
                        No
                    </Button>,
                    <Button
                        type="primary"
                        onClick={() => {
                            props.deleteTask(props.taskId);
                            setVisible(false);
                        }}
                    >
                        Yes
                    </Button>
                ]}
            >
                Are you sure.... Do You want to Delete?
            </Modal>
        </React.Fragment>
    );
};

const mapDispatchtoProps = (dispatch) => {
    return {
        deleteTask: (taskId) => dispatch({
            type: ACTION_TYPES.REMOVE_DATA,
            payload: taskId
        })
    }
}

export default connect(null, mapDispatchtoProps)(Delete);