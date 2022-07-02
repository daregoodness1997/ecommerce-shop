import React from 'react';

const Input = ({ type, id, name, autoComplete, ...props }) => {
  return (
    <input
      {...props}
      type={type}
      id={id}
      name={name}
      autoComplete={autoComplete}
      className='block w-full border-gray-400 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3'
    />
  );
};

export default Input;
