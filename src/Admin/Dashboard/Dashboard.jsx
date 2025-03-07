// import React, { useEffect, useRef, useState } from 'react'
// import Skeleton from 'react-loading-skeleton'
// import style from './Dashboard.module.css'
// import { useNavigate } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllAdvertisementAction, getAllQueueListAction, getDashboardAppointmentListAction } from '../../Redux/Admin/Actions/DashboardAction';
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
// import { getAdminBarberListAction } from '../../Redux/Admin/Actions/BarberAction';
// import api from '../../Redux/api/Api';

// const Dashboard = () => {

//   const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

//   const {
//     loading: adminGetDefaultSalonLoading,
//     resolve: adminGetDefaultSalonResolve,
//     response: adminGetDefaultSalonResponse
//   } = adminGetDefaultSalon


//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
//   const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
//   const adminName = useSelector(state => state.AdminLoggedInMiddleware.adminName)

//   const advertisementcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     advertisementcontrollerRef.current = controller;

//     dispatch(getAllAdvertisementAction(salonId, controller.signal));

//     return () => {
//       if (advertisementcontrollerRef.current) {
//         advertisementcontrollerRef.current.abort();
//       }
//     };
//   }, [salonId, dispatch]);


//   const getAllAdvertisement = useSelector(state => state.getAllAdvertisement)

//   const {
//     loading: getAllAdvertisementLoading,
//     resolve: getAllAdvertisementResolve,
//     advertisements
//   } = getAllAdvertisement


//   const queuelistcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     queuelistcontrollerRef.current = controller;

//     dispatch(getAllQueueListAction(salonId, controller.signal));

//     return () => {
//       if (queuelistcontrollerRef.current) {
//         queuelistcontrollerRef.current.abort();
//       }
//     };
//   }, [salonId, dispatch]);

//   const getAllQueueList = useSelector(state => state.getAllQueueList)

//   const {
//     loading: getAllQueueListLoading,
//     resolve: getAllQueueListResolve,
//     queueList: queuelist
//   } = getAllQueueList

//   const [currentDate, setCurrentDate] = useState(new Date())

//   const appointmentlistcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     if (currentDate) {
//       const formattedDate = currentDate?.toISOString().split("T")[0]

//       const controller = new AbortController();
//       appointmentlistcontrollerRef.current = controller;

//       dispatch(getDashboardAppointmentListAction(salonId, formattedDate, controller.signal));

//       return () => {
//         if (appointmentlistcontrollerRef.current) {
//           appointmentlistcontrollerRef.current.abort();
//         }
//       };
//     }
//   }, [salonId, dispatch, currentDate])


//   const getDashboardAppointmentList = useSelector(state => state.getDashboardAppointmentList)

//   const {
//     loading: getDashboardAppointmentListLoading,
//     resolve: getDashboardAppointmentListResolve,
//     response: appointmentList
//   } = getDashboardAppointmentList


//   const truncateText = (text, characterLimit) => {
//     if (!text) return '';

//     // console.log(text.length)

//     if (text.length <= characterLimit) {
//       return text;
//     }

//     let truncatedText = text.slice(0, characterLimit);

//     return truncatedText + '...';
//   };


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
//     resolve: getAdminBarberListResolve,
//     getAllBarbers: BarberList
//   } = getAdminBarberList

//   const data2 = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"


//   const [reportData, setReportData] = useState([])

//   useEffect(() => {
//     const getAllReports = async () => {
//       const { data } = await api.post("/api/reports/getdashboardReports", {
//         salonId,
//         reportType: "daily"
//       })

//       setReportData(data.response)

//     }

//     getAllReports()

//   }, [])


//   return (
//     salonId === 0 ? (<>
//       <main className={style.dashboard}>
//         <div className={`${style.dashboard_body_intial} ${darkmodeOn && style.dark}`}>
//           <div className={`${style.dashboard_intial_container}`}>
//             <p>Hey &#128075;, {adminName || email?.split('@')[0]}</p>
//             <div>
//               <p>You don't have any salon right now.</p>
//               <button onClick={() => navigate("/admin-salon/createsalon")}>Create</button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>) : (<>
//       <main className={style.dashboard}>
//         <main className={style.dashboard_body}>
//           <div className={style.inner_container}>
//             <div className={style.dashboard_container_one}>
//               <div className={`${style.saloninfo_container} ${darkmodeOn && style.dark}`}>
//                 <div>
//                   <h2>Welcome, {adminName}</h2>
//                 </div>

