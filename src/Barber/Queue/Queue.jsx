// import React, { useEffect, useRef, useState } from 'react'
// import style from "./Queue.module.css"

// import { useNavigate } from 'react-router-dom'
// import { CrownIcon, DeleteIcon, ServeIcon } from '../../icons'
// import Skeleton from 'react-loading-skeleton'
// import { useDispatch, useSelector } from 'react-redux'

// import { adminCancelQueueAction, adminServeQueueAction } from '../../Redux/Admin/Actions/QueueAction'
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
// import { barberCancelQueueAction, barberServeQueueAction, getBarberQueueListAction } from '../../Redux/Barber/Actions/BarberQueueAction'
// import toast from 'react-hot-toast'

// const Queue = () => {

//   const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
//   const barberId = useSelector(state => state.BarberLoggedInMiddleware.barberId)
//   const barberEmail = useSelector(state => state.BarberLoggedInMiddleware.barberEmail)

//   const dispatch = useDispatch()

//   const queuelistcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     queuelistcontrollerRef.current = controller;

//     dispatch(getBarberQueueListAction(salonId, barberId, controller.signal));

//     return () => {
//       if (queuelistcontrollerRef.current) {
//         queuelistcontrollerRef.current.abort();
//       }
//     };
//   }, [salonId, dispatch]);

//   const getBarberQueueList = useSelector(state => state.getBarberQueueList)

