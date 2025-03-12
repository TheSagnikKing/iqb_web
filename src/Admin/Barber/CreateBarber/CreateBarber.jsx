// import React, { useEffect, useRef, useState } from 'react';
// import style from "./CreateBarber.module.css";
// import { AddIcon, ClockIcon, CloseIcon, DeleteIcon, DropdownIcon } from '../../../icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminAllSalonServicesAction, adminCreateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
// import { useNavigate } from 'react-router-dom';
// import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
// import { PhoneInput } from 'react-international-phone';
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';
// import { PhoneNumberUtil } from 'google-libphonenumber';
// import toast from 'react-hot-toast';
// import { Skeleton, Modal } from '@mui/material';
// import { ClickAwayListener } from '@mui/material';

// import Calendar from 'react-calendar';


// import { getCurrentDate } from '../../../utils/Date';

// const CreateBarber = () => {
//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);

//   const navigate = useNavigate()
//   const dispatch = useDispatch();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [nickName, setNickName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("")
//   const [dateOfBirth, setDateOfBirth] = useState("");

//   const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

//   const AllSalonServicesControllerRef = useRef(new AbortController());

//   useEffect(() => {
//     if (adminProfile?.salonId !== 0) {
//       const controller = new AbortController();
//       AllSalonServicesControllerRef.current = controller;

//       dispatch(adminAllSalonServicesAction(salonId, controller.signal));

//       return () => {
//         if (AllSalonServicesControllerRef.current) {
//           AllSalonServicesControllerRef.current.abort();
//         }
//       };
//     }

//   }, [salonId, dispatch, adminProfile]);

//   const adminAllSalonServices = useSelector(state => state.adminAllSalonServices);

//   const {
//     loading: adminAllSalonServicesLoading,
//     resolve: adminAllSalonServicesResolve,
//     response: allSalonServices
//   } = adminAllSalonServices;

//   const [chooseServices, setChooseServices] = useState([]);
//   const [serviceEWTValues, setServiceEWTValues] = useState({});

//   useEffect(() => {
//     if (allSalonServices) {
//       const initialEWTValues = {};
//       allSalonServices.forEach(service => {
//         initialEWTValues[service._id] = service.serviceEWT;
//       });
//       setServiceEWTValues(initialEWTValues);
//     }
//   }, [allSalonServices]);


//   const chooseServiceHandler = (service) => {
//     setChooseServices([...chooseServices, service]);
//   };

//   const deleteServiceHandler = (service) => {
//     setChooseServices(chooseServices.filter((f) => f._id !== service._id));

//     const initialEWTValues = {};
//     allSalonServices.forEach(service => {
//       initialEWTValues[service._id] = service.serviceEWT;
//     });
//     setServiceEWTValues(initialEWTValues);
//   };

//   const handleEWTChange = (serviceId, newValue) => {
//     setServiceEWTValues({
//       ...serviceEWTValues,
//       [serviceId]: Number(newValue)
//     });
//   };

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("barberdata")) || {};

//     setName(storedData.name)
//     setEmail(storedData.email)
//     setNickName(storedData.nickName)
//     setDateOfBirth(storedData.dateOfBirth)
//   }, []);


//   const [nameError, setNameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [nickNameError, setNickNameError] = useState("");
//   const [invalidNumberError, setInvalidNumberError] = useState("");
//   const [dateOfBirthError, setDateOfBirthError] = useState("");
//   const [servicesError, setServicesError] = useState("");

