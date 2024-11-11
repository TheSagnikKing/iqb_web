// import React, { useEffect, useRef, useState } from 'react'
// import "./EditSalon.css"
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { CameraIcon, DeleteIcon, DropdownIcon, EditIcon, Uploadicon } from '../../../icons';
// import Skeleton from 'react-loading-skeleton'
// import { useDispatch, useSelector } from 'react-redux';
// import { adminCreateSalonAction, adminEditSalonAction, getAdminAllCitiesAction, getAdminAllCountriesAction, getAdminAllSalonIconAction, getAdminAllTimezoneAction, getAdminSalonImagesAction, getAdminSalonLogoAction } from '../../../Redux/Admin/Actions/SalonAction';
// import api from '../../../Redux/api/Api';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
// import Modal from '../../../components/Modal/Modal';
// import toast from 'react-hot-toast';
// import { PhoneInput } from 'react-international-phone';
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';
// import SalonModal from '../../../components/Modal/SalonModal/SalonModal';

// import { PhoneNumberUtil } from 'google-libphonenumber';

// const EditSalon = () => {

//   const dispatch = useDispatch()
//   const location = useLocation()

//   const currentSalon = location?.state

//   const [salonImages, setSalonImages] = useState([])
//   const [salonLogo, setSalonLogo] = useState([])

//   const getAdminSalonImages = useSelector(state => state.getAdminSalonImages)

//   const {
//     loading: getAdminSalonImagesLoading,
//     resolve: getAdminSalonImagesResolve,
//     response: AdminSalonImages
//   } = getAdminSalonImages

//   const getAdminSalonLogo = useSelector(state => state.getAdminSalonLogo)

//   const {
//     loading: getAdminSalonLogoLoading,
//     resolve: getAdminSalonLogoResolve,
//     response: AdminSalonLogo
//   } = getAdminSalonLogo

//   useEffect(() => {
//     if (currentSalon?.salonId) {
//       dispatch(getAdminSalonImagesAction(currentSalon?.salonId))
//       dispatch(getAdminSalonLogoAction(currentSalon?.salonId))
//     }
//   }, [currentSalon])

//   console.log("Hurrayy  ", AdminSalonImages)
//   console.log("Salon logo ", AdminSalonLogo)

//   useEffect(() => {
//     if (AdminSalonImages) {
//       setSalonImages(AdminSalonImages)
//     }
//   }, [AdminSalonImages])

//   useEffect(() => {
//     if (AdminSalonLogo) {
//       setSalonLogo(AdminSalonLogo?.salonLogo[0]?.url)
//     }
//   }, [AdminSalonLogo])

//   const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
//   const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

//   const SalonIconControllerRef = useRef(new AbortController());

//   useEffect(() => {
//     const controller = new AbortController();
//     SalonIconControllerRef.current = controller;

//     dispatch(getAdminAllSalonIconAction(controller.signal));

//     return () => {
//       if (SalonIconControllerRef.current) {
//         SalonIconControllerRef.current.abort();
//       }
//     };
//   }, [dispatch]);

//   const getAdminAllSalonIcon = useSelector(state => state.getAdminAllSalonIcon)

//   const {
//     loading: getAdminAllSalonIconLoading,
//     resolve: getAdminAllSalonIconResolve,
//     response: SalonIcons
//   } = getAdminAllSalonIcon

//   const [latitude, setLatitude] = useState(currentSalon?.location.coordinates.latitude);
//   const [longitude, setLongitude] = useState(currentSalon?.location.coordinates.longitude);
//   const [error, setError] = useState(null);

//   const geoLocationHandler = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setLatitude(latitude);
//           setLongitude(longitude);
//         },
//         (error) => {
//           if (error.code === error.PERMISSION_DENIED) {
//             setError("You denied access to your geolocation. Please enable it in your browser settings.");
//           } else {
//             setError("Error accessing geolocation: " + error.message);
//           }
//         }
//       );
//     } else {
//       setError("Geolocation is not available in your browser.");
//     }
//   }

//   console.log("Current Salon is ", currentSalon)

//   const [salonEmail, setSalonEmail] = useState(currentSalon?.salonEmail)
//   const [salonName, setSalonName] = useState(currentSalon?.salonName)
//   const [address, setAddress] = useState(currentSalon?.address)

//   const [postCode, setPostCode] = useState(currentSalon?.postCode)
//   const [contactTel, setContactTel] = useState(`${currentSalon?.mobileCountryCode}${currentSalon?.contactTel.toString()}`)
//   const [dialCode, setDialCode] = useState(currentSalon?.mobileCountryCode)
//   // currentSalon?.contactTel
//   const [webLink, setWebLink] = useState(currentSalon?.webLink)
//   const [fbLink, setFbLink] = useState(currentSalon?.fbLink)
//   const [twitterLink, setTwitterLink] = useState(currentSalon?.twitterLink)
//   const [instraLink, setInstraLink] = useState(currentSalon?.instraLink)
//   const [tiktokLink, setTiktokLink] = useState(currentSalon?.tiktokLink)

//   const [serviceName, setServiceName] = useState("")
//   const [serviceDesc, setServiceDesc] = useState("")
//   const [servicePrice, setServicePrice] = useState("")
//   const [serviceEWT, setServiceEWT] = useState("")
//   const [serviceCode, setServiceCode] = useState("")
//   const [serviceId, setServiceId] = useState(0)

//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 8
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1250 },
//       items: 7
//     },
//     laptop: {
//       breakpoint: { max: 1250, min: 768 },
//       items: 6
//     },
//     tablet: {
//       breakpoint: { max: 768, min: 430 },
//       items: 5
//     },
//     mobile: {
//       breakpoint: { max: 430, min: 0 },
//       items: 3
//     }
//   };


//   const [salonType, setSalonType] = useState(currentSalon?.salonType)
//   const [salonTypeDrop, setSalonTypeDrop] = useState(false)

//   const salonTypeDropHandler = () => {
//     setSalonTypeDrop((prev) => !prev)
//   }

//   const salonTypeHandler = (value) => {
//     setSalonType(value)
//     setSalonTypeDrop(false)
//   }

//   const [countryCurrency, setCountryCurrency] = useState(currentSalon?.currency)

//   const [country, setCountry] = useState(currentSalon?.country)
//   const [countryDrop, setCountryDrop] = useState(false)
//   const [countrycode, setCountryCode] = useState("")

//   const setCountryHandler = (value) => {
//     setCountryCode(value.countryCode)
//     setCountry(value.name)
//     setCountryCurrency(value.currency)
//     setCountryDrop(false)
//   }

//   const [countryTimeout, setCountryTimeout] = useState(null);

//   const debounceSearch = (value) => {
//     if (countryTimeout) {
//       clearTimeout(countryTimeout);
//     }
//     setCountry(value)

//     setCountryTimeout(setTimeout(() => {
//       dispatch(getAdminAllCountriesAction(value));
//     }, 500));
//   };

//   const searchCountryHandler = (e) => {
//     const searchTerm = e.target.value;
//     setCountryDrop(true)
//     debounceSearch(searchTerm);
//   }

//   const countryinputRef = useRef()
//   const countryDropRef = useRef()

//   useEffect(() => {
//     const handleClickCountryOutside = (event) => {
//       if (
//         countryinputRef.current &&
//         countryDropRef.current &&
//         !countryinputRef.current.contains(event.target) &&
//         !countryDropRef.current.contains(event.target)
//       ) {
//         setCountryDrop(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickCountryOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickCountryOutside);
//     };
//   }, []);


//   const getAdminAllCountries = useSelector(state => state.getAdminAllCountries)

//   const {
//     loading: getAdminAllCountriesLoading,
//     resolve: getAdminAllCountriesResolve,
//     response: AllCountries
//   } = getAdminAllCountries


//   const [city, setCity] = useState(currentSalon?.city)
//   const [cityDrop, setCityDrop] = useState(false)

//   const setCityHandler = (value) => {
//     setCity(value.name)
//     setCityDrop(false)
//   }

//   const [cityTimeout, setCityTimeout] = useState(null);

//   const debounceCitySearch = (value, countrycode) => {
//     if (cityTimeout) {
//       clearTimeout(cityTimeout);
//     }

//     setCity(value)
//     setCityTimeout(setTimeout(() => {
//       dispatch(getAdminAllCitiesAction(value, countrycode));
//     }, 500));
//   };

//   const searchCityHandler = (e) => {
//     const searchTerm = e.target.value;
//     setCityDrop(true)
//     debounceCitySearch(searchTerm, countrycode);
//   }

//   const cityinputRef = useRef()
//   const cityDropRef = useRef()

//   useEffect(() => {
//     const handleClickCityOutside = (event) => {
//       if (
//         cityinputRef.current &&
//         cityDropRef.current &&
//         !cityinputRef.current.contains(event.target) &&
//         !cityDropRef.current.contains(event.target)
//       ) {
//         setCityDrop(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickCityOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickCityOutside);
//     };
//   }, []);

//   const getAdminAllCities = useSelector(state => state.getAdminAllCities)

//   const {
//     loading: getAdminAllCitiesLoading,
//     resolve: getAdminAllCitiesResolve,
//     response: AllCities
//   } = getAdminAllCities

//   const [timezone, setTimezone] = useState(currentSalon?.timeZone)
//   const [timezoneDrop, setTimezoneDrop] = useState(false)

//   const timezoneDropHandler = () => {
//     setTimezoneDrop((prev) => !prev)
//   }

//   const setTimezoneHandler = (value) => {
//     setTimezone(value)
//     setTimezoneDrop(false)
//   }

//   useEffect(() => {
//     if (countrycode) {
//       dispatch(getAdminAllTimezoneAction(countrycode))
//     }
//   }, [countrycode, dispatch])

//   const getAdminAllTimezone = useSelector(state => state.getAdminAllTimezone)

//   const {
//     loading: getAdminAllTimezoneLoading,
//     resolve: getAdminAllTimezoneResolve,
//     response: AllTimezones
//   } = getAdminAllTimezone

//   const timezoneinputRef = useRef()
//   const timezoneDropRef = useRef()

//   useEffect(() => {
//     const handleClickTimezoneOutside = (event) => {
//       if (
//         timezoneinputRef.current &&
//         timezoneDropRef.current &&
//         !timezoneinputRef.current.contains(event.target) &&
//         !timezoneDropRef.current.contains(event.target)
//       ) {
//         setTimezoneDrop(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickTimezoneOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickTimezoneOutside);
//     };
//   }, []);


