import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';
import { ChartIcon1, ChartIcon2, ChartIcon3, Threeverticaldots, UserIcon } from '../../icons';
import { ResponsiveContainer, LineChart, Line } from 'recharts'
import Calender from '../../components/Admin/Calender/Calender'

const Dashboard = () => {

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

  const appointmentdata = [
    {
      id: 1,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 2,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 3,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 4,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 5,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 6,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 7,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
    {
      id: 8,
      customerId: "BH1387687357",
      firstName: "Rob",
      lastName: "Lee"
    },
  ]

  const [currentDate, setCurrentDate] = useState(new Date())

  return (
    <div className='admin_dashboard_page_container'>
      <div>
        {
          loading ?
            <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} /> :
            <div>
              <h1>Welcome Back Sagnik,</h1>
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
              <button>
                <div><UserIcon /></div>
                <p>Add Customer</p>
              </button>
              <button>
                <div><UserIcon /></div>
                <p>Join Queue</p>
              </button>
            </div>
          </div>
          {
            loading ?
              <div>
                <Skeleton count={1} height={"3rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3rem"} style={{ borderRadius: "5px" }} />
              </div> :
              <div>
                <div>queue item</div>
                <div>queue item</div>
                <div>queue item</div>
                <div>queue item</div>
              </div>
          }
          <Link to="#">See All</Link>
        </div>
      </div>

      <div
        style={{ boxShadow: loading ? "none" : "0px 0px 6px rgba(0,0,0,0.4)" }}
      >
        {
          loading ?
            <div className='admin_dashboard_carousel_loading'>
              <Skeleton count={1}
                height={"100%"}
                width={"100%"}
                style={{
                  borderRadius: "1.5rem"
                }}
              />
            </div> :
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
                <div className='admin_dashboard_carousel_item'>
                  <img src="https://images.fresha.com/lead-images/placeholders/barbershop-77.jpg?class=venue-gallery-large" />
                </div>

                <div className='admin_dashboard_carousel_item'>
                  <img src="https://img.freepik.com/free-photo/handsome-man-barber-shop-styling-hair_1303-20978.jpg" />
                </div>

                <div className='admin_dashboard_carousel_item'>
                  <img src="https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg=" />
                </div>

              </Carousel>
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
                <ResponsiveContainer width="100%" height="100%" style={{ margin: "auto" }}>
                  <LineChart width={300} height={100} data={data}>
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
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
                {
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