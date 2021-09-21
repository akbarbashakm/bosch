import React from "react";
import { Button } from "antd";
import { withRouter } from "react-router";

const Edit = (props) => {

    const goToEdit = () => {
        props.history.push('edit-task', {
            taskId: props.taskId
        })
    }

    return <Button className={'cursor'} onClick={goToEdit} size={'default'}>Edit</Button>;
};

export default withRouter(Edit)