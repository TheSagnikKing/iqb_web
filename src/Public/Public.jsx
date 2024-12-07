import React from 'react'
import style from './Public.module.css'
import { Link } from 'react-router-dom'

const Public = () => {
    return (
        <main className={style.public_main_container}>
            <div className={style.public_main_content}>

                <div>
                    <img src="./barber_public.png" alt="public_image" />
                </div>

                <div>
                    <div>
                        <p>welcome to iQueueBookname</p>

                        <div>
                            <Link to="/adminsignin">Admin Signin</Link>
                            <Link to="/barbersignin">Barber Signin</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Public