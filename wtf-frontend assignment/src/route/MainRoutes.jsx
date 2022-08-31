import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AllGym } from '../components/AllGym'
import { SingleGym } from '../components/SingleGym'

export const MainRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={<AllGym/>}/>
    <Route path="/gymdetails/:id" element={<SingleGym/>}/>
    </Routes>
  )
}
