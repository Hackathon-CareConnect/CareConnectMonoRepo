import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <div className='div1'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path='register' element={<CreateAccount />}></Route>
      </Routes>
      </BrowserRouter>
    </div>    
  );
}

export default App;
