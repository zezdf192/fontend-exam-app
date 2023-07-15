import axios from '../axios'

const createNewExam = (data) => {
    return axios.post(`/api/create-new-exam`, data)
}

const getAllExam = () => {
    return axios.get(`/api/get-all-exam`)
}

const deleteExamById = (data) => {
    return axios.post(`/api/delete-exam-by-id`, data)
}

const getDetailExamById = (id) => {
    return axios.get(`/api/get-detail-exam-by-id?id=${id}`)
}

const updateExamById = (data) => {
    return axios.post(`/api/update-exam-by-id`, data)
}

const studentDoExam = (data) => {
    return axios.post(`/api/student-do-exam`, data)
}

const getDetailDoExamById = (data) => {
    return axios.post(`/api/get-detail-do-exam-by-id`, data)
}

const getAllDoExamByUserId = (data) => {
    return axios.post(`/api/get-all-do-exam-by-user-id`, data)
}

const searchAllDoExamByUserId = (data) => {
    return axios.post(`/api/search-all-do-exam-by-user-id`, data)
}

const sortDoExamByType = (data) => {
    return axios.post(`/api/sort-do-exam-by-key`, data)
}

const searchAllExamByUserEmail = (data) => {
    return axios.post(`/api/search-all-exam-by-user-email`, data)
}

const getAllExamByUserId = (data) => {
    return axios.post(`/api/get-all-exam-by-user-id`, data)
}

const sortExamByType = (data) => {
    return axios.post(`/api/sort-exam-by-key`, data)
}

const getLessListExamRatings = (keyword) => {
    return axios.get(`/api/get-less-list-exam-ratings?keyword=${keyword}`)
}

const getDetailExamRatings = (examID) => {
    return axios.get(`/api/get-detail-exam-ratings?examID=${examID}`)
}

const filterExamRatings = (data) => {
    return axios.post(`/api/filter-exam-ratings`, data)
}

const getAllDoExamRatings = (email) => {
    return axios.get(`/api/get-all-do-exam-ratings?email=${email}`)
}

const sortMyRatingsByType = (data) => {
    return axios.post(`/api/sort-my-ratings-by-type`, data)
}

const createCopyScoreBelongToUser = (data) => {
    return axios.post(`/api/create-copy-score-belong-to-user`, data)
}

const getCopyScoreByCode = (code) => {
    return axios.get(`/api/get-copy-score-by-code?code=${code}`)
}

const getExamPrivateByCode = (data) => {
    return axios.post(`/api/get-exam-private-by-code`, data)
}

const getDetailExamPrivateForVerify = (data) => {
    return axios.post(`/api/get-detail-exam-private-for-verify`, data)
}

export default {
    createNewExam,
    getAllExam,
    deleteExamById,
    getDetailExamById,
    updateExamById,
    studentDoExam,
    getDetailDoExamById,
    getAllDoExamByUserId,
    searchAllDoExamByUserId,
    sortDoExamByType,
    searchAllExamByUserEmail,
    getAllExamByUserId,
    sortExamByType,
    getLessListExamRatings,
    getDetailExamRatings,
    filterExamRatings,
    getAllDoExamRatings,
    sortMyRatingsByType,
    createCopyScoreBelongToUser,
    getCopyScoreByCode,
    getExamPrivateByCode,
    getDetailExamPrivateForVerify,
}
