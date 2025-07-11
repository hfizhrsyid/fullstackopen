import axios from "axios";
const baseUrl = "api/persons"


const getAll = () => {
    return axios.get(baseUrl)
}

const updatePerson = noteObject => {
    return axios.post(baseUrl, noteObject)
}

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const changePhoneNumber = (id, personObject) => {
    return axios.put(`${baseUrl}/${id}`, personObject)
}

export default { getAll, updatePerson, deletePerson, changePhoneNumber }