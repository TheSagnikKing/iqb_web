import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { ChartIcon1, ChartIcon2, ChartIcon3, EditIcon, Threeverticaldots, UserIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line } from 'recharts'
import Calender from '../../components/Admin/Calender/Calender'

import { useDispatch, useSelector } from 'react-redux';
import api from "../../Redux/api/Api"
import { adminSalonStatusAction, adminUpdateSalonInfoAction, getAllAdvertisementAction, getAllQueueListAction, getDashboardAppointmentListAction } from '../../Redux/Admin/Actions/DashboardAction';
import DashboardModal from '../../components/Modal/DashboardModal/DashboardModal';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';

const Dashboard = () => {

  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    loading: adminGetDefaultSalonLoading,
    resolve: adminGetDefaultSalonResolve,
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon

  const dispatch = useDispatch()

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  const adminName = useSelector(state => state.AdminLoggedInMiddleware.adminName)

  const [loading, setLoading] = useState(false)
  const [salonDesc, setSalonDesc] = useState("")

  useEffect(() => {
    if (adminGetDefaultSalonResponse) {
      setTogglecheck(adminGetDefaultSalonResponse?.isOnline)
      setSalonDesc(adminGetDefaultSalonResponse?.salonDesc)
    }

  }, [adminGetDefaultSalonResponse])

  const [togglecheck, setTogglecheck] = useState(false);

  const toggleHandler = () => {
    const newCheckValue = !togglecheck;
    setTogglecheck(newCheckValue);

    const salonStatusOnlineData = {
      salonId,
      isOnline: newCheckValue,
    };

    dispatch(adminSalonStatusAction(salonStatusOnlineData));
  }


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


  const advertisementcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    advertisementcontrollerRef.current = controller;

    dispatch(getAllAdvertisementAction(salonId, controller.signal));

    return () => {
      if (advertisementcontrollerRef.current) {
        advertisementcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);


  const getAllAdvertisement = useSelector(state => state.getAllAdvertisement)

  const {
    loading: getAllAdvertisementLoading,
    resolve: getAllAdvertisementResolve,
    advertisements
  } = getAllAdvertisement


  const queuelistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    queuelistcontrollerRef.current = controller;

    dispatch(getAllQueueListAction(salonId, controller.signal));

    return () => {
      if (queuelistcontrollerRef.current) {
        queuelistcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

  const getAllQueueList = useSelector(state => state.getAllQueueList)

  const {
    loading: getAllQueueListLoading,
    resolve: getAllQueueListResolve,
    queueList: queuelist
  } = getAllQueueList

  const [currentDate, setCurrentDate] = useState(new Date())

  const appointmentlistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    if (currentDate) {
      const formattedDate = currentDate?.toISOString().split("T")[0]

      const controller = new AbortController();
      appointmentlistcontrollerRef.current = controller;

      console.log(formattedDate)

      dispatch(getDashboardAppointmentListAction(salonId, formattedDate, controller.signal));

      return () => {
        if (appointmentlistcontrollerRef.current) {
          appointmentlistcontrollerRef.current.abort();
        }
      };
    }
  }, [salonId, dispatch, currentDate])


  const getDashboardAppointmentList = useSelector(state => state.getDashboardAppointmentList)

  const {
    loading: getDashboardAppointmentListLoading,
    resolve: getDashboardAppointmentListResolve,
    response: appointmentList
  } = getDashboardAppointmentList


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


  // const truncateText = (text, charecterLimit) => {

  //   if (text?.length <= charecterLimit) {
  //     return text;
  //   }

  //   let truncatedText = text?.slice(0, charecterLimit);

  //   return truncatedText + '...'
  // }

  const truncateText = (text, characterLimit) => {
    if (!text) return '';

    console.log(text.length)

    if (text.length <= characterLimit) {
      return text;
    }

    // Truncate the text and add ellipsis
    let truncatedText = text.slice(0, characterLimit);

    // Ensure ellipsis is added even if the last character is part of a long word
    return truncatedText + '...';
  };

  const [openModal, setOpenModal] = useState(false)

  const updateSalonInfo = () => {
    const salonupdatedata = {
      salonId: adminGetDefaultSalonResponse?.salonId,
      salonDesc
    }

    dispatch(adminUpdateSalonInfoAction(salonupdatedata, setOpenModal, setSalonDesc))
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const adminUpdateSalonInfo = useSelector(state => state.adminUpdateSalonInfo)

  const {
    loading: adminUpdateSalonInfoLoading,
  } = adminUpdateSalonInfo
  return (
    salonId == 0 ? (<>
      <div className='admin_dashboard_page_container_two'>

        <div>
          <h1 style={{
            color: darkmodeOn && "var(--primary-text-light-color1)"
          }}>{adminName || email.split('@')[0]} , don't have any salon</h1>
          <Link to="/admin-salon/createsalon">Create </Link>
        </div>
      </div>
    </>) : (<>
      <div className={`admin_dashboard_page_container ${darkmodeOn && "dark"}`}>
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
                <h1 style={{ visibility: adminName == "" && "hidden" }}>Welcome Back, {truncateText(adminName, 11)}</h1>
                <div
                  style={{
                    background: togglecheck ? "limegreen" : "#000",
                    outline: darkmodeOn ? "1px solid white" : "1px solid black"
                  }}
                >
                  <p className={`salononline_toggle_btn_text ${togglecheck ? 'salononline_toggle_btn_text_active' : 'salononline_toggle_btn_text_inactive'}`}>{togglecheck ? "Online" : "Offline"}</p>
                  <button
                    className={`salononline_toggle_btn ${togglecheck ? 'salononline_toggle_active' : 'salononline_toggle_inactive'}`}
                    onClick={toggleHandler}
                  ></button>
                </div>
              </div>
          }

          <div>
            <div>Salon Information</div>
            {
              adminGetDefaultSalonLoading ?
                <div>
                  <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px", marginTop: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                </div> :
                <div>
                  <p style={{ wordBreak: "break-word" }}>{truncateText(salonDesc, salonChar)}</p>
                  <button onClick={() => setOpenModal(true)} disabled={adminGetDefaultSalonLoading == true ? true : false}>
                    <div><EditIcon /></div>
                    <p>Edit</p>
                  </button>
                </div>
            }

          </div>
        </div>
        <div>
          <div>page</div>
          {
            getAllQueueListLoading && !getAllQueueListResolve ?
              <div className='dashboard_queuelist_loader_container'>
                <div><p>QueueList</p></div>
                <div><Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                  highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} /></div>
              </div> :
              !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length > 0 ?
                <div className={`dashboard_queuelist_container ${darkmodeOn && "dark"}`}>
                  <div>
                    <p>Customer</p>
                    <p>Barber</p>
                    <p>Q Position</p>
                    <p>Join Time</p>
                  </div>

                  {
                    queuelist?.map((q) => (
                      <div key={q._id}>
                        <p>{q.name}</p>
                        <p>{q.barberName}</p>
                        <p>{q.qPosition}</p>
                        <p>{q.timeJoinedQ}</p>
                      </div>
                    ))
                  }
                </div> :
                !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length == 0 ?
                  <div className='dashboard_queuelist_error_container'>
                    <div><p>QueueList</p></div>
                    <div><p style={{
                      color: darkmodeOn ? "#fff" : "#000"
                    }}>No queuelist available</p></div>
                  </div> :
                  !getAllQueueListLoading && !getAllQueueListResolve &&

                  <div className='dashboard_queuelist_error_container'>
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
            getAllAdvertisementLoading && !getAllAdvertisementResolve ?
              <div className='admin_dashboard_carousel_loading'>
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
              !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length > 0 ?
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
                      advertisements?.map((ad) => (
                        <div className='admin_dashboard_carousel_item' key={ad._id}>
                          <img src={ad.url} />
                        </div>
                      )).slice(0, 5)
                    }
                  </Carousel>
                </div> :
                !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length == 0 ?
                  <div className='admin_dashboard_carousel error'>
                    <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="" />
                  </div> :
                  !getAllAdvertisementLoading && !getAllAdvertisementResolve &&
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
            <div>

              {
                getDashboardAppointmentListLoading && !getDashboardAppointmentListResolve ?
                  <div style={{ overflow: "hidden" }}><Skeleton count={5} className='dashboard_appointment_loader' baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} /></div> :
                  !getDashboardAppointmentListLoading && getDashboardAppointmentListResolve && appointmentList?.length > 0 ?
                    <div>
                      <div>
                        <p>Timeslots</p>
                        <p>Customer Name</p>
                        <p>Barber Name</p>
                      </div>
                      <div>
                        {appointmentList.map((a, index) => (
                          <div key={index}>
                            <p>{a.timeSlots}</p>
                            <p>{a.customerName}</p>
                            <p>{a.barberName}</p>
                            <button>Follow Up</button>
                            <div><Threeverticaldots /></div>
                          </div>
                        ))}
                      </div>
                    </div> :
                    !getDashboardAppointmentListLoading && getDashboardAppointmentListResolve && appointmentList?.length === 0 ?
                      <div className={`dashboard_appointment_error ${darkmodeOn && "dark"}`}><p>Appointments not available</p></div> :
                      !getAllAdvertisementLoading && !getDashboardAppointmentListResolve &&
                      <div className={`dashboard_appointment_error ${darkmodeOn && "dark"}`}><p>Appointments not available</p></div>
              }

              {/* <div>
                <div>
                  <p>Timeslots</p>
                  <p>Customer Name</p>
                  <p>Barber Name</p>
                </div>
                <div>

                    <div>
                      <p>a.timeSlots</p>
                      <p>qwertyuiopasdfghjklz</p>
                      <p>qwertyuiopasdfghjklz</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>

                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>


                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>
                    <div>
                      <p>a.timeSlots</p>
                      <p>a.customerName</p>
                      <p>a.barberName</p>
                      <button>Follow Up</button>
                      <div><Threeverticaldots /></div>
                    </div>


                </div>
              </div> */}

            </div>

            {/* <main className='my_container'>
              <div className='my_container_item'>
                <div>
                  <p>Timeslots</p>
                  <p>Customer Name</p>
                  <p>Barber Name</p>
                </div>


                <div>
                  <p>a.timeSlots</p>
                  <p>a.customerName</p>
                  <p>a.barberName</p>
                  <button>Follow Up</button>
                  <div><Threeverticaldots /></div>
                </div>

                <div>
                  <p>a.timeSlots</p>
                  <p>a.customerName</p>
                  <p>a.barberName</p>
                  <button>Follow Up</button>
                  <div><Threeverticaldots /></div>
                </div>

                <div>
                  <p>a.timeSlots</p>
                  <p>a.customerName</p>
                  <p>a.barberName</p>
                  <button>Follow Up</button>
                  <div><Threeverticaldots /></div>
                </div>

                <div>
                  <p>a.timeSlots</p>
                  <p>a.customerName</p>
                  <p>a.barberName</p>
                  <button>Follow Up</button>
                  <div><Threeverticaldots /></div>
                </div>

                <div>
                  <p>a.timeSlots</p>
                  <p>a.customerName</p>
                  <p>a.barberName</p>
                  <button>Follow Up</button>
                  <div><Threeverticaldots /></div>
                </div>

                <div>
                  <p>a.timeSlots</p>
                  <p>a.customerName</p>
                  <p>a.barberName</p>
                  <button>Follow Up</button>
                  <div><Threeverticaldots /></div>
                </div>


              </div>
            </main> */}



          </div>
        </div>

        {
          openModal && <DashboardModal setOpenModal={setOpenModal}>
            <div className={`salon_info_container ${darkmodeOn && "dark"}`}>
              <div>
                <label htmlFor="salonInfo">Write about Salon Information</label>
                <textarea
                  id="salonInfo"
                  name="salonInfo"
                  value={salonDesc}
                  onChange={(e) => setSalonDesc(e.target.value)}
                ></textarea>
              </div>
              {
                adminUpdateSalonInfoLoading ?
                  <button style={{ display: "grid", placeItems: "center" }}>
                    <ButtonLoader />
                  </button> : <button onClick={updateSalonInfo}>
                    <div><EditIcon /></div>
                    <p>Update</p>
                  </button>
              }

            </div>
          </DashboardModal>
        }

      </div>
    </>)


  )
}

export default Dashboard