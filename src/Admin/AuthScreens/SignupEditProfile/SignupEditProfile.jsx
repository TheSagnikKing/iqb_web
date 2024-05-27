import React, { useEffect, useState } from 'react'
import './SignupEditProfile.css'
import { useNavigate } from 'react-router-dom'
import { Eyevisible, Notvisibleeye } from '../../../icons'

const SignupEditProfile = () => {

  const [name, setName] = useState("")
  const [dateOfBirth, setDateofBirth] = useState("")
  const [gender, setGender] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  const navigate = useNavigate()

  const signupClicked = () => {
    navigate("/admin-signupeditprofile")
  }

  return (
    <main className='admin_signup_edit_container'>
      <div>
        <div>
          <img src="./signup.png" alt="admin_signup" />
        </div>
      </div>

      <div>
        <div>
          <h1>Add Your Account Details</h1>

          <div>
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <p>Gender</p>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          <div>
            <p>Date of Birth</p>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateofBirth(e.target.value)}
            />
          </div>

          <div>
            <p>Mobile Number</p>
            <input
              type="date"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div>
            <button onClick={signupClicked}>Update</button>
            <button onClick={signupClicked}>Skip</button>
          </div>
          
        </div>
      </div>
    </main>
  )
}

export default SignupEditProfile