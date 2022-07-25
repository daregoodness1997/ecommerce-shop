import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../Context';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { Audio } from 'react-loader-spinner';
import api from '../utils/api';
import { commerce } from '../utils/commerce';

import { CheckoutForm } from './CheckoutForm';
import { RadioGroup } from '@headlessui/react';
import Input from './Input';
import { usePaystackPayment } from 'react-paystack';

// CheckCircleIcon

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: 1000,
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: 2000 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const Checkout = () => {
  const [checkoutToken, setCheckoutToken] = useState('');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const [checkoutValue, setCheckoutValue] = useState({});
  const [countries, setCountries] = useState({});
  let navigate = useNavigate();

  const value = useContext(DataContext);
  const [cart] = value.cart;
  const handleCheckout = value.handleCheckout;
  const emptyCart = value.emptyCart;
  const order = {
    // line_items: checkoutToken.live.line_items,
    customer: {
      firstname: checkoutValue.firstName,
      lastname: checkoutValue.lastName,
      email: checkoutValue.email,
    },
    shipping: { name: 'Domestic', street: checkoutValue.address },
    fulfillment: { shipping_method: selectedDeliveryMethod },
    deliveryMethod: selectedDeliveryMethod,
    // orderId: checkoutToken.id,
    checkoutDetails: checkoutValue,
  };

  console.log(checkoutValue);
  // console.log(cart);

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

  console.log('Cart ID', cart.id);

  const generateToken = async () => {
    try {
      const token = await commerce.checkout.generateTokenFrom('cart', cart.id);
      setCheckoutToken(token);
    } catch (err) {
      console.error(err);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    getCountries();
    generateToken();
  }, [cart]);

  console.log('Checkout Token', checkoutToken);
  const renderSubTotal = () => {
    if (!cart.subtotal) return null;
    return cart.subtotal.raw;
  };

  let shipping = selectedDeliveryMethod.price;
  let subtotal = renderSubTotal();
  let tax = (shipping + subtotal) * 0.01;
  let total = shipping + subtotal + tax;

  const config = {
    reference: checkoutToken.id || new Date().getTime().toString(),
    email: checkoutValue.email,
    amount: total * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    body: JSON.stringify('User Data'),
  };

  const onSuccess = reference => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference, order);
    handleCheckout(checkoutToken.id, order);
    emptyCart();
    navigate('/order-summary', { replace: true });
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed');
  };

  const initializePayment = usePaystackPayment(config);

  const renderCountries = () => {
    if (!countries.data) return <option value='Nigeria'>Nigeria</option>;
    return countries.data.map((country, idx) => (
      <option value={country.name.common} key={idx}>
        {country.name.common}
      </option>
    ));
  };

  const options = {
    clientSecret: import.meta.env.VITE_STRIPE_CLIENT_SECRET,
  };

  return (
    <div className='bg-white'>
      <main className='max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          <h1 className='sr-only'>Checkout</h1>
          <div className='lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16'>
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
                      required={true}
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
                        <option value='Nigeria'>Nigeria</option>
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
                            active ? 'ring-2 ring-gray-500' : '',
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
                                  ₦{deliveryMethod.price}
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked ? (
                              <div
                                className='h-5 w-5 text-green-600'
                                aria-hidden='true'
                              />
                            ) : null}
                            <div
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked
                                  ? 'border-gray-500'
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

                  <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                    {/* <CardElement /> */}
                    {/* <PaymentElement /> */}
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
                      ₦{subtotal}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>Shipping</dt>
                    <dd className='text-sm font-medium text-gray-900'></dd>₦
                    {shipping}
                  </div>
                  <div className='flex items-center justify-between'>
                    <dt className='text-sm'>V.A.T</dt>
                    <dd className='text-sm font-medium text-gray-900'>
                      ₦{tax}
                    </dd>
                  </div>
                  <div className='flex items-center justify-between border-t border-gray-200 pt-6'>
                    <dt className='text-base font-medium'>Total</dt>
                    <dd className='text-base font-medium text-gray-900'>
                      ₦{total}
                    </dd>
                  </div>
                </dl>
                {/* Paying with PayStack */}
                <div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
                  <button
                    className='w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'
                    onClick={() => {
                      initializePayment(onSuccess, onClose);
                    }}
                  >
                    Pay with PayStack (₦{total})
                  </button>
                </div>
              </div>
            </div>
          </div>{' '}
        </div>
      </main>
    </div>
  );
};
