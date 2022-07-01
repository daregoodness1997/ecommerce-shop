import { useState, useEffect } from 'react';
import './App.css';
import { Carts, Navbar, Products } from './components';
import { commerce } from './utils/commerce';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);

    setCart(response.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async lineItemId => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
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

  return (
    <div className='App'>
      <Navbar setOpen={() => setOpen(!open)} totalItems={cart.length} />
      <Products products={products} />
      <Carts setOpen={() => setOpen(!open)} open={open} />
    </div>
  );
}

export default App;
