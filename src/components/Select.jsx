import React from 'react';
import { DataContext } from '../Context';

const Select = ({ id, name, autoComplete, ...props }) => {
  return (
    <select
      id='country'
      name='country'
      autoComplete='country-name'
      className='block w-full border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3'
    >
      <option>United States</option>
      <option>Canada</option>
      <option>Mexico</option>
    </select>
  );
};

export default Select;
