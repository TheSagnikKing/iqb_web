// import React, { useEffect, useRef, useState } from 'react'
// import style from "./Header.module.css"
// import Skeleton from 'react-loading-skeleton'
// import { DropdownIcon, LogoutIcon, MobileCrossIcon, MobileMenuIcon, MoonIcon, Notificationicon, ProfileIcon, Settingsicon, Sunicon } from '../../../icons'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { AdminLogoutAction } from '../../../Redux/Admin/Actions/AuthAction'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'
// import { adminApplySalonAction, adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction'
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
// import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants'
// import { adminSalonStatusAction } from '../../../Redux/Admin/Actions/DashboardAction'
// import { ClickAwayListener, Modal } from '@mui/material'
// import { MdSunny } from 'react-icons/md'
// import { IoMoon } from 'react-icons/io5'
// import MenuData from '../Menudata.jsx'

// const DashboardHeader = () => {

//   const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])
//   const adminEmail = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//   const [salonlistdrop, setSalonlistdrop] = useState(false)

//   const [loading, setLoading] = useState(false)

//   const salonlistRef = useRef()

//   useEffect(() => {
//     let salondropHandler = (e) => {
//       if (salonlistRef.current && !salonlistRef.current.contains(e.target)) {
//         console.log(salonlistRef.current.contains(e.target))
//         setSalonlistdrop(false)
//       }
//     }

//     document.addEventListener('mousedown', salondropHandler)

//     return () => {
//       document.removeEventListener('mousedown', salondropHandler)
//     }
//   }, [])


//   const [mobiledrop, setMobileDrop] = useState(false)
//   const [sidebarToggle, setSidebarToggle] = useState(false)

//   const dispatch = useDispatch()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const MobileIconDropRef = useRef()

//   useEffect(() => {
//     const handleClickMobileIconOutside = (event) => {
//       if (
//         MobileIconDropRef.current &&
//         !MobileIconDropRef.current.contains(event.target)
//       ) {
//         setSidebarToggle(false)
//       }
//     };

//     document.addEventListener('mousedown', handleClickMobileIconOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickMobileIconOutside);
//     };
//   }, []);

//   const [adminEditDrop, setAdminEditDrop] = useState(false)

//   const adminEditIconRef = useRef()
//   const adminEditDropRef = useRef()

//   useEffect(() => {
//     const handleClickProfileOutside = (event) => {
//       if (
//         adminEditIconRef.current &&
//         adminEditDropRef.current &&
//         !adminEditIconRef.current.contains(event.target) &&
//         !adminEditDropRef.current.contains(event.target)
//       ) {
//         setAdminEditDrop(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickProfileOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickProfileOutside);
//     };
//   }, []);

//   const logoutHandler = async () => {
//     dispatch(AdminLogoutAction(navigate))
//   }


//   const SalonListControllerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     SalonListControllerRef.current = controller;

//     dispatch(getAdminSalonListAction(adminEmail, controller.signal));

//     return () => {
//       if (SalonListControllerRef.current) {
//         SalonListControllerRef.current.abort();
//       }
//     };
//   }, [adminEmail, dispatch]);

//   const getAdminSalonList = useSelector(state => state.getAdminSalonList)

//   const {
//     loading: getAdminSalonListLoading,
//     resolve: getAdminSalonListResolve,
//     salons: SalonList
//   } = getAdminSalonList


//   const selectedActiveSalon = (salon) => {
//     dispatch({
//       type: "ADMIN_SET_SALON",
//       payload: {
//         currentActiveSalon: salon.salonName,
//         chooseSalonId: salon.salonId

//       }
//     })
//     setSalonlistdrop(false)
//   }

//   const adminSetSalon = useSelector(state => state.adminSetSalon)


//   const applySelectedSalonHandler = () => {

//     const applySalonData = {
//       salonId: adminSetSalon?.chooseSalonId,
//       adminEmail
//     }

//     dispatch(adminApplySalonAction(applySalonData))
//   }

//   const getDefaultSalonControllerRef = useRef(new AbortController())

//   useEffect(() => {
//     if (adminProfile) {
//       const controller = new AbortController();
//       getDefaultSalonControllerRef.current = controller;

