import React, { useCallback, useState } from "react";
import { Form, Icon, Input, Button, Typography } from "antd";
import "./adminLoginForm.css";
import { signIn } from "../registration/services/services";
import Spinner from "../../components/spiner/spinner";
import {
  validateEmail,
  validateAdminPassword
} from "../registration/helpers/validations";

const { Title } = Typography;

function AdminLoginForm(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [showEmailValidText, setShowEmailValidText] = useState(false);
  const [showPasswordValidText, setShowPasswordValidText] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  const handleEmailChange = useCallback(e => {
    let email = e.target.value;
    setEmail(email);
    setShowEmailValidText(false);
  }, []);

  const onHandleEmailValidate = () => {
    if (validateEmail(email)) {
      setIsEmailValid(true);
      setShowEmailValidText(false);
    } else {
      setIsEmailValid(false);
      setShowEmailValidText(true);
    }
  };

  const onHandlePasswordValidate = () => {
    if (validateAdminPassword(password)) {
      setIsPasswordValid(true);
      setShowPasswordValidText(false);
    } else {
      setIsPasswordValid(false);
      setShowPasswordValidText(true);
    }
  };

  const handlePasswordChange = useCallback(e => {
    let pass = e.target.value;
    setPassword(pass);
    setShowPasswordValidText(false);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      password
    };
    const url = "https://thawing-ravine-80499.herokuapp.com/admin";
    setTimeout(() => {
      if (!isEmailValid && !isPasswordValid) {
        setShowEmailValidText(true);
        setShowPasswordValidText(true);
      } else if (!isEmailValid) {
        setShowEmailValidText(true);
      } else if (!isPasswordValid) {
        setShowPasswordValidText(true);
      } else {
        signIn(url, data, "/admin/dashboard");
      }
      setLoading(false);
    }, 1000);
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="admin-login_wrapper">
      <Form onSubmit={e => handleSubmit(e)} className="login-form">
        <Form.Item>
          <Title level={3}>Sign In</Title>
        </Form.Item>
        <Form.Item
          validateStatus={showEmailValidText ? "error" : "success"}
          hasFeedback={showEmailValidText}
          help={showEmailValidText ? "The input is not valid E-mail!" : ""}
        >
          <Input
            onChange={e => handleEmailChange(e)}
            onBlur={onHandleEmailValidate}
            value={email}
            placeholder="Email"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item
          validateStatus={showPasswordValidText ? "error" : "success"}
          hasFeedback={showPasswordValidText}
          help={
            showPasswordValidText
              ? "Password should contain at least 8 characters"
              : ""
          }
        >
          <Input
            onChange={e => handlePasswordChange(e)}
            onBlur={onHandlePasswordValidate}
            value={password}
            type="password"
            placeholder="Password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminLoginForm;
