import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    //console.log('getall', request)
    return request.then(response => response.data)
}

const createPerson = (newPersonObj) => {
    const request = axios.post(baseUrl, newPersonObj)
    return request.then(response => response.data)
}

const removePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    //console.log(`Deleted ${id}`, request)
    return request
}

const updatePerson = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
}

export default { getAll, createPerson, removePerson, updatePerson }