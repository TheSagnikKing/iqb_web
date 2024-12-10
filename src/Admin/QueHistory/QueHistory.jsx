import React, { useEffect, useRef, useState } from 'react'
import style from "./QueHistory.module.css"
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { CheckIcon, CloseIcon, CrownIcon, SearchIcon } from '../../icons'
import { getAdminQueueListHistoryAction } from '../../Redux/Admin/Actions/QueueAction'

const QueHistory = () => {

    const darkMode = useSelector(darkmodeSelector)

    const darkmodeOn = darkMode === "On"

    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

    const dispatch = useDispatch()

    const queuelistcontrollerRef = useRef(new AbortController());

    useEffect(() => {
        const controller = new AbortController();
        queuelistcontrollerRef.current = controller;

        dispatch(getAdminQueueListHistoryAction(salonId, controller.signal));

        return () => {
            if (queuelistcontrollerRef.current) {
                queuelistcontrollerRef.current.abort();
            }
        };
    }, [salonId, dispatch]);


    const getAdminQueueListHistory = useSelector(state => state.getAdminQueueListHistory)

    const {
        loading: getAdminQueueListHistoryLoading,
        resolve: getAdminQueueListHistoryResolve,
        queueListHistory: AdminQueueListHistory
    } = getAdminQueueListHistory

    const [copyAdminQueueHistory, setCopyAdminQueueHistory] = useState([])

    useEffect(() => {
        if (AdminQueueListHistory) {
            setCopyAdminQueueHistory(AdminQueueListHistory)
        }
    }, [AdminQueueListHistory])

    const [search, setSearch] = useState('')

    const searchCustomHandler = (value) => {
        setSearch(value);
        const searchValue = value.toLowerCase().trim();

        if (!searchValue) {
            setCopyAdminQueueHistory(AdminQueueListHistory);
        } else {
            const filteredArray = AdminQueueListHistory?.filter((queue) => {
                return (
                    queue.barberName.toLowerCase().includes(searchValue) ||
                    queue.customerName.toLowerCase().includes(searchValue)
                )
            });
            setCopyAdminQueueHistory(filteredArray);
        }
    };

    return (
        <div className={`${style.quehistory_wrapper}`}>
            <div>
                <p>Queue History</p>

                <div className={`${style.customer_search} ${darkmodeOn && style.dark}`}>
                    <input
                        type="text"
                        placeholder='Search Queue'
                        value={search}
                        onChange={(e) => searchCustomHandler(e.target.value)}
                    />

                    <div><SearchIcon /></div>
                </div>

            </div>

            <div className={`${style.quehistory_wrapper_content}`}>

                {
                    getAdminQueueListHistoryLoading ? (<div className={style.quehistory_wrapper_content_body}>
                        <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                            highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
                    </div>) :
                        getAdminQueueListHistoryResolve && copyAdminQueueHistory?.length > 0 ? (
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
                                        <div><p>isAdmin</p></div>
                                        <div><p>Status</p></div>
                                    </div>

                                    {copyAdminQueueHistory?.map((b, index) => (
                                        <div
                                            className={`${style.barber_queue_history_content_body_item} ${darkmodeOn && style.dark}`}
                                            key={b?._id}
                                            style={{
                                                borderBottom: copyAdminQueueHistory.length - 1 === index && "none"
                                            }}
                                        >
                                            <p>{b?.qPosition}</p>
                                            <p>{b?.customerName}</p>
                                            <p>{b?.barberName}</p>
                                            <p>{b?.timeJoinedQ}</p>
                                            <div><p>{b?.qgCode}</p></div>
                                            <div><p>{b?.serviceEWT}</p></div>
                                            <div><p>{b?.serviceType === "Regular" ? "-" : <CrownIcon />}</p></div>
                                            <div>
                                                {
                                                    b?.isAdmin ? (<p style={{ color: "green" }}><CheckIcon /></p>) : (<p style={{ fontSize: "2rem", fontWeight: "700", color: "red" }}><CloseIcon /></p>)
                                                }
                                            </div>
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