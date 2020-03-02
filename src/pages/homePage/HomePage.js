import React from "react";
import Button from "antd/es/button";
import "antd/dist/antd.css";
import "./HomePage.css";
import LoginForm from "../../containers/login/login";

export default function HomePage() {
  return (
    <div className="login_section_wrapper">
      <div className="description_content_wrapper">
        <div className="description_wrapper">
          <h1>Deliver.me for you</h1>
          <p className="description_text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam varius
            libero lacus, in tincidunt arcu ullamcorper quis.
          </p>
        </div>
        <div className="buttons_wrapper">
          <Button href="/register/company" type="primary" shape="round">
            Sign up as Company
          </Button>
          <Button href="/register/courier" type="primary" shape="round">
            Sign up Courier
          </Button>
        </div>
      </div>
      <>
        <LoginForm />
      </>
    </div>
  );
}
