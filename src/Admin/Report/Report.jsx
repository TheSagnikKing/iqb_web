import React, { useEffect, useState } from 'react'
import style from './Report.module.css'
import { darkmodeSelector } from '../../Redux/Admin/Reducers/AdminHeaderReducer'
import { useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { ClickAwayListener } from '@mui/material'
import Calendar from 'react-calendar'
import api from '../../Redux/api/Api'

const Report = () => {

  const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"


  const dailyreport = [
    { date: "2025-01-16", count: 3 },
    { date: "2025-01-17", count: 0 },
    { date: "2025-01-18", count: 5 },
    { date: "2025-01-19", count: 2 },
    { date: "2025-01-20", count: 0 },
    { date: "2025-01-21", count: 7 },
    { date: "2025-01-22", count: 1 },
    { date: "2025-01-23", count: 0 },
    { date: "2025-01-24", count: 4 },
    { date: "2025-01-25", count: 0 },
    { date: "2025-01-26", count: 2 },
    { date: "2025-01-27", count: 8 },
    { date: "2025-01-28", count: 0 },
  ];

  const formattedReport = dailyreport.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "2-digit" }) // e.g., "Feb, 07"
  }));

  const [date, setDate] = useState("")
  const [openCalender, setOpenCalender] = useState(false)

  const handleClickAway = () => {
    setOpenCalender(false);
  };


  const onChangeHandler = (dateInput) => {
    const formattedDate = convertDateToYYYYMMDD(dateInput);
    onChange(formattedDate)
    setHandler(setDateOfBirth, formattedDate, "dateOfBirth", setDateOfBirthError)
    setOpenCalender(false)
  }

  // State for checkboxes
  const [selectedFilter, setSelectedFilter] = useState("daily");

  console.log(selectedFilter)


  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const getAllReports = async () => {
      const { data } = await api.post("/api/reports/getSalonReports", {
        salonId,
        reportValue: "queueserved",
        reportType: selectedFilter
      })

      setReportData(data.response)

    }

    getAllReports()

  }, [selectedFilter])

  return (
    <div className={`${style.salon_wrapper} ${darkmodeOn && style.dark}`}>
      <div>
        <p>Reports</p>
        {/* <div>
          <input
            placeholder="Select Date"
            onClick={() => setOpenCalender((prev) => !prev)}
            value={date}
            readOnly
          />

          {openCalender && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className={style.calender_drop_container}>
                <Calendar
                  onChange={onChangeHandler}
                  value={value}
                />
              </div>
            </ClickAwayListener>
          )}
        </div> */}
      </div>

      <div className={`${style.salon_content_wrapper} ${darkmodeOn && style.dark}`}>
        <div className={`${style.salon_content_body} ${darkmodeOn && style.dark}`}>

          <p style={{
            marginBottom: 20
          }}>Queue Report</p>
          <ResponsiveContainer width="100%" height="50%">
            <BarChart
              width={150}
              height={50}
              data={reportData}
              margin={{ bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={selectedFilter === "daily" ? "date" : selectedFilter === "weekly" ? "week" : "month"}
                tick={{ fontSize: 12 }}
                angle={selectedFilter === "daily" ? -45 : 0}
                textAnchor="end"
                dy={10}
                interval={0}
              />
              <Tooltip />
              <Bar dataKey="totalQueue" fill="rgba(255, 0, 0, 0.393)" stroke="#000000" strokeWidth={1} />
            </BarChart>
          </ResponsiveContainer>

          <div className={`${style.bottom} ${darkmodeOn && style.dark}`}>
            <div
              className={selectedFilter === "daily" ? style.checked : style.unchecked}
              onClick={() => setSelectedFilter("daily")}
            >
              <p>Daily</p>
              <input type="checkbox" checked={selectedFilter === "daily"} readOnly />
            </div>

            <div
              className={selectedFilter === "weekly" ? style.checked : style.unchecked}
              onClick={() => setSelectedFilter("weekly")}
            >
              <p>Weekly</p>
              <input type="checkbox" checked={selectedFilter === "weekly"} readOnly />
            </div>

            <div
              className={selectedFilter === "monthly" ? style.checked : style.unchecked}
              onClick={() => setSelectedFilter("monthly")}
            >
              <p>Monthly</p>
              <input type="checkbox" checked={selectedFilter === "monthly"} readOnly />
            </div>

            <div>
              <p>Type</p>
              <p>Queue Served</p>
            </div>
          </div>

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
      </div>
    </div>
  )
}

export default Report