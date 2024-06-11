
import React from 'react';
import ReactDOM from 'react-dom';
import './DashboardModal.css';
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

const DashboardModal = ({children,setOpenModal}) => {

  const closeModal = () => {
    setOpenModal(false)
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return ReactDOM.createPortal(
    <div className="dashboard_main__modal__container">
      <div>
        <div className={`dashboard_modal__content ${darkmodeOn && "dark"}`}>
            <button onClick={closeModal} className='dashboard_main__modal__close' style={{cursor:"pointer"}}>X</button>
            <br/>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('overlays_dashboard') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default DashboardModal;