import React, { useEffect, useRef, useState } from 'react'
import style from "./Queue.module.css"

import { useNavigate } from 'react-router-dom'
import { CrownIcon, DeleteIcon, ServeIcon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'

import { adminCancelQueueAction, adminServeQueueAction } from '../../Redux/Admin/Actions/QueueAction'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { barberCancelQueueAction, barberServeQueueAction, getBarberQueueListAction } from '../../Redux/Barber/Actions/BarberQueueAction'
import toast from 'react-hot-toast'

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
    if (b.qPosition !== 1) {
      return toast.error("Queue position is not 1", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    }

    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      servedByEmail: barberEmail,
      barberEmail,
      barberId: b.barberId,
      salonId,
      services: b.services,
      _id: b._id
    }

    if (confirm) {
      dispatch(barberServeQueueAction(queueData, salonId, b.barberId))
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
      // console.log(queueData)
      dispatch(barberCancelQueueAction(queueData, salonId, b.barberId))
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
    <div className={`${style.barber_queue_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Queue List</p>
      </div>

      <div className={`${style.barber_queue_content_wrapper} ${darkmodeOn && style.dark}`}>

        {
          getBarberQueueListLoading ?
            <div className={style.barber_queue_content_body}>
              <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }}
                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
            </div> :
            getBarberQueueListResolve && BarberQueueList?.length > 0 ?
              <>
                <div className={`${style.barber_queue_content_body} ${darkmodeOn && style.dark}`}>
                  <div>
                    <p>#</p>
                    <p>Name</p>
                    <p>Barber Name</p>
                    <p>Time Joined Q</p>
                    <div><p>Qg Code</p></div>
                    <div><p>EWT</p></div>
                    <div><p>Type</p></div>
                    <div><p>Serve</p></div>
                    <div><p>Cancel</p></div>
                  </div>

                  {BarberQueueList?.map((b, index) => (
                    <div
                      className={`${style.barber_queue_content_body_item} ${darkmodeOn && style.dark}`}
                      key={b._id}
                      style={{
                        borderBottom: BarberQueueList.length - 1 === index && "none"
                      }}
                    >
                      <p>{index === 0 ? "Next" : b.qPosition}</p>
                      <p>{b.name}</p>
                      <p>{b.barberName}</p>
                      <p>{b.timeJoinedQ}</p>
                      <p>{b?.qgCode}</p>
                      <p>{b?.customerEWT === 0 ? "-" : b?.customerEWT + "mins"}</p>
                      <div>
                        {
                          b.serviceType === "VIP" ? <CrownIcon /> : "-"
                        }
                      </div>
                      <div><button onClick={() => serveQHandler(b)} disabled={adminServeQueueLoading}>Serve</button></div>
                      <div><button onClick={() => cancelQHandler(b)} disabled={adminCancelQueueLoading}>Cancel</button></div>
                    </div>
                  ))}
                </div>
              </> :
              <div className={`${style.barber_queue_content_body_error} ${darkmodeOn && style.dark}`}>
                <p>Queue not available</p>
              </div>
        }

      </div>
    </div>
  )
}

export default Queue