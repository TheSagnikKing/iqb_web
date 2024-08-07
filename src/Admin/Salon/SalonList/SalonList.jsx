import React, { useEffect, useRef, useState } from 'react'
import "./SalonList.css"
import { DeleteIcon, EditIcon, Settingsicon } from '../../../icons'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteSalonAction, getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'
import toast from 'react-hot-toast'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

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
          fontSize: "1.4rem",
          borderRadius: '10px',
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

  const salonappointmentClicked = (salon) => {
    navigate(`/admin-salon/appointment/${salon?.salonId}`, { state: salon })
  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <div className={`salon_wrapper ${darkmodeOn && "dark"}`}>
      <div>
        <p>Salon List</p>
        <button onClick={createSalonClicked}>
          <p>Create</p>
          <div>+</div>
        </button>
      </div>

      <div className={`salon_content_wrapper ${darkmodeOn && "dark"}`}>

        {
          getAdminSalonListLoading && !getAdminSalonListResolve ? (
            <div className={`salon_content_body ${darkmodeOn && "dark"}`}>
              <Skeleton
                count={9}
                height={"6rem"}
                baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                style={{ marginBottom: "1rem" }} />
            </div>
          ) : !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ? (
            <div className={`salon_content_body ${darkmodeOn && "dark"}`}>
              <div>
                <p>Salon Name</p>
                <p>Address</p>
                <p>City</p>
                <p>Salon Type</p>
              </div>

              {SalonList.map((s) => (
                <div key={s?._id}>
                  <p>{s?.salonName}</p>
                  <p>{s?.address}</p>
                  <p>{s?.city}</p>
                  <p>{s?.salonType}</p>
                  <div>
                    <div onClick={() => editButtonClicked(s)}><EditIcon /></div>
                  </div>
                  <div>
                    <div onClick={() => deleteSalonHandler(s.salonId, s._id)}><DeleteIcon /></div>
                  </div>
                  <div>
                    <div onClick={() => salonappointmentClicked(s)}><Settingsicon /></div>
                  </div>
                </div>
              ))}
            </div>
          ) : !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ? (
            <div className={`salon_content_body_error ${darkmodeOn && "dark"}`}>
              <p style={{ margin: "2rem" }}>Salons not available</p>
            </div>
          ) : (
            !getAdminSalonListLoading && !getAdminSalonListResolve && (
              <div className={`salon_content_body_error ${darkmodeOn && "dark"}`}>
                <p style={{ margin: "2rem" }}>Salon not available</p>
              </div>
            )
          )
        }
      </div>

    </div>
  )
}

export default SalonList