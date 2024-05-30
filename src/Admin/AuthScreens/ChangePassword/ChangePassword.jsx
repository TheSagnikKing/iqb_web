import React, { useState } from 'react'
import "./ChangePassword.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminResetPasswordAction } from '../../../Redux/Admin/Actions/AdminPasswordAction'

const ChangePassword = () => {

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const ChangePasswordHandler = () => {
    if(password == confirmPassword){
      dispatch(adminResetPasswordAction(password,params?.token,navigate))
    }else{
      alert("Password donot match")
    }
  }

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

                <button onClick={ChangePasswordHandler}>Change Password</button>

                <Link to="/adminsignin">Back</Link>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword