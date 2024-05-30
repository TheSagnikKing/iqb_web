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

const App = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to handle media query change
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 1140px)").matches);
    };

    // Initial check
    handleResize();

    // Add event listener to check for changes in media query
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
      <Toaster />
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
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
                <Route path="/admin-editprofile" element={<AdminEditProfile />} />
                <Route path="/admin-salonlist" element={<AdminSalonList />} />
                <Route path="/admin-createsalon" element={<AdminCreateSalon />} />
                <Route path="/admin-editsalon/:salonid" element={<AdminEditSalon />} />
                <Route path="/admin-salonappointment/:salonid" element={<AdminSalonAppointmentSettings/>}/>
                <Route path="/admin-barberlist" element={<AdminBarberList />} />
                <Route path="/admin-createbarber" element={<AdminCreateBarber />} />
                <Route path="/admin-editbarber/:salonid" element={<AdminEditBarber />} />
                <Route path="/admin-customerlist" element={<AdminCustomerList />} />
                <Route path="/admin-salonadvertise" element={<AdminAdvertisement />} />
                <Route path="/admin-queuelist" element={<AdminQueue />} />
                <Route path="/admin-appointment" element={<AdminAppointment />} />
                <Route path="/admin-report" element={<AdminReport />} />
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
