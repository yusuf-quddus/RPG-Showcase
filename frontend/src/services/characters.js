import axios from 'axios'
const baseUrl = 'http://localhost:3001/characters'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const createCharacter = (character) => {
    return axios.post(baseUrl, character).then(response => response.data)
}

const updateCharacter = (id, character) => {
    return axios.put(`${baseUrl}/${id}`, character).then(response => response.data)
}

const deleteCharacter = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default {getAll, createCharacter, updateCharacter, deleteCharacter}