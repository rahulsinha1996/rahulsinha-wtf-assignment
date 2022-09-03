import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Login} from "../components/Login"
import {Signup} from "../components/Signup"
import {Profile} from "../components/Profile"

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  )
}
