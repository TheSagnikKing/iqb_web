import React, { useEffect, useState } from 'react'
import style from './Sidebar.module.css'
import { menudata } from '../menudata.jsx'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LeftArrow, MoonIcon, RightArrow, Sunicon } from '../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import { barberGetSalonLogoAction } from '../../../Redux/Barber/Actions/DashboardAction.js'
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants.js'

const Sidebar = () => {

  const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
  const barberProfile = useSelector(state => state.BarberLoggedInMiddleware.entiredata)

  const dispatch = useDispatch()

  useEffect(() => {
    if (barberProfile?.user[0]?.isApproved && salonId !== 0) {
      dispatch(barberGetSalonLogoAction(salonId))
    }
  }, [salonId, barberProfile, dispatch])

  const barberGetSalonLogo = useSelector(state => state.barberGetSalonLogo)

  const {
    loading: barberGetSalonLogoLoading,
    resolve: barberGetSalonLogoResolve,
    response: barberGetSalonLogoResponse
  } = barberGetSalonLogo

  console.log(barberGetSalonLogoResponse?.salonLogo[0]?.url)

  const [showSidebar, setShowSidebar] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const darkHandler = () => {
      dispatch({ type: DARK_MODE_ON });
      localStorage.setItem("dark", "On");
    }
  
    const lightHandler = () => {
      dispatch({ type: DARK_MODE_OFF });
      localStorage.setItem("dark", "Off");
    }
  
    const toggleHandler = () => {
      if (darkMode == "Off") {
        darkHandler()
      } else {
        lightHandler()
      }
    }

  // console.log("Barber Salon Name ", barberGetSalonLogoResponse?.salonName)

  return (
    <main className={`${style.container} ${darkmodeOn && style.dark}`}>
      <div className={`${style.sidebar} ${showSidebar ? style.show : style.hide} ${darkmodeOn && style.dark}`}>
        <div>
          <div className={showSidebar ? style.titleActive : style.titleInActive}>
            {showSidebar ? <div className={style.sidebar_top_salon}>
              <div onClick={() => navigate("/barber-dashboard")} style={{ cursor: "pointer" }}>
                <img
                  src={barberGetSalonLogoResponse?.salonLogo[0]?.url || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                  alt="salonLogo"
                />
              </div>
              <p style={{
                color: darkmodeOn ? "var(--light-color-4)" : "var(--primary-text-light-color2)"
              }}>{barberGetSalonLogoResponse?.salonName}</p>
            </div> : ""}
          </div>
        </div>

        <div className={style.menu_items_container}>
          {menudata.map((m) => (
            <div className={`${style.menu_item} ${location.pathname.includes(m.url) && `${style.menu_item_active} ${darkmodeOn && style.dark}`} ${darkmodeOn && style.dark}`} key={m.id} onClick={() => navigate(m?.url)}
            >
              <div style={{
                color: location.pathname.includes(m.url) && "var(--light-color-4)"
              }}
              >{m.icon}</div>
              <p style={{
                color: location.pathname.includes(m.url) && "var(--light-color-4)"
              }}>{m.title}</p>
            </div>
          ))}

          <div className={`${style.menu_theme_container} ${darkmodeOn && style.dark}`}
            style={{
              justifyContent: showSidebar ? "space-between" : "center"
            }}
          >
            {
              showSidebar && <p>Theme</p>
            }

            {
              darkmodeOn ?
                <button onClick={toggleHandler}>
                  <Sunicon />
                </button> :
                <button onClick={toggleHandler}>
                  <MoonIcon />
                </button>
            }

          </div>

        </div>

        <button className={style.sidebar_toggle_btn} onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
      </div>

      <div className={`${style.content} ${darkmodeOn && style.dark}`}
        style={{
          width: showSidebar ? "calc(100vw - 20vw)" : "calc(100vw - 4vw)",
        }}
      >
        {/* <div> */}
        <DashboardHeader />
        <div><Outlet /></div>
        {/* </div> */}
      </div>
    </main>
  )
}

export default Sidebar