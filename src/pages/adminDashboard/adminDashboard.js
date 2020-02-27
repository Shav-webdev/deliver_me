import React, { Component } from 'react';
import { Table } from 'antd';
import { getCompanies } from '../registration/services/services';

const columns = [
    {

    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Last name',
        dataIndex: 'lastName',
    },
    {
        title: 'phone',
        dataIndex: 'phone',
    },
    {
        title: 'Tax Number',
        dataIndex: 'taxNumber'
    },
    {
        title: 'Photo',
        dataIndex: 'photo'
    },
    {
        title: 'User Type',
        dataIndex: 'userType'
    },
    {
        activity: 'Activity',
        dataIndex: 'activity'
    }
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
