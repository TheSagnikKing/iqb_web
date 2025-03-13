// import React, { useEffect, useRef, useState } from 'react';
// import style from './CustomerList.module.css';
// import { CloseIcon, EmailIcon, LeftArrow, MessageIcon, RightArrow, SearchIcon } from '../../icons';
// import Skeleton from 'react-loading-skeleton';
// import { adminGetAllCustomerListAction } from '../../Redux/Admin/Actions/CustomerAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
// import api from '../../Redux/api/Api';
// import { GET_ALL_CUSTOMERLIST_REQ, GET_ALL_CUSTOMERLIST_SUCCESS } from '../../Redux/Admin/Constants/constants';
// import toast from 'react-hot-toast';
// import Modal from '@mui/material/Modal';
// import { adminSendBarberEmailAction, adminSendBarberMessageAction } from '../../Redux/Admin/Actions/BarberAction';
// import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';

// const CustomerList = () => {

//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//   const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
//   const dispatch = useDispatch();
//   const CustomerListControllerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     CustomerListControllerRef.current = controller;

//     dispatch(adminGetAllCustomerListAction(currentsalonId, controller.signal));

//     return () => {
//       if (CustomerListControllerRef.current) {
//         CustomerListControllerRef.current.abort();
//       }
//     };
//   }, [dispatch]);

//   const adminGetAllCustomerList = useSelector(state => state.adminGetAllCustomerList);

//   const {
//     loading: adminGetAllCustomerListLoading,
//     resolve: adminGetAllCustomerListResolve,
//     getAllCustomers: AllCustomerList,
//     currentPage,
//     totalPages,
//   } = adminGetAllCustomerList;

//   const darkMode = useSelector(darkmodeSelector);
//   const darkmodeOn = darkMode === 'On';

//   const [search, setSearch] = useState('');
//   const [searchLoading, setSearchLoading] = useState(false);

//   const searchCustomerhandler = async () => {


//     setSearchLoading(true);
//     try {
//       const { data } = await api.get(`/api/customers/getAllCustomers?salonId=${currentsalonId}&name=${search}`);
//       dispatch({
//         type: GET_ALL_CUSTOMERLIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       console.error('Error searching customers:', error);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       searchCustomerhandler();
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [search]);


//   const [checkAllCustomers, setCheckAllCustomers] = useState(false);
//   const [checkedCustomers, setCheckedCustomers] = useState({});
//   const [checkedEmails, setCheckedEmails] = useState([]);
//   const [checkMobileNumbers, setCheckMobileNumber] = useState([]);
//   const [checkCustomerNames, setCheckCustomerNames] = useState([]);

//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (currentPage) {
//       setPage(currentPage)
//     }
//   }, [currentPage])

//   const paginationLeftHandler = async () => {
//     if (page > 1) {
//       try {
//         dispatch({ type: GET_ALL_CUSTOMERLIST_REQ })
//         const { data } = await api.get(`/api/customers/getAllCustomers?salonId=${currentsalonId}&page=${page - 1}`);
//         dispatch({
//           type: GET_ALL_CUSTOMERLIST_SUCCESS,
//           payload: data,
//         });
//         setCheckAllCustomers(false)
//         setPage(prevPage => prevPage - 1);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//         setCheckAllCustomers(false)
//       }
//     }
//   };

//   const paginationRightHandler = async () => {
//     if (page < totalPages) {
//       try {
//         dispatch({ type: GET_ALL_CUSTOMERLIST_REQ })
//         const { data } = await api.get(`/api/customers/getAllCustomers?salonId=${currentsalonId}&page=${page + 1}`);
//         dispatch({
//           type: GET_ALL_CUSTOMERLIST_SUCCESS,
//           payload: data,
//         });
//         setPage(prevPage => prevPage + 1);
//         setCheckAllCustomers(false)
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//         setCheckAllCustomers(false)
//       }
//     }
//   };

//   const customerEmailCheckedHandler = (customer) => {
//     const isChecked = !checkedCustomers[customer._id];
//     setCheckedCustomers(prevState => ({
//       ...prevState,
//       [customer._id]: isChecked,
//     }));

