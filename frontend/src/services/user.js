import axios from 'axios'

const url = 'http://localhost:3001/api/users'

const registerAccount = async (accountInfo) => {
    const res = await axios.post(url, accountInfo)
    return res.data
}

export default { registerAccount }