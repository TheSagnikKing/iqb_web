// import React from 'react'
// import style from './MobileSidebar.module.css'
// import { Outlet, useLocation } from 'react-router-dom'
// import Header from '../Header/Header.jsx'
// import { useSelector } from 'react-redux'
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'

// const MobileSidebar = () => {

//   const location = useLocation()

//   const darkMode = useSelector(darkmodeSelector)

//   const darkmodeOn = darkMode === "On"

//   return (
//     <main className={style.container}>
//       <div className={`${style.mobile_content} ${darkmodeOn && style.dark}`}
//         style={{
//           width: "100%"
//         }}
//       >
//         <div>
//           <Header />
//           <div><Outlet /></div>
//         </div>
//       </div>
//     </main>
//   )
// }

// export default MobileSidebar


import React, { useState } from 'react'
import style from './MobileSidebar.module.css'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js'

const MobileSidebar = () => {

  const location = useLocation()

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  const [mobileSidebar, setMobileSidebar] = useState(false)

  return (
    <section className={`${style.mobile_container}`}>
      <Header mobileSidebar={mobileSidebar} setMobileSidebar={setMobileSidebar} />
      <Outlet />

      {
        mobileSidebar ? (<aside>
          <div style={{
            width: mobileSidebar ? "24rem" : "0rem",
            transition: "width 0.3s ease-in-out"
          }}>
            <button onClick={() => setMobileSidebar((prev) => !prev)}>close</button>
            <h1>Sidebar</h1>
          </div>
        </aside>) : null
      }

    </section>
  )
}

export default MobileSidebar