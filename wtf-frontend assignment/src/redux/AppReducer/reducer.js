import { GET_GYM_FAILURE, GET_GYM_REQUEST, GET_GYM_SUCCESS } from "./actionTypes"


const initState = {
    gyms: [],
    isLoading: false,
    isError: false
}

export const reducer = (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_GYM_REQUEST:
            return {
                ...state,
                gyms: [],
                isLoading: true,
                isError: false
            }
        case GET_GYM_SUCCESS:
            return {
                ...state,
                gyms: payload,
                isLoading: false,
                isError: false
            }
        case GET_GYM_FAILURE:
            return {
                ...state,
                gyms:[],
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}
