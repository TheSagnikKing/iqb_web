import React, { useState } from 'react'
import "./CustomerList.css"
import { DeleteIcon, EmailIcon, LeftArrow, MessageIcon, Notificationicon, RightArrow, SearchIcon, Settingsicon } from '../../icons'
import Skeleton from 'react-loading-skeleton'

const CustomerList = () => {
  const [loading, setLoading] = useState(false)

  const customerlistdata = [
    {
      _id: 1,
      salonId: 1,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 2,
      salonId: 2,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 3,
      salonId: 3,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 4,
      salonId: 4,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 5,
      salonId: 5,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 6,
      salonId: 6,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 7,
      salonId: 7,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 8,
      salonId: 8,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 9,
      salonId: 9,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 10,
      salonId: 10,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id: 11,
      salonId: 11,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
  ]

  return (
    <div className='customer_wrapper'>
      <div>
        <p>Customer List</p>
        <div className='customer_search'>
          <input 
          type="text" 
          placeholder='Search Customer'
          />
          <div><SearchIcon /></div>
        </div>

        {/* <div className='mobile_customer_search'><SearchIcon /></div> */}
      </div>

      <div className='customer_content_wrapper'>
        <div className='customer_content_body'
          style={{
            overflow: loading === true ? "hidden" : "auto",
          }}
        >
          <div>
            <p>Salon ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Gender</p>
            <p>Mobile Number</p>
          </div>

          {
            loading ?
              <>
                <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} />
              </> :
              customerlistdata.map((s) => (
                <div key={s._id}>
                  <p>{s.salonId}</p>
                  <p>{s.customerName}</p>
                  <p>{s.customerEmail}</p>
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
              ))
          }

        </div>
      </div>

      <div className='customer_pagination_wrapper'>
        <div>
          <div><LeftArrow/></div>
          <div><RightArrow/></div>
        </div>
      </div>
    </div>
  )
}

export default CustomerList