import React, { useState } from 'react'
import "./DashboardHeader.css"
import { DropdownIcon, MoonIcon, Notificationicon, Settingsicon, Sunicon } from '../../../icons'

const DashboardHeader = () => {
    const [salonlistdrop, setSalonlistdrop] = useState(false)
    const [togglecheck, setTogglecheck] = useState(false)

    const toggleHandler = () => {
        setTogglecheck((prev) => !prev)
    }

    return (
        <div className='admin_dashboard_header_wrapper'>
            <div className='choose_salon_div'>
                <p>Choose Salon</p>
                <div onClick={() => setSalonlistdrop((prev) => !prev)}>
                    <p>Classic touch</p>
                    <div><DropdownIcon/></div>
                   { salonlistdrop && <div className='dashboard_salon_list_dropdown'>List of salon</div> } 
                </div>
                <button>Apply</button>
            </div>
            <div className='profile_wrapper'>
                <div
                    style={{
                        background: togglecheck ? "#FF8A08" : "#000"
                    }}
                >
                    <p className={`toggle_btn_text ${togglecheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{togglecheck ? <Sunicon /> : <MoonIcon />}</p>
                    <button
                        className={`toggle_btn ${togglecheck ? 'toggle_active' : 'toggle_inactive'}`}
                        onClick={toggleHandler}
                    ></button>
                </div>

                <div><Notificationicon /></div>
                <div><Settingsicon /></div>
                <div><img src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-in-the-style-of-2d-game-art-image_2884743.jpg" alt="" /></div>
            </div>
        </div>
    )
}

export default DashboardHeader