import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './Dashboard.module.css'
import { useNavigate } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdvertisementAction, getAllQueueListAction, getDashboardAppointmentListAction } from '../../Redux/Admin/Actions/DashboardAction';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import { getAdminBarberListAction } from '../../Redux/Admin/Actions/BarberAction';

const Dashboard = () => {

  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    loading: adminGetDefaultSalonLoading,
    resolve: adminGetDefaultSalonResolve,
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  const adminName = useSelector(state => state.AdminLoggedInMiddleware.adminName)

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


  const truncateText = (text, characterLimit) => {
    if (!text) return '';

    // console.log(text.length)

    if (text.length <= characterLimit) {
      return text;
    }

    let truncatedText = text.slice(0, characterLimit);

    return truncatedText + '...';
  };


  const BarberListcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    BarberListcontrollerRef.current = controller;

    dispatch(getAdminBarberListAction(salonId, controller.signal));

    return () => {
      if (BarberListcontrollerRef.current) {
        BarberListcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);


  const getAdminBarberList = useSelector(state => state.getAdminBarberList)

  const {
    loading: getAdminBarberListLoading,
    resolve: getAdminBarberListResolve,
    getAllBarbers: BarberList
  } = getAdminBarberList

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

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    salonId === 0 ? (<>
      <main className={style.dashboard}>
        <div className={`${style.dashboard_body_intial} ${darkmodeOn && style.dark}`}>
          <div className={`${style.dashboard_intial_container}`}>
            <p>Hey &#128075;, {adminName || email?.split('@')[0]}</p>
            <div>
              <p>You don't have any salon right now.</p>
              <button onClick={() => navigate("/admin-salon/createsalon")}>Create</button>
            </div>
          </div>
        </div>
      </main>
    </>) : (<>
      <main className={style.dashboard}>
        <main className={style.dashboard_body}>
          <div className={style.inner_container}>
            <div className={style.dashboard_container_one}>
              <div className={`${style.saloninfo_container} ${darkmodeOn && style.dark}`}>
                <div>
                  <h2>Welcome, {adminName}</h2>
                </div>

                <div>
                  {
                    adminGetDefaultSalonLoading ?
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          paddingTop: "2rem",
                          paddingInline: "1rem"
                        }}>
                        <Skeleton count={1} height={"4rem"} style={{ borderRadius: "0.3rem" }}
                          baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                        />
                      </div> :
                      adminGetDefaultSalonResolve && adminGetDefaultSalonResponse?.salonDesc?.length > 0 ?
                        <i>
                          {truncateText(adminGetDefaultSalonResponse?.salonDesc, 35)}
                        </i> :
                        <i>
                          You currently have no salon information
                        </i>
                  }

                </div>
              </div>

              {
                getAllAdvertisementLoading ?
                  <div className={style.salonadv_container_loader}>
                    <Skeleton count={1} className={style.dashboard_advertise_loader} style={{ borderRadius: "0.6vw" }}
                      baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                    />
                  </div> :
                  getAllAdvertisementResolve && advertisements?.length > 0 ?
                    <div className={`${style.salonadv_container} ${darkmodeOn && style.dark}`}>
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
                          advertisements?.slice(0, 5)?.map((item) => {
                            return (
                              <div className={style.carousel_item_container} key={item._id}>
                                <img src={item.url} alt="image_item" />
                              </div>
                            )
                          })
                        }
                      </Carousel>
                    </div> :
                    <div className={style.salonadv_container_error}>
                      <img src="./no-image.jpg" alt="no_image" />
                    </div>
              }


              <div className={style.barber_report_container}>
                <div className={`${style.barberlist_container} ${darkmodeOn && style.dark}`}>

                  <div className={`${style.barberitem_header} ${darkmodeOn && style.dark}`}>
                    <div>
                      <div>

                      </div>
                      <p>Barber</p>
                    </div>
                    <div><p>Queue</p></div>
                    <div><p>EWT</p></div>
                  </div>
                  {
                    getAdminBarberListLoading ?
                      <div className={style.barberlist_container_body_loading}>
                        <Skeleton count={2} height={"6rem"} style={{ marginBottom: "1rem" }}
                          baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                        />
                      </div> :
                      getAdminBarberListResolve && BarberList?.length > 0 ?
                        <div className={style.barberlist_container_body}>


                          {
                            BarberList?.map((barber, index) => {
                              return (
                                <div
                                  className={`${style.barberitem} ${darkmodeOn && style.dark}`}
                                  key={barber._id}
                                  style={{
                                    borderBottom: BarberList.length - 1 === index && "none"
                                  }}
                                >
                                  <div>
                                    <div>
                                      <img src={barber?.profile?.[0]?.url} alt="barber" />
                                      <div
                                        style={{
                                          background: barber?.isOnline ? "limegreen" : "red"
                                        }}
                                      ></div>
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
                        <div className={style.barberlist_container_body_error}>
                          <p>No barber available</p>
                        </div>
                  }

                </div>
                <div className={`${style.report_container} ${darkmodeOn && style.dark}`}>

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
                          <BarChart width={150} height={40} data={data2}>
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
                          <BarChart width={150} height={40} data={data2}>
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
              <div className={`${style.queuelists_container} ${darkmodeOn && style.dark}`}>
                <div className={`${style.queue_header} ${darkmodeOn && style.dark}`}>
                  <div><p>#</p></div>
                  <div><p>Name</p></div>
                  <div><p>Barber</p></div>
                  <div><p>EWT</p></div>
                </div>

                {
                  getAllQueueListLoading ?
                    <div className={style.queue_body_loading}>
                      <Skeleton count={7} height={"6rem"} style={{ marginBottom: "1rem" }} 
                      baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                      highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
                    </div> :
                    getAllQueueListResolve && queuelist?.length > 0 ?
                      <div className={style.queue_body}>
                        {
                          queuelist.map((queue, index) => {
                            return (
                              <div
                                key={queue._id}
                                className={`${style.queue_item} ${darkmodeOn && style.dark}`}
                                style={{
                                  borderBottom: index === queuelist.length - 1 && "none"
                                }}
                              >
                                <div><p>{queue.qPosition === 1 ? "Next" : queue.qPosition}</p></div>
                                <div><p>{queue.name.length > 6 ? `${queue.name.slice(0, 6).concat("...")}` : queue.name}</p></div>
                                <div><p>{queue.barberName.length > 6 ? `${queue.barberName.slice(0, 6).concat("...")}` : queue.barberName}</p></div>
                                <div><p>{queue.customerEWT === 0 ? "-" : queue.customerEWT + "mins"}</p></div>
                              </div>
                            )
                          })
                        }
                      </div> :
                      <div className={style.queue_body_error}>
                        <p>No queuelist available</p>
                      </div>
                }

              </div>
            </div>
          </div>
        </main>
      </main >
    </>)


  )
}

export default Dashboard






