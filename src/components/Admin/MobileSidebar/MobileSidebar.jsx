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
import { Modal } from '@mui/material'
import { AdvertisementIcon, AppointmentIcon, BarberIcon, CustomerIcon, DashboardIcon, MdPaymentIcon, QueueHistoryIcon, QueueIcon, SalonIcon } from '../../../newicons.js';

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
          icon: <MdPaymentIcon />
        },
      ]
    },
  ]

  const navigate = useNavigate()

  return (
    <section className={`${style.mobile_container}`}>
      <Header mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
      <Outlet />

      {/* {
        mobileSidebar ? (<aside>
          <div style={{
            width: mobileSidebar ? "24rem" : "0rem",
            transition: "width 0.3s ease-in-out"
          }}>
            <button onClick={() => setMobileSidebar((prev) => !prev)}>close</button>
            <h1>Sidebar</h1>
          </div>
        </aside>) : null
      } */}

      <Modal
        open={mobileSidebar}
        onClose={() => setMobileSidebar(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <aside>
          <header>
            <div>
              <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beauty-salon-logo-icon%2Cspa-logo%2Cgold-beauty-design-template-05b9bdfd3e13d2230a2846189d9660d4_screen.jpg?ts=1698222841" alt="" />
            </div>
            {
              mobileSidebar ? (<p>Modern Unisex Salon</p>) : null
            }
          </header>

          <nav>
            <ul>
              {sideMenuData.map((section, pIndex) => (
                <li key={section.heading}>
                  {mobileSidebar ? <p>{section.heading}</p> : null}
                  <ul>
                    {section.menuItems.map((item, cIndex) => (
                      <li
                        key={item.id}
                        className={`${location.pathname.includes(item?.url) ? style.activeMenu : ""}`}
                      >
                        <Link
                          to={item?.url}
                          onClick={() => {
                            setMobileSidebar(false)
                          }}
                        >
                          <span
                            style={{
                              marginInline: mobileSidebar ? "0rem" : "auto"
                            }}
                          >{item.icon}</span>
                          {
                            mobileSidebar ? item.name : null
                          }
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

        </aside>
      </Modal>

    </section>
  )
}

export default MobileSidebar