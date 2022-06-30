import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Carts, Navbar, Products } from './components';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Navbar />
      <Products />
      <Carts />
    </div>
  );
}

export default App;
