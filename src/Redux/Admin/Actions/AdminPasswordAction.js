import toast from "react-hot-toast"
import api from "../../api/Api"
import { ADMIN_FORGET_PASSWORD_FAIL, ADMIN_FORGET_PASSWORD_REQ, ADMIN_FORGET_PASSWORD_SUCCESS } from "../Constants/constants"

export const adminForgetPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_FORGET_PASSWORD_REQ })

        const { data } = await api.post("/api/admin/forget-password",{email:email})

        dispatch({
            type: ADMIN_FORGET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_FORGET_PASSWORD_FAIL,
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

export const adminResetPasswordAction = (password) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_FORGET_PASSWORD_REQ })

        const { data } = await api.post(`/api/admin/reset-password/${token}`,{password:password})

        dispatch({
            type: ADMIN_FORGET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_FORGET_PASSWORD_FAIL,
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