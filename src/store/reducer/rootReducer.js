

// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    // Thêm các reducer khác nếu có
})

export default rootReducer
