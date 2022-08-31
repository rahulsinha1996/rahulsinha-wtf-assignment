import React from 'react';
import {
  Image,
  Text,
  Button,
  Stack
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom"

export const GymCard = ({elem}) => {
  const {gym_name, city, duration_text, distance_text, user_id, cover_image}=elem;
  const navigate=useNavigate()
  return (
    <div style={{textAlign:"center", padding:"20px", border:"2px solid black", display:"grid", margin:"auto", justifyContent:"center", alignItems:"center", height:"auto", width:"500px"}}>
      <Image src={cover_image}/>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          {gym_name}
        </Text>
        <Text
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
        >
          City : {(city).toUpperCase()}
        </Text>
        <Text my={2} color="gray.500">
        {distance_text} away | {duration_text}
        </Text>
        <Button maxWidth="100px" my={2} onClick={()=>navigate(`/gymdetails/${user_id}`)}>
        More Details
        </Button>
      </Stack>
    </div>
  );
}
