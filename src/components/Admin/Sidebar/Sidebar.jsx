// import React, { useEffect, useState } from 'react';
// import style from './Sidebar.module.css';
// // import  MenuData  from '../MenuData.jsx';
// import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import { Adminqueueicon, LeftArrow, MoonIcon, RightArrow, Sunicon } from '../../../icons';
// import Header from '../Header/Header.jsx';
// import Skeleton from 'react-loading-skeleton';
// import { useDispatch, useSelector } from 'react-redux';
// import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js';
// import { IoMoon } from 'react-icons/io5';
// import { MdSunny } from 'react-icons/md';
// import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants.js';
// import MenuData from '../Menudata.jsx';


// const Sidebar = () => {
//   const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon);

//   const {
//     response: adminGetDefaultSalonResponse = {} // Add default value
//   } = adminGetDefaultSalon;

//   const [showSidebar, setShowSidebar] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch()

//   const [loading, setLoading] = useState(false);

//   const darkMode = useSelector(darkmodeSelector);


//   const darkHandler = () => {
//     dispatch({ type: DARK_MODE_ON });
//     localStorage.setItem("dark", "On");
//   }

//   const lightHandler = () => {
//     dispatch({ type: DARK_MODE_OFF });
//     localStorage.setItem("dark", "Off");
//   }

//   const toggleHandler = () => {
//     if (darkMode == "Off") {
//       darkHandler()
//     } else {
//       lightHandler()
//     }
//   }

//   const darkmodeOn = darkMode === "On";

//   return (
//     <main className={`${style.container} ${darkmodeOn && style.dark}`}>
//       <div className={`${style.sidebar} ${showSidebar ? style.show : style.hide} ${darkmodeOn && style.dark}`}>
//         <div>
//           <div className={showSidebar ? style.titleActive : style.titleInActive}>
//             {showSidebar ? <div className={`${style.sidebar_top_salon} ${darkmodeOn && style.dark}`}>
//               <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
//                 <img
//                   src={adminGetDefaultSalonResponse?.salonLogo?.[0]?.url || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
//                   alt="salonLogo"
//                 />
//               </div>
//               <p>{adminGetDefaultSalonResponse?.salonName}</p>
//             </div> : ""}
//           </div>
//         </div>

//         <div className={style.menu_items_container}>
//           {MenuData().map((m) => (
//             m.show ? (<div className={`${style.menu_item} ${location.pathname.includes(m.url) && `${style.menu_item_active} ${darkmodeOn && style.dark}`} ${darkmodeOn && style.dark}`} key={m.id} onClick={() => navigate(m?.url)}
//             >
//               <div style={{
//                 color: location.pathname.includes(m.url) && "var(--light-color-4)"
//               }}
//               >{m.icon}</div>
//               <p style={{
//                 color: location.pathname.includes(m.url) && "var(--light-color-4)"
//               }}>{m.title}</p>
//             </div>) : null
//           ))}

//           <div className={`${style.menu_theme_container} ${darkmodeOn && style.dark}`}
//             style={{
//               justifyContent: showSidebar ? "space-between" : "center"
//             }}
//           >
//             {
//               showSidebar && <p>Theme</p>
//             }

//             {
//               darkmodeOn ?
//                 <button onClick={toggleHandler}>
//                   <Sunicon />
//                 </button> :
//                 <button onClick={toggleHandler}>
//                   <MoonIcon />
//                 </button>
//             }

//           </div>
//         </div>

//         <button className={style.sidebar_toggle_btn} onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
//       </div>

//       <div className={`${style.content} ${darkmodeOn && style.dark}`}
//         style={{
//           width: showSidebar ? "calc(100vw - 20vw)" : "calc(100vw - 4vw)",
//         }}
//       >
//         <Header />
//         <div><Outlet /></div>
//       </div>
//     </main>
//   );
// }

// export default Sidebar;


import React, { useState } from 'react'
import style from './Sidebar.module.css'
import { Link, Outlet } from 'react-router-dom'
import Header from '../Header/Header.jsx';
import { AdvertisementIcon, BarberIcon, CustomerIcon, DashboardIcon, QueueHistoryIcon, QueueIcon, SalonIcon } from '../../../newicons.js';


