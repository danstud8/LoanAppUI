import React from 'react';
import '../index.css'
import {NavLink} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";

function Navbar() {

    let auth = useAuth();
    const signOut = () => {
        localStorage.removeItem('token');
        auth.setToken(null)
    }
    return (
        <nav className="nav">
            <NavLink className="navbar-title" to="/">UTM Credit</NavLink>
            <ul>
                <li className="nav-item">
                    <NavLink to="/request">
                        Credit Nou
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/loans">
                        Creditele Mele
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/about">
                        Despre UTM Credit
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/" onClick={signOut}>
                        Log Out
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;