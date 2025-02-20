import React, { useEffect, useRef, useState } from 'react'
import style from './Report.module.css'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ClickAwayListener } from '@mui/material'
import Calendar from 'react-calendar'
import api from '../../Redux/api/Api'
import DatePicker from "react-multi-date-picker";
import { getAdminBarberListAction } from '../../Redux/Admin/Actions/BarberAction'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'

const Report = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
  const dispatch = useDispatch()

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  // const dailyreport = [
  //   { date: "2025-01-16", count: 3 },
  //   { date: "2025-01-17", count: 0 },
  //   { date: "2025-01-18", count: 5 },
  //   { date: "2025-01-19", count: 2 },
  //   { date: "2025-01-20", count: 0 },
  //   { date: "2025-01-21", count: 7 },
  //   { date: "2025-01-22", count: 1 },
  //   { date: "2025-01-23", count: 0 },
  //   { date: "2025-01-24", count: 4 },
  //   { date: "2025-01-25", count: 0 },
  //   { date: "2025-01-26", count: 2 },
  //   { date: "2025-01-27", count: 8 },
  //   { date: "2025-01-28", count: 0 },
  // ];

  // const formattedReport = dailyreport.map((item) => ({
  //   ...item,
  //   date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" }) // e.g., "Feb, 07"
  // }));


  // State for checkboxes


  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedRangeFilter, setSelectedRangeFilter] = useState("")

  // console.log(selectedFilter)

  const [weekOption, setWeekOption] = useState("");
  const [monthOption, setMonthOption] = useState("");
  const [dayOption, setDayOption] = useState("");
  const [queueType, setQueueType] = useState("queueserved")

  // console.log(queueType)

  const [reportData, setReportData] = useState([])

  useEffect(() => {
    if (selectedFilter && dayOption || weekOption || monthOption) {
      try {
        const getAllReports = async () => {
          const reportOptions = {
            salonId,
            reportValue: queueType,
            reportType: selectedFilter,
            ...(selectedFilter === "daily" && { days: Number(dayOption) }),
            ...(selectedFilter === "weekly" && { week: Number(weekOption) }),
            ...(selectedFilter === "monthly" && { month: Number(monthOption) }),
          };

          const { data } = await api.post("/api/reports/getSalonReports", reportOptions);
          setReportData(data.response);
        };

        getAllReports();
      } catch (error) {
        console.log(error)
      }
    }

  }, [selectedFilter, dayOption, weekOption, monthOption, queueType]);


  const [selectedDates, setSelectedDates] = useState([])

  const handleDateChange = (dates) => {
    const formatedDates = dates.map((date) => date.format("YYYY-MM-DD"))
    setSelectedDates(formatedDates)
    setSelectedFilter("")
    setWeekOption("")
    setMonthOption("")
    setDayOption("")
  }


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [openbarberContainer, setOpenBarberContainer] = useState(false)

  const [selectedbarber, setSelectedbarber] = useState("")
  const [selectedbarberId, setSelectedbarberId] = useState("")
  const [selectedbarberEmail, setSelectedbarberEmail] = useState("")

  const BarberListcontrollerRef = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    BarberListcontrollerRef.current = controller;

    dispatch(getAdminBarberListAction(salonId, controller.signal));

    return () => {
      if (BarberListcontrollerRef.current) {
        BarberListcontrollerRef.current.abort();
      }
    };
  }, [salonId, dispatch]);

  const getAdminBarberList = useSelector(state => state.getAdminBarberList)

  const {
    loading: getAdminBarberListLoading,
    getAllBarbers: BarberList
  } = getAdminBarberList

  // console.log(BarberList)

  console.log(selectedbarber)
  console.log(selectedbarberId)
  console.log(selectedbarberEmail)

  console.log(selectedDates)
  console.log(selectedRangeFilter)

  useEffect(() => {

    if (selectedDates.length === 2 && selectedRangeFilter && selectedbarberEmail) {
      const getAllReports = async () => {
        try {
          const reportOptions = {
            salonId,
            reportValue: queueType,
            reportType: selectedRangeFilter,
            from: selectedDates[0],
            to: selectedDates[1],
            barberEmail: selectedbarberEmail,
            barberId: selectedbarberId
          };

          const { data } = await api.post("/api/reports/getSalonReports", reportOptions);
          setReportData(data.response);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong", {
            duration: 3000,
            style: {
              fontSize: "var(--font-size-2)",
              borderRadius: '0.3rem',
              background: '#333',
              color: '#fff',
            },
          });
        }
      };

      getAllReports();
    } else if (selectedDates.length === 2 && selectedRangeFilter) {
      const getAllReports = async () => {
        try {
          const reportOptions = {
            salonId,
            reportValue: queueType,
            reportType: selectedRangeFilter,
            from: selectedDates[0],
            to: selectedDates[1]
          };

          const { data } = await api.post("/api/reports/getSalonReports", reportOptions);
          setReportData(data.response);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong", {
            duration: 3000,
            style: {
              fontSize: "var(--font-size-2)",
              borderRadius: '0.3rem',
              background: '#333',
              color: '#fff',
            },
          });
        }
      };

      getAllReports();
    }
  }, [selectedDates, selectedRangeFilter, queueType, selectedbarberEmail, selectedbarberId]);

  const resetHandler = () => {
    setSelectedDates([])
    setSelectedRangeFilter("")
    setSelectedbarberEmail("")
    setSelectedbarberId("")
    setSelectedbarber("")
    setReportData([])

    setSelectedFilter("")
    setWeekOption("")
    setMonthOption("")
    setDayOption("")
  }


  return (
    <div className={`${style.salon_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Reports</p>
        <div className={`${style.select_container}`}>
          <div className={`${style.barber_container} ${darkmodeOn && style.dark}`}>
            <input
              placeholder='Select Barber'
              value={selectedbarber}
              onClick={() => setOpenBarberContainer((prev) => !prev)}
            />

            {
              openbarberContainer && (
                <ClickAwayListener onClickAway={() => setOpenBarberContainer(false)}>
                  <div className={`${style.barber_container_dropdown} ${darkmodeOn && style.dark}`}>

                    {
                      getAdminBarberListLoading ? (
                        <Skeleton count={6} height={"4.5rem"} style={{ marginBottom: "1rem" }}
                          baseColor={darkmodeOn ? "var(--dark-loader-bg-color)" : "var(--light-loader-bg-color)"}
                          highlightColor={darkmodeOn ? "var(--dark-loader-highlight-color)" : "var(--light-loader-highlight-color)"}
                        />
                      ) : BarberList?.length > 0 ? (
                        BarberList.map((b) => {
                          return (
                            <div
                              className={`${style.barber_item} ${darkmodeOn && style.dark}`}
                              key={b.barberId}
                              style={{
                                border: selectedbarber === b.name ? "0.1rem solid rgba(0,0,0,0.6)" : "0.1rem solid rgba(0,0,0,0.2)"
                              }}
                              onClick={() => {
                                setSelectedbarber(b.name)
                                setSelectedbarberId(b.barberId)
                                setSelectedbarberEmail(b.email)
                                setReportData([])
                                setWeekOption("")
                                setMonthOption("")
                                setDayOption("")
                                setSelectedFilter("")
                                setOpenBarberContainer(false)
                              }}
                            >
                              <div>
                                <img src={b?.profile?.[0]?.url} alt="" />
                              </div>
                              <p>{b?.name}</p>
                            </div>
                          )
                        })
                      ) : (
                        <div style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%"
                        }}>
                          <p style={{ fontSize: "1.4rem" }}>No barber</p>
                        </div>
                      )
                    }

                  </div>
                </ClickAwayListener>
              )
            }
          </div>
          {
            !isMobile && (
              <div>
                <DatePicker
                  numberOfMonths={2}
                  value={selectedDates}
                  range
                  placeholder='yyyy-mm-dd - yyyy-mm-dd'
                  onChange={handleDateChange}
                  dateSeparator={" - "}
                  calendarPosition={"bottom-right"}
                  className={darkmodeOn ? "dark-theme" : "light-theme"}
                  style={{
                    background: darkmodeOn ? "#222" : "#fff"
                  }}
                />
              </div>
            )
          }

          <select name="" id=""
            className={`${darkmodeOn && style.dark}`}
            onChange={(e) => setSelectedRangeFilter(e.target.value)} value={selectedRangeFilter}
          >
            <option value="" disabled>Select a range</option>
            <option value="daily">daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <button onClick={resetHandler} className={`${style.reset_btn} ${darkmodeOn && style.dark}`}>Reset</button>


        </div>


      </div>

      {
        isMobile && (
          <DatePicker
            numberOfMonths={1}
            value={selectedDates}
            range
            placeholder='yyyy/mm/dd - yyyy/mm/dd'
            onChange={handleDateChange}
            dateSeparator={" - "}
            portal={true}
            calendarPosition={"bottom-left"}
            className={darkmodeOn ? "dark-theme" : "light-theme"}
            style={{
              background: darkmodeOn ? "#222" : "#fff"
            }}
          />
        )
      }


      <div className={`${style.salon_content_wrapper}`}>

        <div className={`${style.filter_container} ${darkmodeOn && style.dark}`}>
          <div
            className={selectedFilter === "daily" ? style.checked : style.unchecked}
            onClick={() => {
              setSelectedFilter("daily")
              setSelectedRangeFilter("")
              setSelectedDates([])
              setWeekOption("")
              setMonthOption("")
              setReportData([])
              setSelectedbarberEmail("")
              setSelectedbarber("")
              setSelectedbarberId("")
            }}
          >
            <p>Daily</p>
            {selectedFilter === "daily" && (
              <select onChange={(e) => setDayOption(e.target.value)} value={dayOption} className={`${darkmodeOn && style.dark}`}>
                <option value="" disabled>Select a range</option>
                <option value="7">Last 7 Days</option>
                <option value="12">Last 12 Days</option>
                <option value="14">Last 14 Days</option>
              </select>
            )}
          </div>

          <div
            className={selectedFilter === "weekly" ? style.checked : style.unchecked}
            onClick={() => {
              setSelectedFilter("weekly")
              setSelectedRangeFilter("")
              setSelectedDates([])
              setMonthOption("")
              setDayOption("")
              setReportData([])
              setSelectedbarberEmail("")
              setSelectedbarber("")
              setSelectedbarberId("")
            }}
          >
            <p>Weekly</p>
            {selectedFilter === "weekly" && (
              <select onChange={(e) => setWeekOption(e.target.value)} value={weekOption} className={`${darkmodeOn && style.dark}`}>
                <option value="" disabled>Select a range</option>
                <option value="0">This Week</option>
                <option value="2">Last 2 Week</option>
                <option value="4">Last 4 Weeks</option>
              </select>
            )}
          </div>

          <div
            className={selectedFilter === "monthly" ? style.checked : style.unchecked}
            onClick={() => {
              setSelectedFilter("monthly")
              setSelectedRangeFilter("")
              setSelectedDates([])
              setWeekOption("")
              setDayOption("")
              setReportData([])
              setSelectedbarberEmail("")
              setSelectedbarber("")
              setSelectedbarberId("")
            }}
          >
            <p>Monthly</p>
            {selectedFilter === "monthly" && (
              <select onChange={(e) => setMonthOption(e.target.value)} value={monthOption} className={`${darkmodeOn && style.dark}`}>
                <option value="" disabled>Select a range</option>
                <option value="0">This year</option>
                <option value="3">Last 3 Months</option>
                <option value="6">Last 6 Months</option>
                <option value="12">Last 12 Months</option>
              </select>
            )}
          </div>

          <div>
            <p>Type</p>

            <select onChange={(e) => setQueueType(e.target.value)} value={queueType} className={`${darkmodeOn && style.dark}`}>
              <option value="queueserved">Queue Served</option>
              <option value="queuecancelled">Queue Cancel</option>
            </select>
          </div>

          {/* <div>
            <p>Type</p>

            <select onChange={(e) => setQueueType(e.target.value)} value={queueType} className={`${darkmodeOn && style.dark}`}>
              <option value="queueserved">Queue Served</option>
              <option value="queuecancelled">Queue Cancel</option>
            </select>
          </div> */}
        </div>


        <div className={`${style.salon_content_body}`}>
          <p style={{
            marginBottom: 20
          }}>Queue Report</p>

          <ResponsiveContainer width="100%" height="50%">
            {reportData.length > 0 ? (
              <BarChart
                width={150}
                height={50}
                data={reportData}
                margin={{ bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={
                    (selectedRangeFilter || selectedFilter) === "daily"
                      ? "date"
                      : (selectedRangeFilter || selectedFilter) === "weekly"
                        ? "week"
                        : (selectedRangeFilter || selectedFilter) === "monthly"
                          ? "month"
                          : ""
                  }
                  tick={{ fontSize: 12 }}
                  angle={(selectedRangeFilter || selectedFilter) === "daily" ? -45 : 0}
                  textAnchor="end"
                  dy={10}
                  interval={0}
                />
                <Tooltip />
                <Bar dataKey="TotalQueue" fill="rgba(255, 0, 0, 0.393)" stroke="rgba(255, 0, 0, 0.393)" strokeWidth={1} />
              </BarChart>
            ) : (
              <div style={{ height: "20rem", marginInline: "0.5rem", border: darkmodeOn ? "0.1rem solid rgba(255,255,255,0.2)" : "0.1rem solid rgba(0,0,0,0.2)", textAlign: "center", alignContent: "center", boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px", borderRadius: "4px" }}>
                No Queue Report Available
              </div>
            )}
          </ResponsiveContainer>


          {/* <p style={{
              marginBottom: 20
            }}>Queue Report</p>
            <ResponsiveContainer width="100%" height="50%">
              <BarChart
                width={150}
                height={50}
                data={formattedReport}
                margin={{ bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-30}
                  textAnchor="end"
                  dy={10}
                  interval={0}
                />
                <Tooltip />
                <Bar dataKey="count" fill="rgba(255, 0, 0, 0.393)" stroke="#000000" strokeWidth={1} />
              </BarChart>
            </ResponsiveContainer> */}

        </div>
      </div >
    </div >
  )
}

export default Report