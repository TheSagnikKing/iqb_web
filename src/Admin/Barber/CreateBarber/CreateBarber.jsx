import React, { useEffect, useRef, useState } from 'react';
import style from "./CreateBarber.module.css";
import { AddIcon, ClockIcon, CloseIcon, DeleteIcon } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllSalonServicesAction, adminCreateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
import { PhoneInput } from 'react-international-phone';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';
import { PhoneNumberUtil } from 'google-libphonenumber';
import toast from 'react-hot-toast';
import { Skeleton, Modal } from '@mui/material';

const CreateBarber = () => {
  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("");

  const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

  const AllSalonServicesControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (adminProfile?.salonId !== 0) {
      const controller = new AbortController();
      AllSalonServicesControllerRef.current = controller;

      dispatch(adminAllSalonServicesAction(salonId, controller.signal));

      return () => {
        if (AllSalonServicesControllerRef.current) {
          AllSalonServicesControllerRef.current.abort();
        }
      };
    }

  }, [salonId, dispatch, adminProfile]);

  const adminAllSalonServices = useSelector(state => state.adminAllSalonServices);

  const {
    loading: adminAllSalonServicesLoading,
    resolve: adminAllSalonServicesResolve,
    response: allSalonServices
  } = adminAllSalonServices;

  const [chooseServices, setChooseServices] = useState([]);
  const [serviceEWTValues, setServiceEWTValues] = useState({});

  useEffect(() => {
    if (allSalonServices) {
      const initialEWTValues = {};
      allSalonServices.forEach(service => {
        initialEWTValues[service._id] = service.serviceEWT;
      });
      setServiceEWTValues(initialEWTValues);
    }
  }, [allSalonServices]);


  const chooseServiceHandler = (service) => {
    setChooseServices([...chooseServices, service]);
  };

  const deleteServiceHandler = (service) => {
    setChooseServices(chooseServices.filter((f) => f._id !== service._id));

    const initialEWTValues = {};
    allSalonServices.forEach(service => {
      initialEWTValues[service._id] = service.serviceEWT;
    });
    setServiceEWTValues(initialEWTValues);
  };

  const handleEWTChange = (serviceId, newValue) => {
    setServiceEWTValues({
      ...serviceEWTValues,
      [serviceId]: Number(newValue)
    });
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("barberdata")) || {};

    setName(storedData.name)
    setEmail(storedData.email)
    setNickName(storedData.nickName)
    setDateOfBirth(storedData.dateOfBirth)
  }, []);


  const [invalidnumber, setInvalidNumber] = useState(false)

  const CreateBarberHandler = () => {
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
    } else {
      const barberdata = {
        name: name, email: email, nickName: nickName, mobileNumber: Number(mobileNumber), countryCode: Number(countryCode), dateOfBirth: dateOfBirth,
        salonId,
        barberServices: chooseServices.map(service => ({
          ...service,
          barberServiceEWT: serviceEWTValues[service._id]
        }))
      };

      // console.log("Create Barber Data ", barberdata)

      dispatch(adminCreateBarberAction(barberdata, navigate))
    }

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      CreateBarberHandler();
    }
  };

  const adminCreateBarber = useSelector(state => state.adminCreateBarber)

  const {
    loading: adminCreateBarberLoading,
  } = adminCreateBarber

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const [countryflag, setCountryFlag] = useState("gb")

  const handlePhoneChange = (phone, meta, localname) => {

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


  const setHandler = (setState, value, localname) => {
    setState(value);
    // console.log("Saving to localStorage:", localname, value);

    const existingData = JSON.parse(localStorage.getItem("barberdata")) || {};

    localStorage.setItem("barberdata", JSON.stringify({
      ...existingData,
      [localname]: value
    }));
  }

  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

  const {
    response: adminGetDefaultSalonResponse
  } = adminGetDefaultSalon

  // console.log("Create Barber ", adminGetDefaultSalonResponse)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={`${style.admin_create_barber_wrapper} ${darkmodeOn && style.dark}`}>

        <div className={`${style.admin_create_barber_wrapper_right}`}>
          <div>
            <p>Add Your Services</p>
          </div>

          {
            adminAllSalonServicesLoading ?
              (<div className={`${style.admin_create_barber_content_wrapper_right_loading}`}>
                <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "var(--list-wrapper-border-radius)" }} />
                <Skeleton variant="rectangular" width={"100%"} height={"16rem"} style={{ borderRadius: "var(--list-wrapper-border-radius)" }} />
              </div>) :
              adminAllSalonServicesResolve && allSalonServices?.length > 0 ?
                (
                  <div className={`${style.admin_create_barber_content_wrapper_right}`}>

                    {
                      allSalonServices?.map((s) => {
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
                                      value={serviceEWTValues[s._id]}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, ''); // Only keep digits
                                        handleEWTChange(s._id, value);
                                      }}
                                    />
                                    <p>mins</p>
                                  </div>
                                </div>
                              </div>

                            </div>

                            {
                              chooseServices.find((c) => c._id === s._id) ?
                                (<button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(s)}><DeleteIcon /></button>) :
                                (<button className={`${style.service_add_icon}`} onClick={() => chooseServiceHandler(s)}><AddIcon /></button>)
                            }

                          </div>
                        )
                      })
                    }

                  </div>
                ) :
                (<div className={`${style.admin_create_barber_content_wrapper_right_error}`}>
                  <p>No services available</p>
                </div>)
          }

        </div>

        <div className={`${style.admin_create_barber_wrapper_left}`}>
          <div>
            <p>Create Barber</p>

            <button
              onClick={handleOpen}
              className={style.add_services_btn}
            >Add Services</button>
          </div>

          <div className={`${style.admin_create_barber_content_wrapper_left}`}>

            <div>
              <p>Name</p>
              <input
                type='text'
                value={name}
                placeholder='Enter Name'
                onChange={(e) => setHandler(setName, e.target.value, "name")}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Email</p>
              <input
                type='text'
                value={email}
                placeholder='Enter Email'
                onChange={(e) => setHandler(setEmail, e.target.value, "email")}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Nick Name</p>
              <input
                type='text'
                value={nickName}
                placeholder='Enter Nick Name'
                onChange={(e) => setHandler(setNickName, e.target.value, "nickName")}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Mob. Number</p>
              <div>
                <div onKeyDown={handleKeyPress}>
                  <PhoneInput
                    forceDialCode={true}
                    defaultCountry={countryflag}
                    value={mobileNumber}
                    onChange={(phone, meta) => handlePhoneChange(phone, meta, "mobileNumber")}
                  />
                </div>

              </div>
            </div>

            <div>
              <p>Date of Birth</p>
              <input
                type='date'
                placeholder='DD/MM/YY'
                value={dateOfBirth}
                onChange={(e) => setHandler(setDateOfBirth, e.target.value, "dateOfBirth")}
                style={{
                  colorScheme: darkmodeOn ? "dark" : "light"
                }}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Selected Services</p>
              <input
                type='text'
                value={chooseServices?.map((s) => " " + s.serviceName)}
                placeholder='Your Services'
                onKeyDown={handleKeyPress}
              />
            </div>

            {
              adminCreateBarberLoading ? <button
                className={`${style.create_barber_btn}`}
                style={{
                  display: "grid",
                  placeItems: "center"
                }}><ButtonLoader /></button> : <button className={`${style.create_barber_btn}`} onClick={CreateBarberHandler}>
                Create
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
                    allSalonServices?.map((s) => {
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
                                    value={serviceEWTValues[s._id]}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/[^0-9]/g, ''); // Only keep digits
                                      handleEWTChange(s._id, value);
                                    }}
                                  />
                                  <p>mins</p>
                                </div>
                              </div>
                            </div>

                          </div>

                          {
                            chooseServices.find((c) => c._id === s._id) ?
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

export default CreateBarber;
