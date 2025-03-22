// import React, { useEffect, useRef, useState } from 'react'
// import style from "./QueHistory.module.css"
// import Skeleton from 'react-loading-skeleton'
// import { useDispatch, useSelector } from 'react-redux'
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
// import { CheckIcon, CloseIcon, CrownIcon, SearchIcon } from '../../icons'
// import { getAdminQueueListHistoryAction } from '../../Redux/Admin/Actions/QueueAction'

// const QueHistory = () => {

//     const darkMode = useSelector(darkmodeSelector)

//     const darkmodeOn = darkMode === "On"

//     const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//     const dispatch = useDispatch()

//     const queuelistcontrollerRef = useRef(new AbortController());

//     useEffect(() => {
//         const controller = new AbortController();
//         queuelistcontrollerRef.current = controller;

//         dispatch(getAdminQueueListHistoryAction(salonId, controller.signal));

//         return () => {
//             if (queuelistcontrollerRef.current) {
//                 queuelistcontrollerRef.current.abort();
//             }
//         };
//     }, [salonId, dispatch]);


//     const getAdminQueueListHistory = useSelector(state => state.getAdminQueueListHistory)

//     const {
//         loading: getAdminQueueListHistoryLoading,
//         resolve: getAdminQueueListHistoryResolve,
//         queueListHistory: AdminQueueListHistory
//     } = getAdminQueueListHistory

//     const [copyAdminQueueHistory, setCopyAdminQueueHistory] = useState([])

//     useEffect(() => {
//         if (AdminQueueListHistory) {
//             setCopyAdminQueueHistory(AdminQueueListHistory)
//         }
//     }, [AdminQueueListHistory])

//     const [search, setSearch] = useState('')

//     const searchCustomHandler = (value) => {
//         setSearch(value);
//         const searchValue = value.toLowerCase().trim();

//         if (!searchValue) {
//             setCopyAdminQueueHistory(AdminQueueListHistory);
//         } else {
//             const filteredArray = AdminQueueListHistory?.filter((queue) => {
//                 return (
//                     queue.barberName.toLowerCase().includes(searchValue) ||
//                     queue.customerName.toLowerCase().includes(searchValue)
//                 )
//             });
//             setCopyAdminQueueHistory(filteredArray);
//         }
//     };


//     const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

//     const {
//       response: adminGetDefaultSalonResponse
//     } = adminGetDefaultSalon

//     return (
//         <div className={`${style.quehistory_wrapper} ${darkmodeOn && style.dark}`}>
//             <div>
//                 <p>Queue History</p>

//                 <div className={`${style.customer_search} ${darkmodeOn && style.dark}`}>
//                     <input
//                         type="text"
//                         placeholder='Search Queue'
//                         value={search}
//                         onChange={(e) => searchCustomHandler(e.target.value)}
//                     />

//                     <div><SearchIcon /></div>
//                 </div>

//             </div>

//             <div className={`${style.quehistory_wrapper_content}`}>

//                 {
//                     getAdminQueueListHistoryLoading ? (<div className={style.quehistory_wrapper_content_body}>
//                         <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }}
//                             baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                             highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
//                     </div>) :
//                         getAdminQueueListHistoryResolve && copyAdminQueueHistory?.length > 0 ? (
//                             <>
//                                 <div className={`${style.quehistory_wrapper_content_body} ${darkmodeOn && style.dark}`}>
//                                     <div>
//                                         <p>#</p>
//                                         <p>Name</p>
//                                         <p>Barber Name</p>
//                                         <p>Time Joined Q</p>
//                                         <div><p>Qg Code</p></div>
//                                         <div><p>EWT</p></div>
//                                         <div><p>Price</p></div>
//                                         <div><p>Type</p></div>
//                                         <div><p>isAdmin</p></div>
//                                         <div><p>Status</p></div>
//                                     </div>

