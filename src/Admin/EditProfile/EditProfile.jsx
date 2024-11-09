// import React, { useEffect, useRef, useState } from 'react'
// import "./EditProfile.css"
// import { CameraIcon, CheckIcon, Eyevisible, MobileCrossIcon, Notvisibleeye } from '../../icons';

// import { PhoneInput } from 'react-international-phone';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminSendVerifyEmailAction, adminSendVerifyMobileAction, adminUpdatePasswordAction, adminUpdateProfileAction, adminVerifiedEmailStatusAction, adminVerifiedMobileStatusAction } from '../../Redux/Admin/Actions/AdminProfileAction';
// import { useNavigate } from 'react-router-dom';
// import api from '../../Redux/api/Api';
// import { ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS } from '../../Redux/Admin/Constants/constants';
// import Skeleton from 'react-loading-skeleton';
// import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
// import Modal from '../../components/Modal/Modal';
// import toast from 'react-hot-toast';
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';

// import { PhoneNumberUtil } from 'google-libphonenumber';

// const EditProfile = () => {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

//     // console.log(adminProfile)

//     const [changeEmailVerifiedState, setChangeEmailVerifiedState] = useState(adminProfile?.emailVerified)
//     const [changeMobileVerifiedState, setChangeMobileVerifiedState] = useState(adminProfile?.mobileVerified)

//     const [name, setName] = useState(adminProfile?.name)
//     const [dateOfBirth, setDateofBirth] = useState(adminProfile?.dateOfBirth?.split('T')[0])

//     const fileInputRef = useRef(null);

//     const handleSalonLogoButtonClick = () => {
//         fileInputRef.current.click();
//     };


//     const [uploadpicLoader, setUploadpicLoader] = useState(false)

//     const handleProfileFileInputChange = async (e) => {
//         const uploadImage = e.target.files[0]; // Get the uploaded file

//         const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
//         if (!allowedTypes.includes(uploadImage.type)) {
//             toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });
//             return;
//         }

//         const formData = new FormData();

//         formData.append('email', adminProfile?.email);
//         formData.append('profile', uploadImage);
//         formData.append('salonId', adminProfile?.salonId)

//         try {
//             setUploadpicLoader(true)
//             const imageResponse = await api.post('/api/admin/uploadAdminProfilePicture', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             setUploadpicLoader(false)

//             // setProfilepic(imageResponse?.data?.adminImage?.profile[0]?.url)

//             const { data: adminloggedindata } = await api.get('/api/admin/adminloggedin');

//             dispatch({
//                 type: ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS,
//                 payload: adminloggedindata
//             })


//             // navigate("/admin-dashboard")
//         } catch (error) {
//             setUploadpicLoader(false)
//             console.error('Image upload failed:', error);
//             setProfilepic("")
//         }
//     };

//     const [sendVerificationEmailModal, setSendVerificationEmailModal] = useState(false)

//     const sendVerificationEmail = () => {
//         if (!changeEmailVerifiedState) {
//             dispatch(adminSendVerifyEmailAction(adminProfile?.email, setSendVerificationEmailModal))
//         }
//     }

//     const [otp, setOtp] = useState(["", "", "", ""]);
//     const otpinputRef = useRef([]);

//     const handleOtpInputChange = (index, value) => {
//         const newOtp = [...otp];
//         newOtp[index] = value;

//         if (value && index < otp.length - 1) {
//             otpinputRef.current[index + 1].focus();
//         }

//         setOtp(newOtp);
//     };

//     const handleKeyDown = (index, e) => {
//         if (e.key === "Backspace" && index > 0 && !otp[index]) {
//             const newOtp = [...otp];
//             newOtp[index - 1] = "";
//             otpinputRef.current[index - 1].focus();
//             setOtp(newOtp);
//         }
//     };



//     const [sendVerificationMobileModal, setSendVerificationMobileModal] = useState(false)

//     const sendVerificationMobile = () => {
//         if (!changeMobileVerifiedState) {
//             dispatch(adminSendVerifyMobileAction(adminProfile?.email, setSendVerificationMobileModal))
//         }
//     }

