import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import './Dashboard.css'
import { Link } from 'react-router-dom'

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
      <div>Div 3</div>
      <div>Div 4</div>
      <div>Div 5</div>
    </div>
  )
}

export default Dashboard