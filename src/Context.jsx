import React, { createContext, useState, useEffect } from 'react';
import { commerce } from './utils/commerce';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  // const addCart = (productId, quantity) => {
  //   commerce.cart
  //     .add(productId, quantity)
  //     .then(item => {
  //       setCart(item.cart);
  //     })
  //     .catch(error => {
  //       console.error('There was an error adding the item to the cart', error);
  //     });
  // };
  const addCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const updateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const removeFromCart = async lineItemId => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
    // window.location.reload(false);
  };

  const refreshCart = async () => {
    const response = await commerce.cart.refresh();
    setCart(response);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(products);

  const value = {
    products: [products, setProducts],
    cart: [cart, setCart],
    addCart: addCart,
    updateCartQty: updateCartQty,
    removeFromCart: removeFromCart,
    emptyCart: emptyCart,
    refreshCart: refreshCart,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