//   const {
//     loading: getBarberQueueListLoading,
//     resolve: getBarberQueueListResolve,
//     queueList: BarberQueueList
//   } = getBarberQueueList

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   const serveQHandler = (b) => {
//     if (b.qPosition !== 1) {
//       return toast.error("Queue position is not 1", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }

//     const confirm = window.confirm("Are you Sure ?")

//     const queueData = {
//       servedByEmail: barberEmail,
//       barberEmail,
//       barberId: b.barberId,
//       salonId,
//       services: b.services,
//       _id: b._id
//     }

//     if (confirm) {
//       dispatch(barberServeQueueAction(queueData, salonId, b.barberId))
//     }
//   }


//   const cancelQHandler = (b) => {
//     const confirm = window.confirm("Are you Sure ?")

//     const queueData = {
//       barberEmail,
//       barberId: b.barberId,
//       salonId,
//       _id: b._id
//     }

//     if (confirm) {
//       // console.log(queueData)
//       dispatch(barberCancelQueueAction(queueData, salonId, b.barberId))
//     }

//   }

//   const adminServeQueue = useSelector(state => state.adminServeQueue)

//   const {
//     loading: adminServeQueueLoading
//   } = adminServeQueue

//   const adminCancelQueue = useSelector(state => state.adminCancelQueue)

//   const {
//     loading: adminCancelQueueLoading
//   } = adminCancelQueue

//   return (
//     <div className={`${style.barber_queue_wrapper} ${darkmodeOn && style.dark}`}>
//       <div>
//         <p>Queue List</p>
//       </div>

//       <div className={`${style.barber_queue_content_wrapper} ${darkmodeOn && style.dark}`}>

//         {
//           getBarberQueueListLoading ?
//             <div className={style.barber_queue_content_body}>
//               <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }}
//                 baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                 highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
//             </div> :
//             getBarberQueueListResolve && BarberQueueList?.length > 0 ?
//               <>
//                 <div className={`${style.barber_queue_content_body} ${darkmodeOn && style.dark}`}>
//                   <div>
//                     <p>#</p>
//                     <p>Name</p>
//                     <p>Barber Name</p>
//                     <p>Time Joined Q</p>
//                     <div><p>Qg Code</p></div>
//                     <div><p>EWT</p></div>
//                     <div><p>Type</p></div>
//                     <div><p>Serve</p></div>
//                     <div><p>Cancel</p></div>
//                   </div>

//                   {BarberQueueList?.map((b, index) => (
//                     <div
//                       className={`${style.barber_queue_content_body_item} ${darkmodeOn && style.dark}`}
//                       key={b._id}
//                       style={{
//                         borderBottom: BarberQueueList.length - 1 === index && "none"
//                       }}
//                     >
//                       <p>{index === 0 ? "Next" : b.qPosition}</p>
//                       <p>{b.name}</p>
//                       <p>{b.barberName}</p>
//                       <p>{b.timeJoinedQ}</p>
//                       <p>{b?.qgCode}</p>
//                       <p>{b?.customerEWT === 0 ? "-" : b?.customerEWT + "mins"}</p>
//                       <div>
//                         {
//                           b.serviceType === "VIP" ? <CrownIcon /> : "-"
//                         }
//                       </div>
//                       <div><button onClick={() => serveQHandler(b)} disabled={adminServeQueueLoading}>Serve</button></div>
//                       <div><button onClick={() => cancelQHandler(b)} disabled={adminCancelQueueLoading}>Cancel</button></div>
//                     </div>
//                   ))}
//                 </div>
//               </> :
//               <div className={`${style.barber_queue_content_body_error} ${darkmodeOn && style.dark}`}>
//                 <p>Queue not available</p>
//               </div>
//         }

//       </div>
//     </div>
//   )
// }

// export default Queue


import React, { useEffect, useState } from 'react'
import style from "./Queue.module.css"
import { DropdownIcon } from '../../newicons';
import { ClickAwayListener, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Queue = () => {

  const headRows = [
    { id: 1, heading: "#", key: "qpos" },
    { id: 2, heading: "Name", key: "customerName" },
    { id: 3, heading: "Barber Name", key: "barberName" },
    { id: 4, heading: "Time Joined", key: "timejoined" },
    { id: 5, heading: "Qg Code", key: "qgcode" },
    { id: 6, heading: "Type", key: "type" },
    { id: 7, heading: "Est. Time", key: "estimatedtime" },
    { id: 8, heading: "", key: "serve" },
    { id: 9, heading: "", key: "cancel" },
  ];

  const salonlistDataCopy = [
    { customerName: "John Doe", gender: "Male", email: "john.doe@example.com", dob: "1990-05-15", mobile: "123-456-7890", barberName: "Mike Johnson", qPos: 1, mins: 30, customerImage: "https://i.pravatar.cc/150?img=1", timeJoined: "10:00 AM", qgCode: "QG001", type: "Regular", estimatedTime: "10:30 AM" },
    { customerName: "Emma Smith", gender: "Female", email: "emma.smith@example.com", dob: "1995-08-22", mobile: "987-654-3210", barberName: "David Thompson", qPos: 2, mins: 40, customerImage: "https://i.pravatar.cc/150?img=2", timeJoined: "10:05 AM", qgCode: "QG002", type: "Premium", estimatedTime: "10:45 AM" },
    { customerName: "Liam Johnson", gender: "Male", email: "liam.johnson@example.com", dob: "1988-11-30", mobile: "456-789-0123", barberName: "Chris Williams", qPos: 3, mins: 35, customerImage: "https://i.pravatar.cc/150?img=3", timeJoined: "10:10 AM", qgCode: "QG003", type: "Regular", estimatedTime: "10:45 AM" },
    { customerName: "Sophia Brown", gender: "Female", email: "sophia.brown@example.com", dob: "1992-03-25", mobile: "321-654-0987", barberName: "Alex Martinez", qPos: 4, mins: 45, customerImage: "https://i.pravatar.cc/150?img=4", timeJoined: "10:15 AM", qgCode: "QG004", type: "VIP", estimatedTime: "11:00 AM" },
    { customerName: "Noah Wilson", gender: "Male", email: "noah.wilson@example.com", dob: "2000-07-10", mobile: "789-123-4560", barberName: "James Anderson", qPos: 5, mins: 25, customerImage: "https://i.pravatar.cc/150?img=5", timeJoined: "10:20 AM", qgCode: "QG005", type: "Regular", estimatedTime: "10:45 AM" },
    { customerName: "Olivia Martinez", gender: "Female", email: "olivia.martinez@example.com", dob: "1985-12-19", mobile: "654-321-7890", barberName: "Brian Davis", qPos: 6, mins: 50, customerImage: "https://i.pravatar.cc/150?img=6", timeJoined: "10:25 AM", qgCode: "QG006", type: "Premium", estimatedTime: "11:15 AM" },
    { customerName: "William Davis", gender: "Male", email: "william.davis@example.com", dob: "1998-09-05", mobile: "147-258-3690", barberName: "John Rodriguez", qPos: 7, mins: 30, customerImage: "https://i.pravatar.cc/150?img=7", timeJoined: "10:30 AM", qgCode: "QG007", type: "Regular", estimatedTime: "11:00 AM" },
    { customerName: "Ava Garcia", gender: "Female", email: "ava.garcia@example.com", dob: "1993-04-14", mobile: "369-147-2580", barberName: "Ryan Clark", qPos: 8, mins: 40, customerImage: "https://i.pravatar.cc/150?img=8", timeJoined: "10:35 AM", qgCode: "QG008", type: "VIP", estimatedTime: "11:20 AM" },
    { customerName: "James Rodriguez", gender: "Male", email: "james.rodriguez@example.com", dob: "1996-06-21", mobile: "852-963-7410", barberName: "Ethan Scott", qPos: 9, mins: 20, customerImage: "https://i.pravatar.cc/150?img=9", timeJoined: "10:40 AM", qgCode: "QG009", type: "Regular", estimatedTime: "11:00 AM" },
    
  ]


  const [salonlistData, setSalonlistData] = useState([
    { customerName: "John Doe", gender: "Male", email: "john.doe@example.com", dob: "1990-05-15", mobile: "123-456-7890", barberName: "Mike Johnson", qPos: 1, mins: 30, customerImage: "https://i.pravatar.cc/150?img=1", timeJoined: "10:00 AM", qgCode: "QG001", type: "Regular", estimatedTime: "10:30 AM" },
    { customerName: "Emma Smith", gender: "Female", email: "emma.smith@example.com", dob: "1995-08-22", mobile: "987-654-3210", barberName: "David Thompson", qPos: 2, mins: 40, customerImage: "https://i.pravatar.cc/150?img=2", timeJoined: "10:05 AM", qgCode: "QG002", type: "Premium", estimatedTime: "10:45 AM" },
    { customerName: "Liam Johnson", gender: "Male", email: "liam.johnson@example.com", dob: "1988-11-30", mobile: "456-789-0123", barberName: "Chris Williams", qPos: 3, mins: 35, customerImage: "https://i.pravatar.cc/150?img=3", timeJoined: "10:10 AM", qgCode: "QG003", type: "Regular", estimatedTime: "10:45 AM" },
    { customerName: "Sophia Brown", gender: "Female", email: "sophia.brown@example.com", dob: "1992-03-25", mobile: "321-654-0987", barberName: "Alex Martinez", qPos: 4, mins: 45, customerImage: "https://i.pravatar.cc/150?img=4", timeJoined: "10:15 AM", qgCode: "QG004", type: "VIP", estimatedTime: "11:00 AM" },
    { customerName: "Noah Wilson", gender: "Male", email: "noah.wilson@example.com", dob: "2000-07-10", mobile: "789-123-4560", barberName: "James Anderson", qPos: 5, mins: 25, customerImage: "https://i.pravatar.cc/150?img=5", timeJoined: "10:20 AM", qgCode: "QG005", type: "Regular", estimatedTime: "10:45 AM" },
    { customerName: "Olivia Martinez", gender: "Female", email: "olivia.martinez@example.com", dob: "1985-12-19", mobile: "654-321-7890", barberName: "Brian Davis", qPos: 6, mins: 50, customerImage: "https://i.pravatar.cc/150?img=6", timeJoined: "10:25 AM", qgCode: "QG006", type: "Premium", estimatedTime: "11:15 AM" },
    { customerName: "William Davis", gender: "Male", email: "william.davis@example.com", dob: "1998-09-05", mobile: "147-258-3690", barberName: "John Rodriguez", qPos: 7, mins: 30, customerImage: "https://i.pravatar.cc/150?img=7", timeJoined: "10:30 AM", qgCode: "QG007", type: "Regular", estimatedTime: "11:00 AM" },
    { customerName: "Ava Garcia", gender: "Female", email: "ava.garcia@example.com", dob: "1993-04-14", mobile: "369-147-2580", barberName: "Ryan Clark", qPos: 8, mins: 40, customerImage: "https://i.pravatar.cc/150?img=8", timeJoined: "10:35 AM", qgCode: "QG008", type: "VIP", estimatedTime: "11:20 AM" },
    { customerName: "James Rodriguez", gender: "Male", email: "james.rodriguez@example.com", dob: "1996-06-21", mobile: "852-963-7410", barberName: "Ethan Scott", qPos: 9, mins: 20, customerImage: "https://i.pravatar.cc/150?img=9", timeJoined: "10:40 AM", qgCode: "QG009", type: "Regular", estimatedTime: "11:00 AM" },
  ])

  const [settingsIndex, setSettingsIndex] = useState("")

  const [rowsPerPage, SetRowsPerPage] = useState(10)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(rowsPerPage)
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortColumn, setSortColumn] = useState("")
  const [query, setQuery] = useState("")

  const [salonPaginationData, setSalonPaginationData] = useState(salonlistData.slice(startIndex, endIndex))

  useEffect(() => {
    const totalPages = Math.ceil(salonlistData.length / rowsPerPage); // Calculate based on filtered data
    setTotalPages(totalPages);

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, salonlistData.length);

    setStartIndex(startIndex);
    setEndIndex(endIndex);
    setSalonPaginationData(salonlistData.slice(startIndex, endIndex));
}, [salonlistData, page, rowsPerPage]);


  const handleChange = (event, value) => {
    setPage(value);
  }


  useEffect(() => {
    let filteredData = salonlistDataCopy;

    if (query.trim() !== '') {
        filteredData = salonlistDataCopy.filter((item) =>
            item.customerName.toLowerCase().trim().includes(query.toLowerCase())
        );
    }

    setSalonlistData(filteredData);
    setPage(1); // Reset page on filter
}, [query]);

  const [selectOpen, setSelectOpen] = useState(false)

  const navigate = useNavigate()

  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Queue List</h2>
        <div>

          <input
            type='text'
            placeholder='Search Customer'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className={`${style.list_container}`}>

        <div className={`${style.list_body_container}`}>

          <div className={`${style.headRow}`}>
            {
              headRows.map((item, index) => {
                return (
                  <div key={item.id}>
                    <button
                      className={`${item.key === "customerName" || item.key === "barberName" ? style.name_head_btn : ""}`}
                    // onClick={() => sortFunction(item.key)}
                    >
                      {item.key === "customerName" || item.key === "barberName" ? (
                        <>
                          <span></span>
                          {item.heading}
                        </>
                      ) : (
                        item.heading
                      )}

                      {/* <span>{item.key && (sortColumn === item.key ? (sortOrder === 'asc' ? <SortUpIcon /> : <SortDownIcon />) : <SortUpDownArrowIcon />)}</span> */}
                    </button>
                  </div>
                )
              })
            }

          </div>


          {
            salonPaginationData.map((item, index) => {
              return (
                <div key={item.customerName} style={{ borderBottom: (index === endIndex - 1) || (index === salonPaginationData.length - 1) ? null : "0.1rem solid var(--border-secondary)" }}>
                  <div><p>{item.qPos === 1 ? "Next" : item.qPos}</p></div>
                  <div>
                    <div>
                      <div><img src={item.customerImage} alt="" /></div>
                      <p>{item.customerName}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div><img src={item.customerImage} alt="" /></div>
                      <p>{item.barberName}</p>
                    </div>
                  </div>
                  <div><p>{item.timeJoined}</p></div>
                  <div><p>{item.qgCode}</p></div>
                  <div><p>{item.type}</p></div>
                  <div><p>{item.mins} mins</p></div>
                  <div><button onClick={() => alert(item.customerName)}>Serve</button></div>
                  <div><button>Cancel</button></div>

                </div>
              )
            })
          }
        </div>

        <div className={`${style.pagination_container}`}>
          <div></div>
          <div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "var(--text-primary)",
                  fontSize: "1.4rem",
                },
                "& .Mui-selected": { backgroundColor: "var(--bg-secondary) !important" },
              }}
            />
          </div>
          <div>
            <div>
              <p>Rows Per Page</p>

              <ClickAwayListener onClickAway={() => setSelectOpen(false)}>
                <div className={`${style.select_container}`}>
                  <div onClick={() => setSelectOpen((prev) => !prev)}>
                    <input type="text" value={rowsPerPage} readOnly />
                    <div><DropdownIcon /></div>
                  </div>

                  {
                    selectOpen ? (<ul>
                      {
                        [10, 20, 30, 50].map((item, index) => {
                          return (
                            <li key={item} onClick={() => {
                              setPage(1)
                              SetRowsPerPage(item)
                              setSelectOpen(false)
                            }}
                              style={{
                                background: item === rowsPerPage ? "var(--bg-secondary)" : null,
                                borderBottom: index === [10, 20, 30, 50].length - 1 ? "none" : "0.1rem solid var(--border-secondary)"
                              }}
                            >{item}</li>
                          )
                        })
                      }

                    </ul>) : (null)
                  }
                </div>
              </ClickAwayListener>

            </div>
            <div>
              <p>{startIndex} - {endIndex}{" "} of {totalPages}</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Queue

