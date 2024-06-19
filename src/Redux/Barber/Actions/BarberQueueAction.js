import toast from "react-hot-toast";
import api from "../../api/Api";
import { GET_QUEUELIST_BARBERID_FAIL, GET_QUEUELIST_BARBERID_REQ, GET_QUEUELIST_BARBERID_SUCCESS } from "../Constants/constants";

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

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_QUEUELIST_BARBERID_FAIL,
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