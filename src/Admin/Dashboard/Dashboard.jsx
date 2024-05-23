import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { ChartIcon1, ChartIcon2, ChartIcon3, Threeverticaldots, UserIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line } from 'recharts'
import Calender from '../../components/Admin/Calender/Calender'

import { useDispatch, useSelector } from 'react-redux';
import api from "../../Redux/api/Api"
import { getAllAdvertisementAction, getAllQueueListAction, getDashboardAppointmentListAction } from '../../Redux/Admin/Actions/DashboardAction';

const Dashboard = () => {

  const dispatch = useDispatch()

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  const adminName = useSelector(state => state.AdminLoggedInMiddleware.adminName)

  const [loading, setLoading] = useState(false)

  const [togglecheck, setTogglecheck] = useState(false)

  const toggleHandler = () => {
    setTogglecheck((prev) => !prev)
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

  console.log(currentDate?.toISOString())

  const appointmentlistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    if (currentDate) {
      const formattedDate = currentDate?.toISOString()

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

  return (
    <div className='admin_dashboard_page_container'>
      <div>
        {
          loading ?
            <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} /> :
            <div>
              <h1>Welcome Back,</h1>
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
                <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px", marginTop: "1rem" }} />
              </div> :
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio numquam soluta iure quaerat voluptate debitis perspiciatis,
                  fugiat libero quos. Ducimus, quasi quaerat commodi inventore fugit expedita voluptates vero est laborum?</p>
                <button>Update</button>
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
              {/* <button onClick={() => setLoading((prev) => !prev)}>
                <div><UserIcon /></div>
                <p>Add Customer</p>
              </button>
              <button>
                <div><UserIcon /></div>
                <p>Join Queue</p>
              </button> */}
            </div>
          </div>
          {
            getAllQueueListLoading && !getAllQueueListResolve ?
              <div>
                <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3.5rem"} style={{ borderRadius: "5px" }} />
              </div> :
              !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length > 0 ?
                <div>
                  <div style={{
                    background: "var(--primary-bg-color3)"
                  }}>
                    <p style={{ color: "var(--primary-text-light-color1)" }}>Customer Name</p>
                    <p style={{ color: "var(--primary-text-light-color1)" }}>Barber Name</p>
                    <p style={{ color: "var(--primary-text-light-color1)" }}>Q Position</p>
                    <p style={{ color: "var(--primary-text-light-color1)" }}>Services</p>
                  </div>

                  {
                    queuelist?.map((q) => (
                      <div key={q._id}>
                        <p>{q.name}</p>
                        <p>{q.barberName}</p>
                        <p>{q.qPosition}</p>
                        <p>{q.services.map((s) => s.serviceName)}</p>
                      </div>
                    ))
                  }
                </div> :

                !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length == 0 ?
                  <div><p>No QueueList </p></div> :

                  !getAllQueueListLoading && !getAllQueueListResolve &&
                  <div><p>No QueueList </p></div>
          }
          <Link to="/admin-queuelist">See All</Link>
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
                  />
                  <Skeleton count={1}
                    height={"1rem"}
                    width={"5.7rem"}
                  />
                </div>

                <div>
                  <Skeleton count={1}
                    height={"5.7rem"}
                    width={"5.7rem"}
                    style={{
                      borderRadius: "50%"
                    }}
                  />
                  <Skeleton count={1}
                    height={"1rem"}
                    width={"5.7rem"}
                  />
                </div>

                <div>
                  <Skeleton count={1}
                    height={"5.7rem"}
                    width={"5.7rem"}
                    style={{
                      borderRadius: "50%"
                    }}
                  />
                  <Skeleton count={1}
                    height={"1rem"}
                    width={"5.7rem"}
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
                /> :
                <ResponsiveContainer width="70%" height="100%" style={{ margin: "auto" }}>
                  <LineChart width={300} height={100} data={data}>
                    <Line type="" dataKey="pv" stroke="#000" strokeWidth={2} />
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
            <div>
              <div>
                <p>Customer Id</p>
                <p>First Name</p>
                <p>Last Name</p>
              </div>
              <div>
                {/* {
                  loading ?
                    <Skeleton count={4}
                      className='dashboard_appointment_loader'
                    /> :

                    appointmentdata.map((a) => (
                      <div key={a.id}>
                        <p>{a.customerId}</p>
                        <p>{a.firstName}</p>
                        <p>{a.lastName}</p>
                        <button>Follow Up</button>
                        <div><Threeverticaldots /></div>
                      </div>
                    ))
                } */}

                {
                  getDashboardAppointmentListLoading && !getDashboardAppointmentListResolve ?
                    <Skeleton count={4}
                      className='dashboard_appointment_loader'
                    /> :
                    !getDashboardAppointmentListLoading && getDashboardAppointmentListResolve && appointmentList?.length > 0 ?
                      appointmentList.map((a) => (
                        <div key={a.id}>
                          <p>{a.customerId}</p>
                          <p>{a.firstName}</p>
                          <p>{a.lastName}</p>
                          <button>Follow Up</button>
                          <div><Threeverticaldots /></div>
                        </div>
                      )) :
                      !getDashboardAppointmentListLoading && getDashboardAppointmentListResolve && appointmentList?.length == 0 ?
                        <p>No Appointment</p> :
                        !getAllAdvertisementLoading && !getDashboardAppointmentListResolve &&
                        <p>No Appointment</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard