import { ADMIN_UPDATE_PROFILE_FAIL, ADMIN_UPDATE_PROFILE_REQ, ADMIN_UPDATE_PROFILE_SUCCESS } from "../Constants/constants";
import api from "../../api/Api";
import toast from "react-hot-toast";

export const adminUpdateProfileAction = (profiledata) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_PROFILE_REQ })

        const { data } = await api.post("/api/admin/updateAdminAcoountDetails",profiledata)

        dispatch({
            type: ADMIN_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PROFILE_FAIL,
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