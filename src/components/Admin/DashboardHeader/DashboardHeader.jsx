import React, { useEffect, useRef, useState } from 'react'
import "./DashboardHeader.css"
import Skeleton from 'react-loading-skeleton'
import { DropdownIcon, MoonIcon, Notificationicon, Settingsicon, Sunicon } from '../../../icons'

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

    console.log("Mobile Drop ", mobiledrop)

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

            </div>
        </div>
    )
}

export default DashboardHeader