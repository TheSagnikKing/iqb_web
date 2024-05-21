import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AdminLoggedInMiddlewareReducer, AdminGoogleLoginReducer, AdminLogoutReducer } from "./Admin/Reducers/AuthReducer"
import { BarberGoogleLoginReducer, BarberLoggedInMiddlewareReducer } from "./Barber/Reducers/AuthReducer"
import { getAllAdvertisementReducer, getAllQueueListReducer } from "./Admin/Reducers/DashboardReducer"

const rootReducer = combineReducers({

  //Admin Reducers
  AdminLoggedInMiddleware: AdminLoggedInMiddlewareReducer,
  AdminGoogleLogin: AdminGoogleLoginReducer,
  AdminLogout: AdminLogoutReducer,
  getAllAdvertisement:getAllAdvertisementReducer,
  getAllQueueList:getAllQueueListReducer,

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