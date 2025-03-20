// import React from 'react'
// import style from './MobileSidebar.module.css'
// import { Outlet, useLocation } from 'react-router-dom'
// import Header from '../Header/Header.jsx'
// import { useSelector } from 'react-redux'
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'

// const MobileSidebar = () => {

//   const location = useLocation()

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   return (
//     <main className={style.container}>
//       <div className={`${style.mobile_content} ${darkmodeOn && style.dark}`}
//         style={{
//           width: "100%"
//         }}
//       >
//         <div>
//           <Header />
//           <div><Outlet /></div>
//         </div>
//       </div>
//     </main>
//   )
// }

// export default MobileSidebar


import React, { useState } from 'react'
import style from './MobileSidebar.module.css'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'
import { ClickAwayListener, Modal } from '@mui/material'
import { AdvertisementIcon, AppointmentIcon, BarberIcon, ChangeSalonIcon, CustomerIcon, DashboardIcon, MdPaymentIcon, QueueHistoryIcon, QueueIcon, ReportIcon, SalonIcon } from '../../../newicons.js';
import Switch from "react-switch";

const MobileSidebar = () => {

  const location = useLocation()

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const [mobileSidebar, setMobileSidebar] = useState(false)

  const sideMenuData = [
    {
      heading: "Dashboards",
      menuItems: [
        {
          id: 1,
          name: "Dashboard",
          icon: <DashboardIcon />,
          url: "/admin-dashboard",
        },
        {
          id: 2,
          name: "Salons",
          icon: <SalonIcon />,
          url: "/admin-salon",
        },
        {
          id: 3,
          name: "Barbers",
          icon: <BarberIcon />,
          url: "/admin-barber",
        },
        {
          id: 4,
          name: "Customers",
          icon: <CustomerIcon />,
          url: "/admin-customer",
        }, ,
        {
          id: 5,
          name: "Advertisements",
          icon: <AdvertisementIcon />,
          url: "/admin-advertise",
        },
      ]
    },
    {
      heading: "Apps",
      menuItems: [
        {
          id: 1,
          name: "Queue List",
          icon: <QueueIcon />,
          url: "/admin-queue",
        },
        {
          id: 2,
          name: "Queue History",
          icon: <QueueHistoryIcon />,
          url: "/admin-quehistory",
        },
        {
          id: 3,
          name: "Appointments",
          icon: <AppointmentIcon />,
          url: "/admin-appointments",
        },
        {
          id: 4,
          name: "Reports",
          icon: <ReportIcon />,
          url: "/admin-reports",
        },
      ]
    },
    {
      heading: "Other Options",
      menuItems: [
        {
          id: 1,
          name: "Subscription",
          icon: <QueueIcon />,
          url: "/admin-subscription",
        },
        {
          id: 2,
          name: "Payment history",
          icon: <MdPaymentIcon />,
          url: "/admin-paymentstatus"
        },
      ]
    },
    {
      heading: "Settings",
      menuItems: [
        {
          id: 1,
          name: "Change Salon", // Click korle select modal open hbe
          icon: <ChangeSalonIcon />,
        },
      ]
    },
  ]

  const navigate = useNavigate()

  const [online, setOnline] = useState(false)

  return (
    <section className={`${style.mobile_container}`}>
      <Header mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
      <Outlet />

      <aside
        style={{
          transform: mobileSidebar ? "translateX(0)" : "translateX(-100vw)",
          transition: mobileSidebar ? "transform 0.3s ease" : "transform 0s",
        }}
      >
        {mobileSidebar ? (
          <ClickAwayListener onClickAway={() => setMobileSidebar(false)}>
            <div className={`${style.aside_container}`}>
              <header>
                <div>
                  <img
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beauty-salon-logo-icon%2Cspa-logo%2Cgold-beauty-design-template-05b9bdfd3e13d2230a2846189d9660d4_screen.jpg?ts=1698222841"
                    alt=""
                  />
                </div>
                {mobileSidebar ? <p>Modern Unisex Salon</p> : null}
              </header>

              <nav>
                <ul>
                  {sideMenuData.map((section) => (
                    <li key={section.heading}>
                      {mobileSidebar ? <p>{section.heading}</p> : null}
                      <ul>
                        {section.menuItems.map((item) => (
                          <li
                            key={item.id}
                            className={`${location.pathname.includes(item?.url)
                                ? style.activeMenu
                                : ""
                              }`}
                          >
                            <Link
                              to={item?.url}
                              onClick={() => {
                                setMobileSidebar(false);
                              }}
                            >
                              <span
                                style={{
                                  marginInline: mobileSidebar ? "0rem" : "auto",
                                }}
                              >
                                {item.icon}
                              </span>
                              {mobileSidebar ? item.name : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>

                <div className={`${style.online_container}`}>
                  <p>{online ? "Online" : "Offline"}</p>
                  <Switch
                    width={45}
                    height={18}
                    handleDiameter={14}
                    offColor="#F44336"
                    onColor="#00A36C"
                    uncheckedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: "1rem",
                          color: "#F4F4F5",
                          paddingRight: "1px",
                        }}
                      >
                        OFF
                      </div>
                    }
                    checkedIcon={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          fontSize: "1rem",
                          color: "#F4F4F5",
                        }}
                      >
                        ON
                      </div>
                    }
                    onChange={() => setOnline((prev) => !prev)}
                    checked={online}
                  />
                </div>

              </nav>
            </div>
          </ClickAwayListener>
        ) : null}
      </aside>




    </section>
  )
}

export default MobileSidebar