import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';

const Modal = ({children,setOpenModal, setOldPassword, setPassword, setConfirmPassword,setSeeOldPassword, setSeePassword, setSeeConfirmPassword}) => {

  const closeModal = () => {
    setOldPassword("")
    setPassword("")
    setConfirmPassword("")
    setOpenModal(false)
    setSeeOldPassword(false)
    setSeePassword(false)
    setSeeConfirmPassword(false)
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return ReactDOM.createPortal(
    <div className={`main__modal__container ${darkmodeOn && "dark"}`}>
      <div>
        <div className={`modal__content ${darkmodeOn && "dark"}`}>
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