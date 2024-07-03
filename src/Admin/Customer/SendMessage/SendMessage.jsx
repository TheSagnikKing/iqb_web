import React, { useState } from 'react'
import "./SendMessage.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminSendBarberEmailAction, adminSendBarberMessageAction } from '../../../Redux/Admin/Actions/BarberAction'
import { useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

const SendMessage = () => {

    const location = useLocation()

    const recipientMobileNumbers = location?.state?.checkMobileNumbers

    const recipentCustomerNames = location?.state?.checkCustomerNames

    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendMailHandler = () => {
        const smsdata = {
            smsBody: message,
            numbers: recipientMobileNumbers
        }
        console.log(smsdata)
        dispatch(adminSendBarberMessageAction(smsdata, setMessage, navigate, "/admin-customer"))

    }

    const adminSendBarberMessage = useSelector(state => state.adminSendBarberMessage)

    const {
        loading: adminSendBarberMessageLoading
    } = adminSendBarberMessage

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    return (
        <div className={`send_customer_message_container ${darkmodeOn && "dark"}`}>
            <p>Send Message</p>
            <div>
                <div className={`send_customer_message_content ${darkmodeOn && "dark"}`}>
                    <div>
                        <p>From</p>
                        <input
                            type="text"
                            value={"iqueuebarbers"}
                        />
                    </div>

                    <div>
                        <p>To</p>
                        <div>
                            <p>
                            {
                                recipentCustomerNames?.map((e) => recipentCustomerNames.length == 1 ? e : e + ", " )
                            }
                            </p>
                        </div>
                    </div>
                    {/* <div>
                        <p>Subject</p>
                        <input
                            type="text"
                            placeholder='Enter Your Subject'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div> */}

                    <div>
                        <p>Message</p>
                        <textarea
                            type="text"
                            placeholder='Enter Your Message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    {
                        adminSendBarberMessageLoading ?
                            <button><ButtonLoader /></button> :
                            <button onClick={sendMailHandler}>Send</button>
                    }
                </div>

                <div>
                    <img src="/passwordReset_img.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default SendMessage