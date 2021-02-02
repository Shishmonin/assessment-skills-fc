import React, { FC } from 'react';
import { login } from './api/auth';

const App: FC = () => {
  login({ a: 2, b: 4 });
  return (
    <div className="App" />
  );
};

export { App };
