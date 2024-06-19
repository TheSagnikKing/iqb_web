import toast from "react-hot-toast"
import api from "../../api/Api"
import { BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS, BARBER_SEND_VERIFY_EMAIL_FAIL, BARBER_SEND_VERIFY_EMAIL_REQ, BARBER_SEND_VERIFY_EMAIL_SUCCESS, BARBER_UPDATE_PROFILE_FAIL, BARBER_UPDATE_PROFILE_REQ, BARBER_UPDATE_PROFILE_SUCCESS, BARBER_VERIFIED_EMAIL_STATUS_FAIL, BARBER_VERIFIED_EMAIL_STATUS_REQ, BARBER_VERIFIED_EMAIL_STATUS_SUCCESS } from "../Constants/constants"

export const barberUpdateProfileAction = (profiledata,navigate) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_UPDATE_PROFILE_REQ })

        const { data } = await api.put("/api/barber/updateBarberAccountDetails",profiledata)

        dispatch({
            type: BARBER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        //calling this so that admin profile get updated and i dont have to refresh the page again
        const { data:barberloggedindata } = await api.get('/api/barber/barberloggedin');

        dispatch({
            type:BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload:barberloggedindata
        })

        navigate("/barber-dashboard")

    } catch (error) {
        dispatch({
            type: BARBER_UPDATE_PROFILE_FAIL,
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

export const barberSendVerifyEmailAction = (verifyemail,setSendVerificationEmailModal) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_SEND_VERIFY_EMAIL_REQ })

        const { data } = await api.post("/api/barber/sendVerificationCodeForBarberEmail",{email:verifyemail})

        dispatch({
            type: BARBER_SEND_VERIFY_EMAIL_SUCCESS,
            payload: data
        })

        setSendVerificationEmailModal(true)

    } catch (error) {
        dispatch({
            type: BARBER_SEND_VERIFY_EMAIL_FAIL,
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

export const barberVerifiedEmailStatusAction = (verifyemail,otp,setSendVerificationEmailModal,setOtp,setChangeEmailVerifiedState) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_VERIFIED_EMAIL_STATUS_REQ })

        const { data } = await api.post("/api/barber/changeBarberEmailVerifiedStatus",{email:verifyemail,verificationCode:otp})

        dispatch({
            type: BARBER_VERIFIED_EMAIL_STATUS_SUCCESS,
            payload: data
        })

        // //calling this so that admin profile get updated and i dont have to refresh the page again
        // const { data:adminloggedindata } = await api.get('/api/admin/adminloggedin');

        // dispatch({
        //     type:ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS,
        //     payload:adminloggedindata
        // })

        setChangeEmailVerifiedState(true)
        setSendVerificationEmailModal(false)
        setOtp(["","","",""])

    } catch (error) {
        dispatch({
            type: BARBER_VERIFIED_EMAIL_STATUS_FAIL,
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
