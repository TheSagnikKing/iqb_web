import React, { useEffect, useRef, useState } from 'react'
import "./CustomerList.css"
import { DeleteIcon, EmailIcon, LeftArrow, MessageIcon, Notificationicon, RightArrow, SearchIcon, Settingsicon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { adminGetAllCustomerListAction } from '../../Redux/Admin/Actions/CustomerAction'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'

const CustomerList = () => {

  const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const dispatch = useDispatch()

  const CustomerListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    CustomerListControllerRef.current = controller;

    dispatch(adminGetAllCustomerListAction(currentsalonId, controller.signal));

    return () => {
      if (CustomerListControllerRef.current) {
        CustomerListControllerRef.current.abort();
      }
    };
  }, [dispatch]);

  const adminGetAllCustomerList = useSelector(state => state.adminGetAllCustomerList)

  const {
    loading: adminGetAllCustomerListLoading,
    resolve: adminGetAllCustomerListResolve,
    getAllCustomers: AllCustomerList
  } = adminGetAllCustomerList

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

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
            <p>Send</p>
            <div><Notificationicon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && "dark"}`}>
            <p>Send</p>
            <div><EmailIcon /></div>
          </div>

          <div className={`customer_send_btn ${darkmodeOn && "dark"}`}>
            <p>Send</p>
            <div><MessageIcon /></div>
          </div>

        </div>


        <div className='mobile_customer_search'><SearchIcon /></div>
      </div>

      <div className={`customer_content_wrapper ${darkmodeOn && "dark"}`}>
        {/* {
          adminGetAllCustomerListLoading && !adminGetAllCustomerListResolve ? (
            <div className='customer_content_body'>
              <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}/>
            </div>
          ) : !adminGetAllCustomerListLoading && adminGetAllCustomerListResolve && AllCustomerList?.length > 0 ? (
            <div className={`customer_content_body ${darkmodeOn && "dark"}`}>
              <div>
                <input
                  type="checkbox"
                  style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
                />
                <p>Salon ID</p>
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
                  <p>{s.salonId}</p>
                  <p>{s.name}</p>
                  <p>{s.email}</p>
                  <p>{s.gender}</p>
                  <p>{s.mobileNumber}</p>
                  <div>
                    <div><Notificationicon /></div>
                  </div>
                  <div>
                    <div><EmailIcon /></div>
                  </div>
                  <div>
                    <div><MessageIcon /></div>
                  </div>
                </div>
              ))}
            </div>
          ) : !adminGetAllCustomerListLoading && adminGetAllCustomerListResolve && AllCustomerList?.length === 0 ? (
            <div className={`customer_content_body_error ${darkmodeOn && "dark"}`}>
              <p style={{ margin: "2rem" }}>Customers not available</p>
            </div>
          ) : (
            !adminGetAllCustomerListLoading && !adminGetAllCustomerListResolve && (
              <div className={`customer_content_body_error ${darkmodeOn && "dark"}`}>
                <p style={{ margin: "2rem" }}>Customers not available</p>
              </div>
            )
          )
        } */}

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


          <div>
            <input
              type="checkbox"
              style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
            />
            <p>s.name</p>
            <p>s.emai</p>
            <p>s.gender</p>
            <p>s.mobileNumber</p>
            {/* <div>
              <div><Notificationicon /></div>
            </div>
            <div>
              <div><EmailIcon /></div>
            </div>
            <div>
              <div><MessageIcon /></div>
            </div> */}
          </div>

        </div>

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