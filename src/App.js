import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks'; // Importing BestBooks Component
import About from './About'; // Importing About Component
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
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
        <Footer />
      </Router>
    </>
  );
};

export default App;
