import React from 'react'
import './Public.css'
import { Link } from 'react-router-dom'

const Public = () => {
    return (
        <main className='public_main_container'>
            <div className='public_main_content'>

                <div>
                    <img src="./public_img.png" alt="public_image" />
                </div>

                <div>
                    <div>
                        <h1>welcome to iQueueBarbers</h1>

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