// import React, { useEffect, useRef, useState } from 'react'
// import style from './Report.module.css'
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
// import { useDispatch, useSelector } from 'react-redux'
// import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
// import { ClickAwayListener } from '@mui/material'
// import Calendar from 'react-calendar'
// import api from '../../Redux/api/Api'
// import DatePicker from "react-multi-date-picker";
// import { getAdminBarberListAction } from '../../Redux/Admin/Actions/BarberAction'
// import Skeleton from 'react-loading-skeleton'
// import toast from 'react-hot-toast'

// const Report = () => {

//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
//   const dispatch = useDispatch()

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   // State for checkboxes


//   const [selectedFilter, setSelectedFilter] = useState("");
//   const [selectedRangeFilter, setSelectedRangeFilter] = useState("")

//   // console.log(selectedFilter)

//   const [weekOption, setWeekOption] = useState("");
//   const [monthOption, setMonthOption] = useState("");
//   const [dayOption, setDayOption] = useState("");
//   const [queueType, setQueueType] = useState("")
//   const [appointmentType, setAppointmentType] = useState("")

//   // console.log(queueType)

//   const [dummyReport] = useState([
//     {
//       "0": "0",
//       "TotalQueue": 0
//     },
//     {
//       "1": "1",
//       "TotalQueue": 0
//     },
//     {
//       "2": "2",
//       "TotalQueue": 0
//     },
//     {
//       "3": "3",
//       "TotalQueue": 0
//     },
//     {
//       "4": "4",
//       "TotalQueue": 0
//     },
//     {
//       "5": "5",
//       "TotalQueue": 0
//     },
//     {
//       "6": "6",
//       "TotalQueue": 0
//     }
//   ])

//   const [QueueReportData, setQueueReportData] = useState(dummyReport)
//   const [AppointmentReportData, setAppointmentReportData] = useState(dummyReport)

//   console.log(QueueReportData)

//   useEffect(() => {
//     if (selectedFilter && (dayOption || weekOption || monthOption) && (queueType || appointmentType)) {
//       try {
//         const getAllReports = async () => {
//           const reportOptions = {
//             salonId,
//             reportValue: queueType || appointmentType,
//             reportType: selectedFilter,
//             ...(selectedFilter === "daily" && { days: Number(dayOption) }),
//             ...(selectedFilter === "weekly" && { week: Number(weekOption) }),
//             ...(selectedFilter === "monthly" && { month: Number(monthOption) }),
//           };

//           const { data } = await api.post("/api/reports/getSalonReports", reportOptions);

//           if (queueType) {
//             setQueueReportData(data.response);
//           } else if (appointmentType) {
//             setAppointmentReportData(data.response)
//           }

//         };

//         getAllReports();
//       } catch (error) {
//         console.log(error)
//       }
//     }

//   }, [selectedFilter, dayOption, weekOption, monthOption, queueType, appointmentType]);


//   const [selectedDates, setSelectedDates] = useState([])

//   const handleDateChange = (dates) => {
//     const formatedDates = dates.map((date) => date.format("YYYY-MM-DD"))
//     setSelectedDates(formatedDates)
//     setSelectedFilter("")
//     setWeekOption("")
//     setMonthOption("")
//     setDayOption("")
//   }


//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.matchMedia("(max-width: 600px)").matches);
//     };

//     handleResize();

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);


//   const [openbarberContainer, setOpenBarberContainer] = useState(false)

//   const [selectedbarber, setSelectedbarber] = useState("")
//   const [selectedbarberId, setSelectedbarberId] = useState("")
//   const [selectedbarberEmail, setSelectedbarberEmail] = useState("")

//   const BarberListcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     BarberListcontrollerRef.current = controller;

//     dispatch(getAdminBarberListAction(salonId, controller.signal));

//     return () => {
//       if (BarberListcontrollerRef.current) {
//         BarberListcontrollerRef.current.abort();
//       }
//     };
//   }, [salonId, dispatch]);

