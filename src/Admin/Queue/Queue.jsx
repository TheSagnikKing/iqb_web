import React, { useEffect, useRef, useState } from 'react'
import style from "./Queue.module.css"

import { useNavigate } from 'react-router-dom'
import { CrownIcon, DeleteIcon, ServeIcon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQueueListAction } from '../../Redux/Admin/Actions/DashboardAction'
import { adminCancelQueueAction, adminServeQueueAction } from '../../Redux/Admin/Actions/QueueAction'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'

const Queue = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const adminEmail = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)

  const dispatch = useDispatch()

  const queuelistcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    queuelistcontrollerRef.current = controller;

    dispatch(getAllQueueListAction(salonId, controller.signal));

    return () => {
      if (queuelistcontrollerRef.current) {
        queuelistcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

  const getAllQueueList = useSelector(state => state.getAllQueueList)

  const {
    loading: getAllQueueListLoading,
    resolve: getAllQueueListResolve,
    queueList: queuelist
  } = getAllQueueList

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const serveQHandler = (b) => {
    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      adminEmail,
      barberId: b.barberId,
      salonId,
      services: b.services,
      _id: b._id
    }

    if (confirm) {
      console.log(queueData)
      dispatch(adminServeQueueAction(queueData, salonId))
    }
  }


  const cancelQHandler = (b) => {
    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      adminEmail,
      barberId: b.barberId,
      salonId,
      _id: b._id
    }

    if (confirm) {
      console.log(queueData)
      dispatch(adminCancelQueueAction(queueData, salonId))
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
    <div className={`${style.admin_queue_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Queue List</p>
      </div>

      <div className={`${style.admin_queue_content_wrapper} ${darkmodeOn && style.dark}`}>

        {
          getAllQueueListLoading && !getAllQueueListResolve ?
            <div className={style.admin_queue_content_body}>
              <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
            </div> :
            !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length > 0 ?
              <>
                <div className={`${style.admin_queue_content_body} ${darkmodeOn && style.dark}`}>
                  <div>
                    <p>Name</p>
                    <p>Time Joined Q</p>
                    <p>Barber Name</p>
                    <p>Q Postion</p>
                    <p>Type</p>
                    <p>Serve</p>
                    <p>Cancel</p>
                  </div>

                  {queuelist?.map((b, index) => (
                    <div
                      className={`${style.admin_queue_content_body_item} ${darkmodeOn && style.dark}`}
                      key={b._id}
                      style={{
                        borderBottom: queuelist.length - 1 === index && "none"
                      }}
                    >
                      <p>{b.name}</p>
                      <p>{b.timeJoinedQ}</p>
                      <p>{b.barberName}</p>
                      <p>{b.qPosition}</p>
                      <p>
                        {b.serviceType === "VIP" ? <div><CrownIcon /></div> : <div>-</div>}
                      </p>
                      <div><button onClick={() => serveQHandler(b)} disabled={adminServeQueueLoading}>Serve</button></div>
                      <div><button onClick={() => cancelQHandler(b)} disabled={adminCancelQueueLoading}>Cancel</button></div>
                    </div>
                  ))}
                </div>
              </> :
              !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length == 0 ?
                <div className={`${style.admin_queue_content_body_error} ${darkmodeOn && style.dark}`}>
                  <p>Queue not available</p>
                </div> :
                !getAllQueueListLoading && !getAllQueueListResolve &&
                <div className={`${style.admin_queue_content_body_error} ${darkmodeOn && style.dark}`}>
                  <p>Queue not available</p>
                </div>
        }
      </div>
    </div>
  )
}

export default Queue