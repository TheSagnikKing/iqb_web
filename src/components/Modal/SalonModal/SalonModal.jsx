// import React from 'react'
// import "./SalonModal.css"
// import { useSelector } from 'react-redux';

// const SalonModal = ({children,setOpenModal}) => {
//   return (
//     <div>SalonModal</div>
//   )
// }

// export default SalonModal

import React from 'react';
import ReactDOM from 'react-dom';
import './SalonModal.css';
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';


const SalonModal = ({children,setOpenMobileUpdateModal}) => {

  const closeModal = () => {
    setOpenMobileUpdateModal(false)
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return ReactDOM.createPortal(
    <div className={`main__salon__modal__container ${darkmodeOn && "dark"}`}>
      <div>
        <div className={`modal__salon__content ${darkmodeOn && "dark"}`}>
            <button onClick={closeModal} className='main__salon__modal__close' style={{cursor:"pointer"}}>X</button>
            <br/>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('salon-overlays') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default SalonModal;