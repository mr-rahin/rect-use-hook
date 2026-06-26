import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './home';
import Example from './Ex2';

function App() {


  return (
    <Routes  >
      <Route path='/' element={<Home />} />
      <Route path='/Example' element={<Example />} />
    </Routes>
  )
}

export default App
