import { GET_ALL_ADVERTISEMENT_FAIL, GET_ALL_ADVERTISEMENT_REQ, GET_ALL_ADVERTISEMENT_SUCCESS } from "../Constants/constants";

export const getAllAdvertisementReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_ADVERTISEMENT_REQ:
            return { ...state, loading: true };
        case GET_ALL_ADVERTISEMENT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case GET_ALL_ADVERTISEMENT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
