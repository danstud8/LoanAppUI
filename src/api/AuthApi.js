import axios from 'axios';

const AUTH_BASE_PATH = 'http://localhost:8030/api/v1/auth'

//axios request for login and signup with jwt token
const login = async (username, password) => {
    try {
        console.log("1")
        const response = await axios.post(AUTH_BASE_PATH + '/login', {
            username,
            password,
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            console.log(response);
            return response.data;
        })
    } catch (error) {
        return error.data;
    }
};

const signup = async (firstName, lastName, username, password, ) => {
    try {
        const response = await axios.post(AUTH_BASE_PATH + '/register', {
            firstName,
            lastName,
            username,
            password,
        }).then((response) => {
            localStorage.setItem('token', response.data.token);
            console.log("RESPONSE DATA:" + response.data.token);
            return response.data.token;
        })

    } catch (error) {
        return { error: error.response.data.error };
    }
}

const authService = {
    signup,
    login,
};

export default authService;