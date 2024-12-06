import { Adminadvertisementicon, Adminbarbericon, Admincustomericon, Admindashboardicon, Adminqueueicon, Adminsalonicon } from "../../icons";

export const menudata = [
    {
        id: 1,
        title: "Dashboard",
        icon: <Admindashboardicon />,
        url: "/barber-dashboard"
    },
    // {
    //     id: 2,
    //     title: "Customers",
    //     icon: <Admincustomericon />,
    //     url: "/barber-customer"
    // },
    {
        id: 2,
        title: "Queue History",
        icon: <Adminbarbericon />,
        url: "/barber-quehistory"
    },
    {
        id: 3,
        title: "QueueList",
        icon: <Adminqueueicon />,
        url: "/barber-queue"
    },
]
