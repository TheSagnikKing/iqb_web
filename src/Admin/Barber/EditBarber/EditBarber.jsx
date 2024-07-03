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

// const EditBarber = () => {
//   const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const currentBarber = location?.state;

//   // State variables
//   const [name, setName] = useState(currentBarber?.name);
//   const [email, setEmail] = useState(currentBarber?.email);
//   const [nickName, setNickName] = useState(currentBarber?.nickName);
//   const [mobileNumber, setMobileNumber] = useState(currentBarber?.mobileNumber.toString());
//   const [dateOfBirth, setDateOfBirth] = useState(currentBarber?.dateOfBirth?.split('T')[0]);
//   const [chooseServices, setChooseServices] = useState([]);
//   const [serviceEWTValues, setServiceEWTValues] = useState({});

//   // Fetch all salon services on component mount
//   useEffect(() => {
//     dispatch(adminAllSalonServicesAction(salonId));
//   }, [salonId, dispatch]);

//   // Update service EWT values when all salon services are fetched
//   useEffect(() => {
//     if (currentBarber && currentBarber.barberServices) {
//       const initialEWTValues = {};
//       currentBarber.barberServices.forEach(service => {
//         initialEWTValues[service._id] = service.barberServiceEWT;
//       });
//       setServiceEWTValues(initialEWTValues);
//     }
//   }, [currentBarber]);

//   // Choose service handler
//   const chooseServiceHandler = (service) => {
//     setChooseServices([...chooseServices, service]);
//   };

//   // Delete service handler
//   const deleteServiceHandler = (service) => {
//     setChooseServices(chooseServices.filter((f) => f._id !== service._id));
//   };

//   // Handle EWT change
//   const handleEWTChange = (serviceId, newValue) => {
//     setServiceEWTValues({
//       ...serviceEWTValues,
//       [serviceId]: newValue
//     });
//   };

//   // Create barber handler
//   const EditBarberHandler = () => {
//     const barberdata = {
//       name,
//       email,
//       nickName,
//       mobileNumber: Number(mobileNumber),
//       dateOfBirth,
//       salonId,
//       barberServices: chooseServices.map(service => ({
//         ...service,
//         barberServiceEWT: serviceEWTValues[service._id]
//       }))
//     };

//     console.log(barberdata)

//     // Dispatch action to create or update barber
//     dispatch(adminUpdateBarberAction(barberdata, navigate));
//   };

//   // Redux selectors
//   const adminAllSalonServices = useSelector(state => state.adminAllSalonServices);
//   const { loading: adminAllSalonServicesLoading, resolve: adminAllSalonServicesResolve, response: allSalonServices } = adminAllSalonServices;


//   const adminUpdateBarber = useSelector(state => state.adminUpdateBarber)

//   const {
//     loading: adminUpdateBarberLoading,
//   } = adminUpdateBarber

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

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
//           {/* <div>
//             <p>Mobile No.</p>
//             <input
//               type='text'
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//             />
//           </div> */}

//           <div>
//             <p>Mobile Number</p>
//             <div>
//               <div>
//                 <PhoneInput
//                   forceDialCode={true}
//                   defaultCountry="gb"
//                   value={mobileNumber}
//                   onChange={(phone) => setMobileNumber(phone)}
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
//           {adminAllSalonServicesLoading && !adminAllSalonServicesResolve ? (
//             <Skeleton count={4} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color2)" : "var(--lightmode-loader-bg-color)"}
//             highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}/>
//           ) : !adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length > 0 ? (
//             allSalonServices.map((s) => (
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
//                     value={serviceEWTValues[s._id] !== undefined ? serviceEWTValues[s._id] : s.serviceEWT}
//                     onChange={(e) => handleEWTChange(s._id, e.target.value)}
//                   />
//                   {console.log(serviceEWTValues[s._id])}
//                 </div>

