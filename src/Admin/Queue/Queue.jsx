import React, { useState } from 'react'
import "./Queue.css"

import { useNavigate } from 'react-router-dom'
import { DeleteIcon, ServeIcon } from '../../icons'
import Skeleton from 'react-loading-skeleton'

const Queue = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [togglecheck, setTogglecheck] = useState(false)

  const toggleHandler = () => {
    setTogglecheck((prev) => !prev)
  }

  const queuelistdata = [
    {
      _id: 1,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 2,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 3,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 4,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 5,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 6,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 7,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 8,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 9,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
    {
      _id: 10,
      name: "Arghya",
      TimeJoinedQ:"2:03:21",
      barberName: "Bikki Das",
      qposition: 1,
    },
  ]

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
            loading ?
              <>
                <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} />
              </> :
              queuelistdata.map((b) => (
                <div className='admin_queue_content_body_item' key={b._id}>
                  <p>{b.name}</p>
                  <p>{b.TimeJoinedQ}</p>
                  <p>{b.barberName}</p>
                  <p>{b.qposition}</p>
                  <div>
                    <div><ServeIcon /></div>
                  </div>
                  <div>
                    <div><DeleteIcon /></div>
                  </div>
                </div>
              ))
          }

        </div>
      </div>
    </div>
  )
}

export default Queue