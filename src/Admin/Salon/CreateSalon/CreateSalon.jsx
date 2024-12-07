import React, { useEffect, useRef, useState } from 'react'
import style from "./CreateSalon.module.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CameraIcon, ClockIcon, CloseIcon, DeleteIcon, EditIcon, SearchIcon, Uploadicon } from '../../../icons';
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
import { ClickAwayListener, Modal } from '@mui/material';
import { adminGetDefaultSalonAction } from '../../../Redux/Admin/Actions/AdminHeaderAction';

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

    setSalonTypeDrop(false)
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
    setCountryDrop(false)
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

  // useEffect(() => {
  //   if (!!Object.keys(getAdminAllCountriesError || {}).length) {
  //     setCountry("")
  //     setCity("")
  //     setTimezone("")
  //     setCountryCode("")
  //   }
  // }, [getAdminAllCountriesError])

  const [city, setCity] = useState("")
  const [cityDrop, setCityDrop] = useState(false)

  const setCityHandler = (value) => {
    setCity(value.name)
    setCityDrop(false)
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


  // console.log("Get All Cities ", AllCities)
  // console.log("All Cities Error ", getAdminAllCitiesError)

  // useEffect(() => {
  //   if (!!Object.keys(getAdminAllCitiesError || {}).length) {
  //     setCity("")
  //   }
  // }, [getAdminAllCitiesError])

  const [timezone, setTimezone] = useState("")
  const [timezoneDrop, setTimezoneDrop] = useState(false)

  const timezoneDropHandler = () => {
    setTimezoneDrop((prev) => !prev)
  }

  const setTimezoneHandler = (value) => {

    setTimezone(value)
    setTimezoneDrop(false)
  }

  // useEffect(() => {
  //   return () => {
  //     dispatch({})
  //   }
  // },[])

  // useEffect(() => {
  //   if (countrycode) {
  //     dispatch(getAdminAllTimezoneAction(countrycode))
  //   }
  // }, [countrycode, dispatch])

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
          fontSize: "var(--list-modal-header-normal-font)",
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
          fontSize: "var(--list-modal-header-normal-font)",
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
          fontSize: "var(--list-modal-header-normal-font)",
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
    setSelectedLogo({
      url: serviceImg.url,
      public_id: serviceImg.public_id
    });
  }

  const [selectedServices, setSelectedServices] = useState([])


  const addServiceHandler = () => {

    if (serviceName === '' || serviceDesc === '' || servicePrice === '' || serviceEWT === '' || selectedLogo.url === "" && selectedLogo.public_id === "") {
      toast.error("Please fill all the services", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }


    if (serviceName.length < 1 || serviceName.length > 25) {
      return toast.error("Service Name must be between 1 to 25 charecters", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    }


    if (serviceDesc.length < 1 || serviceDesc.length > 50) {
      return toast.error("Service Description must be between 1 to 50 charecters", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
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
          fontSize: "var(--list-modal-header-normal-font)",
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
          fontSize: "var(--list-modal-header-normal-font)",
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

  const createSalonHandler = async () => {
    if (!salonName) {
      return setSalonNameError("Please enter salon name")
    }
    if (invalidnumber) {
      toast.error("Invalid Number", {
        duration: 3000,
        style: {
          fontSize: "var(--list-modal-header-normal-font)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
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
                  fontSize: "var(--list-modal-header-normal-font)",
                  borderRadius: '0.3rem',
                  background: '#333',
                  color: '#fff',
                },
              });
            } catch (error) {
              toast.error(error?.response?.data?.message, {
                duration: 3000,
                style: {
                  fontSize: "var(--list-modal-header-normal-font)",
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
          fontSize: "var(--list-modal-header-normal-font)",
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

    const { country, inputValue } = meta;

    const isValid = isPhoneValid(phone);

    if (isValid) {
      setContactTel(phone)
      setDialCode(country?.dialCode)
      setCountryFlag(country?.iso2)
      setInvalidNumber(false)
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
  }, [selectedServices]);

  const setHandler = (setState, value, localname) => {
    setState(value);
    console.log("Saving to localStorage:", localname, value);

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

  return (
    <div className={`${style.create_salon_wrapper} ${darkmodeOn && style.dark}`}>
      <div><p>Create Salon</p></div>
      <div className={`${style.create_salon_content_wrapper} ${darkmodeOn && style.dark}`}>
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

            <div className={style.create_salon_logo_container}>
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
                <div key={index} onClick={() => selectedSalonImageClicked(s)} style={{ cursor: "pointer" }}><img src={s?.blobUrl} alt="" /></div>
              ))
            }
          </div>

        </div>

        <div>
          <div>
            <p>Name</p>

            <input
              type="text"
              value={salonName}
              onChange={(e) => {
                setSalonNameError("")
                setHandler(setSalonName, e.target.value, "salonName")
              }}
              onKeyDown={handleKeyPress}
              style={{
                // border: salonNameError ? "0.1rem solid red" : "none"
              }}
            />
            {/* <p style={{ color: "red", fontSize: "12px"}}>{salonNameError}</p> */}
          </div>

          <div>
            <p>Email</p>
            <input
              type="text"
              value={salonEmail}
              onChange={(e) => setHandler(setSalonEmail, e.target.value, "salonEmail")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Desc</p>
            <input
              type="text"
              value={salonDesc}
              onChange={(e) => setHandler(setSalonDesc, e.target.value, "salonDesc")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Address</p>
            <input
              type="text"
              value={address}
              onChange={(e) => setHandler(setAddress, e.target.value, "address")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <div>
              <p>Latitude</p>
              <input
                type="text"
                value={latitude}
                readOnly
                style={{ outline: "none" }}
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Longitude</p>
              <input
                type="text"
                value={longitude}
                readOnly
                style={{ outline: "none" }}
                onKeyDown={handleKeyPress}
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
                onClick={() => setCountryDrop(true)}
                readOnly
                style={{ border: !countryCodePresent && "0.1rem solid red" }}
              />

              {countryDrop &&
                <ClickAwayListener onClickAway={() => setCountryDrop(false)}>
                  <div>
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
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "0.3rem",
                            marginBottom: "1rem"
                          }}
                        /> :
                        getAdminAllCountriesResolve && copyCountriesdata?.length > 0 ?

                          copyCountriesdata?.map((c) => (
                            <p key={c._id} onClick={() => setCountryHandler(c)}>{c.name}</p>
                          ))
                          :
                          <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
                            <p style={{ fontSize: "var(--list-content-error-text)" }}>No countries available</p>
                          </div>
                    }
                  </div>
                </ClickAwayListener>}

            </div>

            <div>
              <p>City</p>
              <input
                type="text"
                value={city}
                onClick={() => setCityDrop(true)}
                readOnly
                style={{ border: !countryCodePresent && "0.1rem solid red" }}
              />

              {cityDrop &&
                <ClickAwayListener onClickAway={() => setCityDrop(false)}>
                  <div>
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
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "0.3rem",
                            marginBottom: "1rem"
                          }}
                        /> :
                        getAdminAllCitiesResolve && copyCitiesData?.length > 0 ?

                          copyCitiesData.map((c) => (
                            <p key={c._id} onClick={() => setCityHandler(c)}>{c.name}</p>
                          ))
                          :
                          <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
                            <p style={{ fontSize: "var(--list-content-error-text)" }}>No city available</p>
                          </div>
                    }
                  </div>
                </ClickAwayListener>}
            </div>
          </div>

          <div>
            <div>
              <p>Timezone</p>
              <input
                type="text"
                value={timezone}
                onClick={() => timezoneDropHandler()}
                readOnly
                style={{ border: !countryCodePresent && "0.1rem solid red" }}
              // onKeyDown={handleKeyPress}
              // disabled={!!Object.keys(getAdminAllCountriesError || {}).length || !countrycode}
              />

              {timezoneDrop && <ClickAwayListener onClickAway={() => setTimezoneDrop(false)}><div>
                {
                  getAdminAllTimezoneLoading ?
                    <div style={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}><ButtonLoader color={"#000"} /></div> :
                    getAdminAllTimezoneResolve && AllTimezones?.length > 0 ?

                      AllTimezones.map((c) => (
                        <p key={c._id} onClick={() => setTimezoneHandler(c)}>{c}</p>
                      ))

                      :
                      <div style={{ display: "grid", placeItems: "center", width: "100%", height: "100%" }}>
                        <p style={{ fontSize: "var(--list-content-error-text)" }}>No timezone available</p>
                      </div>
                }
              </div></ClickAwayListener>}
            </div>

            <div>
              <p>Post Code</p>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setHandler(setPostCode, e.target.value, "postCode")}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>

          <div />

          <div>
            <p>Type</p>
            <input
              type="text"
              value={`${salonType ? `${salonType}` : ''}`}
              onClick={() => salonTypeDropHandler()}
              className='salontype_input'
              onKeyDown={handleKeyPress}
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
              <div onKeyDown={handleKeyPress}>
                <PhoneInput
                  forceDialCode={true}
                  defaultCountry={countryflag}
                  value={contactTel}
                  onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                />
              </div>

            </div>
          </div>

          <div className={style.add_services_drop}>
            <button onClick={addservicedropHandler} className={style.addservices_btn}>Add Services</button>
          </div>

          {
            openServices &&
            <main className={`${style.add_services_drop_container} ${darkmodeOn && style.dark}`}>
              <p>Choose your service icon</p>
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
                            borderRadius: "6px"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "6px"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "6px"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "6px"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "6px"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "6px"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--lightmode-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--lightmode-loader-highlight-color)"}
                          style={{
                            borderRadius: "6px"
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
                                  border: selectedLogo?.url === s.url ? "2px solid var(--primary-bg-color3)" : "1px solid rgba(0,0,0,0.4)"
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
                  onKeyDown={handleKeyPressAddServices}
                />
              </div>

              <div>
                <p>Service Desc</p>
                <input
                  type="text"
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  onKeyDown={handleKeyPressAddServices}
                />
              </div>

              <div>
                <p>Service Type (*VIP services have top priority in queue)</p>
                <input
                  type="text"
                  value={`${vipService ? 'VIP' : 'Regular'}`}
                  onClick={() => vipServiceDropHandler()}
                  onKeyDown={handleKeyPressAddServices}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setServicePrice(value);
                      }
                    }}
                    onKeyDown={handleKeyPressAddServices}
                  />
                </div>

                <div>
                  <p>Est Wait Tm(mins)</p>
                  <input
                    type="text"
                    value={serviceEWT}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setServiceEWT(value);
                      }
                    }}
                    onKeyDown={handleKeyPressAddServices}
                  />
                </div>
              </div>

              <div>
                <button onClick={addServiceHandler} className={style.add_service_btn}>Add Service</button>
              </div>

              <div className={`${style.service_container} ${darkmodeOn && style.dark}`}>
                {
                  localsalondata?.selectedServices?.map((ser, index) => {
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
            <p>Select Logo</p>
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


          <div className={`${style.salon_images_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
              <p style={{
                fontSize: "var(--list-content-body-text)",
                fontWeight: "600"
              }}>Select Images</p>

              <button onClick={() => handleSalonImageButtonClick()}
                style={{ fontSize: "var(--list-content-body-text)" }}>
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
              <p>{salonImages?.map((s) => s.name).join(',')}</p>
            </div>
          </div>

          <div>
            <p>Web Link</p>
            <input
              type="text"
              value={webLink}
              onChange={(e) => setHandler(setWebLink, e.target.value, "webLink")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Facebook Link</p>
            <input
              type="text"
              value={fbLink}
              onChange={(e) => setHandler(setFbLink, e.target.value, "fbLink")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Instagram Link</p>
            <input
              type="text"
              value={instraLink}
              onChange={(e) => setHandler(setInstraLink, e.target.value, "instraLink")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Twitter Link</p>
            <input
              type="text"
              value={twitterLink}
              onChange={(e) => setHandler(setTwitterLink, e.target.value, "twitterLink")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Tiktok Link</p>
            <input
              type="text"
              value={tiktokLink}
              onChange={(e) => setHandler(setTiktokLink, e.target.value, "tiktokLink")}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            {
              createSalonLoading ? <button className={style.create_salon_btn} style={{
                display: "grid",
                placeItems: "center"
              }}><ButtonLoader /></button> : <button onClick={createSalonHandler} className={style.create_salon_btn}>Create</button>
            }
          </div>

        </div>
      </div>


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
            <div><img src={openBlobSalonImage?.blobUrl} alt="salon image" /></div>
            <div>
              <div>
                <button onClick={handleCurrentEditSalonImageButtonClick}>
                  <div><EditIcon /></div>
                  <p>Reselect</p>

                  <input
                    type="file"
                    ref={currentEditSalonImageInputRef}
                    style={{ display: 'none' }}
                    onChange={handleEditSelectedImageFileInputChange}
                  />
                </button>
                <button onClick={() => deleteSalonImageHandler(openBlobSalonImage)}>
                  <div><DeleteIcon /></div>
                  <p>Remove</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}

export default CreateSalon