//       dispatch(adminGetDefaultSalonAction(adminEmail, controller.signal, adminSetSalon));

//       return () => {
//         if (getDefaultSalonControllerRef.current) {
//           getDefaultSalonControllerRef.current.abort();
//         }
//       };
//     }

//   }, [adminProfile, dispatch]);

//   // const [src, setSrc] = useState("");

//   // useEffect(() => {
//   //     if (adminProfile && adminProfile?.profile[0]?.url) {
//   //         setSrc(adminProfile?.profile[0]?.url)
//   //     } else {
//   //         setSrc("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
//   //     }
//   // }, [adminProfile])

//   const adminApplySalon = useSelector(state => state.adminApplySalon)

//   const {
//     loading: adminApplySalonLoading,
//   } = adminApplySalon


//   const darkMode = useSelector(darkmodeSelector)

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

//   const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

//   const {
//     loading: adminGetDefaultSalonLoading,
//     resolve: adminGetDefaultSalonResolve,
//     response: adminGetDefaultSalonResponse
//   } = adminGetDefaultSalon

//   useEffect(() => {
//     if (adminGetDefaultSalonResponse) {
//       setTogglecheck(adminGetDefaultSalonResponse?.isOnline)
//     }

//   }, [adminGetDefaultSalonResponse])


//   const [togglecheck, setTogglecheck] = useState(false);

//   const salonStatusHandler = () => {
//     const newCheckValue = !togglecheck;
//     setTogglecheck(newCheckValue);

//     const salonStatusOnlineData = {
//       salonId,
//       isOnline: newCheckValue,
//     };

//     dispatch(adminSalonStatusAction(salonStatusOnlineData, setTogglecheck, newCheckValue));
//   }


//   const darkmodeOn = darkMode === "On"

//   return (
//     <div className={`${style.admin_dashboard_header_wrapper} ${darkmodeOn && style.dark}`}>

//       {
//         location?.pathname === "/admin-dashboard" ? (<div className={`${style.choose_salon_div} ${darkmodeOn && style.dark}`}>

//           <p></p>

//           {
//             adminProfile?.salonId == 0 ?
//               <div><p>No Salon Present</p></div> :
//               <>
//                 <ClickAwayListener onClickAway={() => setSalonlistdrop(false)}>
//                   <div onClick={() => setSalonlistdrop((prev) => !prev)}>
//                     <p
//                       style={{
//                         color: darkmodeOn ? "var(--dark-color-4)" : "var(--light-color-2)"
//                       }}
//                     >{adminSetSalon?.currentActiveSalon}</p>
//                     <div
//                       style={{
//                         color: darkmodeOn ? "var(--dark-color-4)" : "var(--light-color-2)"
//                       }}
//                     >
//                       <DropdownIcon />
//                     </div>

//                     <div
//                       className={`${style.dashboard_salon_list_dropdown} ${darkmodeOn && style.dark}`}
//                       style={{
//                         opacity: salonlistdrop ? "1" : "0",
//                         zIndex: salonlistdrop ? "2" : "-1",
//                         transition: "300ms ease",
//                         height: SalonList?.length > 0 && SalonList?.length <= 4 ? "auto" : "15rem"
//                       }}
//                     >
//                       {getAdminSalonListLoading ? (
//                         <p>Loading...</p>
//                       ) : !getAdminSalonListResolve || SalonList?.length === 0 ? (
//                         <p>No Salon Present</p>
//                       ) : (
//                         SalonList.map((s) => (
//                           <p
//                             key={s._id}
//                             onClick={() => selectedActiveSalon(s)}
//                             className={`${s.salonId === adminProfile?.salonId && style.salonName_active} ${darkmodeOn && style.dark}`}
//                           >
//                             {s.salonName}
//                           </p>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 </ClickAwayListener>

//                 {!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler}
//                   disabled={adminProfile?.salonId == adminSetSalon?.chooseSalonId || adminApplySalonLoading ? true : false}
//                   style={{
//                     cursor: adminProfile?.salonId == adminSetSalon?.chooseSalonId && "not-allowed"
//                   }}
//                 >Apply</button>}
//               </>
//           }


//         </div>) : (<div></div>)
//       }

