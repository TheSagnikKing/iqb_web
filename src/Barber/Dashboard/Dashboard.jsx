import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { ChartIcon1, ChartIcon2, ChartIcon3, CheckIcon, DeleteIcon, ShowSalonInfo, UserIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line } from 'recharts'
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
    if (salonId == 0) {
      dispatch(connectSalonListAction())
    }
  }, [salonId])

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




  // let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32."

  const truncateText = (text, charecterLimit) => {
    if (text.length <= charecterLimit) {
      return text;
    }

    let truncatedText = text.slice(0, charecterLimit);

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
    response: barberConnectSalonResponse
  } = barberConnectSalon


  const queuelistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    if (salonId != 0) {
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
    if (salonId) {
      const controller = new AbortController();
      barberDashboardSalonInfoRef.current = controller;

      dispatch(barberDashboardSalonInfoAction(salonId, controller.signal));

      return () => {
        if (barberDashboardSalonInfoRef.current) {
          barberDashboardSalonInfoRef.current.abort();
        }
      };
    }

  }, [salonId, dispatch]);

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
    if (salonId) {
      dispatch(getAdminSalonImagesAction(salonId))
    }
  }, [salonId])

  const getAdminSalonImages = useSelector(state => state.getAdminSalonImages)

  const {
    loading: getAdminSalonImagesLoading,
    resolve: getAdminSalonImagesResolve,
    response: AdminSalonImages
  } = getAdminSalonImages

  const [openModal, setOpenModal] = useState(false)

  return (
    salonId == 0 ? <>
      <div className={`barber_connect_salon_container ${darkmodeOn && "dark"}`}>
        <h3>Connect To Your Salon</h3>
        <div className={`barber_connect_salon_list_container ${darkmodeOn && "dark"}`}>
          <div className={`barber_connect_salon_list ${darkmodeOn && "dark"}`}>
            <h4>Choose Your Salon</h4>
            <div>
              <div>
                <div>
                  <p>SalonID</p>
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
                        <div key={s._id}>
                          <p>{s.salonId}</p>
                          <p>{s.salonName}</p>
                          {
                            selectedSalonId == s.salonId ? <button style={{ background: "limegreen", color: "#fff" }}><CheckIcon /></button> : <button onClick={() => setSelectedSalonId(s.salonId)} style={{ fontSize: "2.2rem" }}>+</button>
                          }

                        </div>
                      ))
                      :
                      !connectSalonListLoading && connectSalonListResolve && connectSalonListResponse?.length == 0 ?
                        <div>
                          <p>No Salons Available</p>
                        </div> :
                        !connectSalonListLoading && connectSalonListResolve &&
                        <div>
                          <p>No Salons Available</p>
                        </div>
                }


              </div>
            </div>
          </div>

          <div className={`barber_list_services_list ${darkmodeOn && "dark"}`}>
            <h4>List of Services</h4>
            <div>
              <div>
                <div>
                  <p>Services</p>
                  <p>Type</p>
                  <p>Price</p>
                  <p>Select</p>
                </div>

                {
                  selectedServiceList?.map((ser) => (
                    <div key={ser._id}>
                      <p>{ser.serviceName}</p>
                      <p>{ser.vipService ? "VIP" : "Regular"}</p>
                      <p>{currentSelectedSalon?.currency}{" "}{ser.servicePrice}</p>
                      {
                        barberSelectedServices.some((b) => b._id === ser._id) ?
                          <button style={{ background: "red" }} onClick={() => deleteServiceHandler(ser)}><DeleteIcon /></button> : <button onClick={() => selectServiceHandler(ser)}>+</button>
                      }

                    </div>
                  ))
                }

              </div>
            </div>
          </div>

          <div>
            {
              barberConnectSalonLoading ? <button style={{
                display: "grid",
                placeItems: "center"
              }}><ButtonLoader /></button> : <button onClick={connectSalonClicked}>Connect Salon</button>
            }

          </div>
        </div>
      </div>
    </> : <>
      <div className={`barber_dashboard_page_container ${darkmodeOn && "dark"}`}>
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
                {
                  barberName && <h1>Welcome Back, {truncateText(barberName, 11)}</h1>
                }
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
                  <p>{truncateText(salonDesc, 60)}</p>
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
          <div>
            <div>
              <p>Queue List</p>
              <div>
                <Link to="/barber-queue" style={{ fontSize: "1.6rem", color: "var(--primary-text-light-color1)", textDecoration: "none" }}>See All</Link>
              </div>
            </div>

            {
              getBarberQueueListLoading && !getBarberQueueListResolve ?
                <div>
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                </div> :
                !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ?
                  <>
                    <div className={`queuelist_container ${darkmodeOn && "dark"}`}>
                      <div>
                        <p>Customer Name</p>
                        <p>Barber Name</p>
                        <p>Q Position</p>
                        <p>Services</p>
                      </div>

                      {
                        BarberQueueList?.map((q) => (
                          <div key={q?._id}>
                            <p>{q?.name}</p>
                            <p>{q?.barberName}</p>
                            <p>{q?.qPosition}</p>
                            <p>{q?.services?.map((s) => s.serviceName)}</p>
                          </div>
                        ))
                      }

                    </div>
                  </> :
                  !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ?
                    <div className={`queuelist_container_error ${darkmodeOn && "dark"}`}><p>Queue List not available</p></div> :
                    !getBarberQueueListLoading && !getBarberQueueListResolve &&
                    <div className={`queuelist_container_error ${darkmodeOn && "dark"}`}><p>Queue List not available</p></div>
            }

            {/* <>
              <div className={`queuelist_container ${darkmodeOn && "dark"}`}>
                <div>
                  <p>Customer Name</p>
                  <p>Barber Name</p>
                  <p>Q Position</p>
                  <p>Services</p>
                </div>

                <div>
                  <p>q.name</p>
                  <p>q.barberName</p>
                  <p>q.qPosition</p>
                  <p>q.services?.map</p>
                </div>

                <div>
                  <p>q.name</p>
                  <p>q.barberName</p>
                  <p>q.qPosition</p>
                  <p>q.services?.map</p>
                </div>

                <div>
                  <p>q.name</p>
                  <p>q.barberName</p>
                  <p>q.qPosition</p>
                  <p>q.services?.map</p>
                </div>

                <div>
                  <p>q.name</p>
                  <p>q.barberName</p>
                  <p>q.qPosition</p>
                  <p>q.services?.map</p>
                </div>

                <div>
                  <p>q.name</p>
                  <p>q.barberName</p>
                  <p>q.qPosition</p>
                  <p>q.services?.map</p>
                </div>
                <div>
                  <p>q.name</p>
                  <p>q.barberName</p>
                  <p>q.qPosition</p>
                  <p>q.services?.map</p>
                </div>

              </div>
            </> */}

          </div>
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
              color: darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-bg-light-color2)"
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
                <textarea id="barbersalonInfo" name="barbersalonInfo" value={salonDesc} onChange={(e) => setSalonDesc(e.target.value)}></textarea>
              </div>

            </div>
          </DashboardModal>
        }

      </div>
    </>
  )
}

export default Dashboard