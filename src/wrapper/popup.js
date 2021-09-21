import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, Divider } from "antd";
import { connect } from 'react-redux'
import { ACTION_TYPES, PROJECT_TYPES } from "../constants";
import { withRouter } from "react-router";

const { TextArea } = Input;
const { Option } = Select;

const getDefaultValue = (taskId, tasks, key) => {
    if (taskId !== null) {
        const index = tasks.findIndex(obj => obj.taskId === taskId);
        return tasks[index][key]
    }
    return '';
}

const Popup = ({
    history,
    addTask,
    editTask,
    tasks
}) => {
    const { taskId = null } = (history.location || {}).state || {};
    const [form] = Form.useForm();
    const [task_name, setTask] = useState(getDefaultValue(taskId, tasks, 'taskName'));
    const [project_name, setProject] = useState(getDefaultValue(taskId, tasks, 'project'));
    const [comments, setComments] = useState(getDefaultValue(taskId, tasks, 'comments'));

    const goToHome = () => {
        history.push('/')
    }
    const submit = () => {
        const args = {
            taskName: task_name,
            project: project_name,
            comments
        }
        if (taskId !== null) {
            editTask({
                taskId,
                ...args
            })
        } else {
            addTask(args);
        }
        history.push('/');
    }

    return (
        <Modal
            visible={true}
            title="Create Task"
            onOk={goToHome}
            onCancel={goToHome}
            footer={null}
            key={'popup'}
        >
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{
                    task_name,
                    project_name,
                    comments
                }}
            >
                <Form.Item key={'task'} label="Task Name" name="task_name" rules={[{ required: true }]} >
                    <Input placeholder="" onChange={(e) => {
                        setTask(e.target.value)
                    }} value={task_name} />
                </Form.Item>
                <Form.Item key={'project'} label="Project Name" name="project_name" rules={[{ required: true }]} >
                    <Select
                        showSearch
                        value={project_name}
                        placeholder="Select Project"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setProject(value);
                        }}
                    >
                        {
                            PROJECT_TYPES.map((ele) => <Option key={ele.value} value={ele.value}>{ele.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item key={'comments'}  label="Comments" name="comments">
                    <TextArea value={comments} rows={4} onChange={(e) => {
                        setComments(e.target.value)
                    }} />
                </Form.Item>
                <Divider orientation="center" plain />
                <Form.Item key={'footer'}  className={'footer'}>
                    <Button key="back" style={{
                        marginRight: 15
                    }} onClick={goToHome} >
                        Cancel
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        htmlType="submit"
                        onClick={submit}
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const mapDispatchtoProps = (dispatch) => {
    return {
        addTask: (args) => dispatch({
            type: ACTION_TYPES.SET_DATA,
            payload: {
                ...args
            }
        }),
        editTask: (args) => dispatch({
            type: ACTION_TYPES.EDIT_DATA,
            payload: {
                ...args
            }
        })
    }
}

const mapStateToProps = (app) => {
    const { tasks } = app;
    return {
      tasks
    }
  }

export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(Popup));