import React from 'react'
import Home from './components/Home'
import Hero from './components/Hero'
import './App.css';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App