// Promt of that code
// // no not correct. 
// // let me explain clearly.
// // let say i have array 1 = [1,2,3,] 
// // and array 2 = [1,2,3,4,5]
// // i have to merge the two arrays and make it in a single one with commons value update on the actual value so the ans will be [1,2,3,4,5] but not the 1,2,3 are from the array1 not the intial array 2.
// // this is something that will happen in my code.
// // here 1,2,3 are service


import React, { useEffect, useRef, useState } from 'react';
import "./EditBarber.css";
import { DeleteIcon } from '../../../icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminAllSalonServicesAction, adminCreateBarberAction, adminUpdateBarberAction } from '../../../Redux/Admin/Actions/BarberAction';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';

const EditBarber = () => {
  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBarber = location?.state;

  // State variables
  const [name, setName] = useState(currentBarber?.name);
  const [email, setEmail] = useState(currentBarber?.email);
  const [nickName, setNickName] = useState(currentBarber?.nickName);
  const [mobileNumber, setMobileNumber] = useState(currentBarber?.mobileNumber);
  const [dateOfBirth, setDateOfBirth] = useState(currentBarber?.dateOfBirth);
  const [chooseServices, setChooseServices] = useState([]);
  const [serviceEWTValues, setServiceEWTValues] = useState({});

  // Fetch all salon services on component mount
  useEffect(() => {
    dispatch(adminAllSalonServicesAction(salonId));
  }, [salonId, dispatch]);

  // Update service EWT values when all salon services are fetched
  useEffect(() => {
    if (currentBarber && currentBarber.barberServices) {
      const initialEWTValues = {};
      currentBarber.barberServices.forEach(service => {
        initialEWTValues[service._id] = service.barberServiceEWT;
      });
      setServiceEWTValues(initialEWTValues);
    }
  }, [currentBarber]);

  // Choose service handler
  const chooseServiceHandler = (service) => {
    setChooseServices([...chooseServices, service]);
  };

  // Delete service handler
  const deleteServiceHandler = (service) => {
    setChooseServices(chooseServices.filter((f) => f._id !== service._id));
  };

  // Handle EWT change
  const handleEWTChange = (serviceId, newValue) => {
    setServiceEWTValues({
      ...serviceEWTValues,
      [serviceId]: newValue
    });
  };

  // Create barber handler
  const EditBarberHandler = () => {
    const barberdata = {
      name,
      email,
      nickName,
      mobileNumber,
      dateOfBirth,
      salonId,
      barberServices: chooseServices.map(service => ({
        ...service,
        barberServiceEWT: serviceEWTValues[service._id]
      }))
    };

    console.log(barberdata)

    // Dispatch action to create or update barber
    dispatch(adminUpdateBarberAction(barberdata, navigate));
  };

  // Redux selectors
  const adminAllSalonServices = useSelector(state => state.adminAllSalonServices);
  const { loading: adminAllSalonServicesLoading, resolve: adminAllSalonServicesResolve, response: allSalonServices } = adminAllSalonServices;

  return (
    <div className='admin_edit_barber_wrapper'>
      <p>Edit Barber</p>
      <div className='admin_edit_barber_wrapper_container'>
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
            <p>Mobile No.</p>
            <input
              type='text'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
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

        <div className='admin_barber_services_container'
          style={{
            marginBottom: "3rem",
            background: adminAllSalonServicesLoading ? "var(--primary-bg-light-color1)" : "var(--bg-color3)"
          }}
        >
          {adminAllSalonServicesLoading && !adminAllSalonServicesResolve ? (
            <Skeleton count={4} height={"6rem"} style={{ marginBottom: "1rem" }} />
          ) : !adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length > 0 ? (
            allSalonServices.map((s) => (
              <div className='admin_barber_services_container_item' key={s._id}>
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
                    value={serviceEWTValues[s._id] !== undefined ? serviceEWTValues[s._id] : s.serviceEWT}
                    onChange={(e) => handleEWTChange(s._id, e.target.value)}
                  />
                </div>

                {chooseServices.find((c) => c._id === s._id) ? (
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
          ) : adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length === 0 ? (
            <p>No Salon Services Available</p>
          ) : !adminAllSalonServicesLoading && !adminAllSalonServicesResolve && (
            <p>No Salon Services Available</p>
          )}
        </div>

        <div>
          <button onClick={EditBarberHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EditBarber;
