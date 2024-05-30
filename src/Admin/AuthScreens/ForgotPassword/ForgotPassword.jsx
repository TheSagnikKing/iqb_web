import React, { useState } from 'react'
import "./ForgotPassword.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminForgetPasswordAction } from '../../../Redux/Admin/Actions/AdminPasswordAction'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mailHandler = () => {
      dispatch(adminForgetPasswordAction(email))
    // navigate("/admincheckemail")
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

                <Link to="/adminsignin">Back</Link>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword