import React from 'react'
import "./ChangePassword.css"
import { Link, useNavigate } from 'react-router-dom'

const ChangePassword = () => {

  const navigate = useNavigate()

  const ChangePasswordHandler = () => {
    navigate("/adminpasswordreset")
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
                    />
                </div>

                <div>
                    <label htmlFor="">Confirm Password</label>
                    <input 
                    type="password" 
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