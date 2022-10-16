import React from 'react';
import './Navbar.css';

function Navbar(props) {
    const {setHome, change, setLogs} = props;

    return (
        <header class = "bar">
            <div class = "app-title">
                <h1>ProducTVD</h1>
            </div>
            <nav class = "sublinks">
                <ul>
                    <li> <button class = "navButton" onClick={change}>Home</button> </li>
                    <li> <button class = "navButton" onClick={setLogs}>Logs</button> </li> 
                </ul>
            </nav>        
        </header>
    );
}

export default Navbar;

