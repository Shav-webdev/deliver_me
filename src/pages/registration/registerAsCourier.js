import React from "react";
import axios from "axios";
import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Select,
    Button,
    Typography,
    Row,
    Col,
    Upload,
    Icon,
    message
} from 'antd';
import FormItem from "antd/lib/form/FormItem";
import { signUp } from "./services/services";

const { Option } = Select;
const { Title } = Typography;

const state = {
    imageurl: ''
}

const params = {
    name: 'file',
    action: '',
    headers: {
        authorization: 'authorization-text',
        'Content-Type': 'application/x-ww-form-urlencoded'
    },

    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


class RegisterAsCourier extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        let url = "http://192.168.3.189:4000/sign-up-user";


        this.props.form.validateFieldsAndScroll((err, values) => {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    values.passportURL = this.state.imageurl;
                    console.log(values.image);
                    signUp(url, values);
                }
            });
        });
    }

    handleChange = (event) => {
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfeoo5iog/upload';
        const CLOUDINARY_UPLOAD_PRESET = 'lvxujt8u';
        const formData = new FormData();
        formData.append('file', event.file.originFileObj);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);


        return axios.post(CLOUDINARY_URL, formData)
            .then((res) => {
                console.log(res.data.url);
                this.setState({ imageurl: res.data.url });
                console.log(this.state);
                return res.data.url;
            })
            .catch(e => console.log(e.message));
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 9 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 3 },
                sm: { span: 5 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 10,
                    offset: 12,
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
            <Select style={{ width: 70 }}>
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
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Last name">
                                {getFieldDecorator('lastName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input />)}
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
                                })(<Input />)}
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
                                })(<Input.Password />)}
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
                                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                            </Form.Item>
                        </Col>
                        <Col sm={24}>
                            <Form.Item label="Upload Passport photo">
                                {getFieldDecorator('passportURL', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please upload a photo!'
                                        }
                                    ],
                                })
                                    (<Upload {...params} onChange={(e) => this.handleChange(e)}>
                                        <Button >
                                            <Icon type="upload" /> Click to Upload
                                    </Button>
                                    </Upload>)},
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

export const WrappedRegisterAsCourier = Form.create({ name: 'register' })(RegisterAsCourier);