//   const salonTypeIconRef = useRef()
//   const salonTypeDropRef = useRef()

//   useEffect(() => {
//     const handleClickSalonTypeOutside = (event) => {
//       if (
//         salonTypeIconRef.current &&
//         salonTypeDropRef.current &&
//         !salonTypeIconRef.current.contains(event.target) &&
//         !salonTypeDropRef.current.contains(event.target)
//       ) {
//         setSalonTypeDrop(false)
//       }
//     };

//     document.addEventListener('mousedown', handleClickSalonTypeOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickSalonTypeOutside);
//     };
//   }, []);


//   const [vipService, setVipService] = useState(false)
//   const [vipServiceDrop, setVipServiceDrop] = useState(false)

//   const vipServiceDropHandler = () => {
//     setVipServiceDrop((prev) => !prev)
//   }

//   const vipServiceHandler = (value) => {
//     setVipService(value)
//     setVipServiceDrop(false)
//   }

//   const vipServiceIconRef = useRef()
//   const vipServiceDropRef = useRef()

//   useEffect(() => {
//     const handleClickVipServiceOutside = (event) => {
//       if (
//         vipServiceIconRef.current &&
//         vipServiceDropRef.current &&
//         !vipServiceIconRef.current.contains(event.target) &&
//         !vipServiceDropRef.current.contains(event.target)
//       ) {
//         setVipServiceDrop(false)
//       }
//     };

//     document.addEventListener('mousedown', handleClickVipServiceOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickVipServiceOutside);
//     };
//   }, []);


//   const [loading, setLoading] = useState(false)


//   const fileInputRef = useRef(null);

//   const handleSalonLogoButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const [uploadSalonLogo, setUploadSalonLogo] = useState("")
//   const [currentSalonLogoId, setCurrentSalonLogoId] = useState(currentSalon?.salonLogo[0]?.public_id);
//   const [currentSalonLogoMongoId, setCurrentSalonLogoMongoId] = useState(currentSalon?.salonLogo[0]?._id)

//   const handleSalonFileInputChange = async (e) => {
//     const uploadImage = e.target.files[0]; // Get the uploaded file

//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
//     if (!allowedTypes.includes(uploadImage.type)) {
//       toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     const imageUrl = URL.createObjectURL(uploadImage);

//     const formData = new FormData();

//     formData.append('salonId', currentSalon?.salonId);
//     formData.append('salonLogo', uploadImage);

//     try {
//       const imageResponse = await api.post('/api/salon/uploadSalonLogo', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success("Salon logo uploaded successfully", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       console.log('Salon Logo Upload success:', imageResponse.data);
//       setSalonLogo(imageUrl)
//     } catch (error) {
//       console.error('Image upload failed:', error);
//     }
//   };

//   const salonImagefileInputRef = useRef(null);

//   const handleSalonImageButtonClick = () => {
//     salonImagefileInputRef.current.click();
//   };

//   const [uploadSalonImages, setUploadSalonImages] = useState([])


//   const handleSalonImageFileInputChange = async (e) => {
//     const uploadedFiles = e.target.files;
//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

//     // Check for invalid files
//     const invalidFiles = Array.from(uploadedFiles).filter(file => !allowedTypes.includes(file.type));
//     if (invalidFiles.length > 0) {
//       toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     const files = Array.from(uploadedFiles);

//     const formData = new FormData();
//     const SalonId = currentSalon?.salonId;
//     formData.append('salonId', SalonId);

//     files.forEach(file => formData.append('gallery', file));

//     try {
//       const { data } = await api.post('/api/salon/uploadSalonImage', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSalonImages([...data?.response, ...salonImages]);

//       toast.success("Salon images uploaded successfully", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } catch (error) {
//       toast.error(error?.response?.data?.message, {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }
//   };


//   const [selectedLogo, setSelectedLogo] = useState({
//     url: "",
//     public_id: ""
//   })

//   const logoselectHandler = (serviceImg) => {
//     setSelectedLogo({
//       url: serviceImg.url,
//       public_id: serviceImg.public_id
//     });
//   }

//   const [selectedServices, setSelectedServices] = useState(currentSalon?.services)

//   const addServiceHandler = () => {

//     if (serviceName === '' || serviceDesc === '' || servicePrice === '' || serviceEWT === '' || selectedLogo.url === "" && selectedLogo.public_id === "") {
//       toast.error("Please fill all the services", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     const service = {
//       serviceIcon: {
//         url: selectedLogo.url,
//         public_id: selectedLogo.public_id
//       },
//       serviceName,
//       servicePrice: Number(servicePrice),
//       vipService,
//       serviceDesc,
//       serviceEWT: Number(serviceEWT),
//       serviceId,
//       serviceCode
//     }

//     setSelectedServices([...selectedServices, service])

//     setSelectedLogo({ url: "", public_id: "" })
//     setServiceName("")
//     setServicePrice("")
//     setVipService(false)
//     setServiceDesc("")
//     setServiceEWT("")
//     setServiceCode("")
//     setServiceId(0)
//   }


//   const deleteServiceHandler = (index) => {
//     const currentService = selectedServices[index];

//     setSelectedLogo({
//       url: currentService.serviceIcon.url,
//       public_id: currentService.serviceIcon.public_id
//     })
//     setServiceName(currentService.serviceName)
//     setServicePrice(currentService.servicePrice)
//     setVipService(currentService.vipService)
//     setServiceDesc(currentService.serviceDesc)
//     setServiceEWT(currentService.serviceEWT)
//     setServiceCode(currentService.serviceCode)
//     setServiceId(currentService.serviceId)

//     const updatedServices = [...selectedServices];
//     updatedServices.splice(index, 1);

//     setSelectedServices(updatedServices);
//   }

//   const [image2, setImage2] = useState("https://img.freepik.com/free-photo/interior-latino-hair-salon_23-2150555185.jpg")

//   const navigate = useNavigate()

//   const [invalidnumber, setInvalidNumber] = useState(false)

//   const editSalonHandler = () => {
//     if (invalidnumber) {
//       toast.error("Invalid Number", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } else {
//       const salondata = {
//         adminEmail: email,
//         salonEmail,
//         salonName,
//         address,
//         location: {
//           type: "Point",
//           coordinates: {
//             longitude: Number(longitude),
//             latitude: Number(latitude)
//           }
//         },
//         country,
//         city,
//         timeZone: timezone,
//         postCode,
//         contactTel: Number(contactTel),
//         countryCode: Number(dialCode),
//         salonType,
//         webLink,
//         fbLink,
//         instraLink,
//         twitterLink,
//         tiktokLink,
//         services: selectedServices,
//         salonId: currentSalon?.salonId
//       }

//       console.log(salondata)

//       dispatch(adminEditSalonAction(salondata, navigate))
//     }

//   }

//   const adminEditSalon = useSelector(state => state.adminEditSalon)

//   const {
//     loading: editSalonLoading,
//     response: editSalonResponse
//   } = adminEditSalon

//   const [openModal, setOpenModal] = useState(false)

//   const [selectedEditImageObject, setSelectedEditImageObject] = useState({})

//   const selectedSalonImageClicked = async (imgObject) => {
//     setSelectedEditImageObject(imgObject)
//     setOpenModal(true)
//   };

//   const currentEditSalonImageInputRef = useRef(null);

//   const handleCurrentEditSalonImageButtonClick = () => {
//     currentEditSalonImageInputRef.current.click();
//   };

//   const handleEditSelectedImageFileInputChange = async (e) => {
//     const uploadImage = e.target.files[0]; // Get the uploaded file

//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

//     if (!allowedTypes.includes(uploadImage.type)) {
//       toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     if (uploadImage != null) {
//       const formData = new FormData();

//       formData.append('public_imgid', selectedEditImageObject?.public_id);
//       formData.append('id', selectedEditImageObject?._id)
//       formData.append('gallery', uploadImage)
//       formData.append('salonId', currentSalon?.salonId)

//       try {
//         const { data: responseimage } = await api.put('/api/salon/updateSalonImages', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (responseimage) {
//           const updatedImages = salonImages.map((image) =>
//             image._id === responseimage?.response?._id
//               ? { ...image, public_id: responseimage?.response?.public_id, url: responseimage?.response?.url, _id: responseimage?.response?._id }
//               : image
//           );
//           setSalonImages(updatedImages);
//           setOpenModal(false)
//         }

//         toast.success("Image updated successfully", {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });
//       } catch (error) {
//         toast.error(error?.response?.data?.message, {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });
//       }
//     }
//   }

//   const deleteEditImageHandler = async (imgObj) => {
//     if (window.confirm("Are you sure ?")) {
//       try {
//         const { data: responseimage } = await api.delete("/api/salon/deleteSalonImages", {
//           data: {
//             public_id: imgObj?.public_id,
//             img_id: imgObj?._id
//           }
//         })

//         setSalonImages((images) => images.filter((image) => image._id !== responseimage?.response?._id))
//         setOpenModal(false)

//         toast.success("Image deleted successfully", {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });

//       } catch (error) {
//         toast.error(error?.response?.data?.message, {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });
//       }
//     }
//   }

//   const [openServices, setOpenServices] = useState(false)


//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   const [openMobileUpdateModal, setOpenMobileUpdateModal] = useState(false)


//   const mobiledeleteImage = async (imgObj) => {
//     if (window.confirm("Are you sure ?")) {
//       try {
//         const { data: responseimage } = await api.delete("/api/salon/deleteSalonImages", {
//           data: {
//             public_id: imgObj?.public_id,
//             img_id: imgObj?._id
//           }
//         })

//         setSalonImages((images) => images.filter((image) => image._id !== responseimage?.response?._id))

//         toast.success("Image deleted successfully", {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });

//       } catch (error) {
//         toast.error(error?.response?.data?.message, {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });
//       }
//     }
//   }

//   const [selectedMobileEditImageObject, setSelectedMobileEditImageObject] = useState({})

//   const mobileEditSalonImageInputRef = useRef(null);

//   const handleCurrentMobileEditSalonImageButtonClick = (imgObj) => {

//     mobileEditSalonImageInputRef.current.click();
//     setSelectedMobileEditImageObject(imgObj)
//   };



