import React, { useEffect, useRef, useState } from 'react'
import "./EditProfile.css"
import { CameraIcon, CheckIcon } from '../../icons';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useSelector } from 'react-redux';

const EditProfile = () => {

    const adminProfile = useSelector(state => state.AdminLoggedInMiddleware.entiredata.user[0])

    const [name, setName] = useState(adminProfile?.name)
    const [dateOfBirth, setDateofBirth] = useState(adminProfile?.dateOfBirth.split('T')[0])

    const [profilepic, setProfilepic] = useState(adminProfile?.profile[0].url)

    const fileInputRef = useRef(null);

    const handleSalonLogoButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleProfileFileInputChange = async (e) => {
        const uploadImage = e.target.files[0]; // Get the uploaded file

        const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
        if (!allowedTypes.includes(uploadImage.type)) {
            alert("Please upload a valid image file (JPEG, WebP, PNG).");
            return;
        }

        const imageUrl = URL.createObjectURL(uploadImage);

        setProfilepic(imageUrl);
    };

    const [verifyEmailButtonClicked, setVerifyEmailButtonClicked] = useState(false)

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


    const [mobileNumber, setMobileNumber] = useState(adminProfile?.mobileNumber.toString())

    return (
        <div className='admin_edit_profile'>
            <div className='admin_edit_profile_content_wrapper'>
                <div>
                    <p>Edit profile</p>
                    <div>
                        <img src={`${profilepic}`} alt="" />
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
                    <p>Name</p>
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <div>
                        <p>Email</p>
                        <div>
                            <input 
                            type="email" 
                            value={adminProfile?.email}
                            />
                            <button onClick={() => setVerifyEmailButtonClicked((prev) => !prev)}>
                                <p>Verified</p>
                                <div><CheckIcon /></div>
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
                            <button onClick={() => {}}>
                                <p>Verified</p>
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
                    <button>Update</button>
                </div>
            </div>

            {
                verifyEmailButtonClicked && <div className='verify_email_wrapper'>
                    <div className='verify_email_content_wrapper'>
                        <div>
                            <button onClick={() => setVerifyEmailButtonClicked(false)}>X</button>
                        </div>

                        <div>
                            <div>
                                <img src="./email_verification.png" alt="" />
                            </div>
                            <div>
                                <div>
                                    <p>Check Your Email</p>
                                    <p>An email with a verification code was just sent to your email address</p>

                                    <div>
                                        <p>arghy@gmail.com</p>
                                        <button>change</button>
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

                                    <div>
                                        <button>Verify</button>
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