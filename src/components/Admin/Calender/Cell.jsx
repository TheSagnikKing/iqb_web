import React from 'react'
import "./Cell.css"
import { useSelector } from 'react-redux'
import { darkmodeSelector } from '../../../Redux/Admin/Reducers/AdminHeaderReducer'

const Cell = ({className,children,onClick,isActive}) => {

  const darkMode = useSelector(darkmodeSelector)

  const darkmodeOn = darkMode === "On"

  return (
    <>
    <div 
    onClick={!isActive ? onClick : undefined}
    className={`${className} ${isActive ? "active-cell" : `cells ${darkmodeOn && "dark"}`}`}
    >{children}</div>
    </>
  )
}

export default Cell