//     const [mobileotp, setMobileOtp] = useState(["", "", "", ""]);
//     const mobileotpinputRef = useRef([]);

//     const handleMobileOtpInputChange = (index, value) => {
//         const newOtp = [...mobileotp];
//         newOtp[index] = value;

//         if (value && index < mobileotp.length - 1) {
//             mobileotpinputRef.current[index + 1].focus();
//         }

//         setMobileOtp(newOtp);
//     };

//     const handleMobileKeyDown = (index, e) => {
//         if (e.key === "Backspace" && index > 0 && !mobileotp[index]) {
//             const newOtp = [...mobileotp];
//             newOtp[index - 1] = "";
//             mobileotpinputRef.current[index - 1].focus();
//             setMobileOtp(newOtp);
//         }
//     };


//     const [gender, setGender] = useState(adminProfile?.gender)
//     const [genderDrop, setGenderDrop] = useState(false)

//     const genderDropHandler = () => {
//         setGenderDrop((prev) => !prev)
//     }

//     const setGenderHandler = (value) => {
//         setGender(value)
//         setGenderDrop(false)
//     }

//     const genderinputRef = useRef()
//     const genderDropRef = useRef()

//     useEffect(() => {
//         const handleClickGenderOutside = (event) => {
//             if (
//                 genderinputRef.current &&
//                 genderDropRef.current &&
//                 !genderinputRef.current.contains(event.target) &&
//                 !genderDropRef.current.contains(event.target)
//             ) {
//                 setGenderDrop(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickGenderOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickGenderOutside);
//         };
//     }, []);


//     const [mobileNumber, setMobileNumber] = useState(`${adminProfile?.mobileCountryCode?.toString()}${adminProfile?.mobileNumber?.toString()}`)
//     const [countryCode, setCountryCode] = useState(adminProfile?.mobileCountryCode?.toString())

//     const [invalidnumber, setInvalidNumber] = useState(false)

//     const updateAdminProfile = () => {
//         if (invalidnumber) {
//             toast.error("Invalid Number", {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '10px',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });
//         } else {
//             const profiledata = {
//                 email: adminProfile?.email,
//                 dateOfBirth,
//                 mobileNumber: Number(mobileNumber),
//                 countryCode: Number(countryCode),
//                 name,
//                 gender,
//             }

//             console.log(profiledata)

//             dispatch(adminUpdateProfileAction(profiledata, navigate))
//         }

//     }

//     const verifyEmailStatusClicked = () => {
//         const currentOtp = otp?.join("")

//         dispatch(adminVerifiedEmailStatusAction(adminProfile?.email, currentOtp, setSendVerificationEmailModal, setOtp, setChangeEmailVerifiedState))
//     }

//     const verifyMobileStatusClicked = () => {
//         const currentOtp = mobileotp?.join("")

//         dispatch(adminVerifiedMobileStatusAction(adminProfile?.email, currentOtp, setSendVerificationMobileModal, setMobileOtp, setChangeMobileVerifiedState))
//     }

//     const [oldPassword, setOldPassword] = useState("")
//     const [password, setPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")

//     const adminUpdateProfile = useSelector(state => state.adminUpdateProfile)

//     const {
//         loading: adminUpdateProfileLoading,
//     } = adminUpdateProfile

//     const [openModal, setOpenModal] = useState(false)

//     const updatePasswordHandler = () => {
//         if (password !== confirmPassword) {
//             toast.error("New and confirm password donot match", {
//                 duration: 3000,
//                 style: {
//                     fontSize: "1.4rem",
//                     borderRadius: '1rem',
//                     background: '#333',
//                     color: '#fff',
//                 },
//             });
//         } else {

//             const profiledata = {
//                 email: adminProfile?.email,
//                 password,
//                 oldPassword
//             }

//             dispatch(adminUpdatePasswordAction(profiledata, navigate))
//         }
//     }

//     const adminUpdatePassword = useSelector(state => state.adminUpdatePassword)

//     const {
//         loading: adminUpdatePasswordLoading
//     } = adminUpdatePassword

//     const darkMode = useSelector(darkmodeSelector)

//     const darkmodeOn = darkMode === "On"

