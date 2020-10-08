import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://glacial-crag-92125.herokuapp.com'
    // baseURL: 'http://192.168.0.104:1337'
    // baseURL: 'http://localhost:5000'
    // baseURL: 'http://173.82.212.9/backend'
});

export default instance;
