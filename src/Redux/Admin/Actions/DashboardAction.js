import toast from "react-hot-toast";
import api from "../../api/Api";
import { GET_ALL_ADVERTISEMENT_FAIL, GET_ALL_ADVERTISEMENT_REQ, GET_ALL_ADVERTISEMENT_SUCCESS, GET_ALL_QUEUELIST_FAIL, GET_ALL_QUEUELIST_REQ, GET_ALL_QUEUELIST_SUCCESS, GET_DASHBOARD_APPOINTMENT_LIST_FAIL, GET_DASHBOARD_APPOINTMENT_LIST_REQ, GET_DASHBOARD_APPOINTMENT_LIST_SUCCESS, SALON_ONLINE_STATUS_FAIL, SALON_ONLINE_STATUS_REQ, SALON_ONLINE_STATUS_SUCCESS } from "../Constants/constants"

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

export const adminSalonStatusAction = (salonStatusdata) => async (dispatch) => {
    try {
        dispatch({ type: SALON_ONLINE_STATUS_REQ })

        const { data } = await api.post(`/api/salon/changeSalonOnlineStatus`, salonStatusdata)

        dispatch({
            type: SALON_ONLINE_STATUS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SALON_ONLINE_STATUS_FAIL,
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

