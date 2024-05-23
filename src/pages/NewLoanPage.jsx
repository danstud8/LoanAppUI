import React, {useEffect, useState} from 'react';
import '../styles/NewLoanPage.css';
import loansService from "../api/LoansApi";
import {jwtDecode} from "jwt-decode";

const NewLoanPage = () => {
    const [formData, setFormData] = useState({
        amount: 0,
        duration: 0,
        username: ""
    });

    const isAdmin = jwtDecode(localStorage.getItem('token')).role === "ADMIN";

    const [totalCost, setTotalCost] = useState(0);

    useEffect(
        () => {
          setTotalCost(parseFloat(formData.amount)*(1 + 0.07));
        },[formData.amount]
    )
    const validateInput = (formData) => {
        return !formData.amount || parseFloat(formData.amount) <= 0
            || !formData.duration || parseFloat(formData.duration) <= 0;

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateInput(formData)) {
            alert("Ati introdus date gresite. Reintroduceti");
            return;
        }
        console.log("ITEMS: ",formData.amount, totalCost, formData.duration)
        loansService.createLoan(formData.amount, totalCost, formData.duration)
            .then(() => alert("Creditul a fost creat cu succes! Asteptati Confirmarea"))
            .catch(() => alert("A aparut o eroare"))


        // Handle form submission
        console.log(formData);
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        if (validateInput(formData)) {
            alert("Ati introdus date gresite. Reintroduceti");
            return;
        }
        console.log("ITEMS: ",formData.amount, totalCost, formData.duration, formData.username)
        loansService.createAdminLoan(formData.amount, totalCost, formData.duration, formData.username)
            .then(() => alert("Creditul a fost creat cu succes! Asteptati Confirmarea"))
            .catch(() => alert("A aparut o eroare"))


        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="form-container">
            <h2>Cerere noua de credit</h2>
            <form onSubmit={isAdmin ? handleAdminSubmit : handleSubmit}>
                <p><b>Suma (lei)</b></p>
                <input
                    type="text"
                    name="amount"
                    placeholder="1000"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                <p><b>Perioada (luni)</b></p>
                <input
                    type="text"
                    name="duration"
                    placeholder="12"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                />
                <p><b>Username</b></p>
                {isAdmin && <input
                    type="text"
                    name="username"
                    placeholder="user1"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                }
                <p> Costul creditului cu aplicarea 7% comision: {!totalCost ? 0 : totalCost}</p>
                <button type="submit">Trimite cerere</button>
            </form>
        </div>
    );
};

export default NewLoanPage;