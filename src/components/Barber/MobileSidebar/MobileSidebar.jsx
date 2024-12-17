import React from 'react'
import style from './MobileSidebar.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'
import DashboardHeader from '../DashboardHeader/DashboardHeader.jsx'

const MobileSidebar = () => {

  const location = useLocation()

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <main className={style.container}>
      <div className={`${style.mobile_content} ${darkmodeOn && style.dark}`}
        style={{
          width: "100%"
        }}
      >
        <div>
          {/* {location?.pathname === "/admin-dashboard" ? <DashboardHeader /> : <Header />} */}
          {/* <div>BarberHeader or header</div> */}
          <DashboardHeader />
          <div><Outlet /></div>
        </div>
      </div>
    </main>
  )
}

export default MobileSidebar