import toast from "react-hot-toast";
import api from "../../api/Api";
import { ADMIN_APPLY_SALON_FAIL, ADMIN_APPLY_SALON_REQ, ADMIN_APPLY_SALON_SUCCESS, ADMIN_GET_DEFAULT_SALON_FAIL, ADMIN_GET_DEFAULT_SALON_REQ, ADMIN_GET_DEFAULT_SALON_SUCCESS, GET_ALL_ADVERTISEMENT_FAIL, GET_ALL_ADVERTISEMENT_REQ, GET_ALL_ADVERTISEMENT_SUCCESS, GET_ALL_QUEUELIST_FAIL, GET_ALL_QUEUELIST_REQ, GET_ALL_QUEUELIST_SUCCESS, GET_DASHBOARD_APPOINTMENT_LIST_FAIL, GET_DASHBOARD_APPOINTMENT_LIST_REQ, GET_DASHBOARD_APPOINTMENT_LIST_SUCCESS } from "../Constants/constants"

export const getAllAdvertisementAction = (salonId, signal) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_ADVERTISEMENT_REQ
        })
        const { data } = await api.post(`/api/advertisement/getAdvertisements`, { salonId }, { signal });

        dispatch({
            type: GET_ALL_ADVERTISEMENT_SUCCESS,
            payload: data
        });
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_ALL_ADVERTISEMENT_FAIL,
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
};


export const getAllQueueListAction = (salonId, signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_QUEUELIST_REQ })

        const { data } = await api.get(`/api/queue/getQListBySalonId?salonId=${salonId}`, { signal })

        dispatch({
            type: GET_ALL_QUEUELIST_SUCCESS,
            payload: data
        })
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
                type: GET_ALL_QUEUELIST_FAIL,
                payload: error?.response?.data
            });
        }

    }
}

export const getDashboardAppointmentListAction = (salonId, currentDate, signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_DASHBOARD_APPOINTMENT_LIST_REQ })

        const { data } = await api.post(`/api/advertisement/getDashboardAppointmentList`, {
            salonId,
            appointmentDate: currentDate
        }, { signal })

        dispatch({
            type: GET_DASHBOARD_APPOINTMENT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_DASHBOARD_APPOINTMENT_LIST_FAIL,
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

        //calling this so that admin profile get updated and i dont have to refresh the page again
        // const { data: adminloggedindata } = await api.get('/api/admin/adminloggedin');

        // dispatch({
        //     type: ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS,
        //     payload: adminloggedindata
        // })

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


export const adminGetDefaultSalonAction = (salonId, adminEmail, signal,setChooseSalonId,setCurrentActiveSalon) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_DEFAULT_SALON_REQ })

        const { data } = await api.post(`/api/admin/changeDefaultSalonIdofAdmin`, {
            salonId,
            adminEmail
        }, { signal })

        dispatch({
            type: ADMIN_GET_DEFAULT_SALON_SUCCESS,
            payload: data
        })

        //Value ta update korbo
        setCurrentActiveSalon(data?.admin?.salonName)
        setChooseSalonId(data?.admin?.salonId)

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