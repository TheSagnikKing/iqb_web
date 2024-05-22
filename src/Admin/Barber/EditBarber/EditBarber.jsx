import React, { useState } from 'react'
import "./EditBarber.css"
import { DeleteIcon } from '../../../icons'

const EditBarber = () => {

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

  const chooseServiceHandler = (service) => {
      setChooseServices([...chooseServices, service])
  }

  const deleteServiceHandler = (service) => {
    setChooseServices(chooseServices.filter((f) => f._id !== service._id))
  }

  console.log(chooseServices)

  return (
    <div className='admin_edit_barber_wrapper'>
      <p>Edit Barber</p>
      <div className='admin_edit_barber_wrapper_container'>
        <div>
          <p>Barber Name</p>
          <input
            type='text'
          />
        </div>

        <div>
          <p>Barber Email</p>
          <input
            type='text'
          />
        </div>

        <div>
          <p>Barber Nick Name</p>
          <input
            type='text'
          />
        </div>

        <div>
          <div>
            <p>Mobile No.</p>
            <input
              type='text'
            />
          </div>

          <div>
            <p>Date of Birth</p>
            <input
              type='date'
              placeholder='dd/mm/yy'
            />
          </div>
        </div>

        <p>Add Services</p>

        <div className='admin_barber_services_container'
          style={{
            marginBottom: "3rem"
          }}
        >
          {
            servicesList.map((s) => (
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
                    value={s.EWT}
                  />
                </div>
                {
                  chooseServices.find((c) => c._id === s._id) ?
                    <div
                      style={{
                        background: "red"
                      }}
                      onClick={() => deleteServiceHandler(s)}
                    ><DeleteIcon/></div> :
                    <div
                      style={{
                        background: "var(--primary-bg-color3)"
                      }}
                      onClick={() => chooseServiceHandler(s)}
                    >+</div>
                }


              </div>
            ))
          }

        </div>

        <div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default EditBarber