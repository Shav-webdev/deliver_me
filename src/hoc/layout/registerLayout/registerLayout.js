import React from "react";
import {Layout} from "antd";
const {Content} = Layout;


export default function RegisterLayout(props) {
    return(
        <Layout>
            <Content>
                {props.children}
            </Content>
        </Layout>
    )
}