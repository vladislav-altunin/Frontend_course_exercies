import React from 'react';
import {BrowserRouter, Routers, Route, Link, Routes} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import NotFound from './NotFound';

function Navigation() {
    return(
        <div>
            <BrowserRouter>
                <Link to="/">Home</Link>{' '}
                <Link to="/about">About</Link>{' '}
                <Link to="/contact">Contact</Link>{' '}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Navigation;