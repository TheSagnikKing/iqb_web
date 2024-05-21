import {BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS, BARBER_GOOGLE_SIGNIN_REQ, BARBER_GOOGLE_SIGNIN_SUCCESS, BARBER_GOOGLE_SIGNIN_FAIL} from "../Constants/constants";

export const BarberLoggedInMiddlewareReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        default:
            return state;
    }
};

export const BarberGoogleLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_GOOGLE_SIGNIN_REQ:
            return { ...state, loading: true };
        case BARBER_GOOGLE_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_GOOGLE_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};