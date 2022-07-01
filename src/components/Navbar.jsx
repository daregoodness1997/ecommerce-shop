import { Fragment, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/outline';

import { navigation } from '../data';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Navbar = ({ totalItems = 0, setOpen }) => {
  return (
    <div className='bg-white'>
      <header className='relative bg-white z-30'>
        <p className='bg-amber-400 h-10 flex items-center justify-center text-sm font-medium text-black px-4 sm:px-6 lg:px-8'>
          Get free delivery on orders over ₦10,000
        </p>

        <nav
          aria-label='Top'
          className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        >
          <div className='border-b border-gray-200'>
            <div className='h-16 flex items-center'>
              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <a href='#'>
                  <span className='sr-only'>Elegant Thrift Store</span>
                  <h3 className='font-semibold tracking-wide'>THRIFT PLACE</h3>
                  {/* <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                    alt=''
                  /> */}
                </a>
              </div>

              <div className='ml-auto flex items-center'>
                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6' onClick={setOpen}>
                  <a href='#' className='group -m-2 p-2 flex items-center'>
                    <ShoppingBagIcon
                      className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      {totalItems}
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
