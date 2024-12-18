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



  const [salonNameError, setSalonNameError] = useState("")
  const [salonDescError, setSalonDescError] = useState("")
  const [salonAddressError, setSalonAddressError] = useState("")
  const [invalidNumberError, setInvalidNumberError] = useState("")

  const [serviceIconError, setServiceIconError] = useState("")
  const [serviceNameError, setServiceNameError] = useState("")
  const [serviceDescError, setServiceDescError] = useState("")
  const [servicePriceError, setServicePriceError] = useState("")
  const [serviceEwtError, setServiceEwtError] = useState("")

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
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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

  const [uploadSalonImageLoader, setUploadSalonImageLoader] = useState(false)

  const handleSalonImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;
    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];


    const invalidFiles = Array.from(uploadedFiles).filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
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

    const files = Array.from(uploadedFiles);

    const formData = new FormData();
    const SalonId = currentSalon?.salonId;
    formData.append('salonId', SalonId);

    files.forEach(file => formData.append('gallery', file));

    try {
      setUploadSalonImageLoader(true)
      const { data } = await api.post('/api/salon/uploadSalonImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSalonImages([...data?.response, ...salonImages]);
      setUploadSalonImageLoader(false)

      toast.success("Salon images uploaded successfully", {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      setUploadSalonImageLoader(false)
      if (error?.response?.status === 500) {
        toast.error("Something went wrong !", {
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

      toast.error(error?.response?.data?.message, {
        duration: 3000,
        style: {
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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
    setServiceIconError("")
    setSelectedLogo({
      url: serviceImg.url,
      public_id: serviceImg.public_id
    });
  }

  const [selectedServices, setSelectedServices] = useState(currentSalon?.services)

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

  const handleKeyPressAddServices = (e) => {
    if (e.key === "Enter") {
      addServiceHandler();
    }
  };


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

    dispatch(adminEditSalonAction(salondata, navigate, email))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      editSalonHandler();
    }
  };

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
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });
        setHandleEditSalonLoader(false)
      } catch (error) {

        if (error?.response?.status === 500) {
          toast.error("Something went wrong !", {
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


        toast.error(error?.response?.data?.message, {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
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
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });

      } catch (error) {

        if (error?.response?.status === 500) {
          toast.error("Something went wrong !", {
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


        toast.error(error?.response?.data?.message, {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
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
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });

      } catch (error) {

        if (error?.response?.status === 500) {
          toast.error("Something went wrong !", {
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


        toast.error(error?.response?.data?.message, {
          duration: 3000,
          style: {
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
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
          fontSize: "var(--font-size-2)",
          borderRadius: '0.3rem',
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
            fontSize: "var(--font-size-2)",
            borderRadius: '0.3rem',
            background: '#333',
            color: '#fff',
          },
        });

        setMobileEditSelectedImageLoader(null);

      } catch (error) {

        if (error?.response?.status === 500) {
          toast.error("Something went wrong !", {
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
    } else {
      setInvalidNumber(true)
    }
  };


  useEffect(() => {
    const phoneInput = document.querySelector(
      '.react-international-phone-input-container .react-international-phone-input'
    );

    // const phonedropdown = document.querySelector(
    //   '.react-international-phone-country-selector-dropdown'
    // )

    // const phonedropfocus = document.querySelector(
    //   '.react-international-phone-country-selector-dropdown__list-item--selected, .react-international-phone-country-selector-dropdown__list-item--focused'
    // )

    if (phoneInput) {
      phoneInput.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
    }

    // if(phonedropdown){
    //   phonedropdown.style.color = darkmodeOn ? 'var(--light-color-4)' : 'var(--light-color-2)';
    //   phonedropdown.style.backgroundColor = darkmodeOn ? 'var(--dark-color-2)' : 'var(--light-color-4)';
    // }

  }, [darkmodeOn])

  return (
    <div className={`${style.edit_salon_wrapper} ${darkmodeOn && style.dark}`}>
      <div><p>Edit Salon</p></div>
      <div className={`${style.edit_salon_content_wrapper} ${darkmodeOn && style.dark}`}>
        <div>
          <div>
            <div>
              {
                salonImages?.[0] && <img src={salonImages?.[0]?.url} alt="cover-img" />
              }
            </div>

            <div className={`${style.edit_salon_logo_container} ${darkmodeOn && style.dark}`}>
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
              disabled={uploadSalonImageLoader}
            >

              {
                uploadSalonImageLoader ? (<ButtonLoader />) : (<><p>Upload</p>
                  <div><Uploadicon /></div>

                  <input
                    type="file"
                    ref={salonImagefileInputRef}
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleSalonImageFileInputChange}
                  /></>)
              }


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
            <p>Name</p>
            <input
              type="text"
              value={salonName}
              onChange={(e) => {
                setSalonNameError("")
                setSalonName(e.target.value)
              }}
              onKeyDown={handleKeyPress}
              style={{ border: salonNameError && "0.1rem solid red" }}
            />
            <p className={style.error_message}>{salonNameError}</p>
          </div>

          <div>
            <p>Email</p>
            <input
              type="text"
              value={salonEmail}
              readOnly
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Desc</p>
            <input
              type="text"
              value={salonDesc}
              onChange={(e) => {
                setSalonDescError("")
                setSalonDesc(e.target.value)
              }}
              onKeyDown={handleKeyPress}
              style={{ border: salonDescError && "0.1rem solid red" }}
            />
            <p className={style.error_message}>{salonDescError}</p>
          </div>

          <div>
            <p>Address</p>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setSalonAddressError("")
                setAddress(e.target.value)
              }}
              onKeyDown={handleKeyPress}
              style={{ border: salonAddressError && "0.1rem solid red" }}
            />
            <p className={style.error_message}>{salonAddressError}</p>
          </div>

          <div>
            <div>
              <p>Latitude</p>
              <input
                type="number"
                value={latitude}
                readOnly
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Longitude</p>
              <input
                type="number"
                value={longitude}
                readOnly
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
                readOnly
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>City</p>
              <input
                type="text"
                value={city}
                readOnly
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>

          <div>
            <div>
              <p>Time Zone</p>
              <input
                type="text"
                value={timezone}
                readOnly
                onKeyDown={handleKeyPress}
              />
            </div>

            <div>
              <p>Post Code</p>
              <input
                type="text"
                value={postCode}
                readOnly
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
              className={style.salontype_input}
              readOnly
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
              <div onKeyDown={handleKeyPress} style={{ border: invalidNumberError && "0.1rem solid red" }}>
                <PhoneInput
                  forceDialCode={true}
                  defaultCountry={countryflag}
                  value={contactTel}
                  onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                />
              </div>
            </div>
            <p className={style.error_message}>{invalidNumberError}</p>
          </div>

          <div className={style.add_services_drop}>
            <button onClick={addservicedropHandler} className={style.addservices_btn}>Select Services</button>
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
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                          style={{
                            borderRadius: "1rem"
                          }}
                        />
                        <Skeleton count={1}
                          height={"9rem"}
                          width={"9rem"}
                          baseColor={darkmodeOn ? "var(--darkmode-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--darkmode-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
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
                              <div key={s._id}
                                className={`${style.slider_item} ${selectedLogo?.url === s.url && style.icon_selected} ${darkmodeOn && style.dark}`}
                                onClick={() => logoselectHandler(s)}
                                style={{
                                  border: serviceIconError && "0.1rem solid red"
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
                  onChange={(e) => {
                    setServiceNameError("")
                    setServiceName(e.target.value)
                  }}
                  onKeyDown={handleKeyPressAddServices}
                  style={{ border: serviceNameError && "0.1rem solid red" }}
                />
                <p className={style.error_message}>{serviceNameError}</p>
              </div>

              <div>
                <p>Service Desc</p>
                <input
                  type="text"
                  value={serviceDesc}
                  onChange={(e) => {
                    setServiceDescError("")
                    setServiceDesc(e.target.value)
                  }}
                  onKeyDown={handleKeyPressAddServices}
                  style={{ border: serviceDescError && "0.1rem solid red" }}
                />
                <p className={style.error_message}>{serviceDescError}</p>
              </div>

              <div>
                <p>Service Type (*VIP services have top priority in queue)</p>
                <input
                  type="text"
                  value={`${vipService ? 'VIP' : 'Regular'}`}
                  onClick={() => vipServiceDropHandler()}
                  readOnly
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
                      setServicePriceError("")
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setServicePrice(value);
                      }
                    }}
                    onKeyDown={handleKeyPressAddServices}
                    style={{ border: servicePriceError && "0.1rem solid red" }}
                  />
                  <p className={style.error_message}>{servicePriceError}</p>
                </div>

                <div>
                  <p>Est Wait Tm(mins)</p>
                  <input
                    type="text"
                    value={serviceEWT}
                    onChange={(e) => {
                      setServiceEwtError("")
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setServiceEWT(value);
                      }
                    }}
                    onKeyDown={handleKeyPressAddServices}
                    style={{ border: serviceEwtError && "0.1rem solid red" }}
                  />
                  <p className={style.error_message}>{serviceEwtError}</p>
                </div>
              </div>

              <div>
                <button onClick={addServiceHandler} className={style.add_service_btn}>Add Service</button>
              </div>

              <div className={`${style.service_container} ${darkmodeOn && style.dark}`}>

                {
                  selectedServices?.map((ser, index) => {
                    return (
                      <div className={`${style.service_item} ${darkmodeOn && style.dark}`} key={index}>
                        <div className={`${style.service_item_top}`}>
                          <div><img src={ser?.serviceIcon?.url ? ser?.serviceIcon?.url : ""} alt="service icon" /></div>
                          <div>
                            <p>{ser?.serviceName}</p>
                            <p>{ser?.vipService ? "VIP" : "Regular"}</p>
                            <p>{ser?.serviceDesc}</p>
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

          <div className={`${style.salon_images_wrapper} ${darkmodeOn && style.dark}`}>
            <div>
              <p style={{
                fontSize: "var(--font-size-3)",
                fontWeight: "600"
              }}>Select Images</p>

              <button onClick={() => handleSalonImageButtonClick()}
                style={{ fontSize: "var(--font-size-3)" }}>
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
              <p style={{
                fontSize: "var(--font-size-3)",
                fontWeight: "600"
              }}>Update Images</p>

              <button onClick={() => setOpenMobileUpdateModal(true)} style={{ fontSize: "var(--font-size-3)" }}>
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
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Facebook Link</p>
            <input
              type="text"
              value={fbLink}
              onChange={(e) => setFbLink(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Instagram Link</p>
            <input
              type="text"
              value={instraLink}
              onChange={(e) => setInstraLink(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Twitter Link</p>
            <input
              type="text"
              value={twitterLink}
              onChange={(e) => setTwitterLink(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>

          <div>
            <p>Tiktok Link</p>
            <input
              type="text"
              value={tiktokLink}
              onChange={(e) => setTiktokLink(e.target.value)}
              onKeyDown={handleKeyPress}
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
        <div className={`${style.mobile_modal_container} ${darkmodeOn && style.dark}`}>
          <div>
            <p>Images</p>
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
        <div className={`${style.modal_container} ${darkmodeOn && style.dark}`}>
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


