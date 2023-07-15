import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    language: 'en',
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { changeLanguage } = appSlice.actions

export default appSlice.reducer
