// import React, { useEffect, useRef, useState } from 'react'
// import "./SalonAdv.css"
// import { DeleteIcon, EditIcon, FaFileIcon, Uploadicon } from '../../icons'
// import { getAllAdvertisementAction } from '../../Redux/Admin/Actions/DashboardAction'
// import { useDispatch, useSelector } from 'react-redux'
// import Skeleton from 'react-loading-skeleton'
// import api from '../../Redux/api/Api'
// import ButtonLoader from '../../components/ButtonLoader/ButtonLoader'
// import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
// import Adv from './Adv'

// const SalonAdv = () => {

// const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

// const advImagefileInputRef = useRef(null);

// const handleAdvImageButtonClick = () => {
//   advImagefileInputRef.current.click();
// };

// const [uploadAdvImages, setUploadAdvImages] = useState([])

// const handleAdvImageFileInputChange = async (e) => {
//   const uploadedFiles = e.target.files;

//   const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

//   const files = Array.from(uploadedFiles).map((file) => {
//     if (!allowedTypes.includes(file.type)) {
//       alert("Please upload only valid image files (JPEG, WebP, PNG).");
//       return null;
//     }

//     return file
//   });

//   setUploadAdvImages(files)
// };

// // console.log(uploadAdvImages)

// const dispatch = useDispatch()

// const advertisementcontrollerRef = useRef(new AbortController());

// useEffect(() => {
//   const controller = new AbortController();
//   advertisementcontrollerRef.current = controller;

//   dispatch(getAllAdvertisementAction(salonId, controller.signal));

//   return () => {
//     if (advertisementcontrollerRef.current) {
//       advertisementcontrollerRef.current.abort();
//     }
//   };
// }, [salonId, dispatch]);

// const getAllAdvertisement = useSelector(state => state.getAllAdvertisement)

// const {
//   loading: getAllAdvertisementLoading,
//   resolve: getAllAdvertisementResolve,
//   advertisements
// } = getAllAdvertisement

// const [uploadLoader, setUploadLoader] = useState(false)

// const uploadAdvHandler = async () => {
//   if (uploadAdvImages.length > 0) {
//     const formData = new FormData();

//     formData.append('salonId', salonId);

//     for (const file of uploadAdvImages) {
//       formData.append('advertisements', file);
//     }

//     try {
//       setUploadLoader(true)
//       const imageResponse = await api.post('/api/advertisement/addAdvertisements', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setUploadLoader(false)
//       console.log('Upload success:', imageResponse.data);
//       setUploadAdvImages(null);
//       dispatch(getAllAdvertisementAction(salonId));
//     } catch (error) {
//       setUploadLoader(false)
//       console.error('Image upload failed:', error);
//       setUploadAdvImages([])
//     }
//   }
// }

// const [publicId, setPublicId] = useState("")
// const [mongoid, setMongoid] = useState("")

// const fileEditInputRef = useRef(null);

// const [handleEditLoader, sethandleEditLoader] = useState(false)

// const editImageHandler = (publicId, mongoid) => {
//   fileEditInputRef.current.click();
//   setPublicId(publicId)
//   setMongoid(mongoid)
// }

// const handleEditFileInputChange = async (e) => {
//   const uploadImage = e.target.files[0];
//   console.log(uploadImage)

//   const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

//   if (!allowedTypes.includes(uploadImage.type)) {
//     alert("Please upload a valid image file (JPEG, WebP, PNG).");
//     return;
//   }

//   const formData = new FormData();

//   formData.append('id', mongoid)
//   formData.append('advertisements', uploadImage)
//   formData.append('public_imgid', publicId)
//   formData.append('salonId', salonId);

//   try {
//     sethandleEditLoader(true)
//     const imageResponse = await api.put('/api/advertisement/updateAdvertisements', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('update success:', imageResponse.data);
//     setPublicId("")
//     setMongoid("")
//     sethandleEditLoader(false)
//     dispatch(getAllAdvertisementAction(salonId));

//   } catch (error) {
//     console.error('Image upload failed:', error);
//     sethandleEditLoader(false)
//   }
// };

// const [deleteLoader, setDeleteLoader] = useState(false)

// const deleteHandler = async (publicId, mongoid) => {
//   const confirm = window.confirm("Are you sure ?")

//   if (confirm) {
//     try {
//       setDeleteLoader(true)
//       await api.delete("/api/advertisement/deleteAdvertisements", {
//         data: {
//           public_id: publicId,
//           img_id: mongoid
//         }
//       })
//       setDeleteLoader(false)
//       dispatch({
//         type: "FILTER_ADVERTISEMENTLIST",
//         payload: mongoid
//       })

//     } catch (error) {
//       setDeleteLoader(false)
//       console.log(error)
//     }
//   }

// }

// const darkMode = useSelector(darkmodeSelector)

// const darkmodeOn = darkMode === "On"

//   return (
//     <div className={`salonadv_wrapper ${darkmodeOn && "dark"}`}>
// <div>
//   <p>Advertisements</p>
//   <div>
//     <div>
//       <button
//         onClick={() => handleAdvImageButtonClick()}
//       >
//         <div><FaFileIcon /></div>
//         <p>Choose Files</p>