//   const [invalidnumber, setInvalidNumber] = useState(false)

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const CreateBarberHandler = () => {

//     if (!name) {
//       toast.error("Please enter name", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setNameError("Please enter name")
//     }

//     if (name.length === 0 || name.length > 20) {
//       toast.error("Name must be between 1 to 20 characters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setNameError("Name must be between 1 to 20 characters");
//     }

//     if (!email) {
//       toast.error("Please enter email", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setEmailError("Please enter email")
//     }

//     if (!emailRegex.test(email)) {
//       toast.error("Invalid email format", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: "0.3rem",
//           background: "#333",
//           color: "#fff",
//         },
//       });
//       return setEmailError("Invalid email format");
//     }

//     if (!nickName) {
//       toast.error("Please enter nickname", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setNickNameError("Please enter nickname")
//     }

//     if (nickName.length === 0 || nickName.length > 20) {
//       toast.error("Nickname must be between 1 to 20 characters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setNickNameError("Nickname must be between 1 to 20 characters");
//     }


//     if (invalidnumber) {
//       toast.error("Invalid Number", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setInvalidNumberError("Invalid Number")
//     }

//     if (!dateOfBirth) {
//       toast.error("Please select date of birth", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setDateOfBirthError("Please select date of birth")
//     }

//     if (chooseServices.length === 0) {
//       toast.error("Please provide a service", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setServicesError("Please provide a service")
//     }

//     const barberdata = {
//       name: name, email: email, nickName: nickName, mobileNumber: Number(mobileNumber), countryCode: Number(countryCode), dateOfBirth: dateOfBirth,
//       salonId,
//       barberServices: chooseServices.map(service => ({
//         ...service,
//         barberServiceEWT: serviceEWTValues[service._id]
//       }))
//     };

//     dispatch(adminCreateBarberAction(barberdata, navigate))

//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       CreateBarberHandler();
//     }
//   };

//   const adminCreateBarber = useSelector(state => state.adminCreateBarber)

//   const {
//     loading: adminCreateBarberLoading,
//   } = adminCreateBarber

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   const phoneUtil = PhoneNumberUtil.getInstance();

//   const isPhoneValid = (phone) => {
//     try {
//       return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//     } catch (error) {
//       return false;
//     }
//   };

//   const [countryflag, setCountryFlag] = useState("gb")

//   const handlePhoneChange = (phone, meta, localname) => {
//     setInvalidNumberError("")
//     const { country, inputValue } = meta;

//     const isValid = isPhoneValid(phone);

//     if (isValid) {
//       setMobileNumber(phone)
//       setCountryCode(country?.dialCode)
//       setCountryFlag(country?.iso2)
//       setInvalidNumber(false)
//     } else {
//       setInvalidNumber(true)
//     }
//   };


//   const setHandler = (setState, value, localname, errorState) => {
//     errorState("")
//     setState(value);
//     // console.log("Saving to localStorage:", localname, value);

//     const existingData = JSON.parse(localStorage.getItem("barberdata")) || {};

//     localStorage.setItem("barberdata", JSON.stringify({
//       ...existingData,
//       [localname]: value
//     }));
//   }

//   const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

//   const {
//     response: adminGetDefaultSalonResponse
//   } = adminGetDefaultSalon

//   // console.log("Create Barber ", adminGetDefaultSalonResponse)

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);


//   useEffect(() => {
//     const phoneInput = document.querySelector(
//       '.react-international-phone-input-container .react-international-phone-input'
//     );

//     if (phoneInput) {
//       phoneInput.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
//     }
//   }, [darkmodeOn]);

//   //Calender Logic

//   const [openCalender, setOpenCalender] = useState(false)

//   const handleClickAway = () => {
//     setOpenCalender(false);
//   };

//   const [value, onChange] = useState(new Date());

//   const convertDateToYYYYMMDD = (dateInput) => {
//     const date = new Date(dateInput);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const onChangeHandler = (dateInput) => {
//     const formattedDate = convertDateToYYYYMMDD(dateInput);
//     onChange(formattedDate)
//     setHandler(setDateOfBirth, formattedDate, "dateOfBirth", setDateOfBirthError)
//     setOpenCalender(false)
//   }

//   const [mobileValue, setMobileValue] = useState(false);

//   useEffect(() => {

//     const handleResize = () => {
//       if (window.innerWidth <= 576) {
//         setMobileValue(true);
//       } else {
//         setMobileValue(false);
//       }
//     };
//     handleResize();

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);



