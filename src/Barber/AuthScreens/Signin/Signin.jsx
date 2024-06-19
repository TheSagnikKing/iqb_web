import React, { useEffect, useState } from 'react'
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { Eyevisible,HomeIcon,Notvisibleeye } from '../../../icons'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import {BarberGoogleloginAction, BarberSigninAction} from "../../../Redux/Barber/Actions/AuthAction"
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const Signin = () => {

  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseMessage = (response) => {
    dispatch(BarberGoogleloginAction(response.credential, navigate))
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

  const forgotClicked = () => {
    navigate("/barberforgotpassword")
  }

  const signinClicked = () => {
    const barbersignindata = { email, password }
    console.log(barbersignindata)
    dispatch(BarberSigninAction(barbersignindata, navigate))
  }

  const BarberSignin = useSelector(state => state.BarberSignin)

  const {
    loading: BarberSigninLoading,
  } = BarberSignin

  return (
    <main className='barber_signin_container'>
      <div>
        <div>
          <img src="./signin.png" alt="barber_signin" />
        </div>
      </div>

      <div>
        <div>
          <h1>Sign In to your Barber Account</h1>
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

          <div>
            <p onClick={forgotClicked}>Forgot Password ?</p>
          </div>

          {
            BarberSigninLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}><ButtonLoader /></button> : <button onClick={signinClicked}>Signin</button>
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

          <p>Don't you have an account ? <Link to="/barbersignup">Sign up</Link></p>
        </div>
        <div className='homeicon' onClick={() => navigate("/")}><HomeIcon/></div>
      </div>
    </main>
  )
}

export default Signin