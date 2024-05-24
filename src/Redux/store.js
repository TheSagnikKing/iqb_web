import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AdminLoggedInMiddlewareReducer, AdminGoogleLoginReducer, AdminLogoutReducer } from "./Admin/Reducers/AuthReducer"
import { BarberGoogleLoginReducer, BarberLoggedInMiddlewareReducer } from "./Barber/Reducers/AuthReducer"
import { getAllAdvertisementReducer, getAllQueueListReducer,getDashboardAppointmentListReducer } from "./Admin/Reducers/DashboardReducer"
import { adminCreateSalonReducer, adminDeleteSalonReducer, getAdminAllCitiesReducer, getAdminAllCountriesReducer, getAdminAllSalonIconReducer, getAdminAllTimezoneReducer, getAdminSalonListReducer } from "./Admin/Reducers/SalonReducer";
import { getAdminBarberListReducer,changeAdminBarberOnlineStatusReducer, adminApproveBarberReducer,adminAllSalonServicesReducer,adminCreateBarberReducer, adminUpdateBarberReducer, adminDeleteBarberReducer } from "./Admin/Reducers/BarberReducer"
import { adminUpdateProfileReducer } from "./Admin/Reducers/AdminProfileReducer"
import { adminGetAllCustomerListReducer } from "./Admin/Reducers/CustomerReducer";

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