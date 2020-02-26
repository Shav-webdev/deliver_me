import React from "react";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Select,
    Button,
    Typography,
    Row,
    Col
} from 'antd';
import FormItem from "antd/lib/form/FormItem";

const { Option } = Select;
const { Title } = Typography;


class RegisterAsCompany extends React.Component {
    state = {
        confirmDirty: false,
        email: "",
        password: "",
        phone: "",
        tax: "",
        activity: ""
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 1 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 1 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 1,
                    offset: 10,
                },
                sm: {
                    span: 5,
                    offset: 10,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '374',
        })(
            <Select style={{ width: 70 }}>
                <Option value="374">+374</Option>
            </Select>,
        );

        const onEmailHandleChange = (e) => {
            this.setState({
                email: e.target.value,
            });
        }

        const onPasswordHandleChange = (e) => {
            this.setState({
                password: e.target.value
            });
        }

        const onPhoneHandleChange = (e) => {
            this.setState({
                phone: e.target.value
            });
        }

        const onTaxHandleChange = (e) => {
            this.setState({
                tax: e.target.value
            });
        }

        const onActivityHandleChange = (e) => {
            this.setState({
                activity: e.target.value
            });
        }

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
                                })(<Input onChange={e => onEmailHandleChange(e)} />)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Password" hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        }
                                    ],
                                })(<Input.Password onChange={e => onPasswordHandleChange(e)} />)}
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
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Phone Number">
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: 'Please input your phone number!' }],
                                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} onChange={e => onPhoneHandleChange(e)} />)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Tax Number">
                                {getFieldDecorator('tax', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your tax number',
                                        },
                                    ],
                                })(<Input onChange={e => onTaxHandleChange(e)} />)}
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
                                })(<Input onChange={e => onActivityHandleChange(e)} />)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" shape="round">
                                    Register
                                </Button>
                                <Button href="/login" type="link">
                                    Already have an account? Sign in
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>
            </div>
        );
    }
}

export const WrappedRegisterAsCompany = Form.create({ name: 'register' })(RegisterAsCompany);
