import React, { useState } from 'react'
import "./SendEmail.css"
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { adminSendBarberEmailAction } from '../../../Redux/Admin/Actions/BarberAction'
import { useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const SendEmail = () => {

    const location = useLocation()

    const recipientEmails = location?.state

    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    const sendMailHandler = () => {
        const maildata = {
            subject,
            message,
            role:"Barber",
            recipientEmails
        }
        console.log(maildata)
        dispatch(adminSendBarberEmailAction(maildata,setSubject,setMessage))

    }

    const adminSendBarberEmail = useSelector(state => state.adminSendBarberEmail)

    const {
        loading: adminSendBarberEmailLoading
    } = adminSendBarberEmail

    return (
        <div className='send_email_container'>
            <p>Send Email</p>
            <div>
                <div className='send_email_content'>
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
                        adminSendBarberEmailLoading ?
                            <button><ButtonLoader /></button> :
                            <button onClick={sendMailHandler} disabled={adminSendBarberEmailLoading}>Send</button>
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