import React, { useRef, useState } from 'react'
import "./EditProfile.css"
import { CameraIcon, CheckIcon } from '../../icons';

const EditProfile = () => {

    const [profilepic, setProfilepic] = useState("")


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

    console.log(otp)

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
                    <input type="text" />
                </div>

                <div>
                    <div>
                        <p>Email</p>
                        <input type="email" />

                        <div onClick={() => setVerifyEmailButtonClicked((prev) => !prev)}>
                            <p>Verified Email</p>
                            <div><CheckIcon /></div>
                        </div>
                    </div>

                    <div>
                        <p>Mobile Number</p>
                        <input type="email" />
                    </div>
                </div>

                <div>
                    <div>
                        <p>Date of Birth</p>
                        <input type="date" />
                    </div>

                    <div>
                        <p>Gender</p>
                        <input type="text" />
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
            }
        </div>
    )
}

export default EditProfile