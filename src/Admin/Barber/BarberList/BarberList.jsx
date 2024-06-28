import React, { useEffect, useRef, useState } from 'react'
import "./BarberList.css"

import { useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon, EmailIcon, Notificationicon } from '../../../icons'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { adminApproveBarberAction, adminDeleteBarberAction, changeAdminBarberClockStatusAction, changeAdminBarberOnlineStatusAction, getAdminBarberListAction } from '../../../Redux/Admin/Actions/BarberAction'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

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

  const barberEmailCheckedHandler = (barber) => {
    const isChecked = !checkedBarbers[barber._id];
    setCheckedBarbers(prevState => ({
      ...prevState,
      [barber._id]: isChecked,
    }));

    if (isChecked) {
      setCheckedEmails(prevEmails => [...prevEmails, barber.email]);
    } else {
      setCheckedEmails(prevEmails => prevEmails.filter(email => email !== barber.email));
    }
  };

  const checkAllBarbersHandler = (e) => {
    setCheckAllBarbers((prev) => {
      if (!prev) {
        const barberEmails = BarberList.map((b) => b.email)
        const allCheckedBarbers = BarberList.reduce((acc, barber) => {
          acc[barber._id] = true;
          return acc;
        }, {});
        setCheckedEmails(barberEmails)
        setCheckedBarbers(allCheckedBarbers);
      } else {
        setCheckedEmails([])
        setCheckedBarbers({});
      }

      return !prev
    })
  }


  const sendEmailNavigate = () => {
    navigate("/admin-barber/send-email", {state:checkedEmails})
  }

  return (
    <div className={`admin_barber_wrapper ${darkmodeOn && "dark"}`}>
      <div>
        <p>Barber List</p>
        <div>
          <button onClick={sendEmailNavigate}>
            <div><EmailIcon /></div>
          </button>

          <button onClick={() => { }}>
            <div><Notificationicon /></div>
          </button>

          <button onClick={createbarberClicked}>
            <p>Create</p>
            <div>+</div>
          </button>
        </div>
      </div>

      <div className={`admin_barber_content_wrapper ${darkmodeOn && "dark"}`}>
        {
          getAdminBarberListLoading && !getAdminBarberListResolve ? (
            <div className='admin_barber_content_body'>
              <Skeleton count={9} height={"6rem"} style={{ marginBottom: "1rem" }} baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"} />
            </div>
          ) : !getAdminBarberListLoading && getAdminBarberListResolve && BarberList?.length > 0 ? (
            <div className={`admin_barber_content_body ${darkmodeOn && "dark"}`}>
              <div>
                <input
                  type="checkbox"
                  style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
                  onChange={checkAllBarbersHandler}
                  checked={checkAllBarbers}

                />
                <p>Barber Name</p>
                <p>Email</p>
                <p>isOnline</p>
                <p>isClockIn</p>
              </div>

              {BarberList.map((b) => (
                <div className='admin_barber_content_body_item' key={b._id}>
                  <input
                    type="checkbox"
                    style={{ accentColor: "red", height: "1.6rem", width: "1.6rem" }}
                    checked={checkedBarbers[b._id] || false}
                    onChange={() => barberEmailCheckedHandler(b)}
                  />
                  <p>{b.name}</p>
                  <p>{b.email}</p>
                  <div>
                    <div
                      style={{
                        background: checkMap.get(`${b.salonId}-${b.barberId}`) ? "limegreen" : "red",
                        border: darkmodeOn ? "1px solid #fff" : "1px solid #000"
                      }}
                    >
                      <span className={`barberlist_toggle_btn_text ${checkMap.get(`${b.salonId}-${b.barberId}`) ? 'barberlist_dashboard_toggle_btn_text_active' : 'barberlist_dashboard_toggle_btn_text_inactive'}`}>{checkMap.get(`${b.salonId}-${b.barberId}`) ? "Online" : "Offline"}</span>
                      <button
                        type="checkbox"
                        className={`barberlist_dashboard_toggle_btn ${checkMap.get(`${b.salonId}-${b.barberId}`) ? 'barberlist_dashboard_toggle_active' : 'barberlist_dashboard_toggle_inactive'}`}
                        onClick={() => toggleHandler(b)}
                      ></button>

                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        background: checkMapClock.get(`${b.salonId}-${b.barberId}`) ? "limegreen" : "red",
                        border: darkmodeOn ? "1px solid #fff" : "1px solid #000"
                      }}
                    >
                      <span className={`barberlist_clock_toggle_btn_text ${checkMapClock.get(`${b.salonId}-${b.barberId}`) ? 'barberlist_clock_dashboard_toggle_btn_text_active' : 'barberlist_clock_dashboard_toggle_btn_text_inactive'}`}>{checkMapClock.get(`${b.salonId}-${b.barberId}`) ? "ClockIn" : "ClockOut"}</span>
                      <button
                        type="checkbox"
                        className={`barberlist_clock_dashboard_toggle_btn ${checkMapClock.get(`${b.salonId}-${b.barberId}`) ? 'barberlist_clock_dashboard_toggle_active' : 'barberlist_clock_dashboard_toggle_inactive'}`}
                        onClick={() => toggleClockHandler(b)}
                      ></button>

                    </div>
                  </div>

                  <button
                    style={{
                      background: approveBarberMap.get(`${b.salonId}-${b.email}`) ? "gray" : "white",
                      color: approveBarberMap.get(`${b.salonId}-${b.email}`) ? "#fff" : "#000"
                    }}
                    onClick={() => approveHandler(b)}
                    disabled={adminApproveBarberLoading ? true : false}
                  >
                    {approveBarberMap.get(`${b.salonId}-${b.email}`) ? "Approved" : "Approve"}
                  </button>

                  <div>
                    <div onClick={() => editButtonClicked(b)}><EditIcon /></div>
                  </div>
                  <div>
                    <div onClick={() => deleteButtonClicked(b)}><DeleteIcon /></div>
                  </div>
                </div>
              ))}

            </div>
          ) : !getAdminBarberListLoading && getAdminBarberListResolve && BarberList?.length == 0 ? (
            <div className={`barber_content_body_error ${darkmodeOn && "dark"}`}>
              <p style={{ margin: "2rem" }}>Barbers not available</p>
            </div>
          ) : (
            !getAdminBarberListLoading && !getAdminBarberListResolve && (
              <div className={`barber_content_body_error ${darkmodeOn && "dark"}`}>
                <p style={{ margin: "2rem" }}>Barbers not available</p>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default BarberList