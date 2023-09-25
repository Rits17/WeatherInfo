import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Card from '../components/Card';
import SearchBox from '../components/SearchBox';
import {Link, NavLink} from 'react-router-dom';

const Home = () => {
  return (
    <>
    {/* <Navbar />
    <Header />
    <SearchBox />
    <Card /> */}
    <h1>Home</h1>
    <br />
    <p>You are logged In...</p>
    <NavLink to='/about'>Go To About Page</NavLink>
    <br />
    <Link to='/contact'>Go To Contact Page</Link>
    </>
  )
}

export default Home ;