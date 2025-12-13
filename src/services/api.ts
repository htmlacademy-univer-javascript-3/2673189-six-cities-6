import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

type DetailMessageType = {
  type: string;
  message: string;
}

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized?: UnauthorizedCallback): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        onUnauthorized?.();
      }
      throw error;
    }
  );

  return api;
};
