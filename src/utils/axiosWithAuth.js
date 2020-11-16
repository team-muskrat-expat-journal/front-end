import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://skrat-expat.herokuapp.com/',
        headers: {
            Authorization: token
        }
    })
}
