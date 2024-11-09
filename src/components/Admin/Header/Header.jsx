import React, { useEffect, useRef, useState } from 'react'
import style from "./Header.module.css"
import Skeleton from 'react-loading-skeleton'
import { Adminqueueicon, DropdownIcon, LogoutIcon, MobileCrossIcon, MobileMenuIcon, MoonIcon, Notificationicon, ProfileIcon, Settingsicon, Sunicon } from '../../../icons'
import { menudata } from '../menudata'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AdminLogoutAction } from '../../../Redux/Admin/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'
import { adminApplySalonAction, adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants'
import { IoMoon } from 'react-icons/io5'
import { MdSunny } from 'react-icons/md'
import { adminSalonStatusAction } from '../../../Redux/Admin/Actions/DashboardAction'

const DashboardHeader = () => {

  const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])
  const adminEmail = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const [salonlistdrop, setSalonlistdrop] = useState(false)

  const [loading, setLoading] = useState(false)

  const salonlistRef = useRef()

  useEffect(() => {
    let salondropHandler = (e) => {
      if (salonlistRef.current && !salonlistRef.current.contains(e.target)) {
        console.log(salonlistRef.current.contains(e.target))
        setSalonlistdrop(false)
      }
    }

    document.addEventListener('mousedown', salondropHandler)

    return () => {
      document.removeEventListener('mousedown', salondropHandler)
    }
  }, [])


  const [mobiledrop, setMobileDrop] = useState(false)
  const [sidebarToggle, setSidebarToggle] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const MobileIconDropRef = useRef()

  useEffect(() => {
    const handleClickMobileIconOutside = (event) => {
      if (
        MobileIconDropRef.current &&
        !MobileIconDropRef.current.contains(event.target)
      ) {
        setSidebarToggle(false)
      }
    };

    document.addEventListener('mousedown', handleClickMobileIconOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickMobileIconOutside);
    };
  }, []);

  const [adminEditDrop, setAdminEditDrop] = useState(false)

  const adminEditIconRef = useRef()
  const adminEditDropRef = useRef()

  useEffect(() => {
    const handleClickProfileOutside = (event) => {
      if (
        adminEditIconRef.current &&
        adminEditDropRef.current &&
        !adminEditIconRef.current.contains(event.target) &&
        !adminEditDropRef.current.contains(event.target)
      ) {
        setAdminEditDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickProfileOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickProfileOutside);
    };
  }, []);

  const logoutHandler = async () => {
    dispatch(AdminLogoutAction(navigate))
  }


  const SalonListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    SalonListControllerRef.current = controller;

    dispatch(getAdminSalonListAction(adminEmail, controller.signal));

    return () => {
      if (SalonListControllerRef.current) {
        SalonListControllerRef.current.abort();
      }
    };
  }, [adminEmail, dispatch]);

  const getAdminSalonList = useSelector(state => state.getAdminSalonList)

  const {
    loading: getAdminSalonListLoading,
    resolve: getAdminSalonListResolve,
    salons: SalonList
  } = getAdminSalonList


  const selectedActiveSalon = (salon) => {
    dispatch({
      type: "ADMIN_SET_SALON",
      payload: {
        currentActiveSalon: salon.salonName,
        chooseSalonId: salon.salonId

      }
    })
    setSalonlistdrop(false)
  }

  const adminSetSalon = useSelector(state => state.adminSetSalon)


  const applySelectedSalonHandler = () => {

    const applySalonData = {
      salonId: adminSetSalon?.chooseSalonId,
      adminEmail
    }

    dispatch(adminApplySalonAction(applySalonData))
  }

  const getDefaultSalonControllerRef = useRef(new AbortController())

  useEffect(() => {
    if (adminProfile) {
      const controller = new AbortController();
      getDefaultSalonControllerRef.current = controller;

      dispatch(adminGetDefaultSalonAction(adminEmail, controller.signal, adminSetSalon));

      return () => {
        if (getDefaultSalonControllerRef.current) {
          getDefaultSalonControllerRef.current.abort();
        }
      };
    }

  }, [adminProfile, dispatch]);

  // const [src, setSrc] = useState("");

  // useEffect(() => {
  //     if (adminProfile && adminProfile?.profile[0]?.url) {
  //         setSrc(adminProfile?.profile[0]?.url)
  //     } else {
  //         setSrc("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
  //     }
  // }, [adminProfile])

  const adminApplySalon = useSelector(state => state.adminApplySalon)

  const {
    loading: adminApplySalonLoading,
  } = adminApplySalon


  const darkMode = useSelector(darkmodeSelector)

  console.log("Dark Mode ", darkMode)

  const darkHandler = () => {
    dispatch({ type: DARK_MODE_ON });
    localStorage.setItem("dark", "On");
  }

  const lightHandler = () => {
    dispatch({ type: DARK_MODE_OFF });
    localStorage.setItem("dark", "Off");
  }

  const toggleHandler = () => {
    if (darkMode == "Off") {
      darkHandler()
    } else {
      lightHandler()
    }
  }

  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    loading: adminGetDefaultSalonLoading,
    resolve: adminGetDefaultSalonResolve,
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon

  useEffect(() => {
    if (adminGetDefaultSalonResponse) {
      setTogglecheck(adminGetDefaultSalonResponse?.isOnline)
    }

  }, [adminGetDefaultSalonResponse])


  const [togglecheck, setTogglecheck] = useState(false);

  const salonStatusHandler = () => {
    const newCheckValue = !togglecheck;
    setTogglecheck(newCheckValue);

    const salonStatusOnlineData = {
      salonId,
      isOnline: newCheckValue,
    };

    dispatch(adminSalonStatusAction(salonStatusOnlineData));
  }

  const darkmodeOn = darkMode === "On"

  return (
    <div className={`${style.admin_dashboard_header_wrapper} ${darkmodeOn && style.dark}`}>

      {
        location?.pathname === "/admin-dashboard" ? (<div className={`${style.choose_salon_div} ${darkmodeOn && style.dark}`}>
        
          <p></p>

          {
            adminProfile?.salonId == 0 ?
              <div>No Salon Present</div> :
              <>
                <div>
                  <p>{adminSetSalon?.currentActiveSalon}</p>
                  <div onClick={() => setSalonlistdrop((prev) => !prev)}><DropdownIcon /></div>
                  <div
                    className={`${style.dashboard_salon_list_dropdown} ${darkmodeOn && style.dark}`}
                    style={{
                      opacity: salonlistdrop ? "1" : "0",
                      zIndex: salonlistdrop ? "2" : "-1",
                      transition: "300ms ease",
                      height: SalonList?.length > 0 && SalonList?.length <= 4 ? "auto" : "15rem"
                    }}
                  >

                    {
                      getAdminSalonListLoading && !getAdminSalonListResolve ?
                        <p>No Salon Present</p> :
                        !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ?
                          SalonList.map((s) => (
                            <p
                              key={s.id}
                              onClick={() => selectedActiveSalon(s)}
                              style={{
                                background: s.salonId == adminProfile?.salonId && "#0866ff",
                                color: s.salonId == adminProfile?.salonId && "var(--primary-text-light-color1)",
                                boxShadow: s.salonId == adminProfile?.salonId && "0px 1px 6px rgba(0,0,0,0.2)"
                              }}
                            >{s.salonName}</p>
                          )) :
                          !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ?
                            <p>No Salon Present</p> :
                            !getAdminSalonListLoading && !getAdminSalonListResolve &&
                            <p>No Salon Present</p>
                    }
                  </div>
                </div>
                {!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler}
                  disabled={adminProfile?.salonId == adminSetSalon?.chooseSalonId || adminApplySalonLoading ? true : false}
                  style={{
                    cursor: adminProfile?.salonId == adminSetSalon?.chooseSalonId && "not-allowed"
                  }}
                >Apply</button>}
              </>
          }


        </div>) : (<div></div>)
      }

      {
        location?.pathname === "/admin-dashboard" ? (<div className={style.mobile_choose_salon_div}>
          <button onClick={() => setMobileDrop((prev) => !prev)}>Select Salon</button>
        </div>
        ) : (<div></div>)
      }


      {
        mobiledrop && <section className={style.chooseSalon_modal}>
          <div className={`${style.chooseSalon_model_content} ${darkmodeOn && style.dark}`}>
            <button onClick={() => setMobileDrop(false)}>X</button>
            <p>Choose Salon</p>
            <div>
              <p>{adminSetSalon?.currentActiveSalon}</p>
            </div>
            <div
              className={style.mobile_dashboard_salon_list_dropdown}
              ref={salonlistRef}
              style={{
                opacity: 1,
                zIndex: 2,
                transition: "300ms ease",
                height: SalonList?.length > 0 && SalonList?.length <= 4 ? "auto" : "20rem"
              }}
            >
              {
                getAdminSalonListLoading && !getAdminSalonListResolve ?
                  <p>No Salon Present</p> :
                  !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ?
                    SalonList.map((s) => (
                      <p
                        key={s.id}
                        onClick={() => selectedActiveSalon(s)}
                        style={{
                          background: s.salonId == adminProfile?.salonId && "#0866ff",
                          color: s.salonId == adminProfile?.salonId && "var(--primary-text-light-color1)"
                        }}
                      >{s.salonName}</p>
                    )) :
                    !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ?
                      <p>No Salon Present</p> :
                      !getAdminSalonListLoading && !getAdminSalonListResolve &&
                      <p>No Salon Present</p>
              }
            </div>
            {!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler} disabled={adminProfile?.salonId == adminSetSalon?.chooseSalonId || adminApplySalonLoading ? true : false}>Apply</button>}
          </div>
        </section>
      }
      <div className={`${style.profile_wrapper} ${darkmodeOn && style.dark}`}>

        {
          adminProfile?.salonId == 0 ? <div></div> :
            <div
              className={style.salon_toggle_btn_container}
              style={{
                outline: togglecheck ? "1px solid limegreen" : "1px solid red",
              }}
            >
              <p className={`${style.salononline_toggle_btn_text} ${togglecheck ? style.salononline_toggle_btn_text_active : style.salononline_toggle_btn_text_inactive}`}>{togglecheck ? "Online" : "Offline"}</p>
              <button
                className={`${style.salononline_toggle_btn} ${togglecheck ? style.salononline_toggle_active : style.salononline_toggle_inactive}`}
                onClick={salonStatusHandler}
              ></button>
            </div>
        }

        <div><Notificationicon /></div>
        {/* <div><Settingsicon /></div> */}
        {
          loading ?
            <Skeleton count={1}
              height={"4.5rem"}
              width={"4.5rem"}
              style={{
                borderRadius: "50%"
              }}
            /> :
            <div>
              <img
                src={adminProfile?.profile[0]?.url}
                onError={() => setSrc('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')}
                alt='admin-profile'
                onClick={() => setAdminEditDrop((prev) => !prev)}
                ref={adminEditIconRef}
              />

              {
                adminEditDrop && <div ref={adminEditDropRef}
                  className={`${style.profile_drop_container} ${darkmodeOn && style.dark}`}
                >
                  <div onClick={() => navigate("/admin-dashboard/editprofile")}>
                    <div><ProfileIcon /></div>
                    <div>My Profile</div>
                  </div>
                  <div onClick={logoutHandler}>
                    <div><LogoutIcon /></div>
                    <div>Logout</div>
                  </div>

                </div>
              }
            </div>
        }
        <div onClick={() => setSidebarToggle(true)}
          className={`${style.dashboard_mobile_menu} ${darkmodeOn && style.dark}`}
        ><MobileMenuIcon /></div>
      </div>


      <div
        className={`${style.dashboard_mobile_sidebar_container} ${sidebarToggle ? style.dashboard_mobile_sidebar_active : style.dashboard_mobile_sidebar_inactive} ${darkmodeOn && style.dark}`}
        ref={MobileIconDropRef}
      >
        <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

        {
          menudata.map((m) => (
            <div
              key={m.id}
              className={`${style.dashboard_mobile_item} ${location.pathname.includes(m.url) && style.dashboard_mobile_item_active}`}
              onClick={() => {
                navigate(m?.url)
                setSidebarToggle(false)
              }}
            >
              <div style={{
              }}>{m.icon}</div>
              <p
                style={{
                }}>{m.title}</p>
            </div>
          ))
        }

        <div onClick={() => navigate("/admin-dashboard/editprofile")} className={style.dashboard_mobile_item}>
          <div><ProfileIcon /></div>
          <p>Profile</p>
        </div>
        <div onClick={() => dispatch(AdminLogoutAction(navigate))} className={style.dashboard_mobile_item}>
          <div><LogoutIcon /></div>
          <p>Logout</p>
        </div>

        {/* <div className={style.dashboard_theme_container}>
          <p>Theme</p>
          {
            darkmodeOn ?
              <button onClick={toggleHandler}>
                <IoMoon />
              </button> :
              <button onClick={toggleHandler}>
                <MdSunny />
              </button>
          }

        </div> */}
      </div>

    </div >
  )
}

export default DashboardHeader