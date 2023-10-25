// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import Cookies from 'js-cookie';

// // Create an Axios instance
// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000', // Replace with your API base URL
//   withCredentials: true
// });

// // Add a request interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Retrieve token from cookies
//     const token = Cookies.get('yourTokenCookieName'); // Replace with your actual cookie name

//     // Add the token to the Authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     // Handle request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     return response;
//   },
//   (error) => {
//     // Handle response error
//     return Promise.reject(error);
//   }
// );

// // Now you can use this axiosInstance for your requests
// // For example:
// // axiosInstance.get('/some-endpoint')
// //   .then(response => console.log(response))
// //   .catch(error => console.error(error));

// export default axiosInstance;