//     if (isChecked) {
//       setCheckedEmails(prevEmails => [...prevEmails, customer.email]);
//       setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, Number(`${customer.mobileCountryCode}${customer.mobileNumber}`)]);
//       setCheckCustomerNames(prevNames => [...prevNames, customer.name]);
//       setCheckAllCustomers(false)
//     } else {
//       setCheckedEmails(prevEmails => prevEmails.filter(email => email !== customer.email));
//       setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== Number(`${customer.mobileCountryCode}${customer.mobileNumber}`)));
//       setCheckCustomerNames(prevNames => prevNames.filter(name => name !== customer.name));
//       setCheckAllCustomers(false)
//     }
//   };

//   const checkAllCustomersHandler = (e) => {
//     setCheckAllCustomers((prev) => {
//       if (!prev) {
//         const customerEmails = AllCustomerList.map((c) => c.email);
//         const customerMobileNumbers = AllCustomerList.map((c) => Number(`${c.mobileCountryCode}${c.mobileNumber}`));
//         const customerNames = AllCustomerList.map((c) => c.name);
//         const allCheckedCustomers = AllCustomerList.reduce((acc, customer) => {
//           acc[customer._id] = true;
//           return acc;
//         }, {});
//         setCheckedEmails(customerEmails);
//         setCheckMobileNumber(customerMobileNumbers);
//         setCheckCustomerNames(customerNames);
//         setCheckedCustomers(allCheckedCustomers);
//       } else {
//         setCheckedEmails([]);
//         setCheckMobileNumber([]);
//         setCheckCustomerNames([]);
//         setCheckedCustomers({});
//       }

//       return !prev;
//     });
//   };


//   // const navigate = useNavigate();

//   const [openBarberEmail, setOpenBarberEmail] = useState(false)

//   const sendEmailNavigate = () => {
//     if (checkedEmails.length > 0) {
//       setOpenBarberEmail(true)
//     } else {
//       toast.error("Please select a customer", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }

//   };

//   const [subject, setSubject] = useState("")
//   const [message, setMessage] = useState("")

//   const sendMailHandler = () => {
//     const maildata = {
//       subject,
//       message,
//       role: "Barber",
//       recipientEmails: checkedEmails
//     }
//     // console.log(maildata)
//     dispatch(adminSendBarberEmailAction(maildata, setSubject, setMessage, setOpenBarberEmail))
//   }

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
//       toast.error("Please select a customer", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }

//   };

//   const sendMessageHandler = () => {
//     const smsdata = {
//       smsBody: barberMessage,
//       numbers: checkMobileNumbers
//     }
//     // console.log(smsdata)
//     dispatch(adminSendBarberMessageAction(smsdata, setMessage, setOpenBarberMessage))

//   }

//   const adminSendBarberMessage = useSelector(state => state.adminSendBarberMessage)

//   const {
//     loading: adminSendBarberMessageLoading
//   } = adminSendBarberMessage

//   return (
//     <div className={`${style.customer_wrapper} ${darkmodeOn && style.dark}`}>
//       <div>
//         <p>Customer List</p>

//         <div>
//           <div className={`${style.customer_search} ${darkmodeOn && style.dark}`}>
//             <input
//               type="text"
//               placeholder='Search Customer'
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />

//             <div onClick={searchCustomerhandler}><SearchIcon /></div>
//           </div>

//           <button
//             className={`${style.customer_send_btn} ${darkmodeOn && style.dark}`}
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
//                   />
//                 </div>

//                 <div>
//                   <p>To</p>
//                   <input type="text"
//                     value={
//                       checkedEmails?.map((e) => " " + e)
//                     }
//                   />
//                 </div>

//                 <div>
//                   <p>Subject</p>
//                   <input
//                     type="text"
//                     placeholder='Enter Subject'
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                   />
//                 </div>


//                 <div>
//                   <p>Message</p>
//                   <textarea
//                     type="text"
//                     placeholder='Enter Message'
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
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
//             className={`${style.customer_send_btn} ${darkmodeOn && style.dark}`}
//             onClick={sendMessageNavigate}
//             title='Message'
//             disabled={salonId === 0}
//             style={{
//               cursor: salonId === 0 ? "not-allowed" : "cursor"
//             }}
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
//                   />
//                 </div>

