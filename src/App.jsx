import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Public = React.lazy(() => import("./Public/Public"))
const AdminSignin = React.lazy(() => import("./Admin/AuthScreens/Signin/Signin"))
const AdminSignup = React.lazy(() => import("./Admin/AuthScreens/Signup/Signup"))
const BarberSignin = React.lazy(() => import("./Barber/AuthScreens/Signin/Signin"))
const BarberSignup = React.lazy(() => import("./Barber/AuthScreens/Signup/Signup"))
const AdminDashboard = React.lazy(() => import("./Admin/Dashboard/Dashboard"))
const AdminSalon = React.lazy(() => import("./Admin/Salon/Salon"))
const AdminSidebar = React.lazy(() => import("./components/Admin/Sidebar/Sidebar"))
const AdminBarber = React.lazy(() => import("./Admin/Barber/Barber"))
const AdminAdvertisement = React.lazy(() => import("./Admin/Advertisement/Advertisement"))
const AdminQueue = React.lazy(() => import("./Admin/Queue/Queue"))
const AdminAppointment = React.lazy(() => import("./Admin/Appointment/Appointment"))
const AdminReport = React.lazy(() => import("./Admin/Report/Report"))
const AdminForgotPassword = React.lazy(() => import("./Admin/AuthScreens/ForgotPassword/ForgotPassword"))
const AdminCheckEmail = React.lazy(() => import("./Admin/AuthScreens/CheckEmail/CheckEmail"))
const AdminChangePassword = React.lazy(() => import("./Admin/AuthScreens/ChangePassword/ChangePassword"))
const AdminPasswordReset = React.lazy(() => import("./Admin/AuthScreens/PasswordReset/PasswordReset"))
const BarberForgotPassword = React.lazy(() => import("./Barber/AuthScreens/ForgotPassword/ForgotPassword"))
const BarberCheckEmail = React.lazy(() => import("./Barber/AuthScreens/CheckEmail/CheckEmail"))
const BarberChangePassword = React.lazy(() => import("./Barber/AuthScreens/ChangePassword/ChangePassword"))
const BarberPasswordReset = React.lazy(() => import("./Barber/AuthScreens/PasswordReset/PasswordReset"))

const App = () => {

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Public />} />

          {/* Admin Auth Screens */}
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminforgotpassword" element={<AdminForgotPassword/>}/>
          <Route path="/admincheckemail" element={<AdminCheckEmail/>}/>
          <Route path="/adminchangepassword" element={<AdminChangePassword/>}/>
          <Route path="/adminpasswordreset" element={<AdminPasswordReset/>}/>

          {/* Admin Main Pages  */}
          <Route element={<AdminSidebar />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-salon" element={<AdminSalon />} />
            <Route path="/admin-barber" element={<AdminBarber />} />
            <Route path="/admin-advertisemt" element={<AdminAdvertisement />} />
            <Route path="/admin-queue" element={<AdminQueue />} />
            <Route path="/admin-appointment" element={<AdminAppointment />} />
            <Route path="/admin-report" element={<AdminReport />} />
          </Route>

          {/* Barber Auth Screens */}
          <Route path="/barbersignin" element={<BarberSignin />} />
          <Route path="/barbersignup" element={<BarberSignup />} />
          <Route path="/barberforgotpassword" element={<BarberForgotPassword/>}/>
          <Route path="/barbercheckemail" element={<BarberCheckEmail/>}/>
          <Route path="/barberchangepassword" element={<BarberChangePassword/>}/>
          <Route path="/barberpasswordreset" element={<BarberPasswordReset/>}/>

        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App