import React, { useEffect, useRef, useState } from 'react'
import "./DashboardHeader.css"
import Skeleton from 'react-loading-skeleton'
import { Adminqueueicon, DropdownIcon, MobileCrossIcon, MobileMenuIcon, MoonIcon, Notificationicon, Settingsicon, Sunicon } from '../../../icons'
import { menudata } from '../menudata'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminLogoutAction } from '../../../Redux/Admin/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'
import { adminApplySalonAction, adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction'

const DashboardHeader = () => {

    const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])
    const adminEmail = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)

    const [salonlistdrop, setSalonlistdrop] = useState(false)
    const [togglecheck, setTogglecheck] = useState(false)

    const toggleHandler = () => {
        setTogglecheck((prev) => !prev)
    }

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

    const adminEditDropHandler = () => {
        setAdminEditDrop((prev) => !prev)
    }

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


    const [currentActiveSalon, setCurrentActiveSalon] = useState("")
    const [chooseSalonId, setChooseSalonId] = useState(adminProfile?.salonId)

    const selectedActiveSalon = (salon) => {
        setCurrentActiveSalon(salon.salonName)
        setChooseSalonId(salon.salonId)
        setSalonlistdrop(false)
    }

    const applySelectedSalonHandler = () => {

        const applySalonData = {
            salonId: chooseSalonId,
            adminEmail
        }

        dispatch(adminApplySalonAction(applySalonData))
    }

    const getDefaultSalonControllerRef = useRef(new AbortController())

    useEffect(() => {
        if (adminProfile && chooseSalonId != 0) {
            const controller = new AbortController();
            getDefaultSalonControllerRef.current = controller;

            dispatch(adminGetDefaultSalonAction(adminEmail, controller.signal, setChooseSalonId, setCurrentActiveSalon));

            return () => {
                if (getDefaultSalonControllerRef.current) {
                    getDefaultSalonControllerRef.current.abort();
                }
            };
        }

    }, [adminProfile, dispatch]);

    return (
        <div className='admin_dashboard_header_wrapper'>
            <div className='choose_salon_div'>
                <p>Choose Salon</p>
                <div>
                    <p>{currentActiveSalon}</p>
                    <div onClick={() => setSalonlistdrop((prev) => !prev)}><DropdownIcon /></div>
                    <div
                        className='dashboard_salon_list_dropdown'
                        ref={salonlistRef}
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
                {!getAdminSalonListLoading && getAdminSalonListResolve && <button onClick={applySelectedSalonHandler} disabled={adminProfile?.salonId == chooseSalonId}>Apply</button>}

            </div>

            <div className='mobile_choose_salon_div'>
                <button onClick={() => setMobileDrop((prev) => !prev)}>Select Salon</button>
            </div>
            {
                mobiledrop && <section className='chooseSalon_modal'>
                    <div className="chooseSalon_model_content">
                        <button onClick={() => setMobileDrop(false)}>X</button>
                        <p>Choose Salon</p>
                        <div>
                            <p>Classic touch</p>
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
                                salonListNames.map((s) => (
                                    <p key={s.id}>{s.salonName}</p>
                                ))
                            }
                        </div>
                        <button>Apply</button>
                    </div>
                </section>
            }
            <div className='profile_wrapper'>
                <div
                    style={{
                        background: togglecheck ? "#FF8A08" : "#000"
                    }}
                >
                    <p className={`toggle_btn_text ${togglecheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{togglecheck ? <Sunicon /> : <MoonIcon />}</p>
                    <button
                        className={`toggle_btn ${togglecheck ? 'toggle_active' : 'toggle_inactive'}`}
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
                                src={`${adminProfile?.profile[0]?.url}`} alt=""
                                onClick={() => setAdminEditDrop((prev) => !prev)}
                                ref={adminEditIconRef}
                            />

                            {
                                adminEditDrop && <div ref={adminEditDropRef}
                                    className="profile_drop_container"
                                >
                                    <p onClick={() => navigate("/admin-editprofile")}>My Profile</p>
                                    <p onClick={logoutHandler}>Logout</p>
                                </div>
                            }
                        </div>
                }
                <div onClick={() => setSidebarToggle(true)}
                    className='dashboard_mobile_menu'
                ><MobileMenuIcon /></div>
            </div>


            <div
                className={`dashboard_mobile_sidebar_container ${sidebarToggle ? "dashboard_mobile_sidebar_active" : "dashboard_mobile_sidebar_inactive"}`}
                ref={MobileIconDropRef}
            >
                <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

                {
                    menudata.map((m) => (
                        <div
                            key={m.id}
                            className={`${m.url === location?.pathname && "dashboard_mobile_menu_item_active"}`}
                            onClick={() => navigate(m?.url)}
                        >
                            <div style={{
                                color: m.url === location?.pathname && "var(--primary-bg-color3)"
                            }}>{m.icon}</div>
                            <p
                                style={{
                                    color: m.url === location?.pathname && " var(--primary-bg-color3)"
                                }}>{m.title}</p>
                        </div>
                    ))
                }

                <div className='dashboard_theme_container'>
                    <p>Theme</p>
                    <div
                        style={{
                            background: togglecheck ? "#FF8A08" : "#000"
                        }}
                    >
                        <p className={`toggle_btn_text ${togglecheck ? 'toggle_btn_text_active' : 'toggle_btn_text_inactive'}`}>{togglecheck ? <Sunicon /> : <MoonIcon />}</p>
                        <button
                            className={`toggle_btn ${togglecheck ? 'toggle_active' : 'toggle_inactive'}`}
                            onClick={toggleHandler}
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader