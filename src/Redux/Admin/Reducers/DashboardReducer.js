import { GET_ALL_ADVERTISEMENT_FAIL, GET_ALL_ADVERTISEMENT_REQ, GET_ALL_ADVERTISEMENT_SUCCESS, GET_ALL_QUEUELIST_FAIL, GET_ALL_QUEUELIST_REQ, GET_ALL_QUEUELIST_SUCCESS, GET_DASHBOARD_APPOINTMENT_LIST_FAIL, GET_DASHBOARD_APPOINTMENT_LIST_REQ, GET_DASHBOARD_APPOINTMENT_LIST_SUCCESS, SALON_ONLINE_STATUS_FAIL, SALON_ONLINE_STATUS_REQ, SALON_ONLINE_STATUS_SUCCESS } from "../Constants/constants";

export const getAllAdvertisementReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_ADVERTISEMENT_REQ:
            return {
                ...state,
                resolve: false,
                loading: true
            };
        case GET_ALL_ADVERTISEMENT_SUCCESS:
            return {
                ...state,
                resolve: true,
                loading: false,
                ...action.payload,
            };
        case GET_ALL_ADVERTISEMENT_FAIL:
            return {
                ...state,
                resolve: false,
                loading: false,
                error: action.payload
            };
        case "FILTER_ADVERTISEMENTLIST":

            const filteredAdvertisements = state.advertisements.filter((b) => b._id !== action.payload);

            return {
                ...state,
                advertisements: filteredAdvertisements
            };
        case "AFTER_UPDATE_ADVERTISEMENTLIST":

            const updatedAdvertisements = state.advertisements.map((advertisement) =>
                advertisement._id === action.payload._id
                    ? { ...advertisement, url: action.payload._url }
                    : advertisement
            );

            return {
                ...state,
                advertisements: updatedAdvertisements
            };

        default:
            return state;
    }
};

export const getAllQueueListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_QUEUELIST_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case GET_ALL_QUEUELIST_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case GET_ALL_QUEUELIST_FAIL:
            return {
                ...state,
                loading: false,
                resolve: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const getDashboardAppointmentListReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_DASHBOARD_APPOINTMENT_LIST_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case GET_DASHBOARD_APPOINTMENT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case GET_DASHBOARD_APPOINTMENT_LIST_FAIL:
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

export const adminSalonStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case SALON_ONLINE_STATUS_REQ:
            return {
                ...state,
                loading: true,
                resolve: false
            };
        case SALON_ONLINE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                resolve: true,
                ...action.payload
            };
        case SALON_ONLINE_STATUS_FAIL:
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