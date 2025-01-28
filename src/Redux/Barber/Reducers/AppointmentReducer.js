import { CANCEL_APPOINT_FAIL, CANCEL_APPOINT_REQ, CANCEL_APPOINT_SUCCESS, GET_BARBER_APPOINT_LIST_FAIL, GET_BARBER_APPOINT_LIST_REQ, GET_BARBER_APPOINT_LIST_SUCCESS } from "../Constants/constants";

export const AppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_BARBER_APPOINT_LIST_REQ:
            return { ...state, loading: true };
        case GET_BARBER_APPOINT_LIST_SUCCESS:
            return { ...state, loading: false, response: action.payload.response, error: null };
        case GET_BARBER_APPOINT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const CancelAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case CANCEL_APPOINT_REQ:
            return { ...state, loading: true };
        case CANCEL_APPOINT_SUCCESS:
            return { ...state, loading: false, response: action.payload.response, error: null };
        case CANCEL_APPOINT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

