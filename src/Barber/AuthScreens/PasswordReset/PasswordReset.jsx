import React from 'react'
import style from "./PasswordReset.module.css"
import { useNavigate } from 'react-router-dom'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useSelector } from 'react-redux'

const PasswordReset = () => {
 
  const navigate = useNavigate()

  const passwordresetHandler = () => {
    navigate("/barbersignin")
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <div className={`${style.password_reset_container} ${darkmodeOn && style.dark}`}>
        <div>
            <img src="/passwordReset_img.png" alt="passwordReset_img" />
            <p>Password Reset</p>
            <p>Your Password has been successfully reset.</p>
            {/* <p>Click below to Login</p> */}
            <button onClick={passwordresetHandler}>Signin</button>
        </div>
    </div>
  )
}

export default PasswordReset