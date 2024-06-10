// import React from 'react'
// import "./DashboardModal.css"

// const DashboardModal = () => {
//   return (
//     <div>DashboardModal</div>
//   )
// }

// export default DashboardModal

import React from 'react';
import ReactDOM from 'react-dom';
import './DashboardModal.css';

const DashboardModal = ({children,setOpenModal}) => {

  const closeModal = () => {
    setOpenModal(false)
  }

  return ReactDOM.createPortal(
    <div className="dashboard_main__modal__container">
      <div>
        <div className="dashboard_modal__content">
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