//       {
//         location?.pathname === "/admin-dashboard" ? (<div className={style.mobile_choose_salon_div}>
//           <button onClick={() => setMobileDrop((prev) => !prev)}>Select Salon</button>
//         </div>
//         ) : (<div></div>)
//       }


//       {/* {
//         mobiledrop && <section className={style.chooseSalon_modal}>
//           <div className={`${style.chooseSalon_model_content} ${darkmodeOn && style.dark}`}>
//             <button onClick={() => setMobileDrop(false)}>X</button>
//             <p>Choose Salon</p>
//             <div>
//               <p>{adminSetSalon?.currentActiveSalon}</p>
//             </div>
//             <div
//               className={style.mobile_dashboard_salon_list_dropdown}
//               style={{
//                 opacity: 1,
//                 zIndex: 2,
//                 transition: "300ms ease",
//                 height: SalonList?.length > 0 && SalonList?.length <= 4 ? "auto" : "20rem"
//               }}
//             >
//               {
//                 getAdminSalonListLoading && !getAdminSalonListResolve ?
//                   <p>No Salon Present</p> :
//                   !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ?
//                     SalonList.map((s) => (
//                       <p
//                         key={s.id}
//                         onClick={() => selectedActiveSalon(s)}
//                         style={{
//                           background: s.salonId == adminProfile?.salonId && "#000",
//                           color: s.salonId == adminProfile?.salonId && "var(--light-color-4)"
//                         }}
//                       >{s.salonName}</p>
//                     )) :
//                     !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ?
//                       <p>No Salon Present</p> :
//                       !getAdminSalonListLoading && !getAdminSalonListResolve &&
//                       <p>No Salon Present</p>
//               }
//             </div>
//             {
//               adminProfile?.salonId !== 0 && (!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler} disabled={adminProfile?.salonId == adminSetSalon?.chooseSalonId || adminApplySalonLoading ? true : false}>Apply</button>)
//             }

//           </div>
//         </section>
//       } */}

//       <Modal
//         open={mobiledrop}
//         onClose={() => setMobileDrop(false)}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <section className={style.chooseSalon_modal}>
//           <div className={`${style.chooseSalon_model_content} ${darkmodeOn && style.dark}`}>
//             <button onClick={() => setMobileDrop(false)}><MobileCrossIcon /></button>
//             <p>Choose Salon</p>
//             <div>
//               <p>{adminSetSalon?.currentActiveSalon}</p>
//             </div>
//             <div
//               className={`${style.mobile_dashboard_salon_list_dropdown} ${darkmodeOn && style.dark}`}
//               style={{
//                 opacity: 1,
//                 zIndex: 2,
//                 transition: "300ms ease",
//                 height: SalonList?.length > 0 && SalonList?.length <= 4 ? "auto" : "20rem"
//               }}
//             >
//               {
//                 getAdminSalonListLoading && !getAdminSalonListResolve ?
//                   <p>No Salon Present</p> :
//                   !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ?
//                     SalonList.map((s) => (
//                       <p
//                         key={s._id}
//                         onClick={() => selectedActiveSalon(s)}
//                         className={`${s.salonId === adminProfile?.salonId && style.salonName_active} ${darkmodeOn && style.dark}`}
//                       >{s.salonName}</p>
//                     )) :
//                     !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ?
//                       <p>No Salon Present</p> :
//                       !getAdminSalonListLoading && !getAdminSalonListResolve &&
//                       <p>No Salon Present</p>
//               }
//             </div>
//             {
//               adminProfile?.salonId !== 0 && (!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler} disabled={adminProfile?.salonId == adminSetSalon?.chooseSalonId || adminApplySalonLoading ? true : false}>Apply</button>)
//             }

//           </div>
//         </section>
//       </Modal>

//       <div className={`${style.profile_wrapper} ${darkmodeOn && style.dark}`}>

//         {
//           adminProfile?.salonId == 0 ? <div></div> :
//             <div
//               className={`${style.salon_toggle_btn_container} ${darkmodeOn && style.dark}`}
//               style={{
//                 outline: togglecheck ? "0.1rem solid limegreen" : "0.1rem solid red",
//               }}
//             >
//               <p className={`${style.salononline_toggle_btn_text} ${togglecheck ? style.salononline_toggle_btn_text_active : style.salononline_toggle_btn_text_inactive} ${darkmodeOn && style.dark}`}>{togglecheck ? "Online" : "Offline"}</p>
//               <button
//                 className={`${style.salononline_toggle_btn} ${togglecheck ? style.salononline_toggle_active : style.salononline_toggle_inactive}`}
//                 onClick={salonStatusHandler}
//               ></button>
//             </div>
//         }

