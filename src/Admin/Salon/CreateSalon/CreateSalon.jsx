// import React, { useEffect, useRef, useState } from 'react'
// import style from "./CreateSalon.module.css"
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { CameraIcon, ClockIcon, CloseIcon, DeleteIcon, DropdownIcon, EditIcon, SearchIcon, Uploadicon } from '../../../icons';
// import Skeleton from 'react-loading-skeleton'
// import { useDispatch, useSelector } from 'react-redux';
// import { adminCreateSalonAction, getAdminAllCitiesAction, getAdminAllCountriesAction, getAdminAllSalonIconAction, getAdminAllTimezoneAction } from '../../../Redux/Admin/Actions/SalonAction';
// import api from '../../../Redux/api/Api';
// import { useNavigate } from 'react-router-dom';
// import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
// import { ADMIN_GET_ALL_CITIES_SUCCESS, ADMIN_GET_ALL_TIMEZONES_SUCCESS, GET_ADMIN_SALONLIST_SUCCESS } from '../../../Redux/Admin/Constants/constants';
// import toast from 'react-hot-toast';
// import { PhoneInput } from 'react-international-phone';
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

// import { PhoneNumberUtil } from 'google-libphonenumber';
// import { ClickAwayListener, Modal } from '@mui/material';
// import { adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction';

// const CreateSalon = () => {

//   const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
//   const dispatch = useDispatch()

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

//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [error, setError] = useState(null);

//   const geoLocationHandler = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           setLatitude(latitude);
//           setLongitude(longitude);
//           const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

//           localStorage.setItem("salondata", JSON.stringify({
//             ...existingData,
//             latitude: latitude,
//             longitude: longitude
//           }));

//           setSalonCoordinateError("")
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

//   const [salonEmail, setSalonEmail] = useState("")
//   const [salonName, setSalonName] = useState("")
//   const [salonDesc, setSalonDesc] = useState("")
//   const [address, setAddress] = useState("")

//   const [postCode, setPostCode] = useState("")
//   const [contactTel, setContactTel] = useState("")
//   const [dialCode, setDialCode] = useState("")

//   const [webLink, setWebLink] = useState("")
//   const [fbLink, setFbLink] = useState("")
//   const [twitterLink, setTwitterLink] = useState("")
//   const [instraLink, setInstraLink] = useState("")
//   const [tiktokLink, setTiktokLink] = useState("")

//   const [serviceName, setServiceName] = useState("")
//   const [serviceDesc, setServiceDesc] = useState("")
//   const [servicePrice, setServicePrice] = useState("")
//   const [serviceEWT, setServiceEWT] = useState("")

//   const responsive = {
//     superLargeDesktop: {
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


//   const [salonType, setSalonType] = useState("")
//   const [salonTypeDrop, setSalonTypeDrop] = useState(false)

// const [salonNameError, setSalonNameError] = useState("")
// const [salonEmailError, setSalonEmailError] = useState("")
// const [salonDescError, setSalonDescError] = useState("")
//   const [salonAddressError, setSalonAddressError] = useState("")
//   const [salonCoordinateError, setSalonCoordinateError] = useState("")
//   const [countryError, setCountryError] = useState("")
//   const [cityError, setCityError] = useState("")
//   const [timezoneError, setTimezoneError] = useState("")
//   const [postCodeError, setPostCodeError] = useState("")
//   const [salonTypeError, setSalonTypeError] = useState("")
//   const [invalidNumberError, setInvalidNumberError] = useState("")

//   const [serviceIconError, setServiceIconError] = useState("")
//   const [serviceNameError, setServiceNameError] = useState("")
//   const [serviceDescError, setServiceDescError] = useState("")
//   const [servicePriceError, setServicePriceError] = useState("")
//   const [serviceEwtError, setServiceEwtError] = useState("")

//   const [fblinkError, setFbLinkError] = useState("")
//   const [weblinkError, setWebLinkError] = useState("")
//   const [instalinkError, setInstaLinkError] = useState("")
//   const [twitterlinkError, setTwitterLinkError] = useState("")
//   const [tiktoklinkError, setTiktokLinkError] = useState("")


//   const salonTypeDropHandler = () => {
//     setSalonTypeDrop((prev) => !prev)
//   }

//   const salonTypeHandler = (value) => {
//     setSalonType(value);

//     const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

//     localStorage.setItem("salondata", JSON.stringify({
//       ...existingData,
//       salonType: value
//     }));
//     setSalonTypeError("")
//     setSalonTypeDrop(false)
//   }

//   const [localsalondata, setLocalSalondata] = useState({})

//   const [countryCurrency, setCountryCurrency] = useState("")

//   const [country, setCountry] = useState("")
//   const [countryDrop, setCountryDrop] = useState(false)
//   const [countrycode, setCountryCode] = useState("")

//   const setCountryHandler = (value) => {

//     setCountryCode(value.countryCode)
//     setCountry(value.name)
//     setCountryCurrency(value.currency)
//     setCountryDrop(false)
//     setCountryError("")
//   }


//   const getAdminAllCountries = useSelector(state => state.getAdminAllCountries)

//   useEffect(() => {
//     dispatch(getAdminAllCountriesAction(""));
//   }, [])

//   const {
//     loading: getAdminAllCountriesLoading,
//     resolve: getAdminAllCountriesResolve,
//     error: getAdminAllCountriesError,
//     response: AllCountries
//   } = getAdminAllCountries

//   const [copyCountriesdata, setCopyCountriesdata] = useState([])

//   useEffect(() => {
//     if (AllCountries) {
//       setCopyCountriesdata(AllCountries)
//     }
//   }, [AllCountries])

//   const [searchCountry, setSearchCountry] = useState("")

//   const searchCountryHandler = (value) => {
//     setSearchCountry(value)
//     const searchValue = value.toLowerCase().trim()

//     if (!searchCountry) {
//       setCopyCountriesdata(AllCountries)
//     } else {
//       const filteredCountries = AllCountries.filter((country) => {
//         return country.name.toLowerCase().includes(searchValue)
//       })

//       setCopyCountriesdata(filteredCountries)
//     }
//   }


//   const [city, setCity] = useState("")
//   const [cityDrop, setCityDrop] = useState(false)

//   const setCityHandler = (value) => {
//     setCity(value.name)
//     setCityDrop(false)
//     setCityError("")
//   }

//   const [countryCodePresent, setCountryCodePresent] = useState(false)

//   useEffect(() => {
//     if (countrycode) {
//       dispatch(getAdminAllCitiesAction("", countrycode));
//       dispatch(getAdminAllTimezoneAction(countrycode))
//       setCountryCodePresent(true)
//     }
//   }, [countrycode, dispatch])

//   const getAdminAllCities = useSelector(state => state.getAdminAllCities)

//   const {
//     loading: getAdminAllCitiesLoading,
//     resolve: getAdminAllCitiesResolve,
//     response: AllCities,
//     error: getAdminAllCitiesError,
//   } = getAdminAllCities



//   const [copyCitiesData, setCopyCitiesData] = useState([]);
//   const [searchCity, setSearchCity] = useState("");

//   useEffect(() => {
//     if (AllCities) {
//       setCopyCitiesData(AllCities);
//     }
//   }, [AllCities]);

//   const searchCityHandler = (value) => {
//     setSearchCity(value);
//     const searchValue = value.toLowerCase().trim();

//     if (!searchValue) {
//       setCopyCitiesData(AllCities);
//     } else {
//       const filteredCities = AllCities.filter((city) =>
//         city.name.toLowerCase().includes(searchValue)
//       );
//       setCopyCitiesData(filteredCities);
//     }
//   };


//   const [timezone, setTimezone] = useState("")
//   const [timezoneDrop, setTimezoneDrop] = useState(false)

//   const timezoneDropHandler = () => {
//     setTimezoneDrop((prev) => !prev)
//   }

//   const setTimezoneHandler = (value) => {

//     setTimezone(value)
//     setTimezoneDrop(false)
//     setTimezoneError("")
//   }


//   const getAdminAllTimezone = useSelector(state => state.getAdminAllTimezone)

//   const {
//     loading: getAdminAllTimezoneLoading,
//     resolve: getAdminAllTimezoneResolve,
//     response: AllTimezones
//   } = getAdminAllTimezone


//   const [vipService, setVipService] = useState(false)
//   const [vipServiceDrop, setVipServiceDrop] = useState(false)

//   const vipServiceDropHandler = () => {
//     setVipServiceDrop((prev) => !prev)
//   }

//   const vipServiceHandler = (value) => {
//     setVipService(value)
//     setVipServiceDrop(false)
//   }


//   const [salonLogo, setSalonLogo] = useState("")


//   const fileInputRef = useRef(null);

//   const handleSalonLogoButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   const [uploadSalonLogo, setUploadSalonLogo] = useState("")



//   const handleSalonFileInputChange = async (e) => {
//     const uploadImage = e.target.files[0];

//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
//     if (!allowedTypes.includes(uploadImage.type)) {
//       toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     // Check if the image size exceeds 2MB (2 * 1024 * 1024 bytes)
//     const maxSizeInBytes = 2 * 1024 * 1024;
//     if (uploadImage.size > maxSizeInBytes) {
//       toast.error("File size must be lower than 2mb", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     const imageUrl = URL.createObjectURL(uploadImage);

//     setSalonLogo(imageUrl);
//     setUploadSalonLogo(uploadImage);
//   };


//   const [salonImages, setSalonImages] = useState([])

//   const salonImagefileInputRef = useRef(null);

//   const handleSalonImageButtonClick = () => {
//     salonImagefileInputRef.current.click();
//   };

//   const handleSalonImageFileInputChange = async (e) => {
//     const uploadedFiles = e.target.files;
//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
//     const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
//     const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

//     const invalidFiles = Array.from(uploadedFiles).filter(file =>
//       !allowedTypes.includes(file.type) || file.size > maxSizeInBytes
//     );

//     if (invalidFiles.length > 0) {
//       toast.error("Please upload only valid image files (JPEG, WebP, PNG) under 2MB.", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     const urls = Array.from(uploadedFiles).map((file) => {
//       const blobUrl = URL.createObjectURL(file);
//       const _id = generateUniqueId();
//       return { _id, blobUrl, name: file.name };
//     });

//     setSalonImages([...salonImages, ...urls]);
//   };


//   const [selectedLogo, setSelectedLogo] = useState({
//     url: "",
//     public_id: ""
//   })

//   const logoselectHandler = (serviceImg) => {
//     setServiceIconError("")
//     setSelectedLogo({
//       url: serviceImg.url,
//       public_id: serviceImg.public_id
//     });
//   }

//   const [selectedServices, setSelectedServices] = useState([])


//   const addServiceHandler = () => {

//     if (!selectedLogo.url) {
//       toast.error("Please select service icon", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServiceIconError("Please select service icon")
//     }

//     if (!serviceName) {
//       toast.error("Please enter service name", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServiceNameError("Please enter service name")
//     }

