import React from 'react'
import "./Cell.css"

const Cell = ({className,children,onClick,isActive}) => {

  return (
    <>
    <div 
    onClick={!isActive ? onClick : undefined}
    className={`${className} ${isActive ? "active-cell" : "cells"}`}
    >{children}</div>
    </>
  )
}

export default Cell

