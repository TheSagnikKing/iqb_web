import React from 'react'
import './MobileSidebar.css'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'

const MobileSidebar = () => {

  const location = useLocation()

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <main className='container'>
      <div className={`mobile_content ${darkmodeOn && "dark"}`}
        style={{
          width: "100%"
        }}
      >
        <div>
          {/* {location?.pathname === "/admin-dashboard" ? <DashboardHeader /> : <Header />} */}
          {/* <div>BarberHeader or header</div> */}
          <div><Outlet /></div>
        </div>
      </div>
    </main>
  )
}

export default MobileSidebar