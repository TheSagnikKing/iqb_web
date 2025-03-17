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
      id: 1,
      name: "Glamour Lounge",
      logo: "https://images.pexels.com/photos/1068852/pexels-photo-1068852.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Sector 18, Noida",
      city: "Noida",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Offline",
    },
    {
      id: 2,
      name: "Elegant Cuts",
      logo: "https://images.pexels.com/photos/1579251/pexels-photo-1579251.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Park Street, Kolkata",
      city: "Kolkata",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 3,
      name: "Urban Styles",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Brigade Road, Bangalore",
      city: "Bangalore",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 4,
      name: "Chic Hair Studio",
      logo: "https://images.pexels.com/photos/906048/pexels-photo-906048.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Connaught Place, Delhi",
      city: "Delhi",
      type: "Barber Shop",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 5,
      name: "Royal Touch",
      logo: "https://images.pexels.com/photos/1579251/pexels-photo-1579251.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Baner, Pune",
      city: "Pune",
      type: "Hair Dresser",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 6,
      name: "Classic Makeovers",
      logo: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Juhu, Mumbai",
      city: "Mumbai",
      type: "Barber Shop",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 7,
      name: "Trendy Tresses",
      logo: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Anna Nagar, Chennai",
      city: "Chennai",
      type: "Hair Dresser",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 8,
      name: "Velvet Touch",
      logo: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Sector 18, Noida",
      city: "Noida",
      type: "Barber Shop",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 9,
      name: "Golden Scissors",
      logo: "https://images.pexels.com/photos/1070857/pexels-photo-1070857.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "South Extension, Delhi",
      city: "Delhi",
      type: "Hair Dresser",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 10,
      name: "Beauty Bliss",
      logo: "https://images.pexels.com/photos/906051/pexels-photo-906051.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Banjara Hills, Hyderabad",
      city: "Hyderabad",
      type: "Barber Shop",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 11,
      name: "Dazzle Salon",
      logo: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Thane, Mumbai",
      city: "Mumbai",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 12,
      name: "Glossy Hair Hub",
      logo: "https://images.pexels.com/photos/1128319/pexels-photo-1128319.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Gomti Nagar, Lucknow",
      city: "Lucknow",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 13,
      name: "Fashion Fiesta",
      logo: "https://images.pexels.com/photos/1579250/pexels-photo-1579250.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Karol Bagh, Delhi",
      city: "Delhi",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 14,
      name: "Glow & Shine",
      logo: "https://images.pexels.com/photos/1126992/pexels-photo-1126992.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Indiranagar, Bangalore",
      city: "Bangalore",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 15,
      name: "Elite Makeovers",
      logo: "https://images.pexels.com/photos/1579252/pexels-photo-1579252.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Powai, Mumbai",
      city: "Mumbai",
      type: "Hair Dresser",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 16,
      name: "Stylish Cuts",
      logo: "https://images.pexels.com/photos/1128320/pexels-photo-1128320.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Salt Lake, Kolkata",
      city: "Kolkata",
      type: "Barber Shop",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 17,
      name: "Scissor Magic",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Gariahat, Kolkata",
      city: "Kolkata",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 18,
      name: "Snip & Style",
      logo: "https://images.pexels.com/photos/906048/pexels-photo-906048.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Koramangala, Bangalore",
      city: "Bangalore",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 19,
      name: "Sharp Edge Salon",
      logo: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "MG Road, Pune",
      city: "Pune",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 20,
      name: "The Barber’s Den",
      logo: "https://images.pexels.com/photos/1070857/pexels-photo-1070857.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Bandra, Mumbai",
      city: "Mumbai",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 21,
      name: "Crown & Comb",
      logo: "https://images.pexels.com/photos/1579251/pexels-photo-1579251.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "T Nagar, Chennai",
      city: "Chennai",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 22,
      name: "Style Station",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Sector 50, Gurgaon",
      city: "Gurgaon",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 23,
      name: "The Grooming Hub",
      logo: "https://images.pexels.com/photos/906048/pexels-photo-906048.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Dadar, Mumbai",
      city: "Mumbai",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 24,
      name: "The Hair Affair",
      logo: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "DLF Phase 2, Gurgaon",
      city: "Gurgaon",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 25,
      name: "Men’s Hair Lounge",
      logo: "https://images.pexels.com/photos/1579251/pexels-photo-1579251.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Whitefield, Bangalore",
      city: "Bangalore",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 26,
      name: "Shear Elegance",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Garia, Kolkata",
      city: "Kolkata",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 27,
      name: "Majestic Cuts",
      logo: "https://images.pexels.com/photos/906048/pexels-photo-906048.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Hitech City, Hyderabad",
      city: "Hyderabad",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 28,
      name: "Gents Corner",
      logo: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Lajpat Nagar, Delhi",
      city: "Delhi",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 29,
      name: "Royal Shaves",
      logo: "https://images.pexels.com/photos/1579251/pexels-photo-1579251.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Jubilee Hills, Hyderabad",
      city: "Hyderabad",
      type: "Hair Dresser",
      subscription: "Active",
      status: "Online",
    },
    {
      id: 30,
      name: "Gentleman’s Choice",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Ballygunge, Kolkata",
      city: "Kolkata",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 31,
      name: "Gentleman’s Choice",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Ballygunge, Kolkata",
      city: "Kolkata",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
    },
    {
      id: 32,
      name: "Gentleman’s Choice",
      logo: "https://images.pexels.com/photos/1070861/pexels-photo-1070861.jpeg?auto=compress&cs=tinysrgb&w=600",
      address: "Ballygunge, Kolkata",
      city: "Kolkata",
      type: "Barber Shop",
      subscription: "Inactive",
      status: "Offline",
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

  const sortFunction = (columnKey) => {
    setSortOrder((prev) => (sortColumn === columnKey && prev === 'asc' ? 'desc' : 'asc'));
    setSortColumn(columnKey);
  };

  useEffect(() => {
    if (!sortColumn) return;

    const sortedList = [...salonlistData].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });

    setSalonlistData(sortedList);
    // setPage(1); 
  }, [sortColumn, sortOrder]);

  const [selectOpen, setSelectOpen] = useState(false)

  const navigate = useNavigate()


  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Payment History</h2>
        <button onClick={() => navigate("/admin-salon/createsalon")}>Create</button>
      </div>

      <div className={`${style.list_container}`}>

        <div className={`${style.list_body_container}`}>

          <div className={`${style.headRow}`}>
            {
              headRows.map((item, index) => {
                return (
                  <div key={item.id}>
                    <button
                      className={`${item.key === "name" ? style.name_head_btn : ""}`}
                      onClick={() => sortFunction(item.key)}>
                      {item.key === "name" ? (
                        <>
                          <span></span>
                          {item.heading}
                        </>
                      ) : (
                        item.heading
                      )}

                      <span>{item.key && (sortColumn === item.key ? (sortOrder === 'asc' ? <SortUpIcon /> : <SortDownIcon />) : <SortUpDownArrowIcon />)}</span>
                    </button>
                  </div>
                )
              })
            }

          </div>

          {
            salonPaginationData.map((item, index) => {
              return (
                <div key={item.id} style={{ borderBottom: (index === endIndex - 1) || (index === salonlistData.length - 1) ? null : "0.1rem solid var(--border-secondary)" }}>
                  <div><p>{item.id}</p></div>
                  <div>
                    <div>
                      <div><img src={item.logo} alt="" /></div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <div><p>{item.address}</p></div>
                  <div><p>{item.city}</p></div>
                  <div><p>{item.type}</p></div>
                  <div><p>{item.subscription}</p></div>
                  <div><button style={{
                    backgroundColor: item.status === "Online" ? "#052E16" : "#450a0a"
                  }}>{item.status === "Online" ? "Online" : "Offline"}</button></div>
                  <div>
                    <div
                      style={{
                        position: settingsIndex === index ? "relative" : "initial",
                        backgroundColor: settingsIndex === index ? "var(--btn-primary-hover)" : null,
                        borderRadius: settingsIndex === index ? "var(--border-radius-primary)" : null,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSettingsIndex(index);
                      }}>
                      <SalonThreeDotsIcon />

                      {
                        settingsIndex === index && (
                          <ClickAwayListener onClickAway={() => setSettingsIndex(null)}>
                            <div
                              style={{
                                position: "absolute",
                                zIndex: settingsIndex === index ? 9999 : -100,
                              }}
                              className={`${style.settings_container}`}>
                              <p><Link to="#"
                              onClick={() => alert("")}
                              >Appointment settings</Link></p>
                              <p><Link to="/admin-salon/editsalon/:salonid">Edit Salon</Link></p>
                            </div>
                          </ClickAwayListener>)
                      }

                    </div>

                  </div>

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