//                 {chooseServices.find((c) => c._id === s._id) ? (
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
//           ) : adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length === 0 ? (
//             <div className={`admin_barber_services_container_item_error ${darkmodeOn && "dark"}`}>
//               <p>No Salon Services Available</p>
//             </div>
//           ) : !adminAllSalonServicesLoading && !adminAllSalonServicesResolve && (
//             <div className={`admin_barber_services_container_item_error ${darkmodeOn && "dark"}`}>
//               <p>No Salon Services Available</p>
//             </div>
//           )}
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
import "./EditBarber.css";
import { DeleteIcon } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllSalonServicesAction, adminCreateBarberAction, adminUpdateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
import { PhoneInput } from 'react-international-phone';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

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

  console.log("AllSalonServices ", AllSalonServices)


  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBarber = location?.state;

  // State variables
  const [name, setName] = useState(currentBarber?.name);
  const [email, setEmail] = useState(currentBarber?.email);
  const [nickName, setNickName] = useState(currentBarber?.nickName);
  const [mobileNumber, setMobileNumber] = useState(currentBarber?.mobileNumber.toString());
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

    if(!originalService){
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



  // Create barber handler
  const EditBarberHandler = () => {
    const barberdata = {
      name,
      email,
      nickName,
      mobileNumber: Number(mobileNumber),
      dateOfBirth,
      salonId,
      barberServices: currentBarberServices
    };

    console.log(barberdata)

    // Dispatch action to create or update barber
    // dispatch(adminUpdateBarberAction(barberdata, navigate));
  };


  const adminUpdateBarber = useSelector(state => state.adminUpdateBarber)

  const {
    loading: adminUpdateBarberLoading,
  } = adminUpdateBarber

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const handleonChange = (e, service) => {

    if (currentBarberServices.find((c) => c.serviceId === service.serviceId)) {
      setCurrentBarberServices(currentBarberServices.map((ser) =>
        ser.serviceId === service.serviceId ? { ...ser, barberServiceEWT: Number(e.target.value) } : ser
      ));
    } else {
      setAllSalonServices(allSalonServices.map((ser) =>
        ser.serviceId === service.serviceId ? { ...ser, serviceEWT: Number(e.target.value) } : ser
      ));
    }
  }

  return (
    <div className={`admin_edit_barber_wrapper ${darkmodeOn && "dark"}`}>
      <p>Edit Barber</p>
      <div className={`admin_edit_barber_wrapper_container ${darkmodeOn && "dark"}`}>
        <div>
          <p>Barber Name</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <p>Barber Email</p>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <p>Barber Nick Name</p>
          <input
            type='text'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>

        <div>
          <div>
            <p>Mobile Number</p>
            <div>
              <div>
                <PhoneInput
                  forceDialCode={true}
                  defaultCountry="gb"
                  value={mobileNumber}
                  onChange={(phone) => setMobileNumber(phone)}
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
            AllSalonServices?.map((s) => (
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
                    value={currentBarberServices?.find((c) => c.serviceId === s.serviceId) ? currentBarberServices?.find((c) => c.serviceId === s.serviceId).barberServiceEWT : s.serviceEWT}
                    onChange={(e) => handleonChange(e, s)}
                  />
                </div>

                {currentBarberServices.find((c) => c.serviceId === s.serviceId) ? (
                  <div
                    style={{
                      background: "red"
                    }}
                    onClick={() => deleteServiceHandler(s)}
                  ><DeleteIcon /></div>
                ) : (
                  <div
                    style={{
                      background: "var(--primary-bg-color3)"
                    }}
                    onClick={() => chooseServiceHandler(s)}
                  >+</div>
                )}
              </div>
            ))
          }
        </div>

        <div>
          {
            adminUpdateBarberLoading ? <button style={{
              display: "grid",
              placeItems: "center"
            }}><ButtonLoader /></button> : <button onClick={EditBarberHandler}>Update</button>
          }
        </div>
      </div>
    </div>
  );
};

export default EditBarber;

