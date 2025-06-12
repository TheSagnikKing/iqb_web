import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { GET_ALL_QUEUELIST_SUCCESS } from '../Redux/Admin/Constants/constants';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}


export function SocketProvider({ children }) {

    // const [socket, setSocket] = useState(null);

    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)
    const dispatch = useDispatch()

    useEffect(() => {
        // const newSocket = socketIOClient("https://iqb-final.onrender.com", {
        //     query: {
        //         LoggedInUserId: LoggedinUser?._id
        //     }
        // });

        const newSocket = socketIOClient("https://iqb-final.onrender.com")


        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket");
            newSocket.emit("joinSalon", salonId); // 🔹 FIXED: Changed to "joinSalon"
        });

        // 🔹 Listen for real-time queue updates
        newSocket.on("queueUpdated", (updatedQueue) => {
            console.log("🔄 Queue updated:", updatedQueue);

        });

        // setSocket(newSocket);

        return () => newSocket.disconnect();


    }, [salonId]);

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
}