//     if (serviceName.length < 1 || serviceName.length > 25) {
//       toast.error("Service name must be between 1 to 25 charecters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setServiceNameError("Service Name must be between 1 to 25 charecters")
//     }

//     if (!serviceDesc) {
//       toast.error("Please enter service description", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServiceDescError("Please enter service description")
//     }

//     if (serviceDesc.length < 1 || serviceDesc.length > 50) {
//       toast.error("Service description must be between 1 to 50 charecters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServiceDescError("Service description must be between 1 to 50 charecters")
//     }

//     if (!servicePrice) {
//       toast.error("Please enter service price", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServicePriceError("Please enter service price")
//     }

//     if (!serviceEWT) {
//       toast.error("Please enter service EWT", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServiceEwtError("Please enter service EWT")
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
//       serviceEWT: Number(serviceEWT)
//     }

//     setSelectedServices([...selectedServices, service])

//     const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

//     localStorage.setItem("salondata", JSON.stringify({
//       ...existingData,
//       selectedServices: [
//         ...(localsalondata?.selectedServices ? localsalondata.selectedServices : selectedServices),
//         service
//       ]
//     }));
//     setSelectedLogo({ url: "", public_id: "" })
//     setServiceName("")
//     setServicePrice("")
//     setVipService(false)
//     setServiceDesc("")
//     setServiceEWT("")

//   }

//   const handleKeyPressAddServices = (e) => {
//     if (e.key === "Enter") {
//       addServiceHandler();
//     }
//   };

//   const deleteServiceHandler = (index) => {
//     const currentService = localsalondata.selectedServices[index];

//     setSelectedLogo({
//       url: currentService.serviceIcon.url,
//       public_id: currentService.serviceIcon.public_id
//     });
//     setServiceName(currentService.serviceName);
//     setServicePrice(currentService.servicePrice);
//     setVipService(currentService.vipService);
//     setServiceDesc(currentService.serviceDesc);
//     setServiceEWT(currentService.serviceEWT);

//     const updatedServices = [...localsalondata.selectedServices];
//     updatedServices.splice(index, 1);

//     setSelectedServices(updatedServices);

//     // Update localStorage
//     const existingData = JSON.parse(localStorage.getItem("salondata")) || {};
//     localStorage.setItem("salondata", JSON.stringify({
//       ...existingData,
//       selectedServices: updatedServices
//     }));
//   };


//   const [openModal, setOpenModal] = useState(false)
//   const [openBlobSalonImage, setOpenBlobSalonImage] = useState({})

//   const selectedSalonImageClicked = async (imgObject) => {
//     try {
//       setOpenBlobSalonImage(imgObject)
//       setOpenModal(true)
//     } catch (error) {
//       console.error("Error fetching and converting blob URL to file:", error);
//     }
//   };


//   const currentEditSalonImageInputRef = useRef(null);

//   const handleCurrentEditSalonImageButtonClick = () => {
//     currentEditSalonImageInputRef.current.click();
//   };


//   const handleEditSelectedImageFileInputChange = (e) => {
//     const uploadImage = e.target.files[0];
//     const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
//     const maxSizeInBytes = 2 * 1024 * 1024;

//     if (!allowedTypes.includes(uploadImage.type)) {
//       toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     if (uploadImage.size > maxSizeInBytes) {
//       toast.error("File size must be lower than 2MB.", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return;
//     }

//     const imageUrl = URL.createObjectURL(uploadImage);

//     setOpenBlobSalonImage({
//       ...openBlobSalonImage,
//       blobUrl: imageUrl,
//       name: uploadImage.name
//     });

//     setSalonImages((images) =>
//       images.map((image) =>
//         image._id === openBlobSalonImage?._id ? { ...image, blobUrl: imageUrl, name: uploadImage.name } : image
//       )
//     );
//   };



//   const navigate = useNavigate()

//   const [uploadSalonImages, setUploadSalonImages] = useState("")

