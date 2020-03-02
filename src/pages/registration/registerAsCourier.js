import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
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
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { signUp } from "./services/services";
import history from "../../routes/history";

const { Option } = Select;
const { Title } = Typography;

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class RegisterAsCourier extends React.Component {
  state = {
    imageurl: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    let url = "https://thawing-ravine-80499.herokuapp.com/sign-up-user";

    this.props.form.validateFields((err, values) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          values.passportURL = this.state.imageurl;
          signUp(url, values);
          history.push("/");
        }
      });
    });
  };

  handleChange = event => {
    if (event.file.status === "done") {
      console.log(event);
      const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dfeoo5iog/upload";
      const CLOUDINARY_UPLOAD_PRESET = "lvxujt8u";
      const formData = new FormData();
      formData.append("file", event.file.originFileObj);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      return axios
        .post(CLOUDINARY_URL, formData)
        .then(res => {
          this.setState({ imageurl: res.data.url });
          message.success(`${event.file.name} file uploaded successfully`);
          console.log(this.state);
          return res.data.url;
        })
        .catch(e => console.log(e.message));
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 9 },
        sm: { span: 10 }
      },
      wrapperCol: {
        xs: { span: 3 },
        sm: { span: 5 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 12
        },
        sm: {
          span: 6,
          offset: 12
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "374"
    })(
      <Select style={{ width: 70 }}>
        <Option value="374">+374</Option>
      </Select>
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
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Last name">
                {getFieldDecorator("lastName", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="E-mail">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Password" hasFeedback>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      min: 8,
                      max: 32,
                      message: "Password must be at least 8 characters!"
                    }
                  ]
                })(<Input.Password />)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Address">
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Address!"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Phone Number">
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!"
                    },
                    {
                      pattern: "^[0-9]+$",
                      message: "Please enter only numbers!"
                    },
                    {
                      len: 8,
                      message: "Phone number must be 8 digits long!"
                    }
                  ]
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col sm={24}>
              <Form.Item label="Upload Passport photo">
                {getFieldDecorator("dragger", {
                  valuePropName: "file",
                  rules: [
                    {
                      required: true,
                      message: "Please Upload Photo!"
                    }
                  ]
                })(
                  <Upload.Dragger
                    onChange={e => this.handleChange(e)}
                    customRequest={dummyRequest}
                    accept=".jpg, .jpeg, .png"
                  >
                    <Icon type="upload" /> Click to Upload
                  </Upload.Dragger>
                )}
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
                  <Button href="/" type="link">
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

export const WrappedRegisterAsCourier = Form.create({ name: "register" })(
  RegisterAsCourier
);
