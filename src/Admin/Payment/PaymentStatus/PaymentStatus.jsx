// import React, { useEffect, useRef, useState } from 'react'
// import style from './PaymentStatus.module.css'
// import { useSelector } from 'react-redux'
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
// import api from '../../../Redux/api/Api'
// import Skeleton from 'react-loading-skeleton'

// const PaymentStatus = () => {

//     const [paymentStatusdata, setPaymentStatusdata] = useState([])
//     const [paymentStatusLoading, setPaymentStatusLoading] = useState(false)

//     const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//     const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

//     const {
//         loading: adminGetDefaultSalonLoading,
//         resolve: adminGetDefaultSalonResolve,
//         response: adminGetDefaultSalonResponse
//     } = adminGetDefaultSalon

//     const PaymentistControllerRef = useRef(new AbortController());

//     useEffect(() => {
//         if (salonId !== 0) {
//             try {
//                 const controller = new AbortController();
//                 PaymentistControllerRef.current = controller;

//                 const fetchpayments = async () => {
//                     setPaymentStatusLoading(true)
//                     const { data } = await api.post("/api/salon/getSalonPaymentsBySalonId", {
//                         salonId
//                     }, { signal: controller.signal })

//                     setPaymentStatusdata(data.response)
//                     setPaymentStatusLoading(false)
//                 }

//                 fetchpayments()
//             } catch (error) {
//                 setPaymentStatusLoading(false)
//             }
//         }

//         return () => {
//             if (PaymentistControllerRef.current) {
//                 PaymentistControllerRef.current.abort();
//             }
//         };
//     }, [salonId])

//     console.log(paymentStatusdata)

//     const darkMode = useSelector(darkmodeSelector)

//     const darkmodeOn = darkMode === "On"

//     // const paymentStatusdata = [
//     //     {
//     //         _id: 1,
//     //         name: "Appointment",
//     //         price: 300,
//     //         buyDate: "2025-01-01",
//     //         expiryDate: "2025-02-25",
//     //         status: true,
//     //         planValidity: 30
//     //     },
//     //     {
//     //         _id: 2,
//     //         name: "Queueing",
//     //         price: 200,
//     //         buyDate: "2025-01-01",
//     //         expiryDate: "2025-02-25",
//     //         status: false,
//     //         planValidity: 60
//     //     },
//     // ]

//     return (
//         <div className={`${style.payment_status_wrapper} ${darkmodeOn && style.dark}`}>
//             <div>
//                 <p>Payment</p>
//             </div>

//             <div className={`${style.payment_status_content_wrapper} ${darkmodeOn && style.dark}`}>

//                 {
//                     paymentStatusLoading ? (
//                         <div className={`${style.payment_content_body} ${darkmodeOn && style.dark}`}>
//                             <Skeleton
//                                 count={6}
//                                 height={"6rem"}
//                                 baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                                 highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                                 style={{ marginBottom: "1rem" }} />
//                         </div>
//                     ) : paymentStatusdata?.length > 0 ? (
//                         <div className={`${style.payment_content_body} ${darkmodeOn && style.dark}`}>
//                             <div>
//                                 <p>Customer Name</p>
//                                 <p>Product Name</p>
//                                 <p>Price</p>
//                                 <p>Purchase</p>
//                                 <p>Expiry</p>
//                                 <p
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "center",
//                                         alignItems: "center"
//                                     }}
//                                 >Status</p>
//                             </div>



//                             {paymentStatusdata.map((s, index) => (
//                                 <div key={s?._id}
//                                     style={{
//                                         borderBottom: paymentStatusdata.length - 1 === index && "none"
//                                     }}
//                                 >
//                                     <p>{s?.customerName}</p>
//                                     <p>
//                                         {
//                                             (s?.isQueuing && s?.isAppointments) ? ("Queueing, Appointment") :
//                                                 s?.isQueuing ? ("Queueing") :
//                                                     s?.isAppointments && ("Appointments")
//                                         }
//                                     </p>
//                                     <p>{adminGetDefaultSalonResponse?.currency}{" "}{s?.amount}</p>
//                                     <p>{s?.purchaseDate}</p>
//                                     <p>{s?.paymentExpiryDate}</p>
//                                     <p
//                                         style={{
//                                             height: "3.5rem",
//                                             width: "8rem",
//                                             borderRadius: "2rem",
//                                             backgroundColor: s?.activityStatus ? "var(--color-9)" : "var(--color-11)",
//                                             color: s?.activityStatus ? "var(--color-8)" : "var(--color-10)",
//                                             border: s?.activityStatus ? "0.1rem solid var(--color-8)" : "0.1rem solid var(--color-10)",
//                                             fontWeight: "500",
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center"
//                                         }}
//                                     >{s?.activityStatus ? "Active" : "Inactive"}</p>
//                                 </div>
//                             ))}

