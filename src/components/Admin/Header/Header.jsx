import React, { useState } from 'react'
import "./Header.css"
import { Notificationicon, Settingsicon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'

const Header = () => {

  const [loading, setLoading] = useState(false)

  const [togglecheck, setTogglecheck] = useState(false)

  const toggleHandler = () => {
    setTogglecheck((prev) => !prev)
  }



  return (
    <header className='admin_header_wrapper'>
      <div>
        <div
          style={{
            background: togglecheck ? "limegreen" : "#000"
          }}
        >
          <p className={`dashboard_toggle_btn_text ${togglecheck ? 'dashboard_toggle_btn_text_active' : 'dashboard_toggle_btn_text_inactive'}`}>{togglecheck ? "Online" : "Offline"}</p>
          <button
            className={`dashboard_toggle_btn ${togglecheck ? 'dashboard_toggle_active' : 'dashboard_toggle_inactive'}`}
            onClick={toggleHandler}
          ></button>
        </div>
      </div>

      <div className='profile_header_wrapper'>
        <div><Notificationicon /></div>
        <div><Settingsicon /></div>
        {
          loading ?
            <Skeleton count={1}
              height={"4.5rem"}
              width={"4.5rem"}
              style={{
                borderRadius: "50%"
              }}
            /> :
            <div><img src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-in-the-style-of-2d-game-art-image_2884743.jpg" alt="" /></div>
        }

      </div>
    </header>
  )
}

export default Header