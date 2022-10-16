import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <header class = "bar">
            <div class = "app-title">
                <h1>Productivity</h1>
            </div>
            <nav class = "sublinks">
                <ul>
                    <li> Home </li>
                    <li> Set Goals </li>
                    <li> View Logs </li> 
                </ul>
            </nav>        
        </header>
    );
}

export default Navbar;

