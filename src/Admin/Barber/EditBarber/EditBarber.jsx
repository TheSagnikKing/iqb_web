// import React, { useEffect, useRef, useState } from 'react';
// import "./EditBarber.css";
// import { DeleteIcon } from '../../../icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminAllSalonServicesAction, adminCreateBarberAction, adminUpdateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
// import Skeleton from 'react-loading-skeleton';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
// import { PhoneInput } from 'react-international-phone';
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

// import { PhoneNumberUtil } from 'google-libphonenumber';
// import toast from 'react-hot-toast';

// const EditBarber = () => {

//   const [AllSalonServices, setAllSalonServices] = useState([])
//   // Redux selectors
//   const adminAllSalonServices = useSelector(state => state.adminAllSalonServices);
//   const { loading: adminAllSalonServicesLoading, resolve: adminAllSalonServicesResolve, response: allSalonServices } = adminAllSalonServices;

//   useEffect(() => {
//     if (allSalonServices) {
//       setAllSalonServices(allSalonServices)
//     }
//   }, [allSalonServices])

//   // console.log("AllSalonServices ", AllSalonServices)


//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const currentBarber = location?.state;

//   console.log("Current Barber ", currentBarber)

//   // State variables
//   const [name, setName] = useState(currentBarber?.name);
//   const [email, setEmail] = useState(currentBarber?.email);
//   const [nickName, setNickName] = useState(currentBarber?.nickName);
//   const [mobileNumber, setMobileNumber] = useState(`${currentBarber?.mobileCountryCode}${currentBarber?.mobileNumber.toString()}`);
//   const [countryCode, setCountryCode] = useState(currentBarber?.mobileCountryCode)
//   const [dateOfBirth, setDateOfBirth] = useState(currentBarber?.dateOfBirth?.split('T')[0]);
//   const [chooseServices, setChooseServices] = useState([]);
//   const [serviceEWTValues, setServiceEWTValues] = useState({});

//   const [currentBarberServices, setCurrentBarberServices] = useState(currentBarber?.barberServices)

//   console.log("currentBarberServices ", currentBarberServices)

//   // Fetch all salon services on component mount
//   useEffect(() => {
//     dispatch(adminAllSalonServicesAction(salonId));
//   }, [salonId, dispatch]);



//   // Choose service handler
//   const chooseServiceHandler = (service) => {
//     const originalService = currentBarberServices.includes(service);

//     if (!originalService) {
//       setCurrentBarberServices([...currentBarberServices, { ...service, barberServiceEWT: service.serviceEWT }]);
//     }

//   };

//   // Delete service handler
//   const deleteServiceHandler = (service) => {
//     const originalService = allSalonServices.find((s) => s.serviceId === service.serviceId);

//     if (originalService) {
//       setCurrentBarberServices(currentBarberServices.filter((f) => f.serviceId !== service.serviceId));

//       setAllSalonServices(AllSalonServices.map((ser) =>
//         ser.serviceId === service.serviceId ? { ...ser, serviceEWT: originalService.serviceEWT } : ser
//       ));
//     }
//   };

//   const [invalidnumber, setInvalidNumber] = useState(false)

//   // Create barber handler
//   const EditBarberHandler = () => {
//     if (invalidnumber) {
//       toast.error("Invalid Number", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } else {
//       const barberdata = {
//         name,
//         email,
//         nickName,
//         mobileNumber: Number(mobileNumber),
//         countryCode: Number(countryCode),
//         dateOfBirth,
//         salonId,
//         barberServices: currentBarberServices
//       };

//       console.log(barberdata)

//       // Dispatch action to create or update barber
//       dispatch(adminUpdateBarberAction(barberdata, navigate));
//     }

//   };


//   const adminUpdateBarber = useSelector(state => state.adminUpdateBarber)

