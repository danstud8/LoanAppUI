import React, {useEffect} from 'react';
import {useAuth} from "../auth/AuthProvider";

function SignOutPage(props) {
    let auth = useAuth();
    const signOut = () => {
        localStorage.removeItem('token');
        auth.setToken(null)
    }

    useEffect(() => {
        console.log("ALOOOO:" + localStorage.getItem('token'));
        signOut()
    }, []);
    return (
        <div> Succesfully signed out !</div>
    );
}

export default SignOutPage;