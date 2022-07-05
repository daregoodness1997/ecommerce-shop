import { useState, useEffect, useContext } from 'react';
import { RadioGroup } from '@headlessui/react';

import { CheckCircleIcon, TrashIcon } from '@heroicons/react/solid';
import Input from './Input';
import Select from './Select';
import { DataContext } from '../Context';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { Audio } from 'react-loader-spinner';
import api from '../utils/api';

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Checkout = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [checkoutValue, setCheckoutValue] = useState({});
  const [countries, setCountries] = useState({});

  const value = useContext(DataContext);
  const [cart] = value.cart;

  console.log(checkoutValue);

  const renderCart = () => {
    if (!cart.line_items)
      return (
        <div className='w-full h-32 bg-white grid place-items-center'>
          <Audio height='40' width='40' color='#000' ariaLabel='loading' />
        </div>
      );

    return cart.line_items.map(lineItem => (
      <Cart item={lineItem} key={lineItem.id} />
    ));
  };

  const getCountries = async () => {
    try {
      const result = await api.handleCountries();
      setCountries(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const renderCountries = () => {
    if (!countries.data) return <option value='Nigeria'>Nigeria</option>;
    return countries.data.map(country => (
      <option value={country.name.common}>{country.name.common}</option>
    ));
  };

  console.log(countries.data);

  return (
    <div className='bg-white'>
      <main className='max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          <h1 className='sr-only'>Checkout</h1>

          <form className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
            <div>
              <div>
                <h2 className='text-lg font-medium text-gray-900'>
                  Contact information
                </h2>

                <div className='mt-4'>
                  <label
                    htmlFor='email-address'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Email address
                  </label>
                  <div className='mt-1'>
                    <Input
                      type='email'
                      id='email-address'
                      name='email'
                      autoComplete='email'
                      onChange={e =>
                        setCheckoutValue({
                          ...checkoutValue,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className='sm:col-span-2 mt-4'>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Phone
                  </label>
                  <div className='mt-1'>
                    <Input
                      type='text'
                      name='phone'
                      id='phone'
                      autoComplete='tel'
                      onChange={e =>
                        setCheckoutValue({
                          ...checkoutValue,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className='mt-10 border-t border-gray-200 pt-10'>
                <h2 className='text-lg font-medium text-gray-900'>
                  Shipping information
                </h2>

                <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                  <div>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      First name
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        id='first-name'
                        name='firstName'
                        autoComplete='given-name'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='last-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Last name
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        id='last-name'
                        name='lastName'
                        autoComplete='family-name'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='address'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Address
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        name='address'
                        id='address'
                        autoComplete='street-address'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='apartment'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Apartment, suite, etc.
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        name='apartment'
                        id='apartment'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        name='city'
                        id='city'
                        autoComplete='address-level2'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Country
                    </label>
                    <div className='mt-1'>
                      <select
                        id='country'
                        name='country'
                        autoComplete='country'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className='block w-full border-gray-300 bg-gray-50 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-3'
                      >
                        {renderCountries()}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium text-gray-700'
                    >
                      State / Province
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        name='region'
                        id='region'
                        autoComplete='address-level1'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='postal-code'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Postal code
                    </label>
                    <div className='mt-1'>
                      <Input
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        autoComplete='postal-code'
                        onChange={e =>
                          setCheckoutValue({
                            ...checkoutValue,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-10 border-t border-gray-200 pt-10'>
                <RadioGroup
                  value={selectedDeliveryMethod}
                  onChange={setSelectedDeliveryMethod}
                >
                  <RadioGroup.Label className='text-lg font-medium text-gray-900'>
                    Delivery method
                  </RadioGroup.Label>

                  <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                    {deliveryMethods.map(deliveryMethod => (
                      <RadioGroup.Option
                        key={deliveryMethod.id}
                        value={deliveryMethod}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-gray-300',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <div className='flex-1 flex'>
                              <div className='flex flex-col'>
                                <RadioGroup.Label
                                  as='span'
                                  className='block text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-1 flex items-center text-sm text-gray-500'
                                >
                                  {deliveryMethod.turnaround}
                                </RadioGroup.Description>
                                <RadioGroup.Description
                                  as='span'
                                  className='mt-6 text-sm font-medium text-gray-900'
                                >
                                  {deliveryMethod.price}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <CheckCircleIcon
                                className='h-5 w-5 text-indigo-600'
                                aria-hidden='true'
                              />
                            ) : null}
                            <div
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked
                                  ? 'border-indigo-500'
                                  : 'border-transparent',
                                'absolute -inset-px rounded-lg pointer-events-none'
                              )}
                              aria-hidden='true'
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order summary */}
            <div className='mt-10 lg:mt-0'>
              <h2 className='text-lg font-medium text-gray-900'>
                Order summary
              </h2>

              <div className='mt-4 bg-white border border-gray-200 rounded-lg shadow-sm'>
                <h3 className='sr-only'>Items in your cart</h3>
                <ul role='list' className='divide-y divide-gray-200 px-4'>
                  {renderCart()}
                </ul>
                <dl className='border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6'>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Subtotal</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      $64.00
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'>$5.00</dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Taxes</dt>
                    <dd className='text-sm font-medium text-gray-900'>$5.52</dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      $75.52
                    </dd>
                  </div>
                </dl>

                <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <button
                    to='/order-summary/1'
                    type='submit'
                    className='w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
                  >
                    Pay with Stripe
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
