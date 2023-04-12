import axios from 'axios';
import { API_URL, LOCAL_STORAGE_KEYS } from "../constants";

function Interceptor() {
    // Handle axios default config
    axios.defaults.baseURL = `${API_URL.Vwater_API}`;

    // Handle axios request
    axios.interceptors.request.use(
        (config) => {
            // const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
            // config.headers.Authorization = token && token.length ? `Bearer ${token}` : '';
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    );

    // Handle axios response
    axios.interceptors.response.use(
        (response) => {
            return Promise.resolve(response.data);
        }, (error) => {
            // Handle server error
            if (error.response.status.toString().startsWith('5')) {
                return Promise.reject('Internal Server Error!!!');
            }

            // Clear access token
            if (error.response.status === 401) {
                localStorage.removeItem(LOCAL_STORAGE_KEYS.Token);
            }

            return Promise.reject(error);
        }
    );
}

export default Interceptor;
