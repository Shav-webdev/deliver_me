import React from "react";
import {Layout} from "antd";
import "./defaultLayout.css"
const {Content} = Layout;

export default function defaultLayout(props) {
    return(
        <div className="homepage_wrapper">
            <Layout style={{background: "none"}}>
                <Content>
                    {props.children}
                </Content>
            </Layout>
        </div>

    )
}