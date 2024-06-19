import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import { Eyevisible,Notvisibleeye } from '../../../icons'
import { GoogleLogin } from '@react-oauth/google'
import { BarberGoogleSignupAction, BarberSignupAction } from '../../../Redux/Barber/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseMessage = (response) => {
    dispatch(BarberGoogleSignupAction(response.credential, navigate))
  }

  const errorMessage = () => {

  }

  const [screenwidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const [visibleeye, setVisibleeye] = useState(false)

  // BarberSignupAction

  const signupClicked = () => {
    const barbersignupdata = { email, password }
    console.log(barbersignupdata)
    dispatch(BarberSignupAction(barbersignupdata, navigate))
  }

  const BarberSignup = useSelector(state => state.BarberSignup)

  const {
    loading: BarberSignupLoading,
  } = BarberSignup

  return (
    <main className='barber_signup_container'>
      <div>
        <div>
          <img src="./signup.png" alt="barber_signup" />
        </div>
      </div>

      <div>
        <div>
          <h1>Sign Up to your Barber Account</h1>
          <p>Welcome back Barber! please enter your details</p>

          <input
            type="email"
            placeholder='Enter Your Email ID'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <input
              type={visibleeye ? "text" : "password"}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={() => setVisibleeye((prev) => !prev)}>{visibleeye ? <Eyevisible /> : <Notvisibleeye/>}</div>
          </div>

          {
            BarberSignupLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}><ButtonLoader /></button> : <button onClick={signupClicked}>Signup</button>
          }

          <div>
            <div />
            <p>or</p>
            <div />
          </div>

          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            size='large'
            shape='circle'
            width={screenwidth > 0 && screenwidth <= 576 ? "340" : screenwidth >= 576 && screenwidth <= 992 ? "375" : "420"}
            logo_alignment='left'
            text='continue_with'
          />

          <p>Already a member ? <Link to="/barbersignin">Log In</Link></p>
        </div>
      </div>
    </main>
  )
}

export default Signup