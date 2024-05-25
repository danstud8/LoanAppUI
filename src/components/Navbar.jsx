import React from 'react';
import '../index.css'
import {NavLink} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import {jwtDecode} from "jwt-decode";

function Navbar() {

    let auth = useAuth();
    let isAdmin = localStorage.getItem('token') &&
        jwtDecode(localStorage.getItem('token')).role === 'ADMIN';

    let adminPath =  isAdmin ? "/admin" : "";

    const signOut = () => {
        console.log(auth.token)
        localStorage.removeItem('token');
        auth.setToken(null)
    }
    return (
        <nav className="nav">
            <NavLink className="navbar-title" to={adminPath + "/"}>Credit24/7</NavLink>
            <ul>
                <li className="nav-item">
                    <NavLink to={adminPath + "/request"}>
                        Credit Nou
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={adminPath +"/loans"}>
                        {isAdmin ? "Cereri de credit" : "Creditele Mele"}
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to={"/about"}>
                        Despre Credit24/7
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