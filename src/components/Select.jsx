import React from 'react';
import { DataContext } from '../Context';

const Select = ({ id, name, autoComplete, value, ...props }) => {
  return (
    <select
      id={id}
      name={name}
      autoComplete={autoComplete}
      value={value}
      className='block w-full border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3'
    >
      <option value='Nigeria'>Nigeria</option>
      <option value='Canada'>Canada</option>
      <option value='Mexico'>Mexico</option>
    </select>
  );
};

export default Select;