//         {/* <div><Notificationicon /></div> */}
//         {/* <div><Settingsicon /></div> */}
//         {
//           loading ?
//             <Skeleton count={1}
//               height={"4.5rem"}
//               width={"4.5rem"}
//               style={{
//                 borderRadius: "50%"
//               }}
//             /> :
//             <div>
//               <img
//                 src={adminProfile?.profile[0]?.url}
//                 onError={() => setSrc('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')}
//                 alt='admin-profile'
//                 onClick={() => setAdminEditDrop((prev) => !prev)}
//                 ref={adminEditIconRef}
//               />

//               {
//                 adminEditDrop && <div ref={adminEditDropRef}
//                   className={`${style.profile_drop_container} ${darkmodeOn && style.dark}`}
//                 >
//                   <div onClick={() => {
//                     navigate("/admin-dashboard/editprofile")
//                     setAdminEditDrop(false)
//                   }}>
//                     <div><ProfileIcon /></div>
//                     <div>My Profile</div>
//                   </div>
//                   <div onClick={logoutHandler}>
//                     <div><LogoutIcon /></div>
//                     <div>Logout</div>
//                   </div>

//                 </div>
//               }
//             </div>
//         }
//         <div onClick={() => setSidebarToggle(true)}
//           className={`${style.dashboard_mobile_menu} ${darkmodeOn && style.dark}`}
//         ><MobileMenuIcon /></div>
//       </div>


//       <div
//         className={`${style.dashboard_mobile_sidebar_container} ${sidebarToggle ? style.dashboard_mobile_sidebar_active : style.dashboard_mobile_sidebar_inactive} ${darkmodeOn && style.dark}`}
//         ref={MobileIconDropRef}
//       >
//         <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

//         <main className={style.dashboard_mobile_siderbar_content_container}>
//           {
//             MenuData().map((m) => (
//               m.show ? (<div
//                 key={m.id}
//                 className={`${style.dashboard_mobile_item} ${location.pathname.includes(m.url) && style.dashboard_mobile_item_active} ${darkmodeOn && style.dark}`}
//                 onClick={() => {
//                   navigate(m?.url)
//                   setSidebarToggle(false)
//                 }}
//               >
//                 <div style={{
//                 }}>{m.icon}</div>
//                 <p
//                   style={{
//                   }}>{m.title}</p>
//               </div>) : null
//             ))
//           }


//           <div onClick={() => {
//             setSidebarToggle(false)
//             navigate("/admin-dashboard/editprofile")
//           }}
//             className={`${style.dashboard_mobile_item} ${darkmodeOn && style.dark}`}>
//             <div><ProfileIcon /></div>
//             <p>Profile</p>
//           </div>
//           <div onClick={() => dispatch(AdminLogoutAction(navigate))} className={`${style.dashboard_mobile_item} ${darkmodeOn && style.dark}`}>
//             <div><LogoutIcon /></div>
//             <p>Logout</p>
//           </div>

//           <div className={`${style.dashboard_theme_container} ${darkmodeOn && style.dark}`}>
//             <p>Theme</p>
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

//         </main>
//       </div>

//     </div >
//   )
// }

// export default DashboardHeader


import React, { useState } from 'react'
import style from './Header.module.css'
import { MoonIcon, SearchIcon } from '../../../icons'
import { LogoutIcon, ProfileIcon, SidebarCloseIcon, SidebarOpenIcon } from '../../../newicons'
import { ClickAwayListener, Modal } from '@mui/material'

