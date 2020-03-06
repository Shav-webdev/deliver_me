import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_COMPANY_ALL_ORDERS_REQUEST,
    GET_COMPANY_ALL_ORDERS_SUCCESS,
    GET_COMPANY_ALL_ORDERS_FAILURE,
    GET_COMPANY_ACTIVE_ORDERS_REQUEST,
    GET_COMPANY_ACTIVE_ORDERS_SUCCESS,
    GET_COMPANY_ACTIVE_ORDERS_FAILURE,
    GET_COMPANY_COMPLETED_ORDERS_REQUEST,
    GET_COMPANY_COMPLETED_ORDERS_SUCCESS,
    GET_COMPANY_COMPLETED_ORDERS_FAILURE,
    GET_USER_ALL_ORDERS_REQUEST,
    GET_USER_ALL_ORDERS_SUCCESS,
    GET_USER_ALL_ORDERS_FAILURE,
    GET_USER_ACTIVE_ORDERS_REQUEST,
    GET_USER_ACTIVE_ORDERS_SUCCESS,
    GET_USER_ACTIVE_ORDERS_FAILURE,
    GET_USER_COMPLETED_ORDERS_REQUEST,
    GET_USER_COMPLETED_ORDERS_SUCCESS,
    GET_USER_COMPLETED_ORDERS_FAILURE
} from '../action/constants'

const initialState = {
    createOrderLoading: false,
    orderData: {},
    gettingCompanyAllOrders: false,
    companyAllOrders: [],
    gettingCompanyActiveOrders: false,
    companyActiveOrders: [],
    gettingCompanyCompletedOrders: false,
    companyCompletedOrders: [],
    gettingUserAllOrders: false,
    userAllOrders: [],
    gettingUserActiveOrders: false,
    userActiveOrders: [],
    gettingUserCompletedOrders: false,
    userCompletedOrders: [],
}

export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                createOrderLoading: true,
            }
            case CREATE_ORDER_SUCCESS:
                return {
                    ...state,
                    createOrderLoading: false,
                        orderData: action.payload,
                }
                case CREATE_ORDER_FAILURE:
                    return {
                        ...state,
                        createOrderLoading: false,
                    }

                    case GET_COMPANY_ALL_ORDERS_REQUEST:
                        return {
                            ...state,
                            gettingCompanyAllOrders: true,
                        }
                        case GET_COMPANY_ALL_ORDERS_SUCCESS:
                            return {
                                ...state,
                                gettingCompanyAllOrders: false,
                                    companyAllOrders: action.payload,
                            }
                            case GET_COMPANY_ALL_ORDERS_FAILURE:
                                return {
                                    ...state,
                                    gettingCompanyAllOrders: false,
                                }

                                case GET_COMPANY_ACTIVE_ORDERS_REQUEST:
                                    return {
                                        ...state,
                                        gettingCompanyActiveOrders: true,
                                    }
                                    case GET_COMPANY_ACTIVE_ORDERS_SUCCESS:
                                        return {
                                            ...state,
                                            gettingCompanyActiveOrders: false,
                                                companyActiveOrders: action.payload,
                                        }
                                        case GET_COMPANY_ACTIVE_ORDERS_FAILURE:
                                            return {
                                                ...state,
                                                gettingCompanyActiveOrders: false,
                                            }

                                            case GET_COMPANY_COMPLETED_ORDERS_REQUEST:
                                                return {
                                                    ...state,
                                                    gettingCompanyCompletedOrders: true,
                                                }
                                                case GET_COMPANY_COMPLETED_ORDERS_SUCCESS:
                                                    return {
                                                        ...state,
                                                        gettingCompanyCompletedOrders: false,
                                                            companyCompletedOrders: action.payload,
                                                    }
                                                    case GET_COMPANY_COMPLETED_ORDERS_FAILURE:
                                                        return {
                                                            ...state,
                                                            gettingCompanyCompletedOrders: false,
                                                        }
                                                        default:
                                                            return state
    }
}