import axios from '../axios'

const getAllCode = (type) => {
    return axios.get(`/api/get-allCode?type=${type}`)
}

export default {
    getAllCode,
}
