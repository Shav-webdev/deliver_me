import api from '../API'
import {
    createOrderRequest,
    createOrderSuccsess,
    createOrderFailure,
    getCompanyAllOrdersRequest,
    getCompanyAllOrdersSuccess,
    getCompanyAllOrdersFailure,
    getUserAllOrdersRequest,
    getUserAllOrdersSuccess,
    getUserAllOrdersFailure,
    getUserActiveOrdersRequest,
    getUserActiveOrdersSuccess,
    getUserActiveOrdersFailure,
    getUserCompletedOrdersRequest,
    getUserCompletedOrdersSuccess,
    getUserCompletedOrdersFailure
} from '../action'


export const createOrderThunk = data => async dispatch => {
    try {
        dispatch(createOrderRequest())
        const response = await api.createOrder.post(data)
        if (response.status !== 200) {
            throw new Error('Something went wrong, try again')
        }
        dispatch(createOrderSuccsess(response.data))
    } catch (error) {
        dispatch(createOrderFailure())
    }
}

export const getCompanyAllOrdersThunk = id => async dispatch => {
    console.log(id)
    try {
        dispatch(getCompanyAllOrdersRequest())
        const response = await api.getCompanyOrders(id).get(id)
        if (response.status > 300) {
            throw new Error('Something went wrong, try again')
        }
        console.log(response.data)
        dispatch(getCompanyAllOrdersSuccess(response.data))
    } catch (error) {
        console.log(error)
        dispatch(getCompanyAllOrdersFailure())
    }
}

export const getUserAllTakenOrdersThunk = id => async dispatch => {
    console.log(id)
    try {
        dispatch(getUserAllOrdersRequest())
        const response = await api.getUserAllTakenOrders(id).get(id)
        if (response.status > 300) {
            throw new Error('Something went wrong, try again')
        }
        console.log(response.data)
        dispatch(getUserAllOrdersSuccess(response.data))
    } catch (error) {
        console.log(error)
        dispatch(getUserAllOrdersFailure())
    }
}

export const getUserAllActiveOrdersThunk = () => async dispatch => {
    try {
        dispatch(getUserActiveOrdersRequest())
        const response = await api.getUserAllActiveOrders().get()
        if (response.status > 300) {
            throw new Error('Something went wrong, try again')
        }
        console.log(response.data)
        dispatch(getUserActiveOrdersSuccess(response.data))
    } catch (error) {
        console.log(error)
        dispatch(getUserActiveOrdersFailure())
    }
}