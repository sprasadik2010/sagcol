import { useState } from 'react'
import './App.css'
import SAG_LOGO from './components/logo'
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <div className="bg-red-100 py-4">
        <SAG_LOGO />
      </div>

      <div className="grid grid-cols-2 gap-4 p-4">
        <ProductList />
      </div>
    </>
  )
}

export default App