//   const mobileEditSelectedImageFileInputChange = async (e) => {
//     const uploadImage = e.target.files[0]; // Get the uploaded file

//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

//     if (!allowedTypes.includes(uploadImage.type)) {
//       alert("Please upload a valid image file (JPEG, WebP, PNG).");
//       return;
//     }

//     if (uploadImage != null) {
//       const formData = new FormData();

//       formData.append('public_imgid', selectedMobileEditImageObject?.public_id);
//       formData.append('id', selectedMobileEditImageObject?._id)
//       formData.append('gallery', uploadImage)
//       formData.append('salonId', currentSalon?.salonId)

//       try {
//         const { data: responseimage } = await api.put('/api/salon/updateSalonImages', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (responseimage) {
//           const updatedImages = salonImages.map((image) =>
//             image._id === responseimage?.response?._id
//               ? { ...image, public_id: responseimage?.response?.public_id, url: responseimage?.response?.url, _id: responseimage?.response?._id }
//               : image
//           );
//           setSalonImages(updatedImages);
//         }

//         toast.success("Image updated successfully", {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });
//       } catch (error) {
//         toast.error(error?.response?.data?.message, {
//           duration: 3000,
//           style: {
//             fontSize: "1.4rem",
//             borderRadius: '10px',
//             background: '#333',
//             color: '#fff',
//           },
//         });
//       }
//     }
//   }

//   const addservicedropHandler = () => {
//     if (country == "") {
//       toast.error("Please select a country", {
//         duration: 3000,
//         style: {
//           fontSize: "1.4rem",
//           borderRadius: '10px',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } else {
//       setOpenServices((prev) => !prev)
//     }

//   }

//   const [oldPassword, setOldPassword] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")

//   const [seeOldPassword, setSeeOldPassword] = useState(false)
//   const [seePassword, setSeePassword] = useState(false)
//   const [seeConfirmPassword, setSeeConfirmPassword] = useState(false)

//   const phoneUtil = PhoneNumberUtil.getInstance();

//   const isPhoneValid = (phone) => {
//     try {
//       return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//     } catch (error) {
//       return false;
//     }
//   };

//   const handlePhoneChange = (phone, meta) => {
//     const { country, inputValue } = meta;

//     const isValid = isPhoneValid(phone);

//     if (isValid) {
//       setContactTel(phone)
//       setDialCode(country?.dialCode)
//       setInvalidNumber(false)
//     } else {
//       setInvalidNumber(true)
//     }
//   };

//   return (
//     <div className={`edit_salon_wrapper ${darkmodeOn && "dark"}`}>
//       <p>Edit Salon</p>
//       <div className={`edit_salon_content_wrapper ${darkmodeOn && "dark"}`}>
//         <div>
//           <div>
//             <div><svg xmlns="http://www.w3.org/2000/svg" width="100%">
//               <rect fill="#ffffff" width="540" height="450"></rect>
//               <defs>
//                 <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
//                   <stop offset="0" stop-color="#ffffff"></stop>
//                   <stop offset="1" stop-color="var(--primary-bg-color3)"></stop>
//                 </linearGradient>
//                 <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
//                   <g fill-opacity="0.5">
//                     <polygon fill="#444" points="90 150 0 300 180 300"></polygon>
//                     <polygon points="90 150 180 0 0 0"></polygon>
//                     <polygon fill="#AAA" points="270 150 360 0 180 0"></polygon>
//                     <polygon fill="#DDD" points="450 150 360 300 540 300"></polygon>
//                     <polygon fill="#999" points="450 150 540 0 360 0"></polygon>
//                     <polygon points="630 150 540 300 720 300"></polygon>
//                     <polygon fill="#DDD" points="630 150 720 0 540 0"></polygon>
//                     <polygon fill="#444" points="810 150 720 300 900 300"></polygon>
//                     <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
//                     <polygon fill="#DDD" points="990 150 900 300 1080 300"></polygon>
//                     <polygon fill="#444" points="990 150 1080 0 900 0"></polygon>
//                     <polygon fill="#DDD" points="90 450 0 600 180 600"></polygon>
//                     <polygon points="90 450 180 300 0 300"></polygon>
//                     <polygon fill="#666" points="270 450 180 600 360 600"></polygon>
//                     <polygon fill="#AAA" points="270 450 360 300 180 300"></polygon>
//                     <polygon fill="#DDD" points="450 450 360 600 540 600"></polygon>
//                     <polygon fill="#999" points="450 450 540 300 360 300"></polygon>
//                     <polygon fill="#999" points="630 450 540 600 720 600"></polygon>
//                     <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
//                     <polygon points="810 450 720 600 900 600"></polygon>
//                     <polygon fill="#DDD" points="810 450 900 300 720 300"></polygon>
//                     <polygon fill="#AAA" points="990 450 900 600 1080 600"></polygon>
//                     <polygon fill="#444" points="990 450 1080 300 900 300"></polygon>
//                     <polygon fill="#222" points="90 750 0 900 180 900"></polygon>
//                     <polygon points="270 750 180 900 360 900"></polygon>
//                     <polygon fill="#DDD" points="270 750 360 600 180 600"></polygon>
//                     <polygon points="450 750 540 600 360 600"></polygon>
//                     <polygon points="630 750 540 900 720 900"></polygon>
//                     <polygon fill="#444" points="630 750 720 600 540 600"></polygon>
//                     <polygon fill="#AAA" points="810 750 720 900 900 900"></polygon>
//                     <polygon fill="#666" points="810 750 900 600 720 600"></polygon>
//                     <polygon fill="#999" points="990 750 900 900 1080 900"></polygon>
//                     <polygon fill="#999" points="180 0 90 150 270 150"></polygon>
//                     <polygon fill="#444" points="360 0 270 150 450 150"></polygon>
//                     <polygon fill="#FFF" points="540 0 450 150 630 150"></polygon>
//                     <polygon points="900 0 810 150 990 150"></polygon>
//                     <polygon fill="#222" points="0 300 -90 450 90 450"></polygon>
//                     <polygon fill="#FFF" points="0 300 90 150 -90 150"></polygon>
//                     <polygon fill="#FFF" points="180 300 90 450 270 450"></polygon>
//                     <polygon fill="#666" points="180 300 270 150 90 150"></polygon>
//                     <polygon fill="#222" points="360 300 270 450 450 450"></polygon>
//                     <polygon fill="#FFF" points="360 300 450 150 270 150"></polygon>
//                     <polygon fill="#444" points="540 300 450 450 630 450"></polygon>
//                     <polygon fill="#222" points="540 300 630 150 450 150"></polygon>
//                     <polygon fill="#AAA" points="720 300 630 450 810 450"></polygon>
//                     <polygon fill="#666" points="720 300 810 150 630 150"></polygon>
//                     <polygon fill="#FFF" points="900 300 810 450 990 450"></polygon>
//                     <polygon fill="#999" points="900 300 990 150 810 150"></polygon>
//                     <polygon points="0 600 -90 750 90 750"></polygon>
//                     <polygon fill="#666" points="0 600 90 450 -90 450"></polygon>
//                     <polygon fill="#AAA" points="180 600 90 750 270 750"></polygon>
//                     <polygon fill="#444" points="180 600 270 450 90 450"></polygon>
//                     <polygon fill="#444" points="360 600 270 750 450 750"></polygon>
//                     <polygon fill="#999" points="360 600 450 450 270 450"></polygon>
//                     <polygon fill="#666" points="540 600 630 450 450 450"></polygon>
//                     <polygon fill="#222" points="720 600 630 750 810 750"></polygon>
//                     <polygon fill="#FFF" points="900 600 810 750 990 750"></polygon>
//                     <polygon fill="#222" points="900 600 990 450 810 450"></polygon>
//                     <polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon>
//                     <polygon fill="#444" points="180 900 270 750 90 750"></polygon>
//                     <polygon fill="#FFF" points="360 900 450 750 270 750"></polygon>
//                     <polygon fill="#AAA" points="540 900 630 750 450 750"></polygon>
//                     <polygon fill="#FFF" points="720 900 810 750 630 750"></polygon>
//                     <polygon fill="#222" points="900 900 990 750 810 750"></polygon>
//                     <polygon fill="#222" points="1080 300 990 450 1170 450"></polygon>
//                     <polygon fill="#FFF" points="1080 300 1170 150 990 150"></polygon>
//                     <polygon points="1080 600 990 750 1170 750"></polygon>
//                     <polygon fill="#666" points="1080 600 1170 450 990 450"></polygon>
//                     <polygon fill="#DDD" points="1080 900 1170 750 990 750"></polygon>
//                   </g>
//                 </pattern>
//               </defs>
//               <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
//               <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
//             </svg></div>
//             <div>
//               <img src={`${salonLogo}`} alt="" />
//               <div>
//                 <button onClick={() => handleSalonLogoButtonClick()}><CameraIcon /></button>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   style={{ display: 'none' }}
//                   onChange={handleSalonFileInputChange}
//                 />
//               </div>
//             </div>

//             <div>
//               <p>{salonName}</p>
//               <p><span>{city}</span>{city && ",  "}<span>{country}</span></p>
//             </div>
//           </div>

//           <div>
//             <p>Gallery</p>
//             <button
//               className='salon_upload_button'
//               onClick={() => handleSalonImageButtonClick()}
//             >
//               <div><Uploadicon /></div>
//               <p>Salon Images</p>

//               <input
//                 type="file"
//                 ref={salonImagefileInputRef}
//                 style={{ display: 'none' }}
//                 multiple
//                 onChange={handleSalonImageFileInputChange}
//               />
//             </button>
//           </div>

//           <div>
//             {
//               salonImages.map((s, index) => (
//                 <div key={index} onClick={() => selectedSalonImageClicked(s)} style={{ cursor: "pointer" }}><img src={s.url} alt="" /></div>
//               ))
//             }
//           </div>

//         </div>

//         <div>
//           <div>
//             <p>Salon Name</p>
//             <input
//               type="text"
//               value={salonName}
//               onChange={(e) => setSalonName(e.target.value)}
//             />
//           </div>

//           <div>
//             <p>Salon Email</p>
//             <input
//               type="text"
//               value={salonEmail}
//               onChange={(e) => setSalonEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <p>Address</p>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>

//           <div>
//             <div>
//               <p>Latitude</p>
//               <input
//                 type="number"
//                 value={latitude}
//               />
//             </div>

