// import React, { useEffect, useRef, useState } from 'react'
// import style from "./SalonList.module.css"
// import { DeleteIcon, EditIcon, Settingsicon } from '../../../icons'
// import { useNavigate } from 'react-router-dom'
// import Skeleton from 'react-loading-skeleton'
// import { useDispatch, useSelector } from 'react-redux'
// import { adminDeleteSalonAction, getAdminSalonListAction } from '../../../Redux/Admin/Actions/SalonAction'
// import toast from 'react-hot-toast'
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

// const SalonList = () => {

//   const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
//   const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const createSalonClicked = () => {
//     dispatch({
//       type: "ADMIN_CREATE_SALON_SUCCESS",
//     })
//     navigate("/admin-salon/createsalon")
//   }

//   const SalonListControllerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     SalonListControllerRef.current = controller;

//     dispatch(getAdminSalonListAction(email, controller.signal));

//     return () => {
//       if (SalonListControllerRef.current) {
//         SalonListControllerRef.current.abort();
//       }
//     };
//   }, [email, dispatch]);

//   const getAdminSalonList = useSelector(state => state.getAdminSalonList)

//   const {
//     loading: getAdminSalonListLoading,
//     resolve: getAdminSalonListResolve,
//     salons: SalonList
//   } = getAdminSalonList


//   const editButtonClicked = (salon) => {
//     navigate(`/admin-salon/editsalon/${salon?.salonId}`, { state: salon })
//   }

//   const deleteSalonHandler = (salonId, id) => {
//     if (currentsalonId == salonId) {
//       toast.error("You are currently in this salon", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } else {
//       const confirm = window.confirm("Are you sure ?")
//       if (confirm) {
//         dispatch(adminDeleteSalonAction(salonId, id))
//       }
//     }
//   }

//   const salonappointmentClicked = (salon) => {
//     navigate(`/admin-salon/appointment/${salon?.salonId}`, { state: salon })
//   }

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   return (
//     <div className={`${style.salon_wrapper} ${darkmodeOn && style.dark}`}>
//       <div>
//         <p>Salon List</p>
//         <button onClick={createSalonClicked}>
//           <p>Create</p>
//           <div>+</div>
//         </button>
//       </div>

//       <div className={`${style.salon_content_wrapper} ${darkmodeOn && style.dark}`}>

//         {
//           getAdminSalonListLoading && !getAdminSalonListResolve ? (
//             <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>
//               <Skeleton
//                 count={9}
//                 height={"6rem"}
//                 baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                 highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                 style={{ marginBottom: "1rem" }} />
//             </div>
//           ) : !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ? (
//             <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>
//               <div>
//                 <p>Salon Name</p>
//                 <p>Address</p>
//                 <p>City</p>
//                 <p>Salon Type</p>
//                 <p>Edit</p>
//                 <p>Delete</p>
//                 <p>Setting</p>
//               </div>

//               {SalonList.map((s) => (
//                 <div key={s?._id}>
//                   <p>{s?.salonName}</p>
//                   <p>{s?.address}</p>
//                   <p>{s?.city}</p>
//                   <p>{s?.salonType}</p>
//                   <div>
//                     <button onClick={() => editButtonClicked(s)}>Edit</button>
//                   </div>
//                   <div>
//                     <button onClick={() => deleteSalonHandler(s.salonId, s._id)}>Delete</button>
//                   </div>
//                   <div>
//                     <button onClick={() => salonappointmentClicked(s)}>Setting</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ? (
//             <div className={`${style.salon_content_body_error} ${darkmodeOn && style.dark}`}>
//               <p style={{ margin: "2rem" }}>Salons not available</p>
//             </div>
//           ) : (
//             !getAdminSalonListLoading && !getAdminSalonListResolve && (
//               <div className={`${style.salon_content_body_error} ${darkmodeOn && style.dark}`}>
//                 <p style={{ margin: "2rem" }}>Salon not available</p>
//               </div>
//             )
//           )
//         }
//       </div>

//     </div>
//   )
// }

// export default SalonList


import React, { useEffect, useRef, useState } from 'react'
import style from "./SalonList.module.css"
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
          getAdminSalonListLoading && !getAdminSalonListResolve ? (
            <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>
              <Skeleton
                count={6}
                height={"6rem"}
                baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                style={{ marginBottom: "1rem" }} />
            </div>
          ) : !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length > 0 ? (
            <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>
              <div>
                <p>Salon Name</p>
                <p>Address</p>
                <p>City</p>
                <p>Salon Type</p>
                <p>Edit</p>
                <p>Delete</p>
                <p>Setting</p>
              </div>

              {SalonList.map((s, index) => (
                <div key={s?._id}
                  style={{
                    borderBottom: SalonList.length - 1 === index && "none"
                  }}
                >
                  <p>{s?.salonName.length > 19 ? s?.salonName.slice(0, 19) + "..." : s?.salonName}</p>
                  <p>{s?.address.length > 19 ? s?.address.slice(0, 19) + "..." : s?.address}</p>
                  <p>{s?.city.length > 19 ? s?.city.slice(0, 19) + "..." : s?.city}</p>
                  <p>{s?.salonType}</p>
                  <div>
                    <button onClick={() => editButtonClicked(s)}>Edit</button>
                  </div>
                  <div>
                    <button onClick={() => deleteSalonHandler(s.salonId, s._id)}>Delete</button>
                  </div>
                  <div>
                    <button onClick={() => salonappointmentClicked(s)}>Setting</button>
                  </div>
                </div>
              ))}
            </div>
          ) : !getAdminSalonListLoading && getAdminSalonListResolve && SalonList?.length == 0 ? (
            <div className={`${style.salon_content_body_error} ${darkmodeOn && style.dark}`}>
              <p style={{ margin: "2rem" }}>Salons not available</p>
            </div>
          ) : (
            !getAdminSalonListLoading && !getAdminSalonListResolve && (
              <div className={`${style.salon_content_body_error} ${darkmodeOn && style.dark}`}>
                <p>No salon available</p>
              </div>
            )
          )
        }

      </div>

    </div>
  )
}

export default SalonList