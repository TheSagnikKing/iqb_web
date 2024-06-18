import React, { useEffect, useRef, useState } from 'react'
import './SignupEditProfile.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminSignupEditAction } from '../../../Redux/Admin/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import { PhoneInput } from 'react-international-phone'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { BarberSignupEditAction } from '../../../Redux/Barber/Actions/AuthAction'

const SignupEditProfile = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  
  const barberdata = location?.state?.newUser

  console.log(barberdata)

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
    const profiledata = { email: barberdata?.email, mobileNumber, name, gender, dateOfBirth, salonId: barberdata?.salonId, AuthType: barberdata?.AuthType };

    console.log(profiledata)
    dispatch(BarberSignupEditAction(profiledata, navigate))
  }

  const skipClicked = () => {
    const profiledata = { email: barberdata?.email, mobileNumber: "", name: "", gender: "", dateOfBirth: "", salonId: barberdata?.salonId };

    dispatch(BarberSignupEditAction(profiledata, navigate))
  }

  const BarberSignupEdit = useSelector(state => state.BarberSignupEdit)

  const {
    loading: BarberSignupEditLoading,
  } = BarberSignupEdit

  return (
    <main className='admin_signup_edit_container'>
      <div>
        <div>
          <img src="./signup.png" alt="admin_signup" />
        </div>
      </div>

      <div>
        <div>
          <div>
            <h1>Add Your Account Details</h1>
            <button onClick={() => skipClicked()}>Skip</button>
          </div>

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
            <div>
              <div>
                <PhoneInput
                  forceDialCode={true}
                  defaultCountry="gb"
                  value={mobileNumber}
                  onChange={(phone) => setMobileNumber(phone)}
                />
              </div>

            </div>
          </div>

          <div>
            {
              BarberSignupEditLoading ? <button style={{
                display: "grid",
                placeItems: "center"
              }}><ButtonLoader /></button> : <button onClick={() => updateClicked()}>Update</button>
            }

          </div>

        </div>
      </div>
    </main>
  )
}

export default SignupEditProfile