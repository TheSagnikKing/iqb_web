import React from 'react'
import "./CheckEmail.css"
import { Link, useNavigate } from 'react-router-dom'

const CheckEmail = () => {

  const navigate = useNavigate()

  return (
    <div className='check_email_container'>
        <div><img src="/forgot_img.png" alt="forgot_image" /></div>

        <div>
            <div>
                <h1>Check Email</h1>
                <p>We have sent a password reset link to abcd@gmail.com</p>                
                
                <button onClick={() => {}}>Resend</button>

                <Link to="/barbersignin">Back</Link>
            </div>
        </div>
    </div>
  )
}

export default CheckEmail