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

const App = () => {

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Public />} />

          {/* Admin Auth Screens */}
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignup" element={<AdminSignup />} />

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

        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App