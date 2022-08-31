import {legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from "redux-thunk"

import { reducer as appReducer } from './AppReducer/reducer'

const rootReducer=combineReducers({
    app:appReducer
})

export const store=createStore(rootReducer, applyMiddleware(thunk))