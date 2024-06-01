import React, { useEffect, useRef, useState } from 'react'
import "./CreateSalon.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CameraIcon, DeleteIcon, DropdownIcon, Uploadicon } from '../../../icons';
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux';
import { adminCreateSalonAction, getAdminAllCitiesAction, getAdminAllCountriesAction, getAdminAllSalonIconAction, getAdminAllTimezoneAction } from '../../../Redux/Admin/Actions/SalonAction';
import api from '../../../Redux/api/Api';
import { useNavigate } from 'react-router-dom';
import ButtonLoader from '../../../components/ButtonLoader/ButtonLoader';

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

  const [image, setImage] = useState("")
  const [salonEmail, setSalonEmail] = useState("")
  const [salonName, setSalonName] = useState("")
  const [address, setAddress] = useState("")

  const [postCode, setPostCode] = useState("")
  const [contactTel, setContactTel] = useState("")

  const [webLink, setWebLink] = useState("")
  const [fbLink, setFbLink] = useState("")
  const [twitterLink, setTwitterLink] = useState("")
  const [instraLink, setInstraLink] = useState("")

  const [serviceName, setServiceName] = useState("")
  const [serviceDesc, setServiceDesc] = useState("")
  const [servicePrice, setServicePrice] = useState("")
  const [serviceEWT, setServiceEWT] = useState("")

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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


  const slidedata = [
    {
      _id: 1,
      item: "https://static.vecteezy.com/system/resources/previews/024/284/257/original/beauty-salon-logo-design-free-vector.jpg"
    },
    {
      _id: 2,
      item: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-logo-design-template-cec2f4ebd3c26a13f805033c6b1e9776_screen.jpg?ts=1646827912"
    },
    {
      _id: 3,
      item: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-logo%2C-berber-shop-logo-%282%29-design-template-f3e545ef9d52cb9e7ae3417ce224e7cc_screen.jpg?ts=1670083891"
    },
    {
      _id: 4,
      item: "https://i.etsystatic.com/25554738/r/il/e41d02/2658645383/il_1080xN.2658645383_98de.jpg"
    },
    {
      _id: 5,
      item: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-logo-template-template-design-a9bd85723adce8b0807a304e83ee311c_screen.jpg?ts=1646827983"
    },
    {
      _id: 6,
      item: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtJ5LX65c_fr-nkD6VUBrkBFmgSgZ3Z5pZmdcpcvpR3BG-qG_c58NAis2_8E7lw6cZtPE&usqp=CAU"
    },
    {
      _id: 7,
      item: "https://static.vecteezy.com/system/resources/previews/021/966/428/non_2x/beauty-logo-for-woman-logo-can-be-used-for-beauty-salon-cosmetic-spa-premium-vector.jpg"
    },
    {
      _id: 8,
      item: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyasp38zhIQ4j-x0Mo6xgd5SQmykEhuRt2-xOW6-oNw&s"
    },
    {
      _id: 9,
      item: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/hair-salon-logo-design-template-cec2f4ebd3c26a13f805033c6b1e9776_screen.jpg?ts=1646827912"
    },
    {
      _id: 10,
      item: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4Z0Y0uJHZp4dGFLekfimfc19sCFo6QN_reeW56TFuw&s"
    },
    {
      _id: 11,
      item: "https://pnclogosofficial.s3.us-west-2.amazonaws.com/2020/10/09153501/salon-logos-20-scaled.jpg"
    },
    {
      _id: 12,
      item: "https://previews.123rf.com/images/butenkow/butenkow1511/butenkow151100071/48324057-beauty-female-face-logo-design-cosmetic-salon-logo-design-creative-woman-face-vector.jpg"
    },
  ]


  const [salonType, setSalonType] = useState("")
  const [salonTypeDrop, setSalonTypeDrop] = useState(false)

  const salonTypeDropHandler = () => {
    setSalonTypeDrop((prev) => !prev)
  }

  const salonTypeHandler = (value) => {
    setSalonType(value)
    setSalonTypeDrop(false)
  }

  const [country, setCountry] = useState("")
  const [countryDrop, setCountryDrop] = useState(false)
  const [countrycode, setCountryCode] = useState("")

  const setCountryHandler = (value) => {
    setCountryCode(value.countryCode)
    setCountry(value.name)
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

  const countryinputRef = useRef()
  const countryDropRef = useRef()

  useEffect(() => {
    const handleClickCountryOutside = (event) => {
      if (
        countryinputRef.current &&
        countryDropRef.current &&
        !countryinputRef.current.contains(event.target) &&
        !countryDropRef.current.contains(event.target)
      ) {
        setCountryDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickCountryOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickCountryOutside);
    };
  }, []);


  const getAdminAllCountries = useSelector(state => state.getAdminAllCountries)

  const {
    loading: getAdminAllCountriesLoading,
    resolve: getAdminAllCountriesResolve,
    response: AllCountries
  } = getAdminAllCountries


  const [city, setCity] = useState("")
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

  const cityinputRef = useRef()
  const cityDropRef = useRef()

  useEffect(() => {
    const handleClickCityOutside = (event) => {
      if (
        cityinputRef.current &&
        cityDropRef.current &&
        !cityinputRef.current.contains(event.target) &&
        !cityDropRef.current.contains(event.target)
      ) {
        setCityDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickCityOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickCityOutside);
    };
  }, []);

  const getAdminAllCities = useSelector(state => state.getAdminAllCities)

  const {
    loading: getAdminAllCitiesLoading,
    resolve: getAdminAllCitiesResolve,
    response: AllCities
  } = getAdminAllCities

  const [timezone, setTimezone] = useState("")
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

  const timezoneinputRef = useRef()
  const timezoneDropRef = useRef()

  useEffect(() => {
    const handleClickTimezoneOutside = (event) => {
      if (
        timezoneinputRef.current &&
        timezoneDropRef.current &&
        !timezoneinputRef.current.contains(event.target) &&
        !timezoneDropRef.current.contains(event.target)
      ) {
        setTimezoneDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickTimezoneOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickTimezoneOutside);
    };
  }, []);


  const [startTime, setStartTime] = useState("")
  const [startTimeDrop, setStartTimeDrop] = useState(false)

  const startTimeDropHandler = () => {
    setStartTimeDrop((prev) => !prev)
  }

  const setStartTimeHandler = (value) => {
    setStartTime(value)
    setStartTimeDrop(false)
  }

  const startTimeinputRef = useRef()
  const startTimeDropRef = useRef()

  useEffect(() => {
    const handleClickStartTimeOutside = (event) => {
      if (
        startTimeinputRef.current &&
        startTimeDropRef.current &&
        !startTimeinputRef.current.contains(event.target) &&
        !startTimeDropRef.current.contains(event.target)
      ) {
        setStartTimeDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickStartTimeOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickStartTimeOutside);
    };
  }, []);


  const [endTime, setEndTime] = useState("")
  const [endTimeDrop, setEndTimeDrop] = useState(false)

  const endTimeDropHandler = () => {
    setEndTimeDrop((prev) => !prev)
  }

  const setEndTimeHandler = (value) => {
    setEndTime(value)
    setEndTimeDrop(false)
  }

  const endTimeinputRef = useRef()
  const endTimeDropRef = useRef()

  useEffect(() => {
    const handleClickEndTimeOutside = (event) => {
      if (
        endTimeinputRef.current &&
        endTimeDropRef.current &&
        !endTimeinputRef.current.contains(event.target) &&
        !endTimeDropRef.current.contains(event.target)
      ) {
        setEndTimeDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickEndTimeOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickEndTimeOutside);
    };
  }, []);

  const [timeOptions, setTimeOptions] = useState([]);

  // Function to add leading zero for single-digit hours and minutes
  const addLeadingZero = (num) => (num < 10 ? '0' : '') + num;

  // Function to generate time options
  const generateTimeOptions = () => {
    const options = [];

    // Loop through hours (0 to 23)
    for (let hour = 0; hour < 24; hour++) {
      // Loop through minutes (0 and 30)
      for (let minute = 0; minute < 60; minute += 30) {
        // Format the time as HH:mm
        const time = addLeadingZero(hour) + ':' + addLeadingZero(minute);
        options.push({ value: time, label: time });
      }
    }

    setTimeOptions(options);
  };

  // Call the function to generate time options when the component mounts

  useEffect(() => {
    generateTimeOptions();
  }, []);


  const [intervalTime, setIntervalTime] = useState("")
  const [intervalTimeDrop, setIntervalTimeDrop] = useState(false)

  const intervalTimeDropHandler = () => {
    setIntervalTimeDrop((prev) => !prev)
  }

  const setIntervalTimeHandler = (value) => {
    setIntervalTime(value)
    setIntervalTimeDrop(false)
  }

  const intervalTimeinputRef = useRef()
  const intervalTimeDropRef = useRef()

  useEffect(() => {
    const handleClickIntervalTimeOutside = (event) => {
      if (
        intervalTimeinputRef.current &&
        intervalTimeDropRef.current &&
        !intervalTimeinputRef.current.contains(event.target) &&
        !intervalTimeDropRef.current.contains(event.target)
      ) {
        setIntervalTimeDrop(false);
      }
    };

    document.addEventListener('mousedown', handleClickIntervalTimeOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickIntervalTimeOutside);
    };
  }, []);

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

  const salonTypeIconRef = useRef()
  const salonTypeDropRef = useRef()

  useEffect(() => {
    const handleClickSalonTypeOutside = (event) => {
      if (
        salonTypeIconRef.current &&
        salonTypeDropRef.current &&
        !salonTypeIconRef.current.contains(event.target) &&
        !salonTypeDropRef.current.contains(event.target)
      ) {
        setSalonTypeDrop(false)
      }
    };

    document.addEventListener('mousedown', handleClickSalonTypeOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickSalonTypeOutside);
    };
  }, []);


  const [vipService, setVipService] = useState(false)
  const [vipServiceDrop, setVipServiceDrop] = useState(false)

  const vipServiceDropHandler = () => {
    setVipServiceDrop((prev) => !prev)
  }

  const vipServiceHandler = (value) => {
    setVipService(value)
    setVipServiceDrop(false)
  }

  const vipServiceIconRef = useRef()
  const vipServiceDropRef = useRef()

  useEffect(() => {
    const handleClickVipServiceOutside = (event) => {
      if (
        vipServiceIconRef.current &&
        vipServiceDropRef.current &&
        !vipServiceIconRef.current.contains(event.target) &&
        !vipServiceDropRef.current.contains(event.target)
      ) {
        setVipServiceDrop(false)
      }
    };

    document.addEventListener('mousedown', handleClickVipServiceOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickVipServiceOutside);
    };
  }, []);


  const [loading, setLoading] = useState(false)

  const [salonLogo, setSalonLogo] = useState("")


  const fileInputRef = useRef(null);

  const handleSalonLogoButtonClick = () => {
    fileInputRef.current.click();
  };

  const [uploadSalonLogo, setUploadSalonLogo] = useState("")

  const handleSalonFileInputChange = async (e) => {
    const uploadImage = e.target.files[0]; // Get the uploaded file



    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedTypes.includes(uploadImage.type)) {
      alert("Please upload a valid image file (JPEG, WebP, PNG).");
      return;
    }

    const imageUrl = URL.createObjectURL(uploadImage);

    setSalonLogo(imageUrl);
    setUploadSalonLogo(uploadImage)
  };

  const [salonImages, setSalonImages] = useState([])

  const salonImagefileInputRef = useRef(null);

  const handleSalonImageButtonClick = () => {
    salonImagefileInputRef.current.click();
  };

  const [uploadSalonImages, setUploadSalonImages] = useState([])

  const handleSalonImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    // Iterate over each uploaded file
    const urls = Array.from(uploadedFiles).map((file) => {
      // Check if the file type is allowed
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only valid image files (JPEG, WebP, PNG).");
        return null;
      }
      // Create a URL representing the file content
      return URL.createObjectURL(file);
    });

    // Filter out null values (in case of invalid files) and update the state with valid URLs
    setSalonImages(urls.filter((url) => url !== null));
    setUploadSalonImages(uploadedFiles)
  };

  const [mobilesalonlogo, setMobileSalonlogo] = useState("")

  const mobileSalonInputRef = useRef(null);

  const handleMobileSalonLogoButtonClick = () => {
    mobileSalonInputRef.current.click();
  };

  const handleMobileSalonFileInputChange = async (e) => {
    const uploadImage = e.target.files[0]; // Get the uploaded file

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedTypes.includes(uploadImage.type)) {
      alert("Please upload a valid image file (JPEG, WebP, PNG).");
      return;
    }

    setMobileSalonlogo(uploadImage.name)
  };


  const [mobilesalonimagesnames, setMobileSalonimagesnames] = useState("")

  const mobileSalonImageInputRef = useRef(null);

  const handleMobileSalonImageButtonClick = () => {
    mobileSalonImageInputRef.current.click();
  };

  const handleMobileSalonImageFileInputChange = async (e) => {
    const uploadedFiles = e.target.files;

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];

    // Iterate over each uploaded file
    const names = Array.from(uploadedFiles).map((file) => {
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only valid image files (JPEG, WebP, PNG).");
        return null;
      }

      return file.name;
    }).filter(Boolean);

    setMobileSalonimagesnames((prevImages) => [...prevImages, ...names]);
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

    if (serviceName === '' || serviceDesc === '' || servicePrice === '' || serviceEWT === '') {
      alert("Please fill all the fields")
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
      serviceEWT: Number(serviceEWT)
    }

    setSelectedServices([...selectedServices, service])

    setSelectedLogo({ url: "", public_id: "" })
    setServiceName("")
    setServicePrice("")
    setVipService(false)
    setServiceDesc("")
    setServiceEWT("")
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

    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);

    setSelectedServices(updatedServices);
  }

  const [image2, setImage2] = useState("https://img.freepik.com/free-photo/interior-latino-hair-salon_23-2150555185.jpg")

  const navigate = useNavigate()

  const createSalonHandler = () => {
    const salondata = {
      adminEmail: email,
      salonEmail,
      salonName,
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
      contactTel,
      salonType,
      webLink,
      fbLink,
      instraLink,
      twitterLink,
      appointmentSettings: { startTime, endTime, intervalInMinutes: Number(intervalTime) },
      services: selectedServices,
      // image:image2
    }

    console.log(salondata)
    dispatch(adminCreateSalonAction(salondata, navigate))
  }

  const adminCreateSalon = useSelector(state => state.adminCreateSalon)

  const {
    loading:createSalonLoading,
    response: createSalonResponse
  } = adminCreateSalon


  useEffect(() => {
    if (createSalonResponse?.salonId) {
      const uploadImageHandler = async () => {
        if (uploadSalonImages != null) {
          const formData = new FormData();

          const SalonId = createSalonResponse?.salonId;
          formData.append('salonId', SalonId);

          for (const file of uploadSalonImages) {
            formData.append('gallery', file);
          }

          try {
            const imageResponse = await api.post('/api/salon/uploadSalonImage', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            console.log('Upload success:', imageResponse.data);

            alert("Image uploaded Successfully")
          } catch (error) {
            console.error('Image upload failed:', error);
            setSalonImages([]);
            setUploadSalonImages([])
          }
        }
      };

      uploadImageHandler();
    }

    //For Salon Logo
    if (createSalonResponse?.salonId) {
      const uploadImageHandler = async () => {
        if (uploadSalonLogo != null) {
          const formData = new FormData();

          const SalonId = createSalonResponse?.salonId;

          if (SalonId) {
            formData.append('salonId', SalonId);
            formData.append('salonLogo', uploadSalonLogo);

            try {
              const imageResponse = await api.post('/api/salon/uploadSalonLogo', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });

              console.log('Upload success:', imageResponse.data);
              alert("Salon Logo uploaded Successfully")
            } catch (error) {
              console.error('Image upload failed:', error);
              setSalonLogo("")
              setUploadSalonLogo("")
            }
          }

        }
      };

      uploadImageHandler();
    }

  }, [createSalonResponse?.salonId]);

  return (
    <div className='create_salon_wrapper'>
      <p>Create Salon</p>
      <div className='create_salon_content_wrapper'>
        <div>
          <div>
            {/* <div><img src={salonImages[0]} alt="" /></div> */}
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
            <div>
              <img src={`${salonLogo}`} alt="" />
              <div>
                <button onClick={() => handleSalonLogoButtonClick()}><CameraIcon /></button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleSalonFileInputChange}
                />
              </div>
            </div>

            <div>
              <p>Salon Name: Classic Touch</p>
              <p>City: Athens</p>
              <p>Country: United States of America</p>
            </div>
          </div>

          <div>
            {
              salonImages.map((s, index) => (
                <div key={index}><img src={s} alt="" /></div>
              ))
            }
          </div>

          <button
            className='salon_upload_button'
            onClick={() => handleSalonImageButtonClick()}
          >
            <div><Uploadicon /></div>
            <p>Salon Images</p>

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
          <div>
            <p>Salon Email</p>
            <input
              type="text"
              value={salonEmail}
              onChange={(e) => setSalonEmail(e.target.value)}
            />
          </div>

          <div>
            <p>Salon Name</p>
            <input
              type="text"
              value={salonName}
              onChange={(e) => setSalonName(e.target.value)}
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
              />
            </div>

            <div>
              <p>Longitude</p>
              <input
                type="number"
                value={longitude}
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
                onChange={(e) => searchCountryHandler(e)}
                ref={countryinputRef}
              />

              {countryDrop && <div ref={countryDropRef}>
                {
                  getAdminAllCountriesLoading && !getAdminAllCountriesResolve ?
                    <p>Loading...</p> :
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
              </div>}

            </div>

            <div>
              <p>City</p>
              <input
                type="text"
                value={city}
                onChange={(e) => searchCityHandler(e)}
                ref={cityinputRef}
              />

              {cityDrop && <div ref={cityDropRef}>
                {
                  getAdminAllCitiesLoading && !getAdminAllCitiesResolve ?
                    <p>Loading...</p> :
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
              </div>}
            </div>
          </div>

          <div>
            <div>
              <p>Time Zone</p>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                onClick={() => timezoneDropHandler()}
                ref={timezoneinputRef}
              />

              {timezoneDrop && <div ref={timezoneDropRef}>
                {
                  getAdminAllTimezoneLoading && !getAdminAllTimezoneResolve ?
                    <p>Loading...</p> :
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
              </div>}
            </div>

            <div>
              <p>Postal Code</p>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div>
              <p>Start Time</p>
              <input
                type="text"
                value={`${startTime ? `${startTime} hr` : ''}`}
                onChange={(e) => setStartTime(e.target.value)}
                onClick={() => startTimeDropHandler()}
                ref={startTimeinputRef}
              />

              {startTimeDrop && <div ref={startTimeDropRef}>
                {timeOptions.map((option) => (
                  <p key={option} value={option} onClick={() => setStartTimeHandler(option?.value)}>
                    {option?.value} hr
                  </p>
                ))}
              </div>}
            </div>

            <div>
              <p>End Time</p>
              <input
                type="text"
                value={`${endTime ? `${endTime} hr` : ''}`}
                onChange={(e) => setEndTime(e.target.value)}
                onClick={() => endTimeDropHandler()}
                ref={endTimeinputRef}
              />

              {endTimeDrop && <div ref={endTimeDropRef}>
                {timeOptions.map((option) => (
                  <p key={option} value={option} onClick={() => setEndTimeHandler(option?.value)}>
                    {option?.value} hr
                  </p>
                ))}
              </div>}
            </div>

            <div>
              <p>Intvl Tm</p>
              <input
                type="text"
                value={`${intervalTime ? `${intervalTime} mins` : ''}`}
                onChange={(e) => setIntervalTime(e.target.value)}
                onClick={() => intervalTimeDropHandler()}
                ref={intervalTimeinputRef}
              />

              {intervalTimeDrop && <div ref={intervalTimeDropRef}>
                {intervalTimemin.map((option) => (
                  <p key={option} value={option} onClick={() => setIntervalTimeHandler(option)}>
                    {option} mins
                  </p>
                ))}
              </div>}
            </div>
          </div>

          <div>
            <p>Salon Type</p>
            <input
              type="text"
              value={`${salonType ? `${salonType}` : ''}`}
              onClick={() => salonTypeDropHandler()}
              ref={salonTypeIconRef}
            />

            {salonTypeDrop && <div ref={salonTypeDropRef}>
              <p onClick={() => salonTypeHandler("Salon Type 1")}>Salon Type 1</p>
              <p onClick={() => salonTypeHandler("Salon Type 2")}>Salon Type 2</p>
              <p onClick={() => salonTypeHandler("Salon Type 3")}>Salon Type 3</p>
            </div>}
          </div>

          <div>
            <p>Contact Tel.</p>
            <input
              type="text"
              value={contactTel}
              onChange={(e) => setContactTel(e.target.value)}
            />
          </div>

          <p>Add Your Services</p>

          <p>Choose your service icon:</p>
          <div>
            <div>
              {
                getAdminAllSalonIconLoading && !getAdminAllSalonIconResolve ?
                  <div className='create_salon_carousel_loader'>
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
                      style={{
                        borderRadius: "1rem"
                      }}
                    />
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
                      style={{
                        borderRadius: "1rem"
                      }}
                    />
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
                      style={{
                        borderRadius: "1rem"
                      }}
                    />
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
                      style={{
                        borderRadius: "1rem"
                      }}
                    />
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
                      style={{
                        borderRadius: "1rem"
                      }}
                    />
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
                      style={{
                        borderRadius: "1rem"
                      }}
                    />
                    <Skeleton count={1}
                      height={"9rem"}
                      width={"9rem"}
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
                          <div key={s._id} className='slider_item' onClick={() => logoselectHandler(s)}
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
            <p>Service Type</p>
            <input
              type="text"
              value={`${vipService ? 'Vip' : 'Regular'}`}
              onClick={() => vipServiceDropHandler()}
              ref={vipServiceIconRef}
            />

            {vipServiceDrop && <div ref={vipServiceDropRef}>
              <p onClick={() => vipServiceHandler(false)}>Regular</p>
              <p onClick={() => vipServiceHandler(true)}>Vip</p>
            </div>}
          </div>

          <div>
            <div>
              <p>Service Price</p>
              <input
                type="text"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
              />
            </div>

            <div>
              <p>Est Wait Tm(mins)</p>
              <input
                type="text"
                value={serviceEWT}
                onChange={(e) => setServiceEWT(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button onClick={addServiceHandler}>Add Service</button>
          </div>

          <div className='service_container'>
            {
              selectedServices.map((ser, index) => (

                <div className='service_container_item' key={index}>
                  <div><img src={ser.serviceIcon.url ? ser.serviceIcon.url : ""} alt="" /></div>
                  <p>{ser.serviceName}</p>
                  <p>{ser.serviceDesc}</p>
                  <p>{ser.serviceType}</p>
                  <p>${ser.servicePrice}</p>
                  <p>{ser.serviceEWT}min</p>
                  <div onClick={() => deleteServiceHandler(index)}><DeleteIcon /></div>
                </div>
              ))
            }
          </div>


          <div className='salon_logo_wrapper'>
            <p>Select Salon Logo</p>
            <div>
              <button onClick={() => handleMobileSalonLogoButtonClick()}>
                Upload
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={mobileSalonInputRef}
                  onChange={handleMobileSalonFileInputChange}
                />
              </button>

              <div>{mobilesalonlogo}</div>
            </div>
          </div>


          <div className='salon_images_wrapper'>
            <div>
              <p>Select Salon Images</p>

              <button onClick={() => handleMobileSalonImageButtonClick()}>
                Upload
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={mobileSalonImageInputRef}
                  onChange={handleMobileSalonImageFileInputChange}
                  multiple
                />
              </button>
            </div>

            <div>
              <p>{mobilesalonimagesnames && mobilesalonimagesnames.join(',  ')}</p>
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
            {
              createSalonLoading ? <button style={{
                display:"grid",
                placeItems:"center"
              }}><ButtonLoader/></button> : <button onClick={createSalonHandler}>Submit</button>
            }          
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateSalon


