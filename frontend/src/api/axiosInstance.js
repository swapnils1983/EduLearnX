import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        } catch (error) {
            console.error('Error retrieving access token:', error);
        }

        return config;
    },
    (err) => Promise.reject(err)
);

export default axiosInstance;
