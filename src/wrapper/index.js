import React from "react";
import { Layout, Row, Col } from "antd";
import { connect } from 'react-redux'
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from 'antd';
import Delete from './delete';
import Edit from './edit';

import Popup from "./popup";
import { Route, Switch } from "react-router";


const columns = [
  {
    title: 'Task Id',
    dataIndex: 'taskId',
    key: 'taskId',
  },
  {
    title: 'Task Name',
    dataIndex: 'taskName',
    key: 'taskName',
  },
  {
    title: 'Project',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: 'Comments',
    dataIndex: 'comments',
    key: 'comments',
  },
  {
    title: 'Task Edit',
    dataIndex: 'taskId',
    key: 'taskId',
    render: taskId => <Edit taskId={taskId} />
  },
  {
    title: 'Task Delete',
    dataIndex: 'taskId',
    key: 'taskId',
    render: taskId => <Delete taskId={taskId} />
  }
];

const Wrapper = (props) => {
  const toggleModal = () => {
    props.history.push('add-task')
  }
  const [dataSource, setDataSource] = React.useState(props.tasks);
  React.useEffect(() => {
    debugger
    setDataSource(props.tasks)
  }, [props.tasks])
  return (
    <React.Fragment>
      <Layout>
        <Row>
          <Col style={{
            cursor: 'pointer'
          }} onClick={toggleModal}
            span={24}>
            <PlusCircleOutlined
              style={{
                fontSize: "20px",
                paddingRight: 7,
                verticalAlign: "middle"
              }}
            />
            Add Task
          </Col>
        </Row>
        <Row style={{
          marginTop: '5%'
        }}>
          <Col span={24}>
            <Table dataSource={dataSource} columns={columns} />
          </Col>
        </Row>
      </Layout>
      <Switch>
        <Route path={'/add-task'} component={Popup} />
        <Route path={'/edit-task'} component={Popup} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (app) => {
  const { tasks } = app;
  return {
    tasks
  }
}

export default connect(mapStateToProps, null)(Wrapper);