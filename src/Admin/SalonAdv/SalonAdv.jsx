import React, { useEffect, useRef, useState } from 'react';
import './SalonAdv.css';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DeleteIcon, EditIcon, FaFileIcon, Uploadicon } from '../../icons'
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useDispatch } from 'react-redux';
import { adminDragAdvertisementAction, getAllAdvertisementAction } from '../../Redux/Admin/Actions/DashboardAction'
import api from '../../Redux/api/Api';
import ButtonLoader from '../../components/ButtonLoader/ButtonLoader'
import Skeleton from 'react-loading-skeleton';
import toast from 'react-hot-toast';

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

    // Check for invalid files
    const invalidFiles = Array.from(uploadedFiles).filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      setUploadAdvImages([]);
      return;
    }

    // Only process valid files
    const validFiles = Array.from(uploadedFiles).filter(file => allowedTypes.includes(file.type));

    setUploadAdvImages(validFiles);
  };


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
        setUploadAdvImages([]);
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    dispatch({
      type: "DRAG_END_ADVERTISEMENTLIST",
      payload: {
        active,
        over
      }
    })
  };


  const adminDragAdvertisementControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (salonId && advertisements) {
      const controller = new AbortController();
      adminDragAdvertisementControllerRef.current = controller;

      dispatch(adminDragAdvertisementAction(salonId, advertisements, controller.signal));

      return () => {
        if (adminDragAdvertisementControllerRef.current) {
          adminDragAdvertisementControllerRef.current.abort();
        }
      };
    }
  }, [advertisements, salonId, dispatch]);



  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor), // For Mobile
    useSensor(KeyboardSensor, { // First go to the element press enter and then ctrl hold + up/down arrow
      coordinateGetter: sortableKeyboardCoordinates
    })
  );


  return (
    <div className='salonadv_container'>
      <div className={`salonadv_header ${darkmodeOn && "dark"}`}>
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
            uploadLoader ? <button><ButtonLoader color="#fff" /></button> :
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
                  width={"95%"}
                  height={"35rem"}
                  style={{ borderRadius: "1.7rem" }}
                  baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                  highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                />
              ))}
            </div> :
            !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length > 0 ?

              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
                <div className={`salonadv_column ${darkmodeOn && "dark"}`}>
                  <SortableContext items={advertisements.map(adv => adv._id)} strategy={horizontalListSortingStrategy}>
                    {advertisements.map((adv) => (
                      <>
                        <Adv key={adv._id} id={adv._id} url={adv.url} public_id={adv.public_id} editImageHandler={editImageHandler} handleEditLoader={handleEditLoader} deleteHandler={deleteHandler} deleteLoader={deleteLoader} fileEditInputRef={fileEditInputRef} handleEditFileInputChange={handleEditFileInputChange} darkmodeOn={darkmodeOn} />
                      </>
                    ))}
                  </SortableContext>

                </div>
              </DndContext> :
              !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length == 0 ?
                <div className={`salonadv_column_error ${darkmodeOn && "dark"}`}><p>No Advertisment Avaialble</p></div> :
                !getAllAdvertisementLoading && !getAllAdvertisementResolve &&
                <div className={`salonadv_column_error ${darkmodeOn && "dark"}`}><p>No Advertisment Avaialble</p></div>

        }

      </div>
    </div>
  );
};

export default SalonAdv;

const Adv = ({ id, url, public_id, editImageHandler, handleEditLoader, deleteHandler, deleteLoader, fileEditInputRef, handleEditFileInputChange, darkmodeOn }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };



  return (
    <div className={`salonadv_task ${darkmodeOn && "dark"}`} ref={setNodeRef} {...attributes} {...listeners} style={style}>

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

