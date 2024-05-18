import React, { useEffect, useRef, useState } from 'react'
import "./DashboardHeader.css"
import Skeleton from 'react-loading-skeleton'
import { Adminqueueicon, DropdownIcon, MobileCrossIcon, MobileMenuIcon, MoonIcon, Notificationicon, Settingsicon, Sunicon } from '../../../icons'
import { menudata } from '../menudata'
import { useLocation, useNavigate } from 'react-router-dom'

const DashboardHeader = () => {
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

    console.log("Mobile Drop ", mobiledrop)

    const handleExternalNavigation = () => {
        window.location.href = 'https://iqb-kiyosk-final.netlify.app'; // external URL
    };

    return (
        <div className='admin_dashboard_header_wrapper'>
            <div className='choose_salon_div'>
                <p>Choose Salon</p>
                <div>
                    <p>Classic touch</p>
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
                            salonListNames.map((s) => (
                                <p key={s.id}>{s.salonName}</p>
                            ))
                        }
                    </div>
                </div>
                <button>Apply</button>
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
                        <div><img src="https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-in-the-style-of-2d-game-art-image_2884743.jpg" alt="" /></div>
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

                <div onClick={handleExternalNavigation}>
                    <p><Adminqueueicon /></p>
                    <p>Queueing</p>
                </div>

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