import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { RiWifiOffLine } from "react-icons/ri";
import "./App.css"

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
const AdminBarberSendEmail = React.lazy(() => import("./Admin/Barber/SendEmail/SendEmail"))
const AdminBarberSendMessage = React.lazy(() => import("./Admin/Barber/SendMessage/SendMessage"))
const AdminMobileSidebar = React.lazy(() => import("./components/Admin/MobileSidebar/MobileSidebar"))

const AdminSendCustomerEmail = React.lazy(() => import("./Admin/Customer/SendEmail/SendEmail"))
const AdminSendCustomerMessage = React.lazy(() => import("./Admin/Customer/SendMessage/SendMessage"))

const BarberSidebar = React.lazy(() => import("./components/Barber/Sidebar/Sidebar"))
const BarberMobileSidebar = React.lazy(() => import("./components/Barber/MobileSidebar/MobileSidebar"))
const BarberEditProfile = React.lazy(() => import("./Barber/EditProfile/EditProfile"))
const BarberSignupEditProfile = React.lazy(() => import("./Barber/AuthScreens/SignupEditProfile/SignupEditProfile"))
const BarberCustomer = React.lazy(() => import("./Barber/Customers/Customers"))
const BarberQueueList = React.lazy(() => import("./Barber/Queue/Queue"))
const BarberSendCustomerEmail = React.lazy(() => import("./Barber/Customers/SendEmail/SendEmail"))
const BarberSendCustomerMessage = React.lazy(() => import("./Barber/Customers/SendMessage/SendMessage"))

import ProtectedAdminRoute from "./Admin/ProtectedRoutes/ProtectedRoute"
import ProtectedAdminAuthRoute from "./Admin/ProtectedRoutes/ProtectedAuthRoute"
import ProtectedBarberRoute from "./Barber/ProtectedRoutes/ProtectedRoute"
import ProtectedBarberAuthRoute from "./Barber/ProtectedRoutes/ProtectedAuthRoute"
import Loader from './components/Loader/Loader';
import Drop from './Admin/Demo/Drop';
import Demo from './Admin/Demo/Demo';
import Table from './Admin/Demo/Table';
import { useSelector } from 'react-redux';
import { darkmodeSelector } from './Redux/Admin/Reducers/AdminHeaderReducer';

import { } from '../public/offline.png'

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

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"



  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    // <div style={{
    //   background: darkmodeOn ? "var(--dark-mode-bg-color-1)" : "var(--primary-bg-light-color1)"
    // }}>
    <>

      {!isOnline ? (
        <div style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ height: "200px", marginTop: "20px" }}>
            <div style={{ fontSize: "45px", textAlign: "center" }}><RiWifiOffLine /></div>
            <h1 style={{ color: "red", textAlign: "center" }}>You are offline</h1>
            <h1 style={{ color: "red", textAlign: "center" }}>Please check your internet connection</h1>
          </div>
        </div >
      ) : (
        <>
          <Toaster />
          <BrowserRouter>
            <React.Suspense fallback={<div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: darkmodeOn ? "var(--dark-mode-bg-color-2)" : "#fff"
              }}><Loader /></div>}>
              <Routes>

                {/* Admin Auth Screens */}
                <Route element={<ProtectedAdminAuthRoute />}>
                  <Route path="/" element={<Public />} />
                  <Route path="/adminsignin" element={<AdminSignin />} />
                  <Route path="/adminsignup" element={<AdminSignup />} />
                  <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
                  <Route path="/admincheckemail" element={<AdminCheckEmail />} />
                  <Route path="/adminchangepassword/:token" element={<AdminChangePassword />} />
                  <Route path="/adminpasswordreset" element={<AdminPasswordReset />} />
                  <Route path="/admin-signupeditprofile" element={<AdminSignupEditProfile />} />
                </Route>

                {/* Admin Main Pages  */}
                <Route element={<ProtectedAdminRoute />}>
                  <Route element={isMobile ? <AdminMobileSidebar /> : <AdminSidebar />}>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/admin-dashboard/editprofile" element={<AdminEditProfile />} />

                    <Route path="/admin-salon" element={<AdminSalonList />} />
                    <Route path="/admin-salon/createsalon" element={<AdminCreateSalon />} />
                    <Route path="/admin-salon/editsalon/:salonid" element={<AdminEditSalon />} />
                    <Route path="/admin-salon/appointment/:salonid" element={<AdminSalonAppointmentSettings />} />

                    <Route path="/admin-barber" element={<AdminBarberList />} />
                    <Route path="/admin-barber/createbarber" element={<AdminCreateBarber />} />
                    <Route path="/admin-barber/editbarber/:salonid" element={<AdminEditBarber />} />
                    <Route path="/admin-barber/send-email" element={<AdminBarberSendEmail />} />
                    <Route path="/admin-barber/send-message" element={<AdminBarberSendMessage />} />
                    <Route path="/admin-customer" element={<AdminCustomerList />} />
                    <Route path="/admin-customer/send-email" element={<AdminSendCustomerEmail />} />
                    <Route path="/admin-customer/send-message" element={<AdminSendCustomerMessage />} />
                    <Route path="/admin-advertise" element={<AdminSalonAdv />} />
                    <Route path="/admin-queue" element={<AdminQueue />} />
                    <Route path="/drop" element={<Drop />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path='/table' element={<Table />} />
                  </Route>

                </Route>

                {/* Barber Auth Screens */}
                <Route element={<ProtectedBarberAuthRoute />}>
                  <Route path="/" element={<Public />} />
                  <Route path="/barbersignin" element={<BarberSignin />} />
                  <Route path="/barbersignup" element={<BarberSignup />} />
                  <Route path="/barberforgotpassword" element={<BarberForgotPassword />} />
                  <Route path="/barbercheckemail" element={<BarberCheckEmail />} />
                  <Route path="/barberchangepassword/:token" element={<BarberChangePassword />} />
                  <Route path="/barberpasswordreset" element={<BarberPasswordReset />} />
                  <Route path="/barber-signupeditprofile" element={<BarberSignupEditProfile />} />
                </Route>

                <Route element={<ProtectedBarberRoute />}>
                  <Route element={isMobile ? <BarberMobileSidebar /> : <BarberSidebar />}>
                    <Route path="/barber-dashboard" element={<BarberDashboard />} />
                    <Route path="/barber-dashboard/editprofile" element={<BarberEditProfile />} />
                    <Route path="/barber-customer" element={<BarberCustomer />} />
                    <Route path="/barber-customer/send-email" element={<BarberSendCustomerEmail />} />
                    <Route path="/barber-customer/send-message" element={<BarberSendCustomerMessage />} />
                    <Route path="/barber-queue" element={<BarberQueueList />} />
                  </Route>
                </Route>


              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </>
      )}

    </>
    // </div>
  )
}


// signup kore -> your requested is pending. -> frontend e connectSalon page arghya link kore email send korbe->
// open kore o connect korbe -> connect hoegele oke dashboarde send korbo

export default App
