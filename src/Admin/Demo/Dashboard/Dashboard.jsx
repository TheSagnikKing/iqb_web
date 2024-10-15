import React from 'react'
import style from "./Dashboard.module.css"
import { Carousel } from 'react-responsive-carousel'

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

    ]
    return (
        <>
            <section style={{ display: "grid", gridTemplateColumns: "30rem 1fr" }}>
                <main className={style.sidebar}>
                    <h2>Sidebar</h2>
                    <button className={style.sidebar_btn}>{"<"}</button>
                </main>
                <main className={style.dashboard}>
                    <header className={style.header}>Header</header>
                    <main className={style.dashboard_body}>
                        <div className={style.dashboard_container_one}>
                            <div className={style.saloninfo_container}>
                                <h2>Welcome, Adilson Jacinto</h2>
                                <p>Established in the year 2009, The Roose Parlour & Spa is a popular salon in Downtown Phoenix. From haircut, styling to color and other hair treatments, and spa services, the salon offers numerous services for its clients.
                                    We aim to offer customized haircut and color correction to strike the perfect balance of looks that are enduring, yet original.

                                </p>
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
                                <div className={style.barberlist_container}>Barber List</div>
                                <div className={style.report_container}>Reports</div>
                            </div>
                        </div>

                        <div className={style.dashboard_container_two}>
                            <div className={style.queuelists_container}>
                                <div className={style.queue_header}>
                                    <div><p>Client Name</p></div>
                                    <div><p>Barber Name</p></div>
                                </div>
                                <div className={style.queue_body}>
                                    {
                                        queuelists.map((queue, index) => {
                                            return (
                                                <div className={style.queue_item} key={queue.id}
                                                    style={{
                                                        borderBottom: index === queuelists.length - 1 ? "none" : "1px solid rgba(0, 0, 0, 0.2)"
                                                    }}
                                                >
                                                    <div>
                                                        <div>
                                                            <p>{queue.clientName}</p>
                                                            <p>Q-Postion {queue.qpos}</p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div>
                                                            <p>{queue.barberName}</p>
                                                            <p>EWT {queue.ewt}mins</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

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