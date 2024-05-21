import toast from "react-hot-toast";
import api from "../../api/Api";
import { ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS } from "../Constants/constants";

export const AdminGoogleloginAction = (token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_REQ
        });

        await api.post(`/api/admin/googleAdminLogin?token=${token}`);

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_SUCCESS,
            payload: { message: "Admin signin successfully" }
        });

        localStorage.setItem("userAdminLoggedIn", "true")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_FAIL,
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

export const AdminLogoutAction = (navigate) => async (dispatch) => {

    try {

        // dispatch({
        //     type: ADMIN_SIGNIN_FAIL,
        //     payload: {}
        // })

        // dispatch({
        //     type: ADMIN_SIGNUP_FAIL,
        //     payload: {}
        // })

        dispatch({
            type: ADMIN_LOGOUT_REQ
        })

        const { data } = await api.post("/api/admin/logout")

        dispatch({
            type: ADMIN_LOGOUT_SUCCESS,
            payload: data
        })

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/adminsignin")
    } catch (error) {
        dispatch({
            type: ADMIN_LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}