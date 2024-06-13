import axios, { AxiosError } from "axios";

export const setUpInterceptor = (store) => {
  const handleError = async (error) => {
    if (error?.response?.status === 401) {
      store.dispatch({ type: "user/LOGOUT/fulfilled"})
        .unwrap()
        .finally(() => {
            window.location.href = "/";
        });
    }
    return Promise.reject(error?.response?.data || error?.response || error)
  }



  axios.interceptors.request.use(
    async (config) => {
      const token = store?.getState()?.auth?.user?.accessToken
        const authConfig = {};
        if(token) {
            authConfig.Authorization = `Bearer ${token}`
        }
          config.headers = {
            ...authConfig,
            ...config.headers
          }
      return config
    }
  )

  axios.interceptors.response.use((response) => response, handleError);
}