//   return (
//     <>
//       <div className={`${style.admin_create_barber_wrapper} ${darkmodeOn && style.dark}`}>

//         <div className={`${style.admin_create_barber_wrapper_right} ${darkmodeOn && style.dark}`}>
//           <div>
//             <p>Add Your Services</p>
//           </div>

//           {
//             adminAllSalonServicesLoading ?
//               (<div className={`${style.admin_create_barber_content_wrapper_right_loading} ${darkmodeOn && style.dark}`}>
//                 <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "var(--list-wrapper-border-radius)" }} />
//                 <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "var(--list-wrapper-border-radius)" }} />
//               </div>) :
//               adminAllSalonServicesResolve && allSalonServices?.length > 0 ?
//                 (
//                   <div className={`${style.admin_create_barber_content_wrapper_right} ${darkmodeOn && style.dark}`}>

//                     {
//                       allSalonServices?.map((s) => {
//                         return (
//                           <div className={`${style.service_item} ${darkmodeOn && style.dark}`} key={s._id}>
//                             <div className={`${style.service_item_top}`}>
//                               <div><img src={s?.serviceIcon?.url} alt="service icon" /></div>
//                               <div>
//                                 <p>{s?.serviceName}</p>
//                                 <p>{s?.vipService ? "VIP" : "Regular"}</p>
//                                 <p>{s?.serviceDesc}</p>
//                               </div>
//                             </div>
//                             <div className={`${style.service_item_bottom}`}>
//                               <div>
//                                 <div>
//                                   <p>Service Price</p>
//                                   <p>{adminGetDefaultSalonResponse?.currency}{s?.servicePrice}</p>
//                                 </div>
//                               </div>

//                               <div>
//                                 <div>
//                                   <p>Est Wait Time</p>
//                                   <div>
//                                     <div><ClockIcon /></div>
//                                     <input
//                                       type="text"
//                                       value={serviceEWTValues[s._id]}
//                                       onChange={(e) => {
//                                         const value = e.target.value.replace(/[^0-9]/g, ''); // Only keep digits
//                                         handleEWTChange(s._id, value);
//                                       }}
//                                     />
//                                     <p>mins</p>
//                                   </div>
//                                 </div>
//                               </div>

//                             </div>

//                             {
//                               chooseServices.find((c) => c._id === s._id) ?
//                                 (<button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(s)}>Delete</button>) :
//                                 (<button className={`${style.service_add_icon}`} onClick={() => chooseServiceHandler(s)}>Add</button>)
//                             }

//                           </div>
//                         )
//                       })
//                     }

//                   </div>
//                 ) :
//                 (<div className={`${style.admin_create_barber_content_wrapper_right_error} ${darkmodeOn && style.dark}`}>
//                   <p>No services available</p>
//                 </div>)
//           }

//         </div>

//         <div className={`${style.admin_create_barber_wrapper_left}`}>
//           <div>
//             <p>Create Barber</p>

//             <button
//               onClick={handleOpen}
//               className={style.add_services_btn}
//             >Add Services</button>
//           </div>

//           <div className={`${style.admin_create_barber_content_wrapper_left} ${darkmodeOn && style.dark}`}>

//             <div>
//               <p>Name</p>
//               <input
//                 type='text'
//                 value={name}
//                 placeholder='Enter Name'
//                 onChange={(e) => setHandler(setName, e.target.value, "name", setNameError)}
//                 onKeyDown={handleKeyPress}
//                 style={{ border: nameError && "0.1rem solid red" }}
//               />
//               <p className={style.error_message}>{nameError}</p>
//             </div>

//             <div>
//               <p>Email</p>
//               <input
//                 type='text'
//                 value={email}
//                 placeholder='Enter Email'
//                 onChange={(e) => setHandler(setEmail, e.target.value, "email", setEmailError)}
//                 onKeyDown={handleKeyPress}
//                 style={{ border: emailError && "0.1rem solid red" }}
//               />
//               <p className={style.error_message}>{emailError}</p>
//             </div>

