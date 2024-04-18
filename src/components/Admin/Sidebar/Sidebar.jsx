import React, { useState } from 'react'
import './Sidebar.css'
import { menudata } from '../menudata.jsx'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LeftArrow, RightArrow } from '../../../icons'

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  console.log(location)

  return (
    <main className='container'>
      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
        <div>
          <p className={showSidebar ? "titleActive" : "titleInActive"}>
            {showSidebar ? <><span>IQB</span>iqueuebarbers</> : ""}
          </p>
        </div>

        <p className={showSidebar ? "titleActive" : "titleInActive"}>OVERVIEW</p>

        <div className='menu_items_container'>
          {menudata.map((m) => (
            <div className='menu_item' key={m.id} onClick={() => navigate(m?.url)}
              style={{
                background: m.url === location?.pathname && " var(--hover-bg-color-1)"
              }}
            >
              <p style={{
                color: m.url === location?.pathname && " var(--primary-text-light-color1)"
              }}
              >{m.icon}</p>
              <p style={{
                color: m.url === location?.pathname && " var(--primary-text-light-color1)"
              }} className={showSidebar ? "titleActive" : "titleInActive"}>{m.title}</p>
            </div>
          ))}
        </div>

        <button className='sidebar_toggle_btn' onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
      </div>
      <div className='content'>
        <div><Outlet /></div>
      </div>
    </main>
  )
}

export default Sidebar