//                 <div>
//                   {
//                     adminGetDefaultSalonLoading ?
//                       <div
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           paddingTop: "2rem",
//                           paddingInline: "1rem"
//                         }}>
//                         <Skeleton count={1} height={"4rem"} style={{ borderRadius: "0.3rem" }}
//                           baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                         />
//                       </div> :
//                       adminGetDefaultSalonResolve && adminGetDefaultSalonResponse?.salonDesc?.length > 0 ?
//                         <i>
//                           {truncateText(adminGetDefaultSalonResponse?.salonDesc, 35)}
//                         </i> :
//                         <i>
//                           You currently have no salon information
//                         </i>
//                   }

//                 </div>
//               </div>

//               {
//                 getAllAdvertisementLoading ?
//                   <div className={style.salonadv_container_loader}>
//                     <Skeleton count={1} className={style.dashboard_advertise_loader} style={{ borderRadius: "0.6vw" }}
//                       baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                     />
//                   </div> :
//                   getAllAdvertisementResolve && advertisements?.length > 0 ?
//                     <div className={`${style.salonadv_container} ${darkmodeOn && style.dark}`}>
//                       <Carousel
//                         showThumbs={false}
//                         infiniteLoop={true}
//                         autoPlay={true}
//                         interval={5000}
//                         showStatus={false}
//                         showArrows={false}
//                         stopOnHover={false}
//                         swipeable={false}
//                       >
//                         {
//                           advertisements?.slice(0, 5)?.map((item) => {
//                             return (
//                               <div className={style.carousel_item_container} key={item._id}>
//                                 <img src={item.url} alt="image_item" />
//                               </div>
//                             )
//                           })
//                         }
//                       </Carousel>
//                     </div> :
//                     <div className={style.salonadv_container_error}>
//                       <img src="./no-image.jpg" alt="no_image" />
//                     </div>
//               }


//               <div className={style.barber_report_container}>
//                 <div className={`${style.barberlist_container} ${darkmodeOn && style.dark}`}>

//                   <div className={`${style.barberitem_header} ${darkmodeOn && style.dark}`}>
//                     <div>
//                       <div>

//                       </div>
//                       <p>Barber</p>
//                     </div>
//                     <div><p>Queue</p></div>
//                     <div><p>EWT</p></div>
//                   </div>
//                   {
//                     getAdminBarberListLoading ?
//                       <div className={style.barberlist_container_body_loading}>
//                         <Skeleton count={2} height={"6rem"} style={{ marginBottom: "1rem" }}
//                           baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                         />
//                       </div> :
//                       getAdminBarberListResolve && BarberList?.length > 0 ?
//                         <div className={style.barberlist_container_body}>


//                           {
//                             BarberList?.map((barber, index) => {
//                               return (
//                                 <div
//                                   className={`${style.barberitem} ${darkmodeOn && style.dark}`}
//                                   key={barber._id}
//                                   style={{
//                                     borderBottom: BarberList.length - 1 === index && "none"
//                                   }}
//                                 >
//                                   <div>
//                                     <div>
//                                       <img src={barber?.profile?.[0]?.url} alt="barber" />
//                                       <div
//                                         style={{
//                                           background: barber?.isOnline ? "limegreen" : "red"
//                                         }}
//                                       ></div>
//                                     </div>
//                                     <p>{barber.name.length > 6 ? `${barber.name.slice(0, 6).concat("...")}` : barber.name}</p>
//                                   </div>
//                                   <div><p>{barber.queueCount}</p></div>
//                                   <div><p>{barber.barberEWT} mins</p></div>
//                                 </div>
//                               )
//                             })
//                           }
//                         </div> :
//                         <div className={style.barberlist_container_body_error}>
//                           <p>No barber available</p>
//                         </div>
//                   }

//                 </div>
//                 <div className={`${style.report_container} ${darkmodeOn && style.dark}`}>

//                   <Carousel
//                     showThumbs={false}
//                     infiniteLoop={true}
//                     autoPlay={false}
//                     interval={5000}
//                     showStatus={false}
//                     showArrows={false}
//                     stopOnHover={true}
//                     swipeable={true}
//                     renderIndicator={false}
//                   >

