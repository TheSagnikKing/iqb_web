import React, { useEffect, useRef, useState } from 'react'
import "./Advertisement.css"
import { DeleteIcon, EditIcon, FaFileIcon, Uploadicon } from '../../icons'
import { getAllAdvertisementAction } from '../../Redux/Admin/Actions/DashboardAction'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import api from '../../Redux/api/Api'

const Advertisement = () => {

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
        console.log('Upload success:', imageResponse.data);
        setUploadAdvImages(null);
        dispatch(getAllAdvertisementAction(salonId));
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
      dispatch(getAllAdvertisementAction(salonId));
      // window.location.reload()
    } catch (error) {
      console.error('Image upload failed:', error);
      sethandleEditLoader(false)
    }
  };

  const [deleteLoader, setDeleteLoader] = useState(false)

  const deleteHandler = async (publicId, mongoid) => {
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

  return (
    <div className='advertisement_wrapper'>
      <div>
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
                onChange={handleEditFileInputChange}
              />
            </button>
            <p>{uploadAdvImages?.length} Files</p>
          </div>
          <button onClick={uploadAdvHandler} disabled={uploadLoader ? true : false}>
            <div><Uploadicon /></div>
            <p>Upload</p>
          </button>
        </div>

      </div>
      <div className='advertisement_content'>

        {
          getAllAdvertisementLoading && !getAllAdvertisementResolve ?
            <>
              <Skeleton count={1} height={"35rem"} style={{ borderRadius: "1.7rem" }} />
              <Skeleton count={1} height={"35rem"} style={{ borderRadius: "1.7rem" }} />
              <Skeleton count={1} height={"35rem"} style={{ borderRadius: "1.7rem" }} />
              <Skeleton count={1} height={"35rem"} style={{ borderRadius: "1.7rem" }} />
              <Skeleton count={1} height={"35rem"} style={{ borderRadius: "1.7rem" }} />
              <Skeleton count={1} height={"35rem"} style={{ borderRadius: "1.7rem" }} />
            </> :
            !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length > 0 ?
              advertisements.map((ad, index) => (
                <div className='advertisement_cards' key={ad._id}>
                  <div><img src={`${ad.url}`} alt="" /></div>
                  <div>
                    <button onClick={() => editImageHandler(ad.public_id, ad._id)} disabled={handleEditLoader ? true : false}>
                      <div><EditIcon /></div>
                      <p>Edit</p>

                      <input
                        type="file"
                        ref={fileEditInputRef}
                        style={{ display: 'none' }}
                        onChange={handleEditFileInputChange}
                      />
                    </button>

                    <button onClick={() => deleteHandler(ad.public_id, ad._id)} disabled={deleteLoader ? true : false}>
                      <div><DeleteIcon /></div>
                      <p>Delete</p>
                    </button>
                  </div>
                </div>
              )) :
              !getAllAdvertisementLoading && getAllAdvertisementResolve && advertisements?.length == 0 ?
                <p>Advertisement not available</p> :
                !getAllAdvertisementLoading && !getAllAdvertisementResolve &&
                <p>Advertisement not available</p>
        }
      </div>

    </div>
  )
}

export default Advertisement
