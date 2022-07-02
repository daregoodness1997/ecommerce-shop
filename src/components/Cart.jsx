import React, { useContext } from 'react';
import { DataContext } from '../Context';

const Cart = ({ item }) => {
  const value = useContext(DataContext);
  const [cart] = value.cart;
  const removeFromCart = value.removeFromCart;
  const updateCartQty = value.updateCartQty;

  const reduceItemQty = () => {
    updateCartQty(item.id, item.quantity - 1);
  };
  const increaseItemQty = () => {
    updateCartQty(item.id, item.quantity + 1);
  };

  // console.log('my cart', cart.line_items);
  return (
    <li className='flex py-6'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <img
          src={item.image.url}
          alt={item.product_name}
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <h3>
              <a href='#'> {item.product_name} </a>
            </h3>
            <p className='ml-4'>{item.price.formatted_with_symbol}</p>
          </div>
        </div>
        <div className='flex flex-1 items-center justify-between text-sm'>
          <div className='flex flex-1 items-center'>
            <button
              className='bg-gray-100 p-1.5 px-3  rounded-md mr-2 text-center'
              onClick={reduceItemQty}
            >
              -
            </button>
            <p className='text-gray-500'>Qty {item.quantity}</p>
            <button
              className='bg-gray-100 p-1.5 px-3 rounded-md ml-2 text-center'
              onClick={increaseItemQty}
            >
              +
            </button>
          </div>

          <div className='flex'>
            <button
              type='button'
              className='font-medium text-indigo-600 hover:text-indigo-500'
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Cart;
