import React, { useEffect, useRef, useState } from 'react';
import "./CreateBarber.css";
import { DeleteIcon } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllSalonServicesAction, adminCreateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
import { PhoneInput } from 'react-international-phone';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

import { PhoneNumberUtil } from 'google-libphonenumber';
import toast from 'react-hot-toast';

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

  const AllSalonServicesControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    AllSalonServicesControllerRef.current = controller;

    dispatch(adminAllSalonServicesAction(salonId, controller.signal));

    return () => {
      if (AllSalonServicesControllerRef.current) {
        AllSalonServicesControllerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

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
  };

  const handleEWTChange = (serviceId, newValue) => {
    setServiceEWTValues({
      ...serviceEWTValues,
      [serviceId]: Number(newValue)
    });
  };


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("salondata")) || {};
    setLocalbarberdata(storedData);
  }, [name, email, nickName, dateOfBirth]);

  const [localbarberdata, setLocalbarberdata] = useState({})

  const [invalidnumber, setInvalidNumber] = useState(false)

  const CreateBarberHandler = () => {
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
        name: localbarberdata.name, email: localbarberdata.email, nickName: localbarberdata.nickName, mobileNumber: Number(mobileNumber), countryCode: Number(countryCode), dateOfBirth: localbarberdata.dateOfBirth,
        salonId,
        barberServices: chooseServices.map(service => ({
          ...service,
          barberServiceEWT: serviceEWTValues[service._id]
        }))
      };

      console.log(barberdata)

      dispatch(adminCreateBarberAction(barberdata, navigate))
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

  const handlePhoneChange = (phone, meta, localname) => {
    const { country, inputValue } = meta;

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setMobileNumber(phone)
      setCountryCode(country?.dialCode)
      setInvalidNumber(false)
    } else {
      setInvalidNumber(true)
    }
    // const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

    // localStorage.setItem("salondata", JSON.stringify({
    //   ...existingData,
    //   [localname]: phone
    // }));

    // The tel package is causing the state to reset
  };


  const setHandler = (setState, value, localname) => {
    setState(value);
    console.log("Saving to localStorage:", localname, value);

    const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

    localStorage.setItem("salondata", JSON.stringify({
      ...existingData,
      [localname]: value
    }));
  }



  console.log(localbarberdata)

  return (
    <div className={`admin_create_barber_wrapper ${darkmodeOn && "dark"}`}>
      <p>Create Barber</p>
      <div className={`admin_create_barber_wrapper_container ${darkmodeOn && "dark"}`}>
        <div>
          <p>Barber Name</p>
          <input
            type='text'
            value={localbarberdata.name}
            // onChange={(e) => setName(e.target.value)}
            onChange={(e) => setHandler(setName, e.target.value, "name")}
          />
        </div>

        <div>
          <p>Barber Email</p>
          <input
            type='text'
            value={localbarberdata.email}
            // onChange={(e) => setEmail(e.target.value)}
            onChange={(e) => setHandler(setEmail, e.target.value, "email")}
          />
        </div>

        <div>
          <p>Barber Nick Name</p>
          <input
            type='text'
            value={localbarberdata.nickName}
            // onChange={(e) => setNickName(e.target.value)}
            onChange={(e) => setHandler(setNickName, e.target.value, "nickName")}
          />
        </div>

        <div>
          {/* <div>
            <p>Mobile No.</p>
            <input
              type='text'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div> */}

          <div>
            <p>Mobile Number</p>
            <div>
              <div>
                <PhoneInput
                  forceDialCode={true}
                  defaultCountry="gb"
                  value={localbarberdata.mobileNumber}
                  onChange={(phone, meta) => handlePhoneChange(phone, meta, "mobileNumber")}
                // onChange={(phone, number) => setPhoneHandler(handlePhoneChange,phone, meta,mobileNumber )}
                />
              </div>

            </div>
          </div>

          <div>
            <p>Date of Birth</p>
            <input
              type='date'
              placeholder='dd/mm/yy'
              value={localbarberdata.dateOfBirth}
              // onChange={(e) => setDateOfBirth(e.target.value)}
              onChange={(e) => setHandler(setDateOfBirth, e.target.value, "dateOfBirth")}
              style={{
                colorScheme: darkmodeOn ? "dark" : "light"
              }}
            />
          </div>
        </div>

        <p>Add Services</p>

        <div className={`admin_barber_services_container ${darkmodeOn && "dark"}`}
          style={{
            marginBottom: "3rem",
            background: adminAllSalonServicesLoading ? "var(--primary-bg-light-color1)" : "var(--bg-color3)"
          }}
        >
          {
            adminAllSalonServicesLoading && !adminAllSalonServicesResolve ?
              <Skeleton count={4} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color2)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} /> :
              !adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length > 0 ?
                allSalonServices.map((s) => (
                  <div className={`admin_barber_services_container_item ${darkmodeOn && "dark"}`} key={s._id}>
                    <div>
                      <p>Service ID</p>
                      <p>{s.serviceId}</p>
                    </div>

                    <div>
                      <p>Service Name</p>
                      <p>{s.serviceName}</p>
                    </div>

                    <div>
                      <p>Est Wait Tm(mins)</p>
                      <input
                        type="text"
                        value={serviceEWTValues[s._id]}
                        onChange={(e) => handleEWTChange(s._id, e.target.value)}
                      />
                    </div>
                    {
                      chooseServices.find((c) => c._id === s._id) ?
                        <div
                          style={{
                            background: "red"
                          }}
                          onClick={() => deleteServiceHandler(s)}
                        ><DeleteIcon /></div> :
                        <div
                          style={{
                            background: "var(--primary-bg-color3)"
                          }}
                          onClick={() => chooseServiceHandler(s)}
                        >+</div>
                    }
                  </div>
                )) :
                adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length == 0 ?
                  <div className={`admin_barber_services_container_item_error ${darkmodeOn && "dark"}`}>
                    <p>No Salon Services Available</p>
                  </div> :
                  !adminAllSalonServicesLoading && !adminAllSalonServicesResolve &&
                  <div className={`admin_barber_services_container_item_error ${darkmodeOn && "dark"}`}>
                    <p>No Salon Services Available</p>
                  </div>
          }
        </div>

        <div>
          {
            adminCreateBarberLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}><ButtonLoader /></button> : <button onClick={CreateBarberHandler}>Submit</button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateBarber;
