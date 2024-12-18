import React, { useEffect, useRef, useState } from 'react'
import style from "./BarberList.module.css"
import { useNavigate } from 'react-router-dom'
import { EmailIcon, MessageIcon, CloseIcon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { adminApproveBarberAction, adminDeleteBarberAction, adminSendBarberEmailAction, adminSendBarberMessageAction, changeAdminBarberClockStatusAction, changeAdminBarberOnlineStatusAction, getAdminBarberListAction } from '../../../Redux/Admin/Actions/BarberAction'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import toast from 'react-hot-toast'
import { Modal } from '@mui/material';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'

const BarberList = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const getAdminBarberList = useSelector(state => state.getAdminBarberList)

  const {
    loading: getAdminBarberListLoading,
    resolve: getAdminBarberListResolve,
    getAllBarbers: BarberList
  } = getAdminBarberList

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createbarberClicked = () => {
    navigate("/admin-barber/createbarber")
  }

  const editButtonClicked = (barber) => {
    navigate(`/admin-barber/editbarber/${barber.salonId}`, { state: barber })
  }

  const deleteButtonClicked = (barber) => {
    const confirm = window.confirm("Are you sure ?")
    if (confirm) {
      dispatch(adminDeleteBarberAction(barber.salonId, barber.email, barber))
    }
  }

  useEffect(() => {
    if (BarberList && BarberList.length > 0) {
      const initialCheckMap = new Map();
      BarberList.forEach(barber => {
        const key = `${barber.salonId}-${barber.barberId}`;
        initialCheckMap.set(key, barber.isOnline || false);
      });
      setCheckMap(initialCheckMap);

      const initialCheckMapClock = new Map();
      BarberList.forEach(barber => {
        const key = `${barber.salonId}-${barber.barberId}`;
        initialCheckMapClock.set(key, barber.isClockedIn || false);
      });
      setCheckMapClock(initialCheckMapClock);
    }
  }, [BarberList]);

  const [checkMap, setCheckMap] = useState(new Map());

  const toggleHandler = (b) => {
    setCheckMap(prevCheckMap => {
      const newCheckMap = new Map(prevCheckMap);
      const key = `${b.salonId}-${b.barberId}`;
      const newIsOnline = !newCheckMap.get(key) || false; // Toggle the value
      newCheckMap.set(key, newIsOnline);
      return newCheckMap;
    });

    const barberOnlineData = {
      barberId: b.barberId,
      salonId: b.salonId,
      isOnline: !checkMap?.get(`${b.salonId}-${b.barberId}`) || false
    };

    dispatch(changeAdminBarberOnlineStatusAction(barberOnlineData, setCheckMap, b, checkMap?.get(`${b.salonId}-${b.barberId}`)));
  }

  const [checkMapClock, setCheckMapClock] = useState(new Map())

  const toggleClockHandler = (b) => {
    setCheckMapClock(prevCheckMapClock => {
      const newCheckMapClock = new Map(prevCheckMapClock);
      const key = `${b.salonId}-${b.barberId}`;
      const newIsClock = !newCheckMapClock.get(key) || false; // Toggle the value
      newCheckMapClock.set(key, newIsClock);
      return newCheckMapClock;
    });

    const barberClockData = {
      barberId: b.barberId,
      salonId: b.salonId,
      isClockedIn: !checkMapClock?.get(`${b.salonId}-${b.barberId}`) || false
    };

    dispatch(changeAdminBarberClockStatusAction(barberClockData, setCheckMapClock, b, checkMapClock?.get(`${b.salonId}-${b.barberId}`), setCheckMap));
  }


  const BarberListcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    BarberListcontrollerRef.current = controller;

    dispatch(getAdminBarberListAction(salonId, controller.signal));

    return () => {
      if (BarberListcontrollerRef.current) {
        BarberListcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);



  const [approveBarberMap, setApproveBarberMap] = useState(new Map());

  useEffect(() => {
    if (BarberList) {
      const initialCheckMap = new Map();
      BarberList.forEach(barber => {
        const key = `${barber.salonId}-${barber.email}`;
        initialCheckMap.set(key, barber.isApproved || false);
      });
      setApproveBarberMap(initialCheckMap);
    }
  }, [BarberList]);

  const approveHandler = (b) => {

    setApproveBarberMap((prevCheckMap) => {
      const newCheckMap = new Map(prevCheckMap);
      const key = `${b.salonId}-${b.email}`;
      const newIsApprove = !newCheckMap.get(key) || false; // Toggle the value
      newCheckMap.set(key, newIsApprove);
      return newCheckMap;
    });

    const approvedata = {
      salonId: b.salonId,
      email: b.email,
      isApproved: !approveBarberMap?.get(`${b.salonId}-${b.email}`) || false
    };

    dispatch(adminApproveBarberAction(approvedata, setApproveBarberMap, b, approveBarberMap?.get(`${b.salonId}-${b.email}`), setCheckMap, setCheckMapClock))
  }

  const adminApproveBarber = useSelector(state => state.adminApproveBarber)

  const {
    loading: adminApproveBarberLoading,
    resolve: adminApproveBarberResolve,
    response: approvebarber
  } = adminApproveBarber

  const [allCheckbox, setAllCheckbox] = useState(false)

  const selectAllBarbers = () => {
    setAllCheckbox((prev) => {
      const newCheckboxState = !prev;

      if (newCheckboxState) {
        setSelectedAllBarberNotification(BarberList.map((b) => b.email));
      } else {
        setSelectedAllBarberNotification([]);
      }

      return newCheckboxState;
    });
  };

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const [checkAllBarbers, setCheckAllBarbers] = useState(false)
  const [checkedBarbers, setCheckedBarbers] = useState({});
  const [checkedEmails, setCheckedEmails] = useState([]);
  const [checkMobileNumbers, setCheckMobileNumber] = useState([])
  const [checkBarberNames, setCheckBarberNames] = useState([])

  const barberEmailCheckedHandler = (barber) => {
    const isChecked = !checkedBarbers[barber._id];
    setCheckedBarbers(prevState => ({
      ...prevState,
      [barber._id]: isChecked,
    }));

    if (isChecked) {
      setCheckedEmails(prevEmails => [...prevEmails, barber.email]);
      setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, Number(`${barber?.mobileCountryCode}${barber?.mobileNumber}`)]);
      setCheckBarberNames(prevNames => [...prevNames, barber.name])
      setCheckAllBarbers(false)
    } else {
      setCheckedEmails(prevEmails => prevEmails.filter(email => email !== barber.email));
      setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== Number(`${barber?.mobileCountryCode}${barber?.mobileNumber}`)));
      setCheckBarberNames(prevNames => prevNames.filter(name => name !== barber.name))
      setCheckAllBarbers(false)
    }
  };

  const checkAllBarbersHandler = (e) => {
    setCheckAllBarbers((prev) => {
      if (!prev) {
        const barberEmails = BarberList.map((b) => b.email)
        const barberMobileNumbers = BarberList.map((b) => Number(`${b?.mobileCountryCode}${b?.mobileNumber}`));
        const barberNames = BarberList.map((b) => b.name)
        const allCheckedBarbers = BarberList.reduce((acc, barber) => {
          acc[barber._id] = true;
          return acc;
        }, {});
        setCheckedEmails(barberEmails)
        setCheckMobileNumber(barberMobileNumbers)
        setCheckBarberNames(barberNames)
        setCheckedBarbers(allCheckedBarbers);
      } else {
        setCheckedEmails([])
        setCheckMobileNumber([])
        setCheckBarberNames([])
        setCheckedBarbers({});
      }

      return !prev
    })
  }

  // console.log(checkedEmails)
  // console.log(checkMobileNumbers)


  const [openBarberEmail, setOpenBarberEmail] = useState(false)

  const sendEmailNavigate = () => {
    if (checkedEmails.length > 0) {

      setOpenBarberEmail(true)
    } else {
      toast.error("Please select a barber", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    }

  }

  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const sendMailHandler = () => {
    const maildata = {
      subject,
      message,
      role: "Barber",
      recipientEmails: checkedEmails
    }
    dispatch(adminSendBarberEmailAction(maildata, setSubject, setMessage, setOpenBarberEmail))

  }

  const handleKeyPressMail = (e) => {
    if (e.key === "Enter") {
      sendMailHandler();
    }
  };

  const adminSendBarberEmail = useSelector(state => state.adminSendBarberEmail)

  const {
    loading: adminSendBarberEmailLoading
  } = adminSendBarberEmail

  const [openBarberMessage, setOpenBarberMessage] = useState(false)
  const [barberMessage, setBarberMessage] = useState("")

  const sendMessageNavigate = () => {
    if (checkMobileNumbers.length > 0) {
      setOpenBarberMessage(true)
    } else {
      toast.error("Please select a barber", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    }

  }

  const sendMessageHandler = () => {
    const smsdata = {
      smsBody: barberMessage,
      numbers: checkMobileNumbers
    }
    dispatch(adminSendBarberMessageAction(smsdata, setMessage, setOpenBarberMessage))
  }

  const handleKeyPressMessage = (e) => {
    if (e.key === "Enter") {
      sendMessageHandler();
    }
  };

  const adminSendBarberMessage = useSelector(state => state.adminSendBarberMessage)

  const {
    loading: adminSendBarberMessageLoading
  } = adminSendBarberMessage


  return (
    <div className={`${style.admin_barber_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Barber List</p>
        <div>
          <button className={`${style.barber_send_btn} ${darkmodeOn && style.dark}`}
            onClick={sendEmailNavigate}
            title='Email'
            disabled={salonId === 0}
            style={{
              cursor: salonId === 0 ? "not-allowed" : "cursor"
            }}
          >
            <div><EmailIcon /></div>
          </button>

          <Modal
            open={openBarberEmail}
            onClose={() => setOpenBarberEmail(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
              <div>
                <p>Send Email</p>
                <button onClick={() => setOpenBarberEmail(false)}><CloseIcon /></button>
              </div>

              <div className={style.modal_content_container}>
                <div>
                  <p>From</p>
                  <input
                    type="text"
                    value={"support@iqueuebarbers.com"}
                    readOnly
                    onKeyDown={handleKeyPressMail}
                  />
                </div>

                <div>
                  <p>To</p>
                  <input type="text" value={
                    checkedEmails?.map((e) => " " + e)
                  }
                    onKeyDown={handleKeyPressMail}
                  />
                </div>

                <div>
                  <p>Subject</p>
                  <input
                    type="text"
                    placeholder='Enter Subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onKeyDown={handleKeyPressMail}
                  />
                </div>


                <div>
                  <p>Message</p>
                  <textarea
                    type="text"
                    placeholder='Enter Message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPressMail}
                  ></textarea>
                </div>

                {
                  adminSendBarberEmailLoading ?
                    <button className={style.barber_send_btn}><ButtonLoader /></button> :
                    <button onClick={sendMailHandler} disabled={adminSendBarberEmailLoading} className={style.barber_send_btn}>Send</button>
                }
              </div>
            </div>
          </Modal>

          <button
            className={`${style.barber_send_btn} ${darkmodeOn && style.dark}`}
            onClick={sendMessageNavigate}
            disabled={salonId === 0}
            style={{
              cursor: salonId === 0 ? "not-allowed" : "cursor"
            }}
            title='Message'
          >
            <div><MessageIcon /></div>
          </button>


          <Modal
            open={openBarberMessage}
            onClose={() => setOpenBarberMessage(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
              <div>
                <p>Send Message</p>
                <button onClick={() => setOpenBarberMessage(false)}><CloseIcon /></button>
              </div>

              <div className={style.modal_content_container}>
                <div>
                  <p>From</p>
                  <input
                    type="text"
                    value={"iqueuebarbers"}
                    readOnly
                    onKeyDown={handleKeyPressMessage}
                  />
                </div>

                <div>
                  <p>To</p>
                  <input type="text" value={
                    checkBarberNames?.map((e) => " " + e)
                  }
                    onKeyDown={handleKeyPressMessage}
                  />
                </div>

                <div>
                  <p>Message</p>
                  <textarea
                    type="text"
                    placeholder='Enter Message'
                    value={barberMessage}
                    onChange={(e) => setBarberMessage(e.target.value)}
                    onKeyDown={handleKeyPressMessage}
                  ></textarea>
                </div>

                {
                  adminSendBarberMessageLoading ?
                    <button className={style.barber_send_btn}><ButtonLoader /></button> :
                    <button onClick={sendMessageHandler} disabled={adminSendBarberMessageLoading} className={style.barber_send_btn}>Send</button>
                }
              </div>
            </div>
          </Modal>

          <button onClick={createbarberClicked} className={`${style.create_barber_btn}`}
            disabled={salonId === 0}
            style={{
              cursor: salonId === 0 ? "not-allowed" : "cursor"
            }}
          >
            <p>Create</p>
            <div>+</div>
          </button>
        </div>
      </div>

      <div className={`${style.admin_barber_content_wrapper} ${darkmodeOn && style.dark}`}>
        {
          getAdminBarberListLoading ? (
            <div className={style.admin_barber_content_body}>
              <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} 
              baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
              highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"} />
            </div>
          ) : getAdminBarberListResolve && BarberList?.length > 0 ? (
            <div className={`${style.admin_barber_content_body} ${darkmodeOn && style.dark}`}>
              <div>
                <div>
                  <input
                    type="checkbox"
                    onChange={checkAllBarbersHandler}
                    checked={checkAllBarbers}
                  />
                </div>
                <p>Name</p>
                <p>Email</p>
                <div><p>isOnline</p></div>
                <div><p>isClockIn</p></div>
                <div><p>isApprove</p></div>
                <div><p>Edit</p></div>
                {/* <p>Delete</p> */}
              </div>

              {BarberList?.map((b, index) => (
                <div className={style.admin_barber_content_body_item}
                  key={b._id}
                  style={{
                    borderBottom: BarberList?.length - 1 === index && "none"
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={checkedBarbers[b._id] || false}
                      onChange={() => barberEmailCheckedHandler(b)}
                    />
                  </div>

                  <p>{b?.name.length > 18 ? b?.name.slice(0, 18) + "..." : b?.name}</p>
                  <p>{b?.email.length > 18 ? b?.email.slice(0, 18) + "..." : b?.email}</p>

                  <div>
                    <button
                      onClick={() => toggleHandler(b)}
                      className={checkMap?.get(`${b.salonId}-${b.barberId}`) ? style.barber_online_btn_active : style.barber_online_btn_inactive}
                    >{checkMap?.get(`${b.salonId}-${b.barberId}`) ? "Online" : "Offline"}</button>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleClockHandler(b)}
                      className={checkMapClock?.get(`${b.salonId}-${b.barberId}`) ? style.barber_clock_btn_active : style.barber_clock_btn_inactive}
                    >{checkMapClock?.get(`${b.salonId}-${b.barberId}`) ? "Clock-In" : "Clock-Out"}</button>
                  </div>

                  <div>
                    <button
                      onClick={() => approveHandler(b)}
                      className={approveBarberMap?.get(`${b.salonId}-${b.email}`) ? style.barber_approve_btn_active : style.barber_approve_btn_inactive}
                      disabled={adminApproveBarberLoading ? true : false}
                    >{approveBarberMap?.get(`${b.salonId}-${b.email}`) ? "Approved" : "Approve"}</button>
                  </div>

                  <div><button onClick={() => editButtonClicked(b)}
                    disabled={approveBarberMap?.get(`${b.salonId}-${b.email}`) === false}
                    style={{
                      cursor: approveBarberMap?.get(`${b.salonId}-${b.email}`) === false && "not-allowed"
                    }}
                  >Edit</button></div>
                  {/* <div><button onClick={() => deleteButtonClicked(b)}>Delete</button></div> */}

                </div>
              ))}

            </div>
          ) : (<div className={`${style.barber_content_body_error} ${darkmodeOn && style.dark}`}>
            <p>Barbers not available</p>
          </div>)
        }
      </div>

    </div>
  )
}

export default BarberList