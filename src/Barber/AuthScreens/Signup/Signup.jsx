import React, { useEffect, useState } from 'react'
import style from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Eyevisible, HomeIcon, Notvisibleeye } from '../../../icons'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { BarberGoogleSignupAction, BarberSignupAction } from '../../../Redux/Barber/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import toast from 'react-hot-toast'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import axios from 'axios'

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [visibleeye, setVisibleeye] = useState(false)

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const signupClicked = () => {

    if (!email) {
      toast.error("Please enter email", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setEmailError("Please enter email")
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: "0.3rem",
          background: "#333",
          color: "#fff",
        },
      });
      return setEmailError("Invalid email format");
    }

    if (!password) {
      toast.error("Please enter password", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: "0.3rem",
          background: "#333",
          color: "#fff",
        },
      });
      return setPasswordError("Please enter password");
    }

    if (password.length < 8) {
      toast.error("Password length must be 8 charecters", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: "0.3rem",
          background: "#333",
          color: "#fff",
        },
      });
      return setPasswordError("Password length must be 8 charecters");
    }

    const barbersignupdata = { email, password }
    dispatch(BarberSignupAction(barbersignupdata, navigate))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      signupClicked();
    }
  };

  const BarberSignup = useSelector(state => state.BarberSignup)

  const {
    loading: BarberSignupLoading,
  } = BarberSignup

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const signup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        dispatch(BarberGoogleSignupAction(userInfo.data.email, navigate))

      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
  });

  return (
    <main className={`${style.barber_signup_container} ${darkmodeOn && style.dark}`}>
      <div className={style.barber_signup_left}>
        <img src="./signup_un.png" alt="barber_signup" />
      </div>

      <div className={`${style.barber_signup_right} ${darkmodeOn && style.dark}`}>
        <div>
          <p>Sign Up to your Barber Account</p>
          <p>Welcome back Barber! please enter your details</p>

          <div>
            <input
              type="email"
              placeholder='Enter Your Email ID'
              value={email}
              onChange={(e) => {
                setEmailError("")
                setEmail(e.target.value)
              }}
              onKeyDown={handleKeyPress}
              style={{ border: emailError ? "0.1rem solid red" : undefined }}
            />
            <p className={style.error_message}>{emailError}</p>
          </div>

          <div>
            <div
              className={`${style.password_container} ${darkmodeOn && style.dark}`}
              style={{ border: passwordError ? "0.1rem solid red" : undefined }}
            >
              <input
                type={visibleeye ? "text" : "password"}
                placeholder='Password'
                value={password}
                onChange={(e) => {
                  setPasswordError("")
                  setPassword(e.target.value)
                }}
                onKeyDown={handleKeyPress}
              />
              <div onClick={() => setVisibleeye((prev) => !prev)}>{visibleeye ? <Eyevisible /> : <Notvisibleeye />}</div>
            </div>
            <p className={style.error_message}>{passwordError}</p>
          </div>

          {
            BarberSignupLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }} className={style.signup_btn}><ButtonLoader /></button> : <button className={style.signup_btn} onClick={signupClicked}>Signup</button>
          }

          <p></p>

          <div>
            <div />
            <p>or</p>
            <div />
          </div>

          <button onClick={() => signup()} className={`${style.google_btn} ${darkmodeOn && style.dark}`}>
            <div>
              <div><img src="/google_logo.png" alt="logo" /></div>
              <p>Sign up with Google &nbsp; &nbsp; 🚀</p>
            </div>
          </button>

          <p>Already a member ? <Link to="/barbersignin">Log In</Link></p>
        </div>
        <div className={style.homeicon} onClick={() => navigate("/")}><HomeIcon /></div>
      </div>
    </main>
  )
}

export default Signup