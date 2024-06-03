// import React from 'react'
// import "./Modal.css"

// const Modal = () => {
//   return (
//     <div>Modal</div>
//   )
// }

// export default Modal

// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({children,setOpenModal}) => {

  const closeModal = () => {
    setOpenModal(false)
  }

  return ReactDOM.createPortal(
    <div className="main__modal__container">
      <div>
        <div className="modal__content">
            <button onClick={closeModal} className='main__modal__close' style={{cursor:"pointer"}}>X</button>
            <br/>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('overlays') // Ensure you have a div with id="modal-root" in your HTML file
  );
};

export default Modal;