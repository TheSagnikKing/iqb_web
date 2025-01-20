import React from 'react'
import style from './Public.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../Redux/Admin/Reducers/AdminHeaderReducer'

const Public = () => {

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    return (
        <main className={`${style.public_main_container} ${darkmodeOn && style.dark}`}>
            <div className={`${style.public_main_content} ${darkmodeOn && style.dark}`}>

                <div>
                    <img src="./barber_public.png" alt="public_image" />
                </div>

                <div>
                    <div>
                        <p>welcome to iQueueBook</p>

                        <div>
                            <Link to="/adminsignin">Admin Signin</Link>
                            <Link to="/barbersignin">Barber Signin</Link>
                        </div>
                        <div><Link to="/mobilecus">Customer</Link></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Public