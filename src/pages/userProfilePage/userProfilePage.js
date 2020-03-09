import React, { useEffect, useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {
    Button,
    Icon,
    Layout,
    Typography,
    message,
    Upload,
    Form,
    Input,
    Avatar,
    DatePicker,
    Card,
    Collapse,
} from 'antd'
import './profilePage.css'
import history from '../../routes/history'
import List from 'antd/es/list'
import company_avatar from '../../assets/images/company_avatar.png' //change to user avatar
import axios from 'axios'
import Popover from 'antd/es/popover'
import Modal from 'antd/es/modal'
import Menu from 'antd/es/menu'
import moment from 'moment'
import Spinner from '../../components/spiner/spinner'
import { connect } from 'react-redux'
import {
    getUserAllTakenOrdersThunk,
    getUserAllActiveOrdersThunk
} from '../../redux/thunk'
import activeOrdersIcon from '../../assets/images/activeOrdersIcon.svg'
import allOrdersIcon from '../../assets/images/allOrdersIcon.svg'
import doneOrdersIcon from '../../assets/images/doneOrdersIcon.svg'
import logo from '../../assets/images/logo.svg'
import {
    validateEmail,
    validateName,
    validateAddress,
    validatePhoneNumber
} from '../../pages/registration/helpers/validations'
const { Header, Sider, Content } = Layout


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
