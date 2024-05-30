import toast from "react-hot-toast";
import api from "../../api/Api";
import { ADMIN_APPLY_SALON_FAIL, ADMIN_APPLY_SALON_REQ, ADMIN_APPLY_SALON_SUCCESS, ADMIN_GET_DEFAULT_SALON_FAIL, ADMIN_GET_DEFAULT_SALON_REQ, ADMIN_GET_DEFAULT_SALON_SUCCESS } from "../Constants/constants";

export const adminApplySalonAction = (applySalondata) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_APPLY_SALON_REQ
        })
        const { data } = await api.post(`/api/admin/changeDefaultSalonIdofAdmin`, applySalondata);

        dispatch({
            type: ADMIN_APPLY_SALON_SUCCESS,
            payload: data
        });

        window.location.reload()
    } catch (error) {

        dispatch({
            type: ADMIN_APPLY_SALON_FAIL,
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


export const adminGetDefaultSalonAction = (adminEmail, signal,setChooseSalonId,setCurrentActiveSalon) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_DEFAULT_SALON_REQ })

        const { data } = await api.post(`/api/admin/getDefaultSalonByAdmin`, {
            adminEmail
        }, { signal })

        dispatch({
            type: ADMIN_GET_DEFAULT_SALON_SUCCESS,
            payload: data
        })

        //Value ta update korbo
        setCurrentActiveSalon(data?.response?.salonName)
        setChooseSalonId(data?.response?.salonId)

    } catch (error) {

        if (error.name !== 'CanceledError') {


            toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            dispatch({
                type: ADMIN_GET_DEFAULT_SALON_FAIL,
                payload: error?.response?.data
            });
        }

    }
}