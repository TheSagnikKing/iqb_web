import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AdminLoggedInMiddlewareReducer, AdminGoogleLoginReducer, AdminLogoutReducer, AdminGoogleSignupReducer, AdminSignupReducer, AdminSignupEditReducer, AdminSigninReducer } from "./Admin/Reducers/AuthReducer"
import { BarberGoogleLoginReducer, BarberLoggedInMiddlewareReducer } from "./Barber/Reducers/AuthReducer"
import { adminSalonStatusReducer, getAllAdvertisementReducer, getAllQueueListReducer,getDashboardAppointmentListReducer } from "./Admin/Reducers/DashboardReducer"
import { adminCreateSalonReducer, adminDeleteSalonReducer, adminEditSalonReducer, adminUpdateSalonSettingsReducer, getAdminAllCitiesReducer, getAdminAllCountriesReducer, getAdminAllSalonIconReducer, getAdminAllTimezoneReducer, getAdminSalonListReducer } from "./Admin/Reducers/SalonReducer";
import { getAdminBarberListReducer,changeAdminBarberOnlineStatusReducer, adminApproveBarberReducer,adminAllSalonServicesReducer,adminCreateBarberReducer, adminUpdateBarberReducer, adminDeleteBarberReducer } from "./Admin/Reducers/BarberReducer"
import { adminUpdateProfileReducer, adminSendVerifyEmailReducer, adminVerifiedEmailStatusReducer, adminUploadProfilePicReducer } from "./Admin/Reducers/AdminProfileReducer"
import { adminGetAllCustomerListReducer } from "./Admin/Reducers/CustomerReducer";
import { adminServeQueueReducer } from "./Admin/Reducers/QueueReducer";
import { adminGetDefaultSalonReducer,adminApplySalonReducer, colorReducer, adminSetSalonReducer } from "./Admin/Reducers/AdminHeaderReducer"
import { adminForgetPasswordReducer, adminResetPasswordReducer } from "./Admin/Reducers/AdminPasswordReducer";

const rootReducer = combineReducers({

  //Admin Reducers
  AdminLoggedInMiddleware: AdminLoggedInMiddlewareReducer,
  AdminGoogleLogin: AdminGoogleLoginReducer,
  AdminLogout: AdminLogoutReducer,
  getAllAdvertisement:getAllAdvertisementReducer,
  getAllQueueList:getAllQueueListReducer,
  getDashboardAppointmentList:getDashboardAppointmentListReducer,
  getAdminSalonList:getAdminSalonListReducer,
  getAdminBarberList:getAdminBarberListReducer,
  changeAdminBarberOnlineStatus:changeAdminBarberOnlineStatusReducer,
  adminApproveBarber:adminApproveBarberReducer,
  adminAllSalonServices:adminAllSalonServicesReducer,
  adminCreateBarber:adminCreateBarberReducer,
  adminUpdateBarber:adminUpdateBarberReducer,
  adminDeleteBarber:adminDeleteBarberReducer,
  getAdminAllSalonIcon:getAdminAllSalonIconReducer,
  getAdminAllCountries:getAdminAllCountriesReducer,
  getAdminAllCities:getAdminAllCitiesReducer,
  getAdminAllTimezone:getAdminAllTimezoneReducer,
  adminDeleteSalon:adminDeleteSalonReducer,
  adminCreateSalon:adminCreateSalonReducer,
  adminUpdateProfile:adminUpdateProfileReducer,
  adminGetAllCustomerList:adminGetAllCustomerListReducer,
  adminServeQueue:adminServeQueueReducer,
  adminEditSalon:adminEditSalonReducer,
  AdminGoogleSignup:AdminGoogleSignupReducer,
  AdminSignup:AdminSignupReducer,
  AdminSignupEdit:AdminSignupEditReducer,
  adminSendVerifyEmail:adminSendVerifyEmailReducer,
  adminVerifiedEmailStatus:adminVerifiedEmailStatusReducer,
  adminGetDefaultSalon:adminGetDefaultSalonReducer,
  adminApplySalon:adminApplySalonReducer,
  adminSalonStatus:adminSalonStatusReducer,
  adminUpdateSalonSettings:adminUpdateSalonSettingsReducer,
  adminForgetPassword:adminForgetPasswordReducer,
  adminResetPassword:adminResetPasswordReducer,
  adminUploadProfilePic:adminUploadProfilePicReducer,
  AdminSignin:AdminSigninReducer,
  color:colorReducer,
  adminSetSalon:adminSetSalonReducer,

  //Barber Reducers
  BarberLoggedInMiddleware: BarberLoggedInMiddlewareReducer,
  BarberGoogleLogin: BarberGoogleLoginReducer
})

const initialState = {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,

});

export default store;