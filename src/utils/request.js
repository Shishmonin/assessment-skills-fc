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
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/xml',
  },
});

// client.interceptors.request.use(
//   (config) => {
//     if (!config.headers.Authorization) {
//       const token = getToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

function request(params) {
  console.log('params', params);
  const method = params.method || 'GET';
  let qs = '';
  if (['GET', 'DELETE'].indexOf(method) > -1) qs = params.data ? `?${getQueryString(params.data)}` : '';
  const url = `${params.url}${qs}`;
  console.log('url', url);
  const paramsObj;

  if (params.body) {
    paramsObj.body = params.body;
  }
  return client(url, paramsObj)
    .then((response) => response.data)
    .catch(handleError);
}

export default {
  get: (data) => request({ method: 'GET', ...data }),
  post: (data) => request({ method: 'POST', ...data }),
  put: (data) => request({ method: 'PUT', ...data }),
  delete: (data) => request({ method: 'DELETE', ...data }),
};
