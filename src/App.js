import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks'; // Importing BestBooks Component
import About from './About'; // Importing About Component
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginButton from './LoginButton';
import LoginoutButton from './LogoutButton';

const App = () => {
  return (
    <>
  {/*added 6-5-23 this is the start of the buttons */}
<main className='column'>
<h1>Auth0 Login</h1>
<LoginButton></LoginButton>
<LoginoutButton></LoginoutButton>

</main>
  {/*added 6-5-23 this is the end of the buttons */}

      <Router className="App">
        <Header />
        <Routes>
          <Route
            exact path="/"
            element={<BestBooks />}
          />
          {/* PLACEHOLDER: aa a route with a path of /'about' that renders the 'About' component*/}
          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      <main className='column'>
<h1>Auth0 Login</h1>
<LoginButton></LoginButton>
<LoginoutButton></LoginoutButton>

</main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
