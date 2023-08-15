/* eslint-disable no-param-reassign */
import axios from 'axios';
import getCookie from '@Utils/cookieUtils';

const { BASE_URL } = process.env;
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// To download zip files from api response
export const downloadApi = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5 * 60 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  responseType: 'arraybuffer',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    // if (error.response.data.detail === 'Invalid token.') window.location.href = '/login';
    if (
      localStorage.getItem('refreshToken') &&
      // error.response.status === 401
      error.response.status === 403 &&
      error.response.data.detail === 'Given token not valid for any token type'
    ) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (error.response.data.detail === 'Token is invalid or expired' && error.response.status === 401) {
        window.location.href = '/login';
      }
      if (
        (error.response.data.detail === 'Authentication credentials were not provided.' ||
          error.response.data.detail === 'Invalid token.') &&
        error.response.status === 403
      ) {
        window.location.href = '/login';
      }
      return api
        .post('/users/token/refresh/', { refresh: refreshToken })
        .then((response) => {
          localStorage.setItem('userToken', response.data.access);
          api.defaults.headers.Authorization = `Bearer ${response.data.access}`;
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return api(originalRequest);
        })
        .catch((err) => {
          if (err.response.data.detail === 'Token is invalid or expired' && err.response.status === 401) {
            window.location.href = '/login';
          }
        });
    }

    if (
      !localStorage.getItem('refreshToken') &&
      error.response.status === 401
      // error.response.statusText === 'Unauthorized'
    ) {
      // send login page
      window.location.href = '/login';
    }

    // window.location.href = '/login';
    // specific error handling done elsewhere
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ ...error });
  },
);

// export const authenticated = (apiInstance) => {
//   const token = localStorage.getItem('userToken');
//   // eslint-disable-next-line no-param-reassign
//   apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
//   return apiInstance;
// };

export const authenticated = (apiInstance) => {
  const token = localStorage.getItem('userToken');
  if (!token) return apiInstance;
  // const token = localStorage.getItem('token');
  // const isPublicPage = localStorage.getItem('isPublicPage');
  if (process.env.NODE_ENV === 'development') {
    apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    apiInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    // apiInstance.defaults.headers.common.Authorization = `Token ${token}`;
    // This has been done to fix the CSRF Issue on same domain.
    apiInstance.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.headers.patch['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.headers.delete['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.withCredentials = true;
  }
  return apiInstance;
};

export const loginHeaderAPI = (apiInstance) => {
  if (process.env.NODE_ENV === 'development') {
    apiInstance.defaults.headers.common.Authorization = `Token ${process.env.TOKEN}`;
  } else {
    apiInstance.defaults.headers.post['X-CSRFToken'] = getCookie('csrftoken');
    apiInstance.defaults.withCredentials = true;
  }
  return apiInstance;
};
