import React, { useEffect, useState } from 'react'
import style from './Appointment.module.css'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import api from '../../Redux/api/Api'
import toast from 'react-hot-toast'

const Appointment = () => {

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const days = [
        {
            id: 1,
            day: "Monday"
        },
        {
            id: 2,
            day: "Tuesday"
        },
        {
            id: 3,
            day: "Wednesday"
        },
        {
            id: 4,
            day: "Thursday"
        },
        {
            id: 5,
            day: "Friday"
        },
        {
            id: 6,
            day: "Saturday"
        },
        {
            id: 7,
            day: "Sunday"
        }
    ]

    const [appointmentdates, setAppointmentDates] = useState(true)
    const [queuedates, setQueuedates] = useState(false)

    const [selectedDays, setSelectedDays] = useState([])

    const checkdayHandler = (day) => {

        setSelectedDays((prev) => {
            if (prev.includes(day.day)) {
                return prev.filter((d) => d !== day.day);
            } else {
                return [...prev, day.day];
            }
        });
    }

    const salonId = useSelector(state => state.BarberLoggedInMiddleware?.barberSalonId)
    const barberId = useSelector(state => state.BarberLoggedInMiddleware?.barberId)

    const submitHandler = async () => {
        try {
            const appdata = {
                salonId,
                barberId,
                appointmentDays: selectedDays
            }

            const { data } = await api.post("/api/barberAppointmentDays/addBarberAppointmentDays", appdata)

            toast.success(data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }

    const [getAppdates, setGetAppdates] = useState([])

    useEffect(() => {
        const getAppointdays = async () => {
            const { data } = await api.post("/api/barberAppointmentDays/getBarberAppointmentDays", {
                salonId,
                barberId
            })

            setGetAppdates(data.response.appointmentDays)
            setSelectedDays(data.response.appointmentDays);
        }
        getAppointdays()
    }, [])

    return (
        <div className={`${style.barber_appointment_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
                <p>Appointment</p>
            </div>

            <div className={`${style.barber_appointment_content_wrapper} ${darkmodeOn && style.dark}`}>
                <div className={style.button_group}>
                    <p
                        // style={{
                        //     fontWeight: appointmentdates && "600",
                        //     borderBottom: appointmentdates && "2px solid black"
                        // }}
                        onClick={() => {
                            setQueuedates(false)
                            setAppointmentDates(true)
                        }}>Appointment Date</p>
                    <p
                        // style={{
                        //     fontWeight: queuedates && "600",
                        //     borderBottom: queuedates && "2px solid black"
                        // }}
                        onClick={() => {
                            setQueuedates(true)
                            setAppointmentDates(false)
                        }}>Queue Date</p>
                </div>
                {
                    appointmentdates && <div className={style.value_body}>
                        <div className={style.heading}>
                            <p>#</p>
                            <p>Days</p>
                        </div>
                        {
                            days.map((d) => {
                                return (
                                    <div key={d.id} className={style.value}>
                                        <input
                                            type="checkbox"
                                            onChange={() => checkdayHandler(d)}
                                            checked={selectedDays.includes(d.day)}
                                        />
                                        <p>{d.day}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }

                {
                    queuedates && <p>Queue Dates</p>
                }
                <button className={style.submit} onClick={submitHandler}>submit</button>
            </div>
        </div>
    )
}

export default Appointment