import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../Context';
import { Alert } from './Alert';
import ProgressiveImage from './ProgressiveImage';
import { toast } from 'react-toastify';
import Toast from './Toast';
import { Oval } from 'react-loader-spinner';

export const Product = ({ product, handleAddToCart }) => {
  const value = useContext(DataContext);
  const addCart = value.addCart;
  const [loading, setLoading] = useState(false);
  const [cart] = value.cart;
  const [open, setOpen] = useState(true);

  const notify = () => toast('Wow so easy!');

  // console.log('Cart', cart);

  const addToCart = () => {
    setLoading(true);
    addCart(product.id, 1);

    setTimeout(() => {
      setLoading(false);
      toast.success(`${product.name} added to cart`);
    }, 1500);
  };

  return (
    <div>
      <Toast type={'success'} />

      <div className='group relative'>
        <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
          <ProgressiveImage
            src={product.assets[0].url || null}
            alt={product.name}
            placeholderSrc={product.name}
          />
        </div>
        <div className='mt-4 flex justify-between'>
          <div className='flex flex-col'>
            <h3 className='text-sm text-gray-700'>
              <a href='#'>
                <span aria-hidden='true' className='absolute inset-0' />
                {product.name}
              </a>
            </h3>
            {/* <p className='mt-1 text-sm text-gray-500'>{product.color}</p> */}
          </div>
          <p className='text-sm font-medium text-gray-900'>
            ₦{product.price.formatted}
          </p>
        </div>
      </div>

      <div onClick={addToCart}>
        <button
          className='flex bg-gray-100 px-6 py-2 items-center justify-center rounded-md w-full mt-1 mb-1 text-center'
          onClick={() => console.log('added to cart')}
        >
          {loading ? (
            <Oval height='20' width='20' color='#ddd' />
          ) : (
            <div>
              <span>Add to Cart</span>
              {/* <ShoppingBagIcon
            className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
            aria-hidden='true'
          /> */}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

// https://mhnpd.github.io/react-loader-spinner-example/