//                     <div className={style.r_chart}>
//                       <p>Report-Type One</p>
//                       <div>
//                         <ResponsiveContainer width="100%" height="100%" style={{ marginTop: 20}}>
//                           <BarChart width={150} height={50} data={reportData}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" />
//                             {/* <YAxis /> */}
//                             <Tooltip />
//                             <Bar dataKey="totalQueue" fill="rgba(255, 0, 0, 0.393)" stroke="#000000" strokeWidth={1} />
//                           </BarChart>
//                         </ResponsiveContainer>
//                       </div>
//                     </div>

//                   </Carousel>
//                 </div>
//               </div>
//             </div>


//             <div className={style.dashboard_container_two}>
//               <div className={`${style.queuelists_container} ${darkmodeOn && style.dark}`}>
//                 <div className={`${style.queue_header} ${darkmodeOn && style.dark}`}>
//                   <div><p>#</p></div>
//                   <div><p>Name</p></div>
//                   <div><p>Barber</p></div>
//                   <div><p>EWT</p></div>
//                 </div>

//                 {
//                   getAllQueueListLoading ?
//                     <div className={style.queue_body_loading}>
//                       <Skeleton count={7} height={"6rem"} style={{ marginBottom: "1rem" }}
//                         baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                         highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
//                     </div> :
//                     getAllQueueListResolve && queuelist?.length > 0 ?
//                       <div className={style.queue_body}>
//                         {
//                           queuelist.map((queue, index) => {
//                             return (
//                               <div
//                                 key={queue._id}
//                                 className={`${style.queue_item} ${darkmodeOn && style.dark}`}
//                                 style={{
//                                   borderBottom: index === queuelist.length - 1 && "none"
//                                 }}
//                               >
//                                 <div><p>{queue.qPosition === 1 ? "Next" : queue.qPosition}</p></div>
//                                 <div><p>{queue.name.length > 6 ? `${queue.name.slice(0, 6).concat("...")}` : queue.name}</p></div>
//                                 <div><p>{queue.barberName.length > 6 ? `${queue.barberName.slice(0, 6).concat("...")}` : queue.barberName}</p></div>
//                                 <div><p>{queue.customerEWT === 0 ? "-" : queue.customerEWT + "mins"}</p></div>
//                               </div>
//                             )
//                           })
//                         }
//                       </div> :
//                       <div className={style.queue_body_error}>
//                         <p>No queuelist available</p>
//                       </div>
//                 }

//               </div>
//             </div>
//           </div>
//         </main>
//       </main >
//     </>)


//   )
// }

// export default Dashboard

import React from 'react'
import style from "./Dashboard.module.css"
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Tooltip } from '@mui/material';
import { AppointmentIcon } from '../../newicons';

