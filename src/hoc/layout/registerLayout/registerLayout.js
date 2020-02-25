import React from "react";
import {Layout} from "antd";
import "./registerLayout.css"
const {Content} = Layout;


export default function RegisterLayout(props) {
    return(
        <div className="registration_wrapper">
            <Layout style={{background: "none"}}>
                <Content>
                    {props.children}
                </Content>
            </Layout>
        </div>

    )
}