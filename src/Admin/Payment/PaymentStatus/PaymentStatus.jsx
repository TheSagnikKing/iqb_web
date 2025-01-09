import React from 'react'
import style from './PaymentStatus.module.css'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

const PaymentStatus = () => {

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const paymentStatusdata = [
        {
            _id: 1,
            name: "Appointment",
            price: 300,
            buyDate: "2025-01-01",
            expiryDate: "2025-02-25",
            status: true,
            planValidity: 30
        },
        {
            _id: 2,
            name: "Queueing",
            price: 200,
            buyDate: "2025-01-01",
            expiryDate: "2025-02-25",
            status: false,
            planValidity: 60
        },
    ]

    return (
        <div className={`${style.payment_status_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
                <p>Payment Status</p>
            </div>

            <div className={`${style.payment_status_content_wrapper} ${darkmodeOn && style.dark}`}>
                <div className={`${style.payment_content_body} ${darkmodeOn && style.dark}`}>
                    <div>
                        <p>Product Name</p>
                        <p>Price</p>
                        <p>Purchase</p>
                        <p>Expiry</p>
                        <p>Plan Validity</p>
                        <p
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >Status</p>
                    </div>

                    {paymentStatusdata.map((s, index) => (
                        <div key={s?._id}
                            style={{
                                borderBottom: paymentStatusdata.length - 1 === index && "none"
                            }}
                        >
                            <p>{s?.name}</p>
                            <p>{s?.price}</p>
                            <p>{s?.buyDate}</p>
                            <p>{s?.expiryDate}</p>
                            <p>{s?.planValidity}{" "}days</p>
                            <p
                                style={{
                                    height: "3.5rem",
                                    width: "8rem",
                                    borderRadius: "2rem",
                                    backgroundColor: s?.status ? "var(--color-9)" : "var(--color-11)",
                                    color: s?.status ? "var(--color-8)" : "var(--color-10)",
                                    border: s?.status ? "0.1rem solid var(--color-8)" : "0.1rem solid var(--color-10)",
                                    fontWeight: "500",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >{s?.status ? "Active" : "Inactive"}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default PaymentStatus