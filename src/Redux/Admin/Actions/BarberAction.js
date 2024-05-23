import toast from "react-hot-toast";
import api from "../../api/Api";
import { ADMIN_ALL_SALON_SERVICES_FAIL, ADMIN_ALL_SALON_SERVICES_REQ, ADMIN_ALL_SALON_SERVICES_SUCCESS, ADMIN_APPROVE_BARBER_FAIL, ADMIN_APPROVE_BARBER_REQ, ADMIN_APPROVE_BARBER_SUCCESS, ADMIN_CREATE_BARBER_FAIL, ADMIN_CREATE_BARBER_REQ, ADMIN_CREATE_BARBER_SUCCESS, ADMIN_UPDATE_BARBER_FAIL, ADMIN_UPDATE_BARBER_REQ, ADMIN_UPDATE_BARBER_SUCCESS, CHANGE_ADMIN_BARBER_ONLINESTATUS_FAIL, CHANGE_ADMIN_BARBER_ONLINESTATUS_REQ, CHANGE_ADMIN_BARBER_ONLINESTATUS_SUCCESS, GET_ADMIN_BARBERLIST_FAIL, GET_ADMIN_BARBERLIST_REQ, GET_ADMIN_BARBERLIST_SUCCESS } from "../Constants/constants";

export const getAdminBarberListAction = (salonId, signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_BARBERLIST_REQ })

        const { data } = await api.post(`/api/barber/getAllBarberBySalonId?salonId=${salonId}`, {}, { signal })

        dispatch({
            type: GET_ADMIN_BARBERLIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_ADMIN_BARBERLIST_FAIL,
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

export const changeAdminBarberOnlineStatusAction = (barberOnlinedata) => async (dispatch) => {
    try {
        dispatch({ type: CHANGE_ADMIN_BARBER_ONLINESTATUS_REQ })

        const { data } = await api.post(`/api/admin/changeBarberOnlineStatus`, barberOnlinedata)

        dispatch({
            type: CHANGE_ADMIN_BARBER_ONLINESTATUS_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: CHANGE_ADMIN_BARBER_ONLINESTATUS_FAIL,
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

export const adminApproveBarberAction = (approvedata) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_APPROVE_BARBER_REQ })

        const { data } = await api.post(`/api/admin/approvedBarber`, approvedata)

        dispatch({
            type: ADMIN_APPROVE_BARBER_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ADMIN_APPROVE_BARBER_FAIL,
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


export const adminAllSalonServicesAction = (salonId, signal) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ALL_SALON_SERVICES_REQ })

        const { data } = await api.get(`/api/admin/allSalonServices?salonId=${salonId}`, { signal })

        dispatch({
            type: ADMIN_ALL_SALON_SERVICES_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: ADMIN_ALL_SALON_SERVICES_FAIL,
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

export const adminCreateBarberAction = (barberdata,navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CREATE_BARBER_REQ })

        const { data } = await api.post(`/api/barber/createBarberByAdmin`, barberdata)

        dispatch({
            type: ADMIN_CREATE_BARBER_SUCCESS,
            payload: data
        })

        navigate("/admin-barberlist")
    } catch (error) {

        dispatch({
            type: ADMIN_CREATE_BARBER_FAIL,
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

export const adminUpdateBarberAction = (barberdata,navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_BARBER_REQ })

        const { data } = await api.put(`/api/barber/updateBarberByAdmin`, barberdata)

        dispatch({
            type: ADMIN_UPDATE_BARBER_SUCCESS,
            payload: data
        })

        navigate("/admin-barberlist")
    } catch (error) {

        dispatch({
            type: ADMIN_UPDATE_BARBER_FAIL,
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