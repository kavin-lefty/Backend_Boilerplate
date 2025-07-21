import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const CommonApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

CommonApi.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error(error, "error in request");
    return Promise.reject(error); // ✅ This line was missing
  }
);

CommonApi.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("unauthorized access...");
    return Promise.reject(error);
  }
);

export default CommonApi;
