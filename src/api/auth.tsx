import api from '../utils/request';

export const login = (data: any) => {
  const params = {
    data,
    url: '/AuthMngr/CBS/BaseLogin',
  };
  return api.get(params);
};
