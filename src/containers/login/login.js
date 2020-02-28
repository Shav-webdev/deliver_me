import React from "react";
import {Form, Icon, Input, Button, Radio} from 'antd';
import './login.css'
import {signIn} from "../../pages/registration/services/services";
import Spinner from "../../components/spiner/spinner";

class LoginForm extends React.Component {
   state = {
       loading: false,
   }

    handleSubmit = e => {
       this.setState({
           loading:true,
       })
        e.preventDefault();
        const {validateFields, setFieldsValue} = this.props.form;
        validateFields((err, values) => {
            if (!err) {

                let url = (values["signInAs"] === "courier") ?
                    "https://thawing-ravine-80499.herokuapp.com/login-user"
                    : "https://thawing-ravine-80499.herokuapp.com/login-company";

                signIn(url, values, "/profile");
                this.setState({
                    loading:false,
                })
                setFieldsValue({
                    email: "",
                    password: "",
                    signInAs: ""
                })

            }
        });
    };


    render() {
        if (this.state.loading){
            return <Spinner/>
        }
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
                    <Form.Item label="Sign in as">
                        {getFieldDecorator('signInAs', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please tell us who you are.'
                                },
                            ],
                        })(
                            <Radio.Group>
                                <Radio checked value="courier">Courier</Radio>
                                <Radio value="company">Company</Radio>
                            </Radio.Group>,
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

export const WrappedLoginForm = Form.create({name: 'normal_login'})(LoginForm);