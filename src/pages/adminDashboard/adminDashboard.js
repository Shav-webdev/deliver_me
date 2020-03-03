import React, { useCallback, useState, useEffect } from "react";
import { Table } from 'antd';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Layout, Menu, Icon ,Button} from "antd";
import axios from "axios"
//import {MenuUnfoldOutline} from '@ant-design/icons';
//import {MenuFoldOutline} from '@ant-design/icons';
import './adminDashboard.css'
import { errorMessage } from '../registration/services/services';
const { Header, Sider, Content } = Layout;
const { Column } = Table;


const defaultState = {
  collapsed: false,
  isUpdated: false
};
export default function AdminBoard(props) {
  const [users, setUser] = useState([]);
  const [companies, setCompany] = useState([]);
  const [state, setState] = useState(defaultState);
  const [menuItem, setMenuItem] = useState('users');

  const USER_URL = 'https://thawing-ravine-80499.herokuapp.com/users';
  const COMPANY_URL = 'https://thawing-ravine-80499.herokuapp.com/companies';
  useEffect(() => {

    axios.get(USER_URL)
      .then(({ data }) => {
        console.log(data)
        setUser(data)
      });
    axios.get(COMPANY_URL)
      .then(({ data }) => {
        setCompany(data);
      })
  }, [])


  const onMenuSelect = e => {
    console.log(e.key)
    setMenuItem(e.key);
  };



  const toggle = () => {
    console.log(state.collapsed)
    setState({
      ...state,
      collapsed: !state.collapsed
    });
  };

  const remove=(e)=>{
    console.log(e.target.id)
    const id = e.target.id
    axios.delete(`${USER_URL}/${id}`)
    .then(res=>{
      const filtered = users.filter((el)=>el.id!==id)
      console.log(filtered)
      console.log(users)
      setUser(filtered)
    console.log(state)
  })
  }

  return (
    <div>
      <Layout >
        <Sider trigger={null} collapsible collapsed={state.collapsed}>
          <div className="logo" />
          <Menu
            onSelect={onMenuSelect}
            theme="dark"
            mode="inline"
            key
            defaultSelectedKeys={["users"]}
            inlineCollapsed={state.collapsed}
          >
            <Menu.Item key="users">
              <Icon type="team" />
              <span>Users</span>
              <Link to="/admin/dashboard/users" />
            </Menu.Item>
            <Menu.Item key="companies">
              <Icon type="shop" />
              <span>Companies</span>
              <Link to="/admin/dashboard/companies" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
          {state.collapsed ? <Button onClick={toggle} className='trigger'>Open</Button> :

           <Button onClick={toggle} className='trigger'>X</Button>}
         {/* {state.collapsed ?<Icon
              onClick={toggle}
              type="menu-unfold"/>:
            <Icon
              onClick={toggle}
              type="menu-fold"
            / >
         } */}
         Welcome to dashboard
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >

              {console.log("tttt",users)}
    {menuItem==='users'?<Table dataSource={users}>

    <Column title="Name" dataIndex="name" key="name" />
    <Column title="Last Name" dataIndex="lastName" key="lastName" />
    <Column title="Phone" dataIndex="phone" key="phone" />
    <Column title="Email" dataIndex="email" key="email" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column title="Photo"  key="passportURL"
     render={(text, record) => (
         <a link={record.passportURL}>{record.passportURL}</a>
    )} />
    <Column title="Approved" key="approved"
     render={(text, record) => (
      record.approved?"Yes":"No"
 )} />
    <Column title="Accept" key="accept"
      render={(text, record) => (
        <span>
           <Button type='primary'>Accept</Button>
        </span>
      )}
      />
      <Column title="Decline" key="decline"
      render={(text, record) => (
        <span>
           <Button>Decline</Button>
        </span>
      )}
      />
       <Column title="Edit" key="edit"
           render={(text, record) => (
             <span>
               <Button>Edit</Button>
             </span>
           )}
         />
    <Column title="Delete" key="delete"
      render={(text, record) =>
        (
        <span>
          <Button type="danger" id={record.id} onClick={remove}>Delete</Button>
        </span>
      )}
    />
  </Table>:<Table dataSource={companies}>
         <Column title="Name" dataIndex="name" key="name" />
         <Column title="TaxNumber" dataIndex="taxNumber" key="taxNumber" />
         <Column title="Phone" dataIndex="phone" key="phone" />
         <Column title="Email" dataIndex="email" key="email" />
         <Column title="Address" dataIndex="address" key="address" />
         <Column title="Activity" dataIndex="activity" key="activity" />
         <Column title="Approved" key="approved"
            render={(text, record) => (
              record.approved?"Yes":"No"
        )} />
         <Column title="Accept" key="accept"
           render={(text, record) => (
             <span>
                <Button type='primary'>Accept</Button>
             </span>
           )}
           />
           <Column title="Decline" key="decline"
           render={(text, record) => (
             <span>
              {console.log(record,text)}
                <Button>Decline</Button>
             </span>
           )}
           />
           <Column title="Edit" key="edit"
           render={(text, record) => (
             <span>
               <Button>Edit</Button>
             </span>
           )}
         />
         <Column title="Delete" key="delete"
           render={(text, record) => (
             <span>
                <Button type="danger" id={record.id} onClick={remove}>Delete</Button>
             </span>
           )}
         />
       </Table>}

          </Content>
        </Layout>
      </Layout>


    </div>
  )
}