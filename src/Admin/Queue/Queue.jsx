import React, { useEffect, useRef, useState } from 'react'
import "./Queue.css"

import { useNavigate } from 'react-router-dom'
import { DeleteIcon, ServeIcon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQueueListAction } from '../../Redux/Admin/Actions/DashboardAction'
import { adminCancelQueueAction, adminServeQueueAction } from '../../Redux/Admin/Actions/QueueAction'

const Queue = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

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
    response: queuelist
  } = getAllQueueList

  const serveHandler = (barberId, serviceId, customerid) => {
    const confirm = window.confirm()

    if (confirm) {
      const infodata = {
        barberId,
        serviceId,
        _id: customerid,
        salonId
      }

      console.log("cust", infodata)

      dispatch(adminServeQueueAction(infodata))
    }

  }

  const cancelHandler = (barberId, serviceId, customerid) => {
    const confirm = window.confirm()

    if (confirm) {
      const infodata = {
        barberId,
        _id: customerid,
        salonId
      }

      console.log("cust", infodata)

      dispatch(adminCancelQueueAction(infodata))
    }
  }
  

  return (
    <div className='admin_queue_wrapper'>
      <div>
        <p>Queue List</p>
      </div>

      <div className='admin_queue_content_wrapper'>
        <div className='admin_queue_content_body'>
          <div>
            <p>Name</p>
            <p>Time Joined Q</p>
            <p>Barber Name</p>
            <p>Q Postion</p>
            <p>Served</p>
            <p>Cancel</p>
          </div>

          {
            getAllQueueListLoading && !getAllQueueListResolve ?
              <>
                <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} />
              </> :
              !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length > 0 ?
                queuelist.map((b) => (
                  <div className='admin_queue_content_body_item' key={b._id}>
                    <p>{b.name}</p>
                    <p>{b.timeJoinedQ}</p>
                    <p>{b.barberName}</p>
                    <p>{b.qPosition}</p>
                    <div>
                      <div onClick={() => serveHandler(b.barberId, b.serviceId, b._id)}><ServeIcon /></div>
                    </div>
                    <div>
                      <div onClick={() => cancelHandler(b.barberId, b.serviceId, b._id)}><DeleteIcon /></div>
                    </div>
                  </div>
                )) :
                !getAllQueueListLoading && getAllQueueListResolve && queuelist?.length == 0 ?
                  <p>No QueueList</p> :
                  !getAllQueueListLoading && !getAllQueueListResolve &&
                  <p>No QueueList</p>
          }

        </div>
      </div>
    </div>
  )
}

export default Queue