// import React, { useEffect, useRef, useState } from 'react'
// import style from "./BarberList.module.css"
// import { useNavigate } from 'react-router-dom'
// import { EmailIcon, MessageIcon, CloseIcon } from '../../../icons'
// import Skeleton from 'react-loading-skeleton'
// import { useDispatch, useSelector } from 'react-redux'
// import { adminApproveBarberAction, adminDeleteBarberAction, adminSendBarberEmailAction, adminSendBarberMessageAction, changeAdminBarberClockStatusAction, changeAdminBarberOnlineStatusAction, getAdminBarberListAction } from '../../../Redux/Admin/Actions/BarberAction'
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
// import toast from 'react-hot-toast'
// import { Modal } from '@mui/material';
// import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

// const BarberList = () => {

//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//   const getAdminBarberList = useSelector(state => state.getAdminBarberList)

//   const {
//     loading: getAdminBarberListLoading,
//     resolve: getAdminBarberListResolve,
//     getAllBarbers: BarberList
//   } = getAdminBarberList

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const createbarberClicked = () => {
//     navigate("/admin-barber/createbarber")
//   }

//   const editButtonClicked = (barber) => {
//     navigate(`/admin-barber/editbarber/${barber.salonId}`, { state: barber })
//   }

//   const deleteButtonClicked = (barber) => {
//     const confirm = window.confirm("Are you sure ?")
//     if (confirm) {
//       dispatch(adminDeleteBarberAction(barber.salonId, barber.email, barber))
//     }
//   }

//   useEffect(() => {
//     if (BarberList && BarberList.length > 0) {
//       const initialCheckMap = new Map();
//       BarberList.forEach(barber => {
//         const key = `${barber.salonId}-${barber.barberId}`;
//         initialCheckMap.set(key, barber.isOnline || false);
//       });
//       setCheckMap(initialCheckMap);

//       const initialCheckMapClock = new Map();
//       BarberList.forEach(barber => {
//         const key = `${barber.salonId}-${barber.barberId}`;
//         initialCheckMapClock.set(key, barber.isClockedIn || false);
//       });
//       setCheckMapClock(initialCheckMapClock);
//     }
//   }, [BarberList]);

//   const [checkMap, setCheckMap] = useState(new Map());

//   const toggleHandler = (b) => {
//     setCheckMap(prevCheckMap => {
//       const newCheckMap = new Map(prevCheckMap);
//       const key = `${b.salonId}-${b.barberId}`;
//       const newIsOnline = !newCheckMap.get(key) || false; // Toggle the value
//       newCheckMap.set(key, newIsOnline);
//       return newCheckMap;
//     });

//     const barberOnlineData = {
//       barberId: b.barberId,
//       salonId: b.salonId,
//       isOnline: !checkMap?.get(`${b.salonId}-${b.barberId}`) || false
//     };

//     dispatch(changeAdminBarberOnlineStatusAction(barberOnlineData, setCheckMap, b, checkMap?.get(`${b.salonId}-${b.barberId}`)));
//   }

//   const [checkMapClock, setCheckMapClock] = useState(new Map())

//   const toggleClockHandler = (b) => {
//     setCheckMapClock(prevCheckMapClock => {
//       const newCheckMapClock = new Map(prevCheckMapClock);
//       const key = `${b.salonId}-${b.barberId}`;
//       const newIsClock = !newCheckMapClock.get(key) || false; // Toggle the value
//       newCheckMapClock.set(key, newIsClock);
//       return newCheckMapClock;
//     });

//     const barberClockData = {
//       barberId: b.barberId,
//       salonId: b.salonId,
//       isClockedIn: !checkMapClock?.get(`${b.salonId}-${b.barberId}`) || false
//     };

//     dispatch(changeAdminBarberClockStatusAction(barberClockData, setCheckMapClock, b, checkMapClock?.get(`${b.salonId}-${b.barberId}`), setCheckMap));
//   }


//   const BarberListcontrollerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     BarberListcontrollerRef.current = controller;

//     dispatch(getAdminBarberListAction(salonId, controller.signal));

//     return () => {
//       if (BarberListcontrollerRef.current) {
//         BarberListcontrollerRef.current.abort();
//       }
//     };
//   }, [salonId, dispatch]);



//   const [approveBarberMap, setApproveBarberMap] = useState(new Map());

//   useEffect(() => {
//     if (BarberList) {
//       const initialCheckMap = new Map();
//       BarberList.forEach(barber => {
//         const key = `${barber.salonId}-${barber.email}`;
//         initialCheckMap.set(key, barber.isApproved || false);
//       });
//       setApproveBarberMap(initialCheckMap);
//     }
//   }, [BarberList]);

//   const approveHandler = (b) => {

//     setApproveBarberMap((prevCheckMap) => {
//       const newCheckMap = new Map(prevCheckMap);
//       const key = `${b.salonId}-${b.email}`;
//       const newIsApprove = !newCheckMap.get(key) || false; // Toggle the value
//       newCheckMap.set(key, newIsApprove);
//       return newCheckMap;
//     });

//     const approvedata = {
//       salonId: b.salonId,
//       email: b.email,
//       isApproved: !approveBarberMap?.get(`${b.salonId}-${b.email}`) || false
//     };

//     dispatch(adminApproveBarberAction(approvedata, setApproveBarberMap, b, approveBarberMap?.get(`${b.salonId}-${b.email}`), setCheckMap, setCheckMapClock))
//   }

//   const adminApproveBarber = useSelector(state => state.adminApproveBarber)

//   const {
//     loading: adminApproveBarberLoading,
//     resolve: adminApproveBarberResolve,
//     response: approvebarber
//   } = adminApproveBarber

//   const [allCheckbox, setAllCheckbox] = useState(false)

//   const selectAllBarbers = () => {
//     setAllCheckbox((prev) => {
//       const newCheckboxState = !prev;

//       if (newCheckboxState) {
//         setSelectedAllBarberNotification(BarberList.map((b) => b.email));
//       } else {
//         setSelectedAllBarberNotification([]);
//       }

//       return newCheckboxState;
//     });
//   };

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   const [checkAllBarbers, setCheckAllBarbers] = useState(false)
//   const [checkedBarbers, setCheckedBarbers] = useState({});
//   const [checkedEmails, setCheckedEmails] = useState([]);
//   const [checkMobileNumbers, setCheckMobileNumber] = useState([])
//   const [checkBarberNames, setCheckBarberNames] = useState([])

//   const barberEmailCheckedHandler = (barber) => {
//     const isChecked = !checkedBarbers[barber._id];
//     setCheckedBarbers(prevState => ({
//       ...prevState,
//       [barber._id]: isChecked,
//     }));

//     if (isChecked) {
//       setCheckedEmails(prevEmails => [...prevEmails, barber.email]);
//       setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, Number(`${barber?.mobileCountryCode}${barber?.mobileNumber}`)]);
//       setCheckBarberNames(prevNames => [...prevNames, barber.name])
//       setCheckAllBarbers(false)
//     } else {
//       setCheckedEmails(prevEmails => prevEmails.filter(email => email !== barber.email));
//       setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== Number(`${barber?.mobileCountryCode}${barber?.mobileNumber}`)));
//       setCheckBarberNames(prevNames => prevNames.filter(name => name !== barber.name))
//       setCheckAllBarbers(false)
//     }
//   };

//   const checkAllBarbersHandler = (e) => {
//     setCheckAllBarbers((prev) => {
//       if (!prev) {
//         const barberEmails = BarberList.map((b) => b.email)
//         const barberMobileNumbers = BarberList.map((b) => Number(`${b?.mobileCountryCode}${b?.mobileNumber}`));
//         const barberNames = BarberList.map((b) => b.name)
//         const allCheckedBarbers = BarberList.reduce((acc, barber) => {
//           acc[barber._id] = true;
//           return acc;
//         }, {});
//         setCheckedEmails(barberEmails)
//         setCheckMobileNumber(barberMobileNumbers)
//         setCheckBarberNames(barberNames)
//         setCheckedBarbers(allCheckedBarbers);
//       } else {
//         setCheckedEmails([])
//         setCheckMobileNumber([])
//         setCheckBarberNames([])
//         setCheckedBarbers({});
//       }

//       return !prev
//     })
//   }

//   // console.log(checkedEmails)
//   // console.log(checkMobileNumbers)


//   const [openBarberEmail, setOpenBarberEmail] = useState(false)

//   const sendEmailNavigate = () => {
//     if (checkedEmails.length > 0) {

//       setOpenBarberEmail(true)
//     } else {
//       toast.error("Please select a barber", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }

//   }

//   const [subject, setSubject] = useState("")
//   const [message, setMessage] = useState("")

//   const sendMailHandler = () => {
//     const maildata = {
//       subject,
//       message,
//       role: "Barber",
//       recipientEmails: checkedEmails
//     }
//     dispatch(adminSendBarberEmailAction(maildata, setSubject, setMessage, setOpenBarberEmail))

//   }

//   const handleKeyPressMail = (e) => {
//     if (e.key === "Enter") {
//       sendMailHandler();
//     }
//   };

//   const adminSendBarberEmail = useSelector(state => state.adminSendBarberEmail)

//   const {
//     loading: adminSendBarberEmailLoading
//   } = adminSendBarberEmail

//   const [openBarberMessage, setOpenBarberMessage] = useState(false)
//   const [barberMessage, setBarberMessage] = useState("")

//   const sendMessageNavigate = () => {
//     if (checkMobileNumbers.length > 0) {
//       setOpenBarberMessage(true)
//     } else {
//       toast.error("Please select a barber", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }

//   }

//   const sendMessageHandler = () => {
//     const smsdata = {
//       smsBody: barberMessage,
//       numbers: checkMobileNumbers
//     }
//     dispatch(adminSendBarberMessageAction(smsdata, setMessage, setOpenBarberMessage))
//   }

//   const handleKeyPressMessage = (e) => {
//     if (e.key === "Enter") {
//       sendMessageHandler();
//     }
//   };

//   const adminSendBarberMessage = useSelector(state => state.adminSendBarberMessage)

//   const {
//     loading: adminSendBarberMessageLoading
//   } = adminSendBarberMessage


//   return (
//     <div className={`${style.admin_barber_wrapper} ${darkmodeOn && style.dark}`}>
//       <div>
//         <p>Barber List</p>
//         <div>
//           <button className={`${style.barber_send_btn} ${darkmodeOn && style.dark}`}
//             onClick={sendEmailNavigate}
//             title='Email'
//             disabled={salonId === 0}
//             style={{
//               cursor: salonId === 0 ? "not-allowed" : "cursor"
//             }}
//           >
//             <div><EmailIcon /></div>
//           </button>

//           <Modal
//             open={openBarberEmail}
//             onClose={() => setOpenBarberEmail(false)}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
//               <div>
//                 <p>Send Email</p>
//                 <button onClick={() => setOpenBarberEmail(false)}><CloseIcon /></button>
//               </div>

//               <div className={style.modal_content_container}>
//                 <div>
//                   <p>From</p>
//                   <input
//                     type="text"
//                     value={"support@iqueuebarbers.com"}
//                     readOnly
//                     onKeyDown={handleKeyPressMail}
//                   />
//                 </div>

//                 <div>
//                   <p>To</p>
//                   <input type="text" value={
//                     checkedEmails?.map((e) => " " + e)
//                   }
//                     onKeyDown={handleKeyPressMail}
//                   />
//                 </div>

//                 <div>
//                   <p>Subject</p>
//                   <input
//                     type="text"
//                     placeholder='Enter Subject'
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     onKeyDown={handleKeyPressMail}
//                   />
//                 </div>


//                 <div>
//                   <p>Message</p>
//                   <textarea
//                     type="text"
//                     placeholder='Enter Message'
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     onKeyDown={handleKeyPressMail}
//                   ></textarea>
//                 </div>

//                 {
//                   adminSendBarberEmailLoading ?
//                     <button className={style.barber_send_btn}><ButtonLoader /></button> :
//                     <button onClick={sendMailHandler} disabled={adminSendBarberEmailLoading} className={style.barber_send_btn}>Send</button>
//                 }
//               </div>
//             </div>
//           </Modal>

//           <button
//             className={`${style.barber_send_btn} ${darkmodeOn && style.dark}`}
//             onClick={sendMessageNavigate}
//             disabled={salonId === 0}
//             style={{
//               cursor: salonId === 0 ? "not-allowed" : "cursor"
//             }}
//             title='Message'
//           >
//             <div><MessageIcon /></div>
//           </button>


//           <Modal
//             open={openBarberMessage}
//             onClose={() => setOpenBarberMessage(false)}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
//               <div>
//                 <p>Send Message</p>
//                 <button onClick={() => setOpenBarberMessage(false)}><CloseIcon /></button>
//               </div>

//               <div className={style.modal_content_container}>
//                 <div>
//                   <p>From</p>
//                   <input
//                     type="text"
//                     value={"iqueuebarbers"}
//                     readOnly
//                     onKeyDown={handleKeyPressMessage}
//                   />
//                 </div>

//                 <div>
//                   <p>To</p>
//                   <input type="text" value={
//                     checkBarberNames?.map((e) => " " + e)
//                   }
//                     onKeyDown={handleKeyPressMessage}
//                   />
//                 </div>

//                 <div>
//                   <p>Message</p>
//                   <textarea
//                     type="text"
//                     placeholder='Enter Message'
//                     value={barberMessage}
//                     onChange={(e) => setBarberMessage(e.target.value)}
//                     onKeyDown={handleKeyPressMessage}
//                   ></textarea>
//                 </div>

//                 {
//                   adminSendBarberMessageLoading ?
//                     <button className={style.barber_send_btn}><ButtonLoader /></button> :
//                     <button onClick={sendMessageHandler} disabled={adminSendBarberMessageLoading} className={style.barber_send_btn}>Send</button>
//                 }
//               </div>
//             </div>
//           </Modal>

//           <button onClick={createbarberClicked} className={`${style.create_barber_btn}`}
//             disabled={salonId === 0}
//             style={{
//               cursor: salonId === 0 ? "not-allowed" : "cursor"
//             }}
//           >
//             <p>Create</p>
//             <div>+</div>
//           </button>
//         </div>
//       </div>

//       <div className={`${style.admin_barber_content_wrapper} ${darkmodeOn && style.dark}`}>
//         {
//           getAdminBarberListLoading ? (
//             <div className={style.admin_barber_content_body}>
//               <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} 
//               baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//               highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
//             </div>
//           ) : getAdminBarberListResolve && BarberList?.length > 0 ? (
//             <div className={`${style.admin_barber_content_body} ${darkmodeOn && style.dark}`}>
//               <div>
//                 <div>
//                   <input
//                     type="checkbox"
//                     onChange={checkAllBarbersHandler}
//                     checked={checkAllBarbers}
//                   />
//                 </div>
//                 <p>Name</p>
//                 <p>Email</p>
//                 <div><p>isOnline</p></div>
//                 <div><p>isClockIn</p></div>
//                 <div><p>isApprove</p></div>
//                 <div><p>Edit</p></div>
//                 {/* <p>Delete</p> */}
//               </div>

//               {BarberList?.map((b, index) => (
//                 <div className={style.admin_barber_content_body_item}
//                   key={b._id}
//                   style={{
//                     borderBottom: BarberList?.length - 1 === index && "none"
//                   }}
//                 >
//                   <div>
//                     <input
//                       type="checkbox"
//                       checked={checkedBarbers[b._id] || false}
//                       onChange={() => barberEmailCheckedHandler(b)}
//                     />
//                   </div>

//                   <p>{b?.name.length > 18 ? b?.name.slice(0, 18) + "..." : b?.name}</p>
//                   <p>{b?.email.length > 18 ? b?.email.slice(0, 18) + "..." : b?.email}</p>

//                   <div>
//                     <button
//                       onClick={() => toggleHandler(b)}
//                       className={checkMap?.get(`${b.salonId}-${b.barberId}`) ? style.barber_online_btn_active : style.barber_online_btn_inactive}
//                     >{checkMap?.get(`${b.salonId}-${b.barberId}`) ? "Online" : "Offline"}</button>
//                   </div>

//                   <div>
//                     <button
//                       onClick={() => toggleClockHandler(b)}
//                       className={checkMapClock?.get(`${b.salonId}-${b.barberId}`) ? style.barber_clock_btn_active : style.barber_clock_btn_inactive}
//                     >{checkMapClock?.get(`${b.salonId}-${b.barberId}`) ? "Clock-In" : "Clock-Out"}</button>
//                   </div>

//                   <div>
//                     <button
//                       onClick={() => approveHandler(b)}
//                       className={approveBarberMap?.get(`${b.salonId}-${b.email}`) ? style.barber_approve_btn_active : style.barber_approve_btn_inactive}
//                       disabled={adminApproveBarberLoading ? true : false}
//                     >{approveBarberMap?.get(`${b.salonId}-${b.email}`) ? "Approved" : "Approve"}</button>
//                   </div>

//                   <div><button onClick={() => editButtonClicked(b)}
//                     disabled={approveBarberMap?.get(`${b.salonId}-${b.email}`) === false}
//                     style={{
//                       cursor: approveBarberMap?.get(`${b.salonId}-${b.email}`) === false && "not-allowed"
//                     }}
//                   >Edit</button></div>
//                   {/* <div><button onClick={() => deleteButtonClicked(b)}>Delete</button></div> */}

//                 </div>
//               ))}

//             </div>
//           ) : (<div className={`${style.barber_content_body_error} ${darkmodeOn && style.dark}`}>
//             <p>Barbers not available</p>
//           </div>)
//         }
//       </div>

//     </div>
//   )
// }

// export default BarberList




import React, { useEffect, useState } from 'react'
import style from "./BarberList.module.css"
import { DropdownIcon, SalonThreeDotsIcon, SortDownIcon, SortUpDownArrowIcon, SortUpIcon } from '../../../newicons';
import { ClickAwayListener, FormControl, MenuItem, Pagination, Select } from '@mui/material';

const BarberList = () => {

  const headRows = [
    { id: 1, heading: "#", key: "" },
    { id: 2, heading: "Name", key: "name" },
    { id: 3, heading: "Address", key: "address" },
    { id: 4, heading: "City", key: "city" },
    { id: 5, heading: "Type", key: "type" },
    { id: 6, heading: "Subscription", key: "subscription" },
    { id: 7, heading: "Status", key: "status" },
    { id: 8, heading: "", key: "" },
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
    const totalPages = Math.ceil(salonlistData.length / rowsPerPage)
    setTotalPages(totalPages)
    setStartIndex((page - 1) * rowsPerPage)
    setEndIndex(page * rowsPerPage)
  }, [rowsPerPage, page])

  useEffect(() => {
    setSalonPaginationData(salonlistData.slice(startIndex, endIndex))
  }, [startIndex, endIndex, salonlistData])



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

  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Barber List</h2>
        <button>Create</button>
      </div>

      <div className={`${style.list_container}`}>

        <div className={`${style.list_body_container}`}>

          <div className={`${style.headRow}`}>
            {
              headRows.map((item, index) => {
                return (
                  <div key={item.id}>
                    <button onClick={() => sortFunction(item.key)}>
                      {item.heading}
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
                              <p>Salon settings</p>
                              <p>Appointment settings</p>
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

export default BarberList

