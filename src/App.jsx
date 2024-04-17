import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Public = React.lazy(() => import("./Public/Public"))
const AdminSignin = React.lazy(() => import("./Admin/AuthScreens/Signin/Signin"))
const AdminSignup = React.lazy(() => import("./Admin/AuthScreens/Signup/Signup"))

const App = () => {
  
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Public />} />

          {/* Admin Auth Screens */}
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignup" element={<AdminSignup/>}/>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App