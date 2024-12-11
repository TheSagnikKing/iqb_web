import React, { useEffect, useRef, useState } from 'react'
import style from "./Queue.module.css"

import { useNavigate } from 'react-router-dom'
import { CloseIcon, CrownIcon, DeleteIcon, SearchIcon, ServeIcon } from '../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQueueListAction } from '../../Redux/Admin/Actions/DashboardAction'
import { adminCancelQueueAction, adminServeQueueAction } from '../../Redux/Admin/Actions/QueueAction'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import toast from 'react-hot-toast'
import { Modal } from '@mui/material'
import { getAdminBarberListAction } from '../../Redux/Admin/Actions/BarberAction'
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader'

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

  const [copyQueueList, setCopyQueueList] = useState([])

  useEffect(() => {
    if (queuelist) {
      setCopyQueueList(queuelist)
    }
  }, [queuelist])

  const [search, setSearch] = useState("")

  const searchHandler = (value) => {
    setSearch(value)
    const searchValue = value.toLowerCase().trim();

    if (!search) {
      setCopyQueueList(queuelist)
    } else {
      setCopyQueueList((prev) => {
        const filteredArray = queuelist?.filter((queue) => {
          return queue.name.toLowerCase().includes(searchValue) ||
            queue.barberName.toLowerCase().includes(search)
        })
        return filteredArray
      })
    }
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const selectHandler = (b) => {
    if (b.qPosition !== 1) {
      return toast.error("Queue position is not 1", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    }

    const confirm = window.confirm("Are you Sure ?")

    const queueData = {
      adminEmail,
      barberId: b.barberId,
      salonId,
      services: b.services,
      _id: b._id
    }

    if (confirm) {
      setChoosebarber(b?.barberName)
      setChoosebarberemail(b?.barberEmail)
      setChoosebarbermodalopen({
        open: true,
        data: queueData
      })
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
      // console.log(queueData)
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

  const [choosebarbermodalopen, setChoosebarbermodalopen] = useState({
    open: false,
    data: {}
  })

  const [choosebarber, setChoosebarber] = useState("")
  const [choosebarberemail, setChoosebarberemail] = useState("")

  const BarberListcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    BarberListcontrollerRef.current = controller;

    dispatch(getAdminBarberListAction(salonId, controller.signal));

    return () => {
      if (BarberListcontrollerRef.current) {
        BarberListcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

  const getAdminBarberList = useSelector(state => state.getAdminBarberList)

  const {
    loading: getAdminBarberListLoading,
    resolve: getAdminBarberListResolve,
    getAllBarbers: BarberList
  } = getAdminBarberList


  const [copybarberlistdata, setCopybarberlistdata] = useState([])

  useEffect(() => {
    if (BarberList) {
      const clockedinbarbers = BarberList?.filter((b) => {
        return b.isClockedIn
      })
      setCopybarberlistdata(clockedinbarbers)
    }
  }, [BarberList])

  const serveQHandler = () => {

    const queuedata = {
      ...choosebarbermodalopen.data,
      servedByEmail: choosebarberemail
    }

    dispatch(adminServeQueueAction(queuedata, salonId, setChoosebarbermodalopen))
  }


  return (
    <div className={`${style.admin_queue_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Queue List</p>

        <div className={`${style.customer_search} ${darkmodeOn && style.dark}`}>
          <input
            type="text"
            placeholder='Search Queue'
            value={search}
            onChange={(e) => searchHandler(e.target.value)}
          />

          <div><SearchIcon /></div>
        </div>

      </div>

      <div className={`${style.admin_queue_content_wrapper} ${darkmodeOn && style.dark}`}>

        {
          getAllQueueListLoading ?
            <div className={style.admin_queue_content_body}>
              <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
            </div> :
            getAllQueueListResolve && copyQueueList?.length > 0 ?
              <>
                <div className={`${style.admin_queue_content_body} ${darkmodeOn && style.dark}`}>
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

                  {copyQueueList?.map((b, index) => (
                    <div
                      className={`${style.admin_queue_content_body_item} ${darkmodeOn && style.dark}`}
                      key={b._id}
                      style={{
                        borderBottom: copyQueueList.length - 1 === index && "none"
                      }}
                    >
                      <p>{b.qPosition}</p>
                      <p>{b.name.length > 18 ? b.name.slice(0, 18) + "..." : b.name}</p>
                      <p>{b.barberName.length > 18 ? b.barberName.slice(0, 18) + "..." : b.barberName}</p>
                      <p>{b.timeJoinedQ}</p>
                      <p>{b?.qgCode}</p>
                      <p>{b?.serviceEWT}</p>
                      <div>
                        {
                          b.serviceType === "VIP" ? <CrownIcon /> : "-"
                        }
                      </div>
                      <div><button onClick={() => selectHandler(b)} disabled={adminServeQueueLoading}>Serve</button></div>
                      <div><button onClick={() => cancelQHandler(b)} disabled={adminCancelQueueLoading}>Cancel</button></div>
                    </div>
                  ))}
                </div>
              </> :
              <div className={`${style.admin_queue_content_body_error} ${darkmodeOn && style.dark}`}>
                <p>Queue not available</p>
              </div>
        }
      </div>

      <Modal
        open={choosebarbermodalopen.open}
        onClose={() => setChoosebarbermodalopen({
          open: false,
          data: {}
        })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal_container}>
          <div>
            <p>Choose Barber</p>
            <button onClick={() => setChoosebarbermodalopen({
              open: false,
              data: {}
            })}><CloseIcon /></button>
          </div>

          <div className={style.modal_content_container}>
            <input type="text" value={choosebarber} placeholder='Choose Barber' readOnly />

            {
              getAdminBarberListLoading ? (<div className={style.barber_dropdown_loading}>
                <Skeleton count={3} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                  highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
              </div>) :
                getAdminBarberListResolve && copybarberlistdata?.length > 0 ?
                  (<div className={style.barber_dropdown}>
                    {
                      copybarberlistdata?.map((b) => {
                        return (
                          <div className={style.choose_barber_dropdown_item} key={b._id}
                            onClick={() => {
                              setChoosebarberemail(b?.email)
                              setChoosebarber(b?.name)
                            }}
                            style={{
                              borderLeft: b.isOnline ? "0.5rem solid limegreen" : "0.5rem solid red"
                            }}
                          >
                            <div>
                              <img src={b?.profile?.[0]?.url} alt="img" />
                              <div className={style.barber_online_dot}
                                style={{
                                  backgroundColor: b.isOnline ? "limegreen" : "red"
                                }}
                              ></div>
                            </div>
                            <div>
                              <p>{b.name}</p>
                              <p>Queue Count : {b.queueCount}</p>
                              <p>EWT : {b.barberEWT} mins</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>) :
                  (<div className={style.barber_dropdown_error}>
                    <p>No barbers available</p>
                  </div>)
            }

          </div>

          {
            adminServeQueueLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}><ButtonLoader /></button> : <button onClick={serveQHandler}>Serve</button>
          }

        </div>
      </Modal>
    </div>
  )
}

export default Queue