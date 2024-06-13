import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API

export const getAll = (query = "All") => {
    return axios.get(BASE_URL + '/todos?keyword=' + query);
}

export const create = (payload) => {
    return axios.post(BASE_URL + '/todos', {...payload})
}

export const update = (payload) => {
    return axios.put(BASE_URL + '/todos/' + payload._id, {...payload})
}

export const getById = (id) => {
    return axios.get(BASE_URL + '/todos/'+id)
}

export const remove = (id) => {
    return axios.delete(BASE_URL + '/todos/' + id);
}

