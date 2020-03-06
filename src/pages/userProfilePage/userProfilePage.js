import React, { useState, useEffect } from 'react'
import { Table, Typography, Popover } from 'antd'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    EditFilled,
    CheckCircleFilled,
    CloseCircleFilled,
    DeleteFilled,
} from '@ant-design/icons'
import { Layout, Menu, Icon } from 'antd'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import {
    getUserAllTakenOrdersThunk,
    getUserAllActiveOrdersThunk
} from '../../redux/thunk'
const { Header, Sider, Content } = Layout
const { Column } = Table

const defaultState = {
    collapsed: false,
    isUpdated: false,
}

function userProfilePage() {
    return (
        <div>

        </div>
    )
}