//             <div>
//               <p>Nick Name</p>
//               <input
//                 type='text'
//                 value={nickName}
//                 placeholder='Enter Nick Name'
//                 onChange={(e) => setHandler(setNickName, e.target.value, "nickName", setNickNameError)}
//                 onKeyDown={handleKeyPress}
//                 style={{ border: nickNameError && "0.1rem solid red" }}
//               />
//               <p className={style.error_message}>{nickNameError}</p>
//             </div>

//             <div>
//               <p>Mob. Number</p>
//               <div className={`${style.mobile_container} ${darkmodeOn && style.dark}`}>
//                 <div
//                   onKeyDown={handleKeyPress}
//                   style={{ border: invalidNumberError && "0.1rem solid red" }}>
//                   <PhoneInput
//                     forceDialCode={true}
//                     defaultCountry={countryflag}
//                     value={mobileNumber}
//                     onChange={(phone, meta) => handlePhoneChange(phone, meta, "mobileNumber")}
//                   />
//                 </div>
//               </div>
//               <p className={style.error_message}>{invalidNumberError}</p>
//             </div>

//             {
//               mobileValue ? (<div>
//                 <p>Date of Birth</p>
//                 <input
//                   type='date'
//                   placeholder='DD/MM/YY'
//                   value={dateOfBirth}
//                   onChange={(e) => setHandler(setDateOfBirth, e.target.value, "dateOfBirth", setDateOfBirthError)}
//                   style={{
//                     colorScheme: darkmodeOn ? "dark" : "light",
//                     border: dateOfBirthError && "0.1rem solid red"
//                   }}
//                   onKeyDown={handleKeyPress}
//                   max={getCurrentDate()}
//                 />
//                 <p className={style.error_message}>{dateOfBirthError}</p>
//               </div>) : (<div className={style.calender_container}>
//                 <p>Date of Birth</p>

//                 <input
//                   type='text'
//                   placeholder='Select Date'
//                   value={dateOfBirth}
//                   onClick={() => setOpenCalender(true)}
//                   style={{
//                     border: dateOfBirthError && "0.1rem solid red"
//                   }}
//                   readOnly
//                 />
//                 <span onClick={() => setOpenCalender((prev) => !prev)} className={`${style.dropicon} ${darkmodeOn && style.dark}`}><DropdownIcon /></span>
//                 <p className={style.error_message}>{dateOfBirthError}</p>
//                 {
//                   openCalender && <ClickAwayListener onClickAway={handleClickAway}>
//                     <div className={style.calender_drop_container}>
//                       <Calendar
//                         onChange={onChangeHandler}
//                         value={value}
//                         maxDate={new Date(2009, 11, 31)}
//                       />
//                     </div>
//                   </ClickAwayListener>
//                 }
//               </div>)
//             }


//             <div>
//               <p>Selected Services</p>
//               <input
//                 type='text'
//                 value={chooseServices?.map((s) => " " + s.serviceName)}
//                 placeholder='Your Services'
//                 readOnly
//                 style={{ border: servicesError && "0.1rem solid red" }}
//               />
//               <p className={style.error_message}>{servicesError}</p>
//             </div>

//             {
//               adminCreateBarberLoading ? <button
//                 className={`${style.create_barber_btn}`}
//                 style={{
//                   display: "grid",
//                   placeItems: "center"
//                 }}><ButtonLoader /></button> : <button className={`${style.create_barber_btn}`} onClick={CreateBarberHandler}>
//                 Create
//               </button>
//             }


