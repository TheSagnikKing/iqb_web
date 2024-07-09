import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { menudata } from '../menudata.jsx'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LeftArrow, RightArrow } from '../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import { barberGetSalonLogoAction } from '../../../Redux/Barber/Actions/DashboardAction.js'

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

  const [showSidebar, setShowSidebar] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <main className={`container ${darkmodeOn && "dark"}`}>
      <div className={`sidebar ${showSidebar ? "show" : "hide"} ${darkmodeOn && "dark"}`}>
        <div>
          <p className={showSidebar ? "titleActive" : "titleInActive"}>
            {showSidebar ? <div className='sidebar_top_salon'>
              <div onClick={() => navigate("/barber-dashboard")} style={{ cursor: "pointer" }}>
                <img
                  src={barberGetSalonLogoResponse?.salonLogo[0]?.url || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                  alt=""

                />
              </div>
              <p style={{
                color: darkmodeOn && "var(--primary-text-light-color1)"
              }}>IQB</p>

            </div> : ""}
          </p>
        </div>

        <div className='menu_items_container'>
          {menudata.map((m) => (
            <div className={`menu_item ${location.pathname.includes(m.url) && `menu_item_active ${darkmodeOn && "dark"}`} ${darkmodeOn && "dark"}`} key={m.id} onClick={() => navigate(m?.url)}

            >
              <p style={{
                color: location.pathname.includes(m.url) && " var(--primary-bg-color3)"
              }}
              >{m.icon}</p>
              <p style={{
                color: location.pathname.includes(m.url) && " var(--primary-bg-color3)"
              }}>{m.title}</p>
            </div>
          ))}

        </div>

        <button className='sidebar_toggle_btn' onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
      </div>

      <div className={`content ${darkmodeOn && "dark"}`}
        style={{
          width: showSidebar ? "calc(100vw - 28rem)" : "calc(100vw - 7rem)"
        }}
      >
        <div>
          {/* {location?.pathname === "/barber-dashboard" ? <DashboardHeader /> : <h1>Header</h1>} */}
          <DashboardHeader />
          <div><Outlet /></div>
        </div>
      </div>

    </main>
  )
}

export default Sidebar