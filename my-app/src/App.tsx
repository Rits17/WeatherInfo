import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import { RequireAuth } from './components/RequireAuth';
import { Unauthorized } from './components/Unauthorized';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Register />}></Route>
      <Route path='/Login' element={<Login />}></Route>
      <Route path='/Unauthorized' element={<Unauthorized />}></Route>


      <Route element={<RequireAuth allowedRoles={['user']}/>}>
      <Route path='/home' element={<Home />}></Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={['user']}/>}>
      <Route path='/about' element={<About />} ></Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={['admin']}/>}>
      <Route path='/contact' element={<Contact />} ></Route>
      </Route>

    </Routes>
    </>
  );
}

export default App;