//             <Modal
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//               className={style.mobile_modal}
//             >
//               <div className={`${style.mobile_service_container} ${darkmodeOn && style.dark}`}>
//                 <button onClick={handleClose}><CloseIcon /></button>
//                 {
//                   adminAllSalonServicesLoading ? (<div>
//                     <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "var(--list-wrapper-border-radius)", marginBottom: "1rem" }} />
//                     <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "var(--list-wrapper-border-radius)" }} />
//                   </div>) :
//                     adminAllSalonServicesResolve && allSalonServices?.length > 0 ? (
//                       <div>
//                         {
//                           allSalonServices?.map((s) => {
//                             return (
//                               <div className={`${style.service_item} ${darkmodeOn && style.dark}`} key={s._id}>
//                                 <div className={`${style.service_item_top}`}>
//                                   <div><img src={s?.serviceIcon?.url} alt="service icon" /></div>
//                                   <div>
//                                     <p>{s?.serviceName}</p>
//                                     <p>{s?.vipService ? "VIP" : "Regular"}</p>
//                                     <p>{s?.serviceDesc}</p>
//                                   </div>
//                                 </div>
//                                 <div className={`${style.service_item_bottom}`}>
//                                   <div>
//                                     <div>
//                                       <p>Service Price</p>
//                                       <p>{adminGetDefaultSalonResponse?.currency}{s?.servicePrice}</p>
//                                     </div>
//                                   </div>

//                                   <div>
//                                     <div>
//                                       <p>Est Wait Time</p>
//                                       <div>
//                                         <div><ClockIcon /></div>
//                                         <input
//                                           type="text"
//                                           value={serviceEWTValues[s._id]}
//                                           onChange={(e) => {
//                                             const value = e.target.value.replace(/[^0-9]/g, ''); // Only keep digits
//                                             handleEWTChange(s._id, value);
//                                           }}
//                                         />
//                                         <p>mins</p>
//                                       </div>
//                                     </div>
//                                   </div>

//                                 </div>

//                                 {
//                                   chooseServices.find((c) => c._id === s._id) ?
//                                     (<button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(s)}>Delete</button>) :
//                                     (<button className={`${style.service_add_icon}`} onClick={() => chooseServiceHandler(s)}>Add</button>)
//                                 }

//                               </div>
//                             )
//                           })
//                         }
//                       </div>
//                     ) : (
//                       <div className={`${style.admin_mobile_create_barber_content_wrapper_right_error}`}>
//                         <p>No services available</p>
//                       </div>
//                     )
//                 }

//               </div>
//             </Modal>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateBarber;