//     const [seeOldPassword, setSeeOldPassword] = useState(false)
//     const [seePassword, setSeePassword] = useState(false)
//     const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)



//     const phoneUtil = PhoneNumberUtil.getInstance();

//     const isPhoneValid = (phone) => {
//         try {
//             return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//         } catch (error) {
//             return false;
//         }
//     };

//     const handlePhoneChange = (phone, meta) => {
//         const { country, inputValue } = meta;

//         const isValid = isPhoneValid(phone);

//         if (isValid) {
//             setMobileNumber(phone)
//             setCountryCode(country?.dialCode)
//             setInvalidNumber(false)
//         } else {
//             setInvalidNumber(true)
//         }
//     };

//     return (
//         <div className={`admin_edit_profile ${darkmodeOn && "dark"}`}>
//             <p>Edit profile</p>
//             <div className={`admin_edit_profile_content_wrapper ${darkmodeOn && "dark"}`}>
//                 <div>
//                     <div
//                         style={{
//                             border: uploadpicLoader && "none"
//                         }}
//                     >
//                         {
//                             uploadpicLoader ? <Skeleton count={1} height={"12rem"} width={"12rem"} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                                 highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} style={{ borderRadius: "50%" }} /> : <img src={adminProfile?.profile[0]?.url} alt="aaa" />
//                         }

//                         <div>
//                             <button onClick={() => handleSalonLogoButtonClick()}><CameraIcon /></button>
//                             <input
// type="file"
// ref={fileInputRef}
// style={{ display: 'none' }}
// onChange={handleProfileFileInputChange}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 <div>
//                     <div>
//                         <p>Name</p>
//                         <input
//                             type="text"
// value={name}
// onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>

//                     <div onClick={() => setOpenModal(true)}>
//                         <p>Password</p>
//                         <input
//                             type="text"
//                             value="********"
//                         />
//                     </div>
//                     {
//                         openModal && <Modal setOpenModal={setOpenModal} setOldPassword={setOldPassword} setPassword={setPassword} setConfirmPassword={setConfirmPassword} setSeeOldPassword={setSeeOldPassword} setSeePassword={setSeePassword} setSeeConfirmPassword={setSeeConfirmPassword}>
//                             <div className={`password_modal_container ${darkmodeOn && "dark"}`}>
//                                 <h1>Change your password</h1>

//                                 {adminProfile?.AuthType == "google" ?
//                                     <div></div> :
//                                     <div>
//                                         <p>Old Password</p>
//                                         <div>
//                                             <input
//                                                 type={`${seePassword ? "text" : "password"}`}
//                                                 value={oldPassword}
//                                                 onChange={(e) => setOldPassword(e.target.value)}
//                                             />
//                                             <div onClick={() => setSeePassword((prev) => !prev)}>{seePassword ? <Eyevisible /> : <Notvisibleeye />}</div>
//                                         </div>
//                                     </div>
//                                 }


//                                 <div>
//                                     <p>New Password</p>
//                                     <div>
//                                         <input
//                                             type={`${seeOldPassword ? "text" : "password"}`}
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                         />
//                                         <div onClick={() => setSeeOldPassword((prev) => !prev)}>{seeOldPassword ? <Eyevisible /> : <Notvisibleeye />}</div>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <p>Confirm Password</p>
// <div>
//     <input
//         type={`${seeConfirmPassword ? "text" : "password"}`}
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//     />
//     <div onClick={() => setSeeConfirmPassword((prev) => !prev)}>{seeConfirmPassword ? <Eyevisible /> : <Notvisibleeye />}</div>
// </div>
//                                 </div>

//                                 <div>
//                                     {
//                                         adminUpdatePasswordLoading ? <button style={{
//                                             display: "grid",
//                                             placeItems: "center"
//                                         }}><ButtonLoader /></button> : <button onClick={updatePasswordHandler}>Update</button>
//                                     }

//                                 </div>
//                             </div>
//                         </Modal>
//                     }
//                 </div>

