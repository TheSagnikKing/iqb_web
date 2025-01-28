import toast from "react-hot-toast";
import api from "../../api/Api";
import { CANCEL_APPOINT_FAIL, CANCEL_APPOINT_REQ, CANCEL_APPOINT_SUCCESS, GET_BARBER_APPOINT_LIST_FAIL, GET_BARBER_APPOINT_LIST_REQ, GET_BARBER_APPOINT_LIST_SUCCESS } from "../Constants/constants";

export const AppointmentAction = (appointdata) => async (dispatch) => {
    try {
        dispatch({ type: GET_BARBER_APPOINT_LIST_REQ })

        const { data } = await api.post("/api/appointments/getAllAppointmentsByBarberIdAndDate", appointdata)

        dispatch({
            type: GET_BARBER_APPOINT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        if (error?.response?.status === 500) {
            dispatch({
                type: GET_BARBER_APPOINT_LIST_FAIL,
                payload: "Something went wrong !"
            });

            toast.error("Something went wrong !", {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return;
        }

        dispatch({
            type: GET_BARBER_APPOINT_LIST_FAIL,
            payload: error?.response?.data
        });

        toast.error(error?.response?.data?.message, {
            duration: 3000,
            style: {
                fontSize: "var(--font-size-2)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });
    }
}


export const CancelAppointmentAction = (canceldata) => async (dispatch) => {
    try {
        dispatch({ type: CANCEL_APPOINT_REQ })

        const { data } = await api.post("/api/appointments/barberCancelAppointment", canceldata)

        dispatch({
            type: CANCEL_APPOINT_SUCCESS,
            payload: data
        })

        toast.success("Appointment cancel successfully", {
            duration: 3000,
            style: {
                fontSize: "var(--font-size-2)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });

    } catch (error) {

        if (error?.response?.status === 500) {
            dispatch({
                type: CANCEL_APPOINT_FAIL,
                payload: "Something went wrong !"
            });

            toast.error("Something went wrong !", {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return;
        }

        dispatch({
            type: CANCEL_APPOINT_FAIL,
            payload: error?.response?.data
        });

        toast.error(error?.response?.data?.message, {
            duration: 3000,
            style: {
                fontSize: "var(--font-size-2)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });
    }
}