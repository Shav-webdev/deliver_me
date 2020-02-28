import React from "react";
import { Form, Icon, Input, Button, Typography } from 'antd';
import './adminLoginForm.css';
import { signIn } from '../registration/services/services';

const {Title} = Typography;
const url = 'http://192.168.3.189:4000/admin';

class AdminLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values);
                signIn(url, values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='admin-login_wrapper'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <Title level={3}>Sign In</Title>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export const WrappedAdminLoginForm = Form.create({ name: 'admin_login' })(AdminLoginForm);