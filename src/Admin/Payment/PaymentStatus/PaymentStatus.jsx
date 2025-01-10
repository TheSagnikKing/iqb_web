import React, { useEffect, useState } from 'react'
import style from './PaymentStatus.module.css'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import api from '../../../Redux/api/Api'
import Skeleton from 'react-loading-skeleton'

const PaymentStatus = () => {

    const [paymentStatusdata, setPaymentStatusdata] = useState([])
    const [paymentStatusLoading, setPaymentStatusLoading] = useState(false)

    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

    const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon)

    const {
        loading: adminGetDefaultSalonLoading,
        resolve: adminGetDefaultSalonResolve,
        response: adminGetDefaultSalonResponse
    } = adminGetDefaultSalon

    useEffect(() => {
        if (salonId !== 0) {
            try {
                const fetchpayments = async () => {
                    setPaymentStatusLoading(true)
                    const { data } = await api.post("/api/salon/getSalonPaymentsBySalonId", {
                        salonId
                    })

                    setPaymentStatusdata(data.response)
                    setPaymentStatusLoading(false)
                }

                fetchpayments()
            } catch (error) {
                setPaymentStatusLoading(false)
            }
        }
    }, [salonId])

    console.log(paymentStatusdata)

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    // const paymentStatusdata = [
    //     {
    //         _id: 1,
    //         name: "Appointment",
    //         price: 300,
    //         buyDate: "2025-01-01",
    //         expiryDate: "2025-02-25",
    //         status: true,
    //         planValidity: 30
    //     },
    //     {
    //         _id: 2,
    //         name: "Queueing",
    //         price: 200,
    //         buyDate: "2025-01-01",
    //         expiryDate: "2025-02-25",
    //         status: false,
    //         planValidity: 60
    //     },
    // ]

    return (
        <div className={`${style.payment_status_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
                <p>Payment Status</p>
            </div>

            <div className={`${style.payment_status_content_wrapper} ${darkmodeOn && style.dark}`}>

                {
                    paymentStatusLoading ? (
                        <div className={`${style.payment_content_body} ${darkmodeOn && style.dark}`}>
                            <Skeleton
                                count={6}
                                height={"6rem"}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                                style={{ marginBottom: "1rem" }} />
                        </div>
                    ) : paymentStatusdata?.length > 0 ? (
                        <div className={`${style.payment_content_body} ${darkmodeOn && style.dark}`}>
                            <div>
                                <p>Customer Name</p>
                                <p>Product Name</p>
                                <p>Price</p>
                                <p>Purchase</p>
                                <p>Expiry</p>
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
                                    <p>{s?.customerName}</p>
                                    <p>
                                        {
                                            (s?.isQueuing && s?.isAppointments) ? ("Queueing, Appointment") :
                                                s?.isQueuing ? ("Queueing") :
                                                    s?.isAppointments && ("Appointments")
                                        }
                                    </p>
                                    <p>{adminGetDefaultSalonResponse?.currency}{" "}{s?.amount}</p>
                                    <p>{s?.purchaseDate}</p>
                                    <p>{s?.paymentExpiryDate}</p>
                                    <p
                                        style={{
                                            height: "3.5rem",
                                            width: "8rem",
                                            borderRadius: "2rem",
                                            backgroundColor: s?.activityStatus ? "var(--color-9)" : "var(--color-11)",
                                            color: s?.activityStatus ? "var(--color-8)" : "var(--color-10)",
                                            border: s?.activityStatus ? "0.1rem solid var(--color-8)" : "0.1rem solid var(--color-10)",
                                            fontWeight: "500",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >{s?.activityStatus ? "Active" : "Inactive"}</p>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className={`${style.payment_content_body_error} ${darkmodeOn && style.dark}`}>
                            <p>No payments available</p>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default PaymentStatus