import "../styles/HomePage.css";
import {useAuth} from "../auth/AuthProvider";
import {jwtDecode} from "jwt-decode";


export default function HomePage() {
    const role = jwtDecode(localStorage.getItem('token')).role;

    return (
        <div className="home-page-header">
            <h5>Bine ati venit la organizatia UTM Credit !</h5>
            <h6>Suntem predispusi sa oferim cele mai bune servicii pe piata Moldovei !</h6>
            {role === "ADMIN" ? <h6>Sunteti logat ca administrator.</h6> : null}
        </div>
    )

}