//                         </div>
//                     ) : (
//                         <div className={`${style.payment_content_body_error} ${darkmodeOn && style.dark}`}>
//                             <p>No payments available</p>
//                         </div>
//                     )
//                 }

//             </div>

//         </div>
//     )
// }

// export default PaymentStatus

import React, { useEffect, useState } from 'react'
import style from "./PaymentStatus.module.css"
import { DropdownIcon, SalonThreeDotsIcon, SortDownIcon, SortUpDownArrowIcon, SortUpIcon } from '../../../newicons';
import { ClickAwayListener, FormControl, MenuItem, Pagination, Select, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from "@emotion/styled";

const PaymentStatus = () => {

  const headRows = [
    { id: 1, heading: "#", key: "" },
    { id: 2, heading: "Product", key: "product" },
    { id: 3, heading: "Purchased", key: "purchased" },
    { id: 4, heading: "Expired", key: "expired" },
    { id: 5, heading: "Price", key: "price" },
    { id: 6, heading: "Transaction ID", key: "transactionid" },
    { id: 7, heading: "Time Period", key: "timeperiod" },
  ];


  const [salonlistData, setSalonlistData] = useState([
    {
      "id": 1,
      "product": "Appointment",
      "purchased": "2023-10-26",
      "expired": "2023-10-26 11:00",
      "price": 50.00,
      "transactionid": "APT12345",
      "timeperiod": "1 hour"
    },
    {
      "id": 2,
      "product": "Queue",
      "purchased": "2023-11-01",
      "expired": "2023-11-01 14:30",
      "price": 10.00,
      "transactionid": "QUE67890",
      "timeperiod": "30 minutes"
    },
    {
      "id": 3,
      "product": "Appointment",
      "purchased": "2023-11-05",
      "expired": "2023-11-05 16:00",
      "price": 75.00,
      "transactionid": "APT13579",
      "timeperiod": "1 hour"
    },
    {
      "id": 4,
      "product": "Queue",
      "purchased": "2023-11-08",
      "expired": "2023-11-08 09:15",
      "price": 15.00,
      "transactionid": "QUE24680",
      "timeperiod": "45 minutes"
    },
    {
      "id": 5,
      "product": "Appointment",
      "purchased": "2023-11-10",
      "expired": "2023-11-10 13:30",
      "price": 60.00,
      "transactionid": "APT98765",
      "timeperiod": "1 hour"
    },
    {
      "id": 6,
      "product": "Queue",
      "purchased": "2023-11-12",
      "expired": "2023-11-12 11:45",
      "price": 20.00,
      "transactionid": "QUE45678",
      "timeperiod": "1 hour"
    },
    {
      "id": 7,
      "product": "Appointment",
      "purchased": "2023-11-15",
      "expired": "2023-11-15 15:00",
      "price": 80.00,
      "transactionid": "APT11223",
      "timeperiod": "1 hour"
    },
    {
      "id": 8,
      "product": "Queue",
      "purchased": "2023-11-18",
      "expired": "2023-11-18 10:30",
      "price": 12.00,
      "transactionid": "QUE33445",
      "timeperiod": "30 minutes"
    },
    {
      "id": 9,
      "product": "Appointment",
      "purchased": "2023-11-20",
      "expired": "2023-11-20 14:00",
      "price": 70.00,
      "transactionid": "APT55667",
      "timeperiod": "1 hour"
    },
    {
      "id": 10,
      "product": "Queue",
      "purchased": "2023-11-22",
      "expired": "2023-11-22 12:15",
      "price": 18.00,
      "transactionid": "QUE77889",
      "timeperiod": "45 minutes"
    },
    {
      "id": 11,
      "product": "Appointment",
      "purchased": "2023-11-25",
      "expired": "2023-11-25 16:30",
      "price": 65.00,
      "transactionid": "APT99001",
      "timeperiod": "1 hour"
    },
    {
      "id": 12,
      "product": "Queue",
      "purchased": "2023-11-28",
      "expired": "2023-11-28 09:45",
      "price": 22.00,
      "transactionid": "QUE22334",
      "timeperiod": "1 hour"
    },
    {
      "id": 13,
      "product": "Appointment",
      "purchased": "2023-11-30",
      "expired": "2023-11-30 13:00",
      "price": 85.00,
      "transactionid": "APT44556",
      "timeperiod": "1 hour"
    },
    {
      "id": 14,
      "product": "Queue",
      "purchased": "2023-12-02",
      "expired": "2023-12-02 11:15",
      "price": 14.00,
      "transactionid": "QUE66778",
      "timeperiod": "30 minutes"
    },
    {
      "id": 15,
      "product": "Appointment",
      "purchased": "2023-12-05",
      "expired": "2023-12-05 15:30",
      "price": 72.00,
      "transactionid": "APT88990",
      "timeperiod": "1 hour"
    },
    {
      "id": 16,
      "product": "Queue",
      "purchased": "2023-12-08",
      "expired": "2023-12-08 10:00",
      "price": 16.00,
      "transactionid": "QUE10112",
      "timeperiod": "45 minutes"
    },
    {
      "id": 17,
      "product": "Appointment",
      "purchased": "2023-12-11",
      "expired": "2023-12-11 14:30",
      "price": 78.00,
      "transactionid": "APT13141",
      "timeperiod": "1 hour"
    },
    {
      "id": 18,
      "product": "Queue",
      "purchased": "2023-12-14",
      "expired": "2023-12-14 12:45",
      "price": 24.00,
      "transactionid": "QUE15161",
      "timeperiod": "1 hour"
    },
    {
      "id": 19,
      "product": "Appointment",
      "purchased": "2023-12-17",
      "expired": "2023-12-17 16:00",
      "price": 68.00,
      "transactionid": "APT17181",
      "timeperiod": "1 hour"
    },
    {
      "id": 20,
      "product": "Queue",
      "purchased": "2023-12-20",
      "expired": "2023-12-20 09:30",
      "price": 26.00,
      "transactionid": "QUE19201",
      "timeperiod": "30 minutes"
    }
  ])

  const [settingsIndex, setSettingsIndex] = useState("")

  const [rowsPerPage, SetRowsPerPage] = useState(10)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(rowsPerPage)
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortColumn, setSortColumn] = useState("")

  const [salonPaginationData, setSalonPaginationData] = useState(salonlistData.slice(startIndex, endIndex))

  useEffect(() => {
    const totalPages = Math.ceil(salonlistData.length / rowsPerPage);
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


  const [selectOpen, setSelectOpen] = useState(false)

  const navigate = useNavigate()


  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Payment History</h2>
        {/* <button onClick={() => navigate("/admin-salon/createsalon")}>Create</button> */}
      </div>

      <div className={`${style.list_container}`}>

        <div className={`${style.list_body_container}`}>

          <div className={`${style.headRow}`}>
            {
              headRows.map((item, index) => {
                return (
                  <div key={item.id}>
                    <button>
                      {item.heading}
                    </button>
                  </div>
                )
              })
            }

          </div>

          {
            salonPaginationData.map((item, index) => {
              return (
                <div key={item.id} style={{ borderBottom: (index === endIndex - 1) || (index === salonPaginationData.length - 1) ? null : "0.1rem solid var(--border-secondary)" }}>
                  <div><p>{item.id}</p></div>
                  <div><p>{item.product}</p></div>
                  <div><p>{item.purchased}</p></div>
                  <div><p>{item.expired}</p></div>
                  <div><p>$ {item.price}</p></div>
                  <div><p>{item.transactionid}</p></div>
                  <div><p>{item.timeperiod}</p></div>

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

export default PaymentStatus

