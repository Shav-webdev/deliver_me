import React, {useCallback, useState} from "react";
import {Form, Icon, Input, Button} from 'antd';
import './login.css'
import {signIn} from "../../pages/registration/services/services";
import Spinner from "../../components/spiner/spinner";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = useCallback(e => {
        setEmail(e.target.value)
    }, []);

    const handlePasswordChange = useCallback(e => {
        setPassword(e.target.value)
    }, []);

    const handleSubmit = e => {
        setLoading(true);
        e.preventDefault();

        // if (!err) {
        //
        //     let url = (values["signInAs"] === "courier") ?
        //         "https://thawing-ravine-80499.herokuapp.com/login-user"
        //         : "https://thawing-ravine-80499.herokuapp.com/login-company";
        //
        //     signIn(url, values, "/profile");
        //     this.setState({
        //         loading:false,
        //     })
        //
        //
        // }
    };


    if (loading) {
        return <Spinner/>
    }
    return (
        <div className="login_wrapper">
            <h2>Sign in</h2>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    <Input
                        onChange={e => handleEmailChange(e)}
                        value={email}
                        placeholder="Email"
                        prefix={
                            <Icon type="mail"
                                  style={{color: 'rgba(0,0,0,.25)'}}/>}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        onChange={e => handlePasswordChange(e)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      />
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

export default LoginForm;