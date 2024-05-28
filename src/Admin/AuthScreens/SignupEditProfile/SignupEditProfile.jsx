import React, { useEffect, useRef, useState } from 'react'
import './SignupEditProfile.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminSignupEditAction } from '../../../Redux/Admin/Actions/AuthAction'
import { useDispatch } from 'react-redux'

const SignupEditProfile = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const admindata = location?.state?.newUser

  console.log(admindata)

  const [name, setName] = useState("")
  const [dateOfBirth, setDateofBirth] = useState("")
  const [gender, setGender] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  const navigate = useNavigate()


  const [genderDrop, setGenderDrop] = useState(false)

  const genderDropHandler = () => {
    setGenderDrop((prev) => !prev)
  }

  const setGenderHandler = (value) => {
    setGender(value)
    setGenderDrop(false)
  }

  const genderinputRef = useRef()
  const genderDropRef = useRef()

  useEffect(() => {
    const handleClickGenderOutside = (event) => {
      if (
        genderinputRef.current &&
        genderDropRef.current &&
        !genderinputRef.current.contains(event.target) &&
        !genderDropRef.current.contains(event.target)
      ) {
        setGenderDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickGenderOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickGenderOutside);
    };
  }, []);


  const updateClicked = () => {
    const profiledata = { email: admindata?.email, mobileNumber, name, gender, dateOfBirth, salonId: admindata?.salonId, AuthType: admindata?.AuthType };

    console.log(profiledata)
    dispatch(AdminSignupEditAction(profiledata, navigate))
  }

  const skipClicked = () => {
    const profiledata = { email: admindata?.email, mobileNumber: "", name: "", gender: "", dateOfBirth: "", salonId: admindata?.salonId };

    dispatch(AdminSignupEditAction(profiledata, navigate))
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
              value={`${gender ? `${gender}` : ''}`}
              onChange={(e) => setGender(e.target.value)}
              onClick={() => genderDropHandler()}
              ref={genderinputRef}
            />

            {genderDrop && <div ref={genderDropRef}>
              <p onClick={() => setGenderHandler("Male")}>Male</p>
              <p onClick={() => setGenderHandler("Female")}>Female</p>
              <p onClick={() => setGenderHandler("Other")}>Other</p>
            </div>}
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
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div>
            <button onClick={() => updateClicked()}>Update</button>
            <button onClick={() => skipClicked()}>Skip</button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default SignupEditProfile