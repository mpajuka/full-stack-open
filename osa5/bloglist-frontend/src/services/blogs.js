import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const updateLikes = await axios.put(`${ baseUrl}/${id}`, newObject)
  return updateLikes.data 
}

const removeBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const deleteBlog = await axios.delete(`${baseUrl}/${id}`, config)
  return deleteBlog.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, removeBlog }