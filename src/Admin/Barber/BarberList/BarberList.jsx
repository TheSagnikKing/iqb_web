import React, { useState } from 'react'
import "./BarberList.css"

import { useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon, Notificationicon, Settingsicon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'

const BarberList = () => {
  const navigate = useNavigate()

  const createbarberClicked = () => {
    navigate("/admin-createbarber")
  }

  const [loading, setLoading] = useState(false)

  const [togglecheck, setTogglecheck] = useState(false)

  const toggleHandler = () => {
    setTogglecheck((prev) => !prev)
  }

  const barberlistdata = [
    {
      _id: 1,
      salonId: 10,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 2,
      salonId: 11,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 3,
      salonId: 13,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 4,
      salonId: 14,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 5,
      salonId: 15,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 6,
      salonId: 16,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 7,
      salonId: 17,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 8,
      salonId: 18,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 9,
      salonId: 19,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 10,
      salonId: 20,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
    {
      _id: 11,
      salonId: 21,
      barberName: "Arghya Das",
      email: "arghya@gmail.com",
      isOnline: true
    },
  ]

  const editButtonClicked = (salonid) => {
    navigate(`/admin-editbarber/${salonid}`)
  }
  
  return (
    <div className='admin_barber_wrapper'>
      <div>
        <p>Barber List</p>
        <div>
          <button onClick={() => {}}>
            <p>Send</p>
            <div><Notificationicon /></div>
          </button>

          <button onClick={createbarberClicked}>
            <p>Create</p>
            <div>+</div>
          </button>
        </div>
      </div>

      <div className='admin_barber_content_wrapper'>
        <div className='admin_barber_content_body'>
          <div>
            <div></div>
            <p>Salon ID</p>
            <p>Barber Name</p>
            <p>Email</p>
            <p>isOnline</p>
          </div>

          {
            loading ?
              <>
                <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} />
              </> :
              barberlistdata.map((b) => (
                <div className='admin_barber_content_body_item' key={b._id}>
                  <input type="checkbox" />
                  <p>{b.salonId}</p>
                  <p>{b.barberName}</p>
                  <p>{b.email}</p>
                  <div>
                    <div
                      style={{
                        background: togglecheck ? "limegreen" : "#000"
                      }}
                    >
                      <p className={`barberlist_toggle_btn_text ${togglecheck ? 'barberlist_dashboard_toggle_btn_text_active' : 'barberlist_dashboard_toggle_btn_text_inactive'}`}></p>
                      <button
                        className={`barberlist_dashboard_toggle_btn ${togglecheck ? 'barberlist_dashboard_toggle_active' : 'barberlist_dashboard_toggle_inactive'}`}
                        onClick={toggleHandler}
                      ></button>
                    </div>
                  </div>

                  <button>Approve</button>
                  <div>
                    <div onClick={() => editButtonClicked(b.salonId)}><EditIcon /></div>
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

export default BarberList