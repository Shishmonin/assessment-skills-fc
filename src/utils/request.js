import axios from 'axios';

export const API_BASE_ADDRESS = 'https://realtor.p.rapidapi.com/';

const handleError = (error) => Promise.reject(error);
// const getToken = () => localStorage.getItem('TOKEN_KEY');

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
    'x-rapidapi-key': 'b419b9e988mshb5c1984b8b7e45dp1f0edbjsn3be254335a8d',
    'x-rapidapi-host': 'realtor.p.rapidapi.com',
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
  if (['GET', 'DELETE'].indexOf(method) > -1) qs = params.data?.query ? `?${getQueryString(params.data.query)}` : '';
  const url = `${params.url}${qs}`;
  let paramsObj = null;
  if (params.data.body) {
    paramsObj = params.data.body;
  }
  return client.request({
    method,
    url,
    data: paramsObj,
  })
    .then((response) => console.log(response))
    .catch(handleError);
}

export default {
  get: (data) => request({ method: 'GET', ...data }),
  post: (data) => request({ method: 'POST', ...data }),
  put: (data) => request({ method: 'PUT', ...data }),
  delete: (data) => request({ method: 'DELETE', ...data }),
};