//             <div>
//               <p>Longitude</p>
//               <input
//                 type="number"
//                 value={longitude}
//               />
//             </div>
//           </div>

//           <div>
//             <button onClick={geoLocationHandler}>Get Geolocation</button>
//           </div>

//           <div>
//             <div>
//               <p>Country</p>
//               <input
//                 type="text"
//                 value={country}
//                 onChange={(e) => searchCountryHandler(e)}
//                 ref={countryinputRef}
//               />

//               {countryDrop && <div ref={countryDropRef}>
//                 {
//                   getAdminAllCountriesLoading && !getAdminAllCountriesResolve ?
//                     <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
//                     !getAdminAllCountriesLoading && getAdminAllCountriesResolve && AllCountries?.length > 0 ?

//                       AllCountries.map((c) => (
//                         <p key={c._id} onClick={() => setCountryHandler(c)}>{c.name}</p>
//                       ))

//                       :
//                       !getAdminAllCountriesLoading && getAdminAllCountriesResolve && AllCountries?.length == 0 ?
//                         <p>No Countries</p> :
//                         !getAdminAllCountriesLoading && !getAdminAllCountriesResolve &&
//                         <p>No Countries</p>
//                 }
//               </div>}

//             </div>

//             <div>
//               <p>City</p>
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => searchCityHandler(e)}
//                 ref={cityinputRef}
//               />

//               {cityDrop && <div ref={cityDropRef}>
//                 {
//                   getAdminAllCitiesLoading && !getAdminAllCitiesResolve ?
//                     <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
//                     !getAdminAllCitiesLoading && getAdminAllCitiesResolve && AllCities?.length > 0 ?

//                       AllCities.map((c) => (
//                         <p key={c._id} onClick={() => setCityHandler(c)}>{c.name}</p>
//                       ))

//                       :
//                       !getAdminAllCitiesLoading && getAdminAllCitiesResolve && AllCities?.length == 0 ?
//                         <p>No Cities</p> :
//                         !getAdminAllCitiesLoading && !getAdminAllCitiesResolve &&
//                         <p>No Cities</p>
//                 }
//               </div>}
//             </div>
//           </div>

//           <div>
//             <div>
//               <p>Time Zone</p>
//               <input
//                 type="text"
//                 value={timezone}
//                 onClick={() => timezoneDropHandler()}
//                 ref={timezoneinputRef}
//               />

//               {timezoneDrop && <div ref={timezoneDropRef}>
//                 {
//                   getAdminAllTimezoneLoading && !getAdminAllTimezoneResolve ?
//                     <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
//                     !getAdminAllTimezoneLoading && getAdminAllTimezoneResolve && AllTimezones?.length > 0 ?

//                       AllTimezones.map((c) => (
//                         <p key={c._id} onClick={() => setTimezoneHandler(c)}>{c}</p>
//                       ))

//                       :
//                       !getAdminAllTimezoneLoading && getAdminAllTimezoneResolve && AllTimezones?.length == 0 ?
//                         <p>No Timezone</p> :
//                         !getAdminAllTimezoneLoading && !getAdminAllTimezoneResolve &&
//                         <p>No Timezone</p>
//                 }
//               </div>}
//             </div>

//             <div>
//               <p>Post Code</p>
//               <input
//                 type="text"
//                 value={postCode}
//                 onChange={(e) => setPostCode(e.target.value)}
//               />
//             </div>
//           </div>

//           <div />

//           <div>
//             <p>Salon Type</p>
//             <input
//               type="text"
//               value={`${salonType ? `${salonType}` : ''}`}
//               onClick={() => salonTypeDropHandler()}
//               ref={salonTypeIconRef}
//               className='salontype_input'
//             />

//             {salonTypeDrop && <div ref={salonTypeDropRef}>
//               <p onClick={() => salonTypeHandler("Barber Shop")}>Barber Shop</p>
//               <p onClick={() => salonTypeHandler("Hair Dresser")}>Hair Dresser</p>
//             </div>}
//           </div>

//           <div>
//             <p>Mobile Number</p>
//             <div className={`salon_mobile_input ${darkmodeOn && "dark"}`}>
//               <div>
//                 <PhoneInput
//                   forceDialCode={true}
//                   defaultCountry="gb"
//                   value={contactTel}
//                   onChange={(phone, meta) => handlePhoneChange(phone, meta)}
//                 />
//               </div>

//             </div>
//           </div>

//           <div className='add_services_drop'>
//             <p>Add Your Services</p>
//             <button onClick={addservicedropHandler}>{openServices ? "-" : "+"}</button>
//           </div>

//           {
//             openServices &&
//             <main className={`add_services_drop_container ${darkmodeOn && "dark"}`}>
//               <p>Choose your service icon:</p>
//               <div>
//                 <div>
//                   {
//                     getAdminAllSalonIconLoading && !getAdminAllSalonIconResolve ?
//                       <div className='create_salon_carousel_loader'>
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "1rem"
//                           }}
//                         />
//                       </div> :
//                       !getAdminAllSalonIconLoading && getAdminAllSalonIconResolve && SalonIcons?.length > 0 ?
//                         <Carousel
//                           responsive={responsive}
//                           draggable={false}
//                           swipeable={false}
//                         >
//                           {
//                             SalonIcons?.map((s) => (
//                               <div key={s._id} className='slider_item' onClick={() => logoselectHandler(s)}
//                                 style={{
//                                   border: selectedLogo?.url === s.url ? "3px solid var(--primary-bg-color3)" : "1px solid black"
//                                 }}
//                               >
//                                 <img src={s.url} alt="" />
//                               </div>
//                             ))
//                           }
//                         </Carousel> :
//                         !getAdminAllSalonIconLoading && getAdminAllSalonIconResolve && SalonIcons?.length == 0 ?
//                           <p>No Salon Icons Available</p> :
//                           !getAdminAllSalonIconLoading && !getAdminAllSalonIconResolve &&
//                           <p>No Salon Icons Available</p>
//                   }

//                 </div>
//               </div>

//               <div>
//                 <p>Service Name</p>
//                 <input
//                   type="text"
//                   value={serviceName}
//                   onChange={(e) => setServiceName(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <p>Service Desc</p>
//                 <input
//                   type="text"
//                   value={serviceDesc}
//                   onChange={(e) => setServiceDesc(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <p>Service Type (*VIP services have top priority in queue)</p>
//                 <input
//                   type="text"
//                   value={`${vipService ? 'VIP' : 'Regular'}`}
//                   onClick={() => vipServiceDropHandler()}
//                   ref={vipServiceIconRef}
//                 />

//                 {vipServiceDrop && <div ref={vipServiceDropRef}>
//                   <p onClick={() => vipServiceHandler(false)}>Regular</p>
//                   <p onClick={() => vipServiceHandler(true)}>VIP</p>
//                 </div>}
//               </div>

//               <div>
//                 <div>
//                   <p>Service Price</p>
//                   <input
//                     type="text"
//                     value={servicePrice}
//                     onChange={(e) => setServicePrice(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <p>Est Wait Tm(mins)</p>
//                   <input
//                     type="text"
//                     value={serviceEWT}
//                     onChange={(e) => setServiceEWT(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button onClick={addServiceHandler} className='add_service_btn'>Add Service</button>
//               </div>

//               <div className={`service_container ${darkmodeOn && "dark"}`}>
//                 {
//                   selectedServices.map((ser, index) => (
//                     <div className={`service_container_item ${darkmodeOn && "dark"}`} key={index}>
//                       <div><img src={ser.serviceIcon.url ? ser.serviceIcon.url : ""} alt="" /></div>
//                       <p style={{ minWidth: "0.5fr", maxWidth: "10rem" }}>{ser.serviceName}</p>
//                       <p style={{ minWidth: "1fr", maxWidth: "27rem" }}>{ser.serviceDesc}</p>
//                       <p>{ser.vipService ? "VIP" : "Regular"}</p>
//                       <p style={{ minWidth: "0.3fr", maxWidth: "10rem" }}>{countryCurrency}{" "}{ser.servicePrice}</p>
//                       <p style={{ minWidth: "0.3fr", maxWidth: "10rem" }}>{ser.serviceEWT}min</p>
//                       <div onClick={() => deleteServiceHandler(index)}><DeleteIcon /></div>
//                     </div>
//                   ))
//                 }
//               </div>
//             </main>
//           }


//           <div className={`salon_logo_wrapper ${darkmodeOn && "dark"}`}>
//             <p>Select Salon Logo</p>
//             <div>
//               <button onClick={() => handleSalonLogoButtonClick()}>
//                 Upload
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   style={{ display: 'none' }}
//                   onChange={handleSalonFileInputChange}
//                 />
//               </button>

//               <div>{uploadSalonLogo?.name}</div>
//             </div>
//           </div>


//           <div className={`salon_images_wrapper ${darkmodeOn && "dark"}`}>
//             <div>
//               <p>Select Salon Images</p>

//               <button onClick={() => handleSalonImageButtonClick()}>
//                 Upload
//                 <input
//                   type="file"
//                   ref={salonImagefileInputRef}
//                   style={{ display: 'none' }}
//                   multiple
//                   onChange={handleSalonImageFileInputChange}
//                 />
//               </button>
//             </div>

//             <div>
//               <p>Update Salon Images</p>

//               <button onClick={() => setOpenMobileUpdateModal(true)}>
//                 Update
//               </button>
//             </div>

//           </div>

//           <div>
//             <p>Web Link</p>
//             <input
//               type="text"
//               value={webLink}
//               onChange={(e) => setWebLink(e.target.value)}
//             />
//           </div>

//           <div>
//             <p>Facebook Link</p>
//             <input
//               type="text"
//               value={fbLink}
//               onChange={(e) => setFbLink(e.target.value)}
//             />
//           </div>

//           <div>
//             <p>Instagram Link</p>
//             <input
//               type="text"
//               value={instraLink}
//               onChange={(e) => setInstraLink(e.target.value)}
//             />
//           </div>

//           <div>
//             <p>Twitter Link</p>
//             <input
//               type="text"
//               value={twitterLink}
//               onChange={(e) => setTwitterLink(e.target.value)}
//             />
//           </div>

//           <div>
//             <p>Tiktok Link</p>
//             <input
//               type="text"
//               value={tiktokLink}
//               onChange={(e) => setTiktokLink(e.target.value)}
//             />
//           </div>

