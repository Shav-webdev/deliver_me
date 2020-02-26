import React from "react";
import Button from "antd/es/button";
import 'antd/dist/antd.css';
import "./HomePage.css"
import {WrappedNormalLoginForm} from "../../components/login";

export default function HomePage() {
    return (
        <>
            <div>
                <WrappedNormalLoginForm />
            </div>
            <div className="buttons_wrapper">
                <Button href="/register/company" type="primary" shape="round">
                    Sign up as Company
                </Button>
                <Button href="/register/courier" type="primary" shape="round">
                    Sign up Courier
                </Button>
            </div>
        </>
    )
}