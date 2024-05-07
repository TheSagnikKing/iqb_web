import React from 'react'
import "./ForgotPassword.css"
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

  const navigate = useNavigate()

  const mailHandler = () => {
    navigate("/admincheckemail")
  }

  return (
    <div className='forgot_container'>
        <div><img src="/forgot_img.png" alt="forgot_image" /></div>

        <div>
            <div>
                <h1>Forgot Password</h1>
                
                <input 
                type="email"
                placeholder='Enter Your Email ID'
                />

                <button onClick={mailHandler}>Send Email</button>

                <Link to="/adminsignin">Back</Link>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword