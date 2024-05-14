import React, { useState } from 'react'
import "./CreateSalon.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
              <input type="text" />
            </div>

            <div>
              <p>City</p>
              <input type="text" />
            </div>
          </div>

          <div>
            <div>
              <p>Time Zone</p>
              <input type="text" />
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
              <p>Interval Time</p>
              <input type="text" />
            </div>

            <div>
              <p>Time Zone</p>
              <input type="text" />
            </div>
          </div>

          <div>
            <p>Contact Tel.</p>
            <input type="text" />
          </div>

          <p>Add Your Services</p>

          <p>Choose your service icon:</p>
          <div>
            <div>
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

        </div>
      </div>
    </div>
  )
}

export default CreateSalon

// import React from 'react'
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const CreateSalon = () => {

  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 6
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1
  //   }
  // };

// const slidedata = [
//   {
//     _id:1,
//     item:1
//   },
//   {
//     _id:2,
//     item:2
//   },
//   {
//     _id:3,
//     item:3
//   },
//   {
//     _id:4,
//     item:4
//   },
//   {
//     _id:5,
//     item:5
//   },
//   {
//     _id:6,
//     item:6
//   },
//   {
//     _id:7,
//     item:7
//   },
//   {
//     _id:8,
//     item:8
//   },
//   {
//     _id:9,
//     item:9
//   },
//   {
//     _id:10,
//     item:10
//   },
//   {
//     _id:11,
//     item:11
//   },
//   {
//     _id:12,
//     item:12
//   },
// ]

//   return (
//     <div style={{ width: "60%" }}>
// <Carousel responsive={responsive}>
//   {slidedata.map((s) => (
//     <div key={s._id} style={{width:"95%",height:"7rem",border:"2px solid black"}}>{s.item}</div>
//   ))}
// </Carousel>
//     </div>
//   )
// }

// export default CreateSalon