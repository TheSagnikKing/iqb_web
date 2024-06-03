import React, { useState } from 'react'
import "./ForgotPassword.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminForgetPasswordAction } from '../../../Redux/Admin/Actions/AdminPasswordAction'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { HomeIcon } from '../../../icons'

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const mailHandler = () => {
    dispatch(adminForgetPasswordAction(email))
    // navigate("/admincheckemail")
  }

  const adminForgetPassword = useSelector(state => state.adminForgetPassword)

  const {
    loading: adminForgetPasswordLoading,
  } = adminForgetPassword

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

          {
            adminForgetPasswordLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}><ButtonLoader /></button> : <button onClick={mailHandler}>Send Email</button>
          }
          
          <Link to="/adminsignin">Back</Link>
        </div>
        <div className='homeicon' onClick={() => navigate("/")}><HomeIcon/></div>
      </div>
    </div>
  )
}

export default ForgotPassword