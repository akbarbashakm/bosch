import React from "react";
import { Menu, Layout } from "antd";
import { Switch, Route, withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import "antd/dist/antd.css";
import reducer, { initialState } from "./redux/reducer";
import Wrapper from "./wrapper";

const { Header, Content, Sider } = Layout;
const store = createStore(reducer, initialState, applyMiddleware(thunk));

const App = () => {
  const navList = { name: ["Tasks", "Contact Us"] };

  return (
    <Provider store={store}>
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
            <Switch>
              <Route path={'/*'} component={Wrapper} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default withRouter(App);