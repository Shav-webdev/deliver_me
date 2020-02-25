import React from "react";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button,
    Typography
} from 'antd';
import FormItem from "antd/lib/form/FormItem";

const { Option } = Select;
const { Title } = Typography;


class RegisterAsCompany extends React.Component {
    state = {
        confirmDirty: false,
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

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <FormItem {...tailFormItemLayout}>
                    <Title level={3}>Sign Up</Title>
                </FormItem>
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
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            }   
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('usernamee', {
                        rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Address">
                    {getFieldDecorator('text', {
                        rules: [
                            {
                                type: 'text',
                            },
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Phone Number">
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Tax Number">
                    {getFieldDecorator('text', {
                        rules: [
                            {
                                type: 'text',
                            },
                            {
                                required: true,
                                message: 'Please input your tax number',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Activity">
                    {getFieldDecorator('text', {
                        rules: [
                            {
                                type: 'text',
                            },
                            {
                                required: true,
                                message: 'Please input your activity',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Button href="/login" type="link">
                        Already have an account? Sign in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const WrappedRegisterAsCompany = Form.create({ name: 'register' })(RegisterAsCompany);
