import React from 'react';
import "./Adv.css";
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';
import { DeleteIcon, EditIcon } from '../../icons'

const Adv = ({ ad, url, id, editImageHandler,handleEditLoader,deleteHandler,deleteLoader,fileEditInputRef,handleEditFileInputChange }) => {

    const darkMode = useSelector(darkmodeSelector);
    const darkmodeOn = darkMode === "On";

    return (
        <div className={`salonadv_cards ${darkmodeOn && "dark"}`}>
            <div>
                <img src={`${url}`} alt="" />
            </div>
            <div>
                <button onClick={() => editImageHandler(ad.public_id, ad._id)} disabled={handleEditLoader}>
                    <div><EditIcon /></div>
                    <p>Edit</p>
                    <input
                        type="file"
                        ref={fileEditInputRef}
                        style={{ display: 'none' }}
                        onChange={handleEditFileInputChange}
                    />
                </button>
                <button onClick={() => deleteHandler(ad.public_id, ad._id)} disabled={deleteLoader}>
                    <div><DeleteIcon /></div>
                    <p>Delete</p>
                </button>
            </div>
        </div>
    );
}

export default Adv;
