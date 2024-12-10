import React, { useEffect, useRef } from 'react'
import style from "./QueHistory.module.css"
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { CrownIcon } from '../../icons'
import { getBarberQueueListHistoryAction } from '../../Redux/Barber/Actions/BarberQueueAction'

const QueHistory = () => {

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"


    const salonId = useSelector(state => state.BarberLoggedInMiddleware.barberSalonId)
    const barberId = useSelector(state => state.BarberLoggedInMiddleware.barberId)

    const dispatch = useDispatch()

    const queuelistcontrollerRef = useRef(new AbortController());

    useEffect(() => {
        const controller = new AbortController();
        queuelistcontrollerRef.current = controller;

        dispatch(getBarberQueueListHistoryAction(salonId, barberId, controller.signal));

        return () => {
            if (queuelistcontrollerRef.current) {
                queuelistcontrollerRef.current.abort();
            }
        };
    }, [salonId, barberId, dispatch]);


    const getBarberQueueListHistory = useSelector(state => state.getBarberQueueListHistory)

    const {
        loading: getBarberQueueListHistoryLoading,
        resolve: getBarberQueueListHistoryResolve,
        queueListHistory: BarberQueueListHistory
    } = getBarberQueueListHistory

    return (
        <div className={`${style.quehistory_wrapper}`}>
            <div>
                <p>Queue History</p>
            </div>

            <div className={`${style.quehistory_wrapper_content}`}>

                {
                    getBarberQueueListHistoryLoading ? (<div className={style.quehistory_wrapper_content_body}>
                        <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                            highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    </div>) :
                        getBarberQueueListHistoryResolve && BarberQueueListHistory?.length > 0 ? (
                            <>
                                <div className={`${style.quehistory_wrapper_content_body} ${darkmodeOn && style.dark}`}>
                                    <div>
                                        <p>#</p>
                                        <p>Name</p>
                                        <p>Barber Name</p>
                                        <p>Time Joined Q</p>
                                        <div><p>Qg Code</p></div>
                                        <div><p>EWT</p></div>
                                        <div><p>Type</p></div>
                                        <div><p>Status</p></div>
                                    </div>

                                    {BarberQueueListHistory?.map((b, index) => (
                                        <div
                                            className={`${style.barber_queue_history_content_body_item} ${darkmodeOn && style.dark}`}
                                            key={b?._id}
                                            style={{
                                                borderBottom: BarberQueueListHistory.length - 1 === index && "none"
                                            }}
                                        >
                                            <p>{b?.qPosition}</p>
                                            <p>{b?.customerName}</p>
                                            <p>{b?.barberName}</p>
                                            <p>{b?.timeJoinedQ}</p>
                                            <div><p>{b?.qgCode}</p></div>
                                            <div><p>{b?.serviceEWT}</p></div>
                                            <div><p>{b?.serviceType === "Regular" ? "-" : <CrownIcon />}</p></div>
                                            <div><p style={{ color: b?.status == "served" ? "green" : "red" }}>{b?.status}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className={`${style.quehistory_wrapper_content_body_error} ${darkmodeOn && style.dark}`}>
                                <p>No Queue history available</p>
                            </div>
                        )
                }


            </div>
        </div>
    )
}

export default QueHistory