//                 <div>
//                     <div>
//                         <p>Email</p>
//                         <div>
//                             <input
//                                 type="email"
//                                 value={adminProfile?.email}
//                             />
//                             <button onClick={() => sendVerificationEmail()} title={changeEmailVerifiedState ? "Verified" : "NotVerified"} style={{
//                                 background: changeEmailVerifiedState ? "limegreen" : "red"
//                             }}>
//                                 <div>{changeEmailVerifiedState ? <CheckIcon /> : <MobileCrossIcon />}</div>

//                             </button>
//                         </div>
//                     </div>

//                     <div className='admin_profile_mobile_container'>
//                         <p>Mobile Number</p>
//                         <div>
//                             <div>
//                                 <PhoneInput
//                                     forceDialCode={true}
//                                     defaultCountry="gb"
// value={mobileNumber}
// onChange={(phone, meta) => handlePhoneChange(phone, meta)}
//                                 />
//                             </div>
//                             <button onClick={() => sendVerificationMobile()} title={changeMobileVerifiedState ? "Verified" : "NotVerified"} style={{
//                                 background: changeMobileVerifiedState ? "limegreen" : "red"
//                             }}>
//                                 <div>{changeMobileVerifiedState ? <CheckIcon /> : <MobileCrossIcon />}</div>

//                             </button>
//                         </div>

//                     </div>
//                 </div>

//                 <div>
//                     <div>
//                         <p>Date of Birth</p>
//                         <input
//                             type="date"
//                             value={dateOfBirth}
//                             onChange={(e) => setDateofBirth(e.target.value)}
//                             style={{
//                                 colorScheme: darkmodeOn ? "dark" : "light"
//                             }}
//                         />
//                     </div>

//                     <div>
//                         <p>Gender</p>
//                         <input
//                             type="text"
//                             value={`${gender ? `${gender}` : ''}`}
//                             onClick={() => genderDropHandler()}
//                             ref={genderinputRef}
//                             style={{
//                                 caretColor: "transparent"
//                             }}
//                         />

//                         {genderDrop && <div ref={genderDropRef}
//                             style={{
//                                 background: darkmodeOn && "var(--dark-mode-bg-color-2)"
//                             }}
//                         >
//                             <p onClick={() => setGenderHandler("Male")}>Male</p>
//                             <p onClick={() => setGenderHandler("Female")}>Female</p>
//                             <p onClick={() => setGenderHandler("Other")}>Other</p>
//                         </div>}
//                     </div>
//                 </div>

//                 <div>
//                     {
//                         adminUpdateProfileLoading ? <button style={{
//                             display: "grid",
//                             placeItems: "center"
//                         }}><ButtonLoader /></button> : <button onClick={updateAdminProfile}>Update</button>
//                     }
//                 </div>
//             </div>

//             {
//                 sendVerificationEmailModal && <div className='verify_email_wrapper'>
//                     <div className={`verify_email_content_wrapper ${darkmodeOn && "dark"}`}>
//                         <div>
//                             <button onClick={() => setSendVerificationEmailModal(false)}>X</button>
//                         </div>

//                         <div>
//                             <div>
//                                 <img src="/email_verification.png" alt="" />
//                             </div>
//                             <div>
//                                 <div>
//                                     <p>Check Your Email</p>
//                                     <p>An email with a verification code was just sent to your email address</p>

//                                     <div>
//                                         <p>{adminProfile?.email}</p>
//                                         <button onClick={verifyEmailStatusClicked}>Verify</button>
//                                     </div>

//                                     <div>
//                                         {
//                                             otp.map((digit, index) => (
//                                                 <input
//                                                     type="text"
//                                                     key={index}
//                                                     maxLength={1}
//                                                     value={digit}
//                                                     autoFocus={index === 0}
//                                                     ref={(ref) => (otpinputRef.current[index] = ref)}
//                                                     onChange={(e) => handleOtpInputChange(index, e.target.value)}
//                                                     onKeyDown={(e) => handleKeyDown(index, e)}
//                                                 ></input>
//                                             ))
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }

//             {
//                 sendVerificationMobileModal && <div className='verify_email_wrapper'>
//                     <div className={`verify_email_content_wrapper ${darkmodeOn && "dark"}`}>
//                         <div>
//                             <button onClick={() => setSendVerificationMobileModal(false)}>X</button>
//                         </div>

