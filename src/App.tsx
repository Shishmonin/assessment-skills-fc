import React, { FC } from 'react';
import { Header } from './components/Header/header';
import { login } from './api/auth';

const App: FC = () => {
  login({
    query: {
      hoi: '56.0',
      tax_rate: '1.2485549449920654',
      downpayment: '44980',
      price: '224900',
      term: '30.0',
      rate: '3.827',
    },
    body: {
      body: 'asdf',
    },
  });
  return <Header>Text</Header>;
};

export { App };
