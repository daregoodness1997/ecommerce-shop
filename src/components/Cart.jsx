import React, { useContext } from 'react';
import { DataContext } from '../Context';

const Cart = () => {
  const value = useContext(DataContext);
  const [cart] = value.cart;

  console.log(cart.line_items);
  return cart.line_items.map(item => {
    <li key={item.id} className='flex py-6'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <img
          //   src={item.imageSrc}
          alt={item.imageAlt}
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <h3>
              <a href={item.href}> {item.name} </a>
            </h3>
            <p className='ml-4'>{item.price}</p>
          </div>
          <p className='mt-1 text-sm text-gray-500'>{item.color}</p>
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          <p className='text-gray-500'>Qty {item.quantity}</p>

          <div className='flex'>
            <button
              type='button'
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>;
  });
};

export default Cart;
