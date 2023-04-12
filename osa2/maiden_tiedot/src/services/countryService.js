import axios from "axios"
const baseUrl = 'https://restcountries.com/v3.1/all'
const apiKey = '455c3d32c946eba6de85beb8999e3c7f'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeather = (props) => {
    if (Object.keys(props.capitalInfo).length === 0) {
        const lat = props.latlng[0]
        const lon = props.latlng[1]
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        const request = axios.get(weatherUrl)
        return request.then(response => response.data)
    } else {
        const lat = props.capitalInfo.latlng[0]
        const lon = props.capitalInfo.latlng[1]
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        const request = axios.get(weatherUrl)
        return request.then(response => response.data)
    }
    
}

export default { getAll, getWeather }