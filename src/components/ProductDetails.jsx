import { useState, useEffect, useContext } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import ProgressiveImage from './ProgressiveImage';
import { useParams } from 'react-router-dom';
import { DataContext } from '../Context';
import Loader from './Loader';
import { Oval } from 'react-loader-spinner';

import { stripHtml } from 'string-strip-html';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react';
import { HeartIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/outline';

const productD = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const ProductDetails = () => {
  const [selectedColor, setSelectedColor] = useState(productD.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productD.sizes[2]);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const value = useContext(DataContext);
  const addCart = value.addCart;
  const [products] = value.products;

  let params = useParams();

  const getProduct = productId => {
    return products.filter(product => product.id === productId);
  };

  let product = getProduct(params.id);

  console.log(params.id, products, product);

  if (!product.length) return <Loader />;

  console.log(product[0].assets);

  const addToCart = () => {
    setLoading(true);
    addCart(product[0].id, 1);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const renderGallery = () => {
    if (product[0].assets === 0)
      return (
        <div className='w-full h-full'>
          <Loader />
        </div>
      );
    return product[0].assets.map(image => (
      <Tab
        key={image.id}
        className='relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50'
      >
        {({ selected }) => (
          <>
            <span className='absolute inset-0 rounded-md overflow-hidden'>
              <ProgressiveImage
                src={image.url}
                alt=''
                className='w-full h-full object-center object-cover'
              />
            </span>
            <span
              className={classNames(
                selected ? 'ring-indigo-500' : 'ring-transparent',
                'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
              )}
              aria-hidden='true'
            />
          </>
        )}
      </Tab>
    ));
  };
  return (
    <div className='bg-white'>
      <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start'>
          {/* Image gallery */}
          <Tab.Group as='div' className='flex flex-col-reverse'>
            {/* Image selector */}
            <div className='hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none'>
              <Tab.List className='grid grid-cols-4 gap-6'>
                {renderGallery()}
              </Tab.List>
            </div>

            <Tab.Panels className='w-full aspect-w-1 aspect-h-1'>
              {product[0].assets.map(image => (
                <Tab.Panel key={image.id}>
                  <ProgressiveImage
                    src={image.url}
                    alt={image.filename}
                    className='w-full h-full object-center object-cover sm:rounded-lg'
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className='mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0'>
            <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
              {product[0].name}
            </h1>
            <div className='mt-3'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl text-gray-900'>
                {product[0].price.formatted_with_symbol}
              </p>
            </div>

            <div className='mt-6'>
              <h3 className='sr-only'>Description</h3>

              <p className='text-sm text-gray-600 w-full md:w-96'>
                {product[0].description.replace(/(<([^>]+)>)/gi, '')}

                {/* https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ */}
              </p>
            </div>

            <div className='mt-10'>
              {/* Colors */}
              <div>
                <h3 className='text-sm text-gray-900 font-medium'>Color</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className='mt-4'
                >
                  <RadioGroup.Label className='sr-only'>
                    Choose a color
                  </RadioGroup.Label>
                  <div className='flex items-center space-x-3'>
                    {productD.colors.map(color => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1' : '',
                            !active && checked ? 'ring-2' : '',
                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        <RadioGroup.Label as='span' className='sr-only'>
                          {color.name}
                        </RadioGroup.Label>
                        <span
                          aria-hidden='true'
                          className={classNames(
                            color.class,
                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Buttons */}
              <button className='mt-10 w-full md:w-96 bg-amber-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-black hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'>
                Buy Now
              </button>
              <button
                className='mt-2 w-full md:w-96 bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500'
                onClick={addToCart}
              >
                {loading ? (
                  <Oval height='20' width='20' color='#ddd' />
                ) : (
                  <div>
                    <span>Add to Cart</span>
                  </div>
                )}
              </button>
              <a
                href={`https://wa.me/2347019805776/?text=Hello can I get this product https://prismatic-medovik-afb31b.netlify.app/products/${product[0].id}`}
                target='_blank'
                className='mt-2 w-full md:w-96 bg-green-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Continue on Whatsapp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className='bg-white'>
    //   <div className='pt-6'>
    //     {/* Image gallery */}
    //     <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
    //       <div className='hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block'>
    //         <ProgressiveImage
    //           src={productD[0].image.url || productD[0].assets[0].url}
    //           alt={product.images[0].alt}
    //           className='w-full h-full object-center object-cover'
    //         />
    //       </div>
    //       <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
    //         <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
    //           <ProgressiveImage
    //             src={productD[0].image.url || productD[0].assets[0].url}
    //             alt={product.images[1].alt}
    //             className='w-full h-full object-center object-cover'
    //           />
    //         </div>
    //         <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
    //           <ProgressiveImage
    //             src={productD[0].image.url}
    //             alt={product.images[2].alt}
    //             className='w-full h-full object-center object-cover'
    //           />
    //         </div>
    //       </div>
    //       <div className='aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
    //         <ProgressiveImage
    //           src={productD[0].image.url}
    //           alt={product.images[3].alt}
    //           className='w-full h-full object-center object-cover'
    //         />
    //       </div>
    //     </div>

    //     {/* Product info */}
    //     <div className='max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8'>
    //       <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
    //         <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
    //           {productD[0].name}
    //         </h1>
    //       </div>

    //       {/* Options */}
    //       <div className='mt-4 lg:mt-0 lg:row-span-3'>
    //         <h2 className='sr-only'>Product information</h2>
    //         <p className='text-3xl text-gray-900'>
    //           {productD[0].price.formatted_with_symbol}
    //         </p>

    //           {/* Sizes */}
    //           <div className='mt-10'>
    //             <div className='flex items-center justify-between'>
    //               <h3 className='text-sm text-gray-900 font-medium'>Size</h3>
    //               <a
    //                 href='#'
    //                 className='text-sm font-medium text-red-600 hover:text-red-500'
    //               >
    //                 Size guide
    //               </a>
    //             </div>

    //             <RadioGroup
    //               value={selectedSize}
    //               onChange={setSelectedSize}
    //               className='mt-4'
    //             >
    //               <RadioGroup.Label className='sr-only'>
    //                 Choose a size
    //               </RadioGroup.Label>
    //               <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
    //                 {product.sizes.map(size => (
    //                   <RadioGroup.Option
    //                     key={size.name}
    //                     value={size}
    //                     disabled={!size.inStock}
    //                     className={({ active }) =>
    //                       classNames(
    //                         size.inStock
    //                           ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
    //                           : 'bg-gray-50 text-gray-200 cursor-not-allowed',
    //                         active ? 'ring-2 ring-indigo-500' : '',
    //                         'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
    //                       )
    //                     }
    //                   >
    //                     {({ active, checked }) => (
    //                       <>
    //                         <RadioGroup.Label as='p'>
    //                           {size.name}
    //                         </RadioGroup.Label>
    //                         {size.inStock ? (
    //                           <div
    //                             className={classNames(
    //                               active ? 'border' : 'border-2',
    //                               checked
    //                                 ? 'border-indigo-500'
    //                                 : 'border-transparent',
    //                               'absolute -inset-px rounded-md pointer-events-none'
    //                             )}
    //                             aria-hidden='true'
    //                           />
    //                         ) : (
    //                           <div
    //                             aria-hidden='true'
    //                             className='absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none'
    //                           >
    //                             <svg
    //                               className='absolute inset-0 w-full h-full text-gray-200 stroke-2'
    //                               viewBox='0 0 100 100'
    //                               preserveAspectRatio='none'
    //                               stroke='currentColor'
    //                             >
    //                               <line
    //                                 x1={0}
    //                                 y1={100}
    //                                 x2={100}
    //                                 y2={0}
    //                                 vectorEffect='non-scaling-stroke'
    //                               />
    //                             </svg>
    //                           </div>
    //                         )}
    //                       </>
    //                     )}
    //                   </RadioGroup.Option>
    //                 ))}
    //               </div>
    //             </RadioGroup>
    //           </div>

    //         </div>
    //       </div>

    //       <div className='py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
    //         <div className='mt-10'>
    //           <h2 className='text-sm font-medium text-gray-900'>Description</h2>

    //           <div className='mt-4 space-y-6'>
    //             <p className='text-sm text-gray-600'>
    //               {productD[0].description.replace(/(<([^>]+)>)/gi, '')}

    //               {/* https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ */}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
