import axios from 'axios';

export const API_BASE_ADDRESS = 'http://localhost:3000/';

const handleError = (error) => Promise.reject(error);
const getToken = () => localStorage.getItem('TOKEN_KEY');

const getQueryString = (params) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&');
};

const client = axios.create({
  baseURL: API_BASE_ADDRESS,
});

client.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

function request(params) {
  const method = params.method || 'GET';
  let qs = '';
  const headers = params.headers || {
    Accept: 'application/json',
    'Content-Type': 'application/xml',
  };

  if (['GET', 'DELETE', 'POST', 'PUT'].indexOf(method) > -1) qs = params.data ? `?${getQueryString(params.data)}` : '';

  const url = `${API_BASE_ADDRESS}${params.url}${qs}`;
  const paramsObj = {
    method,
    headers,
  };
  if (params.body) {
    paramsObj.body = params.body;
  }
  return client(url, paramsObj)
    .then((response) => response.data)
    .catch(handleError);
}

export default {
  get: (url) => request({ method: 'GET' }),
  post: (url, data) => request({ method: 'POST', data }),
  put: (url, data) => request({ method: 'PUT', data }),
  delete: (url, data) => request({ method: 'DELETE', data }),
};
