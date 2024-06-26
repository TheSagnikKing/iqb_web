import React, { useEffect, useState } from 'react'
import './Signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { Eyevisible, Notvisibleeye, HomeIcon } from '../../../icons'
import { GoogleLogin } from '@react-oauth/google'
import { Toaster, toast } from 'react-hot-toast';
import { AdminGoogleloginAction, AdminSigninAction } from '../../../Redux/Admin/Actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseMessage = (response) => {
    console.log(response)
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

  const signinClicked = () => {
    const adminsignindata = { email, password }
    dispatch(AdminSigninAction(adminsignindata, navigate))
  }

  const forgotClicked = () => {
    navigate("/adminforgotpassword")
  }

  const AdminSignin = useSelector(state => state.AdminSignin)

  const {
    loading: AdminSigninLoading,
  } = AdminSignin

  return (
    <main className='admin_signin_container'>
      <div>
        <div>
          <img src="./signin.png" alt="admin_Signin" />
        </div>
      </div>

      <div>
        <div>
          <h1>Sign In to your Admin Account</h1>
          <p>Welcome back Admin! please enter your details</p>

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
            <div onClick={() => setVisibleeye((prev) => !prev)}>{visibleeye ? <Eyevisible /> : <Notvisibleeye />}</div>
          </div>

          <div>
            <p onClick={forgotClicked}>Forgot Password ?</p>
          </div>

          {
            AdminSigninLoading ? <button style={{
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

          <p>Don't you have an account ? <Link to="/adminsignup">Sign up</Link></p>
        </div>
        <div className='homeicon' onClick={() => navigate("/")}><HomeIcon/></div>
      </div>
    </main>
  )
}

export default Signin