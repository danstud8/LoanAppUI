import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import {jwtDecode} from "jwt-decode";
import "../styles/AuthorizedRoute.css";

const AuthorizedRoute = () => {
    const { token } = useAuth();

    const isAdmin = jwtDecode(localStorage.getItem('token')).role === 'ADMIN'

    return (
        isAdmin ? <Outlet></Outlet>
            :
            <div className="div-container">
                <h5>Nu aveti dreptul sa accesati aceasta pagina.</h5>
            </div>
    )
};

export default AuthorizedRoute;
