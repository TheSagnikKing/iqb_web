import React, { useEffect, useState } from 'react'
import style from "./Appointment.module.css"
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import api from "../../Redux/api/Api"

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Skeleton from 'react-loading-skeleton'

const Appointment = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  const [selectedDate, setSelectedDate] = useState("")

  console.log(selectedDate)


  // const [selectedDate, setSelectedDate] = useState(null);

  // const barbaplist = [
  //   {
  //     date: "2024-11-188",

  //   }
  // ]

  // const highlightDate = new Date(2024, 11, 18);

  //   const [openCalender, setOpenCalender] = useState(false)


  //   useEffect(() => {
  //     const styleElement = document.createElement("style");

  //     styleElement.textContent = `
  //       .react-calendar {
  //         width: 32rem;
  //         border-radius: 1rem;
  //         border: 0.1rem solid rgba(0,0,0,0.2);
  //         background: ${darkmodeOn ? "var(--dark-color-1)" : "white"}; 
  //       }

  //       .react-calendar__tile{
  //         font-size: 1.2rem;
  //         padding: 1rem;
  //       }

  //       .react-calendar button {
  //       color: ${darkmodeOn ? "var(--light-color-4)" : "var(--light-color-2)"}
  //       }

  //       .react-calendar__tile--now,
  //       .react-calendar__tile--now:enabled:hover,
  // .react-calendar__tile--now:enabled:focus,
  // .react-calendar__tile--hasActive{
  //     color: ${darkmodeOn ? "var(--light-color-4)" : "var(--light-color-2)"}
  // }

  //     `;

  //     document.head.appendChild(styleElement);

  //     return () => {
  //       document.head.removeChild(styleElement);
  //     };
  //   }, [darkmodeOn]);

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

  console.log(appointmentList?.response)

  return (
    <div className={`${style.appointment_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Appointment List</p>

        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            colorScheme: darkmodeOn ? "dark" : "light",
          }} />

        {/* <div>
          <button onClick={() => setOpenCalender(!openCalender)}>Select Date</button>
          {
            openCalender && <div className={style.cal}>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="custom-calendar"
                tileClassName={({ date, view }) =>
                  view === "month" && date.toDateString() === highlightDate.toDateString()
                    ? "highlight"
                    : ""
                }
              />
            </div>
          }
        </div>

        <style>
          {`
          .react-calendar{
          z-index: 100
          }

          .highlight {
            border: 2px solid var(--color-6) !important;
            border-radius: 0.5rem;
            // color: white;
          }
          // .highlight-with-dot {
          //   position: relative;
          // }

          // .highlight-with-dot::before {
          //   content: '';
          //   position: absolute;
          //   top: 0px;
          //   left: 50%;
          //   transform: translateX(-50%);
          //   width: 8px;
          //   height: 8px;
          //   background-color: red;
          //   border-radius: 50%;
          //   z-index: 1;
          // }
        `}
        </style> */}
      </div>

      <div className={`${style.appointment_content_wrapper} ${darkmodeOn && style.dark}`}>
        {
          loading ? (
            <div style={{ width: "100%", height: "100%", display: "flex", gap: "1.2rem" }}>
              <Skeleton
                count={1}
                // height={"6rem"}
                style={{ width: "30rem", height: "100%" }}
                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

              <Skeleton
                count={1}
                // height={"6rem"}
                style={{ width: "30rem", height: "100%" }}
                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

              <Skeleton
                count={1}
                // height={"6rem"}
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

export default Appointment