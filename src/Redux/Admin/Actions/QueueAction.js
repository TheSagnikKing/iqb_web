import toast from "react-hot-toast"
import { ADMIN_BARBER_SERVED_QUEUE_REQ,ADMIN_BARBER_SERVED_QUEUE_SUCCESS,ADMIN_BARBER_SERVED_QUEUE_FAIL, ADMIN_CANCEL_QUEUE_REQ, ADMIN_CANCEL_QUEUE_SUCCESS, ADMIN_CANCEL_QUEUE_FAIL } from "../Constants/constants"
import api from "../../api/Api"

export const adminServeQueueAction = (barberqueuedata) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_BARBER_SERVED_QUEUE_REQ })

        const { data } = await api.post("/api/admin/barberServedQueue",barberqueuedata)

        dispatch({
            type: ADMIN_BARBER_SERVED_QUEUE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_BARBER_SERVED_QUEUE_FAIL,
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

export const adminCancelQueueAction = (canceldata) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CANCEL_QUEUE_REQ })

        const { data } = await api.post(`/api/queue/cancelQ`, canceldata)

        dispatch({
            type: ADMIN_CANCEL_QUEUE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_CANCEL_QUEUE_FAIL,
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