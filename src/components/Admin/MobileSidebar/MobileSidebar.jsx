import React from 'react'
import style from './MobileSidebar.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'

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
          <Header />
          <div><Outlet /></div>
        </div>
      </div>
    </main>
  )
}

export default MobileSidebar