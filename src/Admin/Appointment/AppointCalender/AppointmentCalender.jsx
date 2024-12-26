import React, { useEffect, useRef, useState } from 'react'
import style from './AppointmentCalender.module.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';
import api from "../../../Redux/api/Api"
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';
import { Link, useNavigate } from 'react-router-dom';

const AppointmentCalender = () => {

    const navigate = useNavigate()

    const handleDateSelect = (selectInfo) => {

        navigate("/admin-appointments-list", { state: selectInfo.dateStr })
        // console.log(selectInfo.dateStr); // Log the selected date's start date
    };

    const [appointmentData, setAppointmentData] = useState([])

    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

    const AppointmentRef = useRef(null);

    useEffect(() => {

        if (AppointmentRef.current) {
            AppointmentRef.current.abort(); // Abort previous request if it exists
        }

        const newController = new AbortController();
        AppointmentRef.current = newController;

        const signal = newController.signal;

        const apfunc = async () => {
            const { data } = await api.post("/api/appointments/getAllAppointmentsBySalonId", {
                salonId: salonId
            }, { signal })
            setAppointmentData(data?.response)
        }

        apfunc();

        return () => {
            AppointmentRef.current.abort();
        };

    }, [salonId])


    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    useEffect(() => {
        const styleElement = document.createElement('style');

        styleElement.textContent = `
  .fc,
  .fc *,
  .fc::after,
  .fc::before {
    color: ${darkmodeOn ? "var(--light-color-4) !important" : "var(--light-color-2) !important"};
  }
 
.fc-theme-standard .fc-popover {
        background-color: ${darkmodeOn ? "var(--dark-color-3)" : "var(--light-color-3)"};
}

   .fc-icon-chevron-left::before,
    .fc-icon-chevron-right::before {
    color: ${darkmodeOn ? "var(--light-color-4)" : "var(--color-2)"}};
    }
`;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, [darkmodeOn]);

    return (
        <main className={`${style.appoint_cal_wrapper} ${darkmodeOn && style.dark}`}>
            {/* <div>
                <p>Appointment</p>
            </div> */}
            <div className={style.appoint_content_wrapper}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    weekends={true}
                    dateClick={handleDateSelect}
                    events={appointmentData?.map((e) => (
                        {
                            title: `${e.barberName} - ${e.customerName}`, date: e.appointmentDate
                        }
                    ))}
                    dayMaxEvents={true}
                />
            </div>
        </main>
    )
}

export default AppointmentCalender