import React, { useEffect, useState } from 'react'
import style from './Signin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Eyevisible, Notvisibleeye, HomeIcon } from '../../../icons'
import { GoogleLogin } from '@react-oauth/google'
import { Toaster, toast } from 'react-hot-toast';
import { AdminGoogleloginAction, AdminSigninAction } from '../../../Redux/Admin/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseMessage = (response) => {
    // console.log(response)
    dispatch(AdminGoogleloginAction(response.credential, navigate))
  }

  const errorMessage = () => {
    console.log(error)
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

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const signinClicked = () => {

    if (!email) {
      toast.error("Please enter email", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-8)",
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
          fontSize: "var(--font-size-8)",
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
          fontSize: "var(--font-size-8)",
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
          fontSize: "var(--font-size-8)",
          borderRadius: "0.3rem",
          background: "#333",
          color: "#fff",
        },
      });
      return setPasswordError("Password length must be 8 charecters");
    }

    const adminsignindata = { email, password }
    dispatch(AdminSigninAction(adminsignindata, navigate))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      signinClicked();
    }
  };

  const forgotClicked = () => {
    navigate("/adminforgotpassword")
  }

  const AdminSignin = useSelector(state => state.AdminSignin)

  const {
    loading: AdminSigninLoading,
  } = AdminSignin

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  return (
    <main className={`${style.admin_signin_container} ${darkmodeOn && style.dark}`}>
      <div className={style.admin_signin_left}>
        <img src="./signin_un.png" alt="admin_Signin" />
      </div>

      <div className={`${style.admin_signin_right} ${darkmodeOn && style.dark}`}>
        <div>
          <p>Sign In to your Admin Account</p>
          <p>Welcome back Admin! please enter your details</p>

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
              style={{ border: passwordError ? "0.1rem solid red" : undefined }}>
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

          <div>
            <p onClick={forgotClicked}>Forgot Password ?</p>
          </div>

          {
            AdminSigninLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}
              className={style.signin_btn}
            ><ButtonLoader /></button> : <button onClick={signinClicked} className={style.signin_btn}>Signin</button>
          }

          <div>
            <div />
            <p>or</p>
            <div />
          </div>

          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            size="large"
            shape="circle"
            logo_alignment='left'
            text='continue_with'
          />

          <p>Don't you have an account ? <Link to="/adminsignup">Sign up</Link></p>

        </div>
        <button className={style.homeicon} onClick={() => navigate("/")}><HomeIcon /></button>
      </div>
    </main>
  )
}

export default Signin