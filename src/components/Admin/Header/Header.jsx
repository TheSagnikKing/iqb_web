import React, { useEffect, useRef, useState } from 'react'
import "./Header.css"
import { Adminqueueicon, LogoutIcon, MobileCrossIcon, MobileMenuIcon, MoonIcon, Notificationicon, ProfileIcon, Settingsicon, Sunicon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'
import { menudata } from '../menudata.jsx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AdminLogoutAction } from '../../../Redux/Admin/Actions/AuthAction.js'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants.js'

const Header = () => {

  const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

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

  // const [src, setSrc] = useState("");

  // useEffect(() => {
  //     if (adminProfile && adminProfile?.profile[0]?.url) {
  //         setSrc(adminProfile?.profile[0]?.url)
  //     } else {
  //         setSrc("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
  //     }
  // }, [adminProfile])

  const profileClicked = () => {
    navigate("/admin-dashboard/editprofile")
    setAdminEditDrop(false)
  }

  const [check, setCheck] = useState(true);
  const darkMode = useSelector(darkmodeSelector)

  const [togglecheck, setTogglecheck] = useState(false)

  const toggleHandler = () => {
    // setTogglecheck((prev) => !prev)
    setTogglecheck((prev) => {
      if (!prev) {
        darkHandler()
      } else {
        lightHandler()
      }
      return !prev
    })
  }

  useEffect(() => {
    if (localStorage.getItem("dark") === "On") {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [])

  const darkHandler = () => {
    setCheck(true)
    dispatch({ type: DARK_MODE_ON });
    localStorage.setItem("dark", "On");
  }

  const lightHandler = () => {
    setCheck(false)
    dispatch({ type: DARK_MODE_OFF });
    localStorage.setItem("dark", "Off");
  }


  const currentmode = darkMode === "Off"

  const darkmodeOn = darkMode === "On"
  return (
    <header className='admin_header_wrapper'>
      <div style={{
        border: darkmodeOn && "1px solid var(--primary-text-light-color1)",
        borderRadius: darkmodeOn && "2rem"
      }}>
        <div
          style={{
            background: currentmode ? "#FF8A08" : "#000"
          }}
        >
          <p className={`dashboard_toggle_btn_text ${currentmode ? 'dashboard_toggle_btn_text_active' : 'dashboard_toggle_btn_text_inactive'}`}>{currentmode ? <Sunicon /> : <MoonIcon />}</p>
          <button
            className={`dashboard_toggle_btn ${currentmode ? 'dashboard_toggle_active' : 'dashboard_toggle_inactive'}`}
            onClick={toggleHandler}
          ></button>
        </div>
      </div>

      <div />

      <div className={`profile_header_wrapper ${darkmodeOn && "dark"}`}>

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
                src={adminProfile?.profile[0]?.url}
                onError={() => setSrc('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')}
                alt="admin-profile"
                onClick={() => setAdminEditDrop((prev) => !prev)}
                ref={adminEditIconRef}
              />

              {
                adminEditDrop && <div ref={adminEditDropRef}
                  className={`profile_drop_container ${darkmodeOn && "dark"}`}
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
        className={`mobile_sidebar_container ${sidebarToggle ? "mobile_sidebar_active" : "mobile_sidebar_inactive"} ${darkmodeOn && "dark"}`}
        ref={MobileIconDropRef}
      >
        <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

        {
          menudata.map((m) => (
            <div
              key={m.id}
              className={`${location.pathname.includes(m.url) && `mobile_menu_item_active ${darkmodeOn && "dark"}`}`}
              onClick={() => {
                navigate(m?.url)
                setSidebarToggle(false)
              }}
            >
              <div style={{
                color: location.pathname.includes(m.url) && " var(--primary-bg-color3)"
              }}>{m.icon}</div>
              <p
                style={{
                  color: location.pathname.includes(m.url) && " var(--primary-bg-color3)"
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

        <div className='dashboard_theme_container'>
          <p>Theme</p>
          <div
            style={{
              background: currentmode ? "#FF8A08" : "#000"
            }}
          >
            <p className={`toggle_btn_text ${currentmode ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{currentmode ? <Sunicon /> : <MoonIcon />}</p>
            <button
              className={`toggle_btn ${currentmode ? 'toggle_active' : 'toggle_inactive'}`}
              onClick={toggleHandler}
            ></button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header