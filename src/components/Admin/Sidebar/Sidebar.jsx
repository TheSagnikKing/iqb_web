import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.css';
import { menudata } from '../menudata.jsx';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Adminqueueicon, LeftArrow, MoonIcon, RightArrow, Sunicon } from '../../../icons';
import Header from '../Header/Header.jsx';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js';
import { IoMoon } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../Redux/Admin/Constants/constants.js';

const Sidebar = () => {
  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon);

  const {
    response: adminGetDefaultSalonResponse = {} // Add default value
  } = adminGetDefaultSalon;

  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const darkMode = useSelector(darkmodeSelector);


  const darkHandler = () => {
    dispatch({ type: DARK_MODE_ON });
    localStorage.setItem("dark", "On");
  }

  const lightHandler = () => {
    dispatch({ type: DARK_MODE_OFF });
    localStorage.setItem("dark", "Off");
  }

  const toggleHandler = () => {
    if (darkMode == "Off") {
      darkHandler()
    } else {
      lightHandler()
    }
  }

  const darkmodeOn = darkMode === "On";

  return (
    <main className={`${style.container} ${darkmodeOn && style.dark}`}>
      <div className={`${style.sidebar} ${showSidebar ? style.show : style.hide} ${darkmodeOn && style.dark}`}>
        <div>
          <div className={showSidebar ? style.titleActive : style.titleInActive}>
            {showSidebar ? <div className={`${style.sidebar_top_salon} ${darkmodeOn && style.dark}`}>
              <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
                <img
                  src={adminGetDefaultSalonResponse?.salonLogo?.[0]?.url || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                  alt="salonLogo"
                />
              </div>
              <p>{adminGetDefaultSalonResponse?.salonName}</p>
            </div> : ""}
          </div>
        </div>

        <div className={style.menu_items_container}>
          {menudata.map((m) => (
            <div className={`${style.menu_item} ${location.pathname.includes(m.url) && `${style.menu_item_active} ${darkmodeOn && style.dark}`} ${darkmodeOn && style.dark}`} key={m.id} onClick={() => navigate(m?.url)}
            >
              <div style={{
                color: location.pathname.includes(m.url) && "var(--light-color-4)"
              }}
              >{m.icon}</div>
              <p style={{
                color: location.pathname.includes(m.url) && "var(--light-color-4)"
              }}>{m.title}</p>
            </div>
          ))}

          <div className={`${style.menu_theme_container} ${darkmodeOn && style.dark}`}
            style={{
              justifyContent: showSidebar ? "space-between" : "center"
            }}
          >
            {
              showSidebar && <p>Theme</p>
            }

            {
              darkmodeOn ?
                <button onClick={toggleHandler}>
                  <Sunicon />
                </button> :
                <button onClick={toggleHandler}>
                  <MoonIcon />
                </button>
            }

          </div>
        </div>

        <button className={style.sidebar_toggle_btn} onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
      </div>

      <div className={`${style.content} ${darkmodeOn && style.dark}`}
        style={{
          width: showSidebar ? "calc(100vw - 20vw)" : "calc(100vw - 4vw)",
        }}
      >
        <Header />
        <div><Outlet /></div>
      </div>
    </main>
  );
}

export default Sidebar;
