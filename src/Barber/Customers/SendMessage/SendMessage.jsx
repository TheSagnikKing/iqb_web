import React, { useState } from 'react'
import "./SendMessage.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { barberSendCustomerMessageAction } from '../../../Redux/Barber/Actions/BarberCustomersAction'

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
        dispatch(barberSendCustomerMessageAction(smsdata, setMessage, navigate))

    }

    const barberSendCustomerMessage = useSelector(state => state.barberSendCustomerMessage)

    const {
        loading: barberSendCustomerMessageLoading
    } = barberSendCustomerMessage

    return (
        <div className='send_customer_message_container'>
            <p>Send Message</p>
            <div>
                <div className='send_customer_message_content'>
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
                        barberSendCustomerMessageLoading ?
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