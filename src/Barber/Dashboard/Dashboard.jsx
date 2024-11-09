// import React, { useEffect, useRef, useState } from 'react'
// import Skeleton from 'react-loading-skeleton'
// import './Dashboard.css'
// import { Link } from 'react-router-dom'
// import { Carousel } from 'react-responsive-carousel';
// import { ChartIcon1, ChartIcon2, ChartIcon3, CheckIcon, DeleteIcon, ShowSalonInfo, UserIcon } from '../../icons';
// import { ResponsiveContainer, LineChart, Line } from 'recharts'
// import Calender from '../../components/Admin/Calender/Calender'

// import DashboardModal from '../../components/Modal/DashboardModal/DashboardModal';
// import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
// import { useDispatch, useSelector } from 'react-redux';
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
// import { barberConnectSalonAction, barberDashboardSalonInfoAction, barberSalonStatusAction, connectSalonListAction } from '../../Redux/Barber/Actions/DashboardAction';
// import { getBarberQueueListAction } from '../../Redux/Barber/Actions/BarberQueueAction';
// import { adminGetDefaultSalonAction } from '../../Redux/Admin/Actions/AdminHeaderAction';
// import { getAdminSalonImagesAction } from '../../Redux/Admin/Actions/SalonAction';

// const Dashboard = () => {

//   const dispatch = useDispatch()

//   const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
//   const email = useSelector(state => state.BarberLoggedInMiddleware.barberEmail)
//   const barberName = useSelector(state => state.BarberLoggedInMiddleware.barberName)
//   const barberId = useSelector(state => state.BarberLoggedInMiddleware.barberId)

//   const barberProfile = useSelector(state => state.BarberLoggedInMiddleware.entiredata)

//   useEffect(() => {
//     if (barberProfile?.user[0]?.isApproved == false) {
//       dispatch(connectSalonListAction())
//     }
//   }, [barberProfile])

//   const [loading, setLoading] = useState(false)

//   const reportsdata = [
//     {
//       id: 1,
//       icon: <ChartIcon1 />,
//       p: "Weekly"
//     },
//     {
//       id: 2,
//       icon: <ChartIcon2 />,
//       p: "Monthly"
//     },
//     {
//       id: 3,
//       icon: <ChartIcon3 />,
//       p: "Daily"
//     }
//   ]


//   const data = [
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


//   const [salonChar, setSalonChar] = useState(null);

