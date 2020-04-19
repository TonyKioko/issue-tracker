import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:8000/api/'
});

ax.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    console.log("token",token)

    if (token) {
    console.log("token 1",token)

        config.headers.common['Authorization'] = `Bearer ${token}`;
    }

    console.log("config",config)
    return config;
}, function (error) {
    // Do something with request eror
    return Promise.reject(error);
});

export default ax;

// import axios from 'axios';


// const token = localStorage.getItem('token')
// axios.defaults.headers.common['Authorization'] = token ? token.access_token : '';

// export default axios.create({
//     baseURL: 'http://localhost:8000/api/',
//   });