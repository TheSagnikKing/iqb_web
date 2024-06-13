import React, { useState } from 'react'
import './Sidebar.css'
import { menudata } from '../menudata.jsx'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Adminqueueicon, LeftArrow, RightArrow } from '../../../icons'
import Header from '../Header/Header.jsx'
import DashboardHeader from '../DashboardHeader/DashboardHeader.jsx'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'

const Sidebar = () => {

  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    loading: adminGetDefaultSalonLoading,
    resolve: adminGetDefaultSalonResolve,
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon

  console.log("DEEEEEE ", adminGetDefaultSalonResponse)

  const [showSidebar, setShowSidebar] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <main className='container'>
      <div className={`sidebar ${showSidebar ? "show" : "hide"} ${darkmodeOn && "dark"}`}>
        <div>
          <p className={showSidebar ? "titleActive" : "titleInActive"}>
            {showSidebar ? <div className='sidebar_top_salon'>
              {
                adminGetDefaultSalonLoading && !adminGetDefaultSalonResolve ?
                  <Skeleton count={1} height={"5rem"} width={"5rem"} style={{ borderRadius: "50%" }} /> :
                  !adminGetDefaultSalonLoading && adminGetDefaultSalonResolve && adminGetDefaultSalonResponse?.salonLogo.length > 0 ?
                    <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
                      <img src={`${adminGetDefaultSalonResponse?.salonLogo[0]?.url}`} alt="" />
                    </div> :
                    !adminGetDefaultSalonLoading && adminGetDefaultSalonResolve && adminGetDefaultSalonResponse?.salonLogo.length == 0 ?
                      <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" alt="no image" />
                      </div> :
                      !adminGetDefaultSalonLoading && !adminGetDefaultSalonResolve &&
                      <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" alt="no image" />
                      </div> 

              }
              {/* <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
                <img src="https://i.pinimg.com/originals/44/e9/b5/44e9b5cb7c7d37857da5bb5685cf12cb.png" alt="" />
              </div> */}
              <p style={{
                color:darkmodeOn && "var(--primary-text-light-color1)"
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
          width: showSidebar ? "calc(100% - 21rem)" : "100%"
        }}
      >
        <div>
          {location?.pathname === "/admin-dashboard" ? <DashboardHeader /> : <Header />}
          <div><Outlet /></div>
        </div>
      </div>

    </main>
  )
}

export default Sidebar