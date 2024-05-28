import React, { useEffect, useRef, useState } from 'react'
import "./EditSalon.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CameraIcon, DeleteIcon, DropdownIcon, Uploadicon } from '../../../icons';
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux';
import { adminCreateSalonAction, adminEditSalonAction, getAdminAllCitiesAction, getAdminAllCountriesAction, getAdminAllSalonIconAction, getAdminAllTimezoneAction } from '../../../Redux/Admin/Actions/SalonAction';
import api from '../../../Redux/api/Api';
import { useLocation, useNavigate } from 'react-router-dom';

const EditSalon = () => {

  const location = useLocation()

  const currentSalon = location?.state
  console.log(currentSalon)

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

  const [salonEmail, setSalonEmail] = useState(currentSalon?.salonEmail)
  const [salonName, setSalonName] = useState(currentSalon?.salonName)
  const [address, setAddress] = useState(currentSalon?.address)

  const [postCode, setPostCode] = useState(currentSalon?.postCode)
  const [contactTel, setContactTel] = useState(currentSalon?.contactTel)

  const [webLink, setWebLink] = useState(currentSalon?.webLink)
  const [fbLink, setFbLink] = useState(currentSalon?.fbLink)
  const [twitterLink, setTwitterLink] = useState(currentSalon?.twitterLink)
  const [instraLink, setInstraLink] = useState(currentSalon?.instraLink)

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


  const [salonType, setSalonType] = useState(currentSalon?.salonType)
  const [salonTypeDrop, setSalonTypeDrop] = useState(false)

  const salonTypeDropHandler = () => {
    setSalonTypeDrop((prev) => !prev)
  }

  const salonTypeHandler = (value) => {
    setSalonType(value)
    setSalonTypeDrop(false)
  }

  const [country, setCountry] = useState(currentSalon?.country)
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


  const [startTime, setStartTime] = useState()
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


  const [intervalTime, setIntervalTime] = useState()
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

  const [salonLogo, setSalonLogo] = useState(currentSalon?.salonLogo[0]?.url || "")


  const fileInputRef = useRef(null);

  const handleSalonLogoButtonClick = () => {
    fileInputRef.current.click();
  };

  const [uploadSalonLogo, setUploadSalonLogo] = useState("")
  const [currentSalonLogoId, setCurrentSalonLogoId] = useState(currentSalon?.salonLogo[0]?.public_id);
  const [currentSalonLogoMongoId, setCurrentSalonLogoMongoId] = useState(currentSalon?.salonLogo[0]?._id)

  const handleSalonFileInputChange = async (e) => {
    const uploadImage = e.target.files[0]; // Get the uploaded file

    const allowedTypes = ["image/jpeg", "image/webp", "image/png"];
    if (!allowedTypes.includes(uploadImage.type)) {
      alert("Please upload a valid image file (JPEG, WebP, PNG).");
      return;
    }

    const imageUrl = URL.createObjectURL(uploadImage);

    const formData = new FormData();

        formData.append('public_imgid', currentSalonLogoId);
        formData.append('id', currentSalonLogoMongoId)
        formData.append('salonLogo', uploadImage)
        formData.append('salonId', currentSalon?.salonId)


        try {
            const imageResponse = await api.put('/api/salon/updateSalonLogo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Salon Logo Upload success:', imageResponse.data);
            setSalonLogo(imageUrl)
        } catch (error) {
            console.error('Image upload failed:', error);
        }
  };

  const [salonImages, setSalonImages] = useState(currentSalon?.gallery.map((s) => s.url))

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

  const [selectedServices, setSelectedServices] = useState(currentSalon?.services)

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

  const editSalonHandler = () => {
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
      salonId:currentSalon?.salonId,
      adminEmail:currentSalon?.adminEmail
      // image:image2
    }

    console.log(salondata)
    dispatch(adminEditSalonAction(salondata, navigate))
  }

  const adminCreateSalon = useSelector(state => state.adminCreateSalon)

  const {
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
    <div className='edit_salon_wrapper'>
      <p>Edit Salon</p>
      <div className='edit_salon_content_wrapper'>
        <div>
          <div>
            <div><img src={salonImages[0]} alt="" /></div>
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
                  <div><img src={ser.serviceIcon?.url ? ser.serviceIcon?.url : ""} alt="" /></div>
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
            <button onClick={editSalonHandler}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EditSalon


