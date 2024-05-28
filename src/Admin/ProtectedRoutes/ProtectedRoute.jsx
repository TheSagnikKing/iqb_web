import React, { useEffect, useState } from 'react';
import api from '../../Redux/api/Api'
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS } from '../../Redux/Admin/Constants/constants'

const ProtectedRoute = () => {
    const [loggindata, setloggindata] = useState({});
    const [logginerror, setlogginerror] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        const logginadmin = async () => {
            try {
                const { data } = await api.get('/api/admin/adminloggedin');
                console.log(data)
                setloggindata(data);
                dispatch({
                    type:ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS,
                    payload:data
                })
            } catch (error) {
                if(error?.response?.data?.message === "UnAuthorized Admin" || error?.response?.data?.message === "Forbidden Admin"){
                    localStorage.setItem("userAdminLoggedIn","false")
                    setlogginerror(error?.response?.data?.message)
                }
                
            }
        };

        logginadmin();
    }, [dispatch]);

    let content;

    const navigate = useNavigate()

    const ErrorClickedHandler = () => {
        localStorage.setItem("userAdminLoggedIn","false")
        navigate("/adminsignin")
    }

    if (Object.keys(loggindata).length > 0) {
        // Data is present, render Outlet
        content = <Outlet />;
    } else {
        // Data is not present, render a button or any other UI element
        content = (
            <div className='route_error_container'>
                <button
                 onClick={ErrorClickedHandler}
                 style={{
                    color:logginerror ? "red" : "black"
                 }}
                 >{logginerror ? logginerror : "Loading..."}</button>
            </div>
        );
    }

    return <div>{content}</div>;
};

export default ProtectedRoute;
