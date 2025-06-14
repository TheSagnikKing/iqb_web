import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { GET_ALL_QUEUELIST_SUCCESS, SALON_ONLINE_STATUS_SUCCESS } from '../Redux/Admin/Constants/constants';
import { GET_QUEUELIST_BARBERID_SUCCESS } from '../Redux/Barber/Constants/constants';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}


export function SocketProvider({ children }) {

    const salonId = useSelector(state => state.AdminLoggedInMiddleware.adminSalonId)

    const barberSalonId = useSelector(state => state.BarberLoggedInMiddleware?.barberSalonId)
    const barberId = useSelector(state => state.BarberLoggedInMiddleware?.barberId)

    const dispatch = useDispatch()

    useEffect(() => {

        const newSocket = socketIOClient("https://iqb-final.onrender.com")

        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket");
            if (salonId) {
                newSocket.emit("joinSalon", salonId); // 🔹 FIXED: Changed to "joinSalon"
            }

            if (barberSalonId && barberId) {
                newSocket.emit("joinBarber", { salonId: barberSalonId, barberId });
            }

        });

        if (salonId) {
            // 🔹 Listen for real-time admin queuelist updates
            newSocket.on("queueUpdated", (updatedQueue) => {
                dispatch({
                    type: GET_ALL_QUEUELIST_SUCCESS,
                    payload: {
                        success: true,
                        status: 200,
                        message: "Queue list retrived sucessfully",
                        response: updatedQueue
                    }
                })
            });


            // Listen for status update from server
            newSocket.on("salonStatusUpdate", (data) => {
                console.log("💡 Received salon status update:", data);
                // if (data.salonId === salonId) {
                //     setIsOnline(data.isOnline);
                // }

                dispatch({
                    type: SALON_ONLINE_STATUS_SUCCESS,
                    payload: {
                        success: true,
                        status: 200,
                        message: "The salon is currently online",
                        response: data.response
                    }
                })

            });
        }

        if (barberSalonId && barberId) {
            // 🔹 Listen for real-time barber queuelist updates
            newSocket.on("barberQueueUpdated", (updatedQueue) => {
                dispatch({
                    type: GET_QUEUELIST_BARBERID_SUCCESS,
                    payload: {
                        success: true,
                        status: 200,
                        message: "Queue list found for the specified barber",
                        queueList: updatedQueue
                    }
                })
            });
        }


        return () => newSocket.disconnect();

    }, [salonId, barberId, barberSalonId, dispatch]);

    return (
        <SocketContext.Provider value={{}} >
            {children}
        </SocketContext.Provider>
    );
}