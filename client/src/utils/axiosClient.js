import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("axioooos");
        
        const refreshResponse = await axiosClient.post("/auth/refresh");

        localStorage.setItem("access_token", refreshResponse.data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // For other errors or if already retried
    return Promise.reject(error);
  }
);


export default axiosClient;
