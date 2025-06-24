import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
}

const getWeather = (latitude, longitude) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
}

export default {getAll, getWeather}