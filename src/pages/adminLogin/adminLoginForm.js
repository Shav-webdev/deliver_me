import React, { useCallback, useState } from "react";
import { Form, Icon, Input, Button, Typography } from "antd";
import "./adminLoginForm.css";
import { signIn } from "../registration/services/services";
import Spinner from "../../components/spiner/spinner";

const { Title } = Typography;

function AdminLoginForm(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback(e => {
    setPassword(e.target.value);
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
      signIn(url, data, "/admin/dashboard");
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
        <Form.Item>
          <Input
            onChange={e => handleEmailChange(e)}
            value={email}
            placeholder="Email"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={e => handlePasswordChange(e)}
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
