import React from 'react'
import './Public.css'
import { Link } from 'react-router-dom'

const Public = () => {
  return (
    <main className='public_main_container'>
        <div className='public_main_content'>
            <div>
                <div>
                    <img src="./public_img1.png" alt="" />
                </div>
            </div>
            <div>
                <h1>welcome to iqb barber</h1>
            </div>
            <div>
                <div>
                    <Link to="/adminsignin">Admin Signin</Link>
                    <Link to="#">Barber Signin</Link> 
                </div>
            </div>
        </div>
    </main>
  )
}

export default Public