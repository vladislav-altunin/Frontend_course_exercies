import React from 'react';
import Navigation from './Navigation';

function Header() {
    return (
        <div>
            <h1 style={{color: 'white', background: 'black', margin: 0, width: '100%', padding: '10px 0 40px 0'}}>Welcome to React Router</h1>
            <Navigation />
        </div>
    );
}

export default Header;