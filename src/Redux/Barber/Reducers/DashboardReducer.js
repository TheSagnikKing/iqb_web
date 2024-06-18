import { BARBER_CONNECT_SALON_FAIL, BARBER_CONNECT_SALON_REQ, BARBER_CONNECT_SALON_SUCCESS, CONNECT_SALON_LIST_FAIL, CONNECT_SALON_LIST_REQ, CONNECT_SALON_LIST_SUCCESS } from "../Constants/constants";

export const connectSalonListReducer = (state = {}, action) => {
    switch (action.type) {
        case CONNECT_SALON_LIST_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case CONNECT_SALON_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case CONNECT_SALON_LIST_FAIL:
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

export const barberConnectSalonReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_CONNECT_SALON_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case BARBER_CONNECT_SALON_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case BARBER_CONNECT_SALON_FAIL:
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