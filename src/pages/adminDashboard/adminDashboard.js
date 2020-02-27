import React, { Component } from 'react';
import { Table } from 'antd';
import { getCompanies, signIn } from '../registration/services/services';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'last name',
        dataIndex: 'lastName',
    },
    {
        title: 'phone',
        dataIndex: 'phone',
    },
];



const dataSource = [];

export default class AdminDashboard extends Component {
    
    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={columns} />;
            </div>
        )
    }
}
