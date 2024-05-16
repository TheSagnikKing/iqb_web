// import React from 'react'
// import "./EditBarber.css"

// const EditBarber = () => {
//   return (
//     <div>EditBarber</div>
//   )
// }

// export default EditBarber

import React from 'react'
import "./EditBarber.css"
import { DeleteIcon } from '../../../icons'

const EditBarber = () => {
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
            <p>Barber Mobile Number</p>
            <input
              type='text'
            />
          </div>

          <div>
            <p>Barber Date of Birth</p>
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

export default EditBarber