import React, { useState } from 'react'
import style from './CreateBarber.module.css'
import { ClickAwayListener, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { AddIcon, DeleteIcon, DropdownIcon, FacebookIcon, InstagramIcon, TiktokIcon, WebsiteIcon, XIcon } from '../../../newicons';

const CreateBarber = () => {

  const steps = [
    {
      label: 'Barber Information',
      fields: [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter barber name' },
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter barber email' },
        { name: 'nickname', label: 'Nick Name', type: 'text', placeholder: 'Enter barber nickname' },
        { name: 'mobileNumber', label: 'Mobile Number', type: 'text', placeholder: 'Enter barber mobile number' },
        { name: 'dateofbirth', label: 'Date of Birth', type: 'date', placeholder: 'Enter barber date of birth' },
      ],
    },
    {
      label: 'Barber Services',
      name: 'barberservices',
      fields: [

      ],
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    accountInfo: '',
    projectID: '',
    ownerName: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
  });


  // console.log(formData)

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleNext = () => {
    //This is doing the form validation before going to next
    // const currentStepFields = steps[activeStep].fields;
    // console.log(currentStepFields.name)
    // const isStepValid = currentStepFields.every((field) => formData[field.name].trim() !== '');

    // if (isStepValid) {
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // } else {
    //   alert('Please fill in all fields before proceeding.');
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      accountInfo: '',
      projectID: '',
      ownerName: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
    });
  };

  const [open, setOpen] = useState(false)

  const [salonServices, setSalonServices] = useState([
    {
      id: 1,
      name: "Braids & Layers",
      type: "Regular",
      description: "Today’s salon owners know that everyone wants to look their best.",
      price: "€ 300",
      estimatedTime: 30,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAX-3gW6jkfyqli9j8rItCUFOyEqCf57ZTw&s",
      add: false,
    },
    {
      id: 2,
      name: "Style Lounge",
      type: "VIP",
      description: "Today’s salon owners know that everyone wants to look their best and many people don’t consider salon services gender-specific. If you want a unisex salon name that reflects an inclusive brand, use these ideas for inspiration.",
      price: "€ 300",
      estimatedTime: 30,
      image: "https://dynamic.brandcrowd.com/asset/logo/4641cc89-eed8-46eb-b525-15da3ea2d021/logo-search-grid-1x?logoTemplateVersion=1&v=638302799045600000",
      add: false,
    },
    {
      id: 3,
      name: "Dueling Scissors",
      type: "Regular",
      description: "Today’s salon owners know.",
      price: "€ 300",
      estimatedTime: 30,
      image: "https://marketplace.canva.com/EAFHiAQTPQQ/1/0/1600w/canva-pink-black-hand-drawn-hair-salon-logo-tVTdlo6D5XQ.jpg",
      add: false,
    }])

  const copySalonServices = [
    {
      id: 1,
      name: "Braids & Layers",
      type: "Regular",
      description: "Today’s salon owners know that everyone wants to look their best.",
      price: "€ 300",
      estimatedTime: 30,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBAX-3gW6jkfyqli9j8rItCUFOyEqCf57ZTw&s",
      add: false,
    },
    {
      id: 2,
      name: "Style Lounge",
      type: "VIP",
      description: "Today’s salon owners know that everyone wants to look their best and many people don’t consider salon services gender-specific. If you want a unisex salon name that reflects an inclusive brand, use these ideas for inspiration.",
      price: "€ 300",
      estimatedTime: 30,
      image: "https://dynamic.brandcrowd.com/asset/logo/4641cc89-eed8-46eb-b525-15da3ea2d021/logo-search-grid-1x?logoTemplateVersion=1&v=638302799045600000",
      add: false,
    },
    {
      id: 3,
      name: "Dueling Scissors",
      type: "Regular",
      description: "Today’s salon owners know.",
      price: "€ 300",
      estimatedTime: 30,
      image: "https://marketplace.canva.com/EAFHiAQTPQQ/1/0/1600w/canva-pink-black-hand-drawn-hair-salon-logo-tVTdlo6D5XQ.jpg",
      add: false,
    }]

  const [barberServices, setBarberServices] = useState([])

  const addBarberServicesHandler = (service) => {
    setBarberServices((prev) => {
      const updatedBarberServices = [...prev, service]
      return updatedBarberServices
    })

    setSalonServices((prev) => {
      const updatedSalonServices = prev.map((item) => {
        return item.id === service.id ? ({ ...item, add: true }) : (item)
      })
      return updatedSalonServices
    })
  }

  const deleteBarberServicesHandler = (service) => {
    setBarberServices((prev) => {
      const updatedBarberServices = prev.filter((item) => {
        return item.id !== service.id
      })
      return updatedBarberServices
    })

    const prevService = copySalonServices.find((item) => item.id !== service.id)

    setSalonServices((prev) => {
      
      const updatedSalonServices = prev.map((item) => {
        return item.id === service.id ? ({ ...item, add: false, estimatedTime: prevService.estimatedTime }) : (item)
      })
      return updatedSalonServices
    })
  }

  const handleEWTChange = (serviceId, value) => {

    setSalonServices((prev) => {
      const updatedSalonServices = prev.map((item) => {
        return item.id === serviceId ? ({ ...item, estimatedTime: value }) : (item)
      })
      return updatedSalonServices
    })

    setBarberServices((prev) => {
      const updatedBarberServices = prev.map((item) => {
        return item.id === serviceId ? ({ ...item, estimatedTime: value }) : (item)
      })
      return updatedBarberServices
    })
  }

  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Create Barber</h2>
      </div>

      <div className={`${style.form_main_container}`}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            "& .MuiStepIcon-root": {
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "2rem",
              color: "var(--bg-tertiary)",
            },
            "& .MuiStepIcon-text": {
              fontSize: "1.4rem",
              color: "var(--text-primary)",
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "var(--bg-secondary)",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              background: "green",
              borderRadius: "50%",
              color: "var(--text-primary)",
              padding: "0.5rem"
            },
          }}

        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <span className={`${style.stepper_heading}`}>{step.label}</span>
              </StepLabel>

              {
                step.label === "Barber Information" && (<StepContent>
                  <main className={`${style.form_container}`}>
                    {step.fields.map((field) => (
                      <div key={field.name} className={`${style.form_group}`}>
                        <label>{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          placeholder={field.placeholder}
                          onChange={handleChange}
                        />
                      </div>
                    ))}
                    <div className={`${style.button_container}`}>
                      <button onClick={handleBack} disabled={index === 0}>
                        Back
                      </button>
                      <button onClick={handleNext}>
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </button>
                    </div>
                  </main>
                </StepContent>)
              }


              {
                step.label === "Barber Services" && (<StepContent>
                  <main className={`${style.service_container}`}>

                    <div>
                      <div>

                        {/* Left Service start ====  */}

                        <div>
                          {salonServices.map((service) => (
                            <div key={service.id} className={style.service_item}>
                              <div>
                                <div>
                                  <div><img src={service.image} alt={service.name} /></div>
                                  <div>
                                    <p>{service.name}</p>
                                    <p>{service.type}</p>
                                    <p>{service.description}</p>
                                  </div>
                                </div>
                                {service.add ? (
                                  <button
                                    style={{
                                      background: "#450a0a",
                                    }}
                                    onClick={() => deleteBarberServicesHandler(service)}
                                  ><DeleteIcon /></button>
                                ) : (
                                  <button
                                    style={{
                                      background: "#052e16",
                                    }}
                                    onClick={() => addBarberServicesHandler(service)}
                                  ><AddIcon /></button>
                                )}

                              </div>
                              <div>
                                <div>
                                  <p>Price</p>
                                  <p>{service.price}</p>
                                </div>
                                <div>
                                  <p>Estimated Time</p>
                                  <div>
                                    <input
                                      type="text"
                                      value={service.estimatedTime}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        handleEWTChange(service.id, value);
                                      }}
                                      maxLength={3}
                                    />
                                    <p>mins</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                        </div>

                        {/* Left Service End ====  */}

                        <div className={`${style.button_container}`}>
                          <button onClick={handleBack} disabled={index === 0}>
                            Back
                          </button>
                          <button onClick={handleNext}>
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </button>
                        </div>

                      </div>

                      {
                        barberServices.length > 0 ? (<div>
                          {barberServices.map((service) => (
                            <div key={service.id} className={style.service_item}>
                              <div>
                                <div>
                                  <div><img src={service.image} alt={service.name} /></div>
                                  <div>
                                    <p>{service.name}</p>
                                    <p>{service.type}</p>
                                    <p>{service.description}</p>
                                  </div>
                                </div>
                                {/* <button><DeleteIcon /></button> */}
                              </div>
                              <div>
                                <div>
                                  <p>Price</p>
                                  <p>{service.price}</p>
                                </div>
                                <div>
                                  <p>Estimated Time</p>
                                  <p>{`${service.estimatedTime} mins`}</p>
                                </div>
                              </div>
                            </div>
                          ))}

                        </div>) : (<div className={`${style.empty_barber_services}`}>
                          <p>Select Barber Services</p>
                        </div>)
                      }



                    </div>


                  </main>
                </StepContent>)
              }

            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <div className={`${style.complete}`}>
            <p>All steps have been successfully completed. Click the <span style={{ color: "var(--bg-secondary)", fontWeight: "bold" }}>Create</span> button to add a new barber.</p>
            <div>
              <button onClick={handleReset}>Reset</button>
              <button>Create</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CreateBarber
