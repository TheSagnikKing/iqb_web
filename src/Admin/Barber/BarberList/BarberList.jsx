import React, { useEffect, useRef, useState } from 'react'
import style from "./BarberList.module.css"

import { useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon, EmailIcon, Notificationicon, MessageIcon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { adminApproveBarberAction, adminDeleteBarberAction, changeAdminBarberClockStatusAction, changeAdminBarberOnlineStatusAction, getAdminBarberListAction } from '../../../Redux/Admin/Actions/BarberAction'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import toast from 'react-hot-toast'

import Modal from '@mui/material/Modal';
import { Box, Button, Typography } from '@mui/material'

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

  const [checkMap, setCheckMap] = useState(new Map());

  const [checkMapClock, setCheckMapClock] = useState(new Map())

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
      isOnline: !checkMap.get(`${b.salonId}-${b.barberId}`) || false
    };

    dispatch(changeAdminBarberOnlineStatusAction(barberOnlineData, setCheckMap, b, checkMap.get(`${b.salonId}-${b.barberId}`)));
  }

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
      isClockedIn: !checkMapClock.get(`${b.salonId}-${b.barberId}`) || false
    };

    dispatch(changeAdminBarberClockStatusAction(barberClockData, setCheckMapClock, b, checkMapClock.get(`${b.salonId}-${b.barberId}`), setCheckMap));
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
      isApproved: !approveBarberMap.get(`${b.salonId}-${b.email}`) || false
    };

    dispatch(adminApproveBarberAction(approvedata, setApproveBarberMap, b, approveBarberMap.get(`${b.salonId}-${b.email}`)))
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
      // setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, barber.mobileNumber])
      setCheckMobileNumber(prevMobileNumbers => [...prevMobileNumbers, Number(`${barber.mobileCountryCode}${barber.mobileNumber}`)]);
      setCheckBarberNames(prevNames => [...prevNames, barber.name])
      setCheckAllBarbers(false)
    } else {
      setCheckedEmails(prevEmails => prevEmails.filter(email => email !== barber.email));
      // setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== barber.mobileNumber))
      setCheckMobileNumber(prevMobileNumbers => prevMobileNumbers.filter(mobileNumber => mobileNumber !== Number(`${barber.mobileCountryCode}${barber.mobileNumber}`)));
      setCheckBarberNames(prevNames => prevNames.filter(name => name !== barber.name))
      setCheckAllBarbers(false)
    }
  };

  const checkAllBarbersHandler = (e) => {
    setCheckAllBarbers((prev) => {
      if (!prev) {
        const barberEmails = BarberList.map((b) => b.email)
        // const barberMobileNumbers = BarberList.map((b) => b.mobileNumber)
        const barberMobileNumbers = BarberList.map((b) => Number(`${b.mobileCountryCode}${b.mobileNumber}`));
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

  console.log(checkedEmails)
  console.log(checkMobileNumbers)

  const sendEmailNavigate = () => {
    if (checkedEmails.length > 0) {
      // navigate("/admin-barber/send-email", { state: checkedEmails })
    } else {
      toast.error("Atleast one customer needed", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

  }

  const sendMessageNavigate = () => {
    if (checkMobileNumbers.length > 0) {
      navigate("/admin-barber/send-message", {
        state: {
          checkMobileNumbers,
          checkBarberNames
        }
      })
    } else {
      toast.error("Atleast one customer needed", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }

  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={`${style.admin_barber_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Barber List</p>
        <div>
          <button className={`${style.barber_send_btn} ${darkmodeOn && style.dark}`} onClick={sendEmailNavigate}>
            <div><EmailIcon /></div>
          </button>

          <button className={`${style.barber_send_btn} ${darkmodeOn && style.dark}`} onClick={sendMessageNavigate}>
            <div><MessageIcon /></div>
          </button>

          <button onClick={createbarberClicked} className={`${style.create_barber_btn}`}>
            <p>Create</p>
            <div>+</div>
          </button>
        </div>
      </div>

      <div className={`${style.admin_barber_content_wrapper} ${darkmodeOn && style.dark}`}>
        {
          getAdminBarberListLoading && !getAdminBarberListResolve ? (
            <div className={style.admin_barber_content_body}>
              <Skeleton count={6} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
            </div>
          ) : !getAdminBarberListLoading && getAdminBarberListResolve && BarberList?.length > 0 ? (
            <div className={`${style.admin_barber_content_body} ${darkmodeOn && style.dark}`}>
              <div>
                <div>
                  <input
                    type="checkbox"
                    onChange={checkAllBarbersHandler}
                    checked={checkAllBarbers}
                  />
                </div>
                <p>Barber Name</p>
                <p>Email</p>
                <p>isOnline</p>
                <p>isClockIn</p>
                <p>isApprove</p>
                <p>Edit</p>
                <p>Delete</p>
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
                  <p>{b.name}</p>
                  <p>{b.email}</p>

                  <div>
                    <button
                      onClick={() => toggleHandler(b)}
                      className={checkMap.get(`${b.salonId}-${b.barberId}`) ? style.barber_online_btn_active : style.barber_online_btn_inactive}
                    >{checkMap.get(`${b.salonId}-${b.barberId}`) ? "Online" : "Offline"}</button>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleClockHandler(b)}
                      className={checkMapClock.get(`${b.salonId}-${b.barberId}`) ? style.barber_clock_btn_active : style.barber_clock_btn_inactive}
                    >{checkMapClock.get(`${b.salonId}-${b.barberId}`) ? "Clock-In" : "Clock-Out"}</button>
                  </div>

                  <div>
                    <button
                      onClick={() => approveHandler(b)}
                      className={approveBarberMap.get(`${b.salonId}-${b.email}`) ? style.barber_approve_btn_active : style.barber_approve_btn_inactive}
                      disabled={adminApproveBarberLoading ? true : false}
                    >{approveBarberMap.get(`${b.salonId}-${b.email}`) ? "Approved" : "Approve"}</button>
                  </div>

                  <div><button onClick={() => editButtonClicked(b)}>Edit</button></div>
                  <div><button onClick={() => deleteButtonClicked(b)}>Delete</button></div>

                </div>
              ))}

            </div>
          ) : !getAdminBarberListLoading && getAdminBarberListResolve && BarberList?.length == 0 ? (
            <div className={`${style.barber_content_body_error} ${darkmodeOn && style.dark}`}>
              <p style={{ margin: "2rem" }}>Barbers not available</p>
            </div>
          ) : (
            !getAdminBarberListLoading && !getAdminBarberListResolve && (
              <div className={`${style.barber_content_body_error} ${darkmodeOn && style.dark}`}>
                <p style={{ margin: "2rem" }}>Barbers not available</p>
              </div>
            )
          )
        }
      </div>

      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>

    </div>
  )
}

export default BarberList