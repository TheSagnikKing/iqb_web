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
import { CheckIcon, DropdownIcon, EmailIcon, MessageIcon, SalonThreeDotsIcon, SortDownIcon, SortUpDownArrowIcon, SortUpIcon } from '../../../newicons';
import { ClickAwayListener, FormControl, MenuItem, Pagination, Select } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const BarberList = () => {

  const headRows = [
    { id: 1, heading: "", key: "" },
    { id: 2, heading: "Name", key: "name" },
    { id: 3, heading: "Email", key: "email" },
    { id: 4, heading: "isOnline", key: "isOnline" },
    { id: 5, heading: "isClockin", key: "isClockedIn" },
    { id: 6, heading: "isApprove", key: "isApproved" },
    { id: 7, heading: "", key: "" },
  ];


  const [salonlistData, setSalonlistData] = useState([
    {
      "_id": "67a46ad5c85dd16cdfa7f1c9",
      "name": "John Doe",
      "email": "john@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$tH/C1Xo25p6i0S9TRyjiPOwV5UbxAImvX1LVFZ1spUjhmmXDQlPaW",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "john",
      "mobileNumber": 8240205351,
      "mobileCountryCode": 91,
      "mobileVerified": false,
      "dateOfBirth": "2002-04-11T00:00:00.000Z",
      "salonId": 1,
      "barberId": 1,
      "barberCode": "JO1",
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 120,
          "_id": "67a46936c85dd16cdfa7ef9c"
        },
        {
          "serviceIcon": {
            "public_id": "icons/spa_1706703379407",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/spa_1706703379407.jpg"
          },
          "serviceId": 13,
          "serviceCode": "HA13",
          "serviceName": "Hair Spa",
          "servicePrice": 100,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9d"
        }
      ],
      "barberEWT": 530,
      "queueCount": 4,
      "isOnline": true,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "public_id": "barbers/download - 2024-12-27T164801_7c8887e1-1d2b-4946-8dfa-42fb9f696021",
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1739771508/barbers/download%20-%202024-12-27T164801_7c8887e1-1d2b-4946-8dfa-42fb9f696021.png",
          "_id": "67b2ce7459f98fd329c6cd46"
        }
      ],
      "createdAt": "2025-02-06T07:55:01.949Z",
      "updatedAt": "2025-03-13T13:17:36.291Z",
      "__v": 0
    },
    {
      "_id": "67a46b28c85dd16cdfa7f26e",
      "name": "Bob",
      "email": "bob@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$GGig2mi/OCrewGSpYcIJJ.Bl94xzSTv6tu.oh//Yw.wgQCzZm7clC",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "bob",
      "mobileNumber": 8240205351,
      "mobileCountryCode": 91,
      "mobileVerified": false,
      "dateOfBirth": "2009-12-04T00:00:00.000Z",
      "salonId": 1,
      "barberId": 2,
      "barberCode": "BO2",
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Malehaircut_1706703379405",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Malehaircut_1706703379405.png"
          },
          "serviceId": 11,
          "serviceCode": "HA11",
          "serviceName": "Haircut",
          "servicePrice": 38,
          "vipService": false,
          "barberServiceEWT": 20,
          "_id": "67a46936c85dd16cdfa7ef9b"
        },
        {
          "serviceIcon": {
            "public_id": "icons/massage_1706703379406",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703380/icons/massage_1706703379406.jpg"
          },
          "serviceId": 14,
          "serviceCode": "MA14",
          "serviceName": "Massage",
          "servicePrice": 70,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9e"
        },
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9c"
        },
        {
          "serviceIcon": {
            "public_id": "icons/spa_1706703379407",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/spa_1706703379407.jpg"
          },
          "serviceId": 13,
          "serviceCode": "HA13",
          "serviceName": "Hair Spa",
          "servicePrice": 100,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9d"
        }
      ],
      "barberEWT": 50,
      "queueCount": 1,
      "isOnline": true,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "public_id": "barbers/photo-1562004760-aceed7bb0fe3_a799f144-0078-4b1f-a6cf-2204599c9ffd",
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1739169664/barbers/photo-1562004760-aceed7bb0fe3_a799f144-0078-4b1f-a6cf-2204599c9ffd.jpg",
          "_id": "67a99f80faacd06cfb189d64"
        }
      ],
      "createdAt": "2025-02-06T07:56:24.715Z",
      "updatedAt": "2025-03-13T13:14:48.872Z",
      "__v": 0
    },
    {
      "_id": "67a46b6bc85dd16cdfa7f2ef",
      "name": "Jazz",
      "email": "jazz@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$YWO4UJGfeOTx0lciID9ls.t9QmU9Qr3kkymsnHd1I/HnlRXFkYGSC",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "jazz",
      "mobileNumber": 1234567890,
      "mobileCountryCode": 44,
      "mobileVerified": false,
      "dateOfBirth": "2008-04-09T00:00:00.000Z",
      "salonId": 1,
      "barberId": 3,
      "barberCode": "JA3",
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9c"
        },
        {
          "serviceIcon": {
            "public_id": "icons/spa_1706703379407",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/spa_1706703379407.jpg"
          },
          "serviceId": 13,
          "serviceCode": "HA13",
          "serviceName": "Hair Spa",
          "servicePrice": 100,
          "vipService": true,
          "barberServiceEWT": 50,
          "_id": "67a46936c85dd16cdfa7ef9d"
        },
        {
          "serviceIcon": {
            "public_id": "icons/massage_1706703379406",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703380/icons/massage_1706703379406.jpg"
          },
          "serviceId": 14,
          "serviceCode": "MA14",
          "serviceName": "Massage",
          "servicePrice": 70,
          "vipService": true,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9e"
        }
      ],
      "barberEWT": 0,
      "queueCount": 0,
      "isOnline": false,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "public_id": "barbers/istockphoto-853924196-612x612_d9c08f1f-43e7-4dc0-ba7f-812489274166",
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1739169753/barbers/istockphoto-853924196-612x612_d9c08f1f-43e7-4dc0-ba7f-812489274166.jpg",
          "_id": "67a99fd9faacd06cfb189f1c"
        }
      ],
      "createdAt": "2025-02-06T07:57:31.219Z",
      "updatedAt": "2025-02-28T08:01:54.925Z",
      "__v": 0
    },
    {
      "_id": "67a9a1e1faacd06cfb18a6d4",
      "name": "Hercules",
      "email": "hbk@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$7v5h.Ei0T3YdnIigoHga9eBmkw117PsZaWhrwJ3AiX9gWwsN2yzRO",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "",
      "mobileVerified": false,
      "dateOfBirth": "2009-12-10T00:00:00.000Z",
      "salonId": 1,
      "barberId": 4,
      "isActive": true,
      "isApproved": true,
      "barberRatings": [],
      "barberEWT": 0,
      "queueCount": 0,
      "isOnline": true,
      "isClockedIn": true,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1720520065/default-avatar-icon-of-social-media-user-vector_wl5pm0.jpg",
          "_id": "67a9a1e1faacd06cfb18a6d5"
        }
      ],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Malehaircut_1706703379405",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Malehaircut_1706703379405.png"
          },
          "serviceId": 11,
          "serviceCode": "HA11",
          "serviceName": "Haircut",
          "servicePrice": 38,
          "vipService": false,
          "barberServiceEWT": 25,
          "_id": "67a46936c85dd16cdfa7ef9b"
        },
        {
          "serviceIcon": {
            "public_id": "icons/Femalehaircut_1706703379391",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Femalehaircut_1706703379391.png"
          },
          "serviceId": 12,
          "serviceCode": "FE12",
          "serviceName": "Female Haircut",
          "servicePrice": 40,
          "vipService": false,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9c"
        }
      ],
      "createdAt": "2025-02-10T06:51:13.428Z",
      "updatedAt": "2025-03-10T08:33:02.447Z",
      "__v": 0,
      "gender": "Male",
      "mobileCountryCode": 44,
      "mobileNumber": 1234567890
    },
    {
      "_id": "67a9a32efaacd06cfb18abaa",
      "name": "hg",
      "email": "hg@yopmail.com",
      "emailVerified": false,
      "password": "$2b$10$1S0IkVFTWN1GQBtQ0GMWu.y9OG3TfNfgncaTOeqgD.JLafR4EoiGi",
      "role": "Barber",
      "AuthType": "local",
      "nickName": "",
      "mobileVerified": false,
      "dateOfBirth": "2009-12-10T00:00:00.000Z",
      "salonId": 1,
      "barberId": 5,
      "isActive": true,
      "isApproved": false,
      "barberRatings": [],
      "barberEWT": 0,
      "queueCount": 0,
      "isOnline": false,
      "isClockedIn": false,
      "isDeleted": false,
      "approvePendingMessage": "",
      "profile": [
        {
          "url": "https://res.cloudinary.com/dpynxkjfq/image/upload/v1720520065/default-avatar-icon-of-social-media-user-vector_wl5pm0.jpg",
          "_id": "67a9a32efaacd06cfb18abab"
        }
      ],
      "barberServices": [
        {
          "serviceIcon": {
            "public_id": "icons/Malehaircut_1706703379405",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703381/icons/Malehaircut_1706703379405.png"
          },
          "serviceId": 11,
          "serviceCode": "HA11",
          "serviceName": "Haircut",
          "servicePrice": 38,
          "vipService": false,
          "barberServiceEWT": 25,
          "_id": "67a46936c85dd16cdfa7ef9b"
        },
        {
          "serviceIcon": {
            "public_id": "icons/massage_1706703379406",
            "url": "https://res.cloudinary.com/dfrw3aqyp/image/upload/v1706703380/icons/massage_1706703379406.jpg"
          },
          "serviceId": 14,
          "serviceCode": "MA14",
          "serviceName": "Massage",
          "servicePrice": 70,
          "vipService": true,
          "barberServiceEWT": 30,
          "_id": "67a46936c85dd16cdfa7ef9e"
        }
      ],
      "createdAt": "2025-02-10T06:56:46.889Z",
      "updatedAt": "2025-03-07T11:40:19.338Z",
      "__v": 0,
      "gender": "Male",
      "mobileCountryCode": 44,
      "mobileNumber": 1234567890
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

  const navigate = useNavigate()

  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Barber List</h2>
        <div>
          <button><MessageIcon /></button>
          <button><EmailIcon /></button>
          <button onClick={() => navigate("/admin-barber/createbarber")}>Create</button>
        </div>
      </div>

      <div className={`${style.list_container}`}>

        <div className={`${style.list_body_container}`}>

          <div className={`${style.headRow}`}>

            {
              headRows.map((item, index) => {
                return (
                  <div key={item.id}>
                    {
                      item.key === "" ? (
                        <button className={`${style.head_select_icon}`}><CheckIcon /></button>
                      ) : (
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
                      )
                    }

                  </div>
                )
              })
            }
          </div>

          {
            salonPaginationData.map((item, index) => {
              return (
                <div key={item._id} style={{ borderBottom: (index === endIndex - 1) || (index === salonlistData.length - 1) ? null : "0.1rem solid var(--border-secondary)" }}>
                  <div>
                    <button><CheckIcon /></button>
                  </div>
                  <div>
                    <div>
                      <div><img src={item.profile?.[0]?.url} alt="" /></div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <div><p>{item.email}</p></div>
                  <div><button style={{
                    backgroundColor: item.isOnline ? "#052E16" : "#450a0a"
                  }}>{item.isOnline ? "Online" : "Offline"}</button></div>
                  <div><button style={{
                    backgroundColor: item.isClockedIn ? "#052E16" : "#450a0a"
                  }}>{item.isClockedIn ? "Clock In" : "Clock Out"}</button></div>
                  <div><button style={{
                    backgroundColor: item.isApproved ? "var(--bg-secondary-hover)" : "var(--input-bg-color)"
                  }}>{item.isApproved ? "Approved" : "Approve"}</button></div>
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
                              <p><Link to="/admin-barber/editbarber/:salonid">Edit barber</Link></p>
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

