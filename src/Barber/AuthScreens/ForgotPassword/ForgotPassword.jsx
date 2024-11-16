import React, { useState } from 'react'
import style from "./ForgotPassword.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon } from '../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { barberForgetPasswordAction } from '../../../Redux/Barber/Actions/BarberPasswordAction'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const ForgotPassword = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState()

  const mailHandler = () => {
    dispatch(barberForgetPasswordAction(email))
    // navigate("/barbercheckemail")
  }

  const barberForgetPassword = useSelector(state => state.barberForgetPassword)

  const {
    loading: barberForgetPasswordLoading
  } = barberForgetPassword

  return (
    <div className={style.forgot_container}>
      <div className={style.forgot_container_left}><img src="/signin_un.png" alt="forgot_image" /></div>

      <div className={style.forgot_container_right}>
        <div>
          <p>Forgot Password</p>

          <input
            type="email"
            placeholder='Enter Your Email ID'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {
            barberForgetPasswordLoading ?
              <button style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className={style.forgot_btn}><ButtonLoader /></button> :
              <button onClick={mailHandler} className={style.forgot_btn}>Send Email</button>
          }

          <Link to="/barbersignin">Back</Link>
        </div>
        <div className={style.homeicon} onClick={() => navigate("/")}><HomeIcon /></div>
      </div>
    </div>
  )
}

export default ForgotPassword