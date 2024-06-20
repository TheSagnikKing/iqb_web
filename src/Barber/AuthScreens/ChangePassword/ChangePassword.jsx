import React, { useState } from 'react'
import "./ChangePassword.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { barberResetPasswordAction } from '../../../Redux/Barber/Actions/BarberPasswordAction'
import toast from 'react-hot-toast'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const ChangePassword = () => {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // const ChangePasswordHandler = () => {
  //   navigate("/barberpasswordreset")
  // }

  const ChangePasswordHandler = () => {
    if (password == confirmPassword) {
      dispatch(barberResetPasswordAction(password, params?.token, navigate))
    } else {
      toast.error("Password donot match", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  }

  const barberResetPassword = useSelector(state => state.barberResetPassword)

  const {
    loading: barberResetPasswordLoading,
  } = barberResetPassword

  return (
    <div className='change_password_container'>
      <div><img src="/reset_img.png" alt="reset_image" /></div>

      <div>
        <div>
          <h1>Change Password</h1>
          <p>In order to protect your account, make sure your password</p>
          <p>Point 1</p>
          <p>Point 2</p>

          <div>
            <label htmlFor="">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {
            barberResetPasswordLoading ?
              <button style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><ButtonLoader /></button> :
              <button onClick={ChangePasswordHandler}>Change Password</button>
          }

          <Link to="/barbersignin">Back</Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword