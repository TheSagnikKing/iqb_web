import { GET_QUEUELIST_BARBERID_FAIL, GET_QUEUELIST_BARBERID_REQ, GET_QUEUELIST_BARBERID_SUCCESS } from "../Constants/constants";

export const getBarberQueueListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_QUEUELIST_BARBERID_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case GET_QUEUELIST_BARBERID_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case GET_QUEUELIST_BARBERID_FAIL:
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
