import React, {useEffect, useState} from 'react';
import '../styles/NewLoanPage.css';
import loansService from "../api/LoansApi";

const NewLoanPage = () => {
    const [formData, setFormData] = useState({
        amount: 0,
        duration: 0,
    });

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
        console.log("ITEMS: ",formData.amount, formData.totalCost, formData.duration)
        loansService.createLoan(formData.amount, formData.totalCost, formData.duration)
            .then(() => alert("Creditul a fost creat cu succes! Asteptati Confirmarea"))
            .catch(() => alert("A aparut o eroare"))


        // Handle form submission
        console.log(formData);
    };

    return (
        <div className="form-container">
            <h2>Cerere noua de credit</h2>
            <form onSubmit={handleSubmit}>
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
                <p> Costul creditului cu aplicarea 7% comision: {!totalCost ? 0 : totalCost}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewLoanPage;