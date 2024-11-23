import toast from "react-hot-toast";
import api from "../../api/Api";
import { BARBER_BARBER_SERVED_QUEUE_FAIL, BARBER_BARBER_SERVED_QUEUE_REQ, BARBER_BARBER_SERVED_QUEUE_SUCCESS, BARBER_CANCEL_QUEUE_FAIL, BARBER_CANCEL_QUEUE_REQ, BARBER_CANCEL_QUEUE_SUCCESS, GET_QUEUELIST_BARBERID_FAIL, GET_QUEUELIST_BARBERID_REQ, GET_QUEUELIST_BARBERID_SUCCESS } from "../Constants/constants";

export const getBarberQueueListAction = (salonId, barberId, signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_QUEUELIST_BARBERID_REQ })

        const { data } = await api.post("/api/queue/getQlistByBarberId", {
            salonId,
            barberId
        }, { signal })

        dispatch({
            type: GET_QUEUELIST_BARBERID_SUCCESS,
            payload: data
        })

    } catch (error) {

        if (error?.response?.status === 500) {
            dispatch({
                type: GET_QUEUELIST_BARBERID_FAIL,
                payload: "Something went wrong !"
            });

            toast.error("Something went wrong !", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return;
        }

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_QUEUELIST_BARBERID_FAIL,
                payload: error?.response?.data
            });

            toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }

}

export const barberServeQueueAction = (barberqueuedata, salonId, barberId) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_BARBER_SERVED_QUEUE_REQ })

        const { data } = await api.post("/api/queue/barberServedQueue", barberqueuedata)

        dispatch({
            type: BARBER_BARBER_SERVED_QUEUE_SUCCESS,
            payload: data
        })

        toast.success("Customer serve successfully", {
            duration: 3000,
            style: {
                fontSize: "var(--list-modal-header-normal-font)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });


        const { data: queuelistdata } = await api.post("/api/queue/getQlistByBarberId", {
            salonId,
            barberId
        })

        dispatch({
            type: GET_QUEUELIST_BARBERID_SUCCESS,
            payload: queuelistdata
        })

    } catch (error) {

        if (error?.response?.status === 500) {
            dispatch({
                type: BARBER_BARBER_SERVED_QUEUE_FAIL,
                payload: "Something went wrong !"
            });

            toast.error("Something went wrong !", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return;
        }

        dispatch({
            type: BARBER_BARBER_SERVED_QUEUE_FAIL,
            payload: error?.response?.data
        });

        toast.error(error?.response?.data?.message, {
            duration: 3000,
            style: {
                fontSize: "var(--list-modal-header-normal-font)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });
    }
}

export const barberCancelQueueAction = (canceldata, salonId, barberId) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_CANCEL_QUEUE_REQ })

        const { data } = await api.post(`/api/queue/cancelQ`, canceldata)

        dispatch({
            type: BARBER_CANCEL_QUEUE_SUCCESS,
            payload: data
        })

        toast.success("Customer cancel successfully", {
            duration: 3000,
            style: {
                fontSize: "var(--list-modal-header-normal-font)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });


        const { data: queuelistdata } = await api.post("/api/queue/getQlistByBarberId", {
            salonId,
            barberId
        })

        dispatch({
            type: GET_QUEUELIST_BARBERID_SUCCESS,
            payload: queuelistdata
        })

    } catch (error) {

        if (error?.response?.status === 500) {
            dispatch({
                type: BARBER_CANCEL_QUEUE_FAIL,
                payload: "Something went wrong !"
            });

            toast.error("Something went wrong !", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return;
        }

        dispatch({
            type: BARBER_CANCEL_QUEUE_FAIL,
            payload: error?.response?.data
        });

        toast.error(error?.response?.data?.message, {
            duration: 3000,
            style: {
                fontSize: "var(--list-modal-header-normal-font)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });
    }
}