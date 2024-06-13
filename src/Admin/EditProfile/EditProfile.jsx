import React, { useEffect, useRef, useState } from 'react'
import "./EditProfile.css"
import { CameraIcon, CheckIcon, MobileCrossIcon } from '../../icons';

import { PhoneInput } from 'react-international-phone';
import { useDispatch, useSelector } from 'react-redux';
import { adminSendVerifyEmailAction, adminUpdateProfileAction, adminVerifiedEmailStatusAction } from '../../Redux/Admin/Actions/AdminProfileAction';
import { useNavigate } from 'react-router-dom';
import api from '../../Redux/api/Api';
import { ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS } from '../../Redux/Admin/Constants/constants';
import Skeleton from 'react-loading-skeleton';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import Modal from '../../components/Modal/Modal';
import toast from 'react-hot-toast';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';

const EditProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

    const [changeEmailVerifiedState, setChangeEmailVerifiedState] = useState(adminProfile?.emailVerified)

    const [name, setName] = useState(adminProfile?.name)
    const [dateOfBirth, setDateofBirth] = useState(adminProfile?.dateOfBirth?.split('T')[0])

    const [profilepic, setProfilepic] = useState(adminProfile?.profile[0]?.url)

    const fileInputRef = useRef(null);

    const handleSalonLogoButtonClick = () => {
        fileInputRef.current.click();
    };


    const [uploadpicLoader, setUploadpicLoader] = useState(false)

    const handleProfileFileInputChange = async (e) => {
        const uploadImage = e.target.files[0]; // Get the uploaded file

        const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
        if (!allowedTypes.includes(uploadImage.type)) {
            alert("Please upload a valid image file (JPEG, WebP, PNG).");
            return;
        }

        const formData = new FormData();

        formData.append('email', adminProfile?.email);
        formData.append('profile', uploadImage);
        formData.append('salonId', adminProfile?.salonId)

        try {
            setUploadpicLoader(true)
            const imageResponse = await api.post('/api/admin/uploadAdminProfilePicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadpicLoader(false)

            // setProfilepic(imageResponse?.data?.adminImage?.profile[0]?.url)

            const { data: adminloggedindata } = await api.get('/api/admin/adminloggedin');

            dispatch({
                type: ADMIN_LOGGED_IN_MIDDLEWARE_SUCCESS,
                payload: adminloggedindata
            })


            navigate("/admin-dashboard")
        } catch (error) {
            setUploadpicLoader(false)
            console.error('Image upload failed:', error);
            setProfilepic("")
        }
    };

    const [sendVerificationEmailModal, setSendVerificationEmailModal] = useState(false)

    const sendVerificationEmail = () => {
        if (!changeEmailVerifiedState) {
            dispatch(adminSendVerifyEmailAction(adminProfile?.email, setSendVerificationEmailModal))
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

    const [gender, setGender] = useState(adminProfile?.gender)
    const [genderDrop, setGenderDrop] = useState(false)

    const genderDropHandler = () => {
        setGenderDrop((prev) => !prev)
    }

    const setGenderHandler = (value) => {
        setGender(value)
        setGenderDrop(false)
    }

    const genderinputRef = useRef()
    const genderDropRef = useRef()

    useEffect(() => {
        const handleClickGenderOutside = (event) => {
            if (
                genderinputRef.current &&
                genderDropRef.current &&
                !genderinputRef.current.contains(event.target) &&
                !genderDropRef.current.contains(event.target)
            ) {
                setGenderDrop(false);
            }
        };

        document.addEventListener('mousedown', handleClickGenderOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickGenderOutside);
        };
    }, []);


    const [mobileNumber, setMobileNumber] = useState(adminProfile?.mobileNumber?.toString())

    const updateAdminProfile = () => {
        const profiledata = {
            email: adminProfile?.email,
            dateOfBirth,
            mobileNumber: Number(mobileNumber),
            name,
            gender,
            password
        }

        console.log(profiledata)

        dispatch(adminUpdateProfileAction(profiledata, navigate))

    }

    const verifyEmailStatusClicked = () => {
        const currentOtp = otp?.join("")

        dispatch(adminVerifiedEmailStatusAction(adminProfile?.email, currentOtp, setSendVerificationEmailModal, setOtp, setChangeEmailVerifiedState))
    }

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const adminUpdateProfile = useSelector(state => state.adminUpdateProfile)

    const {
        loading: adminUpdateProfileLoading,
    } = adminUpdateProfile

    const [openModal, setOpenModal] = useState(true)

    const updatePasswordHandler = () => {
        if (password !== confirmPassword) {
            toast.error("Password donot match", {
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
                dateOfBirth,
                mobileNumber: Number(mobileNumber),
                name,
                gender,
                password
            }

            dispatch(adminUpdateProfileAction(profiledata, navigate))

            toast.success("Password matched successfully", {
                duration: 3000,
                style: {
                    fontSize: "1.4rem",
                    borderRadius: '1rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    return (
        <div className='admin_edit_profile'>
            <p style={{ color: darkmodeOn && "var(--primary-text-light-color1)", marginLeft: "1%", paddingTop: "2rem", fontWeight: "bold" }}>Edit profile</p>
            <div className={`admin_edit_profile_content_wrapper ${darkmodeOn && "dark"}`}>
                <div>
                    {/* <p>Edit profile</p> */}
                    <div>
                        {
                            uploadpicLoader ? <Skeleton count={1} height={"12rem"} width={"12rem"} style={{ borderRadius: "50%" }} /> : <img src={`${profilepic}`} alt="" />
                        }

                        <div>
                            <button onClick={() => handleSalonLogoButtonClick()}><CameraIcon /></button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleProfileFileInputChange}
                            />
                        </div>
                    </div>
                </div>
                {
                    !adminProfile?.AuthType == "google" ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem"
                        }}>
                            <p>Name</p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div>
                            <div>
                                <p>Name</p>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div onClick={() => setOpenModal(true)}>
                                <p>Password</p>
                                <input
                                    type="text"
                                    value="********"
                                />
                            </div>
                            {
                                openModal && <Modal setOpenModal={setOpenModal}>
                                    <div className={`password_modal_container ${darkmodeOn && "dark"}`}>
                                        <h1>Change your password</h1>

                                        <div>
                                            <p>Password</p>
                                            <input
                                                type="text"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <p>Confirm Password</p>
                                            <input
                                                type="text"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <button onClick={updatePasswordHandler}>Update</button>
                                        </div>
                                    </div>
                                </Modal>
                            }
                        </div>
                    )
                }

                <div>
                    <div>
                        <p>Email</p>
                        <div>
                            <input
                                type="email"
                                value={adminProfile?.email}
                            />
                            <button onClick={() => sendVerificationEmail()} title={changeEmailVerifiedState ? "Verified" : "NotVerified"} style={{
                                background: changeEmailVerifiedState ? "limegreen" : "red"
                            }}>
                                <div>{changeEmailVerifiedState ? <CheckIcon /> : <MobileCrossIcon />}</div>

                            </button>
                        </div>
                    </div>

                    <div className='admin_profile_mobile_container'>
                        <p>Mobile Number</p>
                        <div>
                            <div>
                                <PhoneInput
                                    forceDialCode={true}
                                    defaultCountry="gb"
                                    value={mobileNumber}
                                    onChange={(phone) => setMobileNumber(phone)}
                                />
                            </div>
                            <button onClick={() => { }} title="Verified">
                                <div><CheckIcon /></div>
                            </button>
                        </div>

                    </div>
                </div>

                <div>
                    <div>
                        <p>Date of Birth</p>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateofBirth(e.target.value)}
                        />
                    </div>

                    <div>
                        <p>Gender</p>
                        <input
                            type="text"
                            value={`${gender ? `${gender}` : ''}`}
                            onChange={(e) => setGender(e.target.value)}
                            onClick={() => genderDropHandler()}
                            ref={genderinputRef}
                        />

                        {genderDrop && <div ref={genderDropRef}>
                            <p onClick={() => setGenderHandler("male")}>male</p>
                            <p onClick={() => setGenderHandler("female")}>female</p>
                            <p onClick={() => setGenderHandler("Other")}>Other</p>
                        </div>}
                    </div>
                </div>

                <div>
                    {
                        adminUpdateProfileLoading ? <button style={{
                            display: "grid",
                            placeItems: "center"
                        }}><ButtonLoader /></button> : <button onClick={updateAdminProfile}>Update</button>
                    }
                </div>
            </div>

            {
                sendVerificationEmailModal && <div className='verify_email_wrapper'>
                    <div className={`verify_email_content_wrapper ${darkmodeOn && "dark"}`}>
                        <div>
                            <button onClick={() => setSendVerificationEmailModal(false)}>X</button>
                        </div>

                        <div>
                            <div>
                                <img src="/email_verification.png" alt="" />
                            </div>
                            <div>
                                <div>
                                    <p>Check Your Email</p>
                                    <p>An email with a verification code was just sent to your email address</p>

                                    <div>
                                        <p>{adminProfile?.email}</p>
                                        <button onClick={verifyEmailStatusClicked}>Verify</button>
                                    </div>

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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditProfile