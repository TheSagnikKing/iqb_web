import { BARBER_SEND_VERIFY_EMAIL_FAIL, BARBER_SEND_VERIFY_EMAIL_REQ, BARBER_SEND_VERIFY_EMAIL_SUCCESS, BARBER_SKIP_PROFILE_FAIL, BARBER_SKIP_PROFILE_REQ, BARBER_SKIP_PROFILE_SUCCESS, BARBER_UPDATE_PROFILE_FAIL, BARBER_UPDATE_PROFILE_REQ, BARBER_UPDATE_PROFILE_SUCCESS, BARBER_VERIFIED_EMAIL_STATUS_FAIL, BARBER_VERIFIED_EMAIL_STATUS_REQ, BARBER_VERIFIED_EMAIL_STATUS_SUCCESS } from "../Constants/constants";

export const barberUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_UPDATE_PROFILE_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case BARBER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case BARBER_UPDATE_PROFILE_FAIL:
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

export const barberSkipProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_SKIP_PROFILE_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case BARBER_SKIP_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case BARBER_SKIP_PROFILE_FAIL:
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

export const barberSendVerifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_SEND_VERIFY_EMAIL_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case BARBER_SEND_VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case BARBER_SEND_VERIFY_EMAIL_FAIL:
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

export const barberVerifiedEmailStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_VERIFIED_EMAIL_STATUS_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case BARBER_VERIFIED_EMAIL_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case BARBER_VERIFIED_EMAIL_STATUS_FAIL:
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