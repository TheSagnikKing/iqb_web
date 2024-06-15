import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const Public = React.lazy(() => import("./Public/Public"))
const AdminSignin = React.lazy(() => import("./Admin/AuthScreens/Signin/Signin"))
const AdminSignup = React.lazy(() => import("./Admin/AuthScreens/Signup/Signup"))
const BarberSignin = React.lazy(() => import("./Barber/AuthScreens/Signin/Signin"))
const BarberSignup = React.lazy(() => import("./Barber/AuthScreens/Signup/Signup"))
const AdminDashboard = React.lazy(() => import("./Admin/Dashboard/Dashboard"))
const AdminSalonList = React.lazy(() => import("./Admin/Salon/SalonList/SalonList"))
const AdminSidebar = React.lazy(() => import("./components/Admin/Sidebar/Sidebar"))
const AdminBarberList = React.lazy(() => import("./Admin/Barber/BarberList/BarberList"))
const AdminSalonAdv = React.lazy(() => import("./Admin/SalonAdv/SalonAdv"))
const AdminQueue = React.lazy(() => import("./Admin/Queue/Queue"))
const AdminForgotPassword = React.lazy(() => import("./Admin/AuthScreens/ForgotPassword/ForgotPassword"))
const AdminCheckEmail = React.lazy(() => import("./Admin/AuthScreens/CheckEmail/CheckEmail"))
const AdminChangePassword = React.lazy(() => import("./Admin/AuthScreens/ChangePassword/ChangePassword"))
const AdminPasswordReset = React.lazy(() => import("./Admin/AuthScreens/PasswordReset/PasswordReset"))
const BarberForgotPassword = React.lazy(() => import("./Barber/AuthScreens/ForgotPassword/ForgotPassword"))
const BarberCheckEmail = React.lazy(() => import("./Barber/AuthScreens/CheckEmail/CheckEmail"))
const BarberChangePassword = React.lazy(() => import("./Barber/AuthScreens/ChangePassword/ChangePassword"))
const BarberPasswordReset = React.lazy(() => import("./Barber/AuthScreens/PasswordReset/PasswordReset"))
const AdminCreateSalon = React.lazy(() => import("./Admin/Salon/CreateSalon/CreateSalon"))
const AdminCustomerList = React.lazy(() => import("./Admin/Customer/CustomerList"))
const AdminCreateBarber = React.lazy(() => import("./Admin/Barber/CreateBarber/CreateBarber"))
const AdminEditSalon = React.lazy(() => import("./Admin/Salon/EditSalon/EditSalon"))
const AdminEditBarber = React.lazy(() => import("./Admin/Barber/EditBarber/EditBarber"))
const AdminEditProfile = React.lazy(() => import("./Admin/EditProfile/EditProfile"))
const BarberDashboard = React.lazy(() => import("./Barber/Dashboard/Dashboard"))
const AdminSignupEditProfile = React.lazy(() => import("./Admin/AuthScreens/SignupEditProfile/SignupEditProfile"))
const AdminSalonAppointmentSettings = React.lazy(() => import("./Admin/Salon/SalonAppointmentSettings/SalonAppointmentSettings"))

const AdminMobileSidebar = React.lazy(() => import("./components/Admin/MobileSidebar/MobileSidebar"))

import ProtectedAdminRoute from "./Admin/ProtectedRoutes/ProtectedRoute"
import ProtectedAdminAuthRoute from "./Admin/ProtectedRoutes/ProtectedAuthRoute"
import ProtectedBarberRoute from "./Barber/ProtectedRoutes/ProtectedRoute"
import ProtectedBarberAuthRoute from "./Barber/ProtectedRoutes/ProtectedAuthRoute"
import Loader from './components/Loader/Loader';

const App = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1140px)").matches);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <Toaster />
      <BrowserRouter>
        <React.Suspense fallback={<div style={{width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Loader/></div>}>
          <Routes>
            <Route path="/" element={<Public />} />

            {/* Admin Auth Screens */}
            <Route element={<ProtectedAdminAuthRoute />}>
              <Route path="/adminsignin" element={<AdminSignin />} />
              <Route path="/adminsignup" element={<AdminSignup />} />
              <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
              <Route path="/admincheckemail" element={<AdminCheckEmail />} />
              <Route path="/adminchangepassword/:token" element={<AdminChangePassword />} />
              <Route path="/adminpasswordreset" element={<AdminPasswordReset />} />
              <Route path="/admin-signupeditprofile" element={<AdminSignupEditProfile/>}/>
            </Route>

            {/* Admin Main Pages  */}
            <Route element={<ProtectedAdminRoute />}>
              <Route element={isMobile ? <AdminMobileSidebar/> : <AdminSidebar />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin-dashboard/editprofile" element={<AdminEditProfile />} />

                <Route path="/admin-salon" element={<AdminSalonList />} />
                <Route path="/admin-salon/createsalon" element={<AdminCreateSalon />} />
                <Route path="/admin-salon/editsalon/:salonid" element={<AdminEditSalon />} />
                <Route path="/admin-salon/appointment/:salonid" element={<AdminSalonAppointmentSettings/>}/>

                <Route path="/admin-barber" element={<AdminBarberList />} />
                <Route path="/admin-barber/createbarber" element={<AdminCreateBarber />} />
                <Route path="/admin-barber/editbarber/:salonid" element={<AdminEditBarber />} />
                <Route path="/admin-customer" element={<AdminCustomerList />} />
                <Route path="/admin-advertise" element={<AdminSalonAdv />} />
                <Route path="/admin-queue" element={<AdminQueue />} />
              </Route>

            </Route>

            {/* Barber Auth Screens */}
            <Route element={<ProtectedBarberAuthRoute />}>
              <Route path="/barbersignin" element={<BarberSignin />} />
              <Route path="/barbersignup" element={<BarberSignup />} />
              <Route path="/barberforgotpassword" element={<BarberForgotPassword />} />
              <Route path="/barbercheckemail" element={<BarberCheckEmail />} />
              <Route path="/barberchangepassword" element={<BarberChangePassword />} />
              <Route path="/barberpasswordreset" element={<BarberPasswordReset />} />
            </Route>

            <Route element={<ProtectedBarberRoute />}>
              <Route path="/barber-dashboard" element={<BarberDashboard />} />
            </Route>


          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
