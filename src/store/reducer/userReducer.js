import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    userInfo: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoginSuccess: (state, action) => {
           
            state.isLoggedIn = true
            state.userInfo = action.payload
        },
        userLoginFail: (state) => {
            state.isLoggedIn = false
            state.userInfo = null
        },
        userLoginWithSocialSuccess: (state, action) => {
            state.isLoggedIn = true
            state.userInfo = action.payload
        },
        userLoginWithSocialFail: (state) => {
            state.isLoggedIn = false
            state.userInfo = null
        },
        logOut: (state) => {
            state.isLoggedIn = false
            state.userInfo = null
        },
        updateUser: (state, action) => {
            state.userInfo = action.payload
        },
        fetchUserSignup: (state, action) => {
            state.isLoggedIn = true
            state.userInfo = action.payload
        },
    },
})

export const {
    userLoginSuccess,
    userLoginFail,
    userLoginWithSocialSuccess,
    userLoginWithSocialFail,
    logOut,
    updateUser,
    fetchUserSignup,
} = userSlice.actions

export default userSlice.reducer
