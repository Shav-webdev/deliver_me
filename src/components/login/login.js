import React from "react";
import {Form, Icon, Input, Button} from 'antd';
import './login.css'
import {signIn} from "../../pages/registration/services/services";
import {getCookie} from "../../pages/registration/services/cookies";
import history from "../../routes/history";

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let url = "http://192.168.3.189:4000/login-company";
                signIn(url, values);
                let tokenCookie = getCookie('token');
                if (tokenCookie) {
                    console.log(tokenCookie);
                    history.push('/profile');
                }

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login_wrapper">
                <h2>Sign in</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                  placeholder="Email"
                                   />)}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                },
                                {
                                    min: 8,
                                    max: 32,
                                    message: 'Password must be at least 8 characters!'
                                }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {/*<a className="login-form-forgot" href="">*/}
                        {/*    Forgot password*/}
                        {/*</a>*/}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

export const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);