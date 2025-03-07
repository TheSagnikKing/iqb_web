// import React, { useEffect, useState } from 'react';
// import style from './Sidebar.module.css';
// // import  MenuData  from '../MenuData.jsx';
// import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { Adminqueueicon, LeftArrow, MoonIcon, RightArrow, Sunicon } from '../../../icons';
// import Header from '../Header/Header.jsx';
// import Skeleton from 'react-loading-skeleton';
// import { useDispatch, useSelector } from 'react-redux';
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js';
// import { IoMoon } from 'react-icons/io5';
// import { MdSunny } from 'react-icons/md';
// import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants.js';
// import MenuData from '../Menudata.jsx';


// const Sidebar = () => {
//   const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon);

//   const {
//     response: adminGetDefaultSalonResponse = {} // Add default value
//   } = adminGetDefaultSalon;

//   const [showSidebar, setShowSidebar] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false);

//   const darkMode = useSelector(darkmodeSelector);


//   const darkHandler = () => {
//     dispatch({ type: DARK_MODE_ON });
//     localStorage.setItem("dark", "On");
//   }

//   const lightHandler = () => {
//     dispatch({ type: DARK_MODE_OFF });
//     localStorage.setItem("dark", "Off");
//   }

//   const toggleHandler = () => {
//     if (darkMode == "Off") {
//       darkHandler()
//     } else {
//       lightHandler()
//     }
//   }

//   const darkmodeOn = darkMode === "On";

//   return (
//     <main className={`${style.container} ${darkmodeOn && style.dark}`}>
//       <div className={`${style.sidebar} ${showSidebar ? style.show : style.hide} ${darkmodeOn && style.dark}`}>
//         <div>
//           <div className={showSidebar ? style.titleActive : style.titleInActive}>
//             {showSidebar ? <div className={`${style.sidebar_top_salon} ${darkmodeOn && style.dark}`}>
//               <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
//                 <img
//                   src={adminGetDefaultSalonResponse?.salonLogo?.[0]?.url || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
//                   alt="salonLogo"
//                 />
//               </div>
//               <p>{adminGetDefaultSalonResponse?.salonName}</p>
//             </div> : ""}
//           </div>
//         </div>

//         <div className={style.menu_items_container}>
//           {MenuData().map((m) => (
//             m.show ? (<div className={`${style.menu_item} ${location.pathname.includes(m.url) && `${style.menu_item_active} ${darkmodeOn && style.dark}`} ${darkmodeOn && style.dark}`} key={m.id} onClick={() => navigate(m?.url)}
//             >
//               <div style={{
//                 color: location.pathname.includes(m.url) && "var(--light-color-4)"
//               }}
//               >{m.icon}</div>
//               <p style={{
//                 color: location.pathname.includes(m.url) && "var(--light-color-4)"
//               }}>{m.title}</p>
//             </div>) : null
//           ))}

//           <div className={`${style.menu_theme_container} ${darkmodeOn && style.dark}`}
//             style={{
//               justifyContent: showSidebar ? "space-between" : "center"
//             }}
//           >
//             {
//               showSidebar && <p>Theme</p>
//             }

//             {
//               darkmodeOn ?
//                 <button onClick={toggleHandler}>
//                   <Sunicon />
//                 </button> :
//                 <button onClick={toggleHandler}>
//                   <MoonIcon />
//                 </button>
//             }

//           </div>
//         </div>

//         <button className={style.sidebar_toggle_btn} onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
//       </div>

//       <div className={`${style.content} ${darkmodeOn && style.dark}`}
//         style={{
//           width: showSidebar ? "calc(100vw - 20vw)" : "calc(100vw - 4vw)",
//         }}
//       >
//         <Header />
//         <div><Outlet /></div>
//       </div>
//     </main>
//   );
// }

// export default Sidebar;


import React, { useState } from 'react'
import style from './Sidebar.module.css'
import { Link, Outlet } from 'react-router-dom'
import Header from '../Header/Header.jsx';
import { AdvertisementIcon, AppointmentIcon, BarberIcon, CustomerIcon, DashboardIcon, MdPaymentIcon, QueueHistoryIcon, QueueIcon, SalonIcon } from '../../../newicons.js';


const Sidebar = () => {

  const [sidebar, setSidebar] = useState(true)

  const sideMenuData = [
    {
      heading: "Dashboards",
      menuItems: [
        {
          id: 1,
          name: "Dashboard",
          icon: <DashboardIcon />
        },
        {
          id: 2,
          name: "Salons",
          icon: <SalonIcon />
        }, ,
        {
          id: 3,
          name: "Barbers",
          icon: <BarberIcon />
        },
        {
          id: 4,
          name: "Customers",
          icon: <CustomerIcon />
        }, ,
        {
          id: 5,
          name: "Advertisements",
          icon: <AdvertisementIcon />
        },
      ]
    },
    {
      heading: "Apps",
      menuItems: [
        {
          id: 1,
          name: "Queue List",
          icon: <QueueIcon />
        },
        {
          id: 2,
          name: "Queue History",
          icon: <QueueHistoryIcon />
        },
        {
          id: 3,
          name: "Appointments",
          icon: <AppointmentIcon />
        },
      ]
    },
    {
      heading: "Other Options",
      menuItems: [
        {
          id: 1,
          name: "Subscription",
          icon: <QueueIcon />
        },
        {
          id: 2,
          name: "Payment history",
          icon: <MdPaymentIcon />
        },
      ]
    },
  ]

  const [activeMenu, setActiveMenu] = useState(true)

  

  return (
    <main className={`${style.main_container}`}>
      <aside
        style={{
          width: sidebar ? "24rem" : "5rem",
        }}
      >
        <header>
          <div>
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beauty-salon-logo-icon%2Cspa-logo%2Cgold-beauty-design-template-05b9bdfd3e13d2230a2846189d9660d4_screen.jpg?ts=1698222841" alt="" />
          </div>
          {
            sidebar ? (<p>Modern Unisex Salon</p>) : null
          }
        </header>

        <nav>
          <ul>
            {sideMenuData.map((section, pIndex) => (
              <li key={section.heading}>
               { sidebar ? <p>{section.heading}</p> : null} 
                <ul>
                  {section.menuItems.map((item, cIndex) => (
                    <li
                      key={item.id}
                      className={`${pIndex === 0 && cIndex == 0 ? style.activeMenu : null}`}>
                      <Link to={"#"}>
                        <span
                        style={{
                          marginInline: sidebar ? "0rem" : "auto"
                        }}
                        >{item.icon}</span> 
                        {
                          sidebar ? item.name : null
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

      <section>
        <Header sidebar={sidebar} setSidebar={setSidebar}/>
        <Outlet />
      </section>
    </main>
  )
}

export default Sidebar