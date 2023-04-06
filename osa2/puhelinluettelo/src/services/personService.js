import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

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
    return deleteRequest
            .then(response => response.data)
            .catch(error => console.log(error))
}

export default { getAll, create, deleteContact }