import { Admindashboardicon, Adminsalonicon, Adminbarbericon, Admincustomericon, Adminadvertisementicon, Adminqueueicon, Adminappointmenticon, Adminreporticon } from "../../icons";

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
        url: "/admin-salonlist"
    },
    {
        id: 3,
        title: "Barbers",
        icon: <Adminbarbericon />,
        url: "/admin-barberlist"
    },
    {
        id: 4,
        title: "Customers",
        icon: <Admincustomericon />,
        url: "/admin-customerlist"
    },
    {
        id: 5,
        title: "Advertisements",
        icon: <Adminadvertisementicon />,
        url: "/admin-advertisemt"
    },
    // {
    //     id: 6,
    //     title: "Queuings",
    //     icon: <Adminqueueicon />,
    //     url: "/admin-queue"
    // },
    // {
    //     id: 7,
    //     title: "Appointments",
    //     icon: <Adminappointmenticon />,
    //     url: "/admin-appointment"
    // },
    // {
    //     id: 8,
    //     title: "Reports",
    //     icon: <Adminreporticon />,
    //     url: "/admin-report"
    // },
]