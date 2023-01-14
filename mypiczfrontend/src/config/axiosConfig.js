import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

export const cloudClient = axios.create({
    baseURL: process.env.REACT_APP_CLOUD_URL
})