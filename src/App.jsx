import React from 'react'

import Home from './pages/Home'
import { Route, Routes } from 'react-router'
import Navbar from './components/common/Navbar'


export default function App() {
  return (
    <div className='w-screen min-h-screen bg-black flex flex-col'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
    </div>
  )
}
