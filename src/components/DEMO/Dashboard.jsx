import React from 'react'
import style from "./Dashboard.module.css"

const Dashboard = () => {
    return (
        <section className={style.container}>
            <aside className={style.sidebar}>Sidebar</aside>
            <main className={style.dashboard_container}>Dashboard</main>
        </section>
    )
}

export default Dashboard