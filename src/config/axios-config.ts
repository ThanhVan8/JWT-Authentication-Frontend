import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({  
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.status === 401) { // Unauthorized
    localStorage.removeItem('token');
    alert('Session expired, please login again');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});


const instanceUnsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
  },
})

export { instanceUnsplash, instance };
export default axios;