//                 <div>
//                   <p>To</p>
//                   <input type="text" value={
//                     checkCustomerNames?.map((e) => " " + e)
//                   } />
//                 </div>

//                 <div>
//                   <p>Message</p>
//                   <textarea
//                     type="text"
//                     placeholder='Enter Message'
//                     value={barberMessage}
//                     onChange={(e) => setBarberMessage(e.target.value)}
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

//         </div>

//       </div>

//       <div className={`${style.customer_content_wrapper} ${darkmodeOn && style.dark}`}>
//         {adminGetAllCustomerListLoading || searchLoading ? (
//           <div className={style.customer_content_body}>
//             <Skeleton
//               count={6}
//               height={'6rem'}
//               style={{ marginBottom: '1rem' }}
//               baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
//               highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//             />
//           </div>
//         ) : adminGetAllCustomerListResolve && AllCustomerList?.length > 0 ? (
//           <div className={`${style.customer_content_body} ${darkmodeOn && style.dark}`}>
//             <div>
//               <div>
//                 <input
//                   type="checkbox"
//                   onChange={checkAllCustomersHandler}
//                   checked={checkAllCustomers}
//                 />
//               </div>
//               <p>Name</p>
//               <p>Email</p>
//               <p>Gender</p>
//               <p>Mobile No.</p>
//             </div>

//             {AllCustomerList?.map((s, index) => (
//               <div key={s._id}
//                 style={{
//                   borderBottom: AllCustomerList.length - 1 === index && "none"
//                 }}
//               >
//                 <div>
//                   <input
//                     type="checkbox"
//                     checked={checkedCustomers[s._id] || false}
//                     onChange={() => customerEmailCheckedHandler(s)}
//                   />
//                 </div>
//                 <p>{s?.name.length > 18 ? `${s.name.slice(0, 18)}...` : s.name}</p>
//                 <p>{s?.email.length > 18 ? `${s.email.slice(0, 18)}...` : s.email}</p>
//                 <p>{s?.gender}</p>
//                 <p>{s?.mobileNumber}</p>
//               </div>
//             ))}
//           </div>
//         ) : (<div className={`${style.customer_content_body_error} ${darkmodeOn && style.dark}`}>
//           <p>Customers not available</p>
//         </div>)}

//       </div>

//       <div className={`${style.customer_pagination_wrapper} ${darkmodeOn && style.dark}`}>
//         <div>
//           <div onClick={paginationLeftHandler}><LeftArrow /></div>
//           <div onClick={paginationRightHandler} disabled={page === totalPages}><RightArrow /></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerList;


