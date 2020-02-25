import React from "react";
import Button from "antd/es/button";
import 'antd/dist/antd.css';
import "./HomePage.css"

export default function HomePage() {
    return (
        <div className="buttons_wrapper">
            <Button href="/register/company" type="primary" shape="round">
                Sign up as Company
            </Button>
            <Button href="/register/courier" type="primary" shape="round">
                Sign up Courier
            </Button>
        </div>
    )
}