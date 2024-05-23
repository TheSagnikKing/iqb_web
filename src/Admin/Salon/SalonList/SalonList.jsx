import React, { useEffect, useRef, useState } from 'react'
import "./SalonList.css"
import { DeleteIcon, EditIcon, Settingsicon } from '../../../icons'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'

const SalonList = () => {

  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createSalonClicked = () => {
    navigate("/admin-createsalon")
  }

  const [loading, setLoading] = useState(false)

  const salonlistdata = [
    {
      _id: 1,
      salonId: 10,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 2,
      salonId: 11,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 3,
      salonId: 12,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 4,
      salonId: 13,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 5,
      salonId: 14,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 6,
      salonId: 15,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 7,
      salonId: 16,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 8,
      salonId: 17,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 9,
      salonId: 18,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 10,
      salonId: 19,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 11,
      salonId: 20,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
    {
      _id: 12,
      salonId: 21,
      salonName: "Classic Touch",
      address: "New York",
      city: "Washington D.C"
    },
  ]


  const SalonListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    SalonListControllerRef.current = controller;

    dispatch(getAdminSalonListAction(email, controller.signal));

    return () => {
      if (SalonListControllerRef.current) {
        SalonListControllerRef.current.abort();
      }
    };
  }, [email, dispatch]);

  const editButtonClicked = (salonid) => {
    navigate(`/admin-editsalon/${salonid}`)
  }

  return (
    <div className='salon_wrapper'>
      <div>
        <p>Salon List</p>
        <button onClick={createSalonClicked}>
          <p>Create</p>
          <div>+</div>
        </button>
      </div>

      <div className='salon_content_wrapper'>
        <div className='salon_content_body'
        style={{
          overflow: loading === true ? "hidden" : "auto",
        }}
        >
          <div>
            <p>Salon Name</p>
            <p>Address</p>
            <p>City</p>
          </div>

          {
            loading ?
              <>
              <Skeleton count={9} height={"6rem"} style={{marginBottom:"1rem"}}/>
              </> :
              salonlistdata.map((s) => (
                <div key={s._id}>
                  <p>{s.salonName}</p>
                  <p>{s.address}</p>
                  <p>{s.city}</p>
                  <div>
                    <div onClick={() => editButtonClicked(s.salonId)}><EditIcon /></div>
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

export default SalonList