import toast from "react-hot-toast";
import api from "../../api/Api";
import { ADMIN_CREATE_SALON_FAIL, ADMIN_CREATE_SALON_REQ, ADMIN_CREATE_SALON_SUCCESS, ADMIN_DELETE_SALON_FAIL, ADMIN_DELETE_SALON_REQ, ADMIN_DELETE_SALON_SUCCESS, ADMIN_EDIT_SALON_FAIL, ADMIN_EDIT_SALON_REQ, ADMIN_EDIT_SALON_SUCCESS, ADMIN_GETALLSALON_ICONS_FAIL, ADMIN_GETALLSALON_ICONS_REQ, ADMIN_GETALLSALON_ICONS_SUCCESS, ADMIN_GET_ALL_CITIES_FAIL, ADMIN_GET_ALL_CITIES_REQ, ADMIN_GET_ALL_CITIES_SUCCESS, ADMIN_GET_ALL_COUNTRIES_FAIL, ADMIN_GET_ALL_COUNTRIES_REQ, ADMIN_GET_ALL_COUNTRIES_SUCCESS, ADMIN_GET_ALL_TIMEZONES_FAIL, ADMIN_GET_ALL_TIMEZONES_REQ, ADMIN_GET_ALL_TIMEZONES_SUCCESS, ADMIN_UPDATE_SALON_SETTINGS_FAIL, ADMIN_UPDATE_SALON_SETTINGS_REQ, ADMIN_UPDATE_SALON_SETTINGS_SUCCESS, GET_ADMIN_SALONLIST_FAIL, GET_ADMIN_SALONLIST_REQ, GET_ADMIN_SALONLIST_SUCCESS } from "../Constants/constants"

export const getAdminSalonListAction = (email, signal) => async (dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_SALONLIST_REQ })

        const { data } = await api.post(`/api/admin/getAllSalonsByAdmin`, {
            adminEmail: email
        }, { signal })

        dispatch({
            type: GET_ADMIN_SALONLIST_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: GET_ADMIN_SALONLIST_FAIL,
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

export const getAdminAllSalonIconAction = (signal) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GETALLSALON_ICONS_REQ })

        const { data } = await api.get(`/api/icons/getAllIcons`, { signal })

        dispatch({
            type: ADMIN_GETALLSALON_ICONS_SUCCESS,
            payload: data
        })
    } catch (error) {

        if (error.name !== 'CanceledError') {
            dispatch({
                type: ADMIN_GETALLSALON_ICONS_FAIL,
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

export const getAdminAllCountriesAction = (countryname) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_COUNTRIES_REQ })

        const { data } = await api.post(`/api/country/getAllCountries?name=${countryname}`)

        dispatch({
            type: ADMIN_GET_ALL_COUNTRIES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_COUNTRIES_FAIL,
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

export const getAdminAllCitiesAction = (cityname, countrycode) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_CITIES_REQ })

        const { data } = await api.post(`/api/country/getAllCities?countryCode=${countrycode}&cityName=${cityname}`)

        dispatch({
            type: ADMIN_GET_ALL_CITIES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_CITIES_FAIL,
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

export const getAdminAllTimezoneAction = (countrycode) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_TIMEZONES_REQ })

        const { data } = await api.post(`/api/country/getAllTimeZones?countryCode=${countrycode}`)

        dispatch({
            type: ADMIN_GET_ALL_TIMEZONES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_TIMEZONES_FAIL,
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

export const adminDeleteSalonAction = (salonId, salonmongoid) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_SALON_REQ })

        const { data } = await api.post(`/api/salon/deleteSalon`, { salonId: salonId })

        dispatch({
            type: ADMIN_DELETE_SALON_SUCCESS,
            payload: data
        })

        dispatch({
            type: "FILTER_SALONLIST",
            payload: salonmongoid
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_SALON_FAIL,
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

export const adminCreateSalonAction = (salondata,navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CREATE_SALON_REQ })

        const { data } = await api.post("/api/salon/createSalonByAdmin",salondata)

        dispatch({
            type: ADMIN_CREATE_SALON_SUCCESS,
            payload: data
        })

        navigate("/admin-salonlist")

    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_SALON_FAIL,
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


export const adminEditSalonAction = (salondata,navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_EDIT_SALON_REQ })

        const { data } = await api.put("/api/salon/updateSalonBySalonIdAndAdminEmail",salondata)

        dispatch({
            type: ADMIN_EDIT_SALON_SUCCESS,
            payload: data
        })

        navigate("/admin-salonlist")

    } catch (error) {
        dispatch({
            type: ADMIN_EDIT_SALON_FAIL,
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

export const adminUpdateSalonSettingsAction = (appointmentdata,navigate) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_SALON_SETTINGS_REQ })

        const { data } = await api.put("/api/salonSettings/updateSalonSettings",appointmentdata)

        dispatch({
            type: ADMIN_UPDATE_SALON_SETTINGS_SUCCESS,
            payload: data
        })

        navigate("/admin-salonlist")

    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_SALON_SETTINGS_FAIL,
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