import React from "react";
import 'antd/dist/antd.css';
import {Form, Input, Select, Button, Typography, Row, Col} from 'antd';
import FormItem from "antd/lib/form/FormItem";
import {signUp} from "../services/services";
import {getCookie} from "../services/cookies";
import history from '../../../routes/history';

const {Option} = Select;
const {Title} = Typography;


class RegisterAsCompany extends React.Component {

    handleSubmit = e => {
        e.preventDefault();

        let url = "http://192.168.3.189:4000/sign-up-company";
        const {validateFields, setFieldsValue} = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //signUp(url, values);
                console.log(this.props.form);
                setFieldsValue({
                    prefix: "374",
                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    phone: "",
                    taxNumber: "",
                    activity: ""
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 9},
                sm: {span: 10},
            },
            wrapperCol: {
                xs: {span: 3},
                sm: {span: 5},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 10,
                    offset: 10,
                },
                sm: {
                    span: 6,
                    offset: 12,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '374',
        })(
            <Select style={{width: 70}}>
                <Option value="374">+374</Option>
            </Select>,
        );

        return (
            <div className="formWrapper">
                <Row type="flex">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Col sm={24}>
                            <FormItem {...tailFormItemLayout}>
                                <Title level={3}>Sign Up</Title>
                            </FormItem>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Name">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="E-mail">
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
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Password" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            min: 8,
                                            max: 32,
                                            message: 'Password must be at least 8 characters!'
                                        }
                                    ],
                                })(<Input.Password/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Address">
                                {getFieldDecorator('address', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your Address!',
                                        },
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Phone Number">
                                {getFieldDecorator('phone', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your phone number!'
                                        },
                                        {
                                            pattern: "^[0-9]+$",
                                            message: 'Please enter only numbers!'
                                        },
                                        {
                                            len: 8,
                                            message: 'Phone number must be 8 digits long!'
                                        }
                                    ],
                                })(<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Tax Number">
                                {getFieldDecorator('taxNumber', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your tax number!',
                                        },
                                        {
                                            len: 8,
                                            message: 'Tax Number should be 8 digits long!'
                                        },
                                        {
                                            pattern: "^[0-9]+$",
                                            message: "Please enter only numbers!"
                                        }
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Activity">
                                {getFieldDecorator('activity', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your activity',
                                        }
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" shape="round">
                                    Register
                                </Button>
                            </Form.Item>
                            <Col sm={21}>
                                <Form.Item {...tailFormItemLayout}>
                                    <Button href="/login" type="link">
                                        Already have an account? Sign in
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Col>
                    </Form>
                </Row>
            </div>
        );
    }
}

export const WrappedRegisterAsCompany = Form.create({name: 'register'})(RegisterAsCompany);
