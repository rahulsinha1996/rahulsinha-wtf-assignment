import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Stack,
  Box
} from '@chakra-ui/react'
import { createSearchParams, useSearchParams } from 'react-router-dom';

export const Filter = () => {
  const [city, setCity] = useState([])
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  let cityParams = searchParams.getAll("city")[0]
  const getCity = () => {
    axios({
      method: "GET",
      url: "https://devapi.wtfup.me/gym/places"
    }).then((res) => setCity(res.data))
      .catch((err) => setError(err))
  }

  useEffect(() => {
    getCity()
  }, [])
 
  return (
    <div style={{width:"500px", padding:"20px", position:"sticky"}}>
       <FormControl>
      <Stack gap={6}>
       
        <FormLabel>Location</FormLabel>
        <Input placeholder='Enter location' />
        <FormLabel>Price</FormLabel>
        <Box display={'flex'}>
        <Input placeholder='Min' />-<Input placeholder='Max' />
        </Box>
        <FormLabel>City</FormLabel>
        <Select placeholder='Select City' value={cityParams} onChange={(e)=>setSearchParams(createSearchParams({city:e.target.value}))}>
          {city?.data?.length > 0 && city?.data?.map((elem, index) => {
            return <option key={index + 1}>{elem.city}</option>
          })}
        </Select>
      </Stack>

    </FormControl>
    </div>
   
  )
}
