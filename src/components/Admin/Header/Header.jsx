import React, { useEffect, useRef, useState } from 'react'
import "./Header.css"
import { Adminqueueicon, LogoutIcon, MobileCrossIcon, MobileMenuIcon, Notificationicon, ProfileIcon, Settingsicon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'
import { menudata } from '../menudata.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AdminLogoutAction } from '../../../Redux/Admin/Actions/AuthAction.js'

const Header = () => {

  const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

  const [loading, setLoading] = useState(false)
  const [togglecheck, setTogglecheck] = useState(false)

  const dispatch = useDispatch()
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

  // console.log(location.pathname)

  const [adminEditDrop, setAdminEditDrop] = useState(false)

  const adminEditDropHandler = () => {
    setAdminEditDrop((prev) => !prev)
  }


  const adminEditIconRef = useRef()
  const adminEditDropRef = useRef()

  useEffect(() => {
    const handleClickProfileOutside = (event) => {
      if (
        adminEditIconRef.current &&
        adminEditDropRef.current &&
        !adminEditIconRef.current.contains(event.target) &&
        !adminEditDropRef.current.contains(event.target)
      ) {
        setAdminEditDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickProfileOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickProfileOutside);
    };
  }, []);


  const logoutHandler = async () => {
    dispatch(AdminLogoutAction(navigate))
  }

  const [src, setSrc] = useState(adminProfile?.profile[0]?.url || 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg');

  const profileClicked = () => {
    navigate("/admin-dashboard/editprofile")
    setAdminEditDrop(false)
  }
  return (
    <header className='admin_header_wrapper'>
      {/* <div>
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
      </div> */}
      <div />

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
            <div>
              <img
                src={src}
                onError={() => setSrc('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')}
                alt=""
                onClick={() => setAdminEditDrop((prev) => !prev)}
                ref={adminEditIconRef}
              />

              {
                adminEditDrop && <div ref={adminEditDropRef}
                  className="profile_drop_container"
                >

                  <div>
                    <div><ProfileIcon /></div>
                    <div onClick={() => profileClicked()}>My Profile</div>
                  </div>
                  <div>
                    <div><LogoutIcon /></div>
                    <div onClick={logoutHandler}>Logout</div>
                  </div>
                </div>
              }
            </div>
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
              className={`${m.url === location?.pathname && "mobile_menu_item_active"}`}
              onClick={() => {
                navigate(m?.url)
                setSidebarToggle(false)
              }}
            >
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


        <div onClick={() => navigate("/admin-dashboard/editprofile")}>
          <div><ProfileIcon /></div>
          <p>Profile</p>
        </div>
        <div onClick={() => dispatch(AdminLogoutAction(navigate))}>
          <div><LogoutIcon /></div>
          <p>Logout</p>
        </div>
      </div>
    </header>
  )
}

export default Header