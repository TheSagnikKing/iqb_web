import { Adminadvertisementicon, Adminbarbericon, Admincustomericon, Admindashboardicon, Adminqueueicon, Adminsalonicon } from "../../icons";

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
        url: "/barber-salon"
    },
    {
        id: 3,
        title: "Barbers",
        icon: <Adminbarbericon />,
        url: "/barber-barber"
    },
    {
        id: 4,
        title: "Customers",
        icon: <Admincustomericon />,
        url: "/barber-customer"
    },
    {
        id: 5,
        title: "Advertisements",
        icon: <Adminadvertisementicon />,
        url: "/barber-advertise"
    },
    {
        id: 6,
        title: "Queuings",
        icon: <Adminqueueicon />,
        url: "/barber-queue"
    },
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