//           <div>
//             {
//               editSalonLoading ? <button style={{
//                 display: "grid",
//                 placeItems: "center"
//               }}
//                 className='submit_btn'
//               ><ButtonLoader /></button> : <button onClick={editSalonHandler} className='submit_btn'>Update</button>
//             }

//           </div>

//         </div>
//       </div>

//       {
//         openMobileUpdateModal && <SalonModal setOpenMobileUpdateModal={setOpenMobileUpdateModal}>
//           {
//             salonImages?.map((s) => (
//               <div className={`salon_image_update_item ${darkmodeOn && "dark"}`} key={s._id}>
//                 <div>
//                   <img src={s.url} alt="image" />
//                 </div>
//                 <div>
//                   <div>
//                     <button onClick={() => mobiledeleteImage(s)}>
//                       <div><DeleteIcon /></div>
//                       <p>Delete</p>
//                     </button>
//                     <button onClick={() => handleCurrentMobileEditSalonImageButtonClick(s)}>
//                       <div><EditIcon /></div>
//                       <p>Update</p>

//                       <input
//                         type="file"
//                         ref={mobileEditSalonImageInputRef}
//                         style={{ display: 'none' }}
//                         onChange={(e) => mobileEditSelectedImageFileInputChange(e)}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           }



//         </SalonModal>
//       }

//       {
//         openModal && <Modal setOpenModal={setOpenModal} setOldPassword={setOldPassword} setPassword={setPassword} setConfirmPassword={setConfirmPassword} setSeeOldPassword={setSeeOldPassword} setSeePassword={setSeePassword} setSeeConfirmPassword={setSeeConfirmPassword}>
//           <div>
//             <img src={selectedEditImageObject?.url} alt="salon_image" />
//           </div>
//           <div>
//             <div>
//               <button onClick={() => deleteEditImageHandler(selectedEditImageObject)}>
//                 <div><DeleteIcon /></div>
//                 <p>Delete</p>
//               </button>
//               <button onClick={() => handleCurrentEditSalonImageButtonClick()}>
//                 <div><EditIcon /></div>
//                 <p>Edit</p>

//                 <input
//                   type="file"
//                   ref={currentEditSalonImageInputRef}
//                   style={{ display: 'none' }}
//                   onChange={handleEditSelectedImageFileInputChange}
//                 />
//               </button>
//             </div>
//           </div>
//         </Modal>
//       }
//     </div>
//   )
// }

// export default EditSalon




import React, { useEffect, useRef, useState } from 'react'
import style from "./EditSalon.module.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CameraIcon, ClockIcon, CloseIcon, DeleteIcon, EditIcon, Uploadicon } from '../../../icons';
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux';
import { adminEditSalonAction, getAdminAllCitiesAction, getAdminAllCountriesAction, getAdminAllSalonIconAction, getAdminAllTimezoneAction, getAdminSalonImagesAction, getAdminSalonLogoAction } from '../../../Redux/Admin/Actions/SalonAction';
import api from '../../../Redux/api/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
import toast from 'react-hot-toast';
import { PhoneInput } from 'react-international-phone';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

import { PhoneNumberUtil } from 'google-libphonenumber';

