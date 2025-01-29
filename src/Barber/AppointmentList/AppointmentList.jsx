import React, { useEffect, useRef, useState } from 'react'
import style from './AppointmentList.module.css'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { ClickAwayListener, Modal } from '@mui/material'
import { CloseIcon } from '../../icons'
import { useDispatch } from 'react-redux'
import { AppointmentAction, CancelAppointmentAction } from '../../Redux/Barber/Actions/AppointmentAction'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'

const AppointmentList = () => {

    const salonId = useSelector(state => state.BarberLoggedInMiddleware?.barberSalonId)
    const barberId = useSelector(state => state.BarberLoggedInMiddleware?.barberId)

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(AppointmentAction({
            salonId,
            barberId,
        }));
    }, [dispatch]);

    const appointmentList = useSelector((state) => state.AppointmentBarber)

    const {
        loading: appointmentLoading,
        response: appointmentResponse
    } = appointmentList;

    const [modalData, setModalData] = useState({})
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    // console.log(modalData)

    const CancelHandler = async () => {

        if (!subject) {
            return toast.error("Please enter subject", {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }

        if (!body) {
            return toast.error("Please enter body", {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }

        const cancelbody = {
            salonId,
            barberId,
            idsToCancel: [modalData._id],
            appointmentDate: modalData.appointmentDate,
            subject,
            body
        }

        // console.log(cancelbody)

        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            dispatch(CancelAppointmentAction(cancelbody,setCancelAllModalOpen,setOpenModal))
        }
    }

    const CancelAllHandler = () => {

        if (!subject) {
            return toast.error("Please enter subject", {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }

        if (!body) {
            return toast.error("Please enter body", {
                duration: 3000,
                style: {
                    fontSize: "var(--font-size-2)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }


        const cancelbody = {
            salonId,
            barberId,
            idsToCancel: cancelAllAppoint.appointments.map((s) => s._id),
            appointmentDate: cancelAllAppoint.appointmentDate,
            subject,
            body
        }

        console.log(cancelbody)

        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            dispatch(CancelAppointmentAction(cancelbody,setCancelAllModalOpen,setOpenModal))
        }

    }

    const [cancelAllModalOpen, setCancelAllModalOpen] = useState(false)
    const [cancelAllAppoint, setCancelAllAppoint] = useState({})


    return (
        <div className={`${style.appointment_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
                <p>Appointment List</p>
            </div>
            <div className={`${style.appointment_content_wrapper} ${darkmodeOn && style.dark}`}>
                {
                    appointmentLoading ? (
                        <div style={{ width: "100%", height: "100%", display: "flex", gap: "1.2rem" }}>
                            <Skeleton
                                count={1}
                                style={{ width: "30rem", height: "100%" }}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

                            <Skeleton
                                count={1}
                                style={{ width: "30rem", height: "100%" }}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

                            <Skeleton
                                count={1}
                                style={{ width: "30rem", height: "100%" }}
                                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />

                        </div>
                    ) : appointmentResponse?.length > 0 ? (
                        appointmentResponse.map((appoint) => {
                            return (
                                <main className={`${style.appointment_container} ${darkmodeOn ? style.dark : ''}`} key={appoint.appointmentDate}>
                                    <div className={`${style.appointment_barber_container} ${darkmodeOn ? style.dark : ''}`}>
                                        <p>{appoint.appointmentDate}</p>
                                        <button onClick={() => {
                                            setCancelAllModalOpen(true)
                                            setSubject("")
                                            setBody("")
                                            setCancelAllAppoint(appoint)
                                        }}>Cancel All</button>
                                    </div>

                                    <main className={style.appointment_content_list_container}>
                                        {
                                            appoint.appointments.map((s, index) => {
                                                return (
                                                    <div
                                                        className={`${style.appointment_body_customer_item} ${darkmodeOn ? style.dark : ''}`}
                                                        key={index}
                                                    >
                                                        <div>
                                                            <img src={s?.customerProfile} alt="" />
                                                        </div>
                                                        <div>
                                                            <p>{s.customerName.length > 10 ? `${s.customerName.slice(0, 10)}...` : s.customerName}</p>
                                                            <p>
                                                                {s.startTime}-{s.endTime}
                                                            </p>
                                                            <p>
                                                                EWT -{' '}
                                                                {s.services.reduce(
                                                                    (total, service) => total + service.barberServiceEWT,
                                                                    0
                                                                )}{' '}
                                                                mins
                                                            </p>
                                                        </div>
                                                        <button className={style.edit_app_btn}
                                                            onClick={() => {
                                                                setModalData(s)
                                                                setOpenModal(true)
                                                                setSubject("")
                                                                setBody("")
                                                            }}

                                                        >delete</button>
                                                    </div>
                                                )
                                            })
                                        }

                                    </main>
                                </main>
                            )
                        })
                    ) : (
                        <div style={{
                            display: "grid", placeItems: "center", width: "100%", fontSize: "var(--font-size-3)",
                            fontWeight: "500"
                        }}><p>No Appointment available</p></div>
                    )
                }

            </div>

            <Modal
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                    setModalData({})
                    setSubject("")
                    setBody("")
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
                    <div>
                        <p>Cancel Appointment</p>
                        <button onClick={() => {
                            setOpenModal(false)
                            setModalData({})
                            setSubject("")
                            setBody("")
                        }}><CloseIcon /></button>
                    </div>

                    <div className={`${style.modal_content_container} ${darkmodeOn && style.dark}`}>
                        <p>Appointment Date: {modalData.appointmentDate}</p>
                        <p>Customer Name: {modalData.customerName}</p>
                        <p>Customer Email: {modalData.customerEmail}</p>
                        <p>Time: {modalData.startTime} - {modalData.endTime}</p>

                        <p>Reason for cancelling appointment</p>
                        <div>
                            <p>Subject</p>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <div>
                            <p>Body</p>
                            <textarea name="" id=""
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>
                        </div>
                        <button className={style.cancel_btn} onClick={CancelHandler}>Cancel</button>
                    </div>
                </div>

            </Modal>


            <Modal
                open={cancelAllModalOpen}
                onClose={() => {
                    setCancelAllModalOpen(false)
                    setSubject("")
                    setBody("")
                    setCancelAllAppoint({})
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
                    <div>
                        <p>Cancel Appointment</p>
                        <button onClick={() => {
                            setCancelAllModalOpen(false)
                            setSubject("")
                            setBody("")
                            setCancelAllAppoint({})
                        }}><CloseIcon /></button>
                    </div>

                    <div className={`${style.modal_content_container} ${darkmodeOn && style.dark}`}>
                        <p style={{
                            fontWeight: 600,
                            marginBottom: "2rem"
                        }}>All appointments scheduled for <span style={{ textDecoration: "underline" }}>{cancelAllAppoint.appointmentDate}</span> have been selected for cancellation.</p>

                        <p>Reason for cancelling appointment</p>
                        <div>
                            <p>Subject</p>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <div>
                            <p>Body</p>
                            <textarea name="" id=""
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            ></textarea>
                        </div>
                        <button className={style.cancel_btn} onClick={CancelAllHandler}>Cancel</button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default AppointmentList