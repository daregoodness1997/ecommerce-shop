import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Carts, Navbar, Products } from './components';
import { commerce } from './utils/commerce';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(products);

  return (
    <div className='App'>
      <Navbar />
      <Products />
      <Carts />
    </div>
  );
}

export default App;
