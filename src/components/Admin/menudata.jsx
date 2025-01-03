import { Admindashboardicon, Adminsalonicon, Adminbarbericon, Admincustomericon, Adminadvertisementicon, Adminqueueicon, Adminappointmenticon, Adminreporticon, HistoryIcon } from "../../icons";

export const menudata = [
    {
        id: 1,
        title: "Dashboard",
        icon: <Admindashboardicon />,
        url: "/admin-dashboard"
    },
    {
        id: 2,
        title: "Salons",
        icon: <Adminsalonicon />,
        url: "/admin-salon"
    },
    {
        id: 3,
        title: "Barbers",
        icon: <Adminbarbericon />,
        url: "/admin-barber"
    },
    {
        id: 4,
        title: "Customers",
        icon: <Admincustomericon />,
        url: "/admin-customer"
    },
    {
        id: 5,
        title: "Advertisements",
        icon: <Adminadvertisementicon />,
        url: "/admin-advertise"
    },
    {
        id: 6,
        title: "Queuelist",
        icon: <Adminqueueicon />,
        url: "/admin-queue"
    },
    {
        id: 7,
        title: "Queue History",
        icon: <HistoryIcon />,
        url: "/admin-quehistory"
    },
    {
        id: 8,
        title: "Appointments",
        icon: <Adminappointmenticon />,
        url: "/admin-appointments"
    },
    // {
    //     id: 8,
    //     title: "Reports",
    //     icon: <Adminreporticon />,
    //     url: "/admin-report"
    // },
]
