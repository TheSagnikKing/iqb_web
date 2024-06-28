import React, { useEffect, useRef, useState } from 'react'
import "./Customers.css"
import { DeleteIcon, EmailIcon, LeftArrow, MessageIcon, Notificationicon, RightArrow, SearchIcon, Settingsicon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { barberGetAllCustomerListAction } from "../../Redux/Barber/Actions/BarberCustomersAction"
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'

const CustomerList = () => {

  const currentsalonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
  const barberProfile = useSelector(state => state.BarberLoggedInMiddleware.entiredata)

  const dispatch = useDispatch()

  const CustomerListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    CustomerListControllerRef.current = controller;

    dispatch(barberGetAllCustomerListAction(currentsalonId, barberProfile?.user[0]?.isApproved, controller.signal));

    return () => {
      if (CustomerListControllerRef.current) {
        CustomerListControllerRef.current.abort();
      }
    };
  }, [dispatch,barberProfile]);

  const barberGetAllCustomerList = useSelector(state => state.barberGetAllCustomerList)

  const {
    loading: barberGetAllCustomerListLoading,
    resolve: barberGetAllCustomerListResolve,
    getAllCustomers: AllCustomerList
  } = barberGetAllCustomerList

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  console.log(AllCustomerList)

  return (
    <div className={`customer_wrapper ${darkmodeOn && "dark"}`}>
      <div>
        <p>Customer List</p>

        <div>
          <div className={`customer_search ${darkmodeOn && "dark"}`}>
            <input
              type="text"
              placeholder='Search Customer'
            />
            <div><SearchIcon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && "dark"}`}>
            <div><Notificationicon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && "dark"}`}>
            <div><EmailIcon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && "dark"}`}>
            <div><MessageIcon /></div>
          </div>

        </div>


        <div className='mobile_customer_search' style={{color:darkmodeOn && "var(--primary-text-light-color1)"}}><SearchIcon /></div>
      </div>

      <div className={`customer_content_wrapper ${darkmodeOn && "dark"}`}>
        {
          barberGetAllCustomerListLoading && !barberGetAllCustomerListResolve ? (
            <div className='customer_content_body'>
              <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}/>
            </div>
          ) : !barberGetAllCustomerListLoading && barberGetAllCustomerListResolve && AllCustomerList?.length > 0 ? (
            <div className={`customer_content_body ${darkmodeOn && "dark"}`}>
              <div>
                <input
                  type="checkbox"
                  style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
                />
                <p>Name</p>
                <p>Email</p>
                <p>Gender</p>
                <p>Mobile Number</p>
              </div>

              {AllCustomerList.map((s) => (
                <div key={s._id}>
                  <input
                    type="checkbox"
                    style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
                  />
                  <p>{s.name}</p>
                  <p>{s.email}</p>
                  <p>{s.gender}</p>
                  <p>{s.mobileNumber}</p>
                </div>
              ))}
            </div>
          ) : !barberGetAllCustomerListLoading && barberGetAllCustomerListResolve && AllCustomerList?.length === 0 ? (
            <div className={`customer_content_body_error ${darkmodeOn && "dark"}`}>
              <p style={{ margin: "2rem" }}>Customers not available</p>
            </div>
          ) : (
            !barberGetAllCustomerListLoading && !barberGetAllCustomerListResolve && (
              <div className={`customer_content_body_error ${darkmodeOn && "dark"}`}>
                <p style={{ margin: "2rem" }}>Customers not available</p>
              </div>
            )
          )
        }

        {/* <div className={`customer_content_body ${darkmodeOn && "dark"}`}>
          <div>
            <input
              type="checkbox"
              style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
            />
            <p>Name</p>
            <p>Email</p>
            <p>Gender</p>
            <p>Mobile Number</p>
          </div>


          <div>
            <input
              type="checkbox"
              style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
            />
            <p>s.name</p>
            <p>s.emai</p>
            <p>s.gender</p>
            <p>s.mobileNumber</p>
          </div>

        </div> */}

      </div>

      <div className='customer_pagination_wrapper'>
        <div>
          <div><LeftArrow /></div>
          <div><RightArrow /></div>
        </div>
      </div>
    </div>
  )
}

export default CustomerList