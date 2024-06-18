import toast from "react-hot-toast";
import { BARBER_CONNECT_SALON_FAIL, BARBER_CONNECT_SALON_REQ, BARBER_CONNECT_SALON_SUCCESS, BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS, CONNECT_SALON_LIST_FAIL, CONNECT_SALON_LIST_REQ, CONNECT_SALON_LIST_SUCCESS } from "../Constants/constants";
import api from "../../api/Api";

export const connectSalonListAction = () => async (dispatch) => {
    try {
        dispatch({ type: CONNECT_SALON_LIST_REQ })

        const { data } = await api.get(`/api/barber/getAllSalons`)

        dispatch({
            type: CONNECT_SALON_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: CONNECT_SALON_LIST_FAIL,
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

export const barberConnectSalonAction = (connectsalondata) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_CONNECT_SALON_REQ })

        const { data } = await api.post(`/api/barber/connectBarberToSalon`,connectsalondata)

        dispatch({
            type: BARBER_CONNECT_SALON_SUCCESS,
            payload: data
        })

        const { data:barberloggedindata } = await api.get('/api/barber/barberloggedin');

        dispatch({
            type:BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload:barberloggedindata
        })
    } catch (error) {
        dispatch({
            type: BARBER_CONNECT_SALON_FAIL,
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
