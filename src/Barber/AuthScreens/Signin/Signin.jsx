import React, { useEffect, useState } from 'react'
import style from './Signin.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eyevisible, HomeIcon, Notvisibleeye } from '../../../icons'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { BarberGoogleloginAction, BarberSigninAction } from "../../../Redux/Barber/Actions/AuthAction"
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const Signin = () => {

  const location = useLocation("")
  const queryParams = new URLSearchParams(location.search);
  const urlemail = queryParams.get('email');

  console.log(urlemail)

  useEffect(() => {
    if (urlemail) {
      setEmail(urlemail)
    }
  }, [])

  const [email, setEmail] = useState("")
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
    <main className={style.barber_signin_container}>
      <div className={style.barber_signin_left}>
          <img src="./signin_un.png" alt="barber_signin" />
      </div>

      <div className={style.barber_signin_right}>
        <div>
          <p>Sign In to your Barber Account</p>
          <p>Welcome back Barber! please enter your details</p>

          <input
            type="email"
            placeholder='Enter Your Email ID'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={style.password_container}>
            <input
              type={visibleeye ? "text" : "password"}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={() => setVisibleeye((prev) => !prev)}>{visibleeye ? <Eyevisible /> : <Notvisibleeye />}</div>
          </div>

          <div>
            <p onClick={forgotClicked}>Forgot Password ?</p>
          </div>

          {
            BarberSigninLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }} className={style.signin_btn}><ButtonLoader /></button> : <button onClick={signinClicked} className={style.signin_btn}>Signin</button>
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
            // width={screenwidth > 0 && screenwidth <= 576 ? "340" : screenwidth >= 576 && screenwidth <= 992 ? "375" : "420"}
            logo_alignment='left'
            text='continue_with'
          />

          <p>Don't you have an account ? <Link to="/barbersignup">Sign up</Link></p>
        </div>
        <div className={style.homeicon} onClick={() => navigate("/")}><HomeIcon /></div>
      </div>
    </main>
  )
}

export default Signin