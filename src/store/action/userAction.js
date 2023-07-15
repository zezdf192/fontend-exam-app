import { toast } from 'react-toastify'
import actionTypes from './actionTypes'
import userService from '../../service/userService'
import {fetchUserSignup, logOut, updateUser, userLoginFail, userLoginSuccess, userLoginWithSocialFail, userLoginWithSocialSuccess} from '../reducer/userReducer'

export const fetchUserLogin = (data, check) => {
    return async (dispatch, getState) => {
        try {
            if (check === 'success') {
                dispatch(userLoginSuccess(data))
                return
            }
            let res = await userService.login(data)

            if (res && res.errCode === 0) {
               
               
                dispatch(userLoginSuccess(res.data))
              
            } else {
               
                dispatch(userLoginFail())
               
            }
            return res
        } catch (error) {
            toast('error')
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUser(data)

            let buildData = {
                email: data.email,
                name: data.name,
                password: true,
                listLikeExam: [],
                avatar: '',
                roleID: 'R2',
                amountCreate: 0,
                userExamID: [],
            }

            if (res && res.errCode === 0) {
              
                dispatch(fetchUserSignup(buildData))
               
            } else {
               toast('error')
            }
            return res
        } catch (error) {
            toast('error')
        }
    }
}

export const fetchUserLoginWithSocial = (data) => {
    return async (dispatch, getState) => {
        try {
            let userInfo = {}
            let resUSer = await userService.getDetailUser(data._delegate.email ? data._delegate.email : data.email)
            let res = await userService.loginAppBySocial(data._delegate)

            if (res && res.errCode === 0) {
                userInfo = res.data
                if (resUSer && resUSer.errCode === 0) {
                    userInfo = { ...userInfo, name: resUSer.data[0].name, avatar: resUSer.data[0].avatar }
                }
                dispatch(userLoginWithSocialSuccess(userInfo))
               
            } else {
                dispatch(userLoginFail())
                
            }
        } catch (error) {
            toast('error')
        }
    }
}

export const fetchLogOut = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch(logOut())
            
        } catch (err) {
            dispatch(logOut())
            
        }
    }
}

export const fetchUpdateUser = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch(updateUser(data))
           
        } catch (err) {
            dispatch(updateUser(data))
            
        }
    }
}
