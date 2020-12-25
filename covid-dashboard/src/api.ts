import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = 'https://disease.sh/v3/covid-19/';
const LOADING_TIME = 5000;

const api = axios.create({
  baseURL: API_URL,
  timeout: LOADING_TIME,
});

const onSuccess = (response: AxiosResponse) => response;
const onFail = (error: AxiosError) => {
  throw error;
};
api.interceptors.response.use(onSuccess, onFail);

export default api;