import { ClickAwayListener, Modal } from '@mui/material';
import { adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction';

const EditSalon = () => {

  const dispatch = useDispatch()
  const location = useLocation()

  const currentSalon = location?.state

  const [salonImages, setSalonImages] = useState([])
  const [salonLogo, setSalonLogo] = useState([])

  const getAdminSalonImages = useSelector(state => state.getAdminSalonImages)

  const {
    loading: getAdminSalonImagesLoading,
    resolve: getAdminSalonImagesResolve,
    response: AdminSalonImages
  } = getAdminSalonImages

  const getAdminSalonLogo = useSelector(state => state.getAdminSalonLogo)

  const {
    loading: getAdminSalonLogoLoading,
    resolve: getAdminSalonLogoResolve,
    response: AdminSalonLogo
  } = getAdminSalonLogo

  useEffect(() => {
    if (currentSalon?.salonId) {
      dispatch(getAdminSalonImagesAction(currentSalon?.salonId))
      dispatch(getAdminSalonLogoAction(currentSalon?.salonId))
    }
  }, [currentSalon])

  // console.log("Hurrayy  ", AdminSalonImages)
  // console.log("Salon logo ", AdminSalonLogo)

  useEffect(() => {
    if (AdminSalonImages) {
      setSalonImages(AdminSalonImages)
    }
  }, [AdminSalonImages])

  useEffect(() => {
    if (AdminSalonLogo) {
      setSalonLogo(AdminSalonLogo?.salonLogo[0]?.url)
    }
  }, [AdminSalonLogo])

  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  // const currentsalonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const SalonIconControllerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    SalonIconControllerRef.current = controller;

    dispatch(getAdminAllSalonIconAction(controller.signal));

    return () => {
      if (SalonIconControllerRef.current) {
        SalonIconControllerRef.current.abort();
      }
    };
  }, [dispatch]);

  const getAdminAllSalonIcon = useSelector(state => state.getAdminAllSalonIcon)

  const {
    loading: getAdminAllSalonIconLoading,
    resolve: getAdminAllSalonIconResolve,
    response: SalonIcons
  } = getAdminAllSalonIcon

  const [latitude, setLatitude] = useState(currentSalon?.location.coordinates.latitude);
  const [longitude, setLongitude] = useState(currentSalon?.location.coordinates.longitude);
  const [error, setError] = useState(null);

  const geoLocationHandler = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("You denied access to your geolocation. Please enable it in your browser settings.");
          } else {
            setError("Error accessing geolocation: " + error.message);
          }
        }
      );
    } else {
      setError("Geolocation is not available in your browser.");
    }
  }

  // console.log("Current Salon is ", currentSalon)

  const [salonEmail, setSalonEmail] = useState(currentSalon?.salonEmail)
  const [salonName, setSalonName] = useState(currentSalon?.salonName)
  const [salonDesc, setSalonDesc] = useState(currentSalon?.salonDesc)
  const [address, setAddress] = useState(currentSalon?.address)

  const [postCode, setPostCode] = useState(currentSalon?.postCode)
  const [contactTel, setContactTel] = useState(`${currentSalon?.mobileCountryCode}${currentSalon?.contactTel?.toString()}`)
  const [dialCode, setDialCode] = useState(currentSalon?.mobileCountryCode)
  // currentSalon?.contactTel
  const [webLink, setWebLink] = useState(currentSalon?.webLink)
  const [fbLink, setFbLink] = useState(currentSalon?.fbLink)
  const [twitterLink, setTwitterLink] = useState(currentSalon?.twitterLink)
  const [instraLink, setInstraLink] = useState(currentSalon?.instraLink)
  const [tiktokLink, setTiktokLink] = useState(currentSalon?.tiktokLink)

  const [serviceName, setServiceName] = useState("")
  const [serviceDesc, setServiceDesc] = useState("")
  const [servicePrice, setServicePrice] = useState("")
  const [serviceEWT, setServiceEWT] = useState("")
  const [serviceCode, setServiceCode] = useState("")
  const [serviceId, setServiceId] = useState(0)

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1250 },
      items: 7
    },
    laptop: {
      breakpoint: { max: 1250, min: 768 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 768, min: 430 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 430, min: 0 },
      items: 3
    }
  };


  const [salonType, setSalonType] = useState(currentSalon?.salonType)
  const [salonTypeDrop, setSalonTypeDrop] = useState(false)

  const salonTypeDropHandler = () => {
    setSalonTypeDrop((prev) => !prev)
  }

  const salonTypeHandler = (value) => {
    setSalonType(value)
    setSalonTypeDrop(false)
  }

  const [countryCurrency, setCountryCurrency] = useState(currentSalon?.currency)

  const [country, setCountry] = useState(currentSalon?.country)
  const [countryDrop, setCountryDrop] = useState(false)
  const [countrycode, setCountryCode] = useState("")

  const setCountryHandler = (value) => {
    setCountryCode(value.countryCode)
    setCountry(value.name)
    setCountryCurrency(value.currency)
    setCountryDrop(false)
  }

  const [countryTimeout, setCountryTimeout] = useState(null);

  const debounceSearch = (value) => {
    if (countryTimeout) {
      clearTimeout(countryTimeout);
    }
    setCountry(value)

    setCountryTimeout(setTimeout(() => {
      dispatch(getAdminAllCountriesAction(value));
    }, 500));
  };

  const searchCountryHandler = (e) => {
    const searchTerm = e.target.value;
    setCountryDrop(true)
    debounceSearch(searchTerm);
  }

  const getAdminAllCountries = useSelector(state => state.getAdminAllCountries)

  const {
    loading: getAdminAllCountriesLoading,
    resolve: getAdminAllCountriesResolve,
    response: AllCountries
  } = getAdminAllCountries


  const [city, setCity] = useState(currentSalon?.city)
  const [cityDrop, setCityDrop] = useState(false)

  const setCityHandler = (value) => {
    setCity(value.name)
    setCityDrop(false)
  }

  const [cityTimeout, setCityTimeout] = useState(null);

  const debounceCitySearch = (value, countrycode) => {
    if (cityTimeout) {
      clearTimeout(cityTimeout);
    }

    setCity(value)
    setCityTimeout(setTimeout(() => {
      dispatch(getAdminAllCitiesAction(value, countrycode));
    }, 500));
  };

  const searchCityHandler = (e) => {
    const searchTerm = e.target.value;
    setCityDrop(true)
    debounceCitySearch(searchTerm, countrycode);
  }

  const getAdminAllCities = useSelector(state => state.getAdminAllCities)

  const {
    loading: getAdminAllCitiesLoading,
    resolve: getAdminAllCitiesResolve,
    response: AllCities
  } = getAdminAllCities

  const [timezone, setTimezone] = useState(currentSalon?.timeZone)
  const [timezoneDrop, setTimezoneDrop] = useState(false)

  const timezoneDropHandler = () => {
    setTimezoneDrop((prev) => !prev)
  }

  const setTimezoneHandler = (value) => {
    setTimezone(value)
    setTimezoneDrop(false)
  }

  useEffect(() => {
    if (countrycode) {
      dispatch(getAdminAllTimezoneAction(countrycode))
    }
  }, [countrycode, dispatch])

  const getAdminAllTimezone = useSelector(state => state.getAdminAllTimezone)

  const {
    loading: getAdminAllTimezoneLoading,
    resolve: getAdminAllTimezoneResolve,
    response: AllTimezones
  } = getAdminAllTimezone


  const [vipService, setVipService] = useState(false)
  const [vipServiceDrop, setVipServiceDrop] = useState(false)

  const vipServiceDropHandler = () => {
    setVipServiceDrop((prev) => !prev)
  }

  const vipServiceHandler = (value) => {
    setVipService(value)
    setVipServiceDrop(false)
  }

  const fileInputRef = useRef(null);

  const handleSalonLogoButtonClick = () => {
    fileInputRef.current.click();
  };

  const [uploadSalonLogo, setUploadSalonLogo] = useState("")

  const [editSalonLogoLoader, setEditSalonLogoLoader] = useState(false)

  const handleSalonFileInputChange = async (e) => {
    const uploadImage = e.target.files[0]; // Get the uploaded file

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedTypes.includes(uploadImage.type)) {
      toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (uploadImage.size > maxSizeInBytes) {
      toast.error("File size must be lower than 2mb", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      // e.target.value = null;
      return;
    }

    const imageUrl = URL.createObjectURL(uploadImage);

    const formData = new FormData();

    formData.append('salonId', currentSalon?.salonId);
    formData.append('salonLogo', uploadImage);

    try {

      setEditSalonLogoLoader(true)
      const imageResponse = await api.post('/api/salon/uploadSalonLogo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Salon logo uploaded successfully", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      // console.log('Salon Logo Upload success:', imageResponse.data);
      setSalonLogo(imageUrl)
      setEditSalonLogoLoader(false)

      dispatch(adminGetDefaultSalonAction(email))
    } catch (error) {
      // console.error('Image upload failed:', error);
      toast.error(error?.response?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });

      setEditSalonLogoLoader(false)
    }
  };

  const salonImagefileInputRef = useRef(null);

  const handleSalonImageButtonClick = () => {
    salonImagefileInputRef.current.click();
  };


  const handleSalonImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;
    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];


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
      return;
    }

    const files = Array.from(uploadedFiles);

    const formData = new FormData();
    const SalonId = currentSalon?.salonId;
    formData.append('salonId', SalonId);

    files.forEach(file => formData.append('gallery', file));

    try {
      const { data } = await api.post('/api/salon/uploadSalonImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSalonImages([...data?.response, ...salonImages]);

      toast.success("Salon images uploaded successfully", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };


  const [selectedLogo, setSelectedLogo] = useState({
    url: "",
    public_id: ""
  })

  const logoselectHandler = (serviceImg) => {
    setSelectedLogo({
      url: serviceImg.url,
      public_id: serviceImg.public_id
    });
  }

  const [selectedServices, setSelectedServices] = useState(currentSalon?.services)

  const addServiceHandler = () => {

    if (serviceName === '' || serviceDesc === '' || servicePrice === '' || serviceEWT === '' || selectedLogo.url === "" && selectedLogo.public_id === "") {
      toast.error("Please fill all the services", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const service = {
      serviceIcon: {
        url: selectedLogo.url,
        public_id: selectedLogo.public_id
      },
      serviceName,
      servicePrice: Number(servicePrice),
      vipService,
      serviceDesc,
      serviceEWT: Number(serviceEWT),
      serviceId,
      serviceCode
    }

    setSelectedServices([...selectedServices, service])

    setSelectedLogo({ url: "", public_id: "" })
    setServiceName("")
    setServicePrice("")
    setVipService(false)
    setServiceDesc("")
    setServiceEWT("")
    setServiceCode("")
    setServiceId(0)
  }


  const deleteServiceHandler = (index) => {
    const currentService = selectedServices[index];

    setSelectedLogo({
      url: currentService.serviceIcon.url,
      public_id: currentService.serviceIcon.public_id
    })
    setServiceName(currentService.serviceName)
    setServicePrice(currentService.servicePrice)
    setVipService(currentService.vipService)
    setServiceDesc(currentService.serviceDesc)
    setServiceEWT(currentService.serviceEWT)
    setServiceCode(currentService.serviceCode)
    setServiceId(currentService.serviceId)

    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);

    setSelectedServices(updatedServices);
  }

  const navigate = useNavigate()

  const [invalidnumber, setInvalidNumber] = useState(false)

  const editSalonHandler = () => {
    if (invalidnumber) {
      toast.error("Invalid Number", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      const salondata = {
        adminEmail: email,
        salonEmail,
        salonName,
        salonDesc,
        address,
        location: {
          type: "Point",
          coordinates: {
            longitude: Number(longitude),
            latitude: Number(latitude)
          }
        },
        country,
        city,
        timeZone: timezone,
        postCode,
        contactTel: Number(contactTel),
        countryCode: Number(dialCode),
        salonType,
        webLink,
        fbLink,
        instraLink,
        twitterLink,
        tiktokLink,
        services: selectedServices,
        salonId: currentSalon?.salonId
      }

      console.log(salondata)

      dispatch(adminEditSalonAction(salondata, navigate))
    }

  }

  const adminEditSalon = useSelector(state => state.adminEditSalon)

  const {
    loading: editSalonLoading,
    response: editSalonResponse
  } = adminEditSalon

  const [openModal, setOpenModal] = useState(false)

  const [selectedEditImageObject, setSelectedEditImageObject] = useState({})

  const selectedSalonImageClicked = async (imgObject) => {
    setSelectedEditImageObject(imgObject)
    setOpenModal(true)
  };

  const currentEditSalonImageInputRef = useRef(null);

  const handleCurrentEditSalonImageButtonClick = () => {
    currentEditSalonImageInputRef.current.click();
  };

  const [handleEditSalonLoader, setHandleEditSalonLoader] = useState(false)

  const handleEditSelectedImageFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    if (!allowedTypes.includes(uploadImage.type)) {
      toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (uploadImage.size > maxSizeInBytes) {
      toast.error("File size must be lower than 2mb", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (uploadImage != null) {
      const formData = new FormData();

      formData.append('public_imgid', selectedEditImageObject?.public_id);
      formData.append('id', selectedEditImageObject?._id)
      formData.append('gallery', uploadImage)
      formData.append('salonId', currentSalon?.salonId)

      try {
        setHandleEditSalonLoader(true)
        const { data: responseimage } = await api.put('/api/salon/updateSalonImages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (responseimage) {
          const updatedImages = salonImages.map((image) =>
            image._id === responseimage?.response?._id
              ? { ...image, public_id: responseimage?.response?.public_id, url: responseimage?.response?.url, _id: responseimage?.response?._id }
              : image
          );
          setSalonImages(updatedImages);
          setOpenModal(false)
        }

        toast.success("Image updated successfully", {
          duration: 3000,
          style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setHandleEditSalonLoader(false)
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          duration: 3000,
          style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setHandleEditSalonLoader(false)
      }
    }
  }

  const deleteEditImageHandler = async (imgObj) => {
    if (window.confirm("Are you sure ?")) {
      try {
        const { data: responseimage } = await api.delete("/api/salon/deleteSalonImages", {
          data: {
            public_id: imgObj?.public_id,
            img_id: imgObj?._id
          }
        })

        setSalonImages((images) => images.filter((image) => image._id !== responseimage?.response?._id))
        setOpenModal(false)

        toast.success("Image deleted successfully", {
          duration: 3000,
          style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

      } catch (error) {
        toast.error(error?.response?.data?.message, {
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
  }

  const [openServices, setOpenServices] = useState(false)


  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const [openMobileUpdateModal, setOpenMobileUpdateModal] = useState(false)


  const mobiledeleteImage = async (imgObj) => {
    if (window.confirm("Are you sure ?")) {
      try {
        const { data: responseimage } = await api.delete("/api/salon/deleteSalonImages", {
          data: {
            public_id: imgObj?.public_id,
            img_id: imgObj?._id
          }
        })

        setSalonImages((images) => images.filter((image) => image._id !== responseimage?.response?._id))

        toast.success("Image deleted successfully", {
          duration: 3000,
          style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

      } catch (error) {
        toast.error(error?.response?.data?.message, {
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
  }

  const [selectedMobileEditImageObject, setSelectedMobileEditImageObject] = useState({})

  const mobileEditSalonImageInputRef = useRef(null);

  const handleCurrentMobileEditSalonImageButtonClick = (imgObj) => {

    mobileEditSalonImageInputRef.current.click();
    setSelectedMobileEditImageObject(imgObj)
  };

  const [mobileEditSelectedimageLoader, setMobileEditSelectedImageLoader] = useState(false)

  const mobileEditSelectedImageFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    if (!allowedTypes.includes(uploadImage.type)) {
      alert("Please upload a valid image file (JPEG, WebP, PNG).");
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (uploadImage.size > maxSizeInBytes) {
      toast.error("File size must be lower than 2mb", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (uploadImage != null) {
      const formData = new FormData();

      formData.append('public_imgid', selectedMobileEditImageObject?.public_id);
      formData.append('id', selectedMobileEditImageObject?._id)
      formData.append('gallery', uploadImage)
      formData.append('salonId', currentSalon?.salonId)

      try {

        setMobileEditSelectedImageLoader(selectedMobileEditImageObject._id);

        const { data: responseimage } = await api.put('/api/salon/updateSalonImages', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (responseimage) {
          const updatedImages = salonImages.map((image) =>
            image._id === responseimage?.response?._id
              ? { ...image, public_id: responseimage?.response?.public_id, url: responseimage?.response?.url, _id: responseimage?.response?._id }
              : image
          );
          setSalonImages(updatedImages);
        }

        toast.success("Image updated successfully", {
          duration: 3000,
          style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

        setMobileEditSelectedImageLoader(null);

      } catch (error) {
        toast.error(error?.response?.data?.message, {
          duration: 3000,
          style: {
            fontSize: "1.4rem",
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });

        setMobileEditSelectedImageLoader(null);
      }
    }
  }

  const addservicedropHandler = () => {
    if (country == "") {
      toast.error("Please select a country", {
        duration: 3000,
        style: {
          fontSize: "1.4rem",
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      setOpenServices((prev) => !prev)
    }

  }

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const handlePhoneChange = (phone, meta) => {
    const { country, inputValue } = meta;

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setContactTel(phone)
      setDialCode(country?.dialCode)
      setInvalidNumber(false)
    } else {
      setInvalidNumber(true)
    }
  };

  return (
    <div className={`${style.edit_salon_wrapper} ${darkmodeOn && style.dark}`}>
      <div><p>Edit Salon</p></div>
      <div className={`${style.edit_salon_content_wrapper} ${darkmodeOn && style.dark}`}>
        <div>
          <div>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="100%">
              <rect fill="#ffffff" width="540" height="450"></rect>
              <defs>
                <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                  <stop offset="0" stop-color="#ffffff"></stop>
                  <stop offset="1" stop-color="var(--primary-bg-color3)"></stop>
                </linearGradient>
                <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                  <g fill-opacity="0.5">
                    <polygon fill="#444" points="90 150 0 300 180 300"></polygon>
                    <polygon points="90 150 180 0 0 0"></polygon>
                    <polygon fill="#AAA" points="270 150 360 0 180 0"></polygon>
                    <polygon fill="#DDD" points="450 150 360 300 540 300"></polygon>
                    <polygon fill="#999" points="450 150 540 0 360 0"></polygon>
                    <polygon points="630 150 540 300 720 300"></polygon>
                    <polygon fill="#DDD" points="630 150 720 0 540 0"></polygon>
                    <polygon fill="#444" points="810 150 720 300 900 300"></polygon>
                    <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
                    <polygon fill="#DDD" points="990 150 900 300 1080 300"></polygon>
                    <polygon fill="#444" points="990 150 1080 0 900 0"></polygon>
                    <polygon fill="#DDD" points="90 450 0 600 180 600"></polygon>
                    <polygon points="90 450 180 300 0 300"></polygon>
                    <polygon fill="#666" points="270 450 180 600 360 600"></polygon>
                    <polygon fill="#AAA" points="270 450 360 300 180 300"></polygon>
                    <polygon fill="#DDD" points="450 450 360 600 540 600"></polygon>
                    <polygon fill="#999" points="450 450 540 300 360 300"></polygon>
                    <polygon fill="#999" points="630 450 540 600 720 600"></polygon>
                    <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
                    <polygon points="810 450 720 600 900 600"></polygon>
                    <polygon fill="#DDD" points="810 450 900 300 720 300"></polygon>
                    <polygon fill="#AAA" points="990 450 900 600 1080 600"></polygon>
                    <polygon fill="#444" points="990 450 1080 300 900 300"></polygon>
                    <polygon fill="#222" points="90 750 0 900 180 900"></polygon>
                    <polygon points="270 750 180 900 360 900"></polygon>
                    <polygon fill="#DDD" points="270 750 360 600 180 600"></polygon>
                    <polygon points="450 750 540 600 360 600"></polygon>
                    <polygon points="630 750 540 900 720 900"></polygon>
                    <polygon fill="#444" points="630 750 720 600 540 600"></polygon>
                    <polygon fill="#AAA" points="810 750 720 900 900 900"></polygon>
                    <polygon fill="#666" points="810 750 900 600 720 600"></polygon>
                    <polygon fill="#999" points="990 750 900 900 1080 900"></polygon>
                    <polygon fill="#999" points="180 0 90 150 270 150"></polygon>
                    <polygon fill="#444" points="360 0 270 150 450 150"></polygon>
                    <polygon fill="#FFF" points="540 0 450 150 630 150"></polygon>
                    <polygon points="900 0 810 150 990 150"></polygon>
                    <polygon fill="#222" points="0 300 -90 450 90 450"></polygon>
                    <polygon fill="#FFF" points="0 300 90 150 -90 150"></polygon>
                    <polygon fill="#FFF" points="180 300 90 450 270 450"></polygon>
                    <polygon fill="#666" points="180 300 270 150 90 150"></polygon>
                    <polygon fill="#222" points="360 300 270 450 450 450"></polygon>
                    <polygon fill="#FFF" points="360 300 450 150 270 150"></polygon>
                    <polygon fill="#444" points="540 300 450 450 630 450"></polygon>
                    <polygon fill="#222" points="540 300 630 150 450 150"></polygon>
                    <polygon fill="#AAA" points="720 300 630 450 810 450"></polygon>
                    <polygon fill="#666" points="720 300 810 150 630 150"></polygon>
                    <polygon fill="#FFF" points="900 300 810 450 990 450"></polygon>
                    <polygon fill="#999" points="900 300 990 150 810 150"></polygon>
                    <polygon points="0 600 -90 750 90 750"></polygon>
                    <polygon fill="#666" points="0 600 90 450 -90 450"></polygon>
                    <polygon fill="#AAA" points="180 600 90 750 270 750"></polygon>
                    <polygon fill="#444" points="180 600 270 450 90 450"></polygon>
                    <polygon fill="#444" points="360 600 270 750 450 750"></polygon>
                    <polygon fill="#999" points="360 600 450 450 270 450"></polygon>
                    <polygon fill="#666" points="540 600 630 450 450 450"></polygon>
                    <polygon fill="#222" points="720 600 630 750 810 750"></polygon>
                    <polygon fill="#FFF" points="900 600 810 750 990 750"></polygon>
                    <polygon fill="#222" points="900 600 990 450 810 450"></polygon>
                    <polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon>
                    <polygon fill="#444" points="180 900 270 750 90 750"></polygon>
                    <polygon fill="#FFF" points="360 900 450 750 270 750"></polygon>
                    <polygon fill="#AAA" points="540 900 630 750 450 750"></polygon>
                    <polygon fill="#FFF" points="720 900 810 750 630 750"></polygon>
                    <polygon fill="#222" points="900 900 990 750 810 750"></polygon>
                    <polygon fill="#222" points="1080 300 990 450 1170 450"></polygon>
                    <polygon fill="#FFF" points="1080 300 1170 150 990 150"></polygon>
                    <polygon points="1080 600 990 750 1170 750"></polygon>
                    <polygon fill="#666" points="1080 600 1170 450 990 450"></polygon>
                    <polygon fill="#DDD" points="1080 900 1170 750 990 750"></polygon>
                  </g>
                </pattern>
              </defs>
              <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
              <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
            </svg></div>

            <div className={style.edit_salon_logo_container}>
              {
                editSalonLogoLoader ?
                  <div>
                    <Skeleton
                      height={"13rem"}
                      width={"13rem"}
                      style={{ borderRadius: "50%" }}
                    /></div> :
                  <div>
                    <img src={`${salonLogo}`} alt="" />
                    <div>
                      <button onClick={() => handleSalonLogoButtonClick()} className={style.upload_profile_logo_btn}><CameraIcon /></button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleSalonFileInputChange}
                      />
                    </div>
                  </div>
              }

            </div>

            <div>
              <p>{salonName}</p>
              <p><span>{city}</span>{city && ",  "}<span>{country}</span></p>
            </div>
          </div>

          <div>
            <p>Gallery</p>
            <button
              className={style.salon_upload_button}
              onClick={() => handleSalonImageButtonClick()}
            >

              <p>Upload</p>
              <div><Uploadicon /></div>

              <input
                type="file"
                ref={salonImagefileInputRef}
                style={{ display: 'none' }}
                multiple
                onChange={handleSalonImageFileInputChange}
              />
            </button>
          </div>

          <div>
            {
              salonImages.map((s, index) => (
                <div key={index} onClick={() => selectedSalonImageClicked(s)} style={{ cursor: "pointer" }}><img src={s.url} alt="" /></div>
              ))
            }
          </div>

        </div>

        <div>
          <div>
            <p>Salon Name</p>
            <input
              type="text"
              value={salonName}
              onChange={(e) => setSalonName(e.target.value)}
            />
          </div>

          <div>
            <p>Salon Email</p>
            <input
              type="text"
              value={salonEmail}
              readOnly
            // onChange={(e) => setSalonEmail(e.target.value)}
            />
          </div>

          <div>
            <p>Salon Desc</p>
            <input
              type="text"
              value={salonDesc}
              onChange={(e) => setSalonDesc(e.target.value)}
            />
          </div>

          <div>
            <p>Address</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <div>
              <p>Latitude</p>
              <input
                type="number"
                value={latitude}
                readOnly
              />
            </div>

            <div>
              <p>Longitude</p>
              <input
                type="number"
                value={longitude}
                readOnly
              />
            </div>
          </div>

          <div>
            <button onClick={geoLocationHandler}>Get Geolocation</button>
          </div>

          <div>
            <div>
              <p>Country</p>
              <input
                type="text"
                value={country}
                readOnly
              // onChange={(e) => searchCountryHandler(e)}
              />

              {/* {countryDrop && <ClickAwayListener onClickAway={() => setCountryDrop(false)}><div>
                {
                  getAdminAllCountriesLoading && !getAdminAllCountriesResolve ?
                    <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
                    !getAdminAllCountriesLoading && getAdminAllCountriesResolve && AllCountries?.length > 0 ?

                      AllCountries.map((c) => (
                        <p key={c._id} onClick={() => setCountryHandler(c)}>{c.name}</p>
                      ))

                      :
                      !getAdminAllCountriesLoading && getAdminAllCountriesResolve && AllCountries?.length == 0 ?
                        <p>No Countries</p> :
                        !getAdminAllCountriesLoading && !getAdminAllCountriesResolve &&
                        <p>No Countries</p>
                }
              </div></ClickAwayListener>} */}

            </div>

            <div>
              <p>City</p>
              <input
                type="text"
                value={city}
                readOnly
              // onChange={(e) => searchCityHandler(e)}
              />

              {/* {cityDrop && <ClickAwayListener onClickAway={() => setCityDrop(false)}><div>
                {
                  getAdminAllCitiesLoading && !getAdminAllCitiesResolve ?
                    <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
                    !getAdminAllCitiesLoading && getAdminAllCitiesResolve && AllCities?.length > 0 ?

                      AllCities.map((c) => (
                        <p key={c._id} onClick={() => setCityHandler(c)}>{c.name}</p>
                      ))

                      :
                      !getAdminAllCitiesLoading && getAdminAllCitiesResolve && AllCities?.length == 0 ?
                        <p>No Cities</p> :
                        !getAdminAllCitiesLoading && !getAdminAllCitiesResolve &&
                        <p>No Cities</p>
                }
              </div></ClickAwayListener>} */}
            </div>
          </div>

          <div>
            <div>
              <p>Time Zone</p>
              <input
                type="text"
                value={timezone}
                readOnly
              // onClick={() => timezoneDropHandler()}
              />

              {/* {timezoneDrop &&
                <ClickAwayListener onClickAway={() => setTimezoneDrop(false)}>
                  <div>
                    {
                      getAdminAllTimezoneLoading && !getAdminAllTimezoneResolve ?
                        <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
                        !getAdminAllTimezoneLoading && getAdminAllTimezoneResolve && AllTimezones?.length > 0 ?

                          AllTimezones.map((c) => (
                            <p key={c._id} onClick={() => setTimezoneHandler(c)}>{c}</p>
                          ))

                          :
                          !getAdminAllTimezoneLoading && getAdminAllTimezoneResolve && AllTimezones?.length == 0 ?
                            <p>No Timezone</p> :
                            !getAdminAllTimezoneLoading && !getAdminAllTimezoneResolve &&
                            <p>No Timezone</p>
                    }
                  </div>
                </ClickAwayListener>} */}
            </div>

            <div>
              <p>Post Code</p>
              <input
                type="text"
                value={postCode}
                readOnly
              // onChange={(e) => setPostCode(e.target.value)}
              />
            </div>
          </div>

          <div />

          <div>
            <p>Salon Type</p>
            <input
              type="text"
              value={`${salonType ? `${salonType}` : ''}`}
              onClick={() => salonTypeDropHandler()}
              className={style.salontype_input}
            />

            {salonTypeDrop &&
              <ClickAwayListener onClickAway={() => setSalonTypeDrop(false)}>
                <div>
                  <p onClick={() => salonTypeHandler("Barber Shop")}>Barber Shop</p>
                  <p onClick={() => salonTypeHandler("Hair Dresser")}>Hair Dresser</p>
                </div>
              </ClickAwayListener>}
          </div>

          <div>
            <p>Mobile Number</p>
            <div className={`${style.salon_mobile_input} ${darkmodeOn && style.dark}`}>
              <div>
                <PhoneInput
                  forceDialCode={true}
                  defaultCountry="gb"
                  value={contactTel}
                  onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                />
              </div>

            </div>
          </div>

          <div className={style.add_services_drop}>
            <p>Add Your Services</p>
            <button
              onClick={addservicedropHandler}
              className={openServices ? style.add_services_btn_inactive : style.add_services_btn_active}
            >{openServices ? "-" : "+"}</button>
          </div>

          {
            openServices &&
            <main className={`${style.add_services_drop_container} ${darkmodeOn && style.dark}`}>
              <p>Choose your service icon:</p>
              <div>
                <div>
                  {
                    getAdminAllSalonIconLoading && !getAdminAllSalonIconResolve ?
                      <div className={style.create_salon_carousel_loader}>
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                      </div> :
                      !getAdminAllSalonIconLoading && getAdminAllSalonIconResolve && SalonIcons?.length > 0 ?
                        <Carousel
                          responsive={responsive}
                          draggable={false}
                          swipeable={false}
                        >
                          {
                            SalonIcons?.map((s) => (
                              <div key={s._id} className={style.slider_item} onClick={() => logoselectHandler(s)}
                                style={{
                                  border: selectedLogo?.url === s.url ? "3px solid var(--primary-bg-color3)" : "1px solid black"
                                }}
                              >
                                <img src={s.url} alt="" />
                              </div>
                            ))
                          }
                        </Carousel> :
                        !getAdminAllSalonIconLoading && getAdminAllSalonIconResolve && SalonIcons?.length == 0 ?
                          <p>No Salon Icons Available</p> :
                          !getAdminAllSalonIconLoading && !getAdminAllSalonIconResolve &&
                          <p>No Salon Icons Available</p>
                  }

                </div>
              </div>

              <div>
                <p>Service Name</p>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </div>

              <div>
                <p>Service Desc</p>
                <input
                  type="text"
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                />
              </div>

              <div>
                <p>Service Type (*VIP services have top priority in queue)</p>
                <input
                  type="text"
                  value={`${vipService ? 'VIP' : 'Regular'}`}
                  onClick={() => vipServiceDropHandler()}
                />

                {vipServiceDrop &&
                  <ClickAwayListener onClickAway={() => setVipServiceDrop(false)}>
                    <div className={style.service_type_dropdown_container}>
                      <p onClick={() => vipServiceHandler(false)}>Regular</p>
                      <p onClick={() => vipServiceHandler(true)}>VIP</p>
                    </div>
                  </ClickAwayListener>}
              </div>

              <div>
                <div>
                  <p>Service Price</p>
                  <input
                    type="text"
                    value={servicePrice}
                    // onChange={(e) => setServicePrice(e.target.value)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setServicePrice(value);
                      }
                    }}
                  />
                </div>

                <div>
                  <p>Est Wait Tm(mins)</p>
                  <input
                    type="text"
                    value={serviceEWT}
                    // onChange={(e) => setServiceEWT(e.target.value)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setServiceEWT(value);
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <button onClick={addServiceHandler} className={style.add_service_btn}>Add Service</button>
              </div>

              <div className={`${style.service_container} ${darkmodeOn && style.dark}`}>

                {
                  selectedServices?.map((ser, index) => {
                    return (
                      <div className={`${style.service_item}`} key={index}>
                        <div className={`${style.service_item_top}`}>
                          <div><img src={ser.serviceIcon.url ? ser.serviceIcon.url : ""} alt="service icon" /></div>
                          <div>
                            <p>{ser.serviceName}</p>
                            <p>{ser.vipService ? "VIP" : "Regular"}</p>
                            <p>{ser.serviceDesc}</p>
                          </div>
                        </div>

                        <div className={`${style.service_item_bottom}`}>
                          <div>
                            <div>
                              <p>Service Price</p>
                              <p>{countryCurrency}{" "} {ser.servicePrice}</p>
                            </div>
                          </div>

                          <div>
                            <div>
                              <p>Est Wait Time</p>
                              <div>
                                <div><ClockIcon /></div>
                                <p>{ser.serviceEWT} mins</p>
                              </div>
                            </div>
                          </div>

                        </div>


                        <button className={`${style.service_delete_icon}`} onClick={() => deleteServiceHandler(index)}><DeleteIcon /></button>
                      </div>
                    )
                  })
                }

              </div>
            </main>
          }


          <div className={`${style.salon_logo_wrapper} ${darkmodeOn && style.dark}`}>
            <p>Select Salon Logo</p>
            <div>
              <button onClick={() => handleSalonLogoButtonClick()}>
                Upload
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleSalonFileInputChange}
                />
              </button>

              <div>{uploadSalonLogo?.name}</div>
            </div>
          </div>


          <div
            className={`${style.salon_images_wrapper} ${darkmodeOn && style.dark}`}
          >
            <div>
              <p>Select Salon Images</p>

              <button onClick={() => handleSalonImageButtonClick()}>
                Upload
                <input
                  type="file"
                  ref={salonImagefileInputRef}
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleSalonImageFileInputChange}
                />
              </button>
            </div>

            <div>
              <p>Update Salon Images</p>

              <button onClick={() => setOpenMobileUpdateModal(true)}>
                Update
              </button>
            </div>

          </div>

          <div>
            <p>Web Link</p>
            <input
              type="text"
              value={webLink}
              onChange={(e) => setWebLink(e.target.value)}
            />
          </div>

          <div>
            <p>Facebook Link</p>
            <input
              type="text"
              value={fbLink}
              onChange={(e) => setFbLink(e.target.value)}
            />
          </div>

          <div>
            <p>Instagram Link</p>
            <input
              type="text"
              value={instraLink}
              onChange={(e) => setInstraLink(e.target.value)}
            />
          </div>

          <div>
            <p>Twitter Link</p>
            <input
              type="text"
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
            />
          </div>

          <div>
            <p>Tiktok Link</p>
            <input
              type="text"
              value={tiktokLink}
              onChange={(e) => setTiktokLink(e.target.value)}
            />
          </div>

          <div>
            {
              editSalonLoading ? <button style={{
                display: "grid",
                placeItems: "center"
              }}
                className={style.edit_salon_btn}
              ><ButtonLoader /></button> : <button onClick={editSalonHandler} className={style.edit_salon_btn}>Update</button>
            }

          </div>

        </div>
      </div>

      <Modal
        open={openMobileUpdateModal}
        onClose={() => setOpenMobileUpdateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.mobile_modal_container}>
          <div>
            <p>Salon Images</p>
            <button onClick={() => setOpenMobileUpdateModal(false)}><CloseIcon /></button>
          </div>

          <div className={style.mobile_modal_content_container}>
            {
              salonImages?.map((s) => (
                <div className={`${style.salon_image_update_item} ${darkmodeOn && style.dark}`} key={s._id}>
                  {
                    mobileEditSelectedimageLoader === s._id ?
                      <div><Skeleton width={"100%"} height={"100%"} /></div> :
                      <div>
                        <img src={s.url} alt="image" />
                      </div>
                  }

                  <div>
                    <button onClick={() => mobiledeleteImage(s)}>
                      <div><DeleteIcon /></div>
                      <p>Delete</p>
                    </button>

                    <button
                      disabled={mobileEditSelectedimageLoader === s._id}
                      onClick={() => handleCurrentMobileEditSalonImageButtonClick(s)}>
                      <div><EditIcon /></div>
                      <p>Update</p>

                      <input
                        type="file"
                        ref={mobileEditSalonImageInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => mobileEditSelectedImageFileInputChange(e)}
                      />
                    </button>

                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Modal>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modal_container}>
          <div>
            <p>Selected Image</p>
            <button onClick={() => setOpenModal(false)}><CloseIcon /></button>
          </div>

          <div className={style.modal_content_container}>
            {
              handleEditSalonLoader ?
                <div><Skeleton width={"100%"} height={"100%"} /></div> :
                <div><img src={selectedEditImageObject?.url} alt="salon image" /></div>
            }

            <div>
              <div>
                <button
                  onClick={() => handleCurrentEditSalonImageButtonClick()}
                  disabled={handleEditSalonLoader}
                >
                  <div><EditIcon /></div>
                  <p>Update</p>

                  <input
                    type="file"
                    ref={currentEditSalonImageInputRef}
                    style={{ display: 'none' }}
                    onChange={handleEditSelectedImageFileInputChange}
                  />
                </button>
                <button onClick={() => deleteEditImageHandler(selectedEditImageObject)}>
                  <div><DeleteIcon /></div>
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default EditSalon


