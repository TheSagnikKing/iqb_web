import React, { useEffect, useRef, useState } from 'react'
import style from "./SalonList.module.css"
import { CloseIcon } from '../../../icons'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteSalonAction, adminUpdateSalonSettingsAction, getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'
import toast from 'react-hot-toast'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader'
import { ClickAwayListener, Modal } from '@mui/material'

const SalonList = () => {

  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createSalonClicked = () => {
    dispatch({
      type: "ADMIN_CREATE_SALON_SUCCESS",
    })
    navigate("/admin-salon/createsalon")
  }

  const SalonListControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    SalonListControllerRef.current = controller;

    dispatch(getAdminSalonListAction(email, controller.signal));

    return () => {
      if (SalonListControllerRef.current) {
        SalonListControllerRef.current.abort();
      }
    };
  }, [email, dispatch]);

  const getAdminSalonList = useSelector(state => state.getAdminSalonList)

  const {
    loading: getAdminSalonListLoading,
    resolve: getAdminSalonListResolve,
    salons: SalonList
  } = getAdminSalonList


  const editButtonClicked = (salon) => {
    navigate(`/admin-salon/editsalon/${salon?.salonId}`, { state: salon })
  }

  const deleteSalonHandler = (salonId, id) => {
    if (currentsalonId == salonId) {
      toast.error("You are currently in this salon", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-8)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      const confirm = window.confirm("Are you sure ?")
      if (confirm) {
        dispatch(adminDeleteSalonAction(salonId, id))
      }
    }
  }



  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  const [openSalonSettings, setOpenSalonSettings] = useState(false)

  const [selectedSalonId, setSelectedSalonId] = useState(null)

  const salonappointmentClicked = (salon) => {
    setSelectedSalonId(salon?.salonId)
    setStartTime(salon?.appointmentSettings?.appointmentStartTime)
    setEndTime(salon?.appointmentSettings?.appointmentEndTime)
    setIntervalTime(salon?.appointmentSettings?.intervalInMinutes)
    setOpenSalonSettings(true)
  }

  const [timeOptions, setTimeOptions] = useState([]);

  const addLeadingZero = (num) => (num < 10 ? '0' : '') + num;

  const generateTimeOptions = () => {
    const options = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = addLeadingZero(hour) + ':' + addLeadingZero(minute);
        options.push({ value: time, label: time });
      }
    }

    setTimeOptions(options);
  };

  useEffect(() => {
    generateTimeOptions();
  }, [])



  const [startTime, setStartTime] = useState("")
  const [startTimeDrop, setStartTimeDrop] = useState(false)

  const startTimeDropHandler = () => {
    setStartTimeDrop((prev) => !prev)
  }

  const setStartTimeHandler = (value) => {
    setStartTime(value)
    setStartTimeDrop(false)
  }

  const [endTime, setEndTime] = useState("")
  const [endTimeDrop, setEndTimeDrop] = useState(false)

  const endTimeDropHandler = () => {
    setEndTimeDrop((prev) => !prev)
  }

  const setEndTimeHandler = (value) => {
    setEndTime(value)
    setEndTimeDrop(false)
  }


  const [intervalTimemin, setIntervalTimemin] = useState([])

  const generateTimeIntervalInMinutes = () => {
    const options = []
    for (let i = 1; i <= 60; i++) {
      options.push(i);
    }

    setIntervalTimemin(options)
  }

  useEffect(() => {
    generateTimeIntervalInMinutes()
  }, [])

  const [intervalTime, setIntervalTime] = useState("")
  const [intervalTimeDrop, setIntervalTimeDrop] = useState(false)

  const intervalTimeDropHandler = () => {
    setIntervalTimeDrop((prev) => !prev)
  }

  const setIntervalTimeHandler = (value) => {
    setIntervalTime(value)
    setIntervalTimeDrop(false)
  }

  const updateSalonAppointment = () => {
    const appointmentdata = {
      salonId: selectedSalonId,
      appointmentSettings: {
        startTime,
        endTime,
        intervalInMinutes: intervalTime
      }
    }

    dispatch(adminUpdateSalonSettingsAction(appointmentdata, setOpenSalonSettings, email))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateSalonAppointment();
    }
  };

  const adminUpdateSalonSettings = useSelector(state => state.adminUpdateSalonSettings)

  const {
    loading: adminUpdateSalonSettingsLoading,
  } = adminUpdateSalonSettings

  return (
    <div className={`${style.salon_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Salon List</p>
        <button onClick={createSalonClicked}>
          <p>Create</p>
          <div>+</div>
        </button>
      </div>

      <div className={`${style.salon_content_wrapper} ${darkmodeOn && style.dark}`}>

        {
          getAdminSalonListLoading ? (
            <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>
              <Skeleton
                count={6}
                height={"6rem"}
                baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                style={{ marginBottom: "1rem" }} />
            </div>
          ) : getAdminSalonListResolve && SalonList?.length > 0 ? (
            <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>
              <div>
                <p>Salon Name</p>
                <p>Address</p>
                <p>City</p>
                <p>Salon Type</p>
                <p>Edit</p>
                {/* <p>Delete</p> */}
                <p>Setting</p>
              </div>

              {SalonList.map((s, index) => (
                <div key={s?._id}
                  style={{
                    borderBottom: SalonList.length - 1 === index && "none"
                  }}
                >
                  <p>{s?.salonName.length > 18 ? s?.salonName.slice(0, 18) + "..." : s?.salonName}</p>
                  <p>{s?.address.length > 18 ? s?.address.slice(0, 18) + "..." : s?.address}</p>
                  <p>{s?.city.length > 18 ? s?.city.slice(0, 18) + "..." : s?.city}</p>
                  <p>{s?.salonType}</p>
                  <div>
                    <button onClick={() => editButtonClicked(s)}>Edit</button>
                  </div>
                  {/* <div>
                    <button onClick={() => deleteSalonHandler(s.salonId, s._id)}>Delete</button>
                  </div> */}
                  <div>
                    <button onClick={() => salonappointmentClicked(s)}>Setting</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${style.salon_content_body_error} ${darkmodeOn && style.dark}`}>
              <p>No salon available</p>
            </div>
          )
        }


        <Modal
          open={openSalonSettings}
          onClose={() => {
            setEndTimeHandler(false)
            setStartTimeHandler(false)
            setIntervalTimeHandler(false)
            setOpenSalonSettings(false)
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
            <div>
              <p> Appointment Settings</p>
              <button onClick={() => setOpenSalonSettings(false)}><CloseIcon /></button>
            </div>

            <div className={style.modal_content_container}>
              <div className={style.time_container}>
                <p>Start Time</p>
                <input
                  type="text"
                  value={`${startTime ? `${startTime} hr` : ''}`}
                  onClick={() => startTimeDropHandler()}
                  onKeyDown={handleKeyPress}
                  readOnly
                />

                {startTimeDrop && (
                  <ClickAwayListener onClickAway={() => setStartTimeDrop(false)}>
                    <div className={`${style.time_drop_container} ${darkmodeOn && style.dark}`}>
                      {timeOptions.map((option) => (
                        <p key={option.value} onClick={() => setStartTimeHandler(option.value)}>
                          {option.value} hr
                        </p>
                      ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>


              <div className={style.time_container}>
                <p>End Time</p>
                <input
                  type="text"
                  value={`${endTime ? `${endTime} hr` : ''}`}
                  onClick={() => endTimeDropHandler()}
                  onKeyDown={handleKeyPress}
                  readOnly
                />

                {endTimeDrop && (
                  <ClickAwayListener onClickAway={() => setEndTimeHandler(false)}>
                    <div className={`${style.time_drop_container} ${darkmodeOn && style.dark}`}>
                      {timeOptions.map((option) => (
                        <p key={option.value} onClick={() => setEndTimeHandler(option.value)}>
                          {option.value} hr
                        </p>
                      ))}
                    </div>
                  </ClickAwayListener>
                )}
              </div>


              <div className={style.time_container}>
                <p>Interval Time</p>
                <input
                  type="text"
                  value={`${intervalTime ? `${intervalTime} mins` : ''}`}
                  onClick={() => intervalTimeDropHandler()}
                  onKeyDown={handleKeyPress}
                  readOnly
                />

                {intervalTimeDrop &&
                  <ClickAwayListener onClickAway={() => setIntervalTimeHandler(false)}>
                    <div className={`${style.time_drop_container} ${darkmodeOn && style.dark}`}>
                      {intervalTimemin.map((option) => (
                        <p key={option} value={option} onClick={() => setIntervalTimeHandler(option)}>
                          {option} mins
                        </p>
                      ))}
                    </div>
                  </ClickAwayListener>}
              </div>

              {
                adminUpdateSalonSettingsLoading ? <button className={style.salon_settings_btn}><ButtonLoader /></button> : <button className={style.salon_settings_btn} onClick={updateSalonAppointment}>Update</button>
              }

            </div>
          </div>
        </Modal>

      </div>

    </div>
  )
}

export default SalonList