import React, { useState } from 'react'
import './Sidebar.css'
import { menudata } from '../menudata.jsx'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Adminqueueicon, LeftArrow, RightArrow } from '../../../icons'
import Header from '../Header/Header.jsx'
import DashboardHeader from '../DashboardHeader/DashboardHeader.jsx'
import Skeleton from 'react-loading-skeleton'

const Sidebar = () => {

  const [showSidebar, setShowSidebar] = useState(true)

  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const handleExternalNavigation = () => {
    window.location.href = 'https://iqb-kiyosk-final.netlify.app'; // external URL
  };

  return (
    <main className='container'>
      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
        <div>
          <p className={showSidebar ? "titleActive" : "titleInActive"}>
            {showSidebar ? <div className='sidebar_top_salon'>
              {
                loading ?
                  <Skeleton count={1} height={"5rem"} width={"5rem"} style={{ borderRadius: "50%" }} /> :
                  <>
                    <div>
                      <img src="https://i.pinimg.com/originals/44/e9/b5/44e9b5cb7c7d37857da5bb5685cf12cb.png" alt="" />
                    </div>
                    <p>IQB</p>
                  </>
              }

            </div> : ""}
          </p>
        </div>

        <div className='menu_items_container'>
          {menudata.map((m) => (
            <div className={`menu_item ${m.url === location?.pathname && "menu_item_active"}`} key={m.id} onClick={() => navigate(m?.url)}

            >
              <p style={{
                color: m.url === location?.pathname && " var(--primary-bg-color3)"
              }}
              >{m.icon}</p>
              <p style={{
                color: m.url === location?.pathname && " var(--primary-bg-color3)"
              }}>{m.title}</p>
            </div>
          ))}

          <div className={`menu_item`}  onClick={handleExternalNavigation}

          >
            <p><Adminqueueicon/></p>
            <p>Queueing</p>
          </div>
        </div>

        <button className='sidebar_toggle_btn' onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
      </div>

      <div className='content'
        style={{
          width: showSidebar ? "calc(100% - 21rem)" : "100%"
        }}
      >
        <div>
          {location?.pathname === "/admin-dashboard" ? <DashboardHeader /> : <Header />}
          <div><Outlet /></div>
        </div>
      </div>

      <div className='mobile_content'
        style={{
          width: "100%"
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