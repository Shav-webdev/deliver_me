import React from "react";
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './registerAsCompany.css'

export default function RegisterAsCompany() {
    return (
        <div className='wrapper'>
            <header>Sign up as Company</header>
            <div>
                <Input type='text' id='fistName' placeholder='Add first name...' />
                <Input type='email' id='email' placeholder='Add email address...' />
                <Input type='text' id='address' placeholder='Add address...' />
                <Input type='text' id='phone' placeholder='Add phone number...' />
                <Input type='text' id='tax' placeholder='Add tax number...' />
                <Input type='text' id='activity' placeholder='Add type/activity...' />
                <Input type='password' id='password' placeholder='Add password..' />
                <Button type="primary" shape="round" size='large'>
                    Sign up
                </Button>
            </div>
        </div>
    )
}