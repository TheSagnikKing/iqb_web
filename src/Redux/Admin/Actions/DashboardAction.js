import {GET_ALL_ADVERTISEMENT_FAIL, GET_ALL_ADVERTISEMENT_REQ, GET_ALL_ADVERTISEMENT_SUCCESS} from "../Constants/constants"

export const getAllAdvertisementAction = () => async (dispatch) => {
    try {
        dispatch({
            type:GET_ALL_ADVERTISEMENT_REQ
        })
        const { data } = await api.post(`/api/advertisement/getAdvertisements`,{salonId:3});

        console.log("adver",data)

        dispatch({
            type: GET_ALL_ADVERTISEMENT_SUCCESS,
            payload: data
        });
    } catch (error) {
    
        dispatch({
            type: GET_ALL_ADVERTISEMENT_FAIL,
            payload:error?.response?.data
        });
    }
};