//         <input
//           type="file"
//           ref={advImagefileInputRef}
//           style={{ display: 'none' }}
//           multiple
//           onChange={handleAdvImageFileInputChange}
//         />
//       </button>
//       <p>{uploadAdvImages?.length} Files</p>
//     </div>
//     {
//       uploadLoader ? <button><ButtonLoader color="var(--primary-bg-color3)" /></button> :
//         <button onClick={uploadAdvHandler} disabled={uploadLoader ? true : false}>
//           <div><Uploadicon /></div>
//           <p>Upload</p>
//         </button>
//     }
//   </div>

// </div>

//       {
//         getAllAdvertisementLoading && !getAllAdvertisementResolve ? (
//           <div className='salonadv_content'>
// {[...Array(6)].map((_, index) => (
//   <Skeleton
//     key={index}
//     count={1}
//     height={"35rem"}
//     style={{ borderRadius: "1.7rem" }}
//     baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//     highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//   />
// ))}
//           </div>
//         ) : !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length > 0 ? (
//             <div className='salonadv_content'>
//                 {advertisements.map((ad) => (
//                   <Adv ad={ad} key={ad._id} url={ad.url} id={ad._id} editImageHandler={editImageHandler} handleEditLoader={handleEditLoader} deleteHandler={deleteHandler} deleteLoader={deleteLoader} fileEditInputRef={fileEditInputRef}  handleEditFileInputChange={handleEditFileInputChange} />
//                 ))}
//             </div>
//         ) : !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length === 0 ? (
//           <div className={`salonadv_content_error ${darkmodeOn && "dark"}`}>
//             <p>Advertisement not available</p>
//           </div>
//         ) : (
//           !getAllAdvertisementLoading && !getAllAdvertisementResolve && (
//             <div className={`salonadv_content_error ${darkmodeOn && "dark"}`}>
//               <p>Advertisement not available</p>
//             </div>
//           )
//         )
//       }

//     </div>
//   )
// }

// export default SalonAdv


import React, { useEffect, useRef, useState } from 'react';
import './SalonAdv.css';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DeleteIcon, EditIcon, FaFileIcon, Uploadicon } from '../../icons'
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useDispatch } from 'react-redux';
import { getAllAdvertisementAction } from '../../Redux/Admin/Actions/DashboardAction'
import api from '../../Redux/api/Api';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader'
import Skeleton from 'react-loading-skeleton';

