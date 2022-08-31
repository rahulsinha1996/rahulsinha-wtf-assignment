import axios from "axios"
import { GET_GYM_FAILURE, GET_GYM_REQUEST, GET_GYM_SUCCESS } from "./actionTypes"


//Getting employee data
export const getGymRequest=()=>{
    return {
        type:GET_GYM_REQUEST
    }
}
export const getGymSuccess=(payload)=>{
    return {
        type:GET_GYM_SUCCESS,
        payload
    }
}
export const getGymFailure=()=>{
    return {
        type:GET_GYM_FAILURE
    }
}

export const getGym=()=>(dispatch)=>{
    dispatch(getGymRequest())
    axios({
        method:"GET",
        url:"https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231"
    }).then((res)=>dispatch(getGymSuccess(res.data)))
    .catch((err)=>dispatch(getGymFailure()))
}

