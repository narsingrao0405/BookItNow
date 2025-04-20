import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './client/Home';
import Login from './client/Login';
import Register from './client/Register';
import '@ant-design/v5-patch-for-react-19';
import ProtectedRoute from './client/components/ProtectedRoute';
import { Provider} from "react-redux";
import store from "./client/redux/store";



function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>x``
          <Route path='/' element={ <ProtectedRoute> < Home /></ProtectedRoute>}></Route>
          <Route path='/Login' element={< Login/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/Home' element={ <ProtectedRoute> < Home /></ProtectedRoute> }></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
