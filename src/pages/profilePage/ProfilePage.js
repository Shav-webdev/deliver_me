import React, {useEffect} from "react";
import {Layout, Menu, Breadcrumb, Descriptions} from "antd";
import "./profilePage.css";
import {getCookie} from "../registration/services/cookies";
import history from "../../routes/history";
import {currentCompany} from "../../redux/actions";
import {connect} from "react-redux";
import Collapse from "antd/es/collapse";
import List from "antd/es/list";
import ListItem from "antd/es/transfer/ListItem";
const { Panel } = Collapse;

const {Header, Sider, Content, Footer} = Layout;

function ProfilePage(props) {

    function callback(key) {
        console.log(key);
    }

    useEffect(() => {
        console.log(props)
        if (!getCookie("token")) {
            history.push("/");
        }
    }, []);

    const text = "hcvsskfvbjdbvhjbdjhbhjbjhbhjb";
    const {currentCompany} = props;



    return (
        <>
            <Sider theme="light" width={350}>
                {Object.keys(currentCompany).map((el) => {
                    return(
                        <List key={el}>
                            <List.Item><strong>{`${el} :`}</strong>{` ${currentCompany[el]}`}</List.Item>
                        </List>
                    )
                })}
            </Sider>
            <Layout>
                <Header>
                   <div>Header</div>
                </Header>
            </Layout>
        </>
    );
}

function mapStateToProps(state) {
    return {
        currentCompany: state.companies.currentCompany,
        allCompanies: state.companies.allCompanies,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addCurrentCompany: (company) => {
            dispatch(currentCompany(company))
        },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

