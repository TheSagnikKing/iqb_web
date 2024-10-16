import React from 'react'
import style from "./Dashboard.module.css"
import { Carousel } from 'react-responsive-carousel'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from 'recharts'

const Dashboard = () => {

    const advertisements = [
        {
            id: 1,
            image_url: "https://png.pngtree.com/background/20230516/original/pngtree-salon-with-barber-chair-in-dark-hallway-picture-image_2599846.jpg"
        },
        {
            id: 2,
            image_url: "https://png.pngtree.com/background/20230519/original/pngtree-chic-hair-salon-in-an-old-building-with-black-mirrors-picture-image_2668010.jpg"
        },
        {
            id: 3,
            image_url: "https://png.pngtree.com/background/20230516/original/pngtree-hair-salon-has-a-dark-wood-look-picture-image_2600375.jpg"
        }
    ]

    const queuelists = [
        {
            id: 1,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 2,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 3,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 4,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 5,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 6,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 7,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 8,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 9,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 10,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 11,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 12,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },

        {
            id: 13,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 14,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },

        {
            id: 15,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
        {
            id: 16,
            clientName: "Racheal",
            qpos: 1,
            barberName: "Joseph",
            ewt: 12
        },
    ]


    const barberlist = [
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
        {
            id: 1,
            clientName: "Racheal",
            queue: 1,
            ewt: 12
        },
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



    return (
        <>
            <section style={{ display: "grid", gridTemplateColumns: "25rem calc(100vw - 25rem)" }}>
                <main className={style.sidebar}>
                    <h2>Sidebar</h2>
                    <button className={style.sidebar_btn}>{"<"}</button>
                </main>
                <main className={style.dashboard}>
                    <header className={style.header}>Header</header>
                    <main className={style.dashboard_body}>
                        <div className={style.inner_container}>
                            <div className={style.dashboard_container_one}>
                                <div className={style.saloninfo_container}>
                                    <div>
                                        <h2>Welcome, Adilson Jacinto</h2>
                                    </div>

                                    <div>
                                        <i>Established in the year 2009, The Roose Parlour & Spa is a popular salon in Downtown Phoenix. From haircut, styling to color and other hair treatments, and spa services, the salon offers numerous services for its clients.</i>
                                    </div>
                                </div>
                                <div className={style.salonadv_container}>
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
                                            advertisements.map((item) => {
                                                return (
                                                    <div className={style.carousel_item_container} key={item.id}>
                                                        <img src={item.image_url} alt="image_item" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                </div>
                                <div className={style.barber_report_container}>
                                    <div className={style.barberlist_container}>
                                        <div className={style.barberitem_header}>
                                            <div><p>Barber</p></div>
                                            <div><p>Queue</p></div>
                                            <div><p>EWT</p></div>
                                        </div>

                                        <div className={style.barberlist_container_body}>


                                            {
                                                barberlist.map((barber, index) => {
                                                    return (
                                                        <div className={style.barberitem} key={index}>
                                                            <div>
                                                                <div>
                                                                    <img src="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg" alt="" />
                                                                    <div></div>
                                                                </div>
                                                                <p>Raphael</p>
                                                            </div>
                                                            <div><p>2</p></div>
                                                            <div><p>15 mins</p></div>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>

                                    </div>
                                    <div className={style.report_container}>

                                        <Carousel
                                            showThumbs={false}
                                            infiniteLoop={true}
                                            autoPlay={true}
                                            interval={2000}
                                            showStatus={false}
                                            showArrows={false}
                                            stopOnHover={true}
                                            swipeable={true}
                                            renderIndicator={false}
                                        >

                                            <div className={style.r_chart}>
                                                <p>Salon Type One</p>
                                                <div>
                                                    <ResponsiveContainer width="100%" height="90%" style={{}}>
                                                        <BarChart width={150} height={40} data={data}>
                                                            <Bar dataKey="uv" fill="#FDDA0D" stroke="#000000" strokeWidth={1} />
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
                                                <div>
                                                    <ResponsiveContainer width="100%" height="90%" style={{}}>
                                                        <BarChart width={150} height={40} data={data}>
                                                            <Bar dataKey="uv" fill="red" stroke="#000000" strokeWidth={1} />
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
                                                <div>
                                                    <ResponsiveContainer width="100%" height="90%" style={{}}>
                                                        <BarChart width={150} height={40} data={data}>
                                                            <Bar dataKey="uv" fill="royalblue" stroke="#000000" strokeWidth={1} />
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

                                    <div className={style.queue_body}>
                                        {
                                            queuelists.map((queue, index) => {
                                                return (
                                                    <div
                                                        className={style.queue_item}
                                                        style={{
                                                            borderBottom: index === queuelists.length - 1 ? "none" : "1px solid rgba(0, 0, 0, 0.2)"
                                                        }}
                                                    >
                                                        <div><p>10</p></div>
                                                        <div><p>Adilson Jacinto</p></div>
                                                        <div><p>Srkant Sarkar</p></div>
                                                        <div><p>15 mins</p></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </main>
            </section>
        </>
    )
}

export default Dashboard