import React, { useState } from 'react'
import "./DashboardHeader.css"
import { MoonIcon, Notificationicon, Settingsicon, Sunicon } from '../../../icons'

const DashboardHeader = () => {

    const [togglecheck, setTogglecheck] = useState(false)

    const toggleHandler = () => {
        setTogglecheck((prev) => !prev)
    }

    return (
        <div className='admin_dashboard_header_wrapper'>
            <div className='choose_salon_div'>part One</div>
            <div className='profile_wrapper'>
                <div
                    style={{
                        background: togglecheck ? "#75E6A4" : "#ECEBEB"
                    }}
                >
                    <p className={`toggle_btn_text ${togglecheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{togglecheck ? <Sunicon/> : <MoonIcon/>}</p>
                    <button
                        className={`toggle_btn ${togglecheck ? 'toggle_active' : 'toggle_inactive'}`}
                        onClick={toggleHandler}
                    ></button>
                </div>

                <div><Notificationicon /></div>
                <div><Settingsicon /></div>
                <div></div>
            </div>
        </div>
    )
}

export default DashboardHeader