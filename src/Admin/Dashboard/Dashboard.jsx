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
import { adminSalonStatusAction, getAllAdvertisementAction, getAllQueueListAction, getDashboardAppointmentListAction } from '../../Redux/Admin/Actions/DashboardAction';
import DashboardModal from '../../components/Modal/DashboardModal/DashboardModal';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';

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

  useEffect(() => {
    if (adminGetDefaultSalonResponse) {
      setTogglecheck(adminGetDefaultSalonResponse?.isOnline)
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
    response: queuelist
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


  let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nWhy do we use it?\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n\nWhere does it come from?\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.";

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
  };

  const [openModal, setOpenModal] = useState(false)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    salonId == 0 ? (<>
      <div className='admin_dashboard_page_container_two'>

        <div>
          <h1>{adminName || email.split('@')[0]} , don't have any salon</h1>
          <Link to="/admin-salonlist">Create </Link>
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
                <h1>Welcome Back, {adminName}</h1>
                <div
                  style={{
                    background: togglecheck ? "limegreen" : "#000"
                  }}
                >
                  <p className={`dashboard_toggle_btn_text ${togglecheck ? 'dashboard_toggle_btn_text_active' : 'dashboard_toggle_btn_text_inactive'}`}>{togglecheck ? "Online" : "Offline"}</p>
                  <button
                    className={`dashboard_toggle_btn ${togglecheck ? 'dashboard_toggle_active' : 'dashboard_toggle_inactive'}`}
                    onClick={toggleHandler}
                  ></button>
                </div>
              </div>
          }

          <div>
            <div>Salon Information</div>
            {
              loading ?
                <div>
                  <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px", marginTop: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                </div> :
                <div>
                  <p>{truncateText(text, 30)}</p>
                  <button onClick={() => setOpenModal(true)}>
                    <div><EditIcon /></div>
                    <p>Edit</p>
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
              </div>
            </div>

            {
              getAllQueueListLoading && !getAllQueueListResolve ?
                <div>
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                  <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                    highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                </div> :
                !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length > 0 ?
                  <>
                    <div className={`queuelist_container ${darkmodeOn && "dark"}`}>
                      <div>
                        <p>Customer Name</p>
                        <p>Barber Name</p>
                        <p>Q Position</p>
                        <p>Services</p>
                      </div>
                      <div>
                        {
                          queuelist?.map((q) => (
                            <div key={q._id}>
                              <p>{q.name}</p>
                              <p>{q.barberName}</p>
                              <p>{q.qPosition}</p>
                              <p>{q.services?.map((s) => s.serviceName)}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <Link to="/admin-queue" style={{ fontSize: "1.2rem",color:darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-text-light-color2)" }}>See All</Link>
                  </> :
                  !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length == 0 ?
                    <div className={`queuelist_container_error ${darkmodeOn && "dark"}`}><p>Queue List not available</p></div> :
                    !getAllQueueListLoading && !getAllQueueListResolve &&
                    <div className={`queuelist_container_error ${darkmodeOn && "dark"}`}><p>Queue List not available</p></div>
            }

          </div>
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
                      ))
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

            </div>
          </div>
        </div>

        {
          openModal && <DashboardModal setOpenModal={setOpenModal}>
            <div className={`salon_info_container ${darkmodeOn && "dark"}`}>
              <div>
                <label htmlFor="salonInfo">Write about Salon Information</label>
                <textarea id="salonInfo" name="salonInfo" value={text}></textarea>
              </div>
              <button>
                <div><EditIcon /></div>
                <p>Update</p>
              </button>
            </div>
          </DashboardModal>
        }

      </div>
    </>)


  )
}

export default Dashboard