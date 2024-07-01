import React, { useEffect, useRef, useState } from 'react'
import "./Queue.css"

import { useNavigate } from 'react-router-dom'
import { DeleteIcon, ServeIcon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'

import { adminCancelQueueAction, adminServeQueueAction } from '../../Redux/Admin/Actions/QueueAction'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { getBarberQueueListAction } from '../../Redux/Barber/Actions/BarberQueueAction'

const Queue = () => {

  const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
  const barberId = useSelector(state => state.BarberLoggedInMiddleware.barberId)
  const barberEmail = useSelector(state => state.BarberLoggedInMiddleware.barberEmail)

  const dispatch = useDispatch()

  const queuelistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    queuelistcontrollerRef.current = controller;

    dispatch(getBarberQueueListAction(salonId, barberId, controller.signal));

    return () => {
      if (queuelistcontrollerRef.current) {
        queuelistcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

  const getBarberQueueList = useSelector(state => state.getBarberQueueList)

  const {
    loading: getBarberQueueListLoading,
    resolve: getBarberQueueListResolve,
    queueList: BarberQueueList
  } = getBarberQueueList

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const serveQHandler = (b) => {
    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      barberEmail,
      barberId: b.barberId,
      salonId,
      services: b.services,
      _id: b._id
    }

    if (confirm) {
      console.log(queueData)
      dispatch(adminServeQueueAction(queueData))
    }
  }


  const cancelQHandler = (b) => {
    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      barberEmail,
      barberId: b.barberId,
      salonId,
      _id: b._id
    }

    if (confirm) {
      console.log(queueData)
      dispatch(adminCancelQueueAction(queueData))
    }

  }

  const adminServeQueue = useSelector(state => state.adminServeQueue)

  const {
    loading: adminServeQueueLoading
  } = adminServeQueue

  const adminCancelQueue = useSelector(state => state.adminCancelQueue)

  const {
    loading: adminCancelQueueLoading
  } = adminCancelQueue

  return (
    <div className={`barber_queue_wrapper ${darkmodeOn && "dark"}`}>
      <div>
        <p>Queue List</p>
      </div>

      <div className={`barber_queue_content_wrapper ${darkmodeOn && "dark"}`}>

        {/* {
          getBarberQueueListLoading && !getBarberQueueListResolve ? (
            <div className='barber_queue_content_body'>
              <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
            </div>
          ) : !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ? (
            <div className={`barber_queue_content_body ${darkmodeOn && "dark"}`}>
              <div>
                <p>Name</p>
                <p>Time Joined Q</p>
                <p>Barber Name</p>
                <p>Q Postion</p>
                <p>Serve</p>
                <p>Cancel</p>
              </div>

              {BarberQueueList.map((b) => (
                <div className={`barber_queue_content_body_item ${darkmodeOn && "dark"}`} key={b._id}>
                  <p>{b?.name}</p>
                  <p>{b?.timeJoinedQ}</p>
                  <p>{b?.barberName}</p>
                  <p>{b?.qPosition}</p>
                  <div><button onClick={() => serveQHandler(b)} disabled={adminServeQueueLoading}><ServeIcon /></button></div>
                  <div><button onClick={() => cancelQHandler(b)} disabled={adminCancelQueueLoading}><DeleteIcon /></button></div>
                </div>
              ))}
            </div>
          ) : !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ? (
            <div className={`barber_queue_content_body_error ${darkmodeOn && "dark"}`}>
              <p style={{ margin: "2rem" }}>Queue not available</p>
            </div>
          ) : (
            !getBarberQueueListLoading && !getBarberQueueListResolve && (
              <div className={`barber_queue_content_body_error ${darkmodeOn && "dark"}`}>
                <p style={{ margin: "2rem" }}>Queue not available</p>
              </div>
            )
          )
        } */}

        <div className={`barber_queue_content_body ${darkmodeOn && "dark"}`}>
          <div>
            <p>Name</p>
            <p>Time Joined Q</p>
            <p>Barber Name</p>
            <p>Q Postion</p>
            <p>Serve</p>
            <p>Cancel</p>
          </div>

            <div className={`barber_queue_content_body_item ${darkmodeOn && "dark"}`}>
              <p>b?.name</p>
              <p>b?.timeJoinedQ</p>
              <p>b?.barberName</p>
              <p>b?.qPosition</p>
              <div><button><ServeIcon /></button></div>
              <div><button><DeleteIcon /></button></div>
            </div>

        </div>

      </div>
    </div>
  )
}

export default Queue