//                                     {copyAdminQueueHistory?.map((b, index) => (
//                                         <div
//                                             className={`${style.barber_queue_history_content_body_item} ${darkmodeOn && style.dark}`}
//                                             key={b?._id}
//                                             style={{
//                                                 borderBottom: copyAdminQueueHistory.length - 1 === index && "none"
//                                             }}
//                                         >
//                                             <p>{b?.qPosition}</p>
//                                             <p>{b?.customerName}</p>
//                                             <p>{b?.barberName}</p>
//                                             <p>{b?.timeJoinedQ}</p>
//                                             <div><p>{b?.qgCode}</p></div>
//                                             <div><p>{b?.serviceEWT} mins</p></div>
//                                             <div><p>{adminGetDefaultSalon?.response?.currency}{" "}{b?.services.reduce((sum, service) => sum + service.servicePrice, 0)}</p></div>
//                                             <div><p>{b?.serviceType === "Regular" ? "-" : <CrownIcon />}</p></div>
//                                             <div>
//                                                 {
//                                                     b?.isAdmin ? (<p style={{ color: "green" }}><CheckIcon /></p>) : (<p style={{ fontSize: "2rem", fontWeight: "700", color: "red" }}><CloseIcon /></p>)
//                                                 }
//                                             </div>
//                                             <div><p style={{ color: b?.status == "served" ? "green" : "red" }}>{b?.status}</p></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         ) : (
//                             <div className={`${style.quehistory_wrapper_content_body_error} ${darkmodeOn && style.dark}`}>
//                                 <p>No Queue history available</p>
//                             </div>
//                         )
//                 }

//             </div>
//         </div>
//     )
// }

// export default QueHistory


import React, { useEffect, useRef, useState } from 'react'
import style from "./QueHistory.module.css"
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { CheckIcon, CloseIcon, DropdownIcon } from '../../newicons';
import { getAdminQueueListHistoryAction } from '../../Redux/Admin/Actions/QueueAction'
import { ClickAwayListener, Pagination } from '@mui/material'

