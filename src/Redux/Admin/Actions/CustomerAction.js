import { GET_ALL_CUSTOMERLIST_FAIL, GET_ALL_CUSTOMERLIST_REQ, GET_ALL_CUSTOMERLIST_SUCCESS } from "../Constants/constants"
import toast from "react-hot-toast";
import api from "../../api/Api";

export const adminGetAllCustomerListAction = (salonId,signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_CUSTOMERLIST_REQ })

        const { data } = await api.get(`/api/customer/getAllCustomers?salonId=${salonId}`,{ signal })

        dispatch({
            type: GET_ALL_CUSTOMERLIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_ALL_CUSTOMERLIST_FAIL,
                payload: error?.response?.data
            });

            toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }

    }
}