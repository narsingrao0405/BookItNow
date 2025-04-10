import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './client/Home';
import Login from './client/Login';
import Register from './client/Register';


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={< Home />}></Route>
    <Route path='/Login' element={< Login/>}></Route>
    <Route path='/Register' element={<Register/>}></Route>
    <Route path='/Home' element={<Home/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
