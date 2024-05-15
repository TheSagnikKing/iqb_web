import React, { useEffect, useRef, useState } from 'react'
import "./CreateSalon.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { DropdownIcon } from '../../../icons';
import Skeleton from 'react-loading-skeleton'

const CreateSalon = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
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

  const [selectedLogo, setSelectedLogo] = useState("")

  const logoselectHandler = (item) => {
    setSelectedLogo(item)
  }

  const [salonType, setSalonType] = useState("Regular")
  const [salonTypeDrop, setSalonTypeDrop] = useState(false)

  const salonTypeDropHandler = () => {
    setSalonTypeDrop((prev) => !prev)
  }

  const salonTypeHandler = (value) => {
    setSalonType(value)
    setSalonTypeDrop(false)
  }

  const [serviceType, setServiceType] = useState("Regular")
  const [serviceTypeDrop, setServiceTypeDrop] = useState(false)

  const serviceTypeDropHandler = () => {
    setServiceTypeDrop((prev) => !prev)
  }

  const serviceTypeHandler = (value) => {
    setServiceType(value)
    setServiceTypeDrop(false)
  }

  const [country, setCountry] = useState("")
  const [countryDrop, setCountryDrop] = useState(false)

  const countryDropHandler = () => {
    setCountryDrop((prev) => !prev)
  }

  const setCountryHandler = (value) => {
    setCountry(value)
    setCountryDrop(false)
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


  const [city, setCity] = useState("")
  const [cityDrop, setCityDrop] = useState(false)

  const cityDropHandler = () => {
    setCityDrop((prev) => !prev)
  }

  const setCityHandler = (value) => {
    setCity(value)
    setCityDrop(false)
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


  const [timezone, setTimezone] = useState("")
  const [timezoneDrop, setTimezoneDrop] = useState(false)

  const timezoneDropHandler = () => {
    setTimezoneDrop((prev) => !prev)
  }

  const setTimezoneHandler = (value) => {
    setTimezone(value)
    setTimezoneDrop(false)
  }

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

  const serviceTypeIconRef = useRef()
  const serviceTypeDropRef = useRef()

  useEffect(() => {
    const handleClickServiceTypeOutside = (event) => {
      if (
        serviceTypeIconRef.current &&
        serviceTypeDropRef.current &&
        !serviceTypeIconRef.current.contains(event.target) &&
        !serviceTypeDropRef.current.contains(event.target)
      ) {
        setServiceTypeDrop(false)
      }
    };

    document.addEventListener('mousedown', handleClickServiceTypeOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickServiceTypeOutside);
    };
  }, []);


  const [loading, setLoading] = useState(false)

  return (
    <div className='create_salon_wrapper'>
      <p>Create Salon</p>
      <div className='create_salon_content_wrapper'>
        <div>
          <div>
            <div>tp</div>
            <div>logo</div>
            <div>down</div>
          </div>
          <div>
            <div>Bx1</div>
            <div>Bx2</div>
            <div>Bx3</div>
          </div>
        </div>

        <div>
          <div>
            <p>Salon Email</p>
            <input type="text" />
          </div>

          <div>
            <p>Salon Name</p>
            <input type="text" />
          </div>

          <div>
            <p>Address</p>
            <input type="text" />
          </div>

          <div>
            <div>
              <p>Latitude</p>
              <input type="text" />
            </div>

            <div>
              <p>Longitude</p>
              <input type="text" />
            </div>
          </div>

          <div>
            <button>Get Geolocation</button>
          </div>

          <div>
            <div>
              <p>Country</p>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                onClick={() => countryDropHandler()}
                ref={countryinputRef}
              />

              {countryDrop && <div ref={countryDropRef}>
                <p onClick={() => setCountryHandler("India")}>India</p>
                <p onClick={() => setCountryHandler("USA")}>USA</p>
                <p onClick={() => setCountryHandler("China")}>China</p>
                <p onClick={() => setCountryHandler("Japan")}>Japan</p>
              </div>}

            </div>

            <div>
              <p>City</p>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onClick={() => cityDropHandler()}
                ref={cityinputRef}
              />

              {cityDrop && <div ref={cityDropRef}>
                <p onClick={() => setCityHandler("Alexander City")}>Alexander City</p>
                <p onClick={() => setCityHandler("Andalusia")}>Andalusia</p>
                <p onClick={() => setCityHandler("Anniston")}>Anniston</p>
                <p onClick={() => setCityHandler("Athens")}>Athens</p>
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
                <p onClick={() => setTimezoneHandler("Timezone 1")}>Timezone 1</p>
                <p onClick={() => setTimezoneHandler("Timezone 2")}>Timezone 2</p>
                <p onClick={() => setTimezoneHandler("Timezone 3")}>Timezone 3</p>
                <p onClick={() => setTimezoneHandler("Timezone 4")}>Timezone 4</p>
              </div>}
            </div>

            <div>
              <p>Postal Code</p>
              <input type="text" />
            </div>
          </div>

          <div>
            <div>
              <p>Start Time</p>
              <input type="text" />
            </div>

            <div>
              <p>End Time</p>
              <input type="text" />
            </div>

            <div>
              <p>Interval Time</p>
              <input type="text" />
            </div>
          </div>

          <div>
            <p>Salon Type : <b>{salonType}</b></p>
            <div
              onClick={() => salonTypeDropHandler()}
              ref={salonTypeIconRef}
            ><DropdownIcon /></div>

            {
              salonTypeDrop && <div ref={salonTypeDropRef}>
                <p onClick={() => salonTypeHandler("Regular")}>Regular</p>
                <p onClick={() => salonTypeHandler("Vip")}>Vip</p>
              </div>
            }
          </div>

          <div>
            <p>Contact Tel.</p>
            <input type="text" />
          </div>

          <p>Add Your Services</p>

          <p>Choose your service icon:</p>
          <div>
            <div>
              {
                loading ?
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
                  <Carousel
                    responsive={responsive}
                    draggable={false}
                    swipeable={false}
                  >
                    {
                      slidedata.map((s) => (
                        <div key={s._id} className='slider_item' onClick={() => logoselectHandler(s.item)}
                          style={{
                            border: selectedLogo === s.item ? "3px solid var(--primary-bg-color3)" : "1px solid black"
                          }}
                        >
                          <img src={s.item} alt="" />
                        </div>
                      ))
                    }
                  </Carousel>
              }

            </div>
          </div>

          <div>
            <p>Service Name</p>
            <input
              type="text" />
          </div>

          <div>
            <p>Service Desc</p>
            <input
              type="text" />
          </div>

          <div>
            <p>Service Type : <b>{serviceType}</b></p>
            <div
              onClick={() => serviceTypeDropHandler()}
              ref={serviceTypeIconRef}
            ><DropdownIcon /></div>

            {
              serviceTypeDrop && <div ref={serviceTypeDropRef}>
                <p onClick={() => serviceTypeHandler("Regular")}>Regular</p>
                <p onClick={() => serviceTypeHandler("Vip")}>Vip</p>
              </div>
            }
          </div>

          <div>
            <div>
              <p>Service Price</p>
              <input type="text" />
            </div>

            <div>
              <p>Estimated Waiting Time(mins)</p>
              <input type="text" />
            </div>
          </div>

          <div>
            <button>Add Service</button>
          </div>

          <div className='service_container'>
            <div className='service_container_item'>
              <div><img src={selectedLogo ? selectedLogo : ""} alt="" /></div>
              <p>Hair cut</p>
              <p>ladies hair cut of any length</p>
              <p>Regular</p>
              <p>$20</p>
              <p>30min</p>
              <div>+</div>
            </div>
            <div className='service_container_item'>
              <div><img src={selectedLogo ? selectedLogo : ""} alt="" /></div>
              <p>Hair cut</p>
              <p>ladies hair cut of any length</p>
              <p>Regular</p>
              <p>$20</p>
              <p>30min</p>
              <div>+</div>
            </div>
            <div className='service_container_item'>
              <div><img src={selectedLogo ? selectedLogo : ""} alt="" /></div>
              <p>Hair cut</p>
              <p>ladies hair cut of any length</p>
              <p>Vip</p>
              <p>$20</p>
              <p>30min</p>
              <div>+</div>
            </div>
            <div className='service_container_item'>
              <div><img src={selectedLogo ? selectedLogo : ""} alt="" /></div>
              <p>Hair cut</p>
              <p>ladies hair cut of any length</p>
              <p>Regular</p>
              <p>$20</p>
              <p>30min</p>
              <div>+</div>
            </div>
            <div className='service_container_item'>
              <div><img src={selectedLogo ? selectedLogo : ""} alt="" /></div>
              <p>Hair cut</p>
              <p>ladies hair cut of any length</p>
              <p>Vip</p>
              <p>$20</p>
              <p>30min</p>
              <div>+</div>
            </div>
            <div className='service_container_item'>
              <div><img src={selectedLogo ? selectedLogo : ""} alt="" /></div>
              <p>Hair cut</p>
              <p>ladies hair cut of any length</p>
              <p>Vip</p>
              <p>$20</p>
              <p>30min</p>
              <div>+</div>
            </div>
          </div>

          <div>
            <p>Web Link</p>
            <input type="text" />
          </div>

          <div>
            <p>Facebook Link</p>
            <input type="text" />
          </div>

          <div>
            <p>Instagram Link</p>
            <input type="text" />
          </div>

          <div>
            <p>Twitter Link</p>
            <input type="text" />
          </div>

          <div>
            <button>Submit</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateSalon


