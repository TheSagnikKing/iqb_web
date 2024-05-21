import toast from "react-hot-toast";
import api from "../../api/Api";
import { BARBER_GOOGLE_SIGNIN_FAIL, BARBER_GOOGLE_SIGNIN_REQ, BARBER_GOOGLE_SIGNIN_SUCCESS } from "../Constants/constants";

export const BarberGoogleloginAction = (token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post(`/api/barber/googleBarberLogin?token=${token}`);

        dispatch({
            type: BARBER_GOOGLE_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "true")

        navigate("/barber-dashboard")

    } catch (error) {

        dispatch({
            type: BARBER_GOOGLE_SIGNIN_FAIL,
            payload: error.response.data
        });

        toast.error(error?.response?.data?.message, {
            duration: 3000,
            style: {
                fontSize: "1.4rem",
                borderRadius: '1rem',
                background: '#333',
                color: '#fff',
            },
        });
    }
};