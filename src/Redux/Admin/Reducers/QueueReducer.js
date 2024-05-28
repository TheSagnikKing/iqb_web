import { ADMIN_BARBER_SERVED_QUEUE_FAIL, ADMIN_BARBER_SERVED_QUEUE_REQ, ADMIN_BARBER_SERVED_QUEUE_SUCCESS, ADMIN_CANCEL_QUEUE_FAIL, ADMIN_CANCEL_QUEUE_REQ, ADMIN_CANCEL_QUEUE_SUCCESS } from "../Constants/constants";

export const adminServeQueueReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_BARBER_SERVED_QUEUE_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_BARBER_SERVED_QUEUE_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_BARBER_SERVED_QUEUE_FAIL:
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

export const adminCancelQueueReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CANCEL_QUEUE_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_CANCEL_QUEUE_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_CANCEL_QUEUE_FAIL:
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