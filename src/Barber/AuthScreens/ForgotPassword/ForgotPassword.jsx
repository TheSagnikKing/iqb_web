import React, { useState } from 'react'
import "./ForgotPassword.css"
import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon } from '../../../icons'
import { useDispatch } from 'react-redux'
import { barberForgetPasswordAction } from '../../../Redux/Barber/Actions/BarberPasswordAction'

const ForgotPassword = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState()

  const mailHandler = () => {
    dispatch(barberForgetPasswordAction(email))
    // navigate("/barbercheckemail")
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={mailHandler}>Send Email</button>

                <Link to="/barbersignin">Back</Link>
            </div>
            <div className='homeicon' onClick={() => navigate("/")}><HomeIcon/></div>
        </div>
    </div>
  )
}

export default ForgotPassword