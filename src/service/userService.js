import axios from '../axios'

const login = (data) => {
    return axios.post(`/api/login`, data)
}

const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const getAllUsers = () => {
    return axios.get(`/api/get-all-users`)
}

const deleteUser = (data) => {
    return axios.delete(`/api/delete-user`, { data })
}

const updateUserByID = (data) => {
    return axios.post(`/api/update-user-by-id`, data)
}


const loginAppBySocial = (data) => {
    return axios.post(`/api/create-user-by-social`, data)
}

const getDetailUser = (email) => {
    return axios.get(`/api/get-detail-user?email=${email}`)
}

const updateUserByEmail = (data) => {
    return axios.post(`/api/update-user-by-email`, data)
}

const editPassword = (data) => {
    return axios.post(`/api/edit-password`, data)
}

const getExamUserLike = (data) => {
    return axios.post(`/api/get-exam-user-like`, data)
}

const userLikeExam = (data) => {
    return axios.post(`/api/user-like-exam`, data)
}

const getAllExamUserLike = (data) => {
    return axios.post(`/api/get-all-exam-user-like`, data)
}

const getCodeForgotPassword = (data) => {
    return axios.post(`/api/get-code-forgot-password`, data)
}

const changePassword = (data) => {
    return axios.post(`/api/change-password`, data)
}

const filterUserByAdmin = (data) => {
    return axios.post(`/api/filter-user-by-admin`, data)
}

export default {
    login,
    createNewUser,
    getAllUsers,
    deleteUser,
    updateUserByID,
    loginAppBySocial,
    getDetailUser,
    updateUserByEmail,
    editPassword,
    getExamUserLike,
    userLikeExam,
    getAllExamUserLike,
    getCodeForgotPassword,
    changePassword,
    filterUserByAdmin,
}
