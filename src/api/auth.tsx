import api from '../utils/request';

export const login = (data: any) => {
  const params = {
    data,
    url: 'mortgage/calculate',
  };
  return api.post(params);
};
