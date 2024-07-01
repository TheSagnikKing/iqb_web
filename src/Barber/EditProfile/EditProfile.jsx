import React, { useEffect, useRef, useState } from 'react'
import "./EditProfile.css"
import { CameraIcon, CheckIcon, Eyevisible, MobileCrossIcon, Notvisibleeye } from '../../icons';

import { PhoneInput } from 'react-international-phone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../Redux/api/Api';
import Skeleton from 'react-loading-skeleton';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader';
import Modal from '../../components/Modal/Modal';
import toast from 'react-hot-toast';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer';

import { barberSendVerifyEmailAction, barberUpdateProfileAction, barberVerifiedEmailStatusAction } from "../../Redux/Barber/Actions/BarberProfileAction"
import { BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS } from '../../Redux/Barber/Constants/constants';

const EditProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const barberProfile = useSelector(state => state.BarberLoggedInMiddleware.entiredata.user[0])

    const [changeEmailVerifiedState, setChangeEmailVerifiedState] = useState(barberProfile?.emailVerified)

    const [name, setName] = useState(barberProfile?.name)
    const [dateOfBirth, setDateofBirth] = useState(barberProfile?.dateOfBirth?.split('T')[0])

    const [profilepic, setProfilepic] = useState("")

    useEffect(() => {
        if (barberProfile && barberProfile?.profile[0]?.url) {
            setProfilepic(barberProfile?.profile[0]?.url)
        } else {
            setProfilepic("https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg")
        }
    }, [barberProfile])

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

        formData.append('email', barberProfile?.email);
        formData.append('profile', uploadImage);
        formData.append('salonId', barberProfile?.salonId)

        try {
            setUploadpicLoader(true)
            const imageResponse = await api.post('/api/barber/uploadBarberProfilePicture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadpicLoader(false)

            // setProfilepic(imageResponse?.data?.adminImage?.profile[0]?.url)

            const { data: barberloggedindata } = await api.get('/api/barber/barberloggedin');

            dispatch({
                type: BARBER_LOGGED_IN_MIDDLEWARE_SUCCESS,
                payload: barberloggedindata
            })


            // navigate("/barber-dashboard")
        } catch (error) {
            setUploadpicLoader(false)
            console.error('Image upload failed:', error);
            setProfilepic("")
        }
    };

    const [sendVerificationEmailModal, setSendVerificationEmailModal] = useState(false)

    const sendVerificationEmail = () => {
        if (!changeEmailVerifiedState) {
            dispatch(barberSendVerifyEmailAction(barberProfile?.email, setSendVerificationEmailModal))
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

    const [gender, setGender] = useState(barberProfile?.gender)
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


    const [mobileNumber, setMobileNumber] = useState(barberProfile?.mobileNumber?.toString())

    const updateBarberProfile = () => {
        const profiledata = {
            email: barberProfile?.email,
            dateOfBirth,
            mobileNumber: Number(mobileNumber),
            name,
            gender,
            password
        }

        console.log(profiledata)

        dispatch(barberUpdateProfileAction(profiledata, navigate))
    }

    const barberUpdateProfile = useSelector(state => state.barberUpdateProfile)

    const {
        loading: barberUpdateProfileLoading,
        resolve: barberUpdateProfileResolve,
        // response: AllCustomerList
    } = barberUpdateProfile

    const verifyEmailStatusClicked = () => {
        const currentOtp = otp?.join("")

        dispatch(barberVerifiedEmailStatusAction(barberProfile?.email, currentOtp, setSendVerificationEmailModal, setOtp, setChangeEmailVerifiedState))
    }

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // const barberUpdateProfile = useSelector(state => state.barberUpdateProfile)

    // const {
    //     loading: barberUpdateProfileLoading,
    // } = barberUpdateProfile

    const [openModal, setOpenModal] = useState(false)

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
                email: barberProfile?.email,
                dateOfBirth,
                mobileNumber: Number(mobileNumber),
                name,
                gender,
                password,
                oldPassword
            }

            dispatch(barberUpdateProfileAction(profiledata, navigate))

            // toast.success("Password matched successfully", {
            //     duration: 3000,
            //     style: {
            //         fontSize: "1.4rem",
            //         borderRadius: '1rem',
            //         background: '#333',
            //         color: '#fff',
            //     },
            // });
        }
    }

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const [seeOldPassword, setSeeOldPassword] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

    return (
        <div className='barber_edit_profile'>
            <p style={{ color: darkmodeOn && "var(--primary-text-light-color1)", marginLeft: "1%", paddingTop: "2rem", fontWeight: "bold" }}>Edit profile</p>
            <div className={`barber_edit_profile_content_wrapper ${darkmodeOn && "dark"}`}>
                <div>
                    {/* <p>Edit profile</p> */}
                    <div>
                        {
                            uploadpicLoader ? <Skeleton count={1} height={"12rem"} width={"12rem"} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} style={{ borderRadius: "50%" }} /> : <img src={`${profilepic}`} alt="" />
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
                                    <p>Old Password</p>
                                    <div>
                                        <input
                                            type={`${seeOldPassword ? "text" : "password"}`}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                        <div onClick={() => setSeeOldPassword((prev) => !prev)}>{seeOldPassword ? <Eyevisible /> : <Notvisibleeye />}</div>
                                    </div>
                                </div>

                                <div>
                                    <p>Password</p>
                                    <div>
                                        <input
                                            type={`${seePassword ? "text" : "password"}`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div onClick={() => setSeePassword((prev) => !prev)}>{seePassword ? <Eyevisible /> : <Notvisibleeye />}</div>
                                    </div>
                                </div>

                                <div>
                                    <p>Confirm Password</p>
                                    <div>
                                        <input
                                            type={`${seeConfirmPassword ? "text" : "password"}`}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <div onClick={() => setSeeConfirmPassword((prev) => !prev)}>{seeConfirmPassword ? <Eyevisible /> : <Notvisibleeye />}</div>
                                    </div>
                                </div>

                                <div>
                                    <button onClick={updatePasswordHandler}>Update</button>
                                </div>
                            </div>
                        </Modal>
                    }
                </div>
                
                <div>
                    <div>
                        <p>Email</p>
                        <div>
                            <input
                                type="email"
                                value={barberProfile?.email}
                            />
                            <button onClick={() => sendVerificationEmail()} title={changeEmailVerifiedState ? "Verified" : "NotVerified"} style={{
                                background: changeEmailVerifiedState ? "limegreen" : "red"
                            }}>
                                <div>{changeEmailVerifiedState ? <CheckIcon /> : <MobileCrossIcon />}</div>

                            </button>
                        </div>
                    </div>

                    <div className='barber_profile_mobile_container'>
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
                        barberUpdateProfileLoading ? <button style={{
                            display: "grid",
                            placeItems: "center"
                        }}><ButtonLoader /></button> : <button onClick={updateBarberProfile}>Update</button>
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
                                        <p>{barberProfile?.email}</p>
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