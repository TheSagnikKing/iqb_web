import React, { useEffect, useState } from 'react'
import style from './Appointment.module.css'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import api from '../../Redux/api/Api'
import toast from 'react-hot-toast'
import Calendar from 'react-calendar'

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
    const [barberOffdates, setBarberOffdates] = useState(false)

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

    const [selectedDates, setSelectedDates] = useState([]);

    const onClickDay = (date) => {

        const formattedDate = date.toLocaleDateString("en-CA");

        setSelectedDates((prevDates) =>
            prevDates.includes(formattedDate)
                ? prevDates.filter((d) => d !== formattedDate)
                : [...prevDates, formattedDate]
        );
    };

    const isSelected = (date) => {
        const formattedDate = date.toLocaleDateString("en-CA");
        return selectedDates?.includes(formattedDate);
    };

    const offDayHandler = async (selectedDates) => {
        const { data } = await api.post("/api/barberDayOff/addBarberDayOffs", {
            salonId,
            barberId,
            barberDayOffs: selectedDates
        })

        toast.success(data?.message, {
            duration: 3000,
            style: {
                fontSize: "var(--font-size-2)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
            },
        });

        setSelectedDates([])
        getBarberLeaveDaysFunc()
    }

    const [barberLeaveDaysdata, setBarberLeaveDaysdata] = useState([])

    const getBarberLeaveDaysFunc = async () => {
        const { data } = await api.post("/api/barberDayOff/getBarberDayOffs", {
            salonId,
            barberId
        })

        setBarberLeaveDaysdata(data.response)
    }

    useEffect(() => {
        getBarberLeaveDaysFunc()
    }, [])

    console.log("Selected Dates ", selectedDates)
    console.log("Barber Leave Days ", barberLeaveDaysdata)

    const isDisabled = (date) => {
        const formattedDate = date.toLocaleDateString("en-CA").split('T')[0];
        return barberLeaveDaysdata?.includes(formattedDate);
    };

    return (
        <div className={`${style.barber_appointment_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
                <p>Appointment</p>
            </div>

            <div className={`${style.barber_appointment_content_wrapper} ${darkmodeOn && style.dark}`}>
                <div className={style.button_group}>
                    <p
                        onClick={() => {
                            setBarberOffdates(false)
                            setAppointmentDates(true)
                        }}>Appointment Date</p>
                    <p
                        onClick={() => {
                            setBarberOffdates(true)
                            setAppointmentDates(false)
                        }}>Barber Off Days</p>
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
                    barberOffdates && <div className={style.leave_value_body}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <p>Select Off Days</p>
                            <button className={style.reset_days} onClick={() => offDayHandler([])}>Reset Off Days</button>
                        </div>
                        {
                            <div>
                                <Calendar
                                    onClickDay={onClickDay}
                                    // tileClassName={({ date }) =>
                                    //     isSelected(date) ? style.highlighted_date : ""
                                    // }
                                    minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                    tileClassName={({ date }) => {
                                        if (isSelected(date)) {
                                            return style.highlighted_date;
                                        } else if (isDisabled(date)) {
                                            return style.leave_dates;
                                        }
                                        return null;
                                    }}

                                // tileDisabled={({ date }) => isDisabled(date)}
                                />
                            </div>
                        }
                    </div>
                }
                <button className={style.submit} onClick={appointmentdates ? submitHandler : () => offDayHandler(selectedDates)}>submit</button>
            </div>
        </div>
    )
}

export default Appointment