import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getGym } from '../redux/AppReducer/action'
import { Filter } from './Filter'
import { GymCard } from './GymCard'
import { Image } from '@chakra-ui/react'

export const AllGym = () => {
  const gyms=useSelector((state)=>state.app.gyms)
  const isLoading=useSelector((state)=>state.app.isLoading)
  const dispatch=useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  let cityParams = searchParams.getAll("city")[0]
  let gymData=gyms?.data
  const navigate=useNavigate()
  useEffect(()=>{
    dispatch(getGym())
  },[])
 
  if(cityParams?.length>0 && cityParams!=='')
  {
    gymData=gymData?.filter((elem)=>{
      return elem.city===cityParams
    })
  }
  if(cityParams==='')
  {
    navigate("/")
  }
     
  
 
  return (
    <div style={{display:"flex", gap:"20px"}}>
    <Filter/>
    <div style={{display:"flex", flexDirection:'column', gap:"20px"}}>
      {isLoading && <Image h={'100px'} w={'100px'} src="https://wtfup.me/assets/loader.gif" />}
      {gymData?.length===0 && <h1>No Gym found</h1>}
      {gymData?.length>0 && gymData?.map((elem)=>{
        return <div key={elem.user_id}><GymCard elem={elem}/></div>
      })}
    </div>
    </div>
    
  )
}
