import React, { useState } from 'react'
import "./SendEmail.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { barberSendCustomerEmailAction } from '../../../Redux/Barber/Actions/BarberCustomersAction'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

const SendEmail = () => {

    const location = useLocation()

    const recipientEmails = location?.state
    
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sendMailHandler = () => {
        const maildata = {
            subject,
            message,
            role: "Barber",
            recipientEmails
        }
        console.log(maildata)
        dispatch(barberSendCustomerEmailAction(maildata, setSubject, setMessage, navigate))

    }

    const barberSendCustomerEmail = useSelector(state => state.barberSendCustomerEmail)

    const {
        loading: barberSendCustomerEmailLoading
    } = barberSendCustomerEmail


    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    return (
        <div className={`send_customer_email_container ${darkmodeOn && "dark"}`}>
            <p>Send Email</p>
            <div>
                <div className={`send_customer_email_content ${darkmodeOn && "dark"}`}>
                    <div>
                        <p>From</p>
                        <input
                            type="text"
                            value={"support@iqueuebarbers.com"}
                        />
                    </div>

                    <div>
                        <p>To</p>
                        <div>
                            <p>
                            {
                                recipientEmails?.map((e) => recipientEmails.length == 1 ? e : e + ", " )
                            }
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>Subject</p>
                        <input
                            type="text"
                            placeholder='Enter Your Subject'
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

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
                        barberSendCustomerEmailLoading ?
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

export default SendEmail