import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/characters'

let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createCharacter = async (character) => {
    const config = { headers: { Authorization: token } }
    const res = await axios.post(baseUrl, character, config)
    return res.data
}

const updateCharacter = async (id, character) => {
    const res = await axios.put(`${baseUrl}/${id}`, character)
    return res.data
}

const deleteCharacter = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
}

export default { getAll, createCharacter, updateCharacter, deleteCharacter, setToken }