const Dashboard = () => {

  const queueData = [
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


  const barberlist = [
    {
      name: "Jordan Nunez",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "Jose Sanchez",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "Krispi King",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "Dazel Clippz",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "Emily Watson",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "John Smith",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNvQn2bWXuOh7sTO1doC46MSLtg6yKv9aBEg&s"
    },
    {
      name: "Martin Luther King Jr.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNvQn2bWXuOh7sTO1doC46MSLtg6yKv9aBEg&s"
    },
    {
      name: "Emily Watson",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "John Smith",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNvQn2bWXuOh7sTO1doC46MSLtg6yKv9aBEg&s"
    },
    {
      name: "Martin Luther King Jr.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNvQn2bWXuOh7sTO1doC46MSLtg6yKv9aBEg&s"
    },
    {
      name: "Emily Watson",
      img: "data:image/jpeg;base64,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"
    },
    {
      name: "John Smith",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNvQn2bWXuOh7sTO1doC46MSLtg6yKv9aBEg&s"
    },
    {
      name: "Martin Luther King Jr.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNvQn2bWXuOh7sTO1doC46MSLtg6yKv9aBEg&s"
    }
  ]

  const queueList = [
    { customerName: "John Doe", barberName: "Mike Johnson", qPos: 1, mins: 30, customerImage: "https://i.pravatar.cc/150?img=1" },
    { customerName: "Emma Smith", barberName: "David Thompson", qPos: 2, mins: 40, customerImage: "https://i.pravatar.cc/150?img=2" },
    { customerName: "Liam Johnson", barberName: "Chris Williams", qPos: 3, mins: 35, customerImage: "https://i.pravatar.cc/150?img=3" },
    { customerName: "Sophia Brown", barberName: "Alex Martinez", qPos: 4, mins: 45, customerImage: "https://i.pravatar.cc/150?img=4" },
    { customerName: "Noah Wilson", barberName: "James Anderson", qPos: 5, mins: 25, customerImage: "https://i.pravatar.cc/150?img=5" },
    { customerName: "Olivia Martinez", barberName: "Brian Davis", qPos: 6, mins: 50, customerImage: "https://i.pravatar.cc/150?img=6" },
    { customerName: "William Davis", barberName: "John Rodriguez", qPos: 7, mins: 30, customerImage: "https://i.pravatar.cc/150?img=7" },
    { customerName: "Ava Garcia", barberName: "Ryan Clark", qPos: 8, mins: 40, customerImage: "https://i.pravatar.cc/150?img08" },
    { customerName: "James Rodriguez", barberName: "Ethan Scott", qPos: 9, mins: 20, customerImage: "https://i.pravatar.cc/150?img=9" },
    { customerName: "Mia Anderson", barberName: "Matt Lewis", qPos: 10, mins: 55, customerImage: "https://i.pravatar.cc/150?img=10" }
  ];

  const appointmentReportList = [
    {
      heading: "Total Appointments",
      value: 60,
    },
    {
      heading: "Served Appointments",
      value: 40,
    },
    {
      heading: "Canceled Appointments",
      value: 20,
    },
  ]

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


  return (
    <section className={`${style.dashboard_container}`}>
      <div>
        <h1>Welcome, Toby Belhome</h1>
      </div>

      <div>
        <div>

          <div>
            <div>
              <p>Barbers On Duty</p>
              <p>Total 6 barbers are <span>Online</span></p>
            </div>

            <div>
              {
                barberlist.map((b, index) => {
                  return (
                    <div className={`${style.barber_list_item}`} key={index}>
                      <div><img src={b.img} alt="" /></div>
                      <p>{b.name}</p>
                    </div>
                  )
                })
              }

            </div>
          </div>

          <div>
            <div>
              <p>Queue Reports</p>
              <p>Today status of Queue</p>
              <h2>70</h2>
            </div>

            <div className={`${style.queue_report_container}`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={queueData}
                >
                  <Line type="monotone" dataKey="pv" stroke="var(--bg-secondary)" strokeWidth={2} dot={{ fill: "#fff", stroke: "var(--bg-secondary)", strokeWidth: 2, r: 4 }} />
                  <Line type="monotone" dataKey="uv" stroke="var(--bg-secondary)" strokeWidth={2} dot={{ fill: "#fff", stroke: "var(--bg-secondary)", strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div>
              <p>Queue History</p>
              <p><span>+20.1%</span> from last 30 days</p>
              <h2>400</h2>
            </div>

            <div className={`${style.queue_history_container}`}>
              <div>
                <div>
                  <span style={{ background: "#00A36C" }}>+62.5%</span>
                  <p>Served</p>
                </div>

                <div>
                  <span style={{ background: "rgb(244, 67, 54)" }}>-32.5%</span>
                  <p>Canceled</p>
                </div>
              </div>

              <div>
                <div></div>
              </div>

            </div>

          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <p>Queue List</p>
                  <p>The current total queue count is 100.</p>
                </div>

                <div>
                  <h1>19th Feb - 25th Feb</h1>
                  <p><span>+20.1%</span> from last 7 days</p>
                </div>
              </div>

              <div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart width={150} height={40} data={appointReportData}>
                    <Bar dataKey="uv" fill="var(--bg-secondary)" radius={[3, 3, 3, 3]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              {
                appointmentReportList.map((item) => {
                  return (
                    <div
                      key={item.heading}
                      className={`${style.appoint_report_item}`}>
                      <div>
                        <div><AppointmentIcon /></div>
                        <p>{item.heading}</p>
                      </div>

                      <h2>{item.value}</h2>

                      <div><div></div></div>
                    </div>
                  )
                })
              }


            </div>
          </div>

          <div>
            <div>
              <p>Queue List</p>
              <p>The current total queue count is 100.</p>
            </div>

            <div>
              {
                queueList.map((item,index) => {
                  return (
                    <div className={`${style.queue_list_item}`} key={index}>
                      <div>
                        <div><img src={item.customerImage} alt="" /></div>
                        <div>
                          <p>{item.customerName}</p>
                          <p>{item.barberName}</p>
                        </div>
                      </div>

                      <div>
                        <h2>{item.qPos}</h2>
                        <p>Est. Time - {item.mins} mins</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard




