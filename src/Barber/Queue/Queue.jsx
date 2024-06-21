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

  return (
    <div className={`admin_queue_wrapper ${darkmodeOn && "dark"}`}>
      <div>
        <p>Queue List</p>
      </div>

      <div className={`admin_queue_content_wrapper ${darkmodeOn && "dark"}`}>

        {
          getBarberQueueListLoading && !getBarberQueueListResolve ? (
            <div className='admin_queue_content_body'>
              <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}/>
            </div>
          ) : !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length > 0 ? (
            <div className={`admin_queue_content_body ${darkmodeOn && "dark"}`}>
              <div>
                <p>Name</p>
                <p>Time Joined Q</p>
                <p>Barber Name</p>
                <p>Q Postion</p>
              </div>

              {BarberQueueList.map((b) => (
                <div className={`admin_queue_content_body_item ${darkmodeOn && "dark"}`} key={b._id}>
                  <p>{b?.name}</p>
                  <p>{b?.timeJoinedQ}</p>
                  <p>{b?.barberName}</p>
                  <p>{b?.qPosition}</p>
                </div>
              ))}
            </div>
          ) : !getBarberQueueListLoading && getBarberQueueListResolve && BarberQueueList?.length == 0 ? (
            <div className={`admin_queue_content_body_error ${darkmodeOn && "dark"}`}>
              <p style={{ margin: "2rem" }}>Queue not available</p>
            </div>
          ) : (
            !getBarberQueueListLoading && !getBarberQueueListResolve && (
            <div className={`admin_queue_content_body_error ${darkmodeOn && "dark"}`}>
                <p style={{ margin: "2rem" }}>Queue not available</p>
              </div>
            )
          )
        }

      </div>
    </div>
  )
}

export default Queue