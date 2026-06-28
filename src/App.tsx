import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './useHookExam';
import Example from './useHookExam2';
import ActionExample from './useFormStatusExamp1';
import UseFormStateExample from './useFormStateExam';
import OptimisticExam from './useOptimisticExam';

function App() {


  return (
    <Routes  >
      <Route path='/' element={<Home />} />
      <Route path='/useExample' element={<Example />} />
      <Route path='/useFormStatusExample' element={<ActionExample />} />
      <Route path='/useFormStateExample' element={<UseFormStateExample />} />
      <Route path='/OptimisticExam' element={<OptimisticExam />} />
    </Routes>
  )
}

export default App
