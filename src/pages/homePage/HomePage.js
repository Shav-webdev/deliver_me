import React from "react";
import { Button } from 'antd';
import {NavLink} from 'react-router-dom';
// import { RegisterAsCompany } from './'

export default function HomePage() {
    const handleClick = () => {
        console.log('Done');
    }

    return (
        <div>
            Home Page
            <NavLink to="/register/company">
                Sign up as Company
            </NavLink>
            <NavLink to="/register/courier">
                Sign up Courier
            </NavLink>
        </div>
    )
}