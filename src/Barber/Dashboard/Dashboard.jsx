import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { ChartIcon1, ChartIcon2, ChartIcon3, CheckIcon, DeleteIcon, EditIcon, Threeverticaldots, UserIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line } from 'recharts'
import Calender from '../../components/Admin/Calender/Calender'

import DashboardModal from '../../components/Modal/DashboardModal/DashboardModal';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import { useDispatch, useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import { barberConnectSalonAction, connectSalonListAction } from '../../Redux/Barber/Actions/DashboardAction';

const Dashboard = () => {

  const dispatch = useDispatch()

  const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
  const email = useSelector(state => state.BarberLoggedInMiddleware.barberEmail)
  const barberName = useSelector(state => state.BarberLoggedInMiddleware.barberName)

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

  console.log(selectedSalonId)

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
    setBarberSelectedServices([...barberSelectedServices,ser])
  }

  // console.log("BarberSelectedServices ",barberSelectedServices)

  const deleteServiceHandler = (ser) => {
    setBarberSelectedServices((services) => services.filter((s) => s._id !== ser._id))
  }

  const connectSalonClicked = () => {
    const connectSalondata = {
      barberServices:barberSelectedServices,
      email,
      salonId:selectedSalonId
    }

    dispatch(barberConnectSalonAction(connectSalondata))
    console.log(connectSalondata)
  }

  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    salonId == 0 ? <>
      <div className='barber_connect_salon_container'>
        <h3>Connect To Your Salon</h3>
        <div className='barber_connect_salon_list_container'>
          <div className='barber_connect_salon_list'>
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
                    <div>Loading...</div> :
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

          <div className='barber_list_services_list'>
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
                      <p>${ser.servicePrice}</p>
                      {
                        barberSelectedServices.some((b) => b._id === ser._id) ?
                        <button style={{background:"red"}} onClick={() => deleteServiceHandler(ser)}><DeleteIcon/></button> : <button onClick={() => selectServiceHandler(ser)}>+</button> 
                      }
                      
                    </div>
                  ))
                }

              </div>
            </div>
          </div>

          <div>
            <button onClick={connectSalonClicked}>Connect Salon</button>
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
                <h1>Welcome Back Arghya</h1>
                {/* <div
                  style={{
                    background: togglecheck ? "limegreen" : "#000"
                  }}
                >
                  <p className={`salononline_toggle_btn_text ${togglecheck ? 'salononline_toggle_btn_text_active' : 'salononline_toggle_btn_text_inactive'}`}>{togglecheck ? "Online" : "Offline"}</p>
                  <button
                    className={`salononline_toggle_btn ${togglecheck ? 'salononline_toggle_active' : 'salononline_toggle_inactive'}`}
                    onClick={toggleHandler}
                  ></button>
                </div> */}
              </div>
          }

          <div style={{
            background: darkmodeOn ? "var(--dark-mode-bg-color-4)" : "var(--primary-bg-light-color1)"
          }}>
            <div>Salon Information</div>

            <p style={{textAlign:"center",marginBlock:"2rem",fontSize:"1.4rem",color:darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-bg-light-color2)"}}>            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro vel eum dolorem neque est voluptas eaque quasi explicabo amet iure error sint, deserunt maxime placeat rem culpa vitae ipsam modi itaque enim eligendi, quisquam ducimus repudiandae. Facere blanditiis ipsum assumenda?</p>

          </div>
        </div>
        <div>
          <div>page</div>
          <div>
            <div>
              <p>Queue List</p>
              <div>
                <Link to="/admin-queue" style={{ fontSize: "1.6rem", color: "var(--primary-text-light-color1)", textDecoration: "none" }}>See All</Link>
              </div>
            </div>

          </div>
        </div>

        <div
          style={{
            boxShadow: loading ? "none" : "0px 0px 6px rgba(0,0,0,0.4)",
          }}
        >
            <img 
            src="https://i.pinimg.com/736x/10/05/2a/10052a45b91b9f02d7e417084ab5a02e.jpg"
            alt="" 
            style={{width:"100%",height:"100%",borderRadius:"1.5rem"}}
            />
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
              color:darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-bg-light-color2)"
            }}>
                Appointment not available
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard