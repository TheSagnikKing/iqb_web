import React from 'react'
import "./ButtonLoader.css"

const ButtonLoader = ({color}) => {
  return (
    <div className="btn-loader" style={{border:`4px solid ${color}`}}></div>
  )
}

export default ButtonLoader