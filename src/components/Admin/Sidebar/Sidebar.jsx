import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.css';
import { menudata } from '../menudata.jsx';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Adminqueueicon, LeftArrow, RightArrow } from '../../../icons';
import Header from '../Header/Header.jsx';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer.js';

const Sidebar = () => {
  const adminGetDefaultSalon = useSelector(state => state.adminGetDefaultSalon);

  const {
    response: adminGetDefaultSalonResponse = {} // Add default value
  } = adminGetDefaultSalon;

  const [showSidebar, setShowSidebar] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const darkMode = useSelector(darkmodeSelector);

  const darkmodeOn = darkMode === "On";

  return (
    <main className={`${style.container} ${darkmodeOn && style.dark}`}>
      <div className={`${style.sidebar} ${showSidebar ? style.show : style.hide} ${darkmodeOn && style.dark}`}>
        <div>
          <p className={showSidebar ? style.titleActive : style.titleInActive}>
            {showSidebar ? <div className={style.sidebar_top_salon}>
              <div onClick={() => navigate("/admin-dashboard")} style={{ cursor: "pointer" }}>
                <img
                  src={adminGetDefaultSalonResponse?.salonLogo?.[0]?.url || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                  alt="salonLogo"
                />
              </div>
              <p style={{
                color: darkmodeOn ? "var(--primary-text-light-color1)" : "var(--primary-text-light-color2)"
              }}>{adminGetDefaultSalonResponse?.salonName}</p>
            </div> : ""}
          </p>
        </div>

        <div className={style.menu_items_container}>
          {menudata.map((m) => (
            <div className={`${style.menu_item} ${location.pathname.includes(m.url) && `${style.menu_item_active} ${darkmodeOn && style.dark}`} ${darkmodeOn && style.dark}`} key={m.id} onClick={() => navigate(m?.url)}
            >
              <p style={{
                color: location.pathname.includes(m.url) && "#fff"
              }}
              >{m.icon}</p>
              <p style={{
                color: location.pathname.includes(m.url) && "#fff"
              }}>{m.title}</p>
            </div>
          ))}
        </div>

        <button className={style.sidebar_toggle_btn} onClick={() => setShowSidebar((prev) => !prev)}>{showSidebar ? <LeftArrow /> : <RightArrow />}</button>
      </div>

      <div className={`${style.content} ${darkmodeOn && style.dark}`}
        style={{
          width: showSidebar ? "calc(100vw - 28rem)" : "calc(100vw - 5rem)",
        }}
      >
        <div>
          <Header />
          <div><Outlet /></div>
        </div>
      </div>
    </main>
  );
}

export default Sidebar;
