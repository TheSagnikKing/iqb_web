import { ADMIN_ALL_SALON_SERVICES_FAIL, ADMIN_ALL_SALON_SERVICES_REQ, ADMIN_ALL_SALON_SERVICES_SUCCESS, ADMIN_APPROVE_BARBER_FAIL, ADMIN_APPROVE_BARBER_REQ, ADMIN_APPROVE_BARBER_SUCCESS, CHANGE_ADMIN_BARBER_ONLINESTATUS_FAIL, CHANGE_ADMIN_BARBER_ONLINESTATUS_REQ, CHANGE_ADMIN_BARBER_ONLINESTATUS_SUCCESS, GET_ADMIN_BARBERLIST_FAIL, GET_ADMIN_BARBERLIST_REQ, GET_ADMIN_BARBERLIST_SUCCESS } from "../Constants/constants";

export const getAdminBarberListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ADMIN_BARBERLIST_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case GET_ADMIN_BARBERLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case GET_ADMIN_BARBERLIST_FAIL:
            return {
                ...state,
                loading: false,
                resolve: false,
                error: action.payload
            };
        default:
            return state;
    }
}


export const changeAdminBarberOnlineStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_ADMIN_BARBER_ONLINESTATUS_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case CHANGE_ADMIN_BARBER_ONLINESTATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case CHANGE_ADMIN_BARBER_ONLINESTATUS_FAIL:
            return {
                ...state,
                loading: false,
                resolve: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const adminApproveBarberReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_APPROVE_BARBER_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_APPROVE_BARBER_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_APPROVE_BARBER_FAIL:
            return {
                ...state,
                loading: false,
                resolve: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export const adminAllSalonServicesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_ALL_SALON_SERVICES_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_ALL_SALON_SERVICES_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_ALL_SALON_SERVICES_FAIL:
            return {
                ...state,
                loading: false,
                resolve: false,
                error: action.payload
            };
        default:
            return state;
    }
}