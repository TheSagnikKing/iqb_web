import toast from "react-hot-toast";
import api from "../../api/Api";
import { BARBER_SEND_CUSTOMER_MAIL_FAIL, BARBER_SEND_CUSTOMER_MAIL_REQ, BARBER_SEND_CUSTOMER_MAIL_SUCCESS, BARBER_SEND_CUSTOMER_MESSAGE_FAIL, BARBER_SEND_CUSTOMER_MESSAGE_REQ, BARBER_SEND_CUSTOMER_MESSAGE_SUCCESS, GET_BARBER_ALL_CUSTOMERLIST_FAIL, GET_BARBER_ALL_CUSTOMERLIST_REQ, GET_BARBER_ALL_CUSTOMERLIST_SUCCESS } from "../Constants/constants";


export const barberGetAllCustomerListAction = (salonId,isApproved,signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_BARBER_ALL_CUSTOMERLIST_REQ })

        const { data } = await api.get(`/api/customer/getAllCustomersForBarber?salonId=${salonId}&isApproved=${isApproved}`,{ signal })

        dispatch({
            type: GET_BARBER_ALL_CUSTOMERLIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_BARBER_ALL_CUSTOMERLIST_FAIL,
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


export const barberSendCustomerEmailAction = (maildata,setSubject,setMessage,navigate) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_SEND_CUSTOMER_MAIL_REQ })

        const { data } = await api.post(`/api/bulkMessageAndEmails/sendBulkEmails`, maildata)

        dispatch({
            type: BARBER_SEND_CUSTOMER_MAIL_SUCCESS,
            payload: data
        })

        setSubject("")
        setMessage("")
        toast.success(data?.message, {
            duration: 3000,
            style: {
                fontSize: "1.4rem",
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        navigate("/barber-customer")
    } catch (error) {

        dispatch({
            type: BARBER_SEND_CUSTOMER_MAIL_FAIL,
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


export const barberSendCustomerMessageAction = (smsdata,setMessage,navigate) => async (dispatch) => {
    try {
        dispatch({ type: BARBER_SEND_CUSTOMER_MESSAGE_REQ })

        const { data } = await api.post(`/api/bulkMessageAndEmails/sendBulkTextMessages`, smsdata)

        dispatch({
            type: BARBER_SEND_CUSTOMER_MESSAGE_SUCCESS,
            payload: data
        })

        setMessage("")
        toast.success(data?.message, {
            duration: 3000,
            style: {
                fontSize: "1.4rem",
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        navigate("/barber-customer")
    } catch (error) {

        dispatch({
            type: BARBER_SEND_CUSTOMER_MESSAGE_FAIL,
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