//   const getAdminBarberList = useSelector(state => state.getAdminBarberList)

//   const {
//     loading: getAdminBarberListLoading,
//     getAllBarbers: BarberList
//   } = getAdminBarberList

//   // console.log(BarberList)

//   console.log(selectedbarber)
//   console.log(selectedbarberId)
//   console.log(selectedbarberEmail)

//   console.log(selectedDates)
//   console.log(selectedRangeFilter)

//   useEffect(() => {

//     if (selectedDates.length === 2 && selectedRangeFilter && (queueType || appointmentType) && selectedbarberEmail) {
//       const getAllReports = async () => {
//         try {
//           const reportOptions = {
//             salonId,
//             reportValue: (queueType || appointmentType),
//             reportType: selectedRangeFilter,
//             from: selectedDates[0],
//             to: selectedDates[1],
//             barberEmail: selectedbarberEmail,
//             barberId: selectedbarberId
//           };

//           const { data } = await api.post("/api/reports/getSalonReports", reportOptions);

//           if (queueType) {
//             setQueueReportData(data.response);
//           } else if (appointmentType) {
//             setAppointmentReportData(data.response)
//           }

//         } catch (error) {
//           toast.error(error?.response?.data?.message || "Something went wrong", {
//             duration: 3000,
//             style: {
//               fontSize: "var(--font-size-2)",
//               borderRadius: '0.3rem',
//               background: '#333',
//               color: '#fff',
//             },
//           });
//         }
//       };

//       getAllReports();
//     } else if (selectedDates.length === 2 && selectedRangeFilter && (queueType || appointmentType)) {
//       const getAllReports = async () => {
//         try {
//           const reportOptions = {
//             salonId,
//             reportValue: (queueType || appointmentType),
//             reportType: selectedRangeFilter,
//             from: selectedDates[0],
//             to: selectedDates[1]
//           };

//           const { data } = await api.post("/api/reports/getSalonReports", reportOptions);

//           if (queueType) {
//             setQueueReportData(data.response);
//           } else if (appointmentType) {
//             setAppointmentReportData(data.response)
//           }

//         } catch (error) {
//           toast.error(error?.response?.data?.message || "Something went wrong", {
//             duration: 3000,
//             style: {
//               fontSize: "var(--font-size-2)",
//               borderRadius: '0.3rem',
//               background: '#333',
//               color: '#fff',
//             },
//           });
//         }
//       };

//       getAllReports();
//     }
//   }, [selectedDates, selectedRangeFilter, queueType, appointmentType, selectedbarberEmail, selectedbarberId]);

//   const resetHandler = () => {
//     setSelectedDates([])
//     setSelectedRangeFilter("")
//     setSelectedbarberEmail("")
//     setSelectedbarberId("")
//     setSelectedbarber("")
//     setQueueReportData(dummyReport)
//     setAppointmentReportData(dummyReport)

//     setSelectedFilter("")
//     setWeekOption("")
//     setMonthOption("")
//     setDayOption("")
//     setQueueType("")
//     setAppointmentType("")
//   }


//   return (
//     <div className={`${style.salon_wrapper} ${darkmodeOn && style.dark}`}>
//       <div>
//         <p>Reports</p>
//         <div className={`${style.select_container}`}>
//           <div className={`${style.barber_container} ${darkmodeOn && style.dark}`}>
//             <input
//               placeholder='Select Barber'
//               value={selectedbarber}
//               onClick={() => setOpenBarberContainer((prev) => !prev)}
//             />

//             {
//               openbarberContainer && (
//                 <ClickAwayListener onClickAway={() => setOpenBarberContainer(false)}>
//                   <div className={`${style.barber_container_dropdown} ${darkmodeOn && style.dark}`}>

