import axios from 'axios';
import {jwtDecode} from "jwt-decode";


const LOANS_BASE_PATH = 'http://localhost:8030/api/v1/loans'


//axios request for fetching loans by user id with jwt
const fetchLoans = async () => {
    try {
        const username = jwtDecode(localStorage.getItem('token')).sub;
        //add username to the path
        const response = await axios.get(LOANS_BASE_PATH + `/username/${username}` , {
            headers: {
                ' Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error during fetching loans:', error);
        throw error;
    }
}

const createLoan = async (amount, totalCost, duration) => {

    console.log("AICI !" + amount + totalCost + duration);
    await axios.post(LOANS_BASE_PATH,{
        "amount" : amount,
        "totalCost" : totalCost,
        "duration" : duration,
    }, {
        headers: {
            ' Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

const loansService = {
    fetchLoans,
    createLoan
};

export default loansService;