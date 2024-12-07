import { Adminadvertisementicon, Adminbarbericon, Admincustomericon, Admindashboardicon, Adminqueueicon, Adminsalonicon, HistoryIcon } from "../../icons";

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
        title: "QueueList",
        icon: <Adminqueueicon />,
        url: "/barber-queue"
    },
    {
        id: 3,
        title: "Queue History",
        icon: <HistoryIcon />,
        url: "/barber-quehistory"
    },
]
