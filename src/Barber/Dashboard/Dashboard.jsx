import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import style from './Dashboard.module.css'
import { Carousel } from 'react-responsive-carousel';
import { AddIcon, ChartIcon1, ChartIcon2, ChartIcon3, CheckIcon, ClockIcon, DeleteIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts'

import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import { barberConnectSalonAction, barberDashboardSalonInfoAction, barberSalonStatusAction, connectSalonListAction } from '../../Redux/Barber/Actions/DashboardAction';
import { getBarberQueueListAction } from '../../Redux/Barber/Actions/BarberQueueAction';
import { getAdminSalonImagesAction } from '../../Redux/Admin/Actions/SalonAction';

const Dashboard = () => {

  const dispatch = useDispatch()

  const salonId = useSelector(state => state.BarberLoggedInMiddleware?.barberSalonId)
  const email = useSelector(state => state.BarberLoggedInMiddleware?.barberEmail)
  const barberName = useSelector(state => state.BarberLoggedInMiddleware?.barberName)
  const barberId = useSelector(state => state.BarberLoggedInMiddleware?.barberId)

  const barberProfile = useSelector(state => state.BarberLoggedInMiddleware?.entiredata)

  useEffect(() => {
    if (barberProfile?.user[0]?.isApproved == false) {
      dispatch(connectSalonListAction())
    }
  }, [barberProfile])



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

  const [currentSelectedSalon, setCurrentSelectedSalon] = useState({})

  useEffect(() => {
    if (selectedSalonId) {
      const currentSalon = connectSalonListResponse?.find((s) => s.salonId === selectedSalonId)
      setCurrentSelectedSalon(currentSalon)
    }

  }, [selectedSalonId])


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
    const servicepresent = barberSelectedServices.find((s) => s._id === ser._id)

    if (!servicepresent) {
      const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

      setBarberSelectedServices([...barberSelectedServices, serviceWithEWT]);
    }
  }

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

  // console.log(barberConnectSalonMessage)



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
                      barberDashboardSalonInfoLoading ?
                        <div style={{
                          width: "100%",
                          height: "100%",
                          paddingTop: "2rem",
                          paddingInline: "1rem"
                        }}>
                          <Skeleton count={1} height={"4rem"} style={{ borderRadius: "0.3rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                            highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                        </div> :
                        barberDashboardSalonInfoResolve && barberDashboardSalonInfoResponse ?
                          <i>
                            {truncateText(barberDashboardSalonInfoResponse, 200)}
                          </i> :
                          <i>
                            You currently have no salon information
                          </i>
                    }

                  </div>
                </div>

                {
                  getAdminSalonImagesLoading ?
                    <div className={style.salonadv_container_loader}>
                      <Skeleton count={1} className={style.dashboard_advertise_loader} style={{ borderRadius: "0.6vw" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                        highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    </div> :
                    getAdminSalonImagesResolve && AdminSalonImages?.length > 0 ?
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
                      <div className={style.salonadv_container_error}>
                        <img src="./no-image.jpg" alt="no_image" />
                      </div>
                }


                <div className={style.barber_report_container}>

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
                <div className={style.queuelists_container}>
                  <div className={style.queue_header}>
                    <div><p>#</p></div>
                    <div><p>Name</p></div>
                    <div><p>Barber</p></div>
                    <div><p>EWT</p></div>
                  </div>

                  {
                    getBarberQueueListLoading ?
                      <div className={style.queue_body_loading}>
                        <Skeleton count={7} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                      </div> :
                      getBarberQueueListResolve && BarberQueueList?.length > 0 ?
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
                                  <div><p>{queue.name.length > 6 ? `${queue.name.slice(0, 6).concat("...")}` : queue.name}</p></div>
                                  <div><p>{queue.barberName.length > 6 ? `${queue.barberName.slice(0, 6).concat("...")}` : queue.barberName}</p></div>
                                  <div><p>{queue.customerEWT} mins</p></div>
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
  )
}

export default Dashboard