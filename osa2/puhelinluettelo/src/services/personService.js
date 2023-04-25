import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteContact = (person) => {
    const deleteRequest = axios.delete(`${baseUrl}/${person.id}`)
    return deleteRequest.then(response => response.data)
}

const changeNumber = (person) => {
    const changeRequest = axios.put(`${baseUrl}/${person.id}`, person)
    return changeRequest.then(response => response.data)
}

export default { getAll, create, deleteContact, changeNumber }