const Sidebar = () => {

  const [sidebar, setSidebar] = useState(true)

  const sideMenuData = [
    {
      heading: "Dashboards",
      menuItems: [
        {
          id: 1,
          name: "Dashboard",
          icon: <DashboardIcon />
        },
        {
          id: 2,
          name: "Salon",
          icon: <SalonIcon />
        }, ,
        {
          id: 3,
          name: "Barber",
          icon: <BarberIcon />
        },
        {
          id: 4,
          name: "Customer",
          icon: <CustomerIcon />
        }, ,
        {
          id: 5,
          name: "Advertisement",
          icon: <AdvertisementIcon />
        },
      ]
    },
    {
      heading: "Apps",
      menuItems: [
        {
          id: 1,
          name: "Queue List",
          icon: <QueueIcon />
        },
        {
          id: 2,
          name: "Queue History",
          icon: <QueueHistoryIcon />
        },
      ]
    },
    {
      heading: "Other Options",
      menuItems: [
        {
          id: 1,
          name: "Queue List",
          icon: <QueueIcon />
        },
        {
          id: 2,
          name: "Queue History",
          icon: <QueueHistoryIcon />
        },
      ]
    },
  ]

  const [activeMenu, setActiveMenu] = useState(true)

  return (
    <main className={`${style.main_container}`}>
      <aside
        style={{
          width: sidebar ? "24rem" : "5rem",
        }}
      >
        <header>
          <div>
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/beauty-salon-logo-icon%2Cspa-logo%2Cgold-beauty-design-template-05b9bdfd3e13d2230a2846189d9660d4_screen.jpg?ts=1698222841" alt="" />
          </div>
          <p>Modern Unisex Salon</p>
        </header>

        <nav>
          <ul>
            {sideMenuData.map((section, pIndex) => (
              <li key={section.heading}>
                <p>{section.heading}</p>
                <ul>
                  {section.menuItems.map((item, cIndex) => (
                    <li
                      key={item.id}
                      className={`${pIndex === 0 && cIndex == 0 ? style.activeMenu : null}`}
                    >
                      <Link to={"#"}>
                        <span>{item.icon}</span> {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

      </aside>

      <section
      // className={`${style.content}`}
      // style={{
      //   width: showSidebar ? "calc(100vw - 20vw)" : "calc(100vw - 4vw)",
      // }}
      >
        <button onClick={() => {
          setSidebar((prev) => !prev)
        }}>close</button>
        {/* <Header /> */}
        {/* <Outlet /> */}
        {/* <h1>Dashboard</h1> */}

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate velit vel at perferendis sit, ipsam laboriosam possimus obcaecati ducimus dolorum, veniam, nesciunt quae saepe nemo necessitatibus adipisci nisi! Deleniti sit dolorem fugiat libero ratione ab obcaecati ut excepturi. Quae, repellendus dolor impedit asperiores eos animi deleniti accusamus magni consequatur odit. Fuga voluptatibus omnis repudiandae rem esse, vitae repellat ipsa fugiat aliquam totam adipisci voluptatum aut numquam sit iste placeat saepe reprehenderit sunt hic facere beatae quaerat perferendis incidunt eos! Magnam fuga repudiandae impedit, dolorem delectus ut omnis perferendis quisquam dolor, ducimus, quas id sed cupiditate hic sapiente libero officia nesciunt aut corrupti! Accusamus explicabo laboriosam hic amet, nemo inventore nostrum excepturi repellendus dolores suscipit dolore eius enim at soluta est odit cupiditate ut harum adipisci? Quis consequuntur dolores quos atque tempore omnis, voluptates obcaecati odio excepturi accusantium pariatur repellat incidunt sed est quam magni, illum maiores possimus quod ex minus. Fugit amet, tempora accusamus incidunt aliquam modi esse numquam blanditiis iste facere consectetur atque quas maxime minima debitis nisi doloribus expedita inventore quaerat, doloremque consequuntur nostrum natus culpa commodi officiis tempore eius tempora. Nisi dolor dolores repudiandae praesentium illo perspiciatis in est, eius repellendus ut doloribus alias eaque dolore deleniti assumenda officia odio tenetur, laboriosam odit repellat sint architecto blanditiis pariatur? Nesciunt odit, aut repellat numquam dolores aliquid tempore quia fuga suscipit voluptatibus minima. Doloremque soluta quisquam laboriosam dignissimos quas tenetur, fugit obcaecati vel laudantium dicta, aspernatur, facilis perferendis! Architecto debitis repellendus nam facilis. Velit quae distinctio tempore doloremque facilis repellendus corporis repudiandae vel quos necessitatibus magnam possimus ducimus ipsam quas beatae laudantium nemo fuga, fugiat optio cupiditate facere. Quis velit asperiores amet modi. Ratione vel provident commodi suscipit labore consequuntur alias doloremque, laudantium animi numquam officia iure, perferendis earum pariatur, voluptatem placeat cupiditate maiores adipisci odit. Quam, earum magnam iusto reiciendis cumque voluptate pariatur, doloribus fugiat, maxime animi aspernatur tenetur modi quae iure accusamus quisquam tempore blanditiis eos incidunt explicabo ipsam dolore. Id in voluptates corporis, atque dignissimos eligendi magnam consequatur suscipit, doloribus modi ex reiciendis. Culpa eaque explicabo ipsa accusantium consequuntur neque reiciendis animi nam minima est, impedit totam maiores temporibus aperiam vitae dolorem at porro libero? Facilis ex, labore animi sint quia laboriosam voluptates cupiditate? A, repellendus temporibus. Provident odio fugit expedita debitis mollitia necessitatibus quaerat illum cupiditate quia neque autem porro facere, doloribus itaque blanditiis unde voluptatum eos praesentium ut alias harum optio. Aperiam beatae harum cupiditate veritatis. Atque perspiciatis pariatur recusandae! Molestiae quo optio quos maiores vel iusto? Rem mollitia, minus saepe dolore facilis suscipit, odit explicabo optio cumque, magni autem. Odit, accusamus perferendis quas assumenda, provident dolores quos sunt dicta hic labore voluptatem nesciunt voluptate vel maxime incidunt nemo mollitia sapiente. Magnam, ducimus? Accusamus, rem itaque consectetur illo aspernatur in eius molestiae sit id consequatur culpa? Placeat quas beatae voluptates nostrum eligendi. Aliquam vel eveniet consequatur sequi eum sed. Hic nemo dolor ab atque nihil temporibus amet iure dolore illo voluptates, ipsa deleniti quas? Veniam, culpa sequi. Tempora iusto similique, odit repellat eligendi cumque fuga ratione quaerat eaque libero dolore nam nulla perferendis. Sint, quibusdam. Quis fuga aliquid nesciunt corrupti soluta, illum, accusantium quas ipsam minima dolore reprehenderit veniam corporis a harum, recusandae dolorum. Sunt, incidunt neque! Quos exercitationem atque, iusto non impedit voluptas assumenda sunt natus inventore eaque ex eius deleniti quas est. Autem, sequi? Eum, ab esse sequi eos mollitia totam dignissimos vero sapiente quaerat recusandae dolore officia magni laudantium assumenda eveniet illo veritatis doloremque natus debitis tempore autem? Minima nihil asperiores enim tempore ullam officiis id ipsa optio aliquam voluptate ipsum nam, porro quo a corrupti et consequuntur explicabo cumque, alias autem, inventore debitis harum repudiandae dolorum. Modi fugiat cum facilis fuga ipsum, aspernatur provident eaque officia iusto molestiae similique vel odit obcaecati corporis, natus magnam unde laboriosam nulla! Recusandae beatae officia omnis accusamus voluptatum iure aperiam at. Assumenda asperiores recusandae voluptas, quos fuga fugit sed commodi? Nostrum quod, commodi fugiat ea laudantium provident repudiandae doloremque quam maiores aliquam amet voluptas cumque tempora voluptate quidem aperiam quisquam distinctio iure, quia reprehenderit. Modi voluptate laborum molestias officia perspiciatis labore molestiae maxime beatae consequuntur recusandae quae, totam reprehenderit sunt doloribus. Ipsam repudiandae id nostrum unde aspernatur explicabo maxime, debitis eos laborum, ea harum molestias porro ex laboriosam modi illo accusamus consequuntur eveniet. Ab reiciendis nesciunt asperiores magnam aut itaque et fugiat commodi eaque. Qui ullam reiciendis minus labore unde aperiam, possimus consequatur praesentium dolorum omnis, atque error expedita deleniti eius itaque cum dolor eaque ipsum animi aliquam accusantium voluptatum eveniet modi culpa. Odio harum mollitia consequatur explicabo officia id necessitatibus accusamus similique? Cum quisquam tempore tempora aspernatur modi fugit! Nobis modi quibusdam voluptates iste a distinctio ipsam laboriosam tenetur dolores numquam facilis veniam aspernatur vitae, ab exercitationem cupiditate? Laudantium, minus aliquid. Animi ab tempore sed! Eveniet adipisci aut temporibus nihil delectus ad praesentium, perspiciatis quia eum alias dolorum optio esse, nisi saepe. Eos, impedit tenetur. Eveniet nobis, enim iusto dignissimos molestias neque consequuntur debitis sunt id exercitationem, perferendis excepturi error recusandae adipisci obcaecati voluptatum ipsa laboriosam, quae reiciendis nisi vel consectetur vero laborum eaque? Numquam, debitis tenetur quis assumenda eveniet similique, neque id ea dolor earum laboriosam necessitatibus repellendus dolorem voluptatum velit! Similique, accusamus itaque eaque soluta culpa magni voluptates! Animi nam iure doloremque, vitae voluptates laboriosam! Quidem error quas eveniet illum odio, aspernatur ipsam maiores, saepe distinctio consectetur, laudantium pariatur eum voluptatem a ex! Ipsum sequi iure unde obcaecati quia magni cum perspiciatis vel voluptatibus! Error dolore, aliquid neque molestiae sapiente cupiditate eaque debitis dolorum. Deleniti explicabo nobis omnis! Eligendi odio repudiandae cum dolores excepturi.</p>
      </section>
    </main>
  )
}

export default Sidebar