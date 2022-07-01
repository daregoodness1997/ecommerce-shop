import { useState, useEffect } from 'react';
import './App.css';
import { Carts, Navbar, Products } from './components';
import { DataProvider } from './Context';

function App() {
  const [open, setOpen] = useState(false);

  console.log('connected');
  return (
    <DataProvider>
      <div className='App'>
        <Navbar setOpen={() => setOpen(!open)} />
        <Products />
        <Carts setOpen={() => setOpen(!open)} open={open} />
      </div>
    </DataProvider>
  );
}

export default App;
