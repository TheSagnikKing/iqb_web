import React, { useState } from 'react'
import style from "./ChangePassword.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { barberResetPasswordAction } from '../../../Redux/Barber/Actions/BarberPasswordAction'
import toast from 'react-hot-toast'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { Eyevisible, Notvisibleeye } from '../../../icons'

const ChangePassword = () => {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const ChangePasswordHandler = () => {

    if (!password || !confirmPassword) {
      toast.error("Please fill out both password fields.", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    dispatch(barberResetPasswordAction(password, params?.token, navigate))
  };


  const barberResetPassword = useSelector(state => state.barberResetPassword)

  const {
    loading: barberResetPasswordLoading,
  } = barberResetPassword


  const [visibleeye, setVisibleeye] = useState(false)
  const [visibleeye2, setVisibleeye2] = useState(false)

  return (
    <div className={style.change_password_container}>
      <div className={style.change_password_container_left}><img src="/signin_un.png" alt="reset_image" /></div>

      <div className={style.change_password_container_right}>
        <div>
          <p>Change Password</p>
          <p>Use at least 8 characters with a mix of letters, numbers, and symbols.</p>
          <p>Keep it unique and avoid reusing passwords.</p>

          <div className={style.password_container}>
            <input
              type={visibleeye ? "text" : "password"}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={() => setVisibleeye((prev) => !prev)}>{visibleeye ? <Eyevisible /> : <Notvisibleeye />}</div>
          </div>

          <div className={style.password_container}>
            <input
              type={visibleeye2 ? "text" : "password"}
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div onClick={() => setVisibleeye2((prev) => !prev)}>{visibleeye2 ? <Eyevisible /> : <Notvisibleeye />}</div>
          </div>

          {
            barberResetPasswordLoading ?
              <button style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className={style.change_btn}><ButtonLoader /></button> :
              <button onClick={ChangePasswordHandler} className={style.change_btn}>Change Password</button>
          }

          <Link to="/barbersignin">Back</Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword