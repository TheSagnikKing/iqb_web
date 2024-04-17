import React from 'react'
import './Signin.css'
import { Link } from 'react-router-dom'
import { Eyevisible } from '../../../icons'

const Signin = () => {
  return (
    <main className='admin_signin_container'>
      <div>
        <div>
          <img src="./adminsignin.png" alt="" />
        </div>
      </div>

      <div>
        <div>
          <h1>Sign In to your Admin Account</h1>
          <p>Welcome back Admin! please enter your details</p>

          <input
            type="email"
            placeholder='Enter Your Email ID'
          />

          <div>
            <input
              type="text"
              placeholder='Password'
            />
            <div><Eyevisible /></div>
          </div>

          <div>
            <p>Forgot Password ?</p>
          </div>

          <button>Signin</button>

          <div>
            <div />
            <p>or</p>
            <div />
          </div>

          <button>Google Signin</button>

          <p>Don't you have an account ? <Link to="#">Sign up</Link></p>
        </div>
      </div>
    </main>
  )
}

export default Signin