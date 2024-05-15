import React, { useEffect, useRef, useState } from 'react'
import "./Header.css"
import { MobileCrossIcon, MobileMenuIcon, Notificationicon, Settingsicon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'
import { menudata } from '../menudata.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

  const [loading, setLoading] = useState(false)

  const [togglecheck, setTogglecheck] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleHandler = () => {
    setTogglecheck((prev) => !prev)
  }

  const [sidebarToggle, setSidebarToggle] = useState(false)

  const MobileIconDropRef = useRef()

  useEffect(() => {
    const handleClickMobileIconOutside = (event) => {
      if (
        MobileIconDropRef.current &&
        !MobileIconDropRef.current.contains(event.target)
      ) {
        setSidebarToggle(false)
      }
    };

    document.addEventListener('mousedown', handleClickMobileIconOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickMobileIconOutside);
    };
  }, []);

  console.log(location.pathname)

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
        <div onClick={() => setSidebarToggle(true)}><MobileMenuIcon /></div>

      </div>

      <div
        className={`mobile_sidebar_container ${sidebarToggle ? "mobile_sidebar_active" : "mobile_sidebar_inactive"}`}
        ref={MobileIconDropRef}
      >
        <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

        {
          menudata.map((m) => (
            <div 
            key={m.id}
            className={`${m.url === location?.pathname && "menu_item_active"}`}
            onClick={() => navigate(m?.url)}
            >
              {console.log(m.url)}
              <div style={{
                color: m.url === location?.pathname && " var(--primary-bg-color3)"
              }}>{m.icon}</div>
              <p 
              style={{
                color: m.url === location?.pathname && " var(--primary-bg-color3)"
              }}>{m.title}</p>
            </div>
          ))
        }

        {/* <div>
          <div>icon</div>
          <p>Menu Title</p>
        </div>

        <div>
          <div>icon</div>
          <p>Menu Title</p>
        </div> */}
      </div>
    </header>
  )
}

export default Header