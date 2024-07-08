import axios from 'axios';

export const getList = () => axios.get(`http://localhost:3000/list`).then(res => res.data)

export const getCat = (id) => axios.get(`http://localhost:3000/${id}`).then(res => res.data)

export const addCat = (cat) => axios.post(`http://localhost:3000/add`, cat).then(res => res)

export const updateCat = (id, cat) => axios.put(`http://localhost:3000/${id}`, cat).then(res => res)

export const deleteCat = (id) => axios.delete(`http://localhost:3000/${id}`).then(res => res)