//                     {
//                       getAdminBarberListLoading ? (
//                         <Skeleton count={6} height={"4.5rem"} style={{ marginBottom: "1rem" }}
//                           baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                         />
//                       ) : BarberList?.length > 0 ? (
//                         BarberList.map((b) => {
//                           return (
// <div
//   className={`${style.barber_item} ${darkmodeOn && style.dark}`}
//   key={b.barberId}
//   style={{
//     border: selectedbarber === b.name ? "0.1rem solid rgba(0,0,0,0.6)" : "0.1rem solid rgba(0,0,0,0.2)"
//   }}
//   onClick={() => {
//     setSelectedbarber(b.name)
//     setSelectedbarberId(b.barberId)
//     setSelectedbarberEmail(b.email)
//     setQueueReportData(dummyReport)
//     setWeekOption("")
//     setMonthOption("")
//     setDayOption("")
//     setSelectedFilter("")
//     setOpenBarberContainer(false)
//   }}
// >
//   <div>
//     <img src={b?.profile?.[0]?.url} alt="" />
//   </div>
//   <p>{b?.name}</p>
// </div>
//                           )
//                         })
//                       ) : (
//                         <div style={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           height: "100%"
//                         }}>
//                           <p style={{ fontSize: "1.4rem" }}>No barber</p>
//                         </div>
//                       )
//                     }

//                   </div>
//                 </ClickAwayListener>
//               )
//             }
//           </div>

//           <div>
// <DatePicker
//   numberOfMonths={isMobile ? 1 : 2}
//   value={selectedDates}
//   range
//   placeholder='yyyy-mm-dd - yyyy-mm-dd'
//   onChange={handleDateChange}
//   dateSeparator={" - "}
//   calendarPosition={"bottom-right"}
//   className={darkmodeOn ? "dark-theme" : "light-theme"}
//   style={{
//     background: darkmodeOn ? "#222" : "#fff"
//   }}
// />
//           </div>

//           <select name="" id=""
//             className={`${darkmodeOn && style.dark}`}
//             onChange={(e) => setSelectedRangeFilter(e.target.value)} value={selectedRangeFilter}
//           >
//             <option value="" disabled>Select a range</option>
//             <option value="daily">daily</option>
//             <option value="weekly">Weekly</option>
//             <option value="monthly">Monthly</option>
//           </select>

//           <button onClick={resetHandler} className={`${style.reset_btn} ${darkmodeOn && style.dark}`}>Reset</button>


//         </div>


//       </div>

//       <div className={`${style.filter_container} ${darkmodeOn && style.dark}`}>
//         <div
//           className={selectedFilter === "daily" ? style.checked : style.unchecked}
//           onClick={() => {
//             setSelectedFilter("daily")
//             setSelectedRangeFilter("")
//             setSelectedDates([])
//             setWeekOption("")
//             setMonthOption("")
//             setQueueReportData(dummyReport)
//             setAppointmentReportData(dummyReport)
//             setSelectedbarberEmail("")
//             setSelectedbarber("")
//             setSelectedbarberId("")
//           }}
//         >
//           <p>Daily</p>
//           {selectedFilter === "daily" && (
//             <select onChange={(e) => setDayOption(e.target.value)} value={dayOption} className={`${darkmodeOn && style.dark}`}>
//               <option value="" disabled>Select a range</option>
//               <option value="7">Last 7 Days</option>
//               <option value="12">Last 12 Days</option>
//               <option value="14">Last 14 Days</option>
//             </select>
//           )}
//         </div>

//         <div
//           className={selectedFilter === "weekly" ? style.checked : style.unchecked}
//           onClick={() => {
//             setSelectedFilter("weekly")
//             setSelectedRangeFilter("")
//             setSelectedDates([])
//             setMonthOption("")
//             setDayOption("")
//             setQueueReportData(dummyReport)
//             setAppointmentReportData(dummyReport)
//             setSelectedbarberEmail("")
//             setSelectedbarber("")
//             setSelectedbarberId("")
//           }}
//         >
//           <p>Weekly</p>
//           {selectedFilter === "weekly" && (
//             <select onChange={(e) => setWeekOption(e.target.value)} value={weekOption} className={`${darkmodeOn && style.dark}`}>
//               <option value="" disabled>Select a range</option>
//               <option value="0">This Week</option>
//               <option value="2">Last 2 Week</option>
//               <option value="4">Last 4 Weeks</option>
//             </select>
//           )}
//         </div>

