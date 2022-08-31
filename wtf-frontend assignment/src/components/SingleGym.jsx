import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGym } from '../redux/AppReducer/action';


export const SingleGym = () => {
  const gyms=useSelector((state)=>state.app.gyms)
  const dispatch=useDispatch()
  const { id } = useParams()
  const [current, setCurrentElement] = useState({});
  const [plan, setPlan] = useState([]);
  const navigate=useNavigate()
  const getSingleGym= () => {
    axios({
      method:"GET",
      url:"https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231"
    }).then((res)=>{
      let data=res.data.data
      data=data?.filter((elem=>elem.user_id===id)) 
      setCurrentElement(data[0])
    })
    .catch((err)=>{
      console.log(err)
    })
   
  }

  const getGymPlan= (id) => {
    let payload={
      gym_id:id
    }
    axios.post("https://devapi.wtfup.me/gym/plan",payload).then((res)=>{
      setPlan(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
   
  }
  
  useEffect(()=>{
    getSingleGym()
    getGymPlan(id)
  },[id])
 
  useEffect(()=>{
    dispatch(getGym())
  },[])

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {current.gym_name}
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Description
              </Text>

              <SimpleGrid spacing={10}>
                <Text>
                  {current.description}
                </Text>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Facilities
              </Text>

              <List spacing={2} display={'flex'} gap={6}>
               
                  {current?.benefits?.length >0 && current?.benefits?.map((elem,index)=>{
                    return  <ListItem key={index+1}>{elem.name} </ListItem>
                  })}
                 
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Why to choose WTF ?
              </Text>
              <Box display={'flex'} flexWrap={'wrap'}>
              {gyms?.terms?.length>0 && gyms?.terms?.map((elem,index)=>{
                return (
                  <Box key={elem.id} backgroundImage={'linear-gradient(red)'} color={'white'} borderRadius={'10px'} padding={'10px'} w="100px" h="100px"> 
                  <Box display={'flex'} padding={'10px'} justifyContent={'space-between'}><Box display={'flex'} gap={'2px'}><Image w={'30px'} src={elem.icon}></Image><Text>{elem.plan_name}</Text></Box> <Text>₹ {elem.plan_price}</Text></Box>
                </Box>
                )
              })}    
              </Box>
              
             
            </Box>
          </Stack>
          
          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Book Now
          </Button>
          <Button onClick={()=>navigate("/")}
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Go to Home Page
          </Button>
        </Stack>
        <Stack>
            <Box display={'flex'} flexDirection={'column'} borderRadius={'20px'} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} padding={'10px'} gap={'10px'}>
              <Text fontSize={'15px'} fontWeight={'bold'}>Choose Membership</Text>
              <br/>
              {plan.length>0 && plan?.map((elem,index)=>{
                return (
                  <Box key={elem.id} backgroundImage={'linear-gradient(green, red)'} color={'white'} borderRadius={'10px'} padding={'10px'}> 
                  <Text>PLAN {index+1}</Text>
                  <Box display={'flex'} padding={'10px'} justifyContent={'space-between'}><Box display={'flex'} gap={'2px'}><Image w={'30px'} src="https://d1e9q0asw0l2kk.cloudfront.net/plan_upload/kpE8QPj9jw2lI/1658496950801-WhatsApp%20Image%202022-07-13%20at%203.50.33%20PM.jpeg"></Image><Text>{elem.plan_name}</Text></Box> <Text>₹ {elem.plan_price}</Text></Box>
                </Box>
                )
              })}
              
            </Box>
          </Stack>
      </SimpleGrid>
    </Container>
  );
}