//   const handleResize = () => {
//     if (window.matchMedia("(min-width: 1140px) and (max-width: 1250px)").matches) {
//       setSalonChar(145);
//     } else if (window.matchMedia("(min-width: 1251px) and (max-width: 1440px)").matches) {
//       setSalonChar(180);
//     } else if (window.matchMedia("(min-width: 1360px)").matches) {
//       setSalonChar(250);
//     } else if (window.matchMedia("(min-width: 0px) and (max-width: 430px)").matches) {
//       setSalonChar(150);
//     } else if (window.matchMedia("(min-width: 431px) and (max-width: 768px)").matches) {
//       setSalonChar(220);
//     } else if (window.matchMedia("(min-width: 769px) and (max-width: 1140px)").matches) {
//       setSalonChar(280);
//     } else {
//       setSalonChar(null); // or some other default value if needed
//     }
//   };

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const truncateText = (text, charecterLimit) => {
//     if (text?.length <= charecterLimit) {
//       return text;
//     }

//     let truncatedText = text?.slice(0, charecterLimit);

//     return truncatedText + '...'
//   }

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   const connectSalonList = useSelector(state => state.connectSalonList)

//   const {
//     loading: connectSalonListLoading,
//     resolve: connectSalonListResolve,
//     response: connectSalonListResponse
//   } = connectSalonList

//   const [selectedSalonId, setSelectedSalonId] = useState("")

//   // console.log(selectedSalonId)

//   const [currentSelectedSalon, setCurrentSelectedSalon] = useState({})

//   useEffect(() => {
//     if (selectedSalonId) {
//       const currentSalon = connectSalonListResponse?.find((s) => s.salonId === selectedSalonId)
//       setCurrentSelectedSalon(currentSalon)
//     }

//   }, [selectedSalonId])

//   // console.log("Current    sdssss", currentSelectedSalon)

//   const [selectedServiceList, setSelectedServiceList] = useState([])

//   useEffect(() => {
//     if (selectedSalonId) {
//       const selectedSalonServices = connectSalonListResponse.find((s) => s.salonId === selectedSalonId)?.services

//       setSelectedServiceList(selectedSalonServices)
//       setBarberSelectedServices([])
//     }

//   }, [selectedSalonId])

//   const [barberSelectedServices, setBarberSelectedServices] = useState([])

//   const selectServiceHandler = (ser) => {
//     // setBarberSelectedServices([...barberSelectedServices, ser])
//     const servicepresent = barberSelectedServices.find((s) => s._id === ser._id)

//     if (!servicepresent) {
//       const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

//       setBarberSelectedServices([...barberSelectedServices, serviceWithEWT]);
//     }
//   }

//   // console.log("BarberSelectedServices ",barberSelectedServices)

//   const deleteServiceHandler = (ser) => {
//     setBarberSelectedServices((services) => services.filter((s) => s._id !== ser._id))
//   }

//   const connectSalonClicked = () => {
//     const connectSalondata = {
//       barberServices: barberSelectedServices,
//       email,
//       salonId: selectedSalonId
//     }

//     dispatch(barberConnectSalonAction(connectSalondata))
//     // console.log(connectSalondata)
//   }

//   const barberConnectSalon = useSelector(state => state.barberConnectSalon)

//   const {
//     loading: barberConnectSalonLoading,
//     resolve: barberConnectSalonResolve,
//     message: barberConnectSalonMessage
//   } = barberConnectSalon


//   const queuelistcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     if (barberProfile?.user[0]?.isApproved) {
//       const controller = new AbortController();
//       queuelistcontrollerRef.current = controller;

//       dispatch(getBarberQueueListAction(salonId, barberId, controller.signal));

//       return () => {
//         if (queuelistcontrollerRef.current) {
//           queuelistcontrollerRef.current.abort();
//         }
//       };
//     }
//   }, [salonId, dispatch]);

//   const getBarberQueueList = useSelector(state => state.getBarberQueueList)

//   const {
//     loading: getBarberQueueListLoading,
//     resolve: getBarberQueueListResolve,
//     queueList: BarberQueueList
//   } = getBarberQueueList


//   const [currentDate, setCurrentDate] = useState(new Date())

//   // console.log("svdsdvsdv", barberProfile)

//   useEffect(() => {
//     if (barberProfile) {
//       setTogglecheck(barberProfile?.user[0]?.isOnline)
//     }
//   }, [barberProfile])

//   const [togglecheck, setTogglecheck] = useState(false);

//   const toggleHandler = () => {
//     const newCheckValue = !togglecheck;
//     setTogglecheck(newCheckValue);

//     const salonStatusOnlineData = {
//       barberId,
//       salonId,
//       isOnline: newCheckValue,
//     };

//     dispatch(barberSalonStatusAction(salonStatusOnlineData));
//   }

//   const barberDashboardSalonInfoRef = useRef(new AbortController())

//   useEffect(() => {
//     if (barberProfile?.user[0]?.isApproved && salonId != 0) {
//       const controller = new AbortController();
//       barberDashboardSalonInfoRef.current = controller;

//       dispatch(barberDashboardSalonInfoAction(salonId, controller.signal));

//       return () => {
//         if (barberDashboardSalonInfoRef.current) {
//           barberDashboardSalonInfoRef.current.abort();
//         }
//       };
//     }

//   }, [salonId, dispatch, barberProfile]);

//   const barberDashboardSalonInfo = useSelector(state => state.barberDashboardSalonInfo)

//   const {
//     loading: barberDashboardSalonInfoLoading,
//     resolve: barberDashboardSalonInfoResolve,
//     response: barberDashboardSalonInfoResponse
//   } = barberDashboardSalonInfo


//   const [salonDesc, setSalonDesc] = useState("")

//   useEffect(() => {
//     if (barberDashboardSalonInfoResponse) {
//       setSalonDesc(barberDashboardSalonInfoResponse)
//     }

//   }, [barberDashboardSalonInfoResponse])


//   //Salon Images

//   useEffect(() => {
//     if (barberProfile?.user[0]?.isApproved && salonId != 0) {
//       dispatch(getAdminSalonImagesAction(salonId))
//     }
//   }, [salonId, barberProfile])

//   const getAdminSalonImages = useSelector(state => state.getAdminSalonImages)

//   const {
//     loading: getAdminSalonImagesLoading,
//     resolve: getAdminSalonImagesResolve,
//     response: AdminSalonImages
//   } = getAdminSalonImages

//   const [openModal, setOpenModal] = useState(false)

//   console.log(barberConnectSalonMessage)

//   return (
//     barberProfile?.user[0]?.isApproved == false ? <>
//       <div className={`barber_connect_salon_container ${darkmodeOn && "dark"}`}>
//         <h3>Connect To Your Salon</h3>
//         {
//           barberProfile?.user[0]?.approvePendingMessage ?
//             <div className='barber_approve_container'>
//               <div>
//                 <h2 style={{ color: darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-text-light-color2)"}}>{barberProfile?.user[0]?.approvePendingMessage}</h2>
//                 <button onClick={() => window.location.reload()}>Reload</button>
//               </div>
//             </div> :
//             <div className={`barber_connect_salon_list_container ${darkmodeOn && "dark"}`}>
//               <div className={`barber_connect_salon_list ${darkmodeOn && "dark"}`}>
//                 <h4>Choose Your Salon</h4>
//                 <div>
//                   <div>
//                     <div>
//                       <p>SalonID</p>
//                       <p>Salon Name</p>
//                       <p>Select</p>
//                     </div>

//                     {
//                       connectSalonListLoading && !connectSalonListResolve ?
//                         <>
//                           <Skeleton count={4} height={"5rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                             highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
//                         </> :
//                         !connectSalonListLoading && connectSalonListResolve && connectSalonListResponse?.length > 0 ?
//                           connectSalonListResponse?.map((s) => (
//                             <div key={s._id}>
//                               <p>{s.salonId}</p>
//                               <p>{s.salonName}</p>
//                               {
//                                 selectedSalonId == s.salonId ? <button style={{ background: "limegreen", color: "#fff" }}><CheckIcon /></button> : <button onClick={() => setSelectedSalonId(s.salonId)} style={{ fontSize: "2.2rem" }}>+</button>
//                               }

//                             </div>
//                           ))
//                           :
//                           !connectSalonListLoading && connectSalonListResolve && connectSalonListResponse?.length == 0 ?
//                             <div>
//                               <p>No Salons Available</p>
//                             </div> :
//                             !connectSalonListLoading && connectSalonListResolve &&
//                             <div>
//                               <p>No Salons Available</p>
//                             </div>
//                     }


//                   </div>
//                 </div>
//               </div>

//               <div className={`barber_list_services_list ${darkmodeOn && "dark"}`}>
//                 <h4>List of Services</h4>
//                 <div>
//                   <div>
//                     <div>
//                       <p>Services</p>
//                       <p>Type</p>
//                       <p>Price</p>
//                       <p>Select</p>
//                     </div>

//                     {
//                       selectedServiceList?.map((ser) => (
//                         <div key={ser._id}>
//                           <p>{ser.serviceName}</p>
//                           <p>{ser.vipService ? "VIP" : "Regular"}</p>
//                           <p>{currentSelectedSalon?.currency}{" "}{ser.servicePrice}</p>
//                           {
//                             barberSelectedServices.some((b) => b._id === ser._id) ?
//                               <button style={{ background: "red" }} onClick={() => deleteServiceHandler(ser)}><DeleteIcon /></button> : <button onClick={() => selectServiceHandler(ser)}>+</button>
//                           }

//                         </div>
//                       ))
//                     }

//                   </div>
//                 </div>
//               </div>

//               <div>
//                 {
//                   barberConnectSalonLoading ? <button style={{
//                     display: "grid",
//                     placeItems: "center"
//                   }}><ButtonLoader /></button> : <button onClick={connectSalonClicked}>Connect Salon</button>
//                 }

//               </div>
//             </div>
//         }

//       </div>
//     </> : <>
//       <div className={`barber_dashboard_page_container ${darkmodeOn && "dark"}`}>
//         <div>
//           {
//             loading ?
//               <Skeleton
//                 count={1}
//                 height={"3.8rem"}
//                 style={{ borderRadius: "5px" }}
//                 baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                 highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//               /> :
//               <div>
//                 <h1 style={{ visibility: barberName == "" && "hidden" }}>Welcome Back, {truncateText(barberName, 11)}</h1>
//               </div>
//           }

//           <div style={{
//             background: darkmodeOn ? "var(--dark-mode-bg-color-4)" : "var(--primary-bg-light-color1)"
//           }}>
//             <div>Salon Information</div>

//             {
//               barberDashboardSalonInfoLoading ?
//                 <div>
//                   <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                     highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
//                   <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px", marginTop: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                     highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
//                 </div> :
//                 <div>
//                   <p style={{
//                     wordBreak: "break-word"
//                   }}>{truncateText(salonDesc, salonChar)}</p>
//                   <button onClick={() => setOpenModal(true)} disabled={barberDashboardSalonInfoLoading == true ? true : false}>
//                     <div><ShowSalonInfo /></div>
//                     <p>Show</p>
//                   </button>
//                 </div>
//             }

//           </div>
//         </div>
//         <div>
//           <div>page</div>


//           {
//             getBarberQueueListLoading && !getBarberQueueListResolve ?
//               <div className='barber_dashboard_queuelist_loader_container'>
//                 <div><p>QueueList</p></div>
//                 <div><Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                   highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
//                   <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                     highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
//                   <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                     highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} /></div>
//               </div> :
//               !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ?
//                 <div className={`barber_dashboard_queuelist_container ${darkmodeOn && "dark"}`}>
//                   <div>
//                     <p>Customer</p>
//                     <p>Barber</p>
//                     <p>Q Position</p>
//                     <p>Join Time</p>
//                   </div>

//                   {
//                     BarberQueueList?.map((q) => (
//                       <div key={q._id}>
//                         <p>{q.name}</p>
//                         <p>{q.barberName}</p>
//                         <p>{q.qPosition}</p>
//                         <p>{q.timeJoinedQ}</p>
//                       </div>
//                     ))
//                   }
//                 </div> :
//                 !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ?
//                   <div className='barber_dashboard_queuelist_error_container'>
//                     <div><p>QueueList</p></div>
//                     <div><p style={{
//                       color: darkmodeOn ? "#fff" : "#000"
//                     }}>No queuelist available</p></div>
//                   </div> :
//                   !getBarberQueueListLoading && !getBarberQueueListResolve &&

//                   <div className='barber_dashboard_queuelist_error_container'>
//                     <div><p>QueueList</p></div>
//                     <div><p style={{
//                       color: darkmodeOn ? "#fff" : "#000"
//                     }}>No queuelist available</p></div>
//                   </div>
//           }
//         </div>

//         <div
//           style={{
//             boxShadow: loading ? "none" : "0px 0px 6px rgba(0,0,0,0.4)",
//           }}
//         >


//           {
//             getAdminSalonImagesLoading && !getAdminSalonImagesResolve ?
//               <div className='barber_dashboard_carousel_loading'>
//                 <Skeleton count={1}
//                   height={"100%"}
//                   width={"100%"}
//                   style={{
//                     borderRadius: "1.5rem"
//                   }}
//                   baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                   highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                 />
//               </div> :
//               !getAdminSalonImagesLoading && getAdminSalonImagesResolve && AdminSalonImages?.length > 0 ?
//                 <div className='admin_dashboard_carousel'>
//                   <Carousel
//                     showThumbs={false}
//                     infiniteLoop={true}
//                     autoPlay={true}
//                     interval={6000}
//                     showStatus={false}
//                     showArrows={false}
//                     stopOnHover={false}
//                     swipeable={false}
//                   >
//                     {
//                       AdminSalonImages?.map((ad) => (
//                         <div className='admin_dashboard_carousel_item' key={ad._id}>
//                           <img src={ad.url} />
//                         </div>
//                       )).slice(0, 5)
//                     }
//                   </Carousel>
//                 </div> :
//                 !getAdminSalonImagesLoading && getAdminSalonImagesResolve && AdminSalonImages?.length == 0 ?
//                   <div className='admin_dashboard_carousel error'>
//                     <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="" />
//                   </div> :
//                   !getAdminSalonImagesLoading && !getAdminSalonImagesResolve &&
//                   <div className='admin_dashboard_carousel error'>
//                     <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="" />
//                   </div>
//           }
//         </div>

//         <div>
//           <div>Reports</div>
//           <div>

//             {
//               loading ?
//                 <div>
//                   <div>
//                     <Skeleton count={1}
//                       height={"5.7rem"}
//                       width={"5.7rem"}
//                       style={{
//                         borderRadius: "50%"
//                       }}
//                       baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                     />
//                     <Skeleton count={1}
//                       height={"1rem"}
//                       width={"5.7rem"}
//                       baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                     />
//                   </div>

//                   <div>
//                     <Skeleton count={1}
//                       height={"5.7rem"}
//                       width={"5.7rem"}
//                       style={{
//                         borderRadius: "50%"
//                       }}
//                       baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                     />
//                     <Skeleton count={1}
//                       height={"1rem"}
//                       width={"5.7rem"}
//                       baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                     />
//                   </div>

//                   <div>
//                     <Skeleton count={1}
//                       height={"5.7rem"}
//                       width={"5.7rem"}
//                       style={{
//                         borderRadius: "50%"
//                       }}
//                       baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                     />
//                     <Skeleton count={1}
//                       height={"1rem"}
//                       width={"5.7rem"}
//                       baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                       highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                     />
//                   </div>
//                 </div> :
//                 <div>
//                   {
//                     reportsdata.map((r) => (
//                       <div key={r.id}>
//                         <div>{r.icon}</div>
//                         <p>{r.p}</p>
//                         <p>Report</p>
//                       </div>
//                     ))
//                   }

//                 </div>
//             }

//             <div style={{ paddingInline: "3rem" }}>
//               {
//                 loading ?
//                   <Skeleton count={1}
//                     height={"80%"}
//                     width={"100%"}
//                     baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                     highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                   /> :
//                   <ResponsiveContainer width="70%" height="100%" style={{ margin: "auto" }}>
//                     <LineChart width={300} height={100} data={data}>
//                       <Line type="" dataKey="pv" stroke={darkmodeOn ? "#fff" : "#000"} strokeWidth={2} />
//                     </LineChart>
//                   </ResponsiveContainer>
//               }

//             </div>

//           </div>
//         </div>

//         <div>
//           <div>
//             <p>Calender</p>
//             <div>
//               <button>
//                 <div><UserIcon /></div>
//                 <p>Appointments</p>
//               </button>

//               <button>
//                 <div><UserIcon /></div>
//                 <p>Reservation</p>
//               </button>
//             </div>
//           </div>
//           <div>
//             <div><Calender value={currentDate} setCurrentDate={setCurrentDate} /></div>
//             <div style={{
//               color: darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-bg-light-color2)",
//               fontSize: "1.4rem"
//             }}>
//               Appointment not available
//             </div>

//           </div>
//         </div>

//         {
//           openModal && <DashboardModal setOpenModal={setOpenModal}>
//             <div className={`barber_salon_info_container ${darkmodeOn && "dark"}`}>
//               <div>
//                 <label htmlFor="barbersalonInfo">Salon Information</label>
//                 <textarea id="barbersalonInfo" name="barbersalonInfo" value={salonDesc}></textarea>
//               </div>

//             </div>
//           </DashboardModal>
//         }

//       </div>
//     </>
//   )
// }

// export default Dashboard




import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './Dashboard.module.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { AddIcon, ChartIcon1, ChartIcon2, ChartIcon3, CheckIcon, ClockIcon, DeleteIcon, ShowSalonInfo, UserIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts'
import Calender from '../../components/Admin/Calender/Calender'

import DashboardModal from '../../components/Modal/DashboardModal/DashboardModal';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import { barberConnectSalonAction, barberDashboardSalonInfoAction, barberSalonStatusAction, connectSalonListAction } from '../../Redux/Barber/Actions/DashboardAction';
import { getBarberQueueListAction } from '../../Redux/Barber/Actions/BarberQueueAction';
import { adminGetDefaultSalonAction } from '../../Redux/Admin/Actions/AdminHeaderAction';
import { getAdminSalonImagesAction } from '../../Redux/Admin/Actions/SalonAction';

const Dashboard = () => {

  const dispatch = useDispatch()

  const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
  const email = useSelector(state => state.BarberLoggedInMiddleware.barberEmail)
  const barberName = useSelector(state => state.BarberLoggedInMiddleware.barberName)
  const barberId = useSelector(state => state.BarberLoggedInMiddleware.barberId)

  const barberProfile = useSelector(state => state.BarberLoggedInMiddleware.entiredata)

  useEffect(() => {
    if (barberProfile?.user[0]?.isApproved == false) {
      dispatch(connectSalonListAction())
    }
  }, [barberProfile])

  const [loading, setLoading] = useState(false)

  const reportsdata = [
    {
      id: 1,
      icon: <ChartIcon1 />,
      p: "Weekly"
    },
    {
      id: 2,
      icon: <ChartIcon2 />,
      p: "Monthly"
    },
    {
      id: 3,
      icon: <ChartIcon3 />,
      p: "Daily"
    }
  ]


  const data = [
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


  const [salonChar, setSalonChar] = useState(null);

  const handleResize = () => {
    if (window.matchMedia("(min-width: 1140px) and (max-width: 1250px)").matches) {
      setSalonChar(145);
    } else if (window.matchMedia("(min-width: 1251px) and (max-width: 1440px)").matches) {
      setSalonChar(180);
    } else if (window.matchMedia("(min-width: 1360px)").matches) {
      setSalonChar(250);
    } else if (window.matchMedia("(min-width: 0px) and (max-width: 430px)").matches) {
      setSalonChar(150);
    } else if (window.matchMedia("(min-width: 431px) and (max-width: 768px)").matches) {
      setSalonChar(220);
    } else if (window.matchMedia("(min-width: 769px) and (max-width: 1140px)").matches) {
      setSalonChar(280);
    } else {
      setSalonChar(null); // or some other default value if needed
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncateText = (text, charecterLimit) => {
    if (text?.length <= charecterLimit) {
      return text;
    }

    let truncatedText = text?.slice(0, charecterLimit);

    return truncatedText + '...'
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const connectSalonList = useSelector(state => state.connectSalonList)

  const {
    loading: connectSalonListLoading,
    resolve: connectSalonListResolve,
    response: connectSalonListResponse
  } = connectSalonList

  const [selectedSalonId, setSelectedSalonId] = useState("")

  // console.log(selectedSalonId)

  const [currentSelectedSalon, setCurrentSelectedSalon] = useState({})

  useEffect(() => {
    if (selectedSalonId) {
      const currentSalon = connectSalonListResponse?.find((s) => s.salonId === selectedSalonId)
      setCurrentSelectedSalon(currentSalon)
    }

  }, [selectedSalonId])

  // console.log("Current    sdssss", currentSelectedSalon)

  const [selectedServiceList, setSelectedServiceList] = useState([])

  useEffect(() => {
    if (selectedSalonId) {
      const selectedSalonServices = connectSalonListResponse.find((s) => s.salonId === selectedSalonId)?.services

      setSelectedServiceList(selectedSalonServices)
      setBarberSelectedServices([])
    }

  }, [selectedSalonId])

  const [barberSelectedServices, setBarberSelectedServices] = useState([])

  const selectServiceHandler = (ser) => {
    // setBarberSelectedServices([...barberSelectedServices, ser])
    const servicepresent = barberSelectedServices.find((s) => s._id === ser._id)

    if (!servicepresent) {
      const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

      setBarberSelectedServices([...barberSelectedServices, serviceWithEWT]);
    }
  }

  // console.log("BarberSelectedServices ",barberSelectedServices)

  const deleteServiceHandler = (ser) => {
    setBarberSelectedServices((services) => services.filter((s) => s._id !== ser._id))
  }

  const connectSalonClicked = () => {
    const connectSalondata = {
      barberServices: barberSelectedServices,
      email,
      salonId: selectedSalonId
    }

    dispatch(barberConnectSalonAction(connectSalondata))
    // console.log(connectSalondata)
  }

  const barberConnectSalon = useSelector(state => state.barberConnectSalon)

  const {
    loading: barberConnectSalonLoading,
    resolve: barberConnectSalonResolve,
    message: barberConnectSalonMessage
  } = barberConnectSalon


  const queuelistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    if (barberProfile?.user[0]?.isApproved) {
      const controller = new AbortController();
      queuelistcontrollerRef.current = controller;

      dispatch(getBarberQueueListAction(salonId, barberId, controller.signal));

      return () => {
        if (queuelistcontrollerRef.current) {
          queuelistcontrollerRef.current.abort();
        }
      };
    }
  }, [salonId, dispatch]);

  const getBarberQueueList = useSelector(state => state.getBarberQueueList)

  const {
    loading: getBarberQueueListLoading,
    resolve: getBarberQueueListResolve,
    queueList: BarberQueueList
  } = getBarberQueueList


  const [currentDate, setCurrentDate] = useState(new Date())

  // console.log("svdsdvsdv", barberProfile)

  useEffect(() => {
    if (barberProfile) {
      setTogglecheck(barberProfile?.user[0]?.isOnline)
    }
  }, [barberProfile])

  const [togglecheck, setTogglecheck] = useState(false);

  const toggleHandler = () => {
    const newCheckValue = !togglecheck;
    setTogglecheck(newCheckValue);

    const salonStatusOnlineData = {
      barberId,
      salonId,
      isOnline: newCheckValue,
    };

    dispatch(barberSalonStatusAction(salonStatusOnlineData));
  }

  const barberDashboardSalonInfoRef = useRef(new AbortController())

  useEffect(() => {
    if (barberProfile?.user[0]?.isApproved && salonId != 0) {
      const controller = new AbortController();
      barberDashboardSalonInfoRef.current = controller;

      dispatch(barberDashboardSalonInfoAction(salonId, controller.signal));

      return () => {
        if (barberDashboardSalonInfoRef.current) {
          barberDashboardSalonInfoRef.current.abort();
        }
      };
    }

  }, [salonId, dispatch, barberProfile]);

  const barberDashboardSalonInfo = useSelector(state => state.barberDashboardSalonInfo)

  const {
    loading: barberDashboardSalonInfoLoading,
    resolve: barberDashboardSalonInfoResolve,
    response: barberDashboardSalonInfoResponse
  } = barberDashboardSalonInfo


  const [salonDesc, setSalonDesc] = useState("")

  useEffect(() => {
    if (barberDashboardSalonInfoResponse) {
      setSalonDesc(barberDashboardSalonInfoResponse)
    }

  }, [barberDashboardSalonInfoResponse])


  //Salon Images

  useEffect(() => {
    if (barberProfile?.user[0]?.isApproved && salonId != 0) {
      dispatch(getAdminSalonImagesAction(salonId))
    }
  }, [salonId, barberProfile])

  const getAdminSalonImages = useSelector(state => state.getAdminSalonImages)

  const {
    loading: getAdminSalonImagesLoading,
    resolve: getAdminSalonImagesResolve,
    response: AdminSalonImages
  } = getAdminSalonImages

  const [openModal, setOpenModal] = useState(false)

  console.log(barberConnectSalonMessage)



  const data2 = [
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

  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    loading: adminGetDefaultSalonLoading,
    resolve: adminGetDefaultSalonResolve,
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon

  return (
    barberProfile?.user[0]?.isApproved ?
      <>

        {/* <div className={`barber_dashboard_page_container ${darkmodeOn && "dark"}`}>
          <div>
            {
              loading ?
                <Skeleton
                  count={1}
                  height={"3.8rem"}
                  style={{ borderRadius: "5px" }}
                  baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                  highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                /> :
                <div>
                  <h1 style={{ visibility: barberName == "" && "hidden" }}>Welcome Back, {truncateText(barberName, 11)}</h1>
                </div>
            }

            <div style={{
              background: darkmodeOn ? "var(--dark-mode-bg-color-4)" : "var(--primary-bg-light-color1)"
            }}>
              <div>Salon Information</div>

              {
                barberDashboardSalonInfoLoading ?
                  <div>
                    <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px", marginTop: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  </div> :
                  <div>
                    <p style={{
                      wordBreak: "break-word"
                    }}>{truncateText(salonDesc, salonChar)}</p>
                    <button onClick={() => setOpenModal(true)} disabled={barberDashboardSalonInfoLoading == true ? true : false}>
                      <div><ShowSalonInfo /></div>
                      <p>Show</p>
                    </button>
                  </div>
              }

            </div>
          </div>
          <div>
            <div>page</div>


            {
              getBarberQueueListLoading && !getBarberQueueListResolve ?
                <div className='barber_dashboard_queuelist_loader_container'>
                  <div><p>QueueList</p></div>
                  <div><Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} /></div>
                </div> :
                !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ?
                  <div className={`barber_dashboard_queuelist_container ${darkmodeOn && "dark"}`}>
                    <div>
                      <p>Customer</p>
                      <p>Barber</p>
                      <p>Q Position</p>
                      <p>Join Time</p>
                    </div>

                    {
                      BarberQueueList?.map((q) => (
                        <div key={q._id}>
                          <p>{q.name}</p>
                          <p>{q.barberName}</p>
                          <p>{q.qPosition}</p>
                          <p>{q.timeJoinedQ}</p>
                        </div>
                      ))
                    }
                  </div> :
                  !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ?
                    <div className='barber_dashboard_queuelist_error_container'>
                      <div><p>QueueList</p></div>
                      <div><p style={{
                        color: darkmodeOn ? "#fff" : "#000"
                      }}>No queuelist available</p></div>
                    </div> :
                    !getBarberQueueListLoading && !getBarberQueueListResolve &&

                    <div className='barber_dashboard_queuelist_error_container'>
                      <div><p>QueueList</p></div>
                      <div><p style={{
                        color: darkmodeOn ? "#fff" : "#000"
                      }}>No queuelist available</p></div>
                    </div>
            }
          </div>

          <div
            style={{
              boxShadow: loading ? "none" : "0px 0px 6px rgba(0,0,0,0.4)",
            }}
          >


            {
              getAdminSalonImagesLoading && !getAdminSalonImagesResolve ?
                <div className='barber_dashboard_carousel_loading'>
                  <Skeleton count={1}
                    height={"100%"}
                    width={"100%"}
                    style={{
                      borderRadius: "1.5rem"
                    }}
                    baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                  />
                </div> :
                !getAdminSalonImagesLoading && getAdminSalonImagesResolve && AdminSalonImages?.length > 0 ?
                  <div className='admin_dashboard_carousel'>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={6000}
                      showStatus={false}
                      showArrows={false}
                      stopOnHover={false}
                      swipeable={false}
                    >
                      {
                        AdminSalonImages?.map((ad) => (
                          <div className='admin_dashboard_carousel_item' key={ad._id}>
                            <img src={ad.url} />
                          </div>
                        )).slice(0, 5)
                      }
                    </Carousel>
                  </div> :
                  !getAdminSalonImagesLoading && getAdminSalonImagesResolve && AdminSalonImages?.length == 0 ?
                    <div className='admin_dashboard_carousel error'>
                      <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="" />
                    </div> :
                    !getAdminSalonImagesLoading && !getAdminSalonImagesResolve &&
                    <div className='admin_dashboard_carousel error'>
                      <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="" />
                    </div>
            }
          </div>

          <div>
            <div>Reports</div>
            <div>

              {
                loading ?
                  <div>
                    <div>
                      <Skeleton count={1}
                        height={"5.7rem"}
                        width={"5.7rem"}
                        style={{
                          borderRadius: "50%"
                        }}
                        baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                      />
                      <Skeleton count={1}
                        height={"1rem"}
                        width={"5.7rem"}
                        baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                      />
                    </div>

                    <div>
                      <Skeleton count={1}
                        height={"5.7rem"}
                        width={"5.7rem"}
                        style={{
                          borderRadius: "50%"
                        }}
                        baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                      />
                      <Skeleton count={1}
                        height={"1rem"}
                        width={"5.7rem"}
                        baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                      />
                    </div>

                    <div>
                      <Skeleton count={1}
                        height={"5.7rem"}
                        width={"5.7rem"}
                        style={{
                          borderRadius: "50%"
                        }}
                        baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                      />
                      <Skeleton count={1}
                        height={"1rem"}
                        width={"5.7rem"}
                        baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                      />
                    </div>
                  </div> :
                  <div>
                    {
                      reportsdata.map((r) => (
                        <div key={r.id}>
                          <div>{r.icon}</div>
                          <p>{r.p}</p>
                          <p>Report</p>
                        </div>
                      ))
                    }

                  </div>
              }

              <div style={{ paddingInline: "3rem" }}>
                {
                  loading ?
                    <Skeleton count={1}
                      height={"80%"}
                      width={"100%"}
                      baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                    /> :
                    <ResponsiveContainer width="70%" height="100%" style={{ margin: "auto" }}>
                      <LineChart width={300} height={100} data={data}>
                        <Line type="" dataKey="pv" stroke={darkmodeOn ? "#fff" : "#000"} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                }

              </div>

            </div>
          </div>

          <div>
            <div>
              <p>Calender</p>
              <div>
                <button>
                  <div><UserIcon /></div>
                  <p>Appointments</p>
                </button>

                <button>
                  <div><UserIcon /></div>
                  <p>Reservation</p>
                </button>
              </div>
            </div>
            <div>
              <div><Calender value={currentDate} setCurrentDate={setCurrentDate} /></div>
              <div style={{
                color: darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-bg-light-color2)",
                fontSize: "1.4rem"
              }}>
                Appointment not available
              </div>

            </div>
          </div>

          {
            openModal && <DashboardModal setOpenModal={setOpenModal}>
              <div className={`barber_salon_info_container ${darkmodeOn && "dark"}`}>
                <div>
                  <label htmlFor="barbersalonInfo">Salon Information</label>
                  <textarea id="barbersalonInfo" name="barbersalonInfo" value={salonDesc}></textarea>
                </div>

              </div>
            </DashboardModal>
          }

        </div> */}

        <main className={style.dashboard}>
          <main className={style.dashboard_body}>
            <div className={style.inner_container}>
              <div className={style.dashboard_container_one}>
                <div className={style.saloninfo_container}>
                  <div>
                    <h2>Welcome Back, {truncateText(barberName, 11)}</h2>
                  </div>

                  <div>
                    {
                      adminGetDefaultSalonLoading ?
                        <div style={{
                          width: "100%",
                          height: "100%",
                          alignContent: "center",
                          paddingTop: "1rem"
                        }}>
                          <Skeleton count={1} height={"4rem"} style={{ borderRadius: "3px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                            highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                        </div> :
                        !adminGetDefaultSalonLoading && adminGetDefaultSalonResolve && adminGetDefaultSalonResponse?.salonDesc?.length > 0 ?
                          <i>
                            {truncateText(salonDesc, 200)}
                          </i> :
                          !adminGetDefaultSalonLoading && !adminGetDefaultSalonResolve ?
                            <i>
                              You currently have no salon information
                            </i> :
                            !adminGetDefaultSalonLoading && adminGetDefaultSalonResolve && adminGetDefaultSalonResponse?.salonDesc?.length === 0 &&
                            <i>
                              You currently have no salon information
                            </i>
                    }

                  </div>
                </div>

                {
                  getAdminSalonImagesLoading && !getAdminSalonImagesResolve ?
                    <div className={style.salonadv_container_loader}>
                      <Skeleton count={1} height={"35vh"} style={{ borderRadius: "0.6vw" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    </div> :
                    !getAdminSalonImagesLoading && getAdminSalonImagesResolve && AdminSalonImages?.length > 0 ?
                      <div className={style.salonadv_container}>
                        <Carousel
                          showThumbs={false}
                          infiniteLoop={true}
                          autoPlay={true}
                          interval={5000}
                          showStatus={false}
                          showArrows={false}
                          stopOnHover={false}
                          swipeable={false}
                        >
                          {
                            AdminSalonImages.map((item) => {
                              return (
                                <div className={style.carousel_item_container} key={item._id}>
                                  <img src={item.url} alt="image_item" />
                                </div>
                              )
                            })
                          }
                        </Carousel>
                      </div> :
                      !getAdminSalonImagesLoading && getAdminSalonImagesResolve && AdminSalonImages?.length == 0 ?
                        <div className={style.salonadv_container_error}>
                          <img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="no_image" />
                        </div> :
                        !getAdminSalonImagesLoading && !getAdminSalonImagesResolve &&
                        <div className={style.salonadv_container_error}>
                          <img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" alt="no_image" />
                        </div>
                }


                <div className={style.barber_report_container}>

                  {/* <div className={style.barberlist_container}>

                    <div className={style.barberitem_header}>
                      <div>
                        <div>

                        </div>
                        <p>Barber</p>
                      </div>
                      <div><p>Queue</p></div>
                      <div><p>EWT</p></div>
                    </div>
                    {
                      getBarberQueueListLoading && !getBarberQueueListResolve ?
                        <div className={style.barberlist_container_body_loading}>
                          <Skeleton count={3} height={"8vh"} style={{}} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                            highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                        </div> :
                        !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ?
                          <div className={style.barberlist_container_body}>


                            {
                              BarberQueueList.map((barber, index) => {
                                return (
                                  <div className={style.barberitem} key={barber._id}>
                                    <div>
                                      <div>
                                        <img src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" alt="" />
                                        <div></div>
                                      </div>
                                      <p>{barber.name.length > 6 ? `${barber.name.slice(0, 6).concat("...")}` : barber.name}</p>
                                    </div>
                                    <div><p>{barber.queueCount}</p></div>
                                    <div><p>{barber.barberEWT} mins</p></div>
                                  </div>
                                )
                              })
                            }
                          </div> :
                          !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ?
                            <div className={style.barberlist_container_body_error}>
                              <p>No barber available</p>
                            </div> :
                            !getBarberQueueListLoading && !getBarberQueueListResolve &&
                            <div className={style.barberlist_container_body_error}>
                              <p>No barber available</p>
                            </div>
                    }

                  </div> */}

                  <div className={style.report_container}>

                    <Carousel
                      showThumbs={false}
                      infiniteLoop={true}
                      autoPlay={true}
                      interval={5000}
                      showStatus={false}
                      showArrows={false}
                      stopOnHover={true}
                      swipeable={true}
                      renderIndicator={false}
                    >

                      <div className={style.r_chart}>
                        <p>Report-Type One</p>
                        <div>
                          <ResponsiveContainer width="100%" height="90%" style={{}}>
                            <BarChart width={150} height={40} data={data2}>
                              <Bar dataKey="uv" fill="rgba(255, 0, 0, 0.393)" stroke="#000000" strokeWidth={1} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Monthly Report</p>
                          </div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Weekly Report</p>
                          </div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Daily Report</p>
                          </div>
                        </div>
                      </div>

                      <div className={style.r_chart}>
                        <p>Report-Type Two</p>
                        <div>
                          <ResponsiveContainer width="100%" height="90%" style={{}}>
                            <BarChart width={150} height={40} data={data}>
                              <Bar dataKey="uv" fill="rgba(255, 149, 0, 0.419)" stroke="#000000" strokeWidth={1} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Monthly Report</p>
                          </div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Weekly Report</p>
                          </div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Daily Report</p>
                          </div>
                        </div>
                      </div>

                      <div className={style.r_chart}>
                        <p>Report-Type Three</p>
                        <div>
                          <ResponsiveContainer width="100%" height="90%" style={{}}>
                            <BarChart width={150} height={40} data={data}>
                              <Bar dataKey="uv" fill="rgba(0, 0, 255, 0.438)" stroke="#000000" strokeWidth={1} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Monthly Report</p>
                          </div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Weekly Report</p>
                          </div>
                          <div>
                            <div onClick={() => alert("Monthly Report")}></div>
                            <p>Daily Report</p>
                          </div>
                        </div>
                      </div>


                    </Carousel>
                  </div>
                </div>
              </div>


              <div className={style.dashboard_container_two}>
                <div className={style.queuelists_container}>
                  <div className={style.queue_header}>
                    <div><p>#</p></div>
                    <div><p>Name</p></div>
                    <div><p>Barber</p></div>
                    <div><p>EWT</p></div>
                  </div>

                  {
                    getBarberQueueListLoading && !getBarberQueueListResolve ?
                      <div className={style.queue_body_loading}>
                        <Skeleton count={9} height={"8vh"} style={{}} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                      </div> :
                      !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ?
                        <div className={style.queue_body}>
                          {
                            BarberQueueList.map((queue, index) => {
                              return (
                                <div
                                  key={queue._id}
                                  className={style.queue_item}
                                  style={{
                                    borderBottom: index === BarberQueueList.length - 1 ? "none" : "1px solid rgba(0, 0, 0, 0.2)"
                                  }}
                                >
                                  <div><p>{queue.qPosition}</p></div>
                                  <div><p>{queue.name}</p></div>
                                  <div><p>{queue.barberName}</p></div>
                                  <div><p>{queue.customerEWT} mins</p></div>
                                </div>
                              )
                            })
                          }
                        </div> :
                        !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ?
                          <div className={style.queue_body_error}>
                            <p>No queuelist available</p>
                          </div> :
                          !getBarberQueueListLoading && !getBarberQueueListResolve &&
                          <div className={style.queue_body_error}>
                            <p>No queuelist available</p>
                          </div>
                  }

                </div>
              </div>
            </div>
          </main>
        </main >

      </> :
      <>
        <div className={`${style.barber_connect_salon_container} ${darkmodeOn && style.dark}`}>
          <p>Connect To Your Salon</p>
          {
            barberProfile?.user[0]?.approvePendingMessage ?
              <div className={style.barber_approve_container}>
                <div>
                  <p style={{ color: darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-text-light-color2)" }}>{barberProfile?.user[0]?.approvePendingMessage}</p>
                  <button onClick={() => window.location.reload()}>Reload</button>
                </div>
              </div> :
              <div className={`${style.barber_connect_salon_list_container} ${darkmodeOn && style.dark}`}>
                <div className={`${style.barber_connect_salon_list} ${darkmodeOn && style.dark}`}>
                  <p>Choose Your Salon</p>
                  <div>

                    {/* {
                      connectSalonListResponse?.map((s) => {
                        return (
                          <div className={`service_item`} key={s._id}>
                            <div className={`service_item_top`}>
                              <div><img src={s?.serviceIcon?.url} alt="service icon" /></div>
                              <div>
                                <p>{s?.serviceName}</p>
                                <p>{s?.vipService ? "VIP" : "Regular"}</p>
                                <p>{s?.serviceDesc}</p>
                              </div>
                            </div>
                            <div className={`service_item_bottom`}>
                              <div>
                                <div>
                                  <p>Service Price</p>
                                  <p>{s?.servicePrice}</p>
                                </div>
                              </div>

                              <div>
                                <div>
                                  <p>Est Wait Time</p>
                                  <div>
                                    <div><ClockIcon /></div>
                                    <input
                                      type="text"
                                    />
                                    <p>mins</p>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {
                              selectedSalonId == s.salonId ?
                                (<button className={`service_delete_icon`} onClick={() => deleteServiceHandler(s)}><DeleteIcon /></button>) :
                                (<button className={`service_add_icon`} onClick={() => setSelectedSalonId(s.salonId)}><AddIcon /></button>)
                            }

                          </div>
                        )
                      })
                    } */}

                    <div className={style.barber_connect_salon_list_header}>
                      <p>Salon Logo</p>
                      <p>Salon Name</p>
                      <p>Select</p>
                    </div>

                    {
                      connectSalonListLoading && !connectSalonListResolve ?
                        <>
                          <Skeleton count={4} height={"5rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                            highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                        </> :
                        !connectSalonListLoading && connectSalonListResolve && connectSalonListResponse?.length > 0 ?
                          connectSalonListResponse?.map((s) => (
                            <div key={s._id} className={style.barber_connect_salon_list_body}>
                              <div><img src={s?.salonLogo?.[0]?.url} alt="salon_logo" /></div>
                              <p>{s.salonName}</p>
                              <div>{
                                selectedSalonId == s.salonId ? <button className={style.check_connect_btn}><CheckIcon /></button> : <button className={style.add_connect_btn} onClick={() => setSelectedSalonId(s.salonId)} >+</button>
                              }</div>

                            </div>
                          ))
                          :
                          !connectSalonListLoading && connectSalonListResolve && connectSalonListResponse?.length == 0 ?
                            <div className={style.barber_connect_salon_list_error}>
                              <p>No Salons Available</p>
                            </div> :
                            !connectSalonListLoading && connectSalonListResolve &&
                            <div className={style.barber_connect_salon_list_error}>
                              <p>No Salons Available</p>
                            </div>
                    }


                  </div>
                </div>

                <div className={`${style.barber_list_services_list} ${darkmodeOn && style.dark}`}>
                  <p>List of Services</p>
                  <div>

                    {
                      selectedServiceList?.map((s) => {
                        return (
                          <div className={`${style.service_item}`} key={s._id}>
                            <div className={`${style.service_item_top}`}>
                              <div><img src={s?.serviceIcon?.url} alt="service icon" /></div>
                              <div>
                                <p>{s?.serviceName}</p>
                                <p>{s?.vipService ? "VIP" : "Regular"}</p>
                                <p>{s?.serviceDesc}</p>
                              </div>
                            </div>
                            <div className={`${style.service_item_bottom}`}>
                              <div>
                                <div>
                                  <p>Service Price</p>
                                  <p>{currentSelectedSalon?.currency}{s?.servicePrice}</p>
                                </div>
                              </div>

                              <div>
                                <div>
                                  <p>Est Wait Time</p>
                                  <div>
                                    <div><ClockIcon /></div>
                                    <p>{s?.serviceEWT}</p>
                                    <p>mins</p>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {
                              barberSelectedServices.some((b) => b._id === s?._id) ?
                                (<button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(s)}><DeleteIcon /></button>) :
                                (<button className={`${style.service_add_icon}`} onClick={() => selectServiceHandler(s)}><AddIcon /></button>)
                            }


                          </div>
                        )
                      })
                    }

                  </div>
                </div>

                <div>
                  {
                    barberConnectSalonLoading ? <button style={{
                      display: "grid",
                      placeItems: "center",
                    }} className={style.connect_btn}><ButtonLoader /></button> : <button onClick={connectSalonClicked} className={style.connect_btn}>Connect Salon</button>
                  }

                </div>
              </div>
          }

        </div>
      </>

    // barberProfile?.user[0]?.isApproved ? <h1>yes</h1> : <div>No</div>
  )
}

export default Dashboard