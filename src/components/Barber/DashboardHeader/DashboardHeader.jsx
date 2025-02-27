import React, { useEffect, useRef, useState } from 'react'
import style from "./DashboardHeader.module.css"
import Skeleton from 'react-loading-skeleton'
import { DropdownIcon, LogoutIcon, MobileCrossIcon, MobileMenuIcon, MoonIcon, Notificationicon, ProfileIcon, Settingsicon, Sunicon } from '../../../icons'
import { menudata } from '../menudata'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants'
import { useNavigate } from 'react-router-dom'
import { BarberLogoutAction } from '../../../Redux/Barber/Actions/AuthAction'
import { ClickAwayListener } from '@mui/material';

const DashboardHeader = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const darkMode = useSelector(darkmodeSelector)

    console.log("Dark Mode ", darkMode)

    const darkHandler = () => {
        localStorage.setItem("dark", "On");
        dispatch({ type: DARK_MODE_ON });

    }

    const lightHandler = () => {
        localStorage.setItem("dark", "Off");
        dispatch({ type: DARK_MODE_OFF });
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

    const barberProfile = useSelector(state => state.BarberLoggedInMiddleware?.entiredata?.user[0])

    const [src, setSrc] = useState("");

    useEffect(() => {
        if (barberProfile && barberProfile?.profile[0]?.url) {
            setSrc(barberProfile?.profile[0]?.url)
        } else {
            setSrc("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
        }
    }, [barberProfile])

    const [barberEditDrop, setBarberEditDrop] = useState(false)

    const logoutHandler = () => {
        dispatch(BarberLogoutAction(navigate))
    }

    const [sidebarToggle, setSidebarToggle] = useState(false)

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


    return (
        <div className={`${style.barber_dashboard_header_wrapper} ${darkmodeOn && style.dark}`}>
            <div className={style.barber_dashboard_btn_container}>

                {barberProfile?.isOnline ? <button className={style.barber_online_active}>Online</button> : <button className={style.barber_online_inactive}>Offline</button>}

                {barberProfile?.isClockedIn ? <button className={style.barber_clock_active}>Clock-In</button> : <button className={style.barber_clock_inactive}>Clock-Out</button>}

            </div>


            <div className={`${style.profile_wrapper} ${darkmodeOn && style.dark}`}>

                {/* <div><Notificationicon /></div> */}
                <div>
                    <img
                        src={barberProfile?.profile[0]?.url}
                        onError={() => setSrc('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')}
                        alt='barber-profile'
                        onClick={() => setBarberEditDrop((prev) => !prev)}
                    />

                    {
                        barberEditDrop &&
                        <ClickAwayListener onClickAway={() => setBarberEditDrop(false)}>
                            <div
                                className={`${style.profile_drop_container} ${darkmodeOn && style.dark}`}
                            >
                                <div onClick={() => {
                                    navigate("/barber-dashboard/editprofile")
                                    setBarberEditDrop(false)
                                }}>
                                    <div><ProfileIcon /></div>
                                    <div>My Profile</div>
                                </div>
                                <div onClick={logoutHandler}>
                                    <div><LogoutIcon /></div>
                                    <div>Logout</div>
                                </div>

                            </div>
                        </ClickAwayListener>
                    }

                </div>

                <div onClick={() => setSidebarToggle(true)}
                    className={`${style.dashboard_mobile_menu} ${darkmodeOn && style.dark}`}
                ><MobileMenuIcon /></div>
            </div>



            {/* <div
                className={`${style.dashboard_mobile_sidebar_container} ${sidebarToggle ? style.dashboard_mobile_sidebar_active : style.dashboard_mobile_sidebar_inactive} ${darkmodeOn && style.dark}`}
                ref={MobileIconDropRef}
            >
                <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>

                {
                    menudata.map((m) => (
                        <div
                            key={m.id}
                            className={`${location.pathname.includes(m.url) && `${style.dashboard_mobile_menu_item_active} ${darkmodeOn && style.dark}`}`}
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

                <div onClick={() => {
                    navigate("/barber-dashboard/editprofile")
                }}>
                    <div><ProfileIcon /></div>
                    <p>Profile</p>
                </div>
                <div onClick={logoutHandler}>
                    <div><LogoutIcon /></div>
                    <p>Logout</p>
                </div>

                <div className={style.dashboard_theme_container}>
                    <p>Theme</p>
                    <div
                        style={{
                            background: currentmode ? "#FF8A08" : "#000"
                        }}
                    >
                        <p className={`${style.toggle_btn_text} ${currentmode ? style.toggle_btn_text_active : style.toggle_btn_text_inactive}`}>{currentmode ? <Sunicon /> : <MoonIcon />}</p>
                        <button
                            className={`${style.toggle_btn} ${currentmode ? style.toggle_active : style.toggle_inactive}`}
                            onClick={toggleHandler}
                        ></button>
                    </div>
                </div>
            </div> */}


            <div
                className={`${style.dashboard_mobile_sidebar_container} ${sidebarToggle ? style.dashboard_mobile_sidebar_active : style.dashboard_mobile_sidebar_inactive} ${darkmodeOn && style.dark}`}
                ref={MobileIconDropRef}
            >
                <button onClick={() => setSidebarToggle(false)}><MobileCrossIcon /></button>
                <main className={style.dashboard_mobile_siderbar_content_container}>
                    {
                        menudata.map((m) => (
                            <div
                                key={m.id}
                                className={`${style.dashboard_mobile_item} ${location.pathname.includes(m.url) && style.dashboard_mobile_item_active} ${darkmodeOn && style.dark}`}
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

                    <div onClick={() => {
                        navigate("/barber-dashboard/editprofile")
                        setSidebarToggle(false)
                    }} className={`${style.dashboard_mobile_item} ${darkmodeOn && style.dark}`}
                    >
                        <div><ProfileIcon /></div>
                        <p>Profile</p>
                    </div>
                    <div onClick={logoutHandler} className={`${style.dashboard_mobile_item} ${darkmodeOn && style.dark}`}>
                        <div><LogoutIcon /></div>
                        <p>Logout</p>
                    </div>

                    <div className={`${style.dashboard_theme_container} ${darkmodeOn && style.dark}`}>
                        <p>Theme</p>
                        {
                            darkmodeOn ?
                                <button onClick={toggleHandler}>
                                    <Sunicon />
                                </button> :
                                <button onClick={toggleHandler}>
                                    <MoonIcon />
                                </button>
                        }

                    </div>

                </main>
            </div>

        </div>
    )
}

export default DashboardHeader