const SalonAdv = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const advImagefileInputRef = useRef(null);

  const handleAdvImageButtonClick = () => {
    advImagefileInputRef.current.click();
  };

  const [uploadAdvImages, setUploadAdvImages] = useState([])

  const handleAdvImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    const files = Array.from(uploadedFiles).map((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only valid image files (JPEG, WebP, PNG).");
        return null;
      }

      return file
    });

    setUploadAdvImages(files)
  };

  // console.log(uploadAdvImages)

  const dispatch = useDispatch()

  const advertisementcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    advertisementcontrollerRef.current = controller;

    dispatch(getAllAdvertisementAction(salonId, controller.signal));

    return () => {
      if (advertisementcontrollerRef.current) {
        advertisementcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

  const getAllAdvertisement = useSelector(state => state.getAllAdvertisement)

  const {
    loading: getAllAdvertisementLoading,
    resolve: getAllAdvertisementResolve,
    advertisements
  } = getAllAdvertisement

  const [uploadLoader, setUploadLoader] = useState(false)

  const uploadAdvHandler = async () => {
    if (uploadAdvImages.length > 0) {
      const formData = new FormData();

      formData.append('salonId', salonId);

      for (const file of uploadAdvImages) {
        formData.append('advertisements', file);
      }

      try {
        setUploadLoader(true)
        const imageResponse = await api.post('/api/advertisement/addAdvertisements', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setUploadLoader(false)
        setUploadAdvImages(null);
        dispatch({
          type: "ADD_ADVETISEMENT",
          payload: imageResponse?.data?.response
        })
      } catch (error) {
        setUploadLoader(false)
        console.error('Image upload failed:', error);
        setUploadAdvImages([])
      }
    }
  }

  const [publicId, setPublicId] = useState("")
  const [mongoid, setMongoid] = useState("")

  const fileEditInputRef = useRef(null);

  const [handleEditLoader, sethandleEditLoader] = useState(false)

  const editImageHandler = (publicId, mongoid) => {
    fileEditInputRef.current.click();
    setPublicId(publicId)
    setMongoid(mongoid)
  }

  const handleEditFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];
    console.log(uploadImage)

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    if (!allowedTypes.includes(uploadImage.type)) {
      alert("Please upload a valid image file (JPEG, WebP, PNG).");
      return;
    }

    const formData = new FormData();

    formData.append('id', mongoid)
    formData.append('advertisements', uploadImage)
    formData.append('public_imgid', publicId)
    formData.append('salonId', salonId);

    try {
      sethandleEditLoader(true)
      const imageResponse = await api.put('/api/advertisement/updateAdvertisements', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('update success:', imageResponse.data);
      setPublicId("")
      setMongoid("")
      sethandleEditLoader(false)
      dispatch({
        type: "AFTER_UPDATE_ADVERTISEMENTLIST",
        payload: imageResponse?.data?.response
      })

    } catch (error) {
      console.error('Image upload failed:', error);
      sethandleEditLoader(false)
    }
  };

  const [deleteLoader, setDeleteLoader] = useState(false)

  const deleteHandler = async (publicId, mongoid) => {
    const confirm = window.confirm("Are you sure ?")

    if (confirm) {
      try {
        setDeleteLoader(true)
        await api.delete("/api/advertisement/deleteAdvertisements", {
          data: {
            public_id: publicId,
            img_id: mongoid
          }
        })
        setDeleteLoader(false)
        dispatch({
          type: "FILTER_ADVERTISEMENTLIST",
          payload: mongoid
        })

      } catch (error) {
        setDeleteLoader(false)
        console.log(error)
      }
    }

  }

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  // const addTasks = (title) => {
  //     setTasks((tasks) => [...tasks, {
  //         _id: tasks.length + 1,
  //         title
  //     }]);
  // };

  // const getAdvPos = (id) => advState.findIndex(adv => adv._id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // setAdvState((advs) => {
    //   const originalPos = getAdvPos(active.id);
    //   const newPos = getAdvPos(over.id);

    //   return arrayMove(advs, originalPos, newPos);
    // });

    dispatch({
      type: "DRAG_END_ADVERTISEMENTLIST",
      payload: {
        active,
        over
      }
    })
  };

  useEffect(() => {
    console.log(advertisements);
    // For tasks array change I will call an API to save the data in the database
  }, [advertisements]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor), // For Mobile
    useSensor(KeyboardSensor, { // First go to the element press enter and then ctrl hold + up/down arrow
      coordinateGetter: sortableKeyboardCoordinates
    })
  );


  return (
    <div className='salonadv_container'>
      <div className='salonadv_header'>
        <p>Advertisements</p>
        <div>
          <div>
            <button
              onClick={() => handleAdvImageButtonClick()}
            >
              <div><FaFileIcon /></div>
              <p>Choose Files</p>

              <input
                type="file"
                ref={advImagefileInputRef}
                style={{ display: 'none' }}
                multiple
                onChange={handleAdvImageFileInputChange}
              />
            </button>
            <p>
              {uploadAdvImages?.length}
              Files</p>
          </div>
          {
            uploadLoader ? <button><ButtonLoader color="var(--primary-bg-color3)" /></button> :
              <button onClick={uploadAdvHandler} disabled={uploadLoader ? true : false}>
                <div><Uploadicon /></div>
                <p>Upload</p>
              </button>
          }
        </div>

      </div>
      <div className='salonadv_list_container'>
        {
          getAllAdvertisementLoading && !getAllAdvertisementResolve ?
            <div className='salonadv_column'>
              {[...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  count={1}
                  height={"35rem"}
                  style={{ borderRadius: "1.7rem" }}
                  baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                  highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                />
              ))}
            </div> :
            !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length > 0 ?

              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                <div className='salonadv_column'>
                  <SortableContext items={advertisements.map(adv => adv._id)} strategy={horizontalListSortingStrategy}>
                    {advertisements.map((adv) => (
                      <>
                        <Adv key={adv._id} id={adv._id} url={adv.url} public_id={adv.public_id} editImageHandler={editImageHandler} handleEditLoader={handleEditLoader} deleteHandler={deleteHandler} deleteLoader={deleteLoader} fileEditInputRef={fileEditInputRef} handleEditFileInputChange={handleEditFileInputChange} />
                      </>
                    ))}
                  </SortableContext>

                </div>
              </DndContext> :
              !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length == 0 ?
                <div className='salonadv_column_error'><p>No Advertisment Avaialble</p></div> :
                !getAllAdvertisementLoading && !getAllAdvertisementResolve &&
                <div className='salonadv_column_error'><p>No Advertisment Avaialble</p></div>

        }

      </div>
    </div>
  );
};

export default SalonAdv;

const Adv = ({ id, url, public_id, editImageHandler, handleEditLoader, deleteHandler, deleteLoader, fileEditInputRef, handleEditFileInputChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };



  return (
    <div className='salonadv_task' ref={setNodeRef} {...attributes} {...listeners} style={style}>

      <div><img src={url} alt="" /></div>
      <div>
        <button
          onClick={() => editImageHandler(public_id, id)}
          disabled={handleEditLoader}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div><EditIcon /></div>
          <p>Edit</p>
          <input
            type="file"
            ref={fileEditInputRef}
            style={{ display: 'none' }}
            onChange={handleEditFileInputChange}
          />
        </button>
        <button
          onClick={() => deleteHandler(public_id, id)}
          disabled={deleteLoader}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <div><DeleteIcon /></div>
          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

