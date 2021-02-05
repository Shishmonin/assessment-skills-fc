import React, { FC, useState } from 'react';

type PropTypes = {
  title?: string;
  chirdren?: never;
  props?: unknown;
};

export const Header: FC<PropTypes> = ({ title, ...props }: PropTypes) => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{title && typeof title === 'string' ? title.toLocaleLowerCase() : null}</h1>
      <h3>{count.toFixed()}</h3>
    </>
  );
};

Header.defaultProps = {
  title: 'Hi Mark!',
  chirdren: undefined,
  props: {},
};
