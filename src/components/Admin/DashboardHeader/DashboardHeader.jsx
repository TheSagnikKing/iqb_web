import React, { useEffect, useRef, useState } from 'react'
import "./DashboardHeader.css"
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

const DashboardHeader = () => {

    const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])
    const adminEmail = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)

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

    const salonListNames = [
        {
            id: 1,
            salonName: "classicTouch",
            salonId: 1
        },
        {
            id: 2,
            salonName: "Couture",
            salonId: 2
        }, {
            id: 3,
            salonName: "Bella Vida",
            salonId: 3
        },
        {
            id: 4,
            salonName: "Couture",
            salonId: 4
        }, {
            id: 5,
            salonName: "Bella Vida",
            salonId: 5
        }
    ]

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

    const currentmode = darkMode === "Off"

    const darkmodeOn = darkMode === "On"

    return (
        <div className={`admin_dashboard_header_wrapper ${darkmodeOn && "dark"}`}>
            <div className={`choose_salon_div ${darkmodeOn && "dark"}`}>
                <p>Choose Salon</p>

                {
                    adminProfile?.salonId == 0 ?
                        <div>No Salon Present</div> :
                        <>
                            <div>
                                <p>{adminSetSalon?.currentActiveSalon}</p>
                                <div onClick={() => setSalonlistdrop((prev) => !prev)}><DropdownIcon /></div>
                                <div
                                    className={`dashboard_salon_list_dropdown ${darkmodeOn && "dark"}`}
                                    style={{
                                        opacity: salonlistdrop ? "1" : "0",
                                        zIndex: salonlistdrop ? "2" : "-1",
                                        transition: "300ms ease",
                                        height: salonListNames.length > 0 && salonListNames.length <= 4 ? "auto" : "15rem"
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
                                                            background: s.salonId == adminProfile?.salonId && "var(--primary-bg-color3)",
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
                            </div>
                            {!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler} disabled={adminProfile?.salonId == adminSetSalon?.chooseSalonId || adminApplySalonLoading ? true : false}>Apply</button>}
                        </>
                }


            </div>

            <div className='mobile_choose_salon_div'>
                <button onClick={() => setMobileDrop((prev) => !prev)}>Select Salon</button>
            </div>
            {
                mobiledrop && <section className='chooseSalon_modal'>
                    <div className={`chooseSalon_model_content ${darkmodeOn && "dark"}`}>
                        <button onClick={() => setMobileDrop(false)}>X</button>
                        <p>Choose Salon</p>
                        <div>
                            <p>{adminSetSalon?.currentActiveSalon}</p>
                        </div>
                        <div
                            className='mobile_dashboard_salon_list_dropdown'
                            ref={salonlistRef}
                            style={{
                                opacity: 1,
                                zIndex: 2,
                                transition: "300ms ease",
                                height: salonListNames.length > 0 && salonListNames.length <= 4 ? "auto" : "20rem"
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
                                                    background: s.salonId == adminProfile?.salonId && "var(--primary-bg-color3)",
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
            <div className={`profile_wrapper ${darkmodeOn && "dark"}`}>
                <div
                    style={{
                        background: currentmode ? "#FF8A08" : "#000"
                    }}
                >
                    <p className={`toggle_btn_text ${currentmode ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{currentmode ? <Sunicon /> : <MoonIcon />}</p>
                    <button
                        className={`toggle_btn ${currentmode ? 'toggle_active' : 'toggle_inactive'}`}
                        onClick={toggleHandler}
                    ></button>
                </div>

                <div><Notificationicon /></div>
                <div><Settingsicon /></div>
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
                                    className={`profile_drop_container ${darkmodeOn && "dark"}`}
                                >
                                    <div>
                                        <div><ProfileIcon /></div>
                                        <div onClick={() => navigate("/admin-dashboard/editprofile")}>My Profile</div>
                                    </div>
                                    <div>
                                        <div><LogoutIcon /></div>
                                        <div onClick={logoutHandler}>Logout</div>
                                    </div>

                                </div>
                            }
                        </div>
                }
                <div onClick={() => setSidebarToggle(true)}
                    className={`dashboard_mobile_menu ${darkmodeOn && "dark"}`}
                ><MobileMenuIcon /></div>
            </div>


            <div
                className={`dashboard_mobile_sidebar_container ${sidebarToggle ? "dashboard_mobile_sidebar_active" : "dashboard_mobile_sidebar_inactive"} ${darkmodeOn && "dark"}`}
                ref={MobileIconDropRef}
            >
                <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

                {
                    menudata.map((m) => (
                        <div
                            key={m.id}
                            className={`${location.pathname.includes(m.url) && `dashboard_mobile_menu_item_active ${darkmodeOn && "dark"}`}`}
                            onClick={() => navigate(m?.url)}
                        >
                            <div style={{
                                color: location.pathname.includes(m.url) && "var(--primary-bg-color3)"
                            }}>{m.icon}</div>
                            <p
                                style={{
                                    color: location.pathname.includes(m.url) && " var(--primary-bg-color3)"
                                }}>{m.title}</p>
                        </div>
                    ))
                }

                <div onClick={() => navigate("/admin-dashboard/editprofile")}>
                    <div><ProfileIcon /></div>
                    <p>Profile</p>
                </div>
                <div onClick={() => dispatch(AdminLogoutAction(navigate))}>
                    <div><LogoutIcon /></div>
                    <p>Logout</p>
                </div>

                <div className='dashboard_theme_container'>
                    <p>Theme</p>
                    <div
                        style={{
                            background: currentmode ? "#FF8A08" : "#000"
                        }}
                    >
                        <p className={`toggle_btn_text ${currentmode ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{currentmode ? <Sunicon /> : <MoonIcon />}</p>
                        <button
                            className={`toggle_btn ${currentmode ? 'toggle_active' : 'toggle_inactive'}`}
                            onClick={toggleHandler}
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader