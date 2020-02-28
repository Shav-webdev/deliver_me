import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import './profilePage.css'
import {getCookie} from "../registration/services/cookies";
import history from "../../routes/history";

const { Header, Content, Footer } = Layout;

export default class ProfilePage extends React.Component{

    componentDidMount() {
        if (getCookie("token")){
            history.push("/admin/dashboard");
            console.log(getCookie("token"));
        }else {
            history.push("/")
        }
    }

    render() {
        return (
            <Layout className="layout" style={{minHeight:"100vh"}}>
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">This is a profile page</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Simply ©2020 Created by Frontend developers</Footer>
            </Layout>
        )
    }
}



