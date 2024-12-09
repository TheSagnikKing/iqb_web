import React, { useEffect, useState } from 'react';
import style from "./EditBarber.module.css";
import { AddIcon, ClockIcon, CloseIcon, DeleteIcon } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllSalonServicesAction, adminUpdateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
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

  const {
    loading: adminAllSalonServicesLoading,
    resolve: adminAllSalonServicesResolve,
    response: allSalonServices
  } = adminAllSalonServices;

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

  // console.log("Current Barber ", currentBarber)

  // State variables
  const [name, setName] = useState(currentBarber?.name);
  const [email, setEmail] = useState(currentBarber?.email);
  const [nickName, setNickName] = useState(currentBarber?.nickName);
  const [mobileNumber, setMobileNumber] = useState(`${currentBarber?.mobileCountryCode}${currentBarber?.mobileNumber?.toString()}`);
  const [countryCode, setCountryCode] = useState(currentBarber?.mobileCountryCode)
  const [dateOfBirth, setDateOfBirth] = useState(currentBarber?.dateOfBirth?.split('T')[0]);


  const [currentBarberServices, setCurrentBarberServices] = useState(currentBarber?.barberServices)

  // console.log("currentBarberServices ", currentBarberServices)

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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [invalidNumberError, setInvalidNumberError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");
  const [servicesError, setServicesError] = useState("");

  const [invalidnumber, setInvalidNumber] = useState(false)

  const EditBarberHandler = () => {

    if (!name) {
      toast.error("Please enter name", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setNameError("Please enter name")
    }

    if (name.length === 0 || name.length > 20) {
      toast.error("Name must be between 1 to 20 characters", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setNameError("Name must be between 1 to 20 characters");
    }


    if (!nickName) {
      toast.error("Please enter nickname", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setNickNameError("Please enter nickname")
    }

    if (nickName.length === 0 || nickName.length > 20) {
      toast.error("Nickname must be between 1 to 20 characters", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setNickNameError("Nickname must be between 1 to 20 characters");
    }


    if (invalidnumber) {
      toast.error("Invalid Number", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      return setInvalidNumberError("Invalid Number")
    }

    if (!dateOfBirth) {
      toast.error("Please select date of birth", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      return setDateOfBirthError("Please select date of birth")
    }

    if (currentBarberServices.length === 0) {
      toast.error("Please provide a service", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      return setServicesError("Please provide a service")
    }

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

    dispatch(adminUpdateBarberAction(barberdata, navigate));

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      EditBarberHandler();
    }
  };

  const adminUpdateBarber = useSelector(state => state.adminUpdateBarber)

  const {
    loading: adminUpdateBarberLoading,
  } = adminUpdateBarber

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  const handleonChange = (e, service) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits

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

  const [countryflag, setCountryFlag] = useState("gb")

  const handlePhoneChange = (phone, meta) => {
    setInvalidNumberError("")
    const { country, inputValue } = meta;

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setMobileNumber(phone)
      setCountryCode(country?.dialCode)
      setCountryFlag(country?.iso2)
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
            adminAllSalonServicesLoading ?
              (<div className={`${style.admin_edit_barber_content_wrapper_right_loading}`}>
                <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "6px" }} />
                <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "6px" }} />
              </div>) :
              adminAllSalonServicesResolve && allSalonServices?.length > 0 ?
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
                onChange={(e) => {
                  setNameError("")
                  setName(e.target.value)
                }}
                placeholder='Enter Name'
                onKeyDown={handleKeyPress}
                style={{ border: nameError && "0.1rem solid red" }}
              />
              <p className={style.error_message}>{nameError}</p>
            </div>

            <div>
              <p>Email</p>
              <input
                type='text'
                value={email}
                placeholder='Enter Email'
                readOnly
              />
            </div>

            <div>
              <p>Nick Name</p>
              <input
                type='text'
                value={nickName}
                onChange={(e) => {
                  setNickNameError("")
                  setNickName(e.target.value)
                }}
                placeholder='Enter Nick Name'
                onKeyDown={handleKeyPress}
                style={{ border: nickNameError && "0.1rem solid red" }}
              />
               <p className={style.error_message}>{nickNameError}</p>
            </div>

            <div>
              <p>Mob. Number</p>
              <div>
                <div 
                onKeyDown={handleKeyPress}
                style={{ border: invalidNumberError && "0.1rem solid red" }}
                >
                  <PhoneInput
                    forceDialCode={true}
                    defaultCountry={countryflag}
                    value={mobileNumber}
                    onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                  />
                </div>
              </div>
              <p className={style.error_message}>{invalidNumberError}</p>
            </div>

            <div>
              <p>Date of Birth</p>
              <input
                type='date'
                placeholder='dd/mm/yy'
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirthError("")
                  setDateOfBirth(e.target.value)
                }}
                style={{
                  colorScheme: darkmodeOn ? "dark" : "light",
                  border: dateOfBirthError && "0.1rem solid red"
                }}
                onKeyDown={handleKeyPress}
              />
              <p className={style.error_message}>{dateOfBirthError}</p>
            </div>

            <div>
              <p>Selected Services</p>
              <input
                type='text'
                value={currentBarberServices?.map((s) => " " + s.serviceName)}
                placeholder='Your Services'
                readOnly
                style={{ border: servicesError && "0.1rem solid red"}}
              />
              <p className={style.error_message}>{servicesError}</p>
            </div>

            {
              adminUpdateBarberLoading ? <button
                className={`${style.edit_barber_btn}`}
                style={{
                  display: "grid",
                  placeItems: "center"
                }}><ButtonLoader /></button> : <button className={`${style.edit_barber_btn}`} onClick={EditBarberHandler}>
                Update
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



