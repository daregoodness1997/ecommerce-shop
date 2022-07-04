import { useState, useEffect, useContext } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';
import ProgressiveImage from './ProgressiveImage';
import { useParams } from 'react-router-dom';
import { DataContext } from '../Context';
import Loader from './Loader';
import { stripHtml } from 'string-strip-html';

const product = {
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
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const [productDetails, setProductDetails] = useState({});
  const value = useContext(DataContext);
  const [products] = value.products;

  let params = useParams();

  const getProduct = productId => {
    return products.filter(product => product.id === productId);
  };

  let productD = getProduct(params.id);

  console.log(params.id, products, productD);

  if (!productD.length) return <Loader />;

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        {/* Image gallery */}
        <div className='mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8'>
          <div className='hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block'>
            <ProgressiveImage
              src={productD[0].image.url || productD[0].assets[0].url}
              alt={product.images[0].alt}
              className='w-full h-full object-center object-cover'
            />
          </div>
          <div className='hidden lg:grid lg:grid-cols-1 lg:gap-y-8'>
            <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
              <ProgressiveImage
                src={productD[0].image.url || productD[0].assets[0].url}
                alt={product.images[1].alt}
                className='w-full h-full object-center object-cover'
              />
            </div>
            <div className='aspect-w-3 aspect-h-2 rounded-lg overflow-hidden'>
              <ProgressiveImage
                src={productD[0].image.url}
                alt={product.images[2].alt}
                className='w-full h-full object-center object-cover'
              />
            </div>
          </div>
          <div className='aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4'>
            <ProgressiveImage
              src={productD[0].image.url}
              alt={product.images[3].alt}
              className='w-full h-full object-center object-cover'
            />
          </div>
        </div>

        {/* Product info */}
        <div className='max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8'>
          <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
              {productD[0].name}
            </h1>
          </div>

          {/* Options */}
          <div className='mt-4 lg:mt-0 lg:row-span-3'>
            <h2 className='sr-only'>Product information</h2>
            <p className='text-3xl text-gray-900'>
              {productD[0].price.formatted_with_symbol}
            </p>

            <di className='mt-10'>
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
                    {product.colors.map(color => (
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

              <button className='mt-10 w-full bg-amber-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-black hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500'>
                Buy Now
              </button>
              <button className='mt-2 w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500'>
                Add to Cart
              </button>
              <button className='mt-2 w-full bg-green-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
                Continue on Whatsapp
              </button>
            </di>
          </div>

          <div className='py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
            <div className='mt-10'>
              <h2 className='text-sm font-medium text-gray-900'>Description</h2>

              <div className='mt-4 space-y-6'>
                <p className='text-sm text-gray-600'>
                  {productD[0].description.replace(/(<([^>]+)>)/gi, '')}

                  {/* https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/ */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
