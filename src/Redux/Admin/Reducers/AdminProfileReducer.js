import { ADMIN_UPDATE_PROFILE_FAIL, ADMIN_UPDATE_PROFILE_REQ, ADMIN_UPDATE_PROFILE_SUCCESS } from "../Constants/constants";

export const adminUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_PROFILE_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_UPDATE_PROFILE_FAIL:
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