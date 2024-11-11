import React, { useState } from 'react'
import style from "./ChangePassword.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminResetPasswordAction } from '../../../Redux/Admin/Actions/AdminPasswordAction'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import toast from 'react-hot-toast'
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
          fontSize: "1.4rem",
          borderRadius: '1rem',
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
          fontSize: "1.4rem",
          borderRadius: '1rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    // Optional: Validate password complexity (e.g., at least one number, one letter)
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   toast.error("Password must contain at least one letter and one number.", {
    //     duration: 3000,
    //     style: {
    //       fontSize: "1.4rem",
    //       borderRadius: '1rem',
    //       background: '#333',
    //       color: '#fff',
    //     },
    //   });
    //   return;
    // }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '1rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    dispatch(adminResetPasswordAction(password, params?.token, navigate));
  };


  const adminResetPassword = useSelector(state => state.adminResetPassword)

  const {
    loading: adminResetPasswordLoading,
  } = adminResetPassword


  const [visibleeye, setVisibleeye] = useState(false)
  const [visibleeye2, setVisibleeye2] = useState(false)

  return (
    <div className={style.change_password_container}>
      <div className={style.change_password_container_left}><img src="/signin_un.png" alt="reset_image" /></div>

      <div className={style.change_password_container_right}>
        <div>
          <h1>Change Password</h1>
          <p>In order to protect your account, make sure your password</p>
          <p>Point 1</p>
          <p>Point 2</p>

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
            adminResetPasswordLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }} className={style.change_btn}><ButtonLoader /></button> : <button onClick={ChangePasswordHandler} className={style.change_btn}>Change Password</button>
          }

          <Link to="/adminsignin">Back</Link>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword