import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import DataTable from '../../components/dataTable/dataTable';
import "./adminDashboard.css";
import { Layout, Menu, Icon } from "antd";
import {
  errorMessage,
  successMessage
} from "../registration/services/services";
import { connect } from "react-redux";
import { getCompanies, getUsers } from "../../redux/actions";
import axios from "axios";
import { Table } from "antd";
import { getCookie } from "../registration/services/cookies";
import history from "../../routes/history";

const { Header, Sider, Content } = Layout;

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      users: [],
      companies: [],
      usersColumn: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Last name", dataIndex: "last_name", key: "last_name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
        { title: "Address", dataIndex: "address", key: "address" }
      ],
      isUpdated: false
    };
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.getData = this.getData.bind(this);
  }

  onMenuSelect = ({ key }) => {
    this.getData(`${key}`);
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  getData(data = "users") {
    let url = `https://thawing-ravine-80499.herokuapp.com/${data}`;
    axios
      .get(`${url}`)
      .then(res => {
        console.log("table data" , res.data);
        console.log(this.props);
        if (data === "users") {
          this.setState({
            users: res.data
          });
          // this.props.getUsers(res.data);
        } else if (data === "companies") {
          this.setState({
            companies: res.data
          });
          // this.props.getCompanies(res.data);
        }
        successMessage(`Data loaded.`);
      })
      .catch(e => {
        errorMessage(e.response.data.message);
      });
  }

  componentDidMount() {
    if (getCookie("token")) {
      history.push("/admin/dashboard");
    } else {
      history.push("/");
    }
  }

  render() {
    const { companies, users } = this.state;

    console.log(companies);
    console.log(users);
    // console.log(companiesColumn)
    // console.log(companiesData)
    // console.log(usersData)
    // console.log(usersColumn)

    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu
              onSelect={this.onMenuSelect}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[""]}
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
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Route exact path="/admin/dashboard/users">
                <Table
                  column={this.state.usersColumn}
                  dataSource={this.state.users}
                  rowKey="id"
                />
              </Route>
              <Route path="/admin/dashboard/companies">
                <Table
                // dataSource={companies}
                // rowKey="id"
                />
              </Route>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    companies: state.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCompanies: companies => {
      dispatch(getCompanies(companies));
    },
    getUsers: users => {
      dispatch(getUsers(users));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
