import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/outline';

export const Product = ({ product }) => {
  return (
    <div  className='group relative'>
      <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className='w-full h-full object-center object-cover lg:w-full lg:h-full'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div className='flex flex-col'>
          <h3 className='text-sm text-gray-700'>
            <a href={product.href}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name}
            </a>
          </h3>
          {/* <p className='mt-1 text-sm text-gray-500'>{product.color}</p> */}
          <button className='bg-gray-100 p-2 rounded w-10 mt-1 mb-1'>
            <ShoppingBagIcon
              className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
              aria-hidden='true'
            />
          </button>
        </div>
        <p className='text-sm font-medium text-gray-900'>{product.price}</p>
      </div>
    </div>
  );
};