import React, { useEffect, useState } from 'react'
import style from "./CustomerList.module.css"
import { CheckIcon, DropdownIcon, EmailIcon, MessageIcon, SalonThreeDotsIcon, SortDownIcon, SortUpDownArrowIcon, SortUpIcon } from '../../newicons';
import { ClickAwayListener, FormControl, MenuItem, Pagination, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {

  const headRows = [
    { id: 1, heading: "#", key: "" },
    { id: 2, heading: "Name", key: "customerName" },
    { id: 3, heading: "Email", key: "email" },
    { id: 4, heading: "Gender", key: "gender" },
    { id: 5, heading: "Mobile Number", key: "mobile" },
    { id: 6, heading: "Date Of Birth", key: "dob" },
  ];

  const salonlistDataCopy = [
    { customerName: "John Doe", gender: "Male", email: "john.doe@example.com", dob: "1990-05-15", mobile: "123-456-7890", barberName: "Mike Johnson", qPos: 1, mins: 30, customerImage: "https://i.pravatar.cc/150?img=1" },
    { customerName: "Emma Smith", gender: "Female", email: "emma.smith@example.com", dob: "1995-08-22", mobile: "987-654-3210", barberName: "David Thompson", qPos: 2, mins: 40, customerImage: "https://i.pravatar.cc/150?img=2" },
    { customerName: "Liam Johnson", gender: "Male", email: "liam.johnson@example.com", dob: "1988-11-30", mobile: "456-789-0123", barberName: "Chris Williams", qPos: 3, mins: 35, customerImage: "https://i.pravatar.cc/150?img=3" },
    { customerName: "Sophia Brown", gender: "Female", email: "sophia.brown@example.com", dob: "1992-03-25", mobile: "321-654-0987", barberName: "Alex Martinez", qPos: 4, mins: 45, customerImage: "https://i.pravatar.cc/150?img=4" },
    { customerName: "Noah Wilson", gender: "Male", email: "noah.wilson@example.com", dob: "2000-07-10", mobile: "789-123-4560", barberName: "James Anderson", qPos: 5, mins: 25, customerImage: "https://i.pravatar.cc/150?img=5" },
    { customerName: "Olivia Martinez", gender: "Female", email: "olivia.martinez@example.com", dob: "1985-12-19", mobile: "654-321-7890", barberName: "Brian Davis", qPos: 6, mins: 50, customerImage: "https://i.pravatar.cc/150?img=6" },
    { customerName: "William Davis", gender: "Male", email: "william.davis@example.com", dob: "1998-09-05", mobile: "147-258-3690", barberName: "John Rodriguez", qPos: 7, mins: 30, customerImage: "https://i.pravatar.cc/150?img=7" },
    { customerName: "Ava Garcia", gender: "Female", email: "ava.garcia@example.com", dob: "1993-04-14", mobile: "369-147-2580", barberName: "Ryan Clark", qPos: 8, mins: 40, customerImage: "https://i.pravatar.cc/150?img=8" },
    { customerName: "James Rodriguez", gender: "Male", email: "james.rodriguez@example.com", dob: "1996-06-21", mobile: "852-963-7410", barberName: "Ethan Scott", qPos: 9, mins: 20, customerImage: "https://i.pravatar.cc/150?img=9" },
    { customerName: "Mia Anderson", gender: "Female", email: "mia.anderson@example.com", dob: "2002-02-28", mobile: "741-852-9630", barberName: "Matt Lewis", qPos: 10, mins: 55, customerImage: "https://i.pravatar.cc/150?img=10" },
    { customerName: "Ethan Walker", gender: "Male", email: "ethan.walker@example.com", dob: "1987-01-08", mobile: "963-741-8520", barberName: "Kevin Young", qPos: 11, mins: 35, customerImage: "https://i.pravatar.cc/150?img=11" },
    { customerName: "Isabella Allen", gender: "Female", email: "isabella.allen@example.com", dob: "1999-10-12", mobile: "852-147-3690", barberName: "Brandon Hill", qPos: 12, mins: 45, customerImage: "https://i.pravatar.cc/150?img=12" },
    { customerName: "Alexander King", gender: "Male", email: "alexander.king@example.com", dob: "1991-07-03", mobile: "147-852-9630", barberName: "Tyler Green", qPos: 13, mins: 25, customerImage: "https://i.pravatar.cc/150?img=13" },
    { customerName: "Charlotte Wright", gender: "Female", email: "charlotte.wright@example.com", dob: "1984-03-18", mobile: "369-963-1470", barberName: "Aaron Baker", qPos: 14, mins: 50, customerImage: "https://i.pravatar.cc/150?img=14" },
    { customerName: "Daniel Moore", gender: "Male", email: "daniel.moore@example.com", dob: "1997-11-27", mobile: "741-258-3690", barberName: "Adam Carter", qPos: 15, mins: 30, customerImage: "https://i.pravatar.cc/150?img=15" },
    { customerName: "Amelia Taylor", gender: "Female", email: "amelia.taylor@example.com", dob: "1994-08-01", mobile: "258-741-9630", barberName: "Justin Mitchell", qPos: 16, mins: 40, customerImage: "https://i.pravatar.cc/150?img=16" },
    { customerName: "Michael Thomas", gender: "Male", email: "michael.thomas@example.com", dob: "1989-05-20", mobile: "963-369-1470", barberName: "Jose Perez", qPos: 17, mins: 20, customerImage: "https://i.pravatar.cc/150?img=17" },
    { customerName: "Evelyn Jackson", gender: "Female", email: "evelyn.jackson@example.com", dob: "2001-01-15", mobile: "147-963-8520", barberName: "Luis Roberts", qPos: 18, mins: 55, customerImage: "https://i.pravatar.cc/150?img=18" },
    { customerName: "Henry White", gender: "Male", email: "henry.white@example.com", dob: "1986-09-29", mobile: "852-741-3690", barberName: "Samuel Turner", qPos: 19, mins: 35, customerImage: "https://i.pravatar.cc/150?img=19" },
    { customerName: "Abigail Harris", gender: "Female", email: "abigail.harris@example.com", dob: "1992-06-07", mobile: "369-258-1470", barberName: "Patrick Phillips", qPos: 20, mins: 45, customerImage: "https://i.pravatar.cc/150?img=20" },
  ]


  const [salonlistData, setSalonlistData] = useState([
    { customerName: "John Doe", gender: "Male", email: "john.doe@example.com", dob: "1990-05-15", mobile: "123-456-7890", barberName: "Mike Johnson", qPos: 1, mins: 30, customerImage: "https://i.pravatar.cc/150?img=1" },
    { customerName: "Emma Smith", gender: "Female", email: "emma.smith@example.com", dob: "1995-08-22", mobile: "987-654-3210", barberName: "David Thompson", qPos: 2, mins: 40, customerImage: "https://i.pravatar.cc/150?img=2" },
    { customerName: "Liam Johnson", gender: "Male", email: "liam.johnson@example.com", dob: "1988-11-30", mobile: "456-789-0123", barberName: "Chris Williams", qPos: 3, mins: 35, customerImage: "https://i.pravatar.cc/150?img=3" },
    { customerName: "Sophia Brown", gender: "Female", email: "sophia.brown@example.com", dob: "1992-03-25", mobile: "321-654-0987", barberName: "Alex Martinez", qPos: 4, mins: 45, customerImage: "https://i.pravatar.cc/150?img=4" },
    { customerName: "Noah Wilson", gender: "Male", email: "noah.wilson@example.com", dob: "2000-07-10", mobile: "789-123-4560", barberName: "James Anderson", qPos: 5, mins: 25, customerImage: "https://i.pravatar.cc/150?img=5" },
    { customerName: "Olivia Martinez", gender: "Female", email: "olivia.martinez@example.com", dob: "1985-12-19", mobile: "654-321-7890", barberName: "Brian Davis", qPos: 6, mins: 50, customerImage: "https://i.pravatar.cc/150?img=6" },
    { customerName: "William Davis", gender: "Male", email: "william.davis@example.com", dob: "1998-09-05", mobile: "147-258-3690", barberName: "John Rodriguez", qPos: 7, mins: 30, customerImage: "https://i.pravatar.cc/150?img=7" },
    { customerName: "Ava Garcia", gender: "Female", email: "ava.garcia@example.com", dob: "1993-04-14", mobile: "369-147-2580", barberName: "Ryan Clark", qPos: 8, mins: 40, customerImage: "https://i.pravatar.cc/150?img=8" },
    { customerName: "James Rodriguez", gender: "Male", email: "james.rodriguez@example.com", dob: "1996-06-21", mobile: "852-963-7410", barberName: "Ethan Scott", qPos: 9, mins: 20, customerImage: "https://i.pravatar.cc/150?img=9" },
    { customerName: "Mia Anderson", gender: "Female", email: "mia.anderson@example.com", dob: "2002-02-28", mobile: "741-852-9630", barberName: "Matt Lewis", qPos: 10, mins: 55, customerImage: "https://i.pravatar.cc/150?img=10" },
    { customerName: "Ethan Walker", gender: "Male", email: "ethan.walker@example.com", dob: "1987-01-08", mobile: "963-741-8520", barberName: "Kevin Young", qPos: 11, mins: 35, customerImage: "https://i.pravatar.cc/150?img=11" },
    { customerName: "Isabella Allen", gender: "Female", email: "isabella.allen@example.com", dob: "1999-10-12", mobile: "852-147-3690", barberName: "Brandon Hill", qPos: 12, mins: 45, customerImage: "https://i.pravatar.cc/150?img=12" },
    { customerName: "Alexander King", gender: "Male", email: "alexander.king@example.com", dob: "1991-07-03", mobile: "147-852-9630", barberName: "Tyler Green", qPos: 13, mins: 25, customerImage: "https://i.pravatar.cc/150?img=13" },
    { customerName: "Charlotte Wright", gender: "Female", email: "charlotte.wright@example.com", dob: "1984-03-18", mobile: "369-963-1470", barberName: "Aaron Baker", qPos: 14, mins: 50, customerImage: "https://i.pravatar.cc/150?img=14" },
    { customerName: "Daniel Moore", gender: "Male", email: "daniel.moore@example.com", dob: "1997-11-27", mobile: "741-258-3690", barberName: "Adam Carter", qPos: 15, mins: 30, customerImage: "https://i.pravatar.cc/150?img=15" },
    { customerName: "Amelia Taylor", gender: "Female", email: "amelia.taylor@example.com", dob: "1994-08-01", mobile: "258-741-9630", barberName: "Justin Mitchell", qPos: 16, mins: 40, customerImage: "https://i.pravatar.cc/150?img=16" },
    { customerName: "Michael Thomas", gender: "Male", email: "michael.thomas@example.com", dob: "1989-05-20", mobile: "963-369-1470", barberName: "Jose Perez", qPos: 17, mins: 20, customerImage: "https://i.pravatar.cc/150?img=17" },
    { customerName: "Evelyn Jackson", gender: "Female", email: "evelyn.jackson@example.com", dob: "2001-01-15", mobile: "147-963-8520", barberName: "Luis Roberts", qPos: 18, mins: 55, customerImage: "https://i.pravatar.cc/150?img=18" },
    { customerName: "Henry White", gender: "Male", email: "henry.white@example.com", dob: "1986-09-29", mobile: "852-741-3690", barberName: "Samuel Turner", qPos: 19, mins: 35, customerImage: "https://i.pravatar.cc/150?img=19" },
    { customerName: "Abigail Harris", gender: "Female", email: "abigail.harris@example.com", dob: "1992-06-07", mobile: "369-258-1470", barberName: "Patrick Phillips", qPos: 20, mins: 45, customerImage: "https://i.pravatar.cc/150?img=20" },
  ])


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


  useEffect(() => {
    let filteredData = salonlistDataCopy;

    if (query.trim() !== '') {
      filteredData = salonlistDataCopy.filter((item) => {
        return (
          item.customerName.toLowerCase().trim().includes(query.toLowerCase()) ||
          item.gender.toLowerCase().trim().includes(query.toLowerCase()) ||
          item.email.toLowerCase().trim().includes(query.toLowerCase()) ||
          item.dob.toLowerCase().trim().includes(query.toLowerCase()) ||
          item.mobile.toLowerCase().trim().includes(query.toLowerCase())
        );
      });
    }

    setSalonlistData(filteredData);
    setPage(1);
  }, [query]);


  const [selectOpen, setSelectOpen] = useState(false)

  const navigate = useNavigate()

  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Customer List</h2>
        <div>
          <button><MessageIcon /></button>
          <button><EmailIcon /></button>
          <input
            type='text'
            placeholder='Search Customer...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* <button onClick={() => navigate("/admin-salon/createsalon")}>Create</button> */}
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
                          className={`${item.key === "customerName" ? style.name_head_btn : ""}`}
                          onClick={() => sortFunction(item.key)}>
                          {item.key === "customerName" ? (
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
                <div key={item.customerName} style={{ borderBottom: (index === endIndex - 1) || (index === salonlistData.length - 1) ? null : "0.1rem solid var(--border-secondary)" }}>
                  <div>
                    <button><CheckIcon /></button>
                  </div>
                  <div>
                    <div>
                      <div><img src={item.customerImage} alt="" /></div>
                      <p>{item.customerName}</p>
                    </div>
                  </div>
                  <div><p>{item.email}</p></div>
                  <div><p>{item.gender}</p></div>
                  <div><p>{item.mobile}</p></div>
                  <div><p>{item.dob}</p></div>
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

export default CustomerList

