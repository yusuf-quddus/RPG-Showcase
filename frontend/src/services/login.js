import axios from 'axios'

const url = '/api/login'

const login = async (credentials) => {
    const res = await axios.post(url, credentials)
    return res.data
}

export default { login }
