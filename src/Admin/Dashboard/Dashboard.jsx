import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel';

const Dashboard = () => {

  const [loading, setLoading] = useState(false)

  return (
    <div className='admin_dashboard_page_container'>
      <div>
        {
          loading ?
            <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} /> :
            <div>
              <h1>Welcome Back Sagnik,</h1>
              <div>togg</div>
            </div>
        }

        <div>
          <div>Header</div>
          {
            loading ?
              <div>
                <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3.8rem"} style={{ borderRadius: "5px", marginTop: "1rem" }} />
              </div> :
              <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio numquam soluta iure quaerat voluptate debitis perspiciatis,
                  fugiat libero quos. Ducimus, quasi quaerat commodi inventore fugit expedita voluptates vero est laborum?</p>
                <button>Update</button>
              </div>
          }

        </div>
      </div>
      <div>
        <div>page</div>
        <div>
          <div>Queuelist header</div>
          {
            loading ?
              <div>
                <Skeleton count={1} height={"3rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3rem"} style={{ borderRadius: "5px" }} />
                <Skeleton count={1} height={"3rem"} style={{ borderRadius: "5px" }} />
              </div> :
              <div>
                <div>queue item</div>
                <div>queue item</div>
                <div>queue item</div>
                <div>queue item</div>
              </div>
          }
          <Link to="#">See All</Link>
        </div>
      </div>

      <div
        style={{ boxShadow: loading ? "none" : "0px 0px 6px rgba(0,0,0,0.4)" }}
      >
        {
          loading ?
            <div className='admin_dashboard_carousel_loading'>
              <Skeleton count={1}
                height={"100%"}
                width={"100%"}
                style={{
                  borderRadius: "1.5rem"
                }}
              />
            </div> :
            <div className='admin_dashboard_carousel'>
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={6000}
                showStatus={false}
                showArrows={false}
                stopOnHover={false}
              >
                <div className='admin_dashboard_carousel_item'>
                  <img src="https://images.fresha.com/lead-images/placeholders/barbershop-77.jpg?class=venue-gallery-large" />
                </div>

                <div className='admin_dashboard_carousel_item'>
                  <img src="https://img.freepik.com/free-photo/handsome-man-barber-shop-styling-hair_1303-20978.jpg" />
                </div>

                <div className='admin_dashboard_carousel_item'>
                  <img src="https://media.istockphoto.com/id/872361244/photo/man-getting-his-beard-trimmed-with-electric-razor.jpg?s=612x612&w=0&k=20&c=_IjZcrY0Gp-2z6AWTQederZCA9BLdl-iqWkH0hGMTgg=" />
                </div>

              </Carousel>
            </div>
        }

      </div>
      <div>Div 4</div>
      <div>Div 5</div>
    </div>
  )
}

export default Dashboard