//         <div
//           className={selectedFilter === "monthly" ? style.checked : style.unchecked}
//           onClick={() => {
//             setSelectedFilter("monthly")
//             setSelectedRangeFilter("")
//             setSelectedDates([])
//             setWeekOption("")
//             setDayOption("")
//             setQueueReportData(dummyReport)
//             setAppointmentReportData(dummyReport)
//             setSelectedbarberEmail("")
//             setSelectedbarber("")
//             setSelectedbarberId("")
//           }}
//         >
//           <p>Monthly</p>
//           {selectedFilter === "monthly" && (
//             <select onChange={(e) => setMonthOption(e.target.value)} value={monthOption} className={`${darkmodeOn && style.dark}`}>
//               <option value="" disabled>Select a range</option>
//               <option value="0">This year</option>
//               <option value="3">Last 3 Months</option>
//               <option value="6">Last 6 Months</option>
//               <option value="12">Last 12 Months</option>
//             </select>
//           )}
//         </div>

//         <div>

//           <select onChange={(e) => {
//             setAppointmentType("")
//             setAppointmentReportData(dummyReport)
//             setQueueType(e.target.value)
//           }} value={queueType} className={`${darkmodeOn && style.dark}`}>
//             <option value="" disabled>Select queue type</option>
//             <option value="queueserved">Queue Serve</option>
//             <option value="queuecancelled">Queue Cancel</option>
//           </select>
//         </div>

//         <div>
//           <select onChange={(e) => {
//             setQueueType("")
//             setQueueReportData(dummyReport)
//             setAppointmentType(e.target.value)
//           }} value={appointmentType} className={`${darkmodeOn && style.dark}`}>
//             <option value="" disabled>Select appointment type</option>
//             <option value="appointmentserved">Appointment Serve</option>
//             <option value="appointmentcancelled">Appointment Cancel</option>
//           </select>
//         </div>

//       </div>

//       <div className={`${style.report_container}`}>
//       <p style={{
//             marginBottom: 20
//           }}>Queue Report</p>

//           <ResponsiveContainer width={isMobile ? "200%" : "100%"} height="50%">
//             {QueueReportData.length > 0 ? (
//               <BarChart
//                 width={150}
//                 height={50}
//                 data={QueueReportData}
//                 margin={{ bottom: 30 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey={
//                     (selectedRangeFilter || selectedFilter) === "daily"
//                       ? "date"
//                       : (selectedRangeFilter || selectedFilter) === "weekly"
//                         ? "week"
//                         : (selectedRangeFilter || selectedFilter) === "monthly"
//                           ? "month"
//                           : ""
//                   }
//                   tick={{ fontSize: 12 }}
//                   angle={(selectedRangeFilter || selectedFilter) === "daily" ? -45 : 0}
//                   textAnchor="end"
//                   dy={10}
//                   interval={0}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="TotalQueue" fill="rgba(255, 0, 0, 0.393)" stroke="rgba(255, 0, 0, 0.393)" strokeWidth={1} />
//               </BarChart>
//             ) : (
//               <div style={{ height: "20rem", marginInline: "0.5rem", border: darkmodeOn ? "0.1rem solid rgba(255,255,255,0.2)" : "0.1rem solid rgba(0,0,0,0.2)", textAlign: "center", alignContent: "center", boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "4px" }}>
//                 No Queue Report Available
//               </div>
//             )}
//           </ResponsiveContainer>

//           <div style={{ marginBlock: "1rem" }}></div>

//           <p style={{
//             marginBottom: 20
//           }}>Appointment Report</p>