const Header = ({ sidebar, setSidebar, mobileSidebar, setMobileSidebar }) => {

  const salonlist = [
    { name: "LuxeLocks Salon" },
    { name: "Velvet Touch Hair Studio" },
    { name: "The Glam Lounge" },
    { name: "Opulent Hair & Beauty" },
    { name: "Radiance Beauty Bar" },
    { name: "Chic & Sleek Salon" },
    { name: "Urban Glow Studio" },
    { name: "Vogue Hair Lounge" },
    { name: "The Blush Room" },
    { name: "The Hair Loft" },
    { name: "Blossom Beauty Studio" },
    { name: "Serenity Hair Spa" },
    { name: "Aqua Glow Salon" },
    { name: "Green Leaf Hair Boutique" },
    { name: "Ocean Breeze Salon" },
    { name: "Modern Edge Salon" },
    { name: "Prestige Hair Studio" },
    { name: "The Gentlemen & Ladies Parlor" },
    { name: "Urban Styles Unisex Salon" },
    { name: "Crown & Glory Salon" },
    { name: "Elite Hair & Beauty" },
    { name: "The Royal Mane" },
    { name: "Pure Elegance Salon" },
    { name: "The Platinum Chair" },
    { name: "Golden Strands Studio" }
  ];


  const [salonlistdrop, setSalonlistdrop] = useState(false)

  const [onlineState, setOnlineState] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)


  return (
    <header className={`${style.header}`}>
      <div className={`${style.large_container_left}`}>
        <button onClick={() => setSidebar((prev) => !prev)}>{sidebar ? <SidebarOpenIcon /> : <SidebarCloseIcon />}</button>
        <ClickAwayListener onClickAway={() => setSalonlistdrop(false)}>
          <div>
            <div><SearchIcon /></div>
            <input
              type="text"
              placeholder='Search'
              onClick={() => setSalonlistdrop((prev) => !prev)}
            />
            <button>save</button>

            <div
              style={{
                opacity: salonlistdrop ? 1 : 0,
                transition: "opacity 0.2s ease-in-out"
              }}
              className={`${style.salonlist_container}`}
            >
              {
                salonlist.map((item) => {
                  return (
                    <div className={`${style.salonlist_container_item}`} key={item.name}>
                      <div><img src="data:image/jpeg;base64,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" alt="" /></div>
                      <p>{item.name}</p>
                    </div>
                  )
                })
              }
            </div>


            {/* <div
              style={{
                opacity: salonlistdrop ? 1 : 0,
                transition: "opacity 0.3s ease-in-out"
              }}
              className={`${style.salonlist_container_empty}`}
            >
              <p>No salon available</p>
            </div> */}

          </div>
        </ClickAwayListener>
      </div>
      <div>
        <button
          style={{
            background: onlineState ? "#00A36C" : "rgb(244, 67, 54)",
          }}
          onClick={() => setOnlineState((prev) => !prev)}
        >{onlineState ? "Online" : "Offline"}</button>

        <div><MoonIcon /></div>

        <ClickAwayListener onClickAway={() => setProfileOpen(false)}>
          <div onClick={() => setProfileOpen((prev) => !prev)}>
            <img src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" alt="" />

            <div
              style={{
                opacity: profileOpen ? 1 : 0,
                zIndex: profileOpen ? 100 : 0,
                visibility: profileOpen ? "visible" : "hidden"
              }}
              className={`${style.profile_container}`} 
              onClick={(e) => e.stopPropagation()}
              >
              <div className={`${style.profile_container_header}`}>
                <div><img src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" alt="" /></div>
                <div>
                  <p>Toby Belhome</p>
                  <p>contact@hotmail.com</p>
                </div>
              </div>

              <div
                className={`${style.profile_container_item}`}
                style={{
                  borderBottom: "0.1rem solid var(--border-secondary)",
                  // cursor: profileOpen ? "cursor" : ""
                }}
              >
                <div><ProfileIcon /></div>
                <p>Profile</p>
              </div>

              <div className={`${style.profile_container_item}`}>
                <div><LogoutIcon /></div>
                <p>Logout</p>
              </div>

            </div>

          </div>
        </ClickAwayListener>


      </div>

      {/* for mobile header */}

      <div className={`${style.mobile_container_left}`}>
        <button onClick={() => setMobileSidebar((prev) => !prev)}>{mobileSidebar ? <SidebarOpenIcon /> : <SidebarCloseIcon />}</button>
        <button>
          Select Salon
        </button>
      </div>
    </header>
  )
}

export default Header