import React, { useEffect, useRef, useState } from 'react'
import "./CreateBarber.css"
import { DeleteIcon } from '../../../icons'
import { useDispatch, useSelector } from 'react-redux'
import { adminAllSalonServicesAction } from '../../../Redux/Admin/Actions/BarberAction'
import Skeleton from 'react-loading-skeleton'

const CreateBarber = () => {
  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [nickName, setNickName] = useState("")
  const [mobileNumber, setMobileNumber] = useState(null)
  const [dateOfBirth, setDateOfBirth] = useState("")

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

  const adminAllSalonServices = useSelector(state => state.adminAllSalonServices)

  const {
    loading: adminAllSalonServicesLoading,
    resolve: adminAllSalonServicesResolve,
    response: allSalonServices
  } = adminAllSalonServices


  const servicesList = [
    {
      _id: 1,
      serviceId: 101,
      serviceName: "Service 11",
      EWT: 30,
    },
    {
      _id: 2,
      serviceId: 102,
      serviceName: "Service 21",
      EWT: 34,
    },
    {
      _id: 3,
      serviceId: 111,
      serviceName: "Service 15",
      EWT: 48,
    },
    {
      _id: 4,
      serviceId: 130,
      serviceName: "Service 26",
      EWT: 40,
    },
    {
      _id: 5,
      serviceId: 206,
      serviceName: "Service 87",
      EWT: 69,
    }
  ]

  const [chooseServices, setChooseServices] = useState([])
  const [serviceEWTArray, setServiceEWTArray] = useState(allSalonServices)

  console.log(serviceEWTArray)

  const handleEWTChange = (e, service) => {
    const updatedServices = chooseServices.map((s) => 
      s._id === service._id ? { ...s, serviceEWT: e.target.value } : s
    )
    setChooseServices(updatedServices)
  }

  const chooseServiceHandler = (service) => {
    setChooseServices([...chooseServices, service])
  }

  const deleteServiceHandler = (service) => {
    setChooseServices(chooseServices.filter((f) => f._id !== service._id))
  }

  // console.log(chooseServices)

  const CreateBarberHandler = () => {
    const barberdata = {
      name, email, nickName, mobileNumber, dateOfBirth,
      salonId,
      barberServices: chooseServices
    }

    console.log(barberdata)
  }



  return (
    <div className='admin_create_barber_wrapper'>
      <p>Create Barber</p>
      <div className='admin_create_barber_wrapper_container'>
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
          {
            adminAllSalonServicesLoading && !adminAllSalonServicesResolve ? 
            <Skeleton count={4} height={"6rem"} style={{ marginBottom: "1rem"}} /> :
            !adminAllSalonServicesLoading && adminAllSalonServicesResolve && allSalonServices?.length > 0 ?
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
                    // value={s.serviceEWT}
                    value={serviceEWTArray.find(ser => ser._id === s._id)?.serviceEWT || ''}
                    onChange={(e) => handleEWTChange(e, s)}
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
            <p>No Salon Services Available</p> : 
            !adminAllSalonServicesLoading && !adminAllSalonServicesResolve &&
            <p>No Salon Services Available</p>
          }

        </div>

        <div>
          <button onClick={CreateBarberHandler}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBarber