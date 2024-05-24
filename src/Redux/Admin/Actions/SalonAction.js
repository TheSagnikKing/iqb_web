import toast from "react-hot-toast";
import api from "../../api/Api";
import { ADMIN_GETALLSALON_ICONS_FAIL, ADMIN_GETALLSALON_ICONS_REQ, ADMIN_GETALLSALON_ICONS_SUCCESS, GET_ADMIN_SALONLIST_FAIL, GET_ADMIN_SALONLIST_REQ, GET_ADMIN_SALONLIST_SUCCESS } from "../Constants/constants"

export const getAdminSalonListAction = (email, signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_SALONLIST_REQ })

        const { data } = await api.post(`/api/admin/getAllSalonsByAdmin`, {
            adminEmail: email
        }, { signal })

        dispatch({
            type: GET_ADMIN_SALONLIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_ADMIN_SALONLIST_FAIL,
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

export const getAdminAllSalonIconAction = (signal) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GETALLSALON_ICONS_REQ })

        const { data } = await api.get(`/api/icons/getAllIcons`,{ signal })

        dispatch({
            type: ADMIN_GETALLSALON_ICONS_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: ADMIN_GETALLSALON_ICONS_FAIL,
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