//   const [invalidnumber, setInvalidNumber] = useState(false)

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   const createSalonHandler = async () => {
//     if (!salonName) {
//       toast.error("Please enter salon name", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonNameError("Please enter salon name")
//     }

//     if (salonName.length === 0 || salonName.length > 20) {
//       toast.error("Salon Name must be between 1 to 20 characters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonNameError("Salon Name must be between 1 to 20 characters");
//     }

//     if (!salonEmail) {
//       toast.error("Please enter salon email", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonEmailError("Please enter salon email")
//     }

//     if (!emailRegex.test(salonEmail)) {
//       toast.error("Invalid email format", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: "0.3rem",
//           background: "#333",
//           color: "#fff",
//         },
//       });
//       return setSalonEmailError("Invalid email format");
//     }

//     if (!salonDesc) {
//       toast.error("Please enter salon description", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonDescError("Please enter salon description")
//     }

//     if (salonDesc.length === 0 || salonDesc.length > 35) {
//       toast.error("Salon Description must be between 1 to 35 characters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonDescError("Salon Description must be between 1 to 35 characters");
//     }

//     if (!address) {
//       toast.error("Please enter salon address", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonAddressError("Please enter salon address")
//     }

//     if (!longitude && !latitude) {
//       toast.error("Coordinates is not present", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonCoordinateError("Coordinates is not present")
//     }

//     if (!country) {
//       toast.error("Please select country", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setCountryError("Please select country")
//     }

//     if (!city) {
//       toast.error("Please select city", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setCityError("Please select city")
//     }

//     if (!timezone) {
//       toast.error("Please select timezone", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setTimezoneError("Please select timezone")
//     }

//     if (!postCode) {
//       toast.error("Please enter postcode", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setPostCodeError("Please enter postcode")
//     }

//     if (postCode.length === 0 || postCode.length > 10) {
//       toast.error("Postcode must be between 0 to 10 charecters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setPostCodeError("Postcode must be between 0 to 10 charecters")
//     }

//     if (!salonType) {
//       toast.error("Please select salon type", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setSalonTypeError("Please select salon type")
//     }

//     if (invalidnumber) {
//       toast.error("Invalid Number", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setInvalidNumberError("Invalid Number")
//     }


//     const salondata = {
//       adminEmail: email,
//       salonEmail: salonEmail,
//       salonDesc: salonDesc,
//       salonName: salonName,
//       address: address,
//       location: {
//         type: "Point",
//         coordinates: {
//           longitude: Number(longitude),
//           latitude: Number(latitude)
//         }
//       },
//       country: country,
//       city: city,
//       timeZone: timezone,
//       postCode: postCode,
//       contactTel: Number(contactTel),
//       countryCode: Number(dialCode),
//       salonType: salonType,
//       webLink: webLink,
//       fbLink: fbLink,
//       instraLink: instraLink,
//       twitterLink: twitterLink,
//       tiktokLink: tiktokLink,
//       services: localsalondata.selectedServices,
//       code: countrycode
//     }

//     // console.log("Salondata ", salondata)

//     const files = await Promise.all(
//       salonImages?.map(async (imgObject) => {
//         try {
//           const response = await fetch(imgObject.blobUrl);
//           const blob = await response.blob();

//           const file = new File([blob], imgObject.name, { type: blob.type });

//           return file;
//         } catch (error) {
//           console.error("Error converting blob URL to file:", error);
//           return null;
//         }
//       })
//     );

//     setUploadSalonImages(files)

//     dispatch(adminCreateSalonAction(salondata, navigate))


//   }

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       createSalonHandler();
//     }
//   };


//   const adminCreateSalon = useSelector(state => state.adminCreateSalon)

//   const {
//     loading: createSalonLoading,
//     response: createSalonResponse
//   } = adminCreateSalon


//   useEffect(() => {
//     if (createSalonResponse?.salonId && uploadSalonImages != "") {
//       const uploadImageHandler = async () => {
//         if (uploadSalonImages != null) {
//           const formData = new FormData();

//           const SalonId = createSalonResponse?.salonId;
//           formData.append('salonId', SalonId);

//           for (const file of uploadSalonImages) {
//             formData.append('gallery', file);
//           }

//           try {
//             await api.post('/api/salon/uploadSalonImage', formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//               },
//             });

//             const { data } = await api.post(`/api/admin/getAllSalonsByAdmin`, {
//               adminEmail: email
//             })

//             dispatch({
//               type: GET_ADMIN_SALONLIST_SUCCESS,
//               payload: data
//             })

//             toast.success("Salon images uploaded successfully", {
//               duration: 3000,
//               style: {
//                 fontSize: "1.4rem",
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//               },
//             });
//           } catch (error) {
//             toast.error(error?.response?.data?.message, {
//               duration: 3000,
//               style: {
//                 fontSize: "1.4rem",
//                 borderRadius: '10px',
//                 background: '#333',
//                 color: '#fff',
//               },
//             });
//             setSalonImages([]);
//             setUploadSalonImages([])
//           }
//         }
//       };

//       uploadImageHandler();
//     }

//     //For Salon Logo
//     if (createSalonResponse?.salonId && uploadSalonLogo != "") {
//       const uploadImageHandler = async () => {
//         if (uploadSalonLogo != null) {
//           const formData = new FormData();

//           const SalonId = createSalonResponse?.salonId;

//           if (SalonId) {
//             formData.append('salonId', SalonId);
//             formData.append('salonLogo', uploadSalonLogo);

//             try {
//               await api.post('/api/salon/uploadSalonLogo', formData, {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                 },
//               });

//               const { data } = await api.post(`/api/admin/getAllSalonsByAdmin`, {
//                 adminEmail: email
//               })

//               dispatch({
//                 type: GET_ADMIN_SALONLIST_SUCCESS,
//                 payload: data
//               })

//               dispatch(adminGetDefaultSalonAction(email))

//               toast.success("Salon logo uploaded successfully", {
//                 duration: 3000,
//                 style: {
//                   fontSize: "var(--font-size-2)",
//                   borderRadius: '0.3rem',
//                   background: '#333',
//                   color: '#fff',
//                 },
//               });
//             } catch (error) {
//               toast.error(error?.response?.data?.message, {
//                 duration: 3000,
//                 style: {
//                   fontSize: "var(--font-size-2)",
//                   borderRadius: '0.3rem',
//                   background: '#333',
//                   color: '#fff',
//                 },
//               });
//               setSalonLogo("")
//               setUploadSalonLogo("")
//             }
//           }

//         }
//       };

//       uploadImageHandler();
//     }

//   }, [createSalonResponse?.salonId]);

//   const deleteSalonImageHandler = (imgObject) => {
//     setSalonImages((images) => images.filter((image) => image._id !== imgObject._id))
//     setOpenModal(false)
//   }

//   const [openServices, setOpenServices] = useState(false)

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"


//   const addservicedropHandler = () => {
//     if (!countrycode) {
//       toast.error("Please select a country", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--font-size-2)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     } else {
//       setOpenServices((prev) => !prev)
//     }

//   }

//   useEffect(() => {
//     if (countrycode) {
//       setOpenServices(true)
//     } else {
//       setOpenServices(false)
//     }
//   }, [countrycode])


//   const phoneUtil = PhoneNumberUtil.getInstance();

//   const isPhoneValid = (phone) => {
//     try {
//       return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//     } catch (error) {
//       return false;
//     }
//   };

//   const [countryflag, setCountryFlag] = useState("gb")

//   const handlePhoneChange = (phone, meta) => {
//     setInvalidNumberError("")
//     const { country, inputValue } = meta;

//     const isValid = isPhoneValid(phone);

//     if (isValid) {
//       setContactTel(phone)
//       setDialCode(country?.dialCode)
//       setCountryFlag(country?.iso2)
//       setInvalidNumber(false)
//     } else {
//       setInvalidNumber(true)
//     }

//   };



//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("salondata")) || {};
//     setLocalSalondata(storedData);
//     setSalonName(storedData.salonName)
//     setSalonEmail(storedData.salonEmail)
//     setSalonDesc(storedData.salonDesc)
//     setAddress(storedData.address)
//     setWebLink(storedData.webLink)
//     setFbLink(storedData.fbLink)
//     setInstraLink(storedData.instraLink)
//     setTwitterLink(storedData.twitterLink)
//     setTiktokLink(storedData.tiktokLink)
//     setPostCode(storedData.postCode)
//     setSalonType(storedData.salonType)
//     setLatitude(storedData.latitude)
//     setLongitude(storedData.longitude)
//   }, [selectedServices]);

//   const setHandler = (setState, value, localname, setError) => {
//     setError("")
//     setState(value);
//     // console.log("Saving to localStorage:", localname, value);

//     const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

//     localStorage.setItem("salondata", JSON.stringify({
//       ...existingData,
//       [localname]: value
//     }));
//   }

//   useEffect(() => {
//     return () => {
//       dispatch({
//         type: ADMIN_GET_ALL_CITIES_SUCCESS,
//         payload: []
//       })

//       dispatch({
//         type: ADMIN_GET_ALL_TIMEZONES_SUCCESS,
//         payload: []
//       })
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     const phoneInput = document.querySelector(
//       '.react-international-phone-input-container .react-international-phone-input'
//     );

//     // const phonedropdown = document.querySelector(
//     //   '.react-international-phone-country-selector-dropdown'
//     // )

//     // const phonedropfocus = document.querySelector(
//     //   '.react-international-phone-country-selector-dropdown__list-item--selected, .react-international-phone-country-selector-dropdown__list-item--focused'
//     // )

//     if (phoneInput) {
//       // phoneInput.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
//       phoneInput.style.color = 'var(--text-primary)';
//     }

//     // if(phonedropdown){
//     //   phonedropdown.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
//     //   phonedropdown.style.backgroundColor = darkmodeOn ? 'var(--dark-color-2)' : 'var(--light-color-4)';
//     // }

//   }, [darkmodeOn])

//   return (
//     <div className={`${style.create_salon_wrapper} ${darkmodeOn && style.dark}`}>
//       <div><h2>Create Salon</h2></div>
//       <div className={`${style.create_salon_content_wrapper} ${darkmodeOn && style.dark}`}>
//         <div>
//           <div>
//             <div>
//               {
//                 salonImages?.[0] && <img src={salonImages?.[0]?.blobUrl} alt="cover-img" />
//               }
//             </div>

//             <div className={`${style.create_salon_logo_container} ${darkmodeOn && style.dark}`}>
//               <div>
//                 <img src={`${salonLogo}`} alt="s" />
//                 <div>
//                   <button onClick={() => handleSalonLogoButtonClick()} className={style.upload_profile_logo_btn}><CameraIcon /></button>
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     style={{ display: 'none' }}
//                     onChange={handleSalonFileInputChange}
//                   />
//                 </div>
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
//               className={style.salon_upload_button}
//               onClick={() => handleSalonImageButtonClick()}
//             >

//               Upload

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
//                 <div key={index} onClick={() => selectedSalonImageClicked(s)} style={{ cursor: "pointer" }}><img src={s?.blobUrl} alt="" /></div>
//               ))
//             }
//           </div>

//         </div>

//         <div>
//           <div>
//             <p>Name</p>

//             <input
//               type="text"
//               value={salonName}
//               onChange={(e) => {
//                 setHandler(setSalonName, e.target.value, "salonName", setSalonNameError)
//               }}
//               onKeyDown={handleKeyPress}
//               style={{
//                 border: salonNameError ? "0.1rem solid red" : ""
//               }}
//             />
//             <p className={style.error_message}>{salonNameError}</p>
//           </div>

//           <div>
//             <p>Email</p>
//             <input
//               type="text"
//               value={salonEmail}
//               onChange={(e) => setHandler(setSalonEmail, e.target.value, "salonEmail", setSalonEmailError)}
//               onKeyDown={handleKeyPress}
//               style={{
//                 border: salonEmailError ? "0.1rem solid red" : ""
//               }}
//             />
//             <p className={style.error_message}>{salonEmailError}</p>
//           </div>

//           <div>
//             <p>Description</p>
//             <input
//               type="text"
//               value={salonDesc}
//               onChange={(e) => setHandler(setSalonDesc, e.target.value, "salonDesc", setSalonDescError)}
//               onKeyDown={handleKeyPress}
//               style={{
//                 border: salonDescError ? "0.1rem solid red" : ""
//               }}
//             />
//             <p className={style.error_message}>{salonDescError}</p>
//           </div>

//           <div>
//             <p>Address</p>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setHandler(setAddress, e.target.value, "address", setSalonAddressError)}
//               onKeyDown={handleKeyPress}
//               style={{
//                 border: salonAddressError ? "0.1rem solid red" : ""
//               }}
//             />
//             <p className={style.error_message}>{salonAddressError}</p>
//           </div>

//           <div>
//             <div>
//               <p>Latitude</p>
//               <input
//                 type="text"
//                 value={latitude}
//                 readOnly
//                 style={{ outline: "none", border: salonCoordinateError ? "0.1rem solid red" : "none" }}
//                 onKeyDown={handleKeyPress}
//               />
//             </div>

//             <div>
//               <p>Longitude</p>
//               <input
//                 type="text"
//                 value={longitude}
//                 readOnly
//                 style={{ outline: "none", border: salonCoordinateError ? "0.1rem solid red" : "" }}
//                 onKeyDown={handleKeyPress}
//               />
//             </div>
//             <p className={style.error_message}>{salonCoordinateError}</p>
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
//                 onClick={() => setCountryDrop(true)}
//                 readOnly
//                 style={{
//                   border: countryError ? "0.1rem solid red" : ""
//                 }}
//               />
//               <span onClick={() => setCountryDrop((prev) => !prev)} className={`${style.dropicon} ${darkmodeOn && style.dark}`}><DropdownIcon /></span>
//               <p className={style.error_message}>{countryError}</p>
//               {countryDrop &&
//                 <ClickAwayListener onClickAway={() => setCountryDrop(false)}>
//                   <div>
//                     <div className={`${style.search_box} ${darkmodeOn && style.dark}`}>
//                       <input
//                         type="text"
//                         placeholder='Search Country'
//                         value={searchCountry}
//                         onChange={(e) => searchCountryHandler(e.target.value)}
//                       />

//                       <div><SearchIcon /></div>
//                     </div>
//                     {
//                       getAdminAllCountriesLoading ?
//                         <Skeleton count={2}
//                           height={"4rem"}
//                           width={"100%"}
//                           baseColor={!darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={!darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "0.3rem",
//                             marginBottom: "1rem"
//                           }}
//                         /> :
//                         getAdminAllCountriesResolve && copyCountriesdata?.length > 0 ?

//                           copyCountriesdata?.map((c) => (
//                             <p key={c._id} onClick={() => setCountryHandler(c)}>{c.name}</p>
//                           ))
//                           :
//                           <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
//                             <p style={{ fontSize: "var(--font-size-3)" }}>No countries available</p>
//                           </div>
//                     }
//                   </div>
//                 </ClickAwayListener>}

//             </div>

//             <div>
//               <p>City</p>
//               <input
//                 type="text"
//                 value={city}
//                 onClick={() => setCityDrop(true)}
//                 readOnly
//                 style={{ border: (!countryCodePresent || cityError) ? "0.1rem solid red" : "" }}
//               />
//               <span onClick={() => setCityDrop((prev) => !prev)} className={`${style.dropicon} ${darkmodeOn && style.dark}`}><DropdownIcon /></span>
//               {
//                 !countryCodePresent ? <p className={style.error_message}>Please select country</p> : <p className={style.error_message}>{cityError}</p>
//               }

//               {cityDrop &&
//                 <ClickAwayListener onClickAway={() => setCityDrop(false)}>
//                   <div>
//                     <div className={`${style.search_box} ${darkmodeOn && style.dark}`}>
//                       <input
//                         type="text"
//                         placeholder='Search City'
//                         value={searchCity}
//                         onChange={(e) => searchCityHandler(e.target.value)}
//                       />

//                       <div><SearchIcon /></div>
//                     </div>
//                     {
//                       getAdminAllCitiesLoading ?
//                         <Skeleton count={2}
//                           height={"4rem"}
//                           width={"100%"}
//                           baseColor={!darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={!darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "0.3rem",
//                             marginBottom: "1rem"
//                           }}
//                         /> :
//                         getAdminAllCitiesResolve && copyCitiesData?.length > 0 ?

//                           copyCitiesData.map((c, index) => (
//                             <p key={index} onClick={() => setCityHandler(c)}>{c.name}</p>
//                           ))
//                           :
//                           <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
//                             <p style={{ fontSize: "var(--font-size-3)" }}>No city available</p>
//                           </div>
//                     }
//                   </div>
//                 </ClickAwayListener>}
//             </div>
//           </div>

//           <div>
//             <div>
//               <p>Timezone</p>
//               <input
//                 type="text"
//                 value={timezone}
//                 onClick={() => timezoneDropHandler()}
//                 readOnly
//                 style={{ border: (!countryCodePresent || timezoneError) ? "0.1rem solid red" : "" }}
//               />
//               <span onClick={() => setTimezoneDrop((prev) => !prev)} className={`${style.dropicon} ${darkmodeOn && style.dark}`}><DropdownIcon /></span>
//               {
//                 !countryCodePresent ? <p className={style.error_message}>Please select country</p> : <p className={style.error_message}>{timezoneError}</p>
//               }

//               {timezoneDrop && <ClickAwayListener onClickAway={() => setTimezoneDrop(false)}><div>
//                 {
//                   getAdminAllTimezoneLoading ?
//                     <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
//                     getAdminAllTimezoneResolve && AllTimezones?.length > 0 ?

//                       AllTimezones.map((c,index) => (
//                         <p key={index} onClick={() => setTimezoneHandler(c)}>{c}</p>
//                       ))

//                       :
//                       <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
//                         <p style={{ fontSize: "var(--font-size-3)" }}>No timezone available</p>
//                       </div>
//                 }
//               </div></ClickAwayListener>}
//             </div>

//             <div>
//               <p>Post Code</p>
//               <input
//                 type="text"
//                 value={postCode}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (!/^[a-zA-Z0-9]*$/.test(value)) {
//                     setPostCodeError("Postcode must only contain letters and numbers");
//                     return
//                   }
//                   setHandler(setPostCode, value, "postCode", setPostCodeError)
//                 }}
//                 onKeyDown={handleKeyPress}
//                 style={{ border: postCodeError && "0.1rem solid red" }}
//               />
//               <p className={style.error_message}>{postCodeError}</p>
//             </div>
//           </div>

//           <div />

//           <div>
//             <p>Type of business</p>
//             <input
//               type="text"
//               value={`${salonType ? `${salonType}` : ''}`}
//               onClick={() => salonTypeDropHandler()}
//               className='salontype_input'
//               readOnly
//               style={{ border: salonTypeError && "0.1rem solid red" }}
//             />
//             <span onClick={() => salonTypeDropHandler()} className={`${style.dropicon} ${darkmodeOn && style.dark}`}><DropdownIcon /></span>

//             {salonTypeDrop &&
//               <ClickAwayListener onClickAway={() => setSalonTypeDrop(false)}>
//                 <div>
//                   <p onClick={() => salonTypeHandler("Barber Shop")}>Barber Shop</p>
//                   <p onClick={() => salonTypeHandler("Hair Dresser")}>Hair Dresser</p>
//                 </div>
//               </ClickAwayListener>}
//             <p className={style.error_message}>{salonTypeError}</p>
//           </div>

//           <div>
//             <p>Mobile Number</p>
//             <div className={`${style.salon_mobile_input} ${darkmodeOn && style.dark}`}>
//               <div onKeyDown={handleKeyPress} style={{ border: invalidNumberError && "0.1rem solid red" }}>
//                 <PhoneInput
//                   forceDialCode={true}
//                   defaultCountry={countryflag}
//                   value={contactTel}
//                   onChange={(phone, meta) => handlePhoneChange(phone, meta)}
//                 />

//               </div>

//             </div>
//             <p className={style.error_message}>{invalidNumberError}</p>
//           </div>

//           <div className={style.add_services_drop}>
//             <button onClick={addservicedropHandler} className={style.addservices_btn}>Select Services</button>
//           </div>

//           {
//             openServices &&
//             <main className={`${style.add_services_drop_container} ${darkmodeOn && style.dark}`}>
//               <p>Choose your service icon</p>
//               <div>
//                 <div>
//                   {
//                     getAdminAllSalonIconLoading && !getAdminAllSalonIconResolve ?
//                       <div className={style.create_salon_carousel_loader}>
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
//                           }}
//                         />
//                         <Skeleton count={1}
//                           height={"9rem"}
//                           width={"9rem"}
//                           baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
//                           highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
//                           style={{
//                             borderRadius: "6px"
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
//                               <div key={s._id}
//                                 className={`${style.slider_item} ${selectedLogo?.url === s.url && style.icon_selected} ${darkmodeOn && style.dark}`}
//                                 onClick={() => logoselectHandler(s)}
//                                 style={{
//                                   border: serviceIconError && "0.1rem solid red"
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
//                 <p className={style.error_message}>{serviceIconError}</p>
//               </div>

//               <div>
//                 <p>Service Name</p>
//                 <input
//                   type="text"
//                   value={serviceName}
//                   onChange={(e) => {
//                     setServiceNameError("")
//                     setServiceName(e.target.value)
//                   }}
//                   onKeyDown={handleKeyPressAddServices}
//                   style={{ border: serviceNameError && "0.1rem solid red" }}
//                 />
//                 <p className={style.error_message}>{serviceNameError}</p>
//               </div>

//               <div>
//                 <p>Service Description</p>
//                 <input
//                   type="text"
//                   value={serviceDesc}
//                   onChange={(e) => {
//                     setServiceDescError("")
//                     setServiceDesc(e.target.value)
//                   }}
//                   onKeyDown={handleKeyPressAddServices}
//                   style={{ border: serviceDescError && "0.1rem solid red" }}
//                 />
//                 <p className={style.error_message}>{serviceDescError}</p>
//               </div>

//               <div>
//                 <p>Service Type (*VIP services have top priority in queue)</p>
//                 <input
//                   type="text"
//                   value={`${vipService ? 'VIP' : 'Regular'}`}
//                   onClick={() => vipServiceDropHandler()}
//                   readOnly
//                 />
//                 <span onClick={() => vipServiceDropHandler()} className={`${style.dropicon} ${darkmodeOn && style.dark}`}><DropdownIcon /></span>
//                 {vipServiceDrop &&
//                   <ClickAwayListener onClickAway={() => setVipServiceDrop(false)}>
//                     <div className={style.service_type_dropdown_container}>
//                       <p onClick={() => vipServiceHandler(false)}>Regular</p>
//                       <p onClick={() => vipServiceHandler(true)}>VIP</p>
//                     </div>
//                   </ClickAwayListener>}
//               </div>

//               <div>
//                 <div>
//                   <p>Service Price</p>
//                   <input
//                     type="text"
//                     value={servicePrice}
//                     onChange={(e) => {
//                       setServicePriceError("")
//                       const value = e.target.value;
//                       if (/^\d*$/.test(value)) {
//                         setServicePrice(value);
//                       }
//                     }}
//                     onKeyDown={handleKeyPressAddServices}
//                     style={{ border: servicePriceError && "0.1rem solid red" }}
//                   />
//                   <p className={style.error_message}>{servicePriceError}</p>
//                 </div>

//                 <div>
//                   <p>Est Wait Tm(mins)</p>
//                   <input
//                     type="text"
//                     value={serviceEWT}
//                     onChange={(e) => {
//                       setServiceEwtError("")
//                       const value = e.target.value;
//                       if (/^\d*$/.test(value)) {
//                         setServiceEWT(value);
//                       }
//                     }}
//                     onKeyDown={handleKeyPressAddServices}
//                     style={{ border: serviceEwtError && "0.1rem solid red" }}
//                   />
//                   <p className={style.error_message}>{serviceEwtError}</p>
//                 </div>
//               </div>

//               <div>
//                 <button onClick={addServiceHandler} className={style.add_service_btn}>Add Service</button>
//               </div>

//               <div className={`${style.service_container} ${darkmodeOn && style.dark}`}>

//                 {
//                   localsalondata?.selectedServices?.map((ser, index) => {
//                     return (
//                       <div className={`${style.service_item}`} key={index}>
//                         <div>
//                           <div>
//                             <div>
//                               <img src={ser.serviceIcon?.url || ""} alt="" />
//                             </div>
//                             <div>
//                               <p>{ser.serviceName}</p>
//                               <p>{ser.vipService ? "VIP" : "Regular"}</p>
//                               <p>{ser.serviceDesc}</p>
//                             </div>
//                           </div>
//                           <button onClick={() => deleteServiceHandler(index)}>
//                             <DeleteIcon />
//                           </button>
//                         </div>
//                         <div>
//                           <div>
//                             <p>Price</p>
//                             <p>
//                               {countryCurrency} {ser.servicePrice}
//                             </p>
//                           </div>
//                           <div>
//                             <p>Estimated Time</p>
//                             <p>{ser.serviceEWT} mins</p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 }


//               </div>
//             </main>
//           }

//           <div className={`${style.salon_logo_wrapper} ${darkmodeOn && style.dark}`}>
//             <p>Select Logo</p>
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

//               <div><p>{uploadSalonLogo?.name}</p></div>
//             </div>
//           </div>


//           <div className={`${style.salon_images_wrapper} ${darkmodeOn && style.dark}`}>
//             <div>
//               <p style={{
//                 fontSize: "var(--font-size-3)",
//                 fontWeight: "600"
//               }}>Select Images</p>

//               <button onClick={() => handleSalonImageButtonClick()}
//                 style={{ fontSize: "var(--font-size-3)" }}>
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
//               <p>{salonImages?.map((s) => s.name).join(',')}</p>
//             </div>
//           </div>

//           <div>
//             <p>Web Link</p>
//             <input
//               type="text"
//               value={webLink}
//               onChange={(e) => setHandler(setWebLink, e.target.value, "webLink",setWebLinkError)}
//               onKeyDown={handleKeyPress}
//             />
//           </div>

//           <div>
//             <p>Facebook Link</p>
//             <input
//               type="text"
//               value={fbLink}
//               onChange={(e) => setHandler(setFbLink, e.target.value, "fbLink", setFbLinkError)}
//               onKeyDown={handleKeyPress}
//             />
//           </div>

//           <div>
//             <p>Instagram Link</p>
//             <input
//               type="text"
//               value={instraLink}
//               onChange={(e) => setHandler(setInstraLink, e.target.value, "instraLink", setInstaLinkError)}
//               onKeyDown={handleKeyPress}
//             />
//           </div>

//           <div>
//             <p>Twitter Link</p>
//             <input
//               type="text"
//               value={twitterLink}
//               onChange={(e) => setHandler(setTwitterLink, e.target.value, "twitterLink", setTwitterLinkError)}
//               onKeyDown={handleKeyPress}
//             />
//           </div>

//           <div>
//             <p>Tiktok Link</p>
//             <input
//               type="text"
//               value={tiktokLink}
//               onChange={(e) => setHandler(setTiktokLink, e.target.value, "tiktokLink", setTiktokLinkError)}
//               onKeyDown={handleKeyPress}
//             />
//           </div>

//           <div>
//             {
//               createSalonLoading ? <button className={style.create_salon_btn} style={{
//                 display: "grid",
//                 placeItems: "center"
//               }}><ButtonLoader /></button> : <button onClick={createSalonHandler} className={style.create_salon_btn}>Create</button>
//             }
//           </div>

//         </div>
//       </div>


//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
//           <div>
//             <p>Selected Image</p>
//             <button onClick={() => setOpenModal(false)}><CloseIcon /></button>
//           </div>

//           <div className={style.modal_content_container}>
//             <div><img src={openBlobSalonImage?.blobUrl} alt="salon image" /></div>
//             <div>
//               <div>
//                 <button onClick={handleCurrentEditSalonImageButtonClick}>
//                   <div><EditIcon /></div>
//                   <p>Reselect</p>

//                   <input
//                     type="file"
//                     ref={currentEditSalonImageInputRef}
//                     style={{ display: 'none' }}
//                     onChange={handleEditSelectedImageFileInputChange}
//                   />
//                 </button>
//                 <button onClick={() => deleteSalonImageHandler(openBlobSalonImage)}>
//                   <div><DeleteIcon /></div>
//                   <p>Remove</p>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>

//     </div>
//   )
// }

// export default CreateSalon



import React, { useEffect, useRef, useState } from 'react'
import style from "./CreateSalon.module.css"
import "react-multi-carousel/lib/styles.css";
import { CameraIcon, CloseIcon, DeleteIcon, DropdownIcon, FacebookIcon, InstagramIcon, SearchIcon, TiktokIcon, WebsiteIcon, XIcon } from '../../../newicons';
import { EditIcon } from '../../../icons';
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux';
import { adminCreateSalonAction, getAdminAllCitiesAction, getAdminAllCountriesAction, getAdminAllSalonIconAction, getAdminAllTimezoneAction } from '../../../Redux/Admin/Actions/SalonAction';
import api from '../../../Redux/api/Api';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';
import { ADMIN_GET_ALL_CITIES_SUCCESS, ADMIN_GET_ALL_TIMEZONES_SUCCESS, GET_ADMIN_SALONLIST_SUCCESS } from '../../../Redux/Admin/Constants/constants';
import toast from 'react-hot-toast';
import { PhoneInput } from 'react-international-phone';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer';

import { PhoneNumberUtil } from 'google-libphonenumber';
import { ClickAwayListener, Modal, Step, StepContent, StepLabel, Stepper } from '@mui/material';
import { adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction';
import Carousel from 'react-multi-carousel';

const CreateSalon = () => {

  const email = useSelector(state => state.AdminLoggedInMiddleware.adminEmail)
  const dispatch = useDispatch()

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

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const geoLocationHandler = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
          const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

          localStorage.setItem("salondata", JSON.stringify({
            ...existingData,
            latitude: latitude,
            longitude: longitude
          }));

          setSalonCoordinateError("")
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

  const [salonEmail, setSalonEmail] = useState("")
  const [salonName, setSalonName] = useState("")
  const [salonDesc, setSalonDesc] = useState("")
  const [address, setAddress] = useState("")

  const [postCode, setPostCode] = useState("")
  const [contactTel, setContactTel] = useState("")
  const [dialCode, setDialCode] = useState("")

  const [webLink, setWebLink] = useState("")
  const [fbLink, setFbLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [instraLink, setInstraLink] = useState("")
  const [tiktokLink, setTiktokLink] = useState("")

  const [serviceName, setServiceName] = useState("")
  const [serviceDesc, setServiceDesc] = useState("")
  const [servicePrice, setServicePrice] = useState("")
  const [serviceEWT, setServiceEWT] = useState("")

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


  const [salonType, setSalonType] = useState("")
  const [salonTypeDrop, setSalonTypeDrop] = useState(false)

  const [salonNameError, setSalonNameError] = useState("")
  const [salonEmailError, setSalonEmailError] = useState("")
  const [salonDescError, setSalonDescError] = useState("")
  const [salonAddressError, setSalonAddressError] = useState("")
  const [salonCoordinateError, setSalonCoordinateError] = useState("")
  const [countryError, setCountryError] = useState("")
  const [cityError, setCityError] = useState("")
  const [timezoneError, setTimezoneError] = useState("")
  const [postCodeError, setPostCodeError] = useState("")
  const [salonTypeError, setSalonTypeError] = useState("")
  const [invalidNumberError, setInvalidNumberError] = useState("")

  const [serviceIconError, setServiceIconError] = useState("")
  const [serviceNameError, setServiceNameError] = useState("")
  const [serviceDescError, setServiceDescError] = useState("")
  const [servicePriceError, setServicePriceError] = useState("")
  const [serviceEwtError, setServiceEwtError] = useState("")

  const [fblinkError, setFbLinkError] = useState("")
  const [weblinkError, setWebLinkError] = useState("")
  const [instalinkError, setInstaLinkError] = useState("")
  const [twitterlinkError, setTwitterLinkError] = useState("")
  const [tiktoklinkError, setTiktokLinkError] = useState("")


  const salonTypeDropHandler = () => {
    setSalonTypeDrop((prev) => !prev)
  }

  const salonTypeHandler = (value) => {
    setSalonType(value);

    const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

    localStorage.setItem("salondata", JSON.stringify({
      ...existingData,
      salonType: value
    }));
    setSalonTypeError("")
    setBusinessTypeOpen(false)
  }

  const [localsalondata, setLocalSalondata] = useState({})

  const [countryCurrency, setCountryCurrency] = useState("")

  const [country, setCountry] = useState("")
  const [countryDrop, setCountryDrop] = useState(false)
  const [countrycode, setCountryCode] = useState("")

  const setCountryHandler = (value) => {

    setCountryCode(value.countryCode)
    setCountry(value.name)
    setCountryCurrency(value.currency)
    setCountryOpen(false)
    setCountryError("")
  }


  const getAdminAllCountries = useSelector(state => state.getAdminAllCountries)

  useEffect(() => {
    dispatch(getAdminAllCountriesAction(""));
  }, [])

  const {
    loading: getAdminAllCountriesLoading,
    resolve: getAdminAllCountriesResolve,
    error: getAdminAllCountriesError,
    response: AllCountries
  } = getAdminAllCountries

  const [copyCountriesdata, setCopyCountriesdata] = useState([])

  useEffect(() => {
    if (AllCountries) {
      setCopyCountriesdata(AllCountries)
    }
  }, [AllCountries])

  const [searchCountry, setSearchCountry] = useState("")

  const searchCountryHandler = (value) => {
    setSearchCountry(value)
    const searchValue = value.toLowerCase().trim()

    if (!searchCountry) {
      setCopyCountriesdata(AllCountries)
    } else {
      const filteredCountries = AllCountries.filter((country) => {
        return country.name.toLowerCase().includes(searchValue)
      })

      setCopyCountriesdata(filteredCountries)
    }
  }


  const [city, setCity] = useState("")
  const [cityDrop, setCityDrop] = useState(false)

  const setCityHandler = (value) => {
    setCity(value.name)
    setCityOpen(false)
    setCityError("")
  }

  const [countryCodePresent, setCountryCodePresent] = useState(false)

  useEffect(() => {
    if (countrycode) {
      dispatch(getAdminAllCitiesAction("", countrycode));
      dispatch(getAdminAllTimezoneAction(countrycode))
      setCountryCodePresent(true)
    }
  }, [countrycode, dispatch])

  const getAdminAllCities = useSelector(state => state.getAdminAllCities)

  const {
    loading: getAdminAllCitiesLoading,
    resolve: getAdminAllCitiesResolve,
    response: AllCities,
    error: getAdminAllCitiesError,
  } = getAdminAllCities



  const [copyCitiesData, setCopyCitiesData] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  useEffect(() => {
    if (AllCities) {
      setCopyCitiesData(AllCities);
    }
  }, [AllCities]);

  const searchCityHandler = (value) => {
    setSearchCity(value);
    const searchValue = value.toLowerCase().trim();

    if (!searchValue) {
      setCopyCitiesData(AllCities);
    } else {
      const filteredCities = AllCities.filter((city) =>
        city.name.toLowerCase().includes(searchValue)
      );
      setCopyCitiesData(filteredCities);
    }
  };


  const [timezone, setTimezone] = useState("")
  const [timezoneDrop, setTimezoneDrop] = useState(false)

  const timezoneDropHandler = () => {
    setTimezoneDrop((prev) => !prev)
  }

  const setTimezoneHandler = (value) => {

    setTimezone(value)
    setTimezoneOpen(false)
    setTimezoneError("")
  }


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
    setServiceTypeOpen(false)
  }


  const [salonLogo, setSalonLogo] = useState("")


  const fileInputRef = useRef(null);

  const handleSalonLogoButtonClick = () => {
    fileInputRef.current.click();
  };

  const [uploadSalonLogo, setUploadSalonLogo] = useState("")



  const handleSalonFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedTypes.includes(uploadImage.type)) {
      toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    // Check if the image size exceeds 2MB (2 * 1024 * 1024 bytes)
    const maxSizeInBytes = 2 * 1024 * 1024;
    if (uploadImage.size > maxSizeInBytes) {
      toast.error("File size must be lower than 2mb", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const imageUrl = URL.createObjectURL(uploadImage);

    setSalonLogo(imageUrl);
    setUploadSalonLogo(uploadImage);
  };


  const [salonImages, setSalonImages] = useState([])

  const salonImagefileInputRef = useRef(null);

  const handleSalonImageButtonClick = () => {
    salonImagefileInputRef.current.click();
  };

  const handleSalonImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;
    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const invalidFiles = Array.from(uploadedFiles).filter(file =>
      !allowedTypes.includes(file.type) || file.size > maxSizeInBytes
    );

    if (invalidFiles.length > 0) {
      toast.error("Please upload only valid image files (JPEG, WebP, PNG) under 2MB.", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const urls = Array.from(uploadedFiles).map((file) => {
      const blobUrl = URL.createObjectURL(file);
      const _id = generateUniqueId();
      return { _id, blobUrl, name: file.name };
    });

    setSalonImages([...salonImages, ...urls]);
  };


  const [selectedLogo, setSelectedLogo] = useState({
    url: "",
    public_id: ""
  })

  const logoselectHandler = (serviceImg) => {
    setServiceIconError("")
    setSelectedLogo({
      url: serviceImg.url,
      public_id: serviceImg.public_id
    });
  }

  const [selectedServices, setSelectedServices] = useState([])


  const addServiceHandler = () => {

    if (!selectedLogo.url) {
      toast.error("Please select service icon", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServiceIconError("Please select service icon")
    }

    if (!serviceName) {
      toast.error("Please enter service name", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServiceNameError("Please enter service name")
    }

    if (serviceName.length < 1 || serviceName.length > 25) {
      toast.error("Service name must be between 1 to 25 charecters", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });

      return setServiceNameError("Service Name must be between 1 to 25 charecters")
    }

    if (!serviceDesc) {
      toast.error("Please enter service description", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServiceDescError("Please enter service description")
    }

    if (serviceDesc.length < 1 || serviceDesc.length > 50) {
      toast.error("Service description must be between 1 to 50 charecters", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServiceDescError("Service description must be between 1 to 50 charecters")
    }

    if (!servicePrice) {
      toast.error("Please enter service price", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServicePriceError("Please enter service price")
    }

    if (!serviceEWT) {
      toast.error("Please enter service EWT", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return setServiceEwtError("Please enter service EWT")
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
      serviceEWT: Number(serviceEWT)
    }

    setSelectedServices([...selectedServices, service])

    const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

    localStorage.setItem("salondata", JSON.stringify({
      ...existingData,
      selectedServices: [
        ...(localsalondata?.selectedServices ? localsalondata.selectedServices : selectedServices),
        service
      ]
    }));
    setSelectedLogo({ url: "", public_id: "" })
    setServiceName("")
    setServicePrice("")
    setVipService(false)
    setServiceDesc("")
    setServiceEWT("")
  }

  const handleKeyPressAddServices = (e) => {
    if (e.key === "Enter") {
      addServiceHandler();
    }
  };

  const deleteServiceHandler = (index) => {
    const currentService = localsalondata.selectedServices[index];

    setSelectedLogo({
      url: currentService.serviceIcon.url,
      public_id: currentService.serviceIcon.public_id
    });
    setServiceName(currentService.serviceName);
    setServicePrice(currentService.servicePrice);
    setVipService(currentService.vipService);
    setServiceDesc(currentService.serviceDesc);
    setServiceEWT(currentService.serviceEWT);

    const updatedServices = [...localsalondata.selectedServices];
    updatedServices.splice(index, 1);

    setSelectedServices(updatedServices);

    // Update localStorage
    const existingData = JSON.parse(localStorage.getItem("salondata")) || {};
    localStorage.setItem("salondata", JSON.stringify({
      ...existingData,
      selectedServices: updatedServices
    }));
  };


  const [openModal, setOpenModal] = useState(false)
  const [openBlobSalonImage, setOpenBlobSalonImage] = useState({})

  const selectedSalonImageClicked = async (imgObject) => {
    try {
      setOpenBlobSalonImage(imgObject)
      setOpenModal(true)
    } catch (error) {
      console.error("Error fetching and converting blob URL to file:", error);
    }
  };


  const currentEditSalonImageInputRef = useRef(null);

  const handleCurrentEditSalonImageButtonClick = () => {
    currentEditSalonImageInputRef.current.click();
  };


  const handleEditSelectedImageFileInputChange = (e) => {
    const uploadImage = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (!allowedTypes.includes(uploadImage.type)) {
      toast.error("Please upload only valid image files (JPEG, WebP, PNG).", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    if (uploadImage.size > maxSizeInBytes) {
      toast.error("File size must be lower than 2MB.", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    const imageUrl = URL.createObjectURL(uploadImage);

    setOpenBlobSalonImage({
      ...openBlobSalonImage,
      blobUrl: imageUrl,
      name: uploadImage.name
    });

    setSalonImages((images) =>
      images.map((image) =>
        image._id === openBlobSalonImage?._id ? { ...image, blobUrl: imageUrl, name: uploadImage.name } : image
      )
    );
  };



  const navigate = useNavigate()

  const [uploadSalonImages, setUploadSalonImages] = useState("")

  const [invalidnumber, setInvalidNumber] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const createSalonHandler = async () => {

    const salondata = {
      adminEmail: email,
      salonEmail: salonEmail,
      salonDesc: salonDesc,
      salonName: salonName,
      address: address,
      location: {
        type: "Point",
        coordinates: {
          longitude: Number(longitude),
          latitude: Number(latitude)
        }
      },
      country: country,
      city: city,
      timeZone: timezone,
      postCode: postCode,
      contactTel: Number(contactTel),
      countryCode: Number(dialCode),
      salonType: salonType,
      webLink: webLink,
      fbLink: fbLink,
      instraLink: instraLink,
      twitterLink: twitterLink,
      tiktokLink: tiktokLink,
      services: localsalondata.selectedServices,
      code: countrycode
    }

    // console.log("Salondata ", salondata)

    const files = await Promise.all(
      salonImages?.map(async (imgObject) => {
        try {
          const response = await fetch(imgObject.blobUrl);
          const blob = await response.blob();

          const file = new File([blob], imgObject.name, { type: blob.type });

          return file;
        } catch (error) {
          console.error("Error converting blob URL to file:", error);
          return null;
        }
      })
    );

    setUploadSalonImages(files)

    dispatch(adminCreateSalonAction(salondata, navigate))


  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createSalonHandler();
    }
  };


  const adminCreateSalon = useSelector(state => state.adminCreateSalon)

  const {
    loading: createSalonLoading,
    response: createSalonResponse
  } = adminCreateSalon


  useEffect(() => {
    if (createSalonResponse?.salonId && uploadSalonImages != "") {
      const uploadImageHandler = async () => {
        if (uploadSalonImages != null) {
          const formData = new FormData();

          const SalonId = createSalonResponse?.salonId;
          formData.append('salonId', SalonId);

          for (const file of uploadSalonImages) {
            formData.append('gallery', file);
          }

          try {
            await api.post('/api/salon/uploadSalonImage', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            const { data } = await api.post(`/api/admin/getAllSalonsByAdmin`, {
              adminEmail: email
            })

            dispatch({
              type: GET_ADMIN_SALONLIST_SUCCESS,
              payload: data
            })

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
            setSalonImages([]);
            setUploadSalonImages([])
          }
        }
      };

      uploadImageHandler();
    }

    //For Salon Logo
    if (createSalonResponse?.salonId && uploadSalonLogo != "") {
      const uploadImageHandler = async () => {
        if (uploadSalonLogo != null) {
          const formData = new FormData();

          const SalonId = createSalonResponse?.salonId;

          if (SalonId) {
            formData.append('salonId', SalonId);
            formData.append('salonLogo', uploadSalonLogo);

            try {
              await api.post('/api/salon/uploadSalonLogo', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

              const { data } = await api.post(`/api/admin/getAllSalonsByAdmin`, {
                adminEmail: email
              })

              dispatch({
                type: GET_ADMIN_SALONLIST_SUCCESS,
                payload: data
              })

              dispatch(adminGetDefaultSalonAction(email))

              toast.success("Salon logo uploaded successfully", {
                duration: 3000,
                style: {
                  fontSize: "var(--font-size-2)",
                  borderRadius: '0.3rem',
                  background: '#333',
                  color: '#fff',
                },
              });
            } catch (error) {
              toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                  fontSize: "var(--font-size-2)",
                  borderRadius: '0.3rem',
                  background: '#333',
                  color: '#fff',
                },
              });
              setSalonLogo("")
              setUploadSalonLogo("")
            }
          }

        }
      };

      uploadImageHandler();
    }

  }, [createSalonResponse?.salonId]);

  const deleteSalonImageHandler = (imgObject) => {
    setSalonImages((images) => images.filter((image) => image._id !== imgObject._id))
    setOpenModal(false)
  }

  const [openServices, setOpenServices] = useState(false)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  const addservicedropHandler = () => {
    if (!countrycode) {
      toast.error("Please select a country", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      setOpenServices((prev) => !prev)
    }

  }

  useEffect(() => {
    if (countrycode) {
      setOpenServices(true)
    } else {
      setOpenServices(false)
    }
  }, [countrycode])


  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  const [countryflag, setCountryFlag] = useState("gb")


  const handlePhoneChange = (phone, meta) => {
    setInvalidNumberError("")
    const { country, inputValue } = meta;

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setContactTel(phone)
      setDialCode(country?.dialCode)
      setCountryFlag(country?.iso2)
      setInvalidNumber(false)

      const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

      localStorage.setItem("salondata", JSON.stringify({
        ...existingData,
        ["contactTel"]: phone,
        ["dialCode"]: country?.dialCode,
        ["countryflag"]: country?.iso2
      }));

    } else {
      setInvalidNumber(true)
    }

  };




  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("salondata")) || {};
    setLocalSalondata(storedData);
    setSalonName(storedData.salonName)
    setSalonEmail(storedData.salonEmail)
    setSalonDesc(storedData.salonDesc)
    setAddress(storedData.address)
    setWebLink(storedData.webLink)
    setFbLink(storedData.fbLink)
    setInstraLink(storedData.instraLink)
    setTwitterLink(storedData.twitterLink)
    setTiktokLink(storedData.tiktokLink)
    setPostCode(storedData.postCode)
    setSalonType(storedData.salonType)
    setLatitude(storedData.latitude)
    setLongitude(storedData.longitude)

    setContactTel(storedData.contactTel)
    setDialCode(storedData.dialCode)
    setCountryFlag(storedData.countryflag)
  }, [selectedServices]);

  const setHandler = (setState, value, localname, setError) => {
    setError("")
    setState(value);
    // console.log("Saving to localStorage:", localname, value);

    const existingData = JSON.parse(localStorage.getItem("salondata")) || {};

    localStorage.setItem("salondata", JSON.stringify({
      ...existingData,
      [localname]: value
    }));
  }

  useEffect(() => {
    return () => {
      dispatch({
        type: ADMIN_GET_ALL_CITIES_SUCCESS,
        payload: []
      })

      dispatch({
        type: ADMIN_GET_ALL_TIMEZONES_SUCCESS,
        payload: []
      })
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const phoneInput = document.querySelector(
  //     '.react-international-phone-input-container .react-international-phone-input'
  //   );

  //   // const phonedropdown = document.querySelector(
  //   //   '.react-international-phone-country-selector-dropdown'
  //   // )

  //   // const phonedropfocus = document.querySelector(
  //   //   '.react-international-phone-country-selector-dropdown__list-item--selected, .react-international-phone-country-selector-dropdown__list-item--focused'
  //   // )

  //   if (phoneInput) {
  //     // phoneInput.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
  //     // phoneInput.style.color = '';
  //   }

  //   // if(phonedropdown){
  //   //   phonedropdown.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
  //   //   phonedropdown.style.backgroundColor = darkmodeOn ? 'var(--dark-color-2)' : 'var(--light-color-4)';
  //   // }

  // }, [darkmodeOn])

  // ========================


  const steps = [
    {
      label: 'Account Information',
      fields: [
        { name: 'salonName', label: 'Name', type: 'text', placeholder: 'Enter salon name', onChange: setHandler, value: salonName, setState: setSalonName, setError: setSalonNameError, error: salonNameError },
        { name: 'salonDesc', label: 'Description', type: 'text', placeholder: 'Enter salon description', onChange: setHandler, value: salonDesc, setState: setSalonDesc, setError: setSalonDescError, error: salonDescError },
        { name: 'salonEmail', label: 'Email', type: 'text', placeholder: 'Enter salon email', onChange: setHandler, value: salonEmail, setState: setSalonEmail, setError: setSalonEmailError, error: salonEmailError },
        { name: 'contactTel', label: 'Mobile Number', type: 'text', placeholder: 'Enter salon mobile number' },
      ],
    },
    {
      label: 'Business Information',
      fields: [
        { name: 'businesstype', label: 'Business Type', type: 'text', dropdown: true, placeholder: 'Select business type', salonTypeHandler: salonTypeHandler, value: salonType, error: salonTypeError },
        { name: 'address', label: 'Address', type: 'text', dropdown: false, placeholder: 'Enter salon address', onChange: setHandler, value: address, setState: setAddress, setError: setSalonAddressError, error: salonAddressError },
        { name: 'postcode', label: 'Post Code', type: 'text', dropdown: false, placeholder: 'Enter salon postcode', onChange: setHandler, value: postCode, setState: setPostCode, setError: setPostCodeError, error: postCodeError },
        { name: 'lattitude', label: 'Latitude', type: 'text', dropdown: false, placeholder: 'Lattiude', value: latitude },
        { name: 'longitude', label: 'Longitude', type: 'text', dropdown: false, placeholder: 'Longitude', value: longitude },
        { name: 'country', label: 'Country', type: 'text', dropdown: true, placeholder: 'Select country' },
        { name: 'city', label: 'City', type: 'text', dropdown: true, placeholder: 'Select city' },
        { name: 'timezone', label: 'Timezone', type: 'text', dropdown: true, placeholder: 'Select timezone' },
      ],
    },
    {
      label: 'Select Services',
      fields: [
        { name: 'serviceicon', label: 'Service Icon', error: serviceIconError },
        {
          name: 'servicename', label: 'Service Name', type: 'text', placeholder: "Enter your service name", dropdown: false, value: serviceName, onChange: (e) => {
            setServiceNameError("")
            setServiceName(e.target.value)
          }, error: serviceNameError
        },
        {
          name: 'servicedescription', label: 'Service Description', type: 'text', placeholder: "Enter your service description", dropdown: false, value: serviceDesc, onChange: (e) => {
            setServiceDescError("")
            setServiceDesc(e.target.value)
          }, error: serviceDescError
        },
        { name: 'servicetype', label: 'Service Type (*VIP services have top priority in queue)', type: 'text', placeholder: "Select Service Type", dropdown: true, value: `${vipService ? 'VIP' : 'Regular'}` },

        {
          name: 'serviceprice', label: 'Service Price', type: 'text', placeholder: "Enter your service price", dropdown: false, value: servicePrice, onChange: (e) => {
            setServicePriceError("")
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setServicePrice(value);
            }
          }, error: servicePriceError
        },
        {
          name: 'serviceewt', label: 'Service Estimated Time (mins)', type: 'text', placeholder: "Enter your service estimated time", dropdown: false, value: serviceEWT, onChange: (e) => {
            setServiceEwtError("")
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setServiceEWT(value);
            }
          }, error: serviceEwtError
        },
      ],
    },
    {
      label: 'Gallery',
      fields: [
      ],
    },
    {
      label: 'Social Links',
      fields: [
        { name: "website", type: 'text', placeholder: 'Website URL', icon: <WebsiteIcon />, value: webLink, onChange: (e) => setHandler(setWebLink, e.target.value, "webLink", setWebLinkError) },
        { name: "facebook", type: 'text', placeholder: 'Facebook URL', icon: <FacebookIcon />, value: fbLink, onChange: (e) => setHandler(setFbLink, e.target.value, "fbLink", setFbLinkError) },
        { name: "instagram", type: 'text', placeholder: 'Instagram URL', icon: <InstagramIcon />, value: instraLink, onChange: (e) => setHandler(setInstraLink, e.target.value, "instraLink", setInstaLinkError) },
        { name: "x", type: 'text', placeholder: 'X URL', icon: <XIcon />, value: twitterLink, onChange: (e) => setHandler(setTwitterLink, e.target.value, "twitterLink", setTwitterLinkError) },
        { name: "titkok", type: 'text', placeholder: 'Tiktok URL', icon: <TiktokIcon />, value: tiktokLink, onChange: (e) => setHandler(setTiktokLink, e.target.value, "tiktokLink", setTiktokLinkError) },
      ],
    },
  ];


  const [activeStep, setActiveStep] = useState(0);


  const handleNext = () => {

    if (activeStep === 0) {
      if (!salonName) {
        toast.error("Please enter salon name", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonNameError("Please enter salon name")
      }

      if (salonName.length === 0 || salonName.length > 20) {
        toast.error("Salon Name must be between 1 to 20 characters", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonNameError("Salon Name must be between 1 to 20 characters");
      }

      if (!salonDesc) {
        toast.error("Please enter salon description", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonDescError("Please enter salon description")
      }

      if (salonDesc.length === 0 || salonDesc.length > 35) {
        toast.error("Salon Description must be between 1 to 35 characters", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonDescError("Salon Description must be between 1 to 35 characters");
      }

      if (!salonEmail) {
        toast.error("Please enter salon email", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonEmailError("Please enter salon email")
      }

      if (!emailRegex.test(salonEmail)) {
        toast.error("Invalid email format", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: "0.3rem",
            background: "#333",
            color: "#fff",
          },
        });
        return setSalonEmailError("Invalid email format");
      }

      if (invalidnumber) {
        toast.error("Invalid Number", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });

        return setInvalidNumberError("Invalid Number")
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {

      if (!salonType) {
        toast.error("Please select salon type", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonTypeError("Please select salon type")
      }

      if (!address) {
        toast.error("Please enter salon address", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonAddressError("Please enter salon address")
      }

      if (!postCode) {
        toast.error("Please enter postcode", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setPostCodeError("Please enter postcode")
      }


      if (!longitude && !latitude) {
        toast.error("Coordinates is not present", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setSalonCoordinateError("Coordinates is not present")
      }

      if (postCode.length === 0 || postCode.length > 10) {
        toast.error("Postcode must be between 0 to 10 charecters", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setPostCodeError("Postcode must be between 0 to 10 charecters")
      }

      if (!country) {
        toast.error("Please select country", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setCountryError("Please select country")
      }

      if (!city) {
        toast.error("Please select city", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setCityError("Please select city")
      }

      if (!timezone) {
        toast.error("Please select timezone", {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        return setTimezoneError("Please select timezone")
      }


      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  const [businessTypeOpen, setBusinessTypeOpen] = useState(false)
  const [countryOpen, setCountryOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [timezoneOpen, setTimezoneOpen] = useState(false)
  const [serviceTypeOpen, setServiceTypeOpen] = useState(false)


  return (
    <section className={`${style.section}`}>
      <div>
        <h2>Create Salon</h2>
      </div>

      <div className={`${style.form_main_container}`}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            "& .MuiStepIcon-root": {
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "2rem",
              color: "var(--bg-tertiary)",
            },
            "& .MuiStepIcon-text": {
              fontSize: "1.4rem",
              color: "var(--text-primary)",
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "var(--bg-secondary)",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              background: "green",
              borderRadius: "50%",
              color: "var(--text-primary)",
              padding: "0.5rem"
            },
          }}

        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                <span className={`${style.stepper_heading}`}>{step.label}</span>
              </StepLabel>

              {
                step.label === "Account Information" && (<StepContent>
                  <main className={`${style.form_container}`}>
                    {step.fields.map((field) => (
                      <div key={field.name} className={`${style.form_group}`}>
                        <label>{field.label}</label>

                        {
                          field.name === "contactTel" ?
                            (<>
                              <PhoneInput
                                forceDialCode={true}
                                defaultCountry={countryflag}
                                value={contactTel}
                                onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                              />
                              {invalidNumberError ? <p style={{ color: "red", fontSize: "1.4rem" }}>{invalidNumberError}</p> : null}
                            </>) :
                            (
                              <>
                                <input
                                  type={field.type}
                                  name={field.name}
                                  value={field.value}
                                  placeholder={field.placeholder}
                                  onChange={(e) => field.onChange(field.setState, e.target.value, field.name, field.setError)}
                                />
                                {field.error ? <p style={{ color: "red", fontSize: "1.4rem" }}>{field.error}</p> : null}
                              </>
                            )
                        }

                      </div>
                    ))}
                    <div className={`${style.button_container}`}>
                      <div></div>
                      <button onClick={handleNext}>
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </button>
                    </div>
                  </main>
                </StepContent>)
              }

              {
                step.label === "Business Information" && (<StepContent>
                  <main className={`${style.form_container}`}>
                    {step.fields.map((field) => (
                      <div key={field.name} className={`${style.form_group}`}>
                        <label>{field.label}</label>

                        {
                          field.dropdown ? (
                            field.name === "businesstype" ? (
                              <>
                                <div className={`${style.select_container}`} onClick={() => setBusinessTypeOpen((prev) => !prev)}>
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    value={field.value}
                                    placeholder={field.placeholder}
                                    readOnly
                                  />
                                  <div><DropdownIcon /></div>

                                  {
                                    businessTypeOpen ? (
                                      <ClickAwayListener onClickAway={() => setBusinessTypeOpen(false)}>
                                        <div className={`${style.select_dropdown_container}`} onClick={(event) => event.stopPropagation()} >
                                          <button onClick={() => field.salonTypeHandler("Barber Shop")}>Barber Shop</button>
                                          <button onClick={() => field.salonTypeHandler("Hair Dresser")}>Hair Dresser</button>
                                        </div></ClickAwayListener>) : null
                                  }
                                </div>
                                {salonTypeError ? <p style={{ color: "red", fontSize: "1.4rem" }}>{salonTypeError}</p> : null}
                              </>
                            ) : field.name === "country" ? (
                              <>
                                <div className={`${style.select_container}`} onClick={() => setCountryOpen((prev) => !prev)}>
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    value={country}
                                    placeholder={field.placeholder}
                                    readOnly
                                  />
                                  <div><DropdownIcon /></div>

                                  {
                                    countryOpen ? (
                                      <ClickAwayListener onClickAway={() => setCountryOpen(false)}>
                                        <div className={`${style.select_search_dropdown_container}`} onClick={(event) => event.stopPropagation()} >
                                          <div className={`${style.search_box} ${darkmodeOn && style.dark}`}>
                                            <input
                                              type="text"
                                              placeholder='Search Country'
                                              value={searchCountry}
                                              onChange={(e) => searchCountryHandler(e.target.value)}
                                            />

                                            <div><SearchIcon /></div>
                                          </div>
                                          {
                                            getAdminAllCountriesLoading ?
                                              <Skeleton count={2}
                                                height={"4rem"}
                                                width={"100%"}
                                                baseColor={"var(--loader-bg-color)"}
                                                highlightColor={"var(--loader-highlight-color)"}
                                                style={{
                                                  borderRadius: "0.3rem",
                                                  marginBottom: "1rem"
                                                }}
                                              /> :
                                              getAdminAllCountriesResolve && copyCountriesdata?.length > 0 ?

                                                copyCountriesdata?.map((c) => (
                                                  <button key={c._id} onClick={() => setCountryHandler(c)}>{c.name}</button>
                                                ))
                                                :
                                                <div>
                                                  <p style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "1.4rem" }}>No countries available</p>
                                                </div>
                                          }
                                        </div></ClickAwayListener>) : null
                                  }

                                </div>
                                {countryError ? <p style={{ color: "red", fontSize: "1.4rem" }}>{countryError}</p> : null}
                              </>
                            ) : field.name === "city" ? (
                              <>
                                <div className={`${style.select_container}`} onClick={() => setCityOpen((prev) => !prev)}>
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    value={city}
                                    placeholder={field.placeholder}
                                    readOnly
                                  />
                                  <div><DropdownIcon /></div>

                                  {
                                    cityOpen ? (
                                      <ClickAwayListener onClickAway={() => setCityOpen(false)}>
                                        <div className={`${style.select_search_dropdown_container}`} onClick={(event) => event.stopPropagation()} >
                                          <div className={`${style.search_box} ${darkmodeOn && style.dark}`}>
                                            <input
                                              type="text"
                                              placeholder='Search City'
                                              value={searchCity}
                                              onChange={(e) => searchCityHandler(e.target.value)}
                                            />

                                            <div><SearchIcon /></div>
                                          </div>

                                          {
                                            getAdminAllCitiesLoading ?
                                              <Skeleton count={2}
                                                height={"4rem"}
                                                width={"100%"}
                                                baseColor={"var(--loader-bg-color)"}
                                                highlightColor={"var(--loader-highlight-color)"}
                                                style={{
                                                  borderRadius: "0.3rem",
                                                  marginBottom: "1rem"
                                                }}
                                              /> :
                                              getAdminAllCitiesResolve && copyCitiesData?.length > 0 ?

                                                copyCitiesData.map((c, index) => (
                                                  <button key={index} onClick={() => setCityHandler(c)}>{c.name}</button>
                                                ))
                                                :
                                                <div>
                                                  <p style={{ position: "absolute", top: "60%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "1.4rem" }}>No cities available</p>
                                                </div>
                                          }
                                        </div></ClickAwayListener>) : null
                                  }


                                </div>
                                {
                                  !countryCodePresent ? <p style={{ color: "red", fontSize: "1.4rem" }}>Please select country</p> : cityError && <p style={{ color: "red", fontSize: "1.4rem" }}>{cityError}</p>
                                }
                              </>
                            ) : field.name === "timezone" && (
                              <>
                                <div className={`${style.select_container}`} onClick={() => setTimezoneOpen((prev) => !prev)}>
                                  <input
                                    type={field.type}
                                    name={field.name}
                                    value={timezone}
                                    placeholder={field.placeholder}
                                    readOnly
                                  />
                                  <div><DropdownIcon /></div>

                                  {
                                    timezoneOpen ? (
                                      <ClickAwayListener onClickAway={() => setTimezoneOpen(false)}>
                                        <div className={`${style.select_dropdown_container}`} onClick={(event) => event.stopPropagation()} >
                                          {
                                            getAdminAllTimezoneLoading ?
                                              <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
                                              getAdminAllTimezoneResolve && AllTimezones?.length > 0 ?

                                                AllTimezones.map((c, index) => (
                                                  <button key={index} onClick={() => setTimezoneHandler(c)}>{c}</button>
                                                ))

                                                :
                                                <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
                                                  <p style={{ fontSize: "1.4rem" }}>No timezone available</p>
                                                </div>
                                          }
                                        </div></ClickAwayListener>) : null
                                  }

                                </div>
                                {
                                  !countryCodePresent ? <p style={{ color: "red", fontSize: "1.4rem" }}>Please select country</p> : timezoneError && <p style={{ color: "red", fontSize: "1.4rem" }}>{timezoneError}</p>
                                }
                              </>
                            )


                          ) : (
                            field.name === "address" ? (
                              <>
                                <input
                                  type={field.type}
                                  name={field.name}
                                  value={field.value}
                                  placeholder={field.placeholder}
                                  onChange={(e) => field.onChange(field.setState, e.target.value, field.name, field.setError)}
                                />
                                {field.error ? <p style={{ color: "red", fontSize: "1.4rem" }}>{field.error}</p> : null}
                              </>
                            ) : field.name === "postcode" ? (
                              <>
                                <input
                                  type={field.type}
                                  name={field.name}
                                  value={field.value}
                                  placeholder={field.placeholder}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (!/^[a-zA-Z0-9]*$/.test(value)) {
                                      setPostCodeError("Postcode must only contain letters and numbers");
                                      return
                                    }
                                    setHandler(setPostCode, value, "postCode", setPostCodeError)
                                  }}
                                />
                                {field.error ? <p style={{ color: "red", fontSize: "1.4rem" }}>{field.error}</p> : null}
                              </>
                            ) : (<>
                              <input
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                placeholder={field.placeholder}
                                readOnly
                              />
                              {salonCoordinateError ? <p style={{ color: "red", fontSize: "1.4rem" }}>{salonCoordinateError}</p> : null}
                            </>)

                          )
                        }

                        {field.name === "longitude" && (
                          <button className={`${style.geolocation_btn}`} onClick={geoLocationHandler}>
                            Get geolocation
                          </button>
                        )}

                      </div>
                    ))}
                    <div className={`${style.button_container}`}>
                      <button onClick={handleBack} disabled={index === 0}>
                        Back
                      </button>
                      <button onClick={handleNext}>
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </button>
                    </div>
                  </main>
                </StepContent>)
              }


              {
                step.label === "Select Services" && (<StepContent>
                  <main className={`${style.service_container}`}>

                    <div>
                      <div>
                        {step.fields.map((field) => (
                          <div key={field.name} className={`${style.form_group}`}>
                            <label>{field.label}</label>

                            {field.name === "serviceicon" ? (
                              <>
                                <div className={style.service_icon_container}>
                                  <Carousel
                                    responsive={responsive}
                                    draggable={false}
                                    swipeable={false}
                                  >
                                    {
                                      SalonIcons?.map((s) => (
                                        <div key={s._id}
                                          className={`${style.slider_item} ${selectedLogo?.url === s.url && style.icon_selected} ${darkmodeOn && style.dark}`}
                                          onClick={() => logoselectHandler(s)}
                                          style={{
                                            border: field.error && "0.1rem solid red"
                                          }}
                                        >
                                          <img src={s.url} alt="" />
                                        </div>
                                      ))
                                    }
                                  </Carousel>
                                </div>
                                {field.error ? <p style={{ color: "red", fontSize: "1.4rem" }}>{field.error}</p> : null}
                              </>
                            ) : field.name === "servicetype" ? (
                              <div
                                className={`${style.select_container}`}
                                onClick={() => setServiceTypeOpen((prev) => !prev)}
                              >
                                <input
                                  type={field.type}
                                  name={field.name}
                                  value={field.value}
                                  placeholder={field.placeholder}
                                  readOnly
                                />
                                <div><DropdownIcon /></div>

                                {serviceTypeOpen && (
                                  <ClickAwayListener onClickAway={() => setServiceTypeOpen(false)}>
                                    <div
                                      className={`${style.select_dropdown_container}`}
                                      onClick={(event) => event.stopPropagation()}
                                    >
                                      <button onClick={() => vipServiceHandler(false)}>Regular</button>
                                      <button onClick={() => vipServiceHandler(true)}>VIP</button>
                                    </div>
                                  </ClickAwayListener>
                                )}
                              </div>
                            ) : (
                              <>
                                <input
                                  type={field.type}
                                  name={field.name}
                                  value={field.value}
                                  placeholder={field.placeholder}
                                  onChange={field.onChange}
                                />
                                {field.error ? <p style={{ color: "red", fontSize: "1.4rem" }}>{field.error}</p> : null}
                              </>
                            )}
                          </div>
                        ))}


                        <button className={style.add_service_btn} onClick={addServiceHandler}>Add Service</button>

                        <div className={`${style.button_container}`}>
                          <button onClick={handleBack} disabled={index === 0}>
                            Back
                          </button>
                          <button onClick={handleNext} disabled={localsalondata?.selectedServices?.length === 0 || !localsalondata?.selectedServices} style={{
                            cursor: localsalondata?.selectedServices?.length === 0 || !localsalondata?.selectedServices ? "not-allowed" : "pointer"
                          }}>
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                          </button>
                        </div>

                      </div>

                      <div>
                        {
                          localsalondata?.selectedServices?.map((ser, index) => {
                            return (
                              <div className={`${style.service_item}`} key={index}>
                                <div>
                                  <div>
                                    <div><img src={ser?.serviceIcon.url || ""} alt="" /></div>
                                    <div>
                                      <p>{ser.serviceName}</p>
                                      <p>{ser.vipService ? "VIP" : "Regular"}</p>
                                      <p>{ser.serviceDesc}</p>
                                    </div>
                                  </div>
                                  <button onClick={() => deleteServiceHandler(index)}><DeleteIcon /></button>
                                </div>
                                <div>
                                  <div>
                                    <p>Price</p>
                                    <p>{countryCurrency}{" "} {ser.servicePrice}</p>
                                  </div>

                                  <div>
                                    <p>Estimated Time</p>
                                    <p>{ser.serviceEWT} mins</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }

                      </div>

                    </div>


                  </main>
                </StepContent>)
              }

              {
                step.label === "Gallery" && (
                  <StepContent>
                    <main className={`${style.gallery_container}`}>
                      <div>
                        <div>
                          <p>Upload your salon's logo</p>
                          <button onClick={() => handleSalonLogoButtonClick()}>Upload</button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleSalonFileInputChange}
                          />
                        </div>

                        <div>
                          <img src={salonLogo ? salonLogo : "/maskable-icon-512x512.png"} alt="" />
                        </div>
                      </div>

                      <div>
                        <div>
                          <p>Please select high-quality images to showcase your salon.</p>
                          <button onClick={() => handleSalonImageButtonClick()}>upload</button>
                          <input
                            type="file"
                            ref={salonImagefileInputRef}
                            style={{ display: 'none' }}
                            multiple
                            onChange={handleSalonImageFileInputChange}
                          />
                        </div>

                        <div>
                          {
                            salonImages.map((item, index) => {
                              return (
                                <div key={index} onClick={() => selectedSalonImageClicked(item)}><img src={item?.blobUrl} /></div>
                              )
                            })
                          }
                        </div>
                      </div>


                      <div className={`${style.button_container}`}>
                        <button onClick={handleBack} disabled={index === 0}>
                          Back
                        </button>
                        <button onClick={handleNext}>
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </button>
                      </div>
                    </main>
                  </StepContent>
                )
              }

              {
                step.label === "Social Links" && (<StepContent>
                  <main className={`${style.social_link_container}`}>
                    {step.fields.map((field) => (
                      <div key={field.name} className={`${style.form_group}`}>
                        <div>
                          <div>{field.icon}</div>
                          <input
                            type={field.type}
                            name={field.name}
                            value={field.value}
                            placeholder={field.placeholder}
                            onChange={field.onChange}
                          />
                        </div>
                      </div>
                    ))}
                    <div className={`${style.button_container}`}>
                      <button onClick={handleBack} disabled={index === 0}>
                        Back
                      </button>
                      <button onClick={handleNext}>
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </button>
                    </div>
                  </main>
                </StepContent>)
              }

            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length && (
          <div className={`${style.complete}`}>
            <p>All steps have been successfully completed! Click the <span style={{ color: "var(--bg-secondary)", fontWeight: "bold" }}>Create</span> button to set up your new salon.</p>
            <div>
              <button onClick={handleBack}>
                Back
              </button>
              {
                createSalonLoading ? <button><ButtonLoader /></button> : <button onClick={createSalonHandler} className={style.create_salon_btn}>Create</button>
              }
            </div>
          </div>
        )}
      </div>


      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
          <div>
            <p>Selected Image</p>
            <button onClick={() => setOpenModal(false)}><CloseIcon /></button>
          </div>

          <div className={style.modal_content_container}>
            <div><img src={openBlobSalonImage?.blobUrl} alt="salon image" /></div>
            <div>
              <div>
                <button onClick={handleCurrentEditSalonImageButtonClick}>
                  {/* <div><EditIcon /></div> */}
                  Reselect

                  <input
                    type="file"
                    ref={currentEditSalonImageInputRef}
                    style={{ display: 'none' }}
                    onChange={handleEditSelectedImageFileInputChange}
                  />
                </button>
                <button onClick={() => deleteSalonImageHandler(openBlobSalonImage)}>
                  {/* <div><DeleteIcon /></div> */}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>


    </section>
  )
}

export default CreateSalon