//           <ResponsiveContainer width={isMobile ? "200%" : "100%"} height="50%">
//             {AppointmentReportData.length > 0 ? (
//               <BarChart
//                 width={150}
//                 height={50}
//                 data={AppointmentReportData}
//                 margin={{ bottom: 30 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey={
//                     (selectedRangeFilter || selectedFilter) === "daily"
//                       ? "date"
//                       : (selectedRangeFilter || selectedFilter) === "weekly"
//                         ? "week"
//                         : (selectedRangeFilter || selectedFilter) === "monthly"
//                           ? "month"
//                           : ""
//                   }
//                   tick={{ fontSize: 12 }}
//                   angle={(selectedRangeFilter || selectedFilter) === "daily" ? -45 : 0}
//                   textAnchor="end"
//                   dy={10}
//                   interval={0}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="TotalQueue" fill="rgba(255, 0, 0, 0.393)" stroke="rgba(255, 0, 0, 0.393)" strokeWidth={1} />
//               </BarChart>
//             ) : (
//               <div style={{ height: "20rem", marginInline: "0.5rem", border: darkmodeOn ? "0.1rem solid rgba(255,255,255,0.2)" : "0.1rem solid rgba(0,0,0,0.2)", textAlign: "center", alignContent: "center", boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "4px" }}>
//                 No Appointment Report Available
//               </div>
//             )}
//           </ResponsiveContainer>
//       </div>

//     </div>
//   )
// }

// export default Report


import React, { useEffect, useRef, useState } from 'react'
import style from './Report.module.css'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Box, ClickAwayListener, Modal, Typography } from '@mui/material'
import api from '../../Redux/api/Api'
import Calendar from "react-multi-date-picker";
import { getAdminBarberListAction } from '../../Redux/Admin/Actions/BarberAction'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'
import { CheckIcon, CloseIcon, FilterIcon, ResetIcon, SearchIcon } from '../../newicons';

