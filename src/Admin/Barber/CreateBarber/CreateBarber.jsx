import React from 'react'
import "./CreateBarber.css"
import { DeleteIcon } from '../../../icons'

const CreateBarber = () => {
  return (
    <div className='admin_create_barber_wrapper'>
      <p>Create Barber</p>
      <div className='admin_create_barber_wrapper_container'>
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
          marginBottom:"4rem"
        }}
        >
          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "var(--primary-bg-color3)"
              }}
            >+</div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "var(--primary-bg-color3)"
              }}
            >+</div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "var(--primary-bg-color3)"
              }}
            >+</div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "var(--primary-bg-color3)"
              }}
            >+</div>

          </div>

        </div>

        <div className='admin_barber_services_container'>
          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "red"
              }}
            ><DeleteIcon /></div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "red"
              }}
            ><DeleteIcon /></div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "red"
              }}
            ><DeleteIcon /></div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "red"
              }}
            ><DeleteIcon /></div>

          </div>

          <div className='admin_barber_services_container_item'>
            <div>
              <p>Service ID</p>
              <p>205</p>
            </div>

            <div>
              <p>Service Name</p>
              <p>ladies haircut of any length</p>
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={32}
              />
            </div>

            <div
              style={{
                background: "red"
              }}
            ><DeleteIcon /></div>

          </div>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default CreateBarber