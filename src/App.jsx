import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Public = React.lazy(() => import("./Public/Public"))

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App