const Report = () => {

  const appointReportData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  // If Report Type daily then maximum i will give them to see is 21
  // If Weekly then 8 weeks
  // If Monthly then 2 years

  // I also have to give a search icon on press i will call api. So that user can understand,
  // what field is missing

  const reportType = [
    {
      type: "Daily",
      value: true,
    },
    {
      type: "Weekly",
      value: false
    },
    {
      type: "Monthly",
      value: false
    }
  ]

  const QueueType = [
    {
      type: "Queue Served",
      value: true
    },
    {
      type: "Queue Cancelled",
      value: false
    },
  ]

  const AppointmentType = [
    {
      type: "Appointment Served",
      value: false,
    },
    {
      type: "Appointment Cancelled",
      value: false
    },
  ]


  const SelectType = [
    {
      type: "Salon Report",
      value: false
    },
    {
      type: "Barber Report",
      value: true
    },
  ]

  const [barberlistData, setBarberlistData] = useState([
    {
      "_id": "67a46ad5c85dd16cdfa7f1c9",
      "name": "John Doe",
      "email": "john@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$tH/C1Xo25p6i0S9TRyjiPOwV5UbxAImvX1LVFZ1spUjhmmXDQlPaW",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "john",
      "mobileNumber": 8240205351,
      "mobileCountryCode": 91,
      "mobileVerified": false,
      "dateOfBirth": "2002-04-11T00:00:00.000Z",
      "salonId": 1,
      "barberId": 1,
      "barberCode": "JO1",
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 120,
          "_id": "67a46936c85dd16cdfa7ef9c"
        },
        {
          "serviceIcon": {
            "public_id": "icons/spa_1706703379407",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/spa_1706703379407.jpg"
          },
          "serviceId": 13,
          "serviceCode": "HA13",
          "serviceName": "Hair Spa",
          "servicePrice": 100,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9d"
        }
      ],
      "barberEWT": 530,
      "queueCount": 4,
      "isOnline": true,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "public_id": "barbers/download - 2024-12-27T164801_7c8887e1-1d2b-4946-8dfa-42fb9f696021",
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1739771508/barbers/download%20-%202024-12-27T164801_7c8887e1-1d2b-4946-8dfa-42fb9f696021.png",
          "_id": "67b2ce7459f98fd329c6cd46"
        }
      ],
      "createdAt": "2025-02-06T07:55:01.949Z",
      "updatedAt": "2025-03-13T13:17:36.291Z",
      "__v": 0
    },
    {
      "_id": "67a46b28c85dd16cdfa7f26e",
      "name": "Bob",
      "email": "bob@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$GGig2mi/OCrewGSpYcIJJ.Bl94xzSTv6tu.oh//Yw.wgQCzZm7clC",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "bob",
      "mobileNumber": 8240205351,
      "mobileCountryCode": 91,
      "mobileVerified": false,
      "dateOfBirth": "2009-12-04T00:00:00.000Z",
      "salonId": 1,
      "barberId": 2,
      "barberCode": "BO2",
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Malehaircut_1706703379405",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Malehaircut_1706703379405.png"
          },
          "serviceId": 11,
          "serviceCode": "HA11",
          "serviceName": "Haircut",
          "servicePrice": 38,
          "vipService": false,
          "barberServiceEWT": 20,
          "_id": "67a46936c85dd16cdfa7ef9b"
        },
        {
          "serviceIcon": {
            "public_id": "icons/massage_1706703379406",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703380/icons/massage_1706703379406.jpg"
          },
          "serviceId": 14,
          "serviceCode": "MA14",
          "serviceName": "Massage",
          "servicePrice": 70,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9e"
        },
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9c"
        },
        {
          "serviceIcon": {
            "public_id": "icons/spa_1706703379407",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/spa_1706703379407.jpg"
          },
          "serviceId": 13,
          "serviceCode": "HA13",
          "serviceName": "Hair Spa",
          "servicePrice": 100,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9d"
        }
      ],
      "barberEWT": 50,
      "queueCount": 1,
      "isOnline": true,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "public_id": "barbers/photo-1562004760-aceed7bb0fe3_a799f144-0078-4b1f-a6cf-2204599c9ffd",
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1739169664/barbers/photo-1562004760-aceed7bb0fe3_a799f144-0078-4b1f-a6cf-2204599c9ffd.jpg",
          "_id": "67a99f80faacd06cfb189d64"
        }
      ],
      "createdAt": "2025-02-06T07:56:24.715Z",
      "updatedAt": "2025-03-13T13:14:48.872Z",
      "__v": 0
    },
    {
      "_id": "67a46b6bc85dd16cdfa7f2ef",
      "name": "Jazz",
      "email": "jazz@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$YWO4UJGfeOTx0lciID9ls.t9QmU9Qr3kkymsnHd1I/HnlRXFkYGSC",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "jazz",
      "mobileNumber": 1234567890,
      "mobileCountryCode": 44,
      "mobileVerified": false,
      "dateOfBirth": "2008-04-09T00:00:00.000Z",
      "salonId": 1,
      "barberId": 3,
      "barberCode": "JA3",
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9c"
        },
        {
          "serviceIcon": {
            "public_id": "icons/spa_1706703379407",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/spa_1706703379407.jpg"
          },
          "serviceId": 13,
          "serviceCode": "HA13",
          "serviceName": "Hair Spa",
          "servicePrice": 100,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9d"
        },
        {
          "serviceIcon": {
            "public_id": "icons/massage_1706703379406",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703380/icons/massage_1706703379406.jpg"
          },
          "serviceId": 14,
          "serviceCode": "MA14",
          "serviceName": "Massage",
          "servicePrice": 70,
          "vipService": true,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9e"
        }
      ],
      "barberEWT": 0,
      "queueCount": 0,
      "isOnline": false,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "public_id": "barbers/istockphoto-853924196-612x612_d9c08f1f-43e7-4dc0-ba7f-812489274166",
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1739169753/barbers/istockphoto-853924196-612x612_d9c08f1f-43e7-4dc0-ba7f-812489274166.jpg",
          "_id": "67a99fd9faacd06cfb189f1c"
        }
      ],
      "createdAt": "2025-02-06T07:57:31.219Z",
      "updatedAt": "2025-02-28T08:01:54.925Z",
      "__v": 0
    },
    {
      "_id": "67a9a1e1faacd06cfb18a6d4",
      "name": "Hercules",
      "email": "hbk@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$7v5h.Ei0T3YdnIigoHga9eBmkw117PsZaWhrwJ3AiX9gWwsN2yzRO",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "",
      "mobileVerified": false,
      "dateOfBirth": "2009-12-10T00:00:00.000Z",
      "salonId": 1,
      "barberId": 4,
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberEWT": 0,
      "queueCount": 0,
      "isOnline": true,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1720520065/default-avatar-icon-of-social-media-user-vector_wl5pm0.jpg",
          "_id": "67a9a1e1faacd06cfb18a6d5"
        }
      ],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Malehaircut_1706703379405",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Malehaircut_1706703379405.png"
          },
          "serviceId": 11,
          "serviceCode": "HA11",
          "serviceName": "Haircut",
          "servicePrice": 38,
          "vipService": false,
          "barberServiceEWT": 25,
          "_id": "67a46936c85dd16cdfa7ef9b"
        },
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9c"
        }
      ],
      "createdAt": "2025-02-10T06:51:13.428Z",
      "updatedAt": "2025-03-10T08:33:02.447Z",
      "__v": 0,
      "gender": "Male",
      "mobileCountryCode": 44,
      "mobileNumber": 1234567890
    },
    {
      "_id": "67a9a32efaacd06cfb18abaa",
      "name": "hg",
      "email": "hg@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$1S0IkVFTWN1GQBtQ0GMWu.y9OG3TfNfgncaTOeqgD.JLafR4EoiGi",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "",
      "mobileVerified": false,
      "dateOfBirth": "2009-12-10T00:00:00.000Z",
      "salonId": 1,
      "barberId": 5,
      "isActive": true,
      "isApproved": false,
      "barberRatings": [],
      "barberEWT": 0,
      "queueCount": 0,
      "isOnline": false,
      "isClockedIn": false,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1720520065/default-avatar-icon-of-social-media-user-vector_wl5pm0.jpg",
          "_id": "67a9a32efaacd06cfb18abab"
        }
      ],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Malehaircut_1706703379405",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Malehaircut_1706703379405.png"
          },
          "serviceId": 11,
          "serviceCode": "HA11",
          "serviceName": "Haircut",
          "servicePrice": 38,
          "vipService": false,
          "barberServiceEWT": 25,
          "_id": "67a46936c85dd16cdfa7ef9b"
        },
        {
          "serviceIcon": {
            "public_id": "icons/massage_1706703379406",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703380/icons/massage_1706703379406.jpg"
          },
          "serviceId": 14,
          "serviceCode": "MA14",
          "serviceName": "Massage",
          "servicePrice": 70,
          "vipService": true,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9e"
        }
      ],
      "createdAt": "2025-02-10T06:56:46.889Z",
      "updatedAt": "2025-03-07T11:40:19.338Z",
      "__v": 0,
      "gender": "Male",
      "mobileCountryCode": 44,
      "mobileNumber": 1234567890
    }
  ])


  const [selectedDates, setSelectedDates] = useState([])


  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  return (
    <div className={style.section}>
      <div>
        <h2>Reports</h2>
        <div>

          <Calendar
            // numberOfMonths={isMobile ? 1 : 2}
            numberOfMonths={false ? 1 : 2}
            value={selectedDates}
            range
            placeholder='yyyy-mm-dd - yyyy-mm-dd'
            // onChange={handleDateChange}
            dateSeparator={" - "}
            calendarPosition={"bottom-right"}
            className={true ? "dark-theme" : "light-theme"}
            style={{
              // background: true ? "#222" : "#fff"
            }}
          />

          <button><ResetIcon /></button>
          <button>View Report</button>
        </div>
      </div>

      <div>
        <div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={appointReportData}
              margin={{
                left: -10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                cursor={{ fill: "var(--input-bg-color)" }}
                contentStyle={{
                  backgroundColor: "var(--bg-primary)",
                  border: "0.1rem solid var(--border-secondary)",
                }}
                wrapperStyle={{
                  outline: "none"
                }}
              />

              <Bar dataKey="uv" fill="var(--bg-secondary)" radius={[2, 2, 2, 2]} />
            </BarChart>
          </ResponsiveContainer>
          <div className={`${style.report_footer}`}>
            <p>Report Type - Queue Served (Daily)</p>
            <p>Select - Barber</p>
          </div>
        </div>
        <div>

          <div>
            <div>
              <p>Report Type</p>
              {
                reportType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            <div>
              <p>Queue Type</p>
              {
                QueueType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            <div>
              <p>Appointment Type</p>
              {
                AppointmentType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p>Select </p>
              {
                SelectType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>


            {
              barberlistData.map((item) => {
                return (<div
                  className={`${style.barber_item}`}
                  key={item.barberId}
                >
                  <img src={item.profile?.[0].url} alt="" />

                  <p>{item.name}</p>
                </div>)
              })
            }

          </div>
        </div>
      </div>

      <div className={`${style.mobile_report_header}`}>
        <div>
          <h2>Reports</h2>
          <button onClick={() => setMobileFilterOpen(true)}><FilterIcon /></button>
        </div>
      </div>


      <div className={`${style.mobile_report_body}`}>
        <div className={`${style.report_body_content}`}>
          <ResponsiveContainer width="200%" height="85%">
            <BarChart
              data={appointReportData}
              margin={{
                left: -10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "var(--input-bg-color)" }} />
              <Bar dataKey="uv" fill="var(--bg-secondary)" radius={[2, 2, 2, 2]} />
            </BarChart>
          </ResponsiveContainer>

          <div className={`${style.report_footer}`}>
            <p>Report Type - Queue Served (Daily)</p>
            <p>Select - Barber</p>
          </div>
        </div>
      </div>


      <Modal
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={style.modalbox}>
          <div>
            <p>Apply Filter</p>
            <button onClick={() => setMobileFilterOpen(false)}><CloseIcon /></button>
          </div>

          <div>
            <p>Report Type</p>
            <div>
              {
                reportType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            <p>Queue Type</p>
            <div>
              {
                QueueType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            <p>Appointment Type</p>
            <div>
              {
                AppointmentType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            <p>Select </p>
            <div>
              {
                SelectType.map((item, index) => {
                  return (
                    <div key={index}>
                      <button
                        style={{
                          background: item.value ? "var(--bg-secondary)" : "var(--btn-primary-hover)",
                        }}
                      >{item.value ? <CheckIcon /> : ""}</button>
                      <p>{item.type}</p>
                    </div>
                  )
                })
              }
            </div>

            {
              SelectType[1].value ? (<div className={`${style.barberlist_container}`}>
                {
                  barberlistData.map((item) => {
                    return (<div
                      className={`${style.barber_item}`}
                      key={item.barberId}
                    >
                      <img src={item.profile?.[0].url} alt="" />

                      <p>{item.name}</p>
                    </div>)
                  })
                }
              </div>) : (null)
            }

            <div>
              <Calendar
                // numberOfMonths={isMobile ? 1 : 2}
                numberOfMonths={1}
                value={selectedDates}
                range
                placeholder='yyyy-mm-dd - yyyy-mm-dd'
                // onChange={handleDateChange}
                dateSeparator={" - "}
                calendarPosition={"bottom-right"}
                className={true ? "dark-theme" : "light-theme"}
                style={{
                  // background: true ? "#222" : "#fff"
                }}
              />

              <button><ResetIcon /></button>

            </div>

            <button>View Report</button>
          </div>

        </Box>

      </Modal>

    </div>
  )
}

export default Report

