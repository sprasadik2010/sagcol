import { useState } from 'react'
import './App.css'
import SAG_LOGO from './components/logo'
import ProductList from './components/ProductList';
import CartIcon from './components/CartIcon';
import CartIconWithPopup from './components/CartIconWithPopup';

function App() {
  return (
    <>
      <div className="bg-red-100 py-4">
        <div className="flex justify-between items-center px-4">
          <div><SAG_LOGO /></div>
          <div><CartIconWithPopup /></div>
        </div>


      </div>

      <div className="grid grid-cols-1 gap-4 p-4">
        <ProductList />
      </div>
    </>
  )
}

export default App
