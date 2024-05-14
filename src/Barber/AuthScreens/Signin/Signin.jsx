import React, { useEffect, useState } from 'react'
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { Eyevisible,Notvisibleeye } from '../../../icons'
import { GoogleLogin } from '@react-oauth/google'

const Signin = () => {

  const responseMessage = () => {

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

  const navigate = useNavigate()

  const forgotClicked = () => {
    navigate("/barberforgotpassword")
  }

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
          />

          <div>
            <input
              type={visibleeye ? "text" : "password"}
              placeholder='Password'
            />
            <div onClick={() => setVisibleeye((prev) => !prev)}>{visibleeye ? <Eyevisible /> : <Notvisibleeye/>}</div>
          </div>

          <div>
            <p onClick={forgotClicked}>Forgot Password ?</p>
          </div>

          <button>Signin</button>

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
      </div>
    </main>
  )
}

export default Signin