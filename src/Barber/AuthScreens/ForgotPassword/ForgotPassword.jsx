import React, { useState } from 'react'
import style from "./ForgotPassword.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { HomeIcon } from '../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { barberForgetPasswordAction } from '../../../Redux/Barber/Actions/BarberPasswordAction'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import toast from 'react-hot-toast'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

const ForgotPassword = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState()

  const [emailError, setEmailError] = useState("")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const mailHandler = () => {

    if (!email) {
      toast.error("Please enter email", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setEmailError("Please enter email")
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: "0.3rem",
          background: "#333",
          color: "#fff",
        },
      });
      return setEmailError("Invalid email format");
    }


    dispatch(barberForgetPasswordAction(email))
    // navigate("/barbercheckemail")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      mailHandler();
    }
  };

  const barberForgetPassword = useSelector(state => state.barberForgetPassword)

  const {
    loading: barberForgetPasswordLoading
  } = barberForgetPassword

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <div className={`${style.forgot_container} ${darkmodeOn && style.dark}`}>
      <div className={`${style.forgot_container_left} ${darkmodeOn && style.dark}`}><img src="/signin_un.png" alt="forgot_image" /></div>

      <div className={`${style.forgot_container_right} ${darkmodeOn && style.dark}`}>
        <div>
          <p>Forgot Password</p>

          <div>
            <input
              type="email"
              placeholder='Enter Your Email ID'
              value={email}
              onChange={(e) => {
                setEmailError("")
                setEmail(e.target.value)
              }}
              onKeyDown={handleKeyPress}
              style={{ border: emailError ? "0.1rem solid red" : undefined }}
            />
            <p className={style.error_message}>{emailError}</p>
          </div>

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