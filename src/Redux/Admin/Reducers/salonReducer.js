import { ADMIN_CREATE_SALON_FAIL, ADMIN_CREATE_SALON_REQ, ADMIN_CREATE_SALON_SUCCESS, ADMIN_DELETE_SALON_FAIL, ADMIN_DELETE_SALON_REQ, ADMIN_DELETE_SALON_SUCCESS, ADMIN_EDIT_SALON_FAIL, ADMIN_EDIT_SALON_REQ, ADMIN_EDIT_SALON_SUCCESS, ADMIN_GETALLSALON_ICONS_FAIL, ADMIN_GETALLSALON_ICONS_REQ, ADMIN_GETALLSALON_ICONS_SUCCESS, ADMIN_GET_ALL_CITIES_FAIL, ADMIN_GET_ALL_CITIES_REQ, ADMIN_GET_ALL_CITIES_SUCCESS, ADMIN_GET_ALL_COUNTRIES_FAIL, ADMIN_GET_ALL_COUNTRIES_REQ, ADMIN_GET_ALL_COUNTRIES_SUCCESS, ADMIN_GET_ALL_TIMEZONES_FAIL, ADMIN_GET_ALL_TIMEZONES_REQ, ADMIN_GET_ALL_TIMEZONES_SUCCESS, ADMIN_UPDATE_SALON_SETTINGS_FAIL, ADMIN_UPDATE_SALON_SETTINGS_REQ, ADMIN_UPDATE_SALON_SETTINGS_SUCCESS, GET_ADMIN_SALONLIST_FAIL, GET_ADMIN_SALONLIST_REQ, GET_ADMIN_SALONLIST_SUCCESS } from "../Constants/constants";

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
        case "FILTER_SALONLIST":

            const filteredSalons = state.salons.filter((b) => b._id !== action.payload);

            return {
                ...state,
                salons: filteredSalons
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

export const getAdminAllCountriesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_COUNTRIES_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_GET_ALL_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_GET_ALL_COUNTRIES_FAIL:
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

export const getAdminAllCitiesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_CITIES_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_GET_ALL_CITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_GET_ALL_CITIES_FAIL:
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

export const getAdminAllTimezoneReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GET_ALL_TIMEZONES_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_GET_ALL_TIMEZONES_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_GET_ALL_TIMEZONES_FAIL:
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

export const adminDeleteSalonReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_SALON_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_DELETE_SALON_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_DELETE_SALON_FAIL:
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

export const adminCreateSalonReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_CREATE_SALON_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_CREATE_SALON_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_CREATE_SALON_FAIL:
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

export const adminEditSalonReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_EDIT_SALON_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_EDIT_SALON_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_EDIT_SALON_FAIL:
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

export const adminUpdateSalonSettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_SALON_SETTINGS_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case ADMIN_UPDATE_SALON_SETTINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case ADMIN_UPDATE_SALON_SETTINGS_FAIL:
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