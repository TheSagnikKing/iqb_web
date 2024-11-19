
import React, { useState } from 'react'
import style from "./ForgotPassword.module.css"
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
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      mailHandler();
    }
  };

  const adminForgetPassword = useSelector(state => state.adminForgetPassword)

  const {
    loading: adminForgetPasswordLoading,
  } = adminForgetPassword

  return (
    <div className={style.forgot_container}>
      <div className={style.forgot_container_left}><img src="./signin_un.png" alt="forgot_image" /></div>

      <div className={style.forgot_container_right}>
        <div>
          <p>Forgot Password</p>

          <input
            type="email"
            placeholder='Enter Your Email ID'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          {
            adminForgetPasswordLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }} className={style.forgot_btn}><ButtonLoader /></button> : <button onClick={mailHandler} className={style.forgot_btn}>Send Email</button>
          }

          <Link to="/adminsignin">Back</Link>
        </div>
        <div className={style.homeicon} onClick={() => navigate("/")}><HomeIcon /></div>
      </div>
    </div>
  )
}

export default ForgotPassword