const QueHistory = () => {

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

    const dispatch = useDispatch()

    const queuelistcontrollerRef = useRef(new AbortController());

    useEffect(() => {
        const controller = new AbortController();
        queuelistcontrollerRef.current = controller;

        dispatch(getAdminQueueListHistoryAction(salonId, controller.signal));

        return () => {
            if (queuelistcontrollerRef.current) {
                queuelistcontrollerRef.current.abort();
            }
        };
    }, [salonId, dispatch]);


    const getAdminQueueListHistory = useSelector(state => state.getAdminQueueListHistory)

    const {
        loading: getAdminQueueListHistoryLoading,
        resolve: getAdminQueueListHistoryResolve,
        queueListHistory: AdminQueueListHistory
    } = getAdminQueueListHistory

    const [copyAdminQueueHistory, setCopyAdminQueueHistory] = useState([])

    useEffect(() => {
        if (AdminQueueListHistory) {
            setCopyAdminQueueHistory(AdminQueueListHistory)
        }
    }, [AdminQueueListHistory])

    const [search, setSearch] = useState('')

    const searchCustomHandler = (value) => {
        setSearch(value);
        const searchValue = value.toLowerCase().trim();

        if (!searchValue) {
            setCopyAdminQueueHistory(AdminQueueListHistory);
        } else {
            const filteredArray = AdminQueueListHistory?.filter((queue) => {
                return (
                    queue.barberName.toLowerCase().includes(searchValue) ||
                    queue.customerName.toLowerCase().includes(searchValue)
                )
            });
            setCopyAdminQueueHistory(filteredArray);
        }
    };


    const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

    const {
        response: adminGetDefaultSalonResponse
    } = adminGetDefaultSalon

    // console.log(adminGetDefaultSalonResponse)

    // ==========================================================

    const headRows = [
        { id: 1, heading: "#", key: "qpos" },
        { id: 2, heading: "Name", key: "customerName" },
        { id: 3, heading: "Barber Name", key: "barberName" },
        { id: 4, heading: "Time Joined", key: "timejoined" },
        { id: 5, heading: "Qg Code", key: "qgcode" },
        { id: 6, heading: "Price", key: "price" },
        { id: 7, heading: "Type", key: "type" },
        { id: 8, heading: "Est. Time", key: "estimatedtime" },
        { id: 9, heading: "isAdmin", key: "isAdmin" },
        { id: 10, heading: "Status", key: "status" },
    ];

    const [queuehistoryDataCopy, setQueuehistoryDataCopy] = useState([])

    const [queuehistoryData, setQueuehistoryData] = useState([
        {
            "customerName": "John Doe",
            "gender": "Male",
            "email": "john.doe@example.com",
            "dob": "1990-05-15",
            "mobile": "123-456-7890",
            "barberName": "Mike Johnson",
            "qPos": 1,
            "mins": 30,
            "customerImage": "https://i.pravatar.cc/150?img=1",
            "timeJoined": "10:00 AM",
            "qgCode": "QG001",
            "type": "Regular",
            "estimatedTime": "10:30 AM",
            "price": "30 EUR",
            "isAdmin": false,
            "status": "served"
        },
        {
            "customerName": "Emma Smith",
            "gender": "Female",
            "email": "emma.smith@example.com",
            "dob": "1995-08-22",
            "mobile": "987-654-3210",
            "barberName": "David Thompson",
            "qPos": 2,
            "mins": 40,
            "customerImage": "https://i.pravatar.cc/150?img=2",
            "timeJoined": "10:05 AM",
            "qgCode": "QG002",
            "type": "Premium",
            "estimatedTime": "10:45 AM",
            "price": "50 EUR",
            "isAdmin": true,
            "status": "cancelled"
        },
        {
            "customerName": "Liam Johnson",
            "gender": "Male",
            "email": "liam.johnson@example.com",
            "dob": "1988-11-30",
            "mobile": "456-789-0123",
            "barberName": "Chris Williams",
            "qPos": 3,
            "mins": 35,
            "customerImage": "https://i.pravatar.cc/150?img=3",
            "timeJoined": "10:10 AM",
            "qgCode": "QG003",
            "type": "Regular",
            "estimatedTime": "10:45 AM",
            "price": "35 EUR",
            "isAdmin": false,
            "status": "served"
        },
        {
            "customerName": "Sophia Brown",
            "gender": "Female",
            "email": "sophia.brown@example.com",
            "dob": "1992-03-25",
            "mobile": "321-654-0987",
            "barberName": "Alex Martinez",
            "qPos": 4,
            "mins": 45,
            "customerImage": "https://i.pravatar.cc/150?img=4",
            "timeJoined": "10:15 AM",
            "qgCode": "QG004",
            "type": "VIP",
            "estimatedTime": "11:00 AM",
            "price": "60 EUR",
            "isAdmin": true,
            "status": "cancelled"
        },
        {
            "customerName": "Noah Wilson",
            "gender": "Male",
            "email": "noah.wilson@example.com",
            "dob": "2000-07-10",
            "mobile": "789-123-4560",
            "barberName": "James Anderson",
            "qPos": 5,
            "mins": 25,
            "customerImage": "https://i.pravatar.cc/150?img=5",
            "timeJoined": "10:20 AM",
            "qgCode": "QG005",
            "type": "Regular",
            "estimatedTime": "10:45 AM",
            "price": "25 EUR",
            "isAdmin": false,
            "status": "served"
        },
        {
            "customerName": "Olivia Martinez",
            "gender": "Female",
            "email": "olivia.martinez@example.com",
            "dob": "1985-12-19",
            "mobile": "654-321-7890",
            "barberName": "Brian Davis",
            "qPos": 6,
            "mins": 50,
            "customerImage": "https://i.pravatar.cc/150?img=6",
            "timeJoined": "10:25 AM",
            "qgCode": "QG006",
            "type": "Premium",
            "estimatedTime": "11:15 AM",
            "price": "55 EUR",
            "isAdmin": true,
            "status": "served"
        },
        {
            "customerName": "William Davis",
            "gender": "Male",
            "email": "william.davis@example.com",
            "dob": "1998-09-05",
            "mobile": "147-258-3690",
            "barberName": "John Rodriguez",
            "qPos": 7,
            "mins": 30,
            "customerImage": "https://i.pravatar.cc/150?img=7",
            "timeJoined": "10:30 AM",
            "qgCode": "QG007",
            "type": "Regular",
            "estimatedTime": "11:00 AM",
            "price": "30 EUR",
            "isAdmin": false,
            "status": "cancelled"
        },
        {
            "customerName": "Ava Garcia",
            "gender": "Female",
            "email": "ava.garcia@example.com",
            "dob": "1993-04-14",
            "mobile": "369-147-2580",
            "barberName": "Ryan Clark",
            "qPos": 8,
            "mins": 40,
            "customerImage": "https://i.pravatar.cc/150?img=8",
            "timeJoined": "10:35 AM",
            "qgCode": "QG008",
            "type": "VIP",
            "estimatedTime": "11:20 AM",
            "price": "45 EUR",
            "isAdmin": true,
            "status": "served"
        },
        {
            "customerName": "James Rodriguez",
            "gender": "Male",
            "email": "james.rodriguez@example.com",
            "dob": "1996-06-21",
            "mobile": "852-963-7410",
            "barberName": "Ethan Scott",
            "qPos": 9,
            "mins": 20,
            "customerImage": "https://i.pravatar.cc/150?img=9",
            "timeJoined": "10:40 AM",
            "qgCode": "QG009",
            "type": "Regular",
            "estimatedTime": "11:00 AM",
            "price": "20 EUR",
            "isAdmin": false,
            "status": "cancelled"
        }
    ]
    )

    useEffect(() => {
        if (getAdminQueueListHistoryResolve && AdminQueueListHistory.length > 0) {
            setQueuehistoryData(AdminQueueListHistory)
            setQueuehistoryDataCopy(AdminQueueListHistory)
        }

    }, [AdminQueueListHistory])

    const [settingsIndex, setSettingsIndex] = useState("")

    const [rowsPerPage, SetRowsPerPage] = useState(10)

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(rowsPerPage)
    const [sortOrder, setSortOrder] = useState("asc")
    const [sortColumn, setSortColumn] = useState("")
    const [query, setQuery] = useState("")

    const [queueHistoryPaginationData, setQueueHistoryPaginationData] = useState([])


    useEffect(() => {
        if (queuehistoryData.length > 0) {
            setQueueHistoryPaginationData(queuehistoryData.slice(startIndex, endIndex))
        }
    }, [queuehistoryData])

    useEffect(() => {
        const totalPages = Math.ceil(queuehistoryData.length / rowsPerPage); // Calculate based on filtered data
        setTotalPages(totalPages);

        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, queuehistoryData.length);

        setStartIndex(startIndex);
        setEndIndex(endIndex);
        setQueueHistoryPaginationData(queuehistoryData.slice(startIndex, endIndex));
    }, [queuehistoryData, page, rowsPerPage]);


    const handleChange = (event, value) => {
        setPage(value);
    }


    useEffect(() => {
        let filteredData = queuehistoryDataCopy;

        if (query.trim() !== '') {
            filteredData = queuehistoryDataCopy.filter((item) =>
                item.customerName.toLowerCase().trim().includes(query.toLowerCase())
            );
        }

        setQueuehistoryData(filteredData);
        setPage(1); // Reset page on filter
    }, [query]);

    const [selectOpen, setSelectOpen] = useState(false)


    return (
        <section className={`${style.section}`}>
            <div>
                <h2>Queue History</h2>
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

                {
                    getAdminQueueListHistoryLoading ? (
                        <div className={`${style.list_body_container_loader}`}>
                            <Skeleton
                                count={6}
                                height={"6.5rem"}
                                baseColor={!darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={!darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                                style={{ marginBottom: "1rem" }} />
                        </div>
                    ) : getAdminQueueListHistoryResolve && AdminQueueListHistory.length > 0 ? (
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
                                queueHistoryPaginationData.map((item, index) => {
                                    return (
                                        <div key={item._id} style={{ borderBottom: (index === endIndex - 1) || (index === queueHistoryPaginationData.length - 1) ? null : "0.1rem solid var(--border-secondary)" }}>
                                            <div><p>{item.qPosition === 1 ? "Next" : item.qPosition}</p></div>
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
                                            <div><p>{item.timeJoinedQ}</p></div>
                                            <div><p>{item.qgCode}</p></div>
                                            {/* <div><p>{adminGetDefaultSalon?.response?.currency}{" "}{item?.services.reduce((sum, service) => sum + service?.servicePrice, 0)}</p></div> */}
                                            <div><p>{adminGetDefaultSalon?.response?.currency}{" "}{Array.isArray(item?.services)
                                                ? item.services.reduce((sum, service) => sum + (service.servicePrice || 0), 0)
                                                : 0}</p></div>
                                            <div><p>{item.serviceType}</p></div>
                                            <div><p>{item.serviceEWT} mins</p></div>
                                            <div><span>{item?.isAdmin ? (<CheckIcon color={"green"} />) : (<CloseIcon color={"var(--bg-secondary)"} />)}</span></div>
                                            <div><p style={{
                                                color: item.status === "served" ? "green" : "var(--bg-secondary)"
                                            }}>{item.status}</p></div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className={`${style.list_body_container_error}`}>
                            <p>No queue history available</p>
                        </div>
                    )
                }


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

        </section >
    )
}

export default QueHistory

