import React from 'react';
import { Audio } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className='w-full h-full absolute bg-white grid place-items-center'>
      <Audio height='100' width='100' color='#000' ariaLabel='loading' />
    </div>
  );
};

export default Loader;

// https://mhnpd.github.io/react-loader-spinner-example/
