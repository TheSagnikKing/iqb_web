import React, { useState } from 'react'
import "./CustomerList.css"
import { DeleteIcon, EditIcon, Settingsicon } from '../../icons'
import Skeleton from 'react-loading-skeleton'

const CustomerList = () => {
  const [loading, setLoading] = useState(false)

  const customerlistdata = [
    {
      _id:1,
      salonId:1,
      customerName: "Arghya",
      customerEmail: "arghya@gmail.com",
      gender: "Male",
      mobileNumber: "9876543210"
    },
    {
      _id:2,
      salonId:2,
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
        <button>
          <p>Search</p>
          <div>+</div>
        </button>
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
              <Skeleton count={9} height={"6rem"} style={{marginBottom:"1rem"}}/>
              </> :
              customerlistdata.map((s) => (
                <div key={s._id}>
                  <p>{s.salonId}</p>
                  <p>{s.customerName}</p>
                  <p>{s.customerEmail}</p>
                  <p>{s.gender}</p>
                  <p>{s.mobileNumber}</p>
                  <div>
                    <div><EditIcon /></div>
                  </div>
                  <div>
                    <div><DeleteIcon /></div>
                  </div>
                  <div>
                    <div><Settingsicon /></div>
                  </div>
                </div>
              ))
          }

        </div>
      </div>
    </div>
  )
}

export default CustomerList