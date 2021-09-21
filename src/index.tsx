import React from "react";
import ReactDOM from "react-dom";
import { Menu, Layout } from "antd";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import "antd/dist/antd.css";
import reducer, { initialState } from "./reducer";
import Wrapper from "./wrapper/index";

const { Header, Content, Sider, Footer } = Layout;
const store = createStore(reducer as any, initialState as any, applyMiddleware(thunk));

interface INavNames {
  name: string[];
}

const App = () => {
  const navList: INavNames = { name: ["Tasks", "Contact Us"] };

  const dataSource = [
    {
      address: '10 Downing Street',
      age: '32',
      key: '1',
      name: 'Mike',
    },
    {
      address: '10 Downing Street',
      age: '42',
      key: '2',
      name: 'John',
    },
  ];

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'age',
      key: 'age',
      title: 'Age',
    },
    {
      dataIndex: 'address',
      key: 'address',
      title: 'Address',
    },
  ];

  return (
    <React.Fragment>
      <div className="logo" />
      <Layout className="">
        <Header>Company Name</Header>
        <Layout>
          <Sider>
            <Menu selectedKeys={['1']}>
              <Menu.Item key="1">{navList.name[0]}</Menu.Item>
              <Menu.Item key="2">{navList.name[1]}</Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Provider store={store}>
              <Wrapper />
            </Provider>
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
