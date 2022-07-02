import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  Carts,
  Checkout,
  Navbar,
  OrderSummary,
  ProductDetails,
  Products,
} from './components';
import { DataProvider } from './Context';

function App() {
  const [open, setOpen] = useState(false);

  console.log('connected');
  return (
    <DataProvider>
      <div className='App'>
        <Navbar setOpen={() => setOpen(!open)} />
        <Carts setOpen={() => setOpen(!open)} open={open} />
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path='/order-summary/:id' element={<OrderSummary />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