//   const {
//     loading: adminUpdateBarberLoading,
//   } = adminUpdateBarber

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   const handleonChange = (e, service) => {

//     if (currentBarberServices.find((c) => c.serviceId === service.serviceId)) {
//       setCurrentBarberServices(currentBarberServices.map((ser) =>
//         ser.serviceId === service.serviceId ? { ...ser, barberServiceEWT: Number(e.target.value) } : ser
//       ));
//     } else {
//       setAllSalonServices(allSalonServices.map((ser) =>
//         ser.serviceId === service.serviceId ? { ...ser, serviceEWT: Number(e.target.value) } : ser
//       ));
//     }
//   }

//   const phoneUtil = PhoneNumberUtil.getInstance();

//   const isPhoneValid = (phone) => {
//     try {
//       return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//     } catch (error) {
//       return false;
//     }
//   };

//   const handlePhoneChange = (phone, meta) => {
//     const { country, inputValue } = meta;

//     const isValid = isPhoneValid(phone);

//     if (isValid) {
//       setMobileNumber(phone)
//       setCountryCode(country?.dialCode)
//       setInvalidNumber(false)
//     } else {
//       setInvalidNumber(true)
//     }
//   };




//   return (
//     <div className={`admin_edit_barber_wrapper ${darkmodeOn && "dark"}`}>
//       <p>Edit Barber</p>
//       <div className={`admin_edit_barber_wrapper_container ${darkmodeOn && "dark"}`}>
//         <div>
//           <p>Barber Name</p>
//           <input
//             type='text'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div>
//           <p>Barber Email</p>
//           <input
//             type='text'
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div>
//           <p>Barber Nick Name</p>
//           <input
//             type='text'
//             value={nickName}
//             onChange={(e) => setNickName(e.target.value)}
//           />
//         </div>

//         <div>
//           <div>
//             <p>Mobile Number</p>
//             <div>
//               <div>
//                 <PhoneInput
//                   forceDialCode={true}
//                   defaultCountry="gb"
//                   value={mobileNumber}
//                   onChange={(phone, meta) => handlePhoneChange(phone, meta)}
//                 />
//               </div>

//             </div>
//           </div>

//           <div>
//             <p>Date of Birth</p>
//             <input
//               type='date'
//               placeholder='dd/mm/yy'
//               value={dateOfBirth}
//               onChange={(e) => setDateOfBirth(e.target.value)}
//               style={{
//                 colorScheme: darkmodeOn ? "dark" : "light"
//               }}
//             />
//           </div>
//         </div>

//         <p>Add Services</p>

//         <div className={`admin_barber_services_container ${darkmodeOn && "dark"}`}
//           style={{
//             marginBottom: "3rem",
//             background: adminAllSalonServicesLoading ? "var(--primary-bg-light-color1)" : "var(--bg-color3)"
//           }}
//         >
//           {
//             AllSalonServices?.map((s) => (
//               <div className={`admin_barber_services_container_item ${darkmodeOn && "dark"}`} key={s._id}>
//                 <div>
//                   <p>Service ID</p>
//                   <p>{s.serviceId}</p>
//                 </div>

//                 <div>
//                   <p>Service Name</p>
//                   <p>{s.serviceName}</p>
//                 </div>

//                 <div>
//                   <p>Est Wait Tm(mins)</p>
//                   <input
//                     type="text"
//                     value={currentBarberServices?.find((c) => c.serviceId === s.serviceId) ? currentBarberServices?.find((c) => c.serviceId === s.serviceId).barberServiceEWT : s.serviceEWT}
//                     onChange={(e) => handleonChange(e, s)}
//                   />
//                 </div>

//                 {currentBarberServices.find((c) => c.serviceId === s.serviceId) ? (
//                   <div
//                     style={{
//                       background: "red"
//                     }}
//                     onClick={() => deleteServiceHandler(s)}
//                   ><DeleteIcon /></div>
//                 ) : (
//                   <div
//                     style={{
//                       background: "var(--primary-bg-color3)"
//                     }}
//                     onClick={() => chooseServiceHandler(s)}
//                   >+</div>
//                 )}
//               </div>
//             ))
//           }
//         </div>

//         <div>
//           {
//             adminUpdateBarberLoading ? <button style={{
//               display: "grid",
//               placeItems: "center"
//             }}><ButtonLoader /></button> : <button onClick={EditBarberHandler}>Update</button>
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditBarber;



import React, { useEffect, useRef, useState } from 'react';
import style from "./EditBarber.module.css";
import { AddIcon, ClockIcon, CloseIcon, DeleteIcon } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllSalonServicesAction, adminCreateBarberAction, adminUpdateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
import { PhoneInput } from 'react-international-phone';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

import { PhoneNumberUtil } from 'google-libphonenumber';
import toast from 'react-hot-toast';

import Skeleton from '@mui/material/Skeleton';
import { Box, Modal, Typography } from '@mui/material';

const EditBarber = () => {

  const [AllSalonServices, setAllSalonServices] = useState([])
  // Redux selectors
  const adminAllSalonServices = useSelector(state => state.adminAllSalonServices);
  const { loading: adminAllSalonServicesLoading, resolve: adminAllSalonServicesResolve, response: allSalonServices } = adminAllSalonServices;

  useEffect(() => {
    if (allSalonServices) {
      setAllSalonServices(allSalonServices)
    }
  }, [allSalonServices])

  // console.log("AllSalonServices ", AllSalonServices)


  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBarber = location?.state;

  console.log("Current Barber ", currentBarber)

  // State variables
  const [name, setName] = useState(currentBarber?.name);
  const [email, setEmail] = useState(currentBarber?.email);
  const [nickName, setNickName] = useState(currentBarber?.nickName);
  const [mobileNumber, setMobileNumber] = useState(`${currentBarber?.mobileCountryCode}${currentBarber?.mobileNumber.toString()}`);
  const [countryCode, setCountryCode] = useState(currentBarber?.mobileCountryCode)
  const [dateOfBirth, setDateOfBirth] = useState(currentBarber?.dateOfBirth?.split('T')[0]);
  const [chooseServices, setChooseServices] = useState([]);
  const [serviceEWTValues, setServiceEWTValues] = useState({});

  const [currentBarberServices, setCurrentBarberServices] = useState(currentBarber?.barberServices)

  console.log("currentBarberServices ", currentBarberServices)

  // Fetch all salon services on component mount
  useEffect(() => {
    dispatch(adminAllSalonServicesAction(salonId));
  }, [salonId, dispatch]);



  // Choose service handler
  const chooseServiceHandler = (service) => {
    const originalService = currentBarberServices.includes(service);

    if (!originalService) {
      setCurrentBarberServices([...currentBarberServices, { ...service, barberServiceEWT: service.serviceEWT }]);
    }

  };

  // Delete service handler
  const deleteServiceHandler = (service) => {
    const originalService = allSalonServices.find((s) => s.serviceId === service.serviceId);

    if (originalService) {
      setCurrentBarberServices(currentBarberServices.filter((f) => f.serviceId !== service.serviceId));

      setAllSalonServices(AllSalonServices.map((ser) =>
        ser.serviceId === service.serviceId ? { ...ser, serviceEWT: originalService.serviceEWT } : ser
      ));
    }
  };

  const [invalidnumber, setInvalidNumber] = useState(false)

  // Create barber handler
  const EditBarberHandler = () => {
    if (invalidnumber) {
      toast.error("Invalid Number", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      const barberdata = {
        name,
        email,
        nickName,
        mobileNumber: Number(mobileNumber),
        countryCode: Number(countryCode),
        dateOfBirth,
        salonId,
        barberServices: currentBarberServices
      };

      console.log(barberdata)

      // Dispatch action to create or update barber
      dispatch(adminUpdateBarberAction(barberdata, navigate));
    }

  };


  const adminUpdateBarber = useSelector(state => state.adminUpdateBarber)

  const {
    loading: adminUpdateBarberLoading,
  } = adminUpdateBarber

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  // const handleonChange = (e, service) => {

  //   if (currentBarberServices.find((c) => c.serviceId === service.serviceId)) {
  //     setCurrentBarberServices(currentBarberServices.map((ser) =>
  //       ser.serviceId === service.serviceId ? { ...ser, barberServiceEWT: Number(e.target.value) } : ser
  //     ));
  //   } else {
  //     setAllSalonServices(allSalonServices.map((ser) =>
  //       ser.serviceId === service.serviceId ? { ...ser, serviceEWT: Number(e.target.value) } : ser
  //     ));
  //   }
  // }

  const handleonChange = (e, service) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits

    // Check if the value is a valid number or is empty (allowing the user to clear input)
    const numericValue = newValue === '' ? '' : Number(newValue);

    if (currentBarberServices.find((c) => c.serviceId === service.serviceId)) {
      setCurrentBarberServices(currentBarberServices.map((ser) =>
        ser.serviceId === service.serviceId ? { ...ser, barberServiceEWT: numericValue } : ser
      ));
    } else {
      setAllSalonServices(allSalonServices.map((ser) =>
        ser.serviceId === service.serviceId ? { ...ser, serviceEWT: numericValue } : ser
      ));
    }
  };


  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const handlePhoneChange = (phone, meta) => {
    const { country, inputValue } = meta;

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setMobileNumber(phone)
      setCountryCode(country?.dialCode)
      setInvalidNumber(false)
    } else {
      setInvalidNumber(true)
    }
  };


  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={`${style.admin_edit_barber_wrapper} ${darkmodeOn && style.dark}`}>

        <div className={`${style.admin_edit_barber_wrapper_right}`}>
          <div>
            <p>Add Your Services</p>
          </div>

          {
            adminAllSalonServicesLoading && !adminAllSalonServicesResolve ?
              (<div className={`${style.admin_edit_barber_content_wrapper_right_loading}`}>
                <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "6px" }} />
                <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "6px" }} />
              </div>) :
              !adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length > 0 ?
                (
                  <div className={`${style.admin_edit_barber_content_wrapper_right}`}>

                    {
                      AllSalonServices?.map((s) => {
                        return (
                          <div className={`${style.service_item}`} key={s._id}>
                            <div className={`${style.service_item_top}`}>
                              <div><img src={s?.serviceIcon?.url} alt="service icon" /></div>
                              <div>
                                <p>{s?.serviceName}</p>
                                <p>{s?.vipService ? "VIP" : "Regular"}</p>
                                <p>{s?.serviceDesc}</p>
                              </div>
                            </div>
                            <div className={`${style.service_item_bottom}`}>
                              <div>
                                <div>
                                  <p>Service Price</p>
                                  <p>{adminGetDefaultSalonResponse?.currency}{s?.servicePrice}</p>
                                </div>
                              </div>

                              <div>
                                <div>
                                  <p>Est Wait Time</p>
                                  <div>
                                    <div><ClockIcon /></div>
                                    <input
                                      type="text"
                                      value={currentBarberServices?.find((c) => c.serviceId === s.serviceId) ? currentBarberServices?.find((c) => c.serviceId === s.serviceId).barberServiceEWT : s.serviceEWT}
                                      onChange={(e) => handleonChange(e, s)}
                                    />
                                    <p>mins</p>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {
                              currentBarberServices.find((c) => c.serviceId === s.serviceId) ?
                                (<button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(s)}><DeleteIcon /></button>) :
                                (<button className={`${style.service_add_icon}`} onClick={() => chooseServiceHandler(s)}><AddIcon /></button>)
                            }

                          </div>
                        )
                      })
                    }

                  </div>
                ) :
                (<div className={`${style.admin_edit_barber_content_wrapper_right_error}`}>
                  <p>No services available</p>
                </div>)
          }

        </div>

        <div className={`${style.admin_edit_barber_wrapper_left}`}>
          <div>
            <p>Edit Barber</p>

            <button
              onClick={handleOpen}
              className={style.add_services_btn}
            >Add Services</button>
          </div>

          <div className={`${style.admin_edit_barber_content_wrapper_left}`}>

            <div>
              <p>Name</p>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter Name'
              />
            </div>

            <div>
              <p>Email</p>
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email'
              />
            </div>

            <div>
              <p>Nick Name</p>
              <input
                type='text'
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder='Enter Nick Name'
              />
            </div>

            <div>
              <p>Mob. Number</p>
              <div>
                <div>
                  <PhoneInput
                    forceDialCode={true}
                    defaultCountry="gb"
                    value={mobileNumber}
                    onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                  />
                </div>

              </div>
            </div>

            <div>
              <p>Date of Birth</p>
              <input
                type='date'
                placeholder='dd/mm/yy'
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                style={{
                  colorScheme: darkmodeOn ? "dark" : "light"
                }}
              />
            </div>

            <div>
              <p>Selected Services</p>
              <input
                type='text'
                value={currentBarberServices?.map((s) => " " + s.serviceName)}
                placeholder='Your Services'
              />
            </div>

            {
              adminUpdateBarberLoading ? <button
                className={`${style.edit_barber_btn}`}
                style={{
                  display: "grid",
                  placeItems: "center"
                }}><ButtonLoader /></button> : <button className={`${style.edit_barber_btn}`} onClick={EditBarberHandler}>
                <p>Save</p>
                <div>+</div>
              </button>
            }


            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className={style.mobile_modal}
            >
              <div className={style.mobile_service_container}>
                <button onClick={handleClose}><CloseIcon /></button>
                <div>
                  {
                    AllSalonServices?.map((s) => {
                      return (
                        <div className={`${style.service_item}`} key={s._id}>
                          <div className={`${style.service_item_top}`}>
                            <div><img src={s?.serviceIcon?.url} alt="service icon" /></div>
                            <div>
                              <p>{s?.serviceName}</p>
                              <p>{s?.vipService ? "VIP" : "Regular"}</p>
                              <p>{s?.serviceDesc}</p>
                            </div>
                          </div>
                          <div className={`${style.service_item_bottom}`}>
                            <div>
                              <div>
                                <p>Service Price</p>
                                <p>{adminGetDefaultSalonResponse?.currency}{s?.servicePrice}</p>
                              </div>
                            </div>

                            <div>
                              <div>
                                <p>Est Wait Time</p>
                                <div>
                                  <div><ClockIcon /></div>
                                  <input
                                    type="text"
                                    value={currentBarberServices?.find((c) => c.serviceId === s.serviceId) ? currentBarberServices?.find((c) => c.serviceId === s.serviceId).barberServiceEWT : s.serviceEWT}
                                    onChange={(e) => handleonChange(e, s)}
                                  />
                                  <p>mins</p>
                                </div>
                              </div>
                            </div>

                          </div>

                          {
                            currentBarberServices.find((c) => c.serviceId === s.serviceId) ?
                              (<button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(s)}><DeleteIcon /></button>) :
                              (<button className={`${style.service_add_icon}`} onClick={() => chooseServiceHandler(s)}><AddIcon /></button>)
                          }

                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Modal>

          </div>
        </div>
      </div>
    </>
  );
};

export default EditBarber;



