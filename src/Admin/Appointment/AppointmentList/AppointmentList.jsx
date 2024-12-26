import React, { useEffect, useState } from 'react'
import style from "./AppointmentList.module.css"
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import api from "../../../Redux/api/Api"
import "react-calendar/dist/Calendar.css";
import Skeleton from 'react-loading-skeleton'
import { useLocation } from 'react-router-dom'

const AppointmentList = () => {

    const location = useLocation()
    console.log(location.state)


    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"


    const [selectedDate, setSelectedDate] = useState(location.state)

    const [loading, setLoading] = useState(false)
    const [appointmentList, setAppointmentList] = useState([])

    useEffect(() => {
        try {
            setLoading(true)
            const getAppointmentList = async () => {
                const { data } = await api.post("/api/appointments/getAllAppointmentsBySalonIdAndDate", {
                    salonId,
                    appointmentDate: selectedDate
                })

                setAppointmentList(data)
                setLoading(false)
            }

            getAppointmentList()
        } catch (error) {
            setLoading(false)
        }
    }, [selectedDate])


    return (
        <div className={`${style.appointment_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
                <p>Appointment List</p>

                <p>{location.state}</p>

                {/* <input
                    type="date"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                        colorScheme: darkmodeOn ? "dark" : "light",
                    }} /> */}
            </div>

            <div className={`${style.appointment_content_wrapper} ${darkmodeOn && style.dark}`}>
                {
                    loading ? (
                        <div style={{ width: "100%", height: "100%", display: "flex", gap: "1.2rem" }}>
                            <Skeleton
                                count={1}
                                style={{ width: "30rem", height: "100%" }}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

                            <Skeleton
                                count={1}
                                style={{ width: "30rem", height: "100%" }}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

                            <Skeleton
                                count={1}
                                style={{ width: "30rem", height: "100%" }}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

                        </div>
                    ) : appointmentList?.response?.length > 0 ? (
                        appointmentList?.response?.map((appoint) => (
                            <React.Fragment key={appoint.barberId}>
                                <main className={`${style.appointment_container} ${darkmodeOn ? style.dark : ''}`}>
                                    <div className={`${style.appointment_barber_container} ${darkmodeOn ? style.dark : ''}`}>
                                        <div>
                                            <img src={appoint.barberProfile?.[0]?.url} alt="profile" />
                                        </div>
                                        <p>{appoint.barbername}</p>
                                    </div>

                                    <main className={style.appointment_content_list_container}>
                                        {appoint?.appointments.map((cus) => (
                                            <div
                                                className={`${style.appointment_body_customer_item} ${darkmodeOn ? style.dark : ''}`}
                                                key={cus._id}
                                            >
                                                <div>
                                                    <img src={cus.customerProfile?.[0]?.url} alt="" />
                                                </div>
                                                <div>
                                                    <p>{cus.customerName}</p>
                                                    <p>
                                                        Time: {cus.startTime} - {cus.endTime}
                                                    </p>
                                                    <p>
                                                        EWT -{' '}
                                                        {cus.services.reduce(
                                                            (total, service) => total + service.barberServiceEWT,
                                                            0
                                                        )}{' '}
                                                        mins
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </main>
                                </main>
                            </React.Fragment>
                        ))
                    ) : (
                        <div style={{
                            display: "grid", placeItems: "center", width: "100%", fontSize: "var(--font-size-3)",
                            fontWeight: "500"
                        }}><p>No Appointment available</p></div>
                    )
                }

            </div>
        </div >
    )
}

export default AppointmentList