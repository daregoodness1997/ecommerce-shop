import React, { useContext, useState } from 'react';
// import { products } from '../data';
import { Product } from './Product';
import { DataContext } from '../Context';
import Loader from './Loader';
import { useSearchParams } from 'react-router-dom';

export const Products = () => {
  const value = useContext(DataContext);
  const [products] = value.products;
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    q: 'customer',
    sort: 'ascending',
    byCity: 'ibadan,lagos',
  });

  const updateQuery = () => {
    let params = queryParams;
    setSearchParams(params);
  };

  // console.log(queryParams, searchParams.get('byCity'));

  if (!products.length) return <Loader />;

  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>
          Our Products
        </h2>

        {/* <button onClick={() => updateQuery()}>Filter by name</button> */}

        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {products.map(product => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
