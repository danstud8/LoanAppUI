import React from 'react';
import '../index.css'
import {useAuth} from "../auth/AuthProvider";
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

function Navbar() {

    return (
        <nav className="nav">
            <NavLink className="navbar-title" to="/">UTM Credit</NavLink>
            <ul>
                <li className="nav-item">
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/loans">
                        Loans
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/about">
                        About
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signout">
                        Sign Out
                    </NavLink>
                </li>

            </ul>
        </nav>
    );
}

export default Navbar;