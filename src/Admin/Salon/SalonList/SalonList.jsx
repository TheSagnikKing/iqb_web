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

  const getAdminSalonList = useSelector(state => state.getAdminSalonList)

  const {
    loading: getAdminSalonListLoading,
    resolve: getAdminSalonListResolve,
    salons: SalonList
  } = getAdminSalonList


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
        <div className='salon_content_body'>
          <div>
            <p>Salon Name</p>
            <p>Address</p>
            <p>City</p>
          </div>

          {
            getAdminSalonListLoading && !getAdminSalonListResolve ?
              <>
                <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} />
              </> :
              !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ?
                SalonList.map((s) => (
                  <div key={s?._id}>
                    <p>{s?.salonName}</p>
                    <p>{s?.address}</p>
                    <p>{s?.city}</p>
                    <div>
                      <div onClick={() => editButtonClicked(s?.salonId)}><EditIcon /></div>
                    </div>
                    <div>
                      <div><DeleteIcon /></div>
                    </div>
                    <div>
                      <div><Settingsicon /></div>
                    </div>
                  </div>
                )) :
                !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ? 
                <p>No Salon List</p> :
                !getAdminSalonListLoading && !getAdminSalonListResolve &&
                <p>No Salon List</p>
          }

        </div>
      </div>
    </div>
  )
}

export default SalonList