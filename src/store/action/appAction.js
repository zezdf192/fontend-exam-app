import { toast } from 'react-toastify'
import actionTypes from './actionTypes'
import userService from '../../service/userService'
import {changeLanguage as changeLanguageAction } from '../reducer/appReducer'

export const changeLanguage = (language) => {
    return async (dispatch, getState) => {
        try {  
            dispatch(changeLanguageAction(language))                   
        } catch (error) {
            dispatch(changeLanguageAction(language))
          
        }
    }
    
}
