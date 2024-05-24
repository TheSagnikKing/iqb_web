import { ADMIN_GETALLSALON_ICONS_FAIL, ADMIN_GETALLSALON_ICONS_REQ, ADMIN_GETALLSALON_ICONS_SUCCESS, GET_ADMIN_SALONLIST_FAIL, GET_ADMIN_SALONLIST_REQ, GET_ADMIN_SALONLIST_SUCCESS } from "../Constants/constants";

export const getAdminSalonListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ADMIN_SALONLIST_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case GET_ADMIN_SALONLIST_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case GET_ADMIN_SALONLIST_FAIL:
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

export const getAdminAllSalonIconReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GETALLSALON_ICONS_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_GETALLSALON_ICONS_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_GETALLSALON_ICONS_FAIL:
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