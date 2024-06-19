import React, { useState } from 'react'
import './Sidebar.css'
import { menudata } from '../menudata.jsx'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LeftArrow, RightArrow } from '../../../icons'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import DashboardHeader from '../DashboardHeader/DashboardHeader'

const Sidebar = () => {


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
              <div onClick={() => navigate("/barber-dashboard")} style={{ cursor: "pointer" }}>
                <img src="https://i.pinimg.com/originals/44/e9/b5/44e9b5cb7c7d37857da5bb5685cf12cb.png" alt="" />
              </div>
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
          {/* {location?.pathname === "/barber-dashboard" ? <DashboardHeader /> : <h1>Header</h1>} */}
          <DashboardHeader />
          <div><Outlet /></div>
        </div>
      </div>

    </main>
  )
}

export default Sidebar