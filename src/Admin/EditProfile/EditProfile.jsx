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
import { getCurrentDate } from '../../utils/Date';


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
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
            return;
        }

        const maxSizeInBytes = 2 * 1024 * 1024;
        if (uploadImage.size > maxSizeInBytes) {
            toast.error("File size must be lower than 2mb", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
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

            toast.success("Profile upload successfully", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

        } catch (error) {
            setUploadpicLoader(false)

            if (error?.response?.status === 500) {

                toast.error("Something went wrong !", {
                    duration: 3000,
                    style: {
                        fontSize: "var(--list-modal-header-normal-font)",
                        borderRadius: '0.3rem',
                        background: '#333',
                        color: '#fff',
                    },
                });

                return;
            }

            toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    const mobileEmailTimeoutRef = useRef(30);
    const LOCAL_EMAIL_STORAGE_KEY = "lastEmailVerificationTime";

    const sendVerificationEmail = () => {
        if (!changeEmailVerifiedState) {
            const lastCallTime = localStorage.getItem(LOCAL_EMAIL_STORAGE_KEY);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

            if (lastCallTime && currentTime - lastCallTime < mobileEmailTimeoutRef.current) {
                const timeLeft = mobileEmailTimeoutRef.current - (currentTime - lastCallTime);
                alert(`Please wait ${timeLeft} seconds before resending.`);
                return;
            }

            // Save the current timestamp to localStorage
            localStorage.setItem(LOCAL_EMAIL_STORAGE_KEY, currentTime);

            dispatch(adminSendVerifyEmailAction(adminProfile?.email, setOpenEmailModal))
        }
    };


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

        if (e.key === "Enter") {
            verifyEmailStatusClicked();
        }
    };

    const mobileTimeoutRef = useRef(30);
    const LOCAL_STORAGE_KEY = "lastMobileVerificationTime";

    const sendVerificationMobile = () => {
        if (!changeMobileVerifiedState) {
            const lastCallTime = localStorage.getItem(LOCAL_STORAGE_KEY);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

            if (lastCallTime && currentTime - lastCallTime < mobileTimeoutRef.current) {
                const timeLeft = mobileTimeoutRef.current - (currentTime - lastCallTime);
                alert(`Please wait ${timeLeft} seconds before resending.`);
                return;
            }

            // Save the current timestamp to localStorage
            localStorage.setItem(LOCAL_STORAGE_KEY, currentTime);

            dispatch(adminSendVerifyMobileAction(adminProfile?.email, setOpenMobileModal));
        }
    };


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

        if (e.key === "Enter") {
            verifyMobileStatusClicked();
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

    const [nameError, setNameError] = useState("")
    const [invalidNumberError, setInvalidNumberError] = useState("")

    const updateAdminProfile = () => {

        if (name.length === 0 || name.length > 20) {
            toast.error("Name must be between 1 to 20 characters", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
            return setNameError("Name must be between 1 to 20 characters");
        }

        if (invalidnumber) {
            toast.error("Invalid Number", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return setInvalidNumberError("Invalid Number")
        }


        const profiledata = {
            email: adminProfile?.email,
            dateOfBirth,
            mobileNumber: Number(mobileNumber),
            countryCode: Number(countryCode),
            name,
            gender,
        }

        // console.log(profiledata)

        dispatch(adminUpdateProfileAction(profiledata, navigate))


    }


    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            updateAdminProfile();
        }
    };

    const handleKeyPressPassword = (e) => {
        if (e.key === "Enter") {
            updatePasswordHandler();
        }
    };

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


    const updatePasswordHandler = () => {
        if (password !== confirmPassword) {
            toast.error("New and confirm password donot match", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
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

    const [countryflag, setCountryFlag] = useState("gb")

    const handlePhoneChange = (phone, meta) => {
        setInvalidNumber("")
        const { country, inputValue } = meta;

        const isValid = isPhoneValid(phone);

        if (isValid) {
            setMobileNumber(phone)
            setCountryCode(country?.dialCode)
            setCountryFlag(country?.iso2)
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
                                style={{
                                    backgroundColor: false && "#ffffff6e"
                                }}
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

                    <p>{name?.length > 20 ? `${name.slice(0,20)}...` : name}</p>
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
                        onChange={(e) => {
                            setNameError("")
                            setName(e.target.value)
                        }}
                        onKeyDown={handleKeyPress}
                        style={{
                            border: nameError ? "0.1rem solid red" : "none"
                        }}
                    />
                     <p className={style.error_message}>{nameError}</p>
                </div>

                <div>
                    <p>Email</p>
                    <div className={style.admin_edit_email_container}>
                        <input
                            type="text"
                            placeholder='Enter Email'
                            value={adminProfile?.email}
                            readOnly
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
                    <div className={style.modal_common_container}>
                        <div><OtpEmailIcon /></div>

                        <div>
                            <p>Please check your email</p>
                            <p>We have sent a code to your <span style={{ fontWeight: "600", color: "#000" }}>{adminProfile?.email}</span></p>
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
                                            onChange={(e) => {
                                                if (/^\d*$/.test(e.target.value)) {
                                                    handleOtpInputChange(index, e.target.value)
                                                }
                                            }
                                            }
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
                        readOnly
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
                                        onKeyDown={handleKeyPressPassword}
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
                                        onKeyDown={handleKeyPressPassword}
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
                                        onKeyDown={handleKeyPressPassword}
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
                                            "Save"
                                        )
                                }

                            </button>
                        </div>
                    </div>
                </Modal >

                <div>
                    <p>Mob. Number</p>
                    <div className={style.admin_edit_mobile_container} style={{ outline: invalidNumberError && "0.1rem solid red" }}>
                        <div onKeyDown={handleKeyPress}>
                            <PhoneInput
                                forceDialCode={true}
                                defaultCountry={countryflag}
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
                    </div>
                    <p className={style.error_message}>{invalidNumberError}</p>
                </div>

                <Modal
                    open={openMobileModal}
                    onClose={() => setOpenMobileModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={style.modal_common_container}>
                        <div><OtpMessageIcon /></div>

                        <div>
                            <p>Please check your message</p>
                            <p>We have sent a code to your <span style={{ fontWeight: "600", color: "#000" }}>{adminProfile?.mobileNumber}</span></p>
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
                                            onChange={(e) => {
                                                if (/^\d*$/.test(e.target.value)) {
                                                    handleMobileOtpInputChange(index, e.target.value)
                                                }
                                            }
                                            }
                                            onKeyDown={(e) => handleMobileKeyDown(index, e)}
                                        ></input>
                                    ))
                                }
                            </div>

                            <p>Didn't get the code ?
                                <span onClick={() => sendVerificationMobile()}>Click to resend</span>
                            </p>

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
                        onKeyDown={handleKeyPress}
                        max={getCurrentDate()}
                    />
                </div>

                <div className={style.admin_edit_gender_container}>
                    <p>Gender</p>
                    <input
                        type="text"
                        value={`${gender ? `${gender}` : ''}`}
                        onClick={() => genderDropHandler()}
                        readOnly
                        onKeyDown={handleKeyPress}
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
                            "Save"
                    }
                </button>
            </div >
        </main >
    )
}

export default EditProfile