//                         <div>
//                             <div>
//                                 <img src="/email_verification.png" alt="" />
//                             </div>
//                             <div>
//                                 <div>
//                                     <p>Check Your Mobile</p>
//                                     <p>An message with a verification code was just sent to your mobile number</p>

//                                     <div>
//                                         <p>{adminProfile?.mobileCountryCode}{adminProfile?.mobileNumber}</p>
//                                         <button onClick={() => sendVerificationMobile()}>Resend</button>
//                                     </div>

// <div>
//     {
//         mobileotp.map((digit, index) => (
//             <input
//                 type="text"
//                 key={index}
//                 maxLength={1}
//                 value={digit}
//                 autoFocus={index === 0}
//                 ref={(ref) => (mobileotpinputRef.current[index] = ref)}
//                 onChange={(e) => handleMobileOtpInputChange(index, e.target.value)}
//                 onKeyDown={(e) => handleMobileKeyDown(index, e)}
//             ></input>
//         ))
//     }
// </div>

//                                     <div className='verify_btn_div'>
//                                         <button className='verifybtn' onClick={verifyMobileStatusClicked}>Verify</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div>
//     )
// }

// export default EditProfile





import React, { useEffect, useRef, useState } from 'react'
import style from "./EditProfile.module.css"
import { CameraIcon, CheckIcon, CloseIcon, Eyevisible, Notvisibleeye, OtpEmailIcon, OtpMessageIcon, SaveIcon } from '../../icons';

import { PhoneInput } from 'react-international-phone';
import { useDispatch, useSelector } from 'react-redux';
import { adminSendVerifyEmailAction, adminSendVerifyMobileAction, adminUpdatePasswordAction, adminUpdateProfileAction, adminVerifiedEmailStatusAction, adminVerifiedMobileStatusAction } from '../../Redux/Admin/Actions/AdminProfileAction';
import { useNavigate } from 'react-router-dom';
import api from '../../Redux/api/Api';
import { ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS } from '../../Redux/Admin/Constants/constants';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import toast from 'react-hot-toast';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';

import { PhoneNumberUtil } from 'google-libphonenumber';

import { ClickAwayListener, Modal, Skeleton } from '@mui/material';


const EditProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])


    const [changeEmailVerifiedState, setChangeEmailVerifiedState] = useState(adminProfile?.emailVerified)
    const [changeMobileVerifiedState, setChangeMobileVerifiedState] = useState(adminProfile?.mobileVerified)

    const [name, setName] = useState("")
    const [dateOfBirth, setDateofBirth] = useState("")
    const [gender, setGender] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [countryCode, setCountryCode] = useState("")



    useEffect(() => {
        if (adminProfile) {
            setMobileNumber(`${adminProfile?.mobileCountryCode?.toString()}${adminProfile?.mobileNumber?.toString()}`)
            setName(adminProfile?.name)
            setDateofBirth(adminProfile?.dateOfBirth?.split('T')[0])
            setGender(adminProfile?.gender)
            setCountryCode(adminProfile?.mobileCountryCode?.toString())
        }
    }, [adminProfile])

    const fileInputRef = useRef(null);

    const handleSalonLogoButtonClick = () => {
        fileInputRef.current.click();
    };


    const [uploadpicLoader, setUploadpicLoader] = useState(false)

    const handleProfileFileInputChange = async (e) => {
        const uploadImage = e.target.files[0]; // Get the uploaded file

        const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
        if (!allowedTypes.includes(uploadImage.type)) {
            toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        const formData = new FormData();

        formData.append('email', adminProfile?.email);
        formData.append('profile', uploadImage);
        formData.append('salonId', adminProfile?.salonId)

        try {
            setUploadpicLoader(true)
            await api.post('/api/admin/uploadAdminProfilePicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadpicLoader(false)


            const { data: adminloggedindata } = await api.get('/api/admin/adminloggedin');

            dispatch({
                type: ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS,
                payload: adminloggedindata
            })

        } catch (error) {
            setUploadpicLoader(false)
            console.error('Image upload failed:', error);
            setProfilepic("")
        }
    };


    const sendVerificationEmail = () => {
        if (!changeEmailVerifiedState) {
            dispatch(adminSendVerifyEmailAction(adminProfile?.email, setOpenEmailModal))
        }
    }

    const [otp, setOtp] = useState(["", "", "", ""]);
    const otpinputRef = useRef([]);

    const handleOtpInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;

        if (value && index < otp.length - 1) {
            otpinputRef.current[index + 1].focus();
        }

        setOtp(newOtp);
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && index > 0 && !otp[index]) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            otpinputRef.current[index - 1].focus();
            setOtp(newOtp);
        }
    };


    const sendVerificationMobile = () => {
        if (!changeMobileVerifiedState) {
            dispatch(adminSendVerifyMobileAction(adminProfile?.email, setOpenMobileModal))
        }
    }

    const [mobileotp, setMobileOtp] = useState(["", "", "", ""]);
    const mobileotpinputRef = useRef([]);

    const handleMobileOtpInputChange = (index, value) => {
        const newOtp = [...mobileotp];
        newOtp[index] = value;

        if (value && index < mobileotp.length - 1) {
            mobileotpinputRef.current[index + 1].focus();
        }

        setMobileOtp(newOtp);
    };

    const handleMobileKeyDown = (index, e) => {
        if (e.key === "Backspace" && index > 0 && !mobileotp[index]) {
            const newOtp = [...mobileotp];
            newOtp[index - 1] = "";
            mobileotpinputRef.current[index - 1].focus();
            setMobileOtp(newOtp);
        }
    };



    const [genderDrop, setGenderDrop] = useState(false)

    const genderDropHandler = () => {
        setGenderDrop((prev) => !prev)
    }

    const setGenderHandler = (value) => {
        setGender(value)
        setGenderDrop(false)
    }


    const [invalidnumber, setInvalidNumber] = useState(false)

    const updateAdminProfile = () => {
        if (invalidnumber) {
            toast.error("Invalid Number", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {
            const profiledata = {
                email: adminProfile?.email,
                dateOfBirth,
                mobileNumber: Number(mobileNumber),
                countryCode: Number(countryCode),
                name,
                gender,
            }

            console.log(profiledata)

            dispatch(adminUpdateProfileAction(profiledata, navigate))
        }

    }

    const verifyEmailStatusClicked = () => {
        const currentOtp = otp?.join("")

        dispatch(adminVerifiedEmailStatusAction(adminProfile?.email, currentOtp, setOpenEmailModal, setOtp, setChangeEmailVerifiedState))
    }

    const verifyMobileStatusClicked = () => {
        const currentOtp = mobileotp?.join("")

        dispatch(adminVerifiedMobileStatusAction(adminProfile?.email, currentOtp, setOpenMobileModal, setMobileOtp, setChangeMobileVerifiedState))
    }

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const adminUpdateProfile = useSelector(state => state.adminUpdateProfile)

    const {
        loading: adminUpdateProfileLoading,
    } = adminUpdateProfile

    // const [openModal, setOpenModal] = useState(false)

    const updatePasswordHandler = () => {
        if (password !== confirmPassword) {
            toast.error("New and confirm password donot match", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '1rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        } else {

            const profiledata = {
                email: adminProfile?.email,
                password,
                oldPassword
            }

            dispatch(adminUpdatePasswordAction(profiledata, navigate))
        }
    }

    const adminUpdatePassword = useSelector(state => state.adminUpdatePassword)

    const {
        loading: adminUpdatePasswordLoading
    } = adminUpdatePassword

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const [seeOldPassword, setSeeOldPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)



    const phoneUtil = PhoneNumberUtil.getInstance();

    const isPhoneValid = (phone) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
        } catch (error) {
            return false;
        }
    };

    const handlePhoneChange = (phone, meta) => {
        const { country, inputValue } = meta;

        const isValid = isPhoneValid(phone);

        if (isValid) {
            setMobileNumber(phone)
            setCountryCode(country?.dialCode)
            setInvalidNumber(false)
        } else {
            setInvalidNumber(true)
        }
    };

    const [openPasswordModal, setOpenPasswordModal] = useState(false)
    const [openMobileModal, setOpenMobileModal] = useState(false)
    const [openEmailModal, setOpenEmailModal] = useState(false)

    return (
        <main className={style.admin_edit_profile_container}>
            <div className={style.admin_edit_profile_container_left}>
                <div><p>Your Profile</p></div>
                <div className={style.admin_edit_profile_content_left}>
                    <div>

                        {
                            uploadpicLoader ? <Skeleton
                                variant="rectangular"
                                className={style.admin_profile_loader}
                            /> : <img src={adminProfile?.profile[0]?.url} alt="profile" />
                        }
                        <button
                            className={style.upload_image_container}
                            onClick={() => handleSalonLogoButtonClick()}
                        ><CameraIcon /></button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleProfileFileInputChange}
                        />
                    </div>

                    <p>{name}</p>
                    <p>{adminProfile?.email}</p>
                </div>
            </div>
            <div className={style.admin_edit_profile_container_right}>
                <div>
                    <p>Name</p>
                    <input
                        type="text"
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <p>Email</p>
                    <div className={style.admin_edit_email_container}>
                        <input
                            type="text"
                            placeholder='Enter Email'
                            value={adminProfile?.email}
                        />

                        <button
                            onClick={() => sendVerificationEmail()}
                            className={changeEmailVerifiedState ? style.admin_verified_icon : style.admin_notverified_icon}
                            title={changeEmailVerifiedState ? "Verified" : "NotVerified"}
                            style={{
                                cursor: changeEmailVerifiedState ? "not-allowed" : "pointer"
                            }}
                        >
                            {changeEmailVerifiedState ? <CheckIcon /> : <CloseIcon />}

                        </button>

                    </div>
                </div>

                <Modal
                    open={openEmailModal}
                    onClose={() => setOpenEmailModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={style.modal_email_mob_container}>
                        <div><OtpEmailIcon /></div>

                        <div>
                            <p>Please check your email</p>
                            <p>We have sent a code to your <span style={{ fontWeight: "600", color: "#0866ff" }}>{adminProfile?.email}</span></p>
                            <div>
                                {
                                    otp.map((digit, index) => (
                                        <input
                                            type="text"
                                            key={index}
                                            maxLength={1}
                                            value={digit}
                                            autoFocus={index === 0}
                                            ref={(ref) => (otpinputRef.current[index] = ref)}
                                            onChange={(e) => handleOtpInputChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                        ></input>
                                    ))
                                }
                            </div>

                            <p>Didn't get the code ? <span onClick={() => sendVerificationEmail()}>Click to resend</span></p>

                            <div>
                                <button onClick={() => setOpenEmailModal(false)}>Cancel</button>
                                <button onClick={verifyEmailStatusClicked}>Verify</button>
                            </div>

                        </div>

                    </div>
                </Modal>

                <div>
                    <p>Password</p>
                    <input
                        type="text"
                        value="********"
                        onClick={() => setOpenPasswordModal(true)}
                    />
                </div>

                <Modal
                    open={openPasswordModal}
                    onClose={() => setOpenPasswordModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={style.modal_container}>
                        <div>
                            <p>Change your password</p>
                            <button onClick={() => setOpenPasswordModal(false)}><CloseIcon /></button>
                        </div>
                        <div className={style.modal_content_container}>

                            <div>
                                <p>Old Password</p>
                                <div>
                                    <input
                                        type={`${seePassword ? "text" : "password"}`}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        placeholder='Enter Old Password'
                                    />
                                    <div onClick={() => setSeePassword((prev) => !prev)}>{seePassword ? <Eyevisible /> : <Notvisibleeye />}</div>
                                </div>
                            </div>

                            <div>
                                <p>New Password</p>
                                <div>
                                    <input
                                        type={`${seeOldPassword ? "text" : "password"}`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Enter New Password'
                                    />
                                    <div onClick={() => setSeeOldPassword((prev) => !prev)}>{seeOldPassword ? <Eyevisible /> : <Notvisibleeye />}</div>
                                </div>
                            </div>

                            <div>
                                <p>Confirm Password</p>
                                <div>
                                    <input
                                        type={`${seeConfirmPassword ? "text" : "password"}`}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder='Enter Confirm Password'
                                    />
                                    <div onClick={() => setSeeConfirmPassword((prev) => !prev)}>{seeConfirmPassword ? <Eyevisible /> : <Notvisibleeye />}</div>
                                </div>
                            </div>

                            <button
                                className={style.edit_modal_btn}
                                onClick={updatePasswordHandler}
                            >
                                {
                                    adminUpdatePasswordLoading ?
                                        (
                                            <ButtonLoader />
                                        ) :
                                        (
                                            <>
                                                <p>Save</p>
                                                <div><SaveIcon /></div>
                                            </>
                                        )
                                }

                            </button>
                        </div>
                    </div>
                </Modal >

                <div>
                    <p>Mob. Number</p>
                    <div className={style.admin_edit_mobile_container}>
                        <div>
                            <PhoneInput
                                forceDialCode={true}
                                defaultCountry="gb"
                                value={mobileNumber}
                                onChange={(phone, meta) => handlePhoneChange(phone, meta, "mobileNumber")}
                            />
                        </div>

                        <button
                            onClick={() => sendVerificationMobile()}
                            className={changeMobileVerifiedState ? style.admin_verified_icon : style.admin_notverified_icon}
                            title={changeMobileVerifiedState ? "Verified" : "NotVerified"}
                            style={{
                                cursor: changeMobileVerifiedState ? "not-allowed" : "pointer"
                            }}
                        >
                            {changeMobileVerifiedState ? <CheckIcon /> : <CloseIcon />}

                        </button>
                        {/* <div onClick={() => sendVerificationMobile()}><CloseIcon /></div> */}
                    </div>
                </div>

                <Modal
                    open={openMobileModal}
                    onClose={() => setOpenMobileModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={style.modal_email_mob_container}>
                        <div><OtpMessageIcon /></div>

                        <div>
                            <p>Please check your message</p>
                            <p>We have sent a code to your <span style={{ fontWeight: "600", color: "#0866ff" }}>{adminProfile?.mobileNumber}</span></p>
                            <div>
                                {
                                    mobileotp.map((digit, index) => (
                                        <input
                                            type="text"
                                            key={index}
                                            maxLength={1}
                                            value={digit}
                                            autoFocus={index === 0}
                                            ref={(ref) => (mobileotpinputRef.current[index] = ref)}
                                            onChange={(e) => handleMobileOtpInputChange(index, e.target.value)}
                                            onKeyDown={(e) => handleMobileKeyDown(index, e)}
                                        ></input>
                                    ))
                                }
                            </div>

                            <p>Didn't get the code ? <span onClick={() => sendVerificationMobile()}>Click to resend</span></p>

                            <div>
                                <button onClick={() => setOpenMobileModal(false)}>Cancel</button>
                                <button onClick={verifyMobileStatusClicked}>Verify</button>
                            </div>

                        </div>

                    </div>
                </Modal>

                <div>
                    <p>Date of Birth</p>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateofBirth(e.target.value)}
                    />
                </div>

                <div className={style.admin_edit_gender_container}>
                    <p>Gender</p>
                    <input
                        type="text"
                        value={`${gender ? `${gender}` : ''}`}
                        onClick={() => genderDropHandler()}
                    />

                    {genderDrop &&
                        <ClickAwayListener onClickAway={() => setGenderDrop(false)}>
                            <div>
                                <p onClick={() => setGenderHandler("Male")}>Male</p>
                                <p onClick={() => setGenderHandler("Female")}>Female</p>
                                <p onClick={() => setGenderHandler("Other")}>Other</p>
                            </div>
                        </ClickAwayListener>}

                </div>


                <button className={style.edit_profile_btn} onClick={updateAdminProfile}>
                    {
                        adminUpdateProfileLoading ? (<ButtonLoader />) :
                            <>
                                <p>Save</p>
                                <div><SaveIcon /></div>
                            </>
                    }
                </button>
            </div >
        </main >
    )
}

export default EditProfile