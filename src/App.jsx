import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </div>
  )
}
