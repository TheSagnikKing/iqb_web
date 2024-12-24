import React, { useState } from 'react'
import style from "./Appointment.module.css"
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Appointment = () => {

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const appointmentlist = [
    {
      barberId: 1,
      barberName: "Adilson",
      barberImage: "https://static.thehoneycombers.com/wp-content/uploads/sites/6/2024/01/barber-shops-lead-image.jpg",
      appointments: [
        {
          _id: 1,
          customerName: "Customer One",
          customerImage: "https://verint.imgix.net/wp-content/uploads/customer-calling-home-featured.png?fit=max&auto=format&auto=compress",
          startTime: "02:30",
          endTime: "05:45",
          services: [
            {
              serviceId: 1,
              serviceName: "Hair cut",
              servicePrice: 200,
              barberServiceEWT: 30,
              _id: "6768f2d1f8de1daedf34a825"
            },
            {
              serviceId: 2,
              serviceName: "Hair cut",
              servicePrice: 200,
              barberServiceEWT: 40,
              _id: "6768f2d1f8de1daedf34a825"
            }
          ]
        },
        {
          _id: 2,
          customerName: "Customer Two",
          customerImage: "https://verint.imgix.net/wp-content/uploads/customer-calling-home-featured.png?fit=max&auto=format&auto=compress",
          startTime: "02:30",
          endTime: "05:45",
          services: [
            {
              serviceId: 1,
              serviceName: "Hair cut",
              servicePrice: 200,
              barberServiceEWT: 30,
              _id: "6768f2d1f8de1daedf34a825"
            }
          ]
        }
      ]
    },
    {
      barberId: 2,
      barberName: "Jackson",
      barberImage: "https://static.thehoneycombers.com/wp-content/uploads/sites/6/2024/01/barber-shops-lead-image.jpg",
      appointments: [
        {
          _id: 2,
          customerName: "Customer Two",
          customerImage: "https://images.unsplash.com/photo-1502767089025-6572583495f6",
          startTime: "10:00",
          endTime: "11:30",
          services: [
            {
              serviceId: 2,
              serviceName: "Beard Trim",
              servicePrice: 150,
              barberServiceEWT: 20,
              _id: "987c5e2fa9b84b8ebf24a671"
            },
            {
              serviceId: 3,
              serviceName: "Shave",
              servicePrice: 100,
              barberServiceEWT: 15,
              _id: "784c3e6fa3c64d9bbf32b712"
            }
          ]
        }
      ]
    },
    {
      barberId: 3,
      barberName: "Miguel",
      barberImage: "https://static.thehoneycombers.com/wp-content/uploads/sites/6/2024/01/barber-shops-lead-image.jpg",
      appointments: [
        {
          _id: 3,
          customerName: "Customer Three",
          customerImage: "https://images.unsplash.com/photo-1595152772835-219674b2a8a5",
          startTime: "13:00",
          endTime: "14:00",
          services: [
            {
              serviceId: 4,
              serviceName: "Hair Wash",
              servicePrice: 120,
              barberServiceEWT: 15,
              _id: "29c7f4a74d2345dfb9a23b17"
            },
            {
              serviceId: 5,
              serviceName: "Hair Color",
              servicePrice: 400,
              barberServiceEWT: 45,
              _id: "d37fa2b1a7424bfcab64e912"
            }
          ]
        },
        {
          _id: 4,
          customerName: "Customer Three",
          customerImage: "https://images.unsplash.com/photo-1595152772835-219674b2a8a5",
          startTime: "13:00",
          endTime: "14:00",
          services: [
            {
              serviceId: 4,
              serviceName: "Hair Wash",
              servicePrice: 120,
              barberServiceEWT: 15,
              _id: "29c7f4a74d2345dfb9a23b17"
            },
            {
              serviceId: 5,
              serviceName: "Hair Color",
              servicePrice: 400,
              barberServiceEWT: 45,
              _id: "d37fa2b1a7424bfcab64e912"
            }
          ]
        },
        {
          _id: 5,
          customerName: "Customer Three",
          customerImage: "https://images.unsplash.com/photo-1595152772835-219674b2a8a5",
          startTime: "13:00",
          endTime: "14:00",
          services: [
            {
              serviceId: 4,
              serviceName: "Hair Wash",
              servicePrice: 120,
              barberServiceEWT: 15,
              _id: "29c7f4a74d2345dfb9a23b17"
            },
            {
              serviceId: 5,
              serviceName: "Hair Color",
              servicePrice: 400,
              barberServiceEWT: 45,
              _id: "d37fa2b1a7424bfcab64e912"
            }
          ]
        },
        {
          _id: 6,
          customerName: "Customer Three",
          customerImage: "https://images.unsplash.com/photo-1595152772835-219674b2a8a5",
          startTime: "13:00",
          endTime: "14:00",
          services: [
            {
              serviceId: 4,
              serviceName: "Hair Wash",
              servicePrice: 120,
              barberServiceEWT: 15,
              _id: "29c7f4a74d2345dfb9a23b17"
            },
            {
              serviceId: 5,
              serviceName: "Hair Color",
              servicePrice: 400,
              barberServiceEWT: 45,
              _id: "d37fa2b1a7424bfcab64e912"
            }
          ]
        }
      ]
    },
    {
      barberId: 4,
      barberName: "Roberto",
      barberImage: "https://static.thehoneycombers.com/wp-content/uploads/sites/6/2024/01/barber-shops-lead-image.jpg",
      appointments: [
        {
          _id: 4,
          customerName: "Customer Four",
          customerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          startTime: "15:30",
          endTime: "16:15",
          services: [
            {
              serviceId: 6,
              serviceName: "Facial",
              servicePrice: 300,
              barberServiceEWT: 40,
              _id: "5b6f83d1c6d84dbcae21c812"
            }
          ]
        }
      ]
    },
    {
      barberId: 5,
      barberName: "Lucas",
      barberImage: "https://static.thehoneycombers.com/wp-content/uploads/sites/6/2024/01/barber-shops-lead-image.jpg",
      appointments: [
        {
          _id: 5,
          customerName: "Customer Five",
          customerImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
          startTime: "17:00",
          endTime: "18:30",
          services: [
            {
              serviceId: 7,
              serviceName: "Head Massage",
              servicePrice: 250,
              barberServiceEWT: 30,
              _id: "98a6c1d4fbdc4aebaa23e914"
            },
            {
              serviceId: 8,
              serviceName: "Hair Styling",
              servicePrice: 500,
              barberServiceEWT: 60,
              _id: "fa2bde19e6c34f9da6a25d01"
            }
          ]
        }
      ]
    }
  ];

  // const [selectedDate, setSelectedDate] = useState("")

  // console.log(selectedDate)


  const [selectedDate, setSelectedDate] = useState(null);

  const barbaplist = [
    {
      date: "2024-11-188",
      
    }
  ]

  const highlightDate = new Date(2024, 11, 18);

  return (
    <div className={`${style.appointment_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Appointment List</p>

        {/* <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            colorScheme: darkmodeOn ? "dark" : "light",
          }} /> */}

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={({ date, view }) =>
            view === "month" && date.toDateString() === highlightDate.toDateString()
              ? "highlight-with-dot"
              : ""
          }
        />

        <style>
          {`
          .react-calendar{
          z-index: 100
          }
          .highlight-with-dot {
            position: relative;
          }

          .highlight-with-dot::before {
            content: '';
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            background-color: red;
            border-radius: 50%;
            z-index: 1;
          }
        `}
        </style>
      </div>

      <div className={`${style.appointment_content_wrapper} ${darkmodeOn && style.dark}`}>
        {
          appointmentlist.map((appoint) => {
            return (
              <React.Fragment key={appoint.barberId}>
                <main className={`${style.appointment_container} ${darkmodeOn && style.dark}`}>
                  <div className={`${style.appointment_barber_container} ${darkmodeOn && style.dark}`}>
                    <div>
                      <img src={appoint.barberImage} alt='profile' />
                    </div>
                    <p>{appoint.barberName}</p>
                  </div>

                  <main className={style.appointment_content_list_container}>
                    {
                      appoint.appointments.map((cus) => {
                        return (
                          <div className={`${style.appointment_body_customer_item} ${darkmodeOn && style.dark}`} key={cus._id}>
                            <div><img src={cus.customerImage} alt="" /></div>
                            <div>
                              <p>{cus.customerName}</p>
                              <p>Time: {cus.startTime} - {cus.endTime}</p>
                              <p>EWT - {cus.services.reduce((total, service) => total + service.barberServiceEWT, 0)} mins</p>
                            </div>
                          </div>
                        )
                      })
                    }

                  </main>